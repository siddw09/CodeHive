import React, { useRef } from 'react';
import MonacoEditor from '@monaco-editor/react';

export default function Editor({ code, language, onChange, onLineClick, comments }) {
  const editorRef = useRef(null);

  const handleBeforeMount = (monaco) => {
    monaco.editor.defineTheme('codeReviewPalette', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '7A6F63' },
        { token: 'keyword', foreground: 'EA5455' },
        { token: 'string', foreground: '8C6A43' },
      ],
      colors: {
        'editor.background': '#F9F5EB',
        'editor.foreground': '#002B5B',
        'editorLineNumber.foreground': '#8B8175',
        'editorLineNumber.activeForeground': '#002B5B',
        'editorCursor.foreground': '#EA5455',
        'editor.selectionBackground': '#E4DCCF',
        'editor.inactiveSelectionBackground': '#EDE4D8',
        'editor.lineHighlightBackground': '#FFF8EE',
        'editorGutter.background': '#F9F5EB',
        'editorIndentGuide.background1': '#E4DCCF',
        'editorIndentGuide.activeBackground1': '#EA5455',
      },
    });
  };

  const handleMount = (editor) => {
    editorRef.current = editor;
    editor.onMouseDown((event) => {
      const line = event.target.position?.lineNumber;
      if (line) onLineClick(line);
    });
  };

  const commentCountByLine = comments.reduce((counts, comment) => {
    counts[comment.lineNumber] = (counts[comment.lineNumber] || 0) + comment.replies.length + 1;
    return counts;
  }, {});

  const lineSummary = Object.entries(commentCountByLine)
    .map(([lineNumber, count]) => `Line ${lineNumber}: ${count} comment(s)`)
    .join('\n');

  return (
    <MonacoEditor
      beforeMount={handleBeforeMount}
      height="calc(100vh - 96px)"
      language={language}
      theme="codeReviewPalette"
      value={code}
      onChange={onChange}
      onMount={handleMount}
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        glyphMargin: true,
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
      }}
    />
  );
}
