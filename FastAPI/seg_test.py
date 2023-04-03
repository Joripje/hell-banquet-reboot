import torch
print(torch.cuda.is_available())
device = torch.device('cuda:0') if torch.cuda.is_available() else torch.device('cpu')

# GPU 이름 체크(cuda:0에 연결된 그래픽 카드 기준)
print(torch.cuda.get_device_name()) # 'NVIDIA GeForce RTX 2060'

# 사용 가능 GPU 개수 체크
print(torch.cuda.device_count()) # 1

import sys
sys.path.insert(0,'./yolov7/seg')

# Linux에서 학습시킨 모델을 windows에서 불러오기 위해 PosixPath를 WindowsPath로 변경
import pathlib
temp = pathlib.PosixPath
pathlib.PosixPath = pathlib.WindowsPath

# model = torch.load('yolov7/seg/model.pt')
# print(model)

# sys.path.insert(0, '/yolov7/seg/segment')

from yolov7.seg.segment import predict_test

# print(sys.path)
# predict_test.run(weights='best.pt', device=device, conf_thres=0.5, imgsz=(480,640), source='test_images', nosave=False)
