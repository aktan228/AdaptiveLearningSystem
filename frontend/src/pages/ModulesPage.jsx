import { useEffect, useMemo, useState } from 'react';
import ModuleCard from '../components/ModuleCard';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';

export default function ModulesPage() {
  const { user } = useAuth();
  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchModules = async () => {
      setIsLoading(true);
      setError('');

      try {
        const modulesResponse = await api.get('/api/courses/modules/');
        const moduleSummaries = modulesResponse.data;

        const detailResponses = await Promise.all(
          moduleSummaries.map((module) => api.get(`/api/courses/modules/${module.id}/`)),
        );

        let completedLessonIds = new Set();
        let solvedTaskIds = new Set();
        if (user) {
          try {
            const [lessonProgressResponse, taskProgressResponse] = await Promise.all([
              api.get('/api/progress/lessons/'),
              api.get('/api/progress/tasks/'),
            ]);
            completedLessonIds = new Set(
              lessonProgressResponse.data
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

        const lessonIds = detailResponses.flatMap((response) =>
          (response.data.lessons ?? []).map((lesson) => lesson.id),
        );
        const uniqueLessonIds = [...new Set(lessonIds)];
        const lessonDetailResponses = await Promise.all(
          uniqueLessonIds.map((lessonId) => api.get(`/api/courses/lessons/${lessonId}/`)),
        );
        const lessonTaskMap = new Map(
          lessonDetailResponses.map((response) => [
            response.data.id,
            (response.data.tasks ?? []).map((task) => task.id),
          ]),
        );

        const normalizedModules = detailResponses
          .map((response) => response.data)
          .sort((a, b) => a.order - b.order)
          .map((module) => {
            const lessons = module.lessons ?? [];
            const completedLessons = lessons.filter((lesson) => completedLessonIds.has(lesson.id)).length;
            const totalTasks = lessons.reduce(
              (sum, lesson) => sum + (lessonTaskMap.get(lesson.id)?.length ?? 0),
              0,
            );
            const solvedTasks = lessons.reduce(
              (sum, lesson) =>
                sum + (lessonTaskMap.get(lesson.id) ?? []).filter((taskId) => solvedTaskIds.has(taskId)).length,
              0,
            );

            return {
              ...module,
              focus: (module.tags ?? []).map((tag) => tag.title),
              lessonsCount: lessons.length,
              completedLessons,
              totalTasks,
              solvedTasks,
            };
          });

        if (isMounted) {
          setModules(normalizedModules);
        }
      } catch (fetchError) {
        if (isMounted) {
          setError('Failed to load modules.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchModules();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const modulesWithLockStatus = useMemo(() => {
    return modules.map((module, index) => {
      const isLocked = Boolean(user) && index > 0 && modules[index - 1].completedLessons === 0;
      return { ...module, isLocked };
    });
  }, [modules, user]);

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      animation: 'fadeIn 0.3s ease forwards',
    }}>
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{
          color: 'var(--text-primary)',
          fontSize: '32px',
          marginBottom: '10px',
        }}>
          Learning Modules
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '18px',
        }}>
          Pick a module, then choose the exact lesson and difficulty you want to practice.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
      }}>
        {isLoading && (
          <div style={{ color: 'var(--text-secondary)' }}>
            Loading modules...
          </div>
        )}
        {!isLoading && error && (
          <div style={{ color: 'var(--accent-red)' }}>
            {error}
          </div>
        )}
        {modulesWithLockStatus.map((module) => (
          <ModuleCard key={module.id} module={module} isLocked={module.isLocked} />
        ))}
      </div>
    </div>
  );
}
