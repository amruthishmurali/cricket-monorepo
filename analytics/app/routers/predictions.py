from fastapi import APIRouter, Query
from app.services.predictions_service import predict_match_outcome

router = APIRouter(
    prefix="/predictions",
    tags=["Predictions"]
)

@router.get("/")
def root():
    return {"message": "Predictions service is running"}


@router.post("/match-outcome")
def match_outcome(
    team_a_id: str = Query(...),
    team_b_id: str = Query(...)
):
    return predict_match_outcome(team_a_id, team_b_id)