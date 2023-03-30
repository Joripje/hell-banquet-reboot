import cv2
import numpy as np
import dlib
from scipy.spatial import distance as dist


def mouth_aspect_ratio(mouth):
    A = dist.euclidean(mouth[2], mouth[10])  # 51, 59
    B = dist.euclidean(mouth[4], mouth[8])  # 53, 57
    C = dist.euclidean(mouth[0], mouth[6])  # 49, 55
    mar = (A + B) / (2.0 * C)
    return mar


def is_mouth_open(frame):
    MOUTH_AR_THRESH = 0.80
    shape_predictor = './data/shape_predictor_68_face_landmarks.dat'
    detector = dlib.get_frontal_face_detector()
    predictor = dlib.shape_predictor(shape_predictor)
    (mStart, mEnd) = (49, 68)

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    rects = detector(gray, 0)

    mouth_open = False

    for rect in rects:
        shape = predictor(gray, rect)
        shape = np.array([(shape.part(i).x, shape.part(i).y) for i in range(mStart, mEnd)])

        mouthMAR = mouth_aspect_ratio(shape)
        mar = mouthMAR

        if mar > MOUTH_AR_THRESH:
            mouth_open = True

    return mouth_open