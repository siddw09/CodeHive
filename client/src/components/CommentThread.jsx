import React, { useState } from 'react';

export default function CommentThread({ comment, onReply }) {
  const [replyText, setReplyText] = useState('');
  const [showReply, setShowReply] = useState(false);

  const submitReply = () => {
    if (!replyText.trim()) return;
    onReply(comment._id, replyText.trim());
    setReplyText('');
    setShowReply(false);
  };

  return (
    <article className="comment-card">
      <div className="comment-header">
        <span className="comment-avatar">{comment.author.slice(0, 2).toUpperCase()}</span>
        <span className="comment-author">{comment.author}</span>
        <span className="comment-line-tag">Line {comment.lineNumber}</span>
      </div>

      <p className="comment-text">{comment.text}</p>

      {comment.replies.map((reply, index) => (
        <div key={index} className="reply-card">
          <div className="reply-author">{reply.author}</div>
          <div className="reply-text">{reply.text}</div>
        </div>
      ))}

      {showReply ? (
        <div className="reply-form">
          <textarea
            className="s-textarea"
            rows={2}
            value={replyText}
            onChange={(event) => setReplyText(event.target.value)}
            placeholder="Write a reply..."
          />
          <div className="s-actions">
            <button className="s-btn s-btn-cancel" type="button" onClick={() => setShowReply(false)}>
              Cancel
            </button>
            <button className="s-btn s-btn-submit" type="button" onClick={submitReply}>
              Reply
            </button>
          </div>
        </div>
      ) : (
        <div className="comment-actions">
          <button className="c-action" type="button" onClick={() => setShowReply(true)}>
            Reply
          </button>
        </div>
      )}
    </article>
  );
}
