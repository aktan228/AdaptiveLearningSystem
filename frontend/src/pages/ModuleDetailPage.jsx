import { useNavigate, useParams } from 'react-router-dom';
import { mockModules } from '../mock/modules';
import { mockLessons } from '../mock/lessons';
import { mockTasks } from '../mock/tasks';
import DifficultyBadge from '../components/DifficultyBadge';

export default function ModuleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const moduleId = parseInt(id);

  const module = mockModules.find((item) => item.id === moduleId);

  if (!module) {
    return <div>Module not found</div>;
  }

  const lessons = mockLessons
    .filter((lesson) => lesson.module_id === moduleId)
    .sort((a, b) => a.order - b.order)
    .map((lesson, index, arr) => {
      const previousLesson = arr[index - 1];
      const isLocked = Boolean(previousLesson && !previousLesson.is_completed);
      const difficulties = mockTasks
        .filter((task) => task.lesson_id === lesson.id)
        .map((task) => task.difficulty_level);

      return {
        ...lesson,
        isLocked,
        difficulties,
      };
    });

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      animation: 'fadeIn 0.3s ease forwards',
    }}>
      <button
        onClick={() => navigate('/modules')}
        style={{
          marginBottom: '16px',
          background: 'transparent',
          border: '1px solid var(--border-color)',
          color: 'var(--text-secondary)',
          borderRadius: 'var(--radius-md)',
          padding: '10px 14px',
        }}
      >
        Back to modules
      </button>

      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '28px',
        marginBottom: '24px',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '20px',
          flexWrap: 'wrap',
        }}>
          <div style={{ maxWidth: '700px' }}>
            <h1 style={{ fontSize: '34px', marginBottom: '10px', color: 'var(--text-primary)' }}>
              {module.title}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '17px', marginBottom: '16px' }}>
              {module.description}
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {module.focus.map((item) => (
                <span
                  key={item}
                  style={{
                    padding: '6px 10px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'rgba(88, 166, 255, 0.1)',
                    color: 'var(--accent-blue)',
                    fontSize: '13px',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div style={{
            minWidth: '220px',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(100px, 1fr))',
            gap: '12px',
          }}>
            <div style={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '14px',
            }}>
              <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Lessons</div>
              <div style={{ color: 'var(--text-primary)', fontSize: '28px', fontWeight: 'bold' }}>
                {module.lessonsCount}
              </div>
            </div>
            <div style={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '14px',
            }}>
              <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Completed</div>
              <div style={{ color: 'var(--text-primary)', fontSize: '28px', fontWeight: 'bold' }}>
                {module.completedLessons}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gap: '14px',
      }}>
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: `1px solid ${lesson.isLocked ? 'var(--border-color)' : 'rgba(88, 166, 255, 0.14)'}`,
              borderRadius: 'var(--radius-md)',
              padding: '18px 20px',
              opacity: lesson.isLocked ? 0.6 : 1,
              display: 'flex',
              justifyContent: 'space-between',
              gap: '20px',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flex: '1 1 420px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: lesson.is_completed ? 'rgba(63, 185, 80, 0.14)' : 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                color: lesson.is_completed ? 'var(--accent-green)' : 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
              }}>
                {lesson.order}
              </div>
              <div>
                <div style={{ color: 'var(--text-primary)', fontSize: '18px', fontWeight: 'bold', marginBottom: '4px' }}>
                  {lesson.title}
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '10px' }}>
                  {lesson.is_completed ? 'Completed theory' : 'Open lesson and choose a practice difficulty.'}
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {lesson.difficulties.length > 0 ? (
                    lesson.difficulties.map((difficulty) => (
                      <DifficultyBadge key={`${lesson.id}-${difficulty}`} level={difficulty} />
                    ))
                  ) : (
                    <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                      Theory only
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate(`/lesson/${lesson.id}`)}
              disabled={lesson.isLocked}
              style={{
                padding: '12px 18px',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                backgroundColor: lesson.isLocked ? 'var(--text-muted)' : 'var(--accent-blue)',
                color: 'white',
                minWidth: '150px',
              }}
            >
              {lesson.isLocked ? 'Locked' : 'Open lesson'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
