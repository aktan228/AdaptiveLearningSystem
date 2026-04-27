from apps.evaluation.models import Submission


def get_user_activity_dates(user):
    activity_dates = (
        Submission.objects.filter(user=user)
        .dates("submitted_at", "day", order="ASC")
    )
    return list(activity_dates)


def calculate_streak_stats(user):
    dates = get_user_activity_dates(user)

    if not dates:
        return {
            "active_days": 0,
            "current_streak": 0,
            "max_streak": 0,
            "last_active_date": None,
        }

    max_streak = 1
    running_streak = 1

    for index in range(1, len(dates)):
        delta_days = (dates[index] - dates[index - 1]).days
        if delta_days == 1:
            running_streak += 1
        else:
            running_streak = 1
        max_streak = max(max_streak, running_streak)

    current_streak = 1
    for index in range(len(dates) - 1, 0, -1):
        delta_days = (dates[index] - dates[index - 1]).days
        if delta_days == 1:
            current_streak += 1
        else:
            break

    return {
        "active_days": len(dates),
        "current_streak": current_streak,
        "max_streak": max_streak,
        "last_active_date": dates[-1],
    }
