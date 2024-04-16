from fastapi import APIRouter
from app.image_captioning import generate_image_caption

router = APIRouter()

@router.post("/caption/")
async def caption_image(img_url: str):
    caption = generate_image_caption(img_url)
    return {"caption": caption}
