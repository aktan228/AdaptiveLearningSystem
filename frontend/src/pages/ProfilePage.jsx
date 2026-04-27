import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../lib/api";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchProfileData = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const [dashboardResponse, submissionsResponse] = await Promise.all([
          api.get("/api/progress/dashboard/"),
          api.get("/api/evaluation/submission/"),
        ]);

        if (isMounted) {
          setDashboard(dashboardResponse.data);
          setSubmissions(submissionsResponse.data);
        }
      } catch {
        if (isMounted) {
          setError("Failed to load profile data.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProfileData();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const solvedThisMonth = useMemo(() => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    return submissions.filter(
      (submission) =>
        submission.test_result &&
        submission.ast_result &&
        submission.submitted_at.startsWith(currentMonth),
    ).length;
  }, [submissions]);

  if (!user) {
    return <div style={{ padding: "20px", color: "var(--text-secondary)" }}>Profile not available</div>;
  }

  if (isLoading) {
    return <div style={{ padding: "20px", color: "var(--text-secondary)" }}>Loading profile...</div>;
  }

  if (error) {
    return <div style={{ padding: "20px", color: "var(--accent-red)" }}>{error}</div>;
  }

  const earnedBadges = (user.badges ?? []).filter((badge) => badge.status === "earned");
  const completedLessons = dashboard?.completed_lessons ?? user.lessons_completed ?? 0;
  const currentStreak = dashboard?.current_streak ?? user.current_streak ?? 0;
  const maxStreak = dashboard?.max_streak ?? user.max_streak ?? 0;
  const focusTopics = user.focus_topics ?? [];
  const badges = user.badges ?? [];

  return (
    <div style={{
      maxWidth: "1100px",
      margin: "0 auto",
      padding: "20px",
      animation: "fadeIn 0.3s ease forwards",
    }}>
      <div style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border-color)",
        borderRadius: "var(--radius-lg)",
        padding: "28px",
        marginBottom: "24px",
        display: "grid",
        gridTemplateColumns: "minmax(0, 1.6fr) minmax(280px, 1fr)",
        gap: "20px",
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "18px", flexWrap: "wrap" }}>
            <div style={{
              width: "76px",
              height: "76px",
              borderRadius: "18px",
              background: "linear-gradient(135deg, var(--accent-blue), #2f81f7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "30px",
              fontWeight: "bold",
            }}>
              {user.username?.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h1 style={{ color: "var(--text-primary)", fontSize: "34px", marginBottom: "4px" }}>
                {user.full_name}
              </h1>
              <p style={{ color: "var(--text-secondary)" }}>
                @{user.username} • {user.target_role}
              </p>
            </div>
          </div>

          <p style={{ color: "var(--text-primary)", marginBottom: "18px", maxWidth: "680px" }}>
            {user.bio}
          </p>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
            {focusTopics.map((topic) => (
              <span
                key={topic}
                style={{
                  backgroundColor: "rgba(88, 166, 255, 0.12)",
                  color: "var(--accent-blue)",
                  padding: "6px 10px",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "13px",
                }}
              >
                {topic}
              </span>
            ))}
            <button
              onClick={logout}
              style={{
                backgroundColor: "transparent",
                color: "var(--text-secondary)",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--radius-md)",
                padding: "8px 12px",
              }}
            >
              Logout
            </button>
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(120px, 1fr))",
          gap: "12px",
        }}>
          <ProfileStat label="Current streak" value={`${currentStreak} d`} />
          <ProfileStat label="Max streak" value={`${maxStreak} d`} />
          <ProfileStat label="Solved this month" value={solvedThisMonth} />
          <ProfileStat label="Weekly goal" value={`${user.weekly_goal} sessions`} />
        </div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1.4fr) minmax(280px, 1fr)",
        gap: "20px",
      }}>
        <div style={{
          backgroundColor: "var(--bg-secondary)",
          border: "1px solid var(--border-color)",
          borderRadius: "var(--radius-md)",
          padding: "22px",
        }}>
          <h2 style={{ color: "var(--text-primary)", fontSize: "22px", marginBottom: "14px" }}>
            Learning summary
          </h2>
          <div style={{ display: "grid", gap: "12px" }}>
            <SummaryRow label="Location" value={user.location} />
            <SummaryRow label="Joined" value={new Date(user.joined_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} />
            <SummaryRow label="Completed lessons" value={completedLessons} />
            <SummaryRow label="Easy threshold" value={`${Math.round(user.threshold_easy * 100)}%`} />
            <SummaryRow label="Hard threshold" value={`${Math.round(user.threshold_hard * 100)}%`} />
          </div>
        </div>

        <div style={{
          backgroundColor: "var(--bg-secondary)",
          border: "1px solid var(--border-color)",
          borderRadius: "var(--radius-md)",
          padding: "22px",
        }}>
          <h2 style={{ color: "var(--text-primary)", fontSize: "22px", marginBottom: "14px" }}>
            Badges
          </h2>
          <div style={{ display: "grid", gap: "10px" }}>
            {badges.map((badge) => (
              <div
                key={badge.id}
                style={{
                  padding: "12px 14px",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: badge.status === "earned" ? "rgba(63, 185, 80, 0.1)" : "var(--bg-primary)",
                  border: "1px solid var(--border-color)",
                  color: badge.status === "earned" ? "var(--text-primary)" : "var(--text-secondary)",
                }}
              >
                {badge.title}
              </div>
            ))}
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: "13px", marginTop: "14px" }}>
            Earned badges: {earnedBadges.length} / {badges.length}
          </p>
        </div>
      </div>
    </div>
  );
}

function ProfileStat({ label, value }) {
  return (
    <div style={{
      backgroundColor: "var(--bg-primary)",
      border: "1px solid var(--border-color)",
      borderRadius: "var(--radius-md)",
      padding: "14px",
    }}>
      <div style={{ color: "var(--text-secondary)", fontSize: "13px", marginBottom: "4px" }}>{label}</div>
      <div style={{ color: "var(--text-primary)", fontSize: "24px", fontWeight: "bold" }}>{value}</div>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      gap: "12px",
      paddingBottom: "10px",
      borderBottom: "1px solid var(--border-color)",
    }}>
      <span style={{ color: "var(--text-secondary)" }}>{label}</span>
      <span style={{ color: "var(--text-primary)", textAlign: "right" }}>{value}</span>
    </div>
  );
}
