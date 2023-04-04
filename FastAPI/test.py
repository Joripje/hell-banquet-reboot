from fastapi import FastAPI, File, Form, UploadFile
from fastapi.responses import JSONResponse

import drawjanbani
import foodseg

app = FastAPI()

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
async def check_janban(image: UploadFile = File()):
    contents = await image.read()
    response = foodseg.detect(contents)
    
    return JSONResponse(content=response)