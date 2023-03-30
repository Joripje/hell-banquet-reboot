# from fastapi import FastAPI, WebSocket
# import cv2
# from game.game import game  # game.py 파일에서 game_logic 함수를 불러옵니다.
#
# app = FastAPI()
#
#
# @app.websocket("/ws")
# async def websocket_endpoint(websocket: WebSocket):
#     await websocket.accept()
#
#     cap = cv2.VideoCapture(0)
#
#     while True:
#         ret, frame = cap.read()
#         if not ret:
#             break
#
#         # game_logic 함수를 호출하여 처리된 프레임과 점수를 얻습니다.
#         processed_frame, score = game(frame, cap)
#
#         # 프레임을 JPEG 형식으로 인코딩하고 이진 데이터로 변환
#         ret, buffer = cv2.imencode('.jpg', processed_frame)
#         frame_binary = buffer.tobytes()
#
#         # 클라이언트에 이진 데이터 전송
#         await websocket.send_bytes(frame_binary)
#
#     cap.release()
#     cv2.destroyAllWindows()

# import cv2
# import socketio
# from fastapi import FastAPI
# from starlette.middleware import Middleware
# from starlette.middleware.cors import CORSMiddleware
# from game.game import game
#
# sio = socketio.AsyncServer(async_mode='asgi')
# app = FastAPI(middleware=[Middleware(CORSMiddleware, allow_origins=['*'])])
# app.mount("/", socketio.ASGIApp(sio))
#
# cap = cv2.VideoCapture(0)
#
# async def game_stream():
#     while True:
#         ret, frame = cap.read()
#         if not ret:
#             break
#
#         # game 함수를 호출하여 처리된 프레임과 점수를 얻습니다.
#         processed_frame, score = game(frame, cap)
#
#         # 프레임을 JPEG 형식으로 인코딩하고 이진 데이터로 변환
#         ret, buffer = cv2.imencode('.jpg', processed_frame)
#         frame_binary = buffer.tobytes()
#
#         yield frame_binary
#
# @sio.event
# async def connect(sid, environ):
#     print("Client connected:", sid)
#     async for frame_binary in game_stream():
#         await sio.emit("frame", frame_binary, room=sid)
#
# @sio.event
# async def disconnect(sid):
#     print("Client disconnected:", sid)
#
# cap.release()
# cv2.destroyAllWindows()


# import cv2
# from fastapi import FastAPI
# import socketio
# from game.game import game
#
# sio = socketio.AsyncServer(cors_allowed_origins="*", async_mode="asgi")
# app = FastAPI()
# app.mount("/", socketio.ASGIApp(sio))
#
# cap = cv2.VideoCapture(0)
#
# async def send_frames(sid):
#     while True:
#         ret, frame = cap.read()
#         if not ret:
#             break
#
#         processed_frame, score = game(frame, cap)
#
#         ret, buffer = cv2.imencode(".jpg", processed_frame)
#         frame_binary = buffer.tobytes()
#
#         await sio.emit("frame", frame_binary, room=sid)
#
#     cap.release()
#     cv2.destroyAllWindows()
#
# @sio.event
# async def connect(sid, environ):
#     print("client connected")
#     await send_frames(sid)
#
# @sio.event
# def disconnect(sid):
#     print("client disconnected")

# import cv2
# from fastapi import FastAPI
# import socketio
# from game.game import game
# import asyncio
#
# sio = socketio.AsyncServer(cors_allowed_origins="*", async_mode="asgi")
# app = FastAPI()
# app.mount("/", socketio.ASGIApp(sio))
#
# cap = cv2.VideoCapture(0)
#
# async def send_frames(sid):
#     while True:
#         ret, frame = cap.read()
#         if not ret:
#             break
#
#         processed_frame, score = game(frame, cap)
#
#         ret, buffer = cv2.imencode(".jpg", processed_frame)
#         frame_binary = buffer.tobytes()
#
#         await sio.emit("frame", frame_binary, room=sid)
#         await asyncio.sleep(0.1)  # Add a small delay to control the frame rate
#
#     cap.release()
#     cv2.destroyAllWindows()
#
# @sio.event
# async def connect(sid, environ):
#     print("client connected")
#     await send_frames(sid)
#
# @sio.event
# def disconnect(sid):
#     print("client disconnected")

import cv2
from fastapi import FastAPI
import socketio
from game.game import game
import numpy as np

sio = socketio.AsyncServer(cors_allowed_origins="*", async_mode="asgi")
app = FastAPI()
app.mount("/", socketio.ASGIApp(sio))

async def process_frame(frame_data):
    # Convert the ArrayBuffer to a NumPy array
    np_data = np.frombuffer(frame_data, dtype=np.uint8)
    frame = cv2.imdecode(np_data, cv2.IMREAD_COLOR)

    # Process the frame with game logic
    processed_frame, score = game(frame)

    # Encode the processed frame as JPEG
    ret, buffer = cv2.imencode(".jpg", processed_frame)
    frame_binary = buffer.tobytes()

    return frame_binary


@sio.event
async def connect(sid, environ):
    print("client connected")


@sio.event
async def disconnect(sid):
    print("client disconnected")


@sio.event
async def client_frame(sid, data):
    processed_frame_binary = await process_frame(data)
    await sio.emit("processed_frame", processed_frame_binary, room=sid)