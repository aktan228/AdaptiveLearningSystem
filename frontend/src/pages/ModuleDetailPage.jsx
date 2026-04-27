import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DifficultyBadge from '../components/DifficultyBadge';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';

export default function ModuleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const moduleId = parseInt(id);
  const [module, setModule] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchModule = async () => {
      setIsLoading(true);
      setError('');

      try {
        const moduleResponse = await api.get(`/api/courses/modules/${moduleId}/`);
        const moduleData = moduleResponse.data;
        let completedLessonIds = new Set();
        let solvedTaskIds = new Set();

        if (user) {
          try {
            const [progressResponse, taskProgressResponse] = await Promise.all([
              api.get('/api/progress/lessons/'),
              api.get('/api/progress/tasks/'),
            ]);
            completedLessonIds = new Set(
              progressResponse.data
                .filter((item) => item.is_completed)
                .map((item) => item.lesson),
            );
            solvedTaskIds = new Set(
              taskProgressResponse.data
                .filter((item) => item.is_solved)
                .map((item) => item.task),
            );
          } catch {
            completedLessonIds = new Set();
            solvedTaskIds = new Set();
          }
        }

        const normalizedLessons = (moduleData.lessons ?? [])
          .sort((a, b) => a.order - b.order)
          .map((lesson, index, arr) => {
            const previousLesson = arr[index - 1];
            const isCompleted = completedLessonIds.has(lesson.id);
            const isLocked = Boolean(user && previousLesson && !completedLessonIds.has(previousLesson.id));

            return {
              ...lesson,
              is_completed: isCompleted,
              isLocked,
              difficulties: [],
            };
          });

        const lessonDetails = await Promise.all(
          normalizedLessons.map((lesson) => api.get(`/api/courses/lessons/${lesson.id}/`)),
        );

        const difficultyMap = new Map(
          lessonDetails.map((response) => [
            response.data.id,
            (response.data.tasks ?? []).map((task) => task.difficulty_level),
          ]),
        );
        const taskCountMap = new Map(
          lessonDetails.map((response) => [
            response.data.id,
            (response.data.tasks ?? []).length,
          ]),
        );
        const solvedTaskCountMap = new Map(
          lessonDetails.map((response) => [
            response.data.id,
            (response.data.tasks ?? []).filter((task) => solvedTaskIds.has(task.id)).length,
          ]),
        );

        if (isMounted) {
          setModule({
            ...moduleData,
            focus: (moduleData.tags ?? []).map((tag) => tag.title),
            lessonsCount: normalizedLessons.length,
            completedLessons: normalizedLessons.filter((lesson) => lesson.is_completed).length,
            totalTasks: lessonDetails.reduce((sum, response) => sum + (response.data.tasks ?? []).length, 0),
            solvedTasks: lessonDetails.reduce(
              (sum, response) => sum + (response.data.tasks ?? []).filter((task) => solvedTaskIds.has(task.id)).length,
              0,
            ),
            lessons: normalizedLessons.map((lesson) => ({
              ...lesson,
              difficulties: difficultyMap.get(lesson.id) ?? [],
              totalTaskCount: taskCountMap.get(lesson.id) ?? 0,
              solvedTaskCount: solvedTaskCountMap.get(lesson.id) ?? 0,
            })),
          });
        }
      } catch {
        if (isMounted) {
          setError('Failed to load module.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchModule();

    return () => {
      isMounted = false;
    };
  }, [moduleId, user]);

  if (isLoading) {
    return <div style={{ padding: '20px', color: 'var(--text-secondary)' }}>Loading module...</div>;
  }

  if (error) {
    return <div style={{ padding: '20px', color: 'var(--accent-red)' }}>{error}</div>;
  }

  if (!module) {
    return <div style={{ padding: '20px', color: 'var(--text-secondary)' }}>Module not found</div>;
  }

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
              {(module.focus ?? []).map((item) => (
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
        {(module.lessons ?? []).map((lesson) => (
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
                  {lesson.is_completed
                    ? 'Lesson marked as completed.'
                    : `${lesson.solvedTaskCount ?? 0}/${lesson.totalTaskCount ?? 0} tasks solved so far.`}
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
