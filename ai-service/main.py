from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Plant Disease AI Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:8000",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "ai-service",
        "model_loaded": False
    }

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File harus berupa gambar")

    image_bytes = await file.read()

    if len(image_bytes) > 5 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="Ukuran file maksimal 5MB")

    return {
        "filename": file.filename,
        "content_type": file.content_type,
        "size": len(image_bytes),
        "disease": "Tomato - Late Blight",
        "confidence": 97.21,
        "is_healthy": False,
        "treatment": "Gunakan fungisida yang sesuai dan hindari penyiraman dari atas.",
        "top_3": [
            {"disease": "Tomato - Late Blight", "confidence": 97.21},
            {"disease": "Tomato - Early Blight", "confidence": 1.82},
            {"disease": "Tomato - Healthy", "confidence": 0.97}
        ]
    }