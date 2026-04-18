import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mockLessons, mockLessonContent } from '../mock/lessons';
import { mockModules } from '../mock/modules';
import { mockTasks } from '../mock/tasks';
import DifficultyBadge from '../components/DifficultyBadge';
import { useAuth } from '../context/AuthContext';

const difficultyConfig = {
  easy: {
    title: 'Easy',
    description: 'Fast warm-up with one main concept and short expected solution.',
    accent: 'var(--accent-green)',
  },
  medium: {
    title: 'Medium',
    description: 'A balanced task with a few conditions and more loop logic.',
    accent: 'var(--accent-orange)',
  },
  hard: {
    title: 'Hard',
    description: 'A longer problem that combines loops with additional constraints.',
    accent: 'var(--accent-red)',
  },
};

function getFallbackContent(lesson) {
  return {
    id: lesson.id,
    title: lesson.title,
    content_html: `
      <h2>${lesson.title}</h2>
      <p>This lesson introduces the core idea behind <strong>${lesson.title}</strong>.</p>
      <p>Focus on the syntax first, then try to explain when this pattern is useful in real Python code.</p>
      <h3>What to watch for</h3>
      <ul>
        <li>How the syntax is structured</li>
        <li>What changes on each iteration or step</li>
        <li>How to keep the code readable while solving the task</li>
      </ul>
      <p>After reading, pick a practice difficulty below and test yourself.</p>
    `,
  };
}

