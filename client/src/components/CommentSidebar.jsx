import React, { useState } from 'react';
import CommentThread from './CommentThread';

export default function CommentSidebar({ comments, activeLine, onAddComment, onReply }) {
  const [text, setText] = useState('');
  const maxLength = 250;

  const lineComments = activeLine
    ? comments.filter((comment) => comment.lineNumber === activeLine)
    : comments;

  const submit = () => {
    if (!text.trim() || !activeLine) return;
    onAddComment(activeLine, text.trim());
    setText('');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-title">Comments</span>
        <span className="sidebar-count">{lineComments.length} shown</span>
      </div>

      <div className="sidebar-body">
        {lineComments.length === 0 ? (
          <div className="empty-card">
            {activeLine ? `No comments on line ${activeLine} yet.` : 'No comments yet. Click a line in the editor to start.'}
          </div>
        ) : (
          lineComments.map((comment) => (
            <CommentThread key={comment._id} comment={comment} onReply={onReply} />
          ))
        )}
      </div>

      <div className="sidebar-input">
        <div className="line-indicator">
          {activeLine ? `Line ${activeLine} selected` : 'Click a line in the editor to comment'}
        </div>
        <textarea
          className="s-textarea"
          rows={3}
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Write a comment..."
          maxLength={maxLength}
          disabled={!activeLine}
        />
        <div className="field-meta">
          <span>{activeLine ? 'Inline feedback ready' : 'Choose a line to start'}</span>
          <span>{text.length}/{maxLength}</span>
        </div>
        <div className="s-actions">
          <button className="s-btn s-btn-cancel" type="button" onClick={() => setText('')}>
            Clear
          </button>
          <button className="s-btn s-btn-submit" type="button" onClick={submit} disabled={!activeLine || !text.trim()}>
            Add Comment
          </button>
        </div>
      </div>
    </aside>
  );
}
