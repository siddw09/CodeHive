import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { rememberRoom, setCurrentRoomSnapshot } from '@/lib/recentRooms';

const languages = [
  { value: 'javascript', label: 'JavaScript', short: 'JS' },
  { value: 'python', label: 'Python', short: 'PY' },
  { value: 'java', label: 'Java', short: 'JV' },
  { value: 'typescript', label: 'TypeScript', short: 'TS' },
  { value: 'cpp', label: 'C++', short: 'C++' },
];

export default function Home() {
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [username, setUsername] = useState('');
  const [rooms, setRooms] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/rooms')
      .then(({ data }) => setRooms(data))
      .catch(() => setRooms([]));
  }, []);

  const createRoom = async () => {
    if (!title || !username || isSubmitting) return;

    try {
      setIsSubmitting(true);
      const { data } = await axios.post('http://localhost:5000/api/rooms', { title, language });
      localStorage.setItem('username', username);
      rememberRoom(data);
      setCurrentRoomSnapshot(data);
      navigate(`/room/${data._id}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="page-wrap">
      <section className="home-page">
        <div className="home-header">
          <p className="page-eyebrow">CREATE OR JOIN</p>
          <h1 className="home-title">CodeHive rooms.</h1>
          <p className="home-sub">Start a fresh review session, keep recent rooms close, and move from room creation to line comments without changing tools.</p>
        </div>

        <div className="home-layout">
          <div className="form-card">
            <div className="form-title">Start a new CodeHive session</div>
            <div className="form-sub">Fill in the details, open the room, and share the link with your team.</div>

            <div className="form-group">
              <label className="form-label" htmlFor="username">YOUR NAME</label>
              <input
                id="username"
                className="form-input"
                placeholder="e.g. Rahul Sharma"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="title">ROOM TITLE</label>
              <input
                id="title"
                className="form-input"
                placeholder="e.g. Auth Module Review"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>

            <div className="form-group">
              <span className="form-label">LANGUAGE</span>
              <div className="lang-grid">
                {languages.map((option) => (
                  <button
                    key={option.value}
                    className={`lang-opt${language === option.value ? ' selected' : ''}`}
                    type="button"
                    onClick={() => setLanguage(option.value)}
                  >
                    <span className="lang-opt-short">{option.short}</span>
                    <span className="lang-name">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button className="create-btn" type="button" onClick={createRoom} disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Room ->'}
            </button>
          </div>

          <div className="rooms-panel">
            <div className="rooms-panel-title">
              Recent rooms
              <span className="rooms-panel-count">{rooms.length} found</span>
            </div>

            {rooms.length === 0 ? (
              <div className="empty-card">
                No rooms yet. Create your first CodeHive room from the panel on the left.
              </div>
            ) : (
              rooms.map((room) => (
                <button
                  key={room._id}
                  className="room-item"
                  type="button"
                  onClick={() => {
                    rememberRoom(room);
                    setCurrentRoomSnapshot(room);
                    navigate(`/room/${room._id}`);
                  }}
                >
                  <span className="room-item-icon">{room.language.slice(0, 2).toUpperCase()}</span>
                  <span className="room-item-info">
                    <span className="room-item-name">{room.title}</span>
                    <span className="room-item-meta">
                      <span>{room.language}</span>
                      <span>{new Date(room.createdAt).toLocaleDateString()}</span>
                    </span>
                  </span>
                  <span className="room-item-active">Open</span>
                </button>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