export default function LessonPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const lessonId = parseInt(id);

  const lesson = mockLessons.find((item) => item.id === lessonId);
  const module = lesson ? mockModules.find((item) => item.id === lesson.module_id) : null;
  const content = lesson ? (mockLessonContent[lessonId] || getFallbackContent(lesson)) : null;
  const lessonTasks = mockTasks.filter((task) => task.lesson_id === lessonId);
  const [selectedDifficulty, setSelectedDifficulty] = useState(lessonTasks[0]?.difficulty_level || null);

  useEffect(() => {
    setSelectedDifficulty(lessonTasks[0]?.difficulty_level || null);
  }, [lessonId]);

  if (!lesson || !content || !module) {
    return <div>Lesson not found</div>;
  }

  const selectedTask = lessonTasks.find((task) => task.difficulty_level === selectedDifficulty);
  const moduleLessons = mockLessons
    .filter((item) => item.module_id === module.id)
    .sort((a, b) => a.order - b.order);
  const currentLessonIndex = moduleLessons.findIndex((item) => item.id === lesson.id);
  const nextLesson = moduleLessons[currentLessonIndex + 1];

  const handleStartTask = () => {
    if (selectedTask) {
      navigate(`/task/${selectedTask.id}`);
    }
  };

  const handleMarkComplete = () => {
    console.log('Marked as complete');
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      animation: 'fadeIn 0.3s ease forwards',
    }}>
      <div style={{ marginBottom: '20px' }}>
        <nav style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '10px' }}>
          <span style={{ color: 'var(--accent-blue)', cursor: 'pointer' }} onClick={() => navigate('/modules')}>
            Modules
          </span>
          {' > '}
          <span style={{ color: 'var(--accent-blue)', cursor: 'pointer' }} onClick={() => navigate(`/module/${module.id}`)}>
            {module.title}
          </span>
          {' > '}
          <span>{lesson.title}</span>
        </nav>
        <h1 style={{
          color: 'var(--text-primary)',
          fontSize: '28px',
          marginBottom: '10px',
        }}>
          {content.title}
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Lesson {lesson.order} of {moduleLessons.length} in {module.title}
        </p>
      </div>

      <div
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          padding: '20px',
          marginBottom: '30px',
        }}
        dangerouslySetInnerHTML={{
          __html: content.content_html.replace(/<h2>/g, '<h2 style="color: var(--accent-blue); margin-top: 30px; margin-bottom: 15px;">')
            .replace(/<h3>/g, '<h3 style="color: var(--text-primary); margin-top: 22px; margin-bottom: 10px;">')
            .replace(/<pre><code>/g, '<pre style="background-color: var(--bg-tertiary); padding: 15px; border-radius: var(--radius-sm); overflow-x: auto;"><code style="font-family: Fira Code, monospace; color: var(--text-primary);">')
            .replace(/<\/code><\/pre>/g, '</code></pre>')
            .replace(/<p>/g, '<p style="line-height: 1.6; margin-bottom: 15px;">')
            .replace(/<ul>/g, '<ul style="padding-left: 20px; margin-bottom: 15px; color: var(--text-primary);">')
            .replace(/<li>/g, '<li style="margin-bottom: 8px;">')
        }}
      />

      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        padding: '22px',
        marginBottom: '24px',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          marginBottom: '16px',
        }}>
          <div>
            <h2 style={{ color: 'var(--text-primary)', fontSize: '22px', marginBottom: '4px' }}>
              Practice setup
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Choose the task difficulty before starting practice.
            </p>
          </div>
          {selectedTask && (
            <DifficultyBadge level={selectedTask.difficulty_level} />
          )}
        </div>

        {!user && (
          <div style={{
            marginBottom: '16px',
            backgroundColor: 'rgba(240, 136, 62, 0.12)',
            border: '1px solid rgba(240, 136, 62, 0.28)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 14px',
            color: 'var(--text-primary)',
          }}>
            Guests can read lessons, but practice and progress tracking open after login or registration.
          </div>
        )}

        {lessonTasks.length > 0 ? (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '12px',
              marginBottom: '18px',
            }}>
              {lessonTasks.map((task) => {
                const config = difficultyConfig[task.difficulty_level];
                const isSelected = selectedDifficulty === task.difficulty_level;

                return (
                  <button
                    key={task.id}
                    onClick={() => setSelectedDifficulty(task.difficulty_level)}
                    style={{
                      textAlign: 'left',
                      backgroundColor: isSelected ? 'rgba(88, 166, 255, 0.14)' : 'var(--bg-primary)',
                      border: `1px solid ${isSelected ? config.accent : 'var(--border-color)'}`,
                      borderRadius: 'var(--radius-md)',
                      padding: '16px',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <div style={{ marginBottom: '10px' }}>
                      <span style={{
                        color: config.accent,
                        fontWeight: 'bold',
                        fontSize: '14px',
                        textTransform: 'uppercase',
                      }}>
                        {config.title}
                      </span>
                    </div>
                    <div style={{ fontWeight: 'bold', marginBottom: '6px' }}>{task.title}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.5' }}>
                      {config.description}
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '10px' }}>
                      {Math.round(task.time_limit / 60)} min
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedTask && (
              <div style={{
                borderTop: '1px solid var(--border-color)',
                paddingTop: '16px',
              }}>
                <div style={{ color: 'var(--text-primary)', fontWeight: 'bold', marginBottom: '6px' }}>
                  Selected task
                </div>
                <div style={{ color: 'var(--text-secondary)', marginBottom: '14px' }}>
                  {selectedTask.title}
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {selectedTask.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        backgroundColor: 'var(--bg-tertiary)',
                        color: 'var(--text-secondary)',
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
            )}
          </>
        ) : (
          <div style={{ color: 'var(--text-secondary)' }}>
            Practice for this lesson will be added soon.
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={() => (user ? handleStartTask() : navigate('/login'))}
          disabled={!selectedTask}
          style={{
            padding: '12px 24px',
            backgroundColor: selectedTask ? 'var(--accent-blue)' : 'var(--text-muted)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: selectedTask ? 'pointer' : 'not-allowed',
          }}
        >
          {user ? 'Start Practice' : 'Login to Practice'}
        </button>
        <button
          onClick={handleMarkComplete}
          style={{
            padding: '12px 24px',
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Mark as Complete
        </button>
        {nextLesson && (
          <button
            onClick={() => navigate(`/lesson/${nextLesson.id}`)}
            style={{
              padding: '12px 24px',
              backgroundColor: 'transparent',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              fontSize: '16px',
            }}
          >
            Next Lesson
          </button>
        )}
      </div>
    </div>
  );
}
