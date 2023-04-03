from fastapi import FastAPI, File, Form, UploadFile

from fastapi.responses import JSONResponse

from dotenv import load_dotenv
import os
import boto3

import uuid

import drawjanbani

import sys
import torch
from PIL import Image
from io import BytesIO
import cv2
import numpy as np
sys.path.insert(0,'./yolov7/seg')
from yolov7.seg.segment import predict_test

app = FastAPI()

device = torch.device('cuda:0') if torch.cuda.is_available() else torch.device('cpu')

load_dotenv()
ACCESS_KEY = os.environ.get("ACCESS_KEY")
SECRET_KEY = os.environ.get("SECRET_KEY")
BUCKET = os.environ.get("BUCKET")
REGION = os.environ.get("REGION")

client_s3 = boto3.client('s3',
    aws_access_key_id=ACCESS_KEY,
    aws_secret_access_key=SECRET_KEY
)

@app.post("/ai/draw/")
async def draw_is_correct(image: UploadFile = File(), category: str = Form()):

    image_data = await image.read()

    check_set = drawjanbani.check_image(image_data)

    if category in check_set:
        result = True
    else:
        result = False

    return JSONResponse(content={"success": result})


@app.post("/ai/janban/")
async def check_janban(image_input: UploadFile = File()):
    contents = await image_input.read() # image를 s3에 넣을 수 있는 형태로
    image_data = cv2.imdecode(np.fromstring(contents, np.uint8), cv2.IMREAD_COLOR)

    # 아래에 코드 작성
    response = predict_test.run(weights='best.pt', device=device, conf_thres=0.5, imgsz=(480,640), imgfile=image_data, nosave=False, hide_labels=True, line_thickness=15)
    # food_check = detect.detect()
    
    if response:
        ratio_with_plate, image_result = response

        # OpenCV에서는 BRG 순서로 저장하기 때문에 RGB 순서로 변환
        image_rgb = cv2.cvtColor(image_result, cv2.COLOR_BGR2RGB)
        image = Image.fromarray(image_rgb)
        # image.show()

        # image를 S3 서버에 업로드
        with BytesIO() as output:
            image.save(output, format="PNG")
            image_bytes = output.getvalue()

        file_name = str(uuid.uuid4()) + ".png"

        try:
            client_s3.put_object(
                Body=image_bytes,
                Bucket=BUCKET,
                Key=file_name,
                ContentType='image/png'
            )
            s3_file_path = f'https://leftover-bucket.s3.ap-northeast-2.amazonaws.com/{file_name}'

            content = {
                "status": True,
                "amount": int(ratio_with_plate * 100),
                "s3_file_path": s3_file_path,
            }
            return JSONResponse(content=content)

        except:
            return JSONResponse(content={"s3_file_path": "failed"})
        # return JSONResponse(content={"status": True, "amount": int(ratio_with_plate * 100)})
    
    # 식판이 감지되지 않은 경우
    else:
        return JSONResponse(content={"status": False, "msg": "식판이 감지되지 않았습니다."})