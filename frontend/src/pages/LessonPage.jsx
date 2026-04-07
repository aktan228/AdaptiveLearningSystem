import { useParams, useNavigate } from 'react-router-dom';
import { mockLessons, mockLessonContent } from '../mock/lessons';
import { mockModules } from '../mock/modules';
import { mockTasks } from '../mock/tasks';

export default function LessonPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const lessonId = parseInt(id);

  const lesson = mockLessons.find(l => l.id === lessonId);
  const module = mockModules.find(m => m.id === lesson.module_id);
  const content = mockLessonContent[lessonId];
  const task = mockTasks.find(t => t.lesson_id === lessonId);

  if (!lesson || !content) {
    return <div>Lesson not found</div>;
  }

  const handleStartTask = () => {
    navigate(`/task/${task.id}`);
  };

  const handleMarkComplete = () => {
    // Mock toggle completion
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
          <span>{module.title}</span>
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
            .replace(/<pre><code>/g, '<pre style="background-color: var(--bg-tertiary); padding: 15px; border-radius: var(--radius-sm); overflow-x: auto;"><code style="font-family: Fira Code, monospace; color: var(--text-primary);">')
            .replace(/<\/code><\/pre>/g, '</code></pre>')
            .replace(/<p>/g, '<p style="line-height: 1.6; margin-bottom: 15px;">')
        }}
      />

      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
        <button
          onClick={handleStartTask}
          style={{
            padding: '12px 24px',
            backgroundColor: 'var(--accent-blue)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Start Task
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
      </div>
    </div>
  );
}