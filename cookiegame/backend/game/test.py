import cv2
from game import game


cap = cv2.VideoCapture(0)
ret, frame = cap.read()

game(frame, cap)

cap.release()
cv2.destroyAllWindows()