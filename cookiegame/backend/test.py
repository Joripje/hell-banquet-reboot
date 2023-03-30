import cv2
from mouth import is_mouth_open

img = cv2.imread('ex.png')
print(is_mouth_open(img))