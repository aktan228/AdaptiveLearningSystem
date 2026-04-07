import { useMemo } from 'react';
import { mockModules } from '../mock/modules';
import ModuleCard from '../components/ModuleCard';

export default function ModulesPage() {
  const modulesWithLockStatus = useMemo(() => {
    return mockModules.map((module, index) => {
      const isLocked = index > 0 && mockModules[index - 1].completedLessons === 0;
      return { ...module, isLocked };
    });
  }, []);

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
          Master Python through structured learning paths
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
      }}>
        {modulesWithLockStatus.map((module) => (
          <ModuleCard key={module.id} module={module} isLocked={module.isLocked} />
        ))}
      </div>
    </div>
  );
}