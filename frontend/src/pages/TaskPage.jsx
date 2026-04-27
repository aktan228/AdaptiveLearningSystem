import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CodeEditor from "../components/CodeEditor";
import HintPanel from "../components/HintPanel";
import FeedbackPanel from "../components/FeedbackPanel";
import DifficultyBadge from "../components/DifficultyBadge";
import { useAuth } from "../context/AuthContext";
import api from "../lib/api";

export default function TaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const taskId = parseInt(id, 10);

  const [task, setTask] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [module, setModule] = useState(null);
  const [hints, setHints] = useState([]);
  const [code, setCode] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [timeSpent, setTimeSpent] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchTaskData = async () => {
      setIsPageLoading(true);
      setPageError("");

      try {
        const taskResponse = await api.get(`/api/courses/tasks/${taskId}/`);
        const taskData = taskResponse.data;
        const [lessonResponse, hintsResponse] = await Promise.all([
          api.get(`/api/courses/lessons/${taskData.lesson}/`),
          api.get(`/api/hint/tasks/${taskId}/`),
        ]);
        const moduleResponse = await api.get(`/api/courses/modules/${lessonResponse.data.module}/`);

        if (isMounted) {
          setTask({
            ...taskData,
            time_limit: taskData.time_limit_seconds,
            starter_code: "",
            tags: [],
          });
          setLesson({
            id: lessonResponse.data.id,
            module_id: lessonResponse.data.module,
            title: lessonResponse.data.title,
            order: lessonResponse.data.order,
          });
          setModule({
            id: moduleResponse.data.id,
            title: moduleResponse.data.title,
          });
          setHints(hintsResponse.data);
          setCode("");
          setFeedback(null);
          setTimeSpent(0);
          setHintsUsed(0);
        }
      } catch {
        if (isMounted) {
          setPageError("Failed to load task.");
        }
      } finally {
        if (isMounted) {
          setIsPageLoading(false);
        }
      }
    };

    if (user) {
      fetchTaskData();
    }

    return () => {
      isMounted = false;
    };
  }, [taskId, user]);

  const handleRunCode = async () => {
    if (!task) {
      return;
    }

    setIsRunning(true);
    setFeedback(null);

    try {
      const response = await api.post("/api/evaluation/run/", {
        task: task.id,
        code,
      });
      setFeedback(response.data);
    } catch (error) {
      const detail =
        error.response?.data?.detail ||
        Object.values(error.response?.data || {})[0] ||
        "Code run failed.";
      setFeedback({
        test_result: false,
        ast_result: false,
        feedback_text: Array.isArray(detail) ? detail[0] : detail,
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!task) {
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await api.post("/api/evaluation/submit/", {
        task: task.id,
        code,
        hints_used: hintsUsed,
        time_spent: timeSpent,
      });
      setFeedback(response.data);
    } catch (error) {
      const detail =
        error.response?.data?.detail ||
        Object.values(error.response?.data || {})[0] ||
        "Submission failed.";
      setFeedback({
        test_result: false,
        ast_result: false,
        feedback_text: Array.isArray(detail) ? detail[0] : detail,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextTask = () => {
    if (lesson) {
      navigate(`/lesson/${lesson.id}`);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const renderDescription = (desc) => {
    const lines = desc.split("\n").filter((line) => line.trim());

    return lines.map((line, idx) => {
      const parts = [];
      let i = 0;
      let currentPart = "";

      while (i < line.length) {
        if (line.substring(i, i + 2) === "**") {
          if (currentPart) {
            parts.push({ type: "text", content: currentPart });
            currentPart = "";
          }
          const closeIdx = line.indexOf("**", i + 2);
          if (closeIdx !== -1) {
            parts.push({ type: "bold", content: line.substring(i + 2, closeIdx) });
            i = closeIdx + 2;
            continue;
          }
        }
        if (line[i] === "`") {
          if (currentPart) {
            parts.push({ type: "text", content: currentPart });
            currentPart = "";
          }
          const closeIdx = line.indexOf("`", i + 1);
          if (closeIdx !== -1) {
            parts.push({ type: "code", content: line.substring(i + 1, closeIdx) });
            i = closeIdx + 1;
            continue;
          }
        }
        currentPart += line[i];
        i += 1;
      }

      if (currentPart) {
        parts.push({ type: "text", content: currentPart });
      }

      return (
        <div key={idx} style={{ marginBottom: "12px", lineHeight: "1.6" }}>
          {parts.map((part, pidx) => {
            if (part.type === "bold") {
              return <strong key={pidx}>{part.content}</strong>;
            }
            if (part.type === "code") {
              return (
                <code
                  key={pidx}
                  style={{
                    backgroundColor: "var(--bg-tertiary)",
                    padding: "2px 6px",
                    borderRadius: "3px",
                    fontFamily: "Fira Code, monospace",
                    fontSize: "0.9em",
                  }}
                >
                  {part.content}
                </code>
              );
            }
            return part.content;
          })}
        </div>
      );
    });
  };

  if (isPageLoading) {
    return <div style={{ padding: "20px", color: "var(--text-secondary)" }}>Loading task...</div>;
  }

  if (pageError) {
    return <div style={{ padding: "20px", color: "var(--accent-red)" }}>{pageError}</div>;
  }

  if (!task) {
    return <div style={{ padding: "20px", color: "var(--text-secondary)" }}>Task not found</div>;
  }

  return (
    <div style={{
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "20px",
      animation: "fadeIn 0.3s ease forwards",
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
        gap: "12px",
        flexWrap: "wrap",
      }}>
        <div>
          <div style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "6px" }}>
            <span style={{ color: "var(--accent-blue)", cursor: "pointer" }} onClick={() => navigate("/modules")}>
              Modules
            </span>
            {" > "}
            {module && (
              <>
                <span style={{ color: "var(--accent-blue)", cursor: "pointer" }} onClick={() => navigate(`/module/${module.id}`)}>
                  {module.title}
                </span>
                {" > "}
              </>
            )}
            {lesson && (
              <span style={{ color: "var(--accent-blue)", cursor: "pointer" }} onClick={() => navigate(`/lesson/${lesson.id}`)}>
                {lesson.title}
              </span>
            )}
          </div>
          <h1 style={{
            color: "var(--text-primary)",
            fontSize: "24px",
            margin: 0,
          }}>
            {task.title}
          </h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <DifficultyBadge level={task.difficulty_level} />
          <span style={{
            color: "var(--text-secondary)",
            fontSize: "18px",
            fontFamily: "Fira Code, monospace",
          }}>
            {formatTime(timeSpent)}
          </span>
        </div>
      </div>

      <div style={{
        display: "flex",
        gap: "20px",
        alignItems: "stretch",
        flexWrap: "wrap",
      }}>
        <div style={{
          flex: "1 1 360px",
          backgroundColor: "var(--bg-secondary)",
          borderRadius: "var(--radius-md)",
          padding: "20px",
          overflowY: "auto",
          minHeight: "560px",
        }}>
          <div style={{ marginBottom: "20px" }}>
            <h2 style={{
              color: "var(--text-primary)",
              fontSize: "18px",
              marginBottom: "10px",
            }}>
              Problem Description
            </h2>
            <div style={{
              color: "var(--text-primary)",
              lineHeight: "1.6",
              fontSize: "16px",
            }}>
              {renderDescription(task.description)}
            </div>
          </div>

          <div style={{
            backgroundColor: "var(--bg-primary)",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--radius-md)",
            padding: "14px",
            marginBottom: "18px",
          }}>
            <div style={{ color: "var(--text-secondary)", fontSize: "13px", marginBottom: "6px" }}>
              Session stats
            </div>
            <div style={{ color: "var(--text-primary)" }}>
              Time spent: {formatTime(timeSpent)}
            </div>
            <div style={{ color: "var(--text-primary)" }}>
              Hints used: {hintsUsed}
            </div>
          </div>

          <HintPanel key={taskId} hints={hints} onHintUsed={() => setHintsUsed((prev) => prev + 1)} />
        </div>

        <div style={{ flex: "1 1 520px", display: "flex", flexDirection: "column" }}>
          <div style={{ marginBottom: "15px" }}>
            <CodeEditor
              value={code}
              onChange={setCode}
              height="420px"
            />
          </div>

          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <button
              onClick={handleRunCode}
              disabled={isRunning || isSubmitting}
              style={{
                flex: 1,
                padding: "10px",
                backgroundColor: "var(--bg-tertiary)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--radius-md)",
                fontSize: "14px",
                cursor: isRunning || isSubmitting ? "not-allowed" : "pointer",
                opacity: isRunning || isSubmitting ? 0.7 : 1,
              }}
            >
              {isRunning ? "Running..." : "Run Code"}
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || isRunning}
              style={{
                flex: 1,
                padding: "10px",
                backgroundColor: isSubmitting ? "var(--text-muted)" : "var(--accent-green)",
                color: "white",
                border: "none",
                borderRadius: "var(--radius-md)",
                fontSize: "14px",
                fontWeight: "bold",
                cursor: isSubmitting || isRunning ? "not-allowed" : "pointer",
                opacity: isSubmitting || isRunning ? 0.7 : 1,
              }}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>

          <FeedbackPanel feedback={feedback} />

          {feedback && feedback.test_result && feedback.ast_result && (
            <div style={{
              marginTop: "20px",
              padding: "15px",
              backgroundColor: "var(--accent-green)",
              color: "white",
              borderRadius: "var(--radius-md)",
              textAlign: "center",
              animation: "fadeIn 0.3s ease forwards",
            }}>
              Task completed.
              <button
                onClick={handleNextTask}
                style={{
                  marginLeft: "15px",
                  padding: "5px 10px",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "white",
                  border: "none",
                  borderRadius: "var(--radius-sm)",
                  cursor: "pointer",
                }}
              >
                Back to Lesson
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
