import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mockTasks } from '../mock/tasks';
import { mockHints } from '../mock/hints';
import { mockLessons } from '../mock/lessons';
import { mockModules } from '../mock/modules';
import CodeEditor from '../components/CodeEditor';
import HintPanel from '../components/HintPanel';
import FeedbackPanel from '../components/FeedbackPanel';
import DifficultyBadge from '../components/DifficultyBadge';

export default function TaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const taskId = parseInt(id);

  const task = mockTasks.find((item) => item.id === taskId);
  const hints = mockHints[taskId] || [];
  const lesson = task ? mockLessons.find((item) => item.id === task.lesson_id) : null;
  const module = lesson ? mockModules.find((item) => item.id === lesson.module_id) : null;

  const [code, setCode] = useState(task?.starter_code || '');
  const [feedback, setFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCode(task?.starter_code || '');
    setFeedback(null);
    setTimeSpent(0);
    setHintsUsed(0);
  }, [taskId, task]);

  if (!task) {
    return <div>Task not found</div>;
  }

  const handleRunCode = () => {
    alert('Code execution not implemented in mock. Use Submit to test.');
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      const codeLower = code.toLowerCase();
      const loopCount =
        (codeLower.match(/\bfor\b/g) || []).length +
        (codeLower.match(/\bwhile\b/g) || []).length;

      let astResult = task.tags.includes('while-loop')
        ? codeLower.includes('while')
        : codeLower.includes('for');

      if (task.tags.includes('nested-loops')) {
        astResult = loopCount >= 2;
      }

      if (task.tags.includes('continue')) {
        astResult = astResult && codeLower.includes('continue');
      }

      if (task.tags.includes('break')) {
        astResult = astResult && codeLower.includes('break');
      }

      const testResult = codeLower.includes('return');
      setFeedback({
        test_result: testResult,
        ast_result: astResult,
        feedback_text: testResult && astResult
          ? "All test cases passed. Required loop structure detected."
          : "A test failed or the required loop structure is missing.",
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleNextTask = () => {
    navigate(`/lesson/${task.lesson_id}`);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const renderDescription = (desc) => {
    const lines = desc.split('\n').filter((line) => line.trim());

    return lines.map((line, idx) => {
      const parts = [];
      let i = 0;
      let currentPart = '';

      while (i < line.length) {
        if (line.substring(i, i + 2) === '**') {
          if (currentPart) {
            parts.push({ type: 'text', content: currentPart });
            currentPart = '';
          }
          const closeIdx = line.indexOf('**', i + 2);
          if (closeIdx !== -1) {
            parts.push({ type: 'bold', content: line.substring(i + 2, closeIdx) });
            i = closeIdx + 2;
            continue;
          }
        }
        if (line[i] === '`') {
          if (currentPart) {
            parts.push({ type: 'text', content: currentPart });
            currentPart = '';
          }
          const closeIdx = line.indexOf('`', i + 1);
          if (closeIdx !== -1) {
            parts.push({ type: 'code', content: line.substring(i + 1, closeIdx) });
            i = closeIdx + 1;
            continue;
          }
        }
        currentPart += line[i];
        i += 1;
      }

      if (currentPart) {
        parts.push({ type: 'text', content: currentPart });
      }

      return (
        <div key={idx} style={{ marginBottom: '12px', lineHeight: '1.6' }}>
          {parts.map((part, pidx) => {
            if (part.type === 'bold') {
              return <strong key={pidx}>{part.content}</strong>;
            }
            if (part.type === 'code') {
              return (
                <code
                  key={pidx}
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    padding: '2px 6px',
                    borderRadius: '3px',
                    fontFamily: 'Fira Code, monospace',
                    fontSize: '0.9em',
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

  return (
    <div style={{
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '20px',
      animation: 'fadeIn 0.3s ease forwards',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        gap: '12px',
        flexWrap: 'wrap',
      }}>
        <div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '6px' }}>
            <span style={{ color: 'var(--accent-blue)', cursor: 'pointer' }} onClick={() => navigate('/modules')}>
              Modules
            </span>
            {' > '}
            {module && (
              <>
                <span style={{ color: 'var(--accent-blue)', cursor: 'pointer' }} onClick={() => navigate(`/module/${module.id}`)}>
                  {module.title}
                </span>
                {' > '}
              </>
            )}
            {lesson && (
              <span style={{ color: 'var(--accent-blue)', cursor: 'pointer' }} onClick={() => navigate(`/lesson/${lesson.id}`)}>
                {lesson.title}
              </span>
            )}
          </div>
          <h1 style={{
            color: 'var(--text-primary)',
            fontSize: '24px',
            margin: 0,
          }}>
            {task.title}
          </h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <DifficultyBadge level={task.difficulty_level} />
          <span style={{
            color: 'var(--text-secondary)',
            fontSize: '18px',
            fontFamily: 'Fira Code, monospace',
          }}>
            {formatTime(timeSpent)}
          </span>
        </div>
      </div>

      <div style={{
        display: 'flex',
        gap: '20px',
        alignItems: 'stretch',
        flexWrap: 'wrap',
      }}>
        <div style={{
          flex: '1 1 360px',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          padding: '20px',
          overflowY: 'auto',
          minHeight: '560px',
        }}>
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{
              color: 'var(--text-primary)',
              fontSize: '18px',
              marginBottom: '10px',
            }}>
              Problem Description
            </h2>
            <div style={{
              color: 'var(--text-primary)',
              lineHeight: '1.6',
              fontSize: '16px',
            }}>
              {renderDescription(task.description)}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3 style={{
              color: 'var(--text-secondary)',
              fontSize: '14px',
              marginBottom: '8px',
            }}>
              Tags
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {task.tags.map((tag, index) => (
                <span
                  key={index}
                  style={{
                    backgroundColor: 'var(--accent-blue)',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '12px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div style={{
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '14px',
            marginBottom: '18px',
          }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '6px' }}>
              Session stats
            </div>
            <div style={{ color: 'var(--text-primary)' }}>
              Time spent: {formatTime(timeSpent)}
            </div>
            <div style={{ color: 'var(--text-primary)' }}>
              Hints used: {hintsUsed}
            </div>
          </div>

          <HintPanel key={taskId} hints={hints} onHintUsed={() => setHintsUsed((prev) => prev + 1)} />
        </div>

        <div style={{ flex: '1 1 520px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '15px' }}>
            <CodeEditor
              value={code}
              onChange={setCode}
              height="420px"
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <button
              onClick={handleRunCode}
              style={{
                flex: 1,
                padding: '10px',
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Run Code
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              style={{
                flex: 1,
                padding: '10px',
                backgroundColor: isLoading ? 'var(--text-muted)' : 'var(--accent-green)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: isLoading ? 'not-allowed' : 'pointer',
              }}
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </div>

          <FeedbackPanel feedback={feedback} />

          {feedback && feedback.test_result && feedback.ast_result && (
            <div style={{
              marginTop: '20px',
              padding: '15px',
              backgroundColor: 'var(--accent-green)',
              color: 'white',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center',
              animation: 'fadeIn 0.3s ease forwards',
            }}>
              Task completed.
              <button
                onClick={handleNextTask}
                style={{
                  marginLeft: '15px',
                  padding: '5px 10px',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
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
