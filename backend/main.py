from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
import os

app = FastAPI()

# --- Config CORS (เพื่อให้ Next.js ยิงเข้ามาได้) ---
origins = [
    "http://localhost:3000",           # Next.js รันในเครื่อง
    "https://YOUR-RENDER-APP.onrender.com" # (เดี๋ยวค่อยมาแก้ตอน Deploy จริง)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Load Model ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "models", "iris_model.pkl")

model = None
try:
    model = joblib.load(MODEL_PATH)
    print(f"Model loaded from {MODEL_PATH}")
except Exception as e:
    print(f"Error loading model: {e}")

# --- Input Schema (รับค่า 4 ตัวแปร) ---
class IrisFeatures(BaseModel):
    sepal_length: float
    sepal_width: float
    petal_length: float
    petal_width: float

@app.get("/")
def read_root():
    return {"status": "Iris API is running"}

@app.post("/predict")
def predict_species(data: IrisFeatures):
    if not model:
        return {"error": "Model not found"}
    
    # เตรียมข้อมูล 2D Array
    features = np.array([[
        data.sepal_length, 
        data.sepal_width, 
        data.petal_length, 
        data.petal_width
    ]])
    
    # ทำนาย
    prediction = model.predict(features)
    probability = model.predict_proba(features) # ดูความน่าจะเป็น (Optional)
    
    return {
        "species": prediction[0],
        "confidence": float(np.max(probability)) # ความมั่นใจสูงสุด (0-1)
    }