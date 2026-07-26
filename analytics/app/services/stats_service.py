def get_player_stats(player_id: str) -> dict:
    """
    Business logic for fetching player statistics.
    Later this will read from Cricsheet data or database.
    """
    # Dummy data for now
    return {
        "player_id": player_id,
        "name": "Virat Kohli",
        "matches": 274,
        "runs": 12898,
        "average": 57.32,
        "strike_rate": 93.17,
        "form_index": 82.5,
        "message": "This is dummy data. Replace with real logic later."
    }


def get_team_stats(team_name: str) -> dict:
    """
    Business logic for team statistics.
    """
    return {
        "team": team_name,
        "matches_played": 120,
        "wins": 78,
        "win_percentage": 65.0,
        "message": "Dummy team stats"
    }