from fastapi import FastAPI, File, Form, UploadFile

from fastapi.responses import JSONResponse
import shutil

app = FastAPI()


@app.post("/ai/draw/")
async def draw_is_correct(image: UploadFile = File(), category: str = Form()):
    try:
        file_path = f'{category}.png'
        with open(file_path, 'wb') as buffer:
            shutil.copyfileobj(image.file, buffer)

        result = True
    except:
        result = False

    return JSONResponse(content={"success": result})


@app.post("/ai/janban")
async def check_janban(image: UploadFile = File()):

    return