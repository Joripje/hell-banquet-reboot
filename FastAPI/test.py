from fastapi import FastAPI, File, Form, UploadFile

from fastapi.responses import JSONResponse

from dotenv import load_dotenv
import os
import boto3

import uuid

import drawjanbani

import sys
import torch
sys.path.insert(0,'./yolov7/seg')
from yolov7.seg.segment import predict_test
device = torch.device('cuda:0') if torch.cuda.is_available() else torch.device('cpu')

app = FastAPI()

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
# async def check_janban(image: UploadFile = File()):
async def check_janban():

    # 아래에 코드 작성
    ratio_with_plate, img = predict_test.run(weights='best.pt', device=device, conf_thres=0.5, imgsz=(480,640), source='test_images/food', nosave=False)
    return JSONResponse(content={"status": "true", "ratio": ratio_with_plate.item()})
    # food_check = detect.detect()


    # file_name = str(uuid.uuid4()) + ".png"
    # contents = await image.read() # image를 s3에 넣을 수 있는 형태로

    # try:
    #     client_s3.put_object(
    #         Body=contents,
    #         Bucket=BUCKET,
    #         Key=file_name,
    #         ContentType='image/png'
    #     )
    #     s3_file_path = f'https://leftover-bucket.s3.ap-northeast-2.amazonaws.com/{file_name}'

    #     return JSONResponse(content={"s3_file_path": s3_file_path})

    # except:
    #     return JSONResponse(content={"s3_file_path": "failed"})