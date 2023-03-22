import cv2
import dlib
from imutils import face_utils, resize
import numpy as np

orange_img = cv2.imread('cookie.png')
orange_img = cv2.resize(orange_img, dsize=(512, 512))

detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor('./face_data/shape_predictor_68_face_landmarks.dat')

cap = cv2.VideoCapture(0)

while cap.isOpened():
    ret, img = cap.read()

    if not ret:
        break

    faces = detector(img)

    result = orange_img.copy()

    if len(faces) > 0:
        face = faces[0]

        x1, y1, x2, y2 = face.left(), face.top(), face.right(), face.bottom()
        face_img = img[y1:y2, x1:x2].copy()

        shape = predictor(img, face)
        shape = face_utils.shape_to_np(shape)

        for p in shape:
            cv2.circle(face_img, center=(p[0] - x1, p[1] - y1), radius=2, color=255, thickness=-1)

        # eyes
        le_x1 = shape[36, 0]
        le_y1 = shape[37, 1]
        le_x2 = shape[39, 0]
        le_y2 = shape[41, 1]
        le_margin = int((le_x2 - le_x1) * 0.18)

        re_x1 = shape[42, 0]
        re_y1 = shape[43, 1]
        re_x2 = shape[45, 0]
        re_y2 = shape[47, 1]
        re_margin = int((re_x2 - re_x1) * 0.18)

        left_eye_img = img[le_y1 - le_margin:le_y2 + le_margin, le_x1 - le_margin:le_x2 + le_margin].copy()
        right_eye_img = img[re_y1 - re_margin:re_y2 + re_margin, re_x1 - re_margin:re_x2 + re_margin].copy()

        left_eye_img = resize(left_eye_img, width=100)
        right_eye_img = resize(right_eye_img, width=100)

        left_eye_img = cv2.resize(left_eye_img, dsize=(100, 100))  # left_eye_img 배열의 크기 조정
        right_eye_img = cv2.resize(right_eye_img, dsize=(100, 100))  # right_eye_img 배열의 크기 조정

        # addWeighted()를 사용하여 두 이미지를 결합
        alpha = 0.5
        beta = 1 - alpha
        left_result = cv2.addWeighted(result[200:300, 100:200], alpha, left_eye_img, beta, 0)
        right_result = cv2.addWeighted(result[200:300, 250:350], alpha, right_eye_img, beta, 0)

        # left_eye_img = img[le_y1 - le_margin:le_y2 + le_margin, le_x1 - le_margin:le_x2 + le_margin].copy()
        # right_eye_img = img[re_y1 - re_margin:re_y2 + re_margin, re_x1 - re_margin:re_x2 + re_margin].copy()
        #
        # left_eye_img = resize(left_eye_img, width=100)
        # right_eye_img = resize(right_eye_img, width=100)
        #
        # # addWeighted()를 사용하여 두 이미지를 결합
        # alpha = 0.5
        # beta = 1 - alpha
        # left_result = cv2.addWeighted(result[200:300, 100:200], alpha, left_eye_img, beta, 0)
        # right_result = cv2.addWeighted(result[200:300, 250:350], alpha, right_eye_img, beta, 0)

        # 결합된 이미지를 결과 이미지에 삽입
        result[200:300, 100:200] = left_result
        result[200:300, 250:350] = right_result

        # mouth
        # mouth_x1 = shape[48, 0]
        # mouth_y1 = shape[50, 1]
        # mouth_x2 = shape[54, 0]
        # mouth_y2 = shape[57, 1]
        # mouth_margin = int((mouth_x2 - mouth_x1) * 0.1)
        #
        # mouth_img = img[mouth_y1 - mouth_margin:mouth_y2 + mouth_margin,
        #             mouth_x1 - mouth_margin:mouth_x2 + mouth_margin].copy()
        #
        #
        # mouth_img = resize(mouth_img, width=250)
        #
        # # 입 이미지와 결과 이미지의 크기를 맞춤
        # mouth_img_resized = np.zeros_like(result)
        # # mouth_img_resized[330:580, 180:430] = resize(mouth_img, dim=(250, 250))
        # # mouth_img_resized[330:580, 180:430] = resize(mouth_img, dsize=(250, 250))
        #
        # # mouth_img_resized = cv2.resize(mouth_img, dsize=(250, 250))
        # # mouth_img_resized = np.zeros_like(result)
        # # mouth_img_resized[330:580, 180:430] = cv2.resize(mouth_img, dsize=(250, 250))
        #
        # mouth_img_resized = cv2.resize(mouth_img, dsize=(250, 250))
        #
        # # 리사이즈된 이미지와 동일한 크기로 배열을 생성합니다.
        # mouth_img_resized_result = np.zeros_like(result[330:580, 180:430])
        # mouth_img_resized_result[:, :, :] = mouth_img_resized
        #
        # # 결과 이미지에 리사이즈된 이미지를 추가합니다.
        # result[330:580, 180:430] = mouth_img_resized_result
        # # 입 이미지와 결과 이미지의 합성
        # alpha = 0.7
        # beta = 1 - alpha
        # result = cv2.addWeighted(mouth_img_resized, alpha, result, beta, 0)


        cv2.imshow('result', result)

    if cv2.waitKey(1) == ord('q'):
        break