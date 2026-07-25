from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="CricPulse Analytics",
    description="Cricket Analytics & Prediction Engine",
    version="1.0.0"
)

# Allow frontend to call this service
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "CricPulse Analytics Service is running"}

@app.get("/health")
def health():
    return {"status": "ok"}