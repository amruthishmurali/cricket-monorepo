from app.core.supabase import supabase


def get_team_win_rate(team_id: str) -> float:
    response = (
        supabase.from_("matches")
        .select("winner_team_id")
        .eq("status", "completed")
        .execute()
    )

    matches = response.data or []
    if not matches:
        return 0.5

    total = 0
    wins = 0

    for match in matches:
        if match["winner_team_id"] is None:
            continue
        total += 1
        if match["winner_team_id"] == team_id:
            wins += 1

    if total == 0:
        return 0.5

    return round(wins / total, 2)


def predict_match_outcome(team_a_id: str, team_b_id: str) -> dict:
    team_a_rate = get_team_win_rate(team_a_id)
    team_b_rate = get_team_win_rate(team_b_id)

    total = team_a_rate + team_b_rate
    if total == 0:
        team_a_prob = 0.5
        team_b_prob = 0.5
    else:
        team_a_prob = round(team_a_rate / total, 2)
        team_b_prob = round(team_b_rate / total, 2)

    predicted_winner = team_a_id if team_a_prob >= team_b_prob else team_b_id

    return {
        "team_a_id": team_a_id,
        "team_b_id": team_b_id,
        "team_a_win_probability": team_a_prob,
        "team_b_win_probability": team_b_prob,
        "predicted_winner_id": predicted_winner,
        "model": "basic-win-rate-v1"
    }