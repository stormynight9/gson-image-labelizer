
import requests
from PIL import Image
from transformers import BlipProcessor, BlipForConditionalGeneration
from fastapi.middleware.cors import CORSMiddleware

processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-large")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-large")

from fastapi import FastAPI

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # you can replace "*" with your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/recognise")
async def recognise(request :dict):
    """
    Echoes the received text back in the response.
    """
    print(request)
    img_url = request.get("url")
    raw_image = Image.open(requests.get(img_url, stream=True).raw).convert('RGB')

    # conditional image captioning
    text = ""
    inputs = processor(raw_image, text, return_tensors="pt")

    out = model.generate(**inputs)
    print(processor.decode(out[0], skip_special_tokens=True))
    return {"result": processor.decode(out[0], skip_special_tokens=True)}