from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import predictions, stats

app = FastAPI(
    title="CricPulse Analytics",
    description="Cricket Analytics & Prediction Engine",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(predictions.router)
app.include_router(stats.router)

@app.get("/")
def root():
    return {"message": "CricPulse Analytics Service is running"}

@app.get("/health")
def health():
    return {"status": "ok"}