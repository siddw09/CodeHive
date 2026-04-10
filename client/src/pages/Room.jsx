import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { socket } from '../socket';
import CommentSidebar from '../components/CommentSidebar';
import Editor from '../components/Editor';
import { rememberRoom, setCurrentRoomSnapshot } from '@/lib/recentRooms';

export default function Room() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [code, setCode] = useState('');
  const [comments, setComments] = useState([]);
  const [activeLine, setActiveLine] = useState(null);
  const username = localStorage.getItem('username') || 'Anonymous';

  useEffect(() => {
    axios.get(`http://localhost:5000/api/rooms/${id}`).then(({ data }) => {
      setRoom(data);
      setCode(data.code);
      rememberRoom(data);
      setCurrentRoomSnapshot(data);
    });

    axios.get(`http://localhost:5000/api/comments/${id}`).then(({ data }) => {
      setComments(data);
    });

    socket.emit('join-room', id);
    socket.on('code-update', (newCode) => setCode(newCode));
    socket.on('comment-added', (comment) => setComments((prev) => [...prev, comment]));
    socket.on('reply-added', (updated) => {
      setComments((prev) => prev.map((comment) => (
        comment._id === updated._id ? updated : comment
      )));
    });

    return () => {
      socket.off('code-update');
      socket.off('comment-added');
      socket.off('reply-added');
    };
  }, [id]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    socket.emit('code-change', { roomId: id, code: newCode });
    axios.put(`http://localhost:5000/api/rooms/${id}/code`, { code: newCode });
    if (room) {
      setCurrentRoomSnapshot({ ...room, code: newCode });
    }
  };

  const handleAddComment = async (lineNumber, text) => {
    const { data } = await axios.post('http://localhost:5000/api/comments', {
      roomId: id,
      lineNumber,
      author: username,
      text,
    });
    setComments((prev) => [...prev, data]);
    socket.emit('new-comment', { roomId: id, comment: data });
  };

  const handleReply = async (commentId, text) => {
    const { data } = await axios.post(`http://localhost:5000/api/comments/${commentId}/reply`, {
      author: username,
      text,
    });
    setComments((prev) => prev.map((comment) => (
      comment._id === commentId ? data : comment
    )));
    socket.emit('new-reply', { roomId: id, comment: data });
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
  };

  if (!room) {
    return (
      <main className="page-wrap room-page">
        <p className="loading-room">Loading room...</p>
      </main>
    );
  }

  return (
    <main className="page-wrap room-page">
      <div className="room-topbar">
        <div className="room-info">
          <span className="room-title-text">{room.title}</span>
          <span className="room-lang">{room.language}</span>
          <span className="live-badge">{comments.length} thread(s)</span>
        </div>

        <div className="room-actions">
          <button className="room-btn" type="button" onClick={copyLink}>Copy Link</button>
          <button className="room-btn" type="button" onClick={() => navigate('/rooms')}>Back to Rooms</button>
        </div>
      </div>

      <div className="room-layout">
        <div className="editor-panel">
          <div className="editor-tabs">
            <div className="etab act">{room.title}</div>
            <div className="etab">{room.language}</div>
          </div>

          <div className="editor-header">
            <span>Share this URL with collaborators:</span>
            <code>{window.location.href}</code>
          </div>

          <div className="editor-frame">
            <Editor
              code={code}
              language={room.language}
              onChange={handleCodeChange}
              onLineClick={setActiveLine}
              comments={comments}
            />
          </div>
        </div>

        <CommentSidebar
          comments={comments}
          activeLine={activeLine}
          onAddComment={handleAddComment}
          onReply={handleReply}
        />
      </div>
    </main>
  );
}
