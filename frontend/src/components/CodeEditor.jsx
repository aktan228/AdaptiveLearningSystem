import { useRef } from 'react';
import Editor from '@monaco-editor/react';

export default function CodeEditor({ value, onChange, language = 'python', height = '450px' }) {
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  return (
    <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
      <Editor
        height={height}
        language={language}
        value={value}
        onChange={onChange}
        onMount={handleEditorDidMount}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: 'Fira Code, monospace',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: 'on',
          lineNumbers: 'on',
          roundedSelection: false,
          scrollbar: {
            vertical: 'visible',
            horizontal: 'visible',
          },
        }}
        loading={
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: height,
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-secondary)',
          }}>
            Loading editor...
          </div>
        }
      />
    </div>
  );
}