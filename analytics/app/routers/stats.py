from fastapi import APIRouter
from app.services import stats_service

router = APIRouter(
    prefix="/stats",
    tags=["Statistics"]
)


@router.get("/")
def get_stats():
    return {"message": "Stats endpoint is working"}


@router.get("/player/{player_id}")
def get_player_stats(player_id: str):
    # Router only receives the request and calls the service
    result = stats_service.get_player_stats(player_id)
    return result


@router.get("/team/{team_name}")
def get_team_stats(team_name: str):
    result = stats_service.get_team_stats(team_name)
    return result