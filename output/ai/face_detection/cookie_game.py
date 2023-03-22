# import cv2
# import numpy as np
# import time
# import dlib
# import imutils
# from scipy.spatial import distance as dist
#
# # 함수 정의
# def mouth_aspect_ratio(mouth):
#     A = dist.euclidean(mouth[2], mouth[10])  # 51, 59
#     B = dist.euclidean(mouth[4], mouth[8])  # 53, 57
#     C = dist.euclidean(mouth[0], mouth[6])  # 49, 55
#     mar = (A + B) / (2.0 * C)
#     return mar
#
# # 변수 초기화
# MOUTH_AR_THRESH = 0.86
# shape_predictor = './face_data/shape_predictor_68_face_landmarks.dat'
# detector = dlib.get_frontal_face_detector()
# predictor = dlib.shape_predictor(shape_predictor)
# (mStart, mEnd) = (49, 68)
#
# # 게임 변수 초기화
# start_time = time.time()
# game_duration = 20
# bite_counter = 0
# score = 0
# min_bite_duration = 0.5
# last_bite_time = 0
#
# cap = cv2.VideoCapture(0)
#
# while time.time() - start_time < game_duration:
#     ret, frame = cap.read()
#
#     if not ret:
#         break
#
#     gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
#     rects = detector(gray, 0)
#
#     mouth_open = False
#
#     for rect in rects:
#         shape = predictor(gray, rect)
#         shape = np.array([(shape.part(i).x, shape.part(i).y) for i in range(mStart, mEnd)])
#
#         mouthMAR = mouth_aspect_ratio(shape)
#         mar = mouthMAR
#
#         mouthHull = cv2.convexHull(shape)
#         cv2.drawContours(frame, [mouthHull], -1, (0, 255, 0), 1)
#         cv2.putText(frame, "MAR: {:.2f}".format(mar), (30, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
#
#         if mar > MOUTH_AR_THRESH:
#             mouth_open = True
#
#     if mouth_open:
#         bite_counter += 1
#         last_bite_time = time.time()
#     elif time.time() - last_bite_time > min_bite_duration:
#         score += bite_counter // 2
#         bite_counter = 0
#
#     cv2.putText(frame, f'Score: {score}', (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
#     cv2.imshow('Cookie Biting Game', frame)
#
#     if cv2.waitKey(1) & 0xFF == 27:
#         break
#
# cap.release()
# cv2.destroyAllWindows()
# print(f'Final score: {score}')

# import cv2
# import numpy as np
# import time
# import dlib
# import imutils
# from scipy.spatial import distance as dist
#
# # 함수 정의
# def mouth_aspect_ratio(mouth):
#     A = dist.euclidean(mouth[2], mouth[10])  # 51, 59
#     B = dist.euclidean(mouth[4], mouth[8])  # 53, 57
#     C = dist.euclidean(mouth[0], mouth[6])  # 49, 55
#     mar = (A + B) / (2.0 * C)
#     return mar
#
# # 변수 초기화
# MOUTH_AR_THRESH = 0.92
# shape_predictor ='./face_data/shape_predictor_68_face_landmarks.dat'
# detector = dlib.get_frontal_face_detector()
# predictor = dlib.shape_predictor(shape_predictor)
# (mStart, mEnd) = (49, 68)
#
# # 게임 변수 초기화
# start_time = time.time()
# game_duration = 20
# score = 0
# min_bite_duration = 1
# last_bite_time = 0
# mouth_was_open = False
#
# cap = cv2.VideoCapture(0)
#
# while time.time() - start_time < game_duration:
#     ret, frame = cap.read()
#
#     if not ret:
#         break
#
#     gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
#     rects = detector(gray, 0)
#
#     mouth_open = False
#
#     for rect in rects:
#         shape = predictor(gray, rect)
#         shape = np.array([(shape.part(i).x, shape.part(i).y) for i in range(mStart, mEnd)])
#
#         mouthMAR = mouth_aspect_ratio(shape)
#         mar = mouthMAR
#
#         mouthHull = cv2.convexHull(shape)
#         cv2.drawContours(frame, [mouthHull], -1, (0, 255, 0), 1)
#         cv2.putText(frame, "MAR: {:.2f}".format(mar), (30, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
#
#         if mar > MOUTH_AR_THRESH:
#             mouth_open = True
#
#     if mouth_open:
#         mouth_was_open = True
#     elif mouth_was_open and time.time() - last_bite_time > min_bite_duration:
#         score += 1
#         last_bite_time = time.time()
#         mouth_was_open = False
#
#     cv2.putText(frame, f'Score: {score}', (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
#     cv2.imshow('Cookie Biting Game', frame)
#
#     if cv2.waitKey(1) & 0xFF == 27:
#         break
#
# cap.release()
# cv2.destroyAllWindows()
# print(f'Final score: {score}')

# import cv2
# import numpy as np
# import time
# import dlib
# import imutils
# from scipy.spatial import distance as dist
#
# cookie_images = []
# for i in range(8):
#     img = cv2.imread(f'cookie_{i}.png')
#     img = imutils.resize(img, width=200, height=200)
#     cookie_images.append(img)
#
#
# # 함수 정의
# def mouth_aspect_ratio(mouth):
#     A = dist.euclidean(mouth[2], mouth[10])  # 51, 59
#     B = dist.euclidean(mouth[4], mouth[8])  # 53, 57
#     C = dist.euclidean(mouth[0], mouth[6])  # 49, 55
#     mar = (A + B) / (2.0 * C)
#     return mar
#
# # 변수 초기화
# MOUTH_AR_THRESH = 0.92
# shape_predictor = './face_data/shape_predictor_68_face_landmarks.dat'
# detector = dlib.get_frontal_face_detector()
# predictor = dlib.shape_predictor(shape_predictor)
# (mStart, mEnd) = (49, 68)
#
# # 게임 변수 초기화
# start_time = time.time()
# game_duration = 20
# score = 0
# min_bite_duration = 0.5
# last_bite_time = 0
# mouth_was_open = False
#
# cap = cv2.VideoCapture(0)
#
# while time.time() - start_time < game_duration:
#     ret, frame = cap.read()
#
#     if not ret:
#         break
#
#     gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
#     rects = detector(gray, 0)
#
#     mouth_open = False
#
#     for rect in rects:
#         shape = predictor(gray, rect)
#         shape = np.array([(shape.part(i).x, shape.part(i).y) for i in range(mStart, mEnd)])
#
#         mouthMAR = mouth_aspect_ratio(shape)
#         mar = mouthMAR
#
#         mouthHull = cv2.convexHull(shape)
#         cv2.drawContours(frame, [mouthHull], -1, (0, 255, 0), 1)
#         cv2.putText(frame, "MAR: {:.2f}".format(mar), (30, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
#
#         if mar > MOUTH_AR_THRESH:
#             mouth_open = True
#
#     if mouth_open:
#         if not mouth_was_open:
#             last_bite_time = time.time()
#             mouth_was_open = True
#     else:
#         if mouth_was_open and time.time() - last_bite_time > min_bite_duration:
#             score += 1
#             mouth_was_open = False
#
#     frame = cv2.flip(frame, 1)
#
#     cv2.putText(frame, f'Score: {score}', (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
#
#     frame[180:180+cookie_images[score % 7].shape[0], 180:180+cookie_images[score % 7].shape[1]] = cookie_images[score % 7]
#
#     cv2.imshow('Cookie Biting Game', frame)
#
#
#     if cv2.waitKey(1) & 0xFF == 27:
#         break
#
# cap.release()
# cv2.destroyAllWindows()
# print(f'Final score: {score}')

import cv2
import numpy as np
import time
import dlib
import imutils
from scipy.spatial import distance as dist

cookie_images = []
for i in range(8):
    img = cv2.imread(f'cookie_{i}.png')
    img = imutils.resize(img, width=200, height=200)
    cookie_images.append(img)

# 함수 정의
def mouth_aspect_ratio(mouth):
    A = dist.euclidean(mouth[2], mouth[10])  # 51, 59
    B = dist.euclidean(mouth[4], mouth[8])  # 53, 57
    C = dist.euclidean(mouth[0], mouth[6])  # 49, 55
    mar = (A + B) / (2.0 * C)
    return mar

# 변수 초기화
MOUTH_AR_THRESH = 0.80
shape_predictor = './face_data/shape_predictor_68_face_landmarks.dat'
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor(shape_predictor)
(mStart, mEnd) = (49, 68)

show_cookie_7_duration = 0.2  # 초 단위
cookie_7_start_time = None

# 게임 변수 초기화
start_time = time.time()
game_duration = 20
score = 0
min_bite_duration = 0.7
last_bite_time = 0
mouth_was_open = False

cap = cv2.VideoCapture(0)

# 프레임의 너비와 높이 가져오기
frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

# 프레임 너비를 두 배로 늘림
extended_width = frame_width * 2

while time.time() - start_time < game_duration:
    ret, frame = cap.read()

    if not ret:
        break

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    rects = detector(gray, 0)

    mouth_open = False

    for rect in rects:
        shape = predictor(gray, rect)
        shape = np.array([(shape.part(i).x, shape.part(i).y) for i in range(mStart, mEnd)])

        mouthMAR = mouth_aspect_ratio(shape)
        mar = mouthMAR

        mouthHull = cv2.convexHull(shape)
        cv2.drawContours(frame, [mouthHull], -1, (0, 255, 0), 1)
        cv2.putText(frame, "MAR: {:.2f}".format(mar), (30, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)

        if mar > MOUTH_AR_THRESH:
            mouth_open = True

    if mouth_open:
        if not mouth_was_open:
            last_bite_time = time.time()
            mouth_was_open = True
    else:
        if mouth_was_open and time.time() - last_bite_time > min_bite_duration:
            score += 1
            mouth_was_open = False

    frame = cv2.flip(frame, 1)

    # 프레임 너비를 두 배로 늘림
    extended_frame = np.zeros((frame_height, extended_width, 3), dtype=np.uint8)
    extended_frame[:, :frame_width] = frame

    # 쿠키 이미지를 늘린 프레임의 오른쪽에 배치
    extended_frame[180:180+cookie_images[score % 7].shape[0],
    frame_width + 180:180+frame_width + cookie_images[score % 7].shape[1]] = cookie_images[score % 7]

    if score == 7 and cookie_7_start_time is None:
        cookie_7_start_time = time.time()

    if score == 7 and time.time() - cookie_7_start_time < show_cookie_7_duration:
        extended_frame[180:180+cookie_images[7].shape[0], frame_width + 180:180 + frame_width + cookie_images[7].shape[1]] = cookie_images[7]
    else:
        extended_frame[180:180 + cookie_images[score % 7].shape[0],
        frame_width + 180:180 + frame_width + cookie_images[score % 7].shape[1]] = cookie_images[score % 7]

    cv2.putText(extended_frame, f'Score: {score}', (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
    cv2.imshow('Cookie Biting Game', extended_frame)

    if cv2.waitKey(1) & 0xFF == 27:
        break

cap.release()
cv2.destroyAllWindows()
print(f'Final score: {score}')