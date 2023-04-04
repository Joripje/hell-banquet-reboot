import os, sys
import torch
from PIL import Image
from io import BytesIO
import cv2
import numpy as np
import uuid

sys.path.insert(0,'./yolov7/seg')
from yolov7.seg.segment import predict_test

from dotenv import load_dotenv
import boto3
load_dotenv()
ACCESS_KEY = os.environ.get("ACCESS_KEY")
SECRET_KEY = os.environ.get("SECRET_KEY")
BUCKET = os.environ.get("BUCKET")
REGION = os.environ.get("REGION")

client_s3 = boto3.client('s3',
    aws_access_key_id=ACCESS_KEY,
    aws_secret_access_key=SECRET_KEY
)

device = torch.device('cuda:0') if torch.cuda.is_available() else torch.device('cpu')

def detect(image):
    image_data = cv2.imdecode(np.fromstring(image, np.uint8), cv2.IMREAD_COLOR)
    detection = predict_test.run(weights='best.pt', device=device, conf_thres=0.5, imgsz=(480,640), imgfile=image_data, nosave=False, hide_labels=True, line_thickness=15)
    
    if detection:
        ratio_with_plate, image_result = detection

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
            return content

        except:
            content={"s3_file_path": "failed"}
            return content

        # content={"status": True, "amount": int(ratio_with_plate * 100)}
        # return content
    
    # 식판이 감지되지 않은 경우
    else:
        content={"status": False, "msg": "식판이 감지되지 않았습니다."}
        return content
