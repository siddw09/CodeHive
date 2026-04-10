import React, { useEffect, useMemo, useState } from 'react';
import { Compass, Copy, Download, Plus, Search, Sparkles } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCurrentRoomSnapshot, getRecentRooms } from '@/lib/recentRooms';

function downloadCode(snapshot) {
  if (!snapshot?.code) return;

  const extensionByLanguage = {
    javascript: 'js',
    typescript: 'ts',
    python: 'py',
    java: 'java',
    cpp: 'cpp',
  };

  const extension = extensionByLanguage[snapshot.language] || 'txt';
  const blob = new Blob([snapshot.code], { type: 'text/plain;charset=utf-8' });
  const href = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = href;
  link.download = `${snapshot.title || 'codehive-room'}.${extension}`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(href);
}

export default function CommandPalette({ open, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [recentRooms, setRecentRooms] = useState([]);

  useEffect(() => {
    if (!open) return;

    setQuery('');
    setRecentRooms(getRecentRooms());
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  const actions = useMemo(() => {
    const currentRoom = getCurrentRoomSnapshot();

    return [
      {
        id: 'create-room',
        icon: Plus,
        label: 'Create Room',
        meta: 'Start a new review session',
        keywords: ['new', 'create', 'room', 'review'],
        run: () => navigate('/rooms'),
      },
      {
        id: 'browse-rooms',
        icon: Compass,
        label: 'Browse Rooms',
        meta: 'Open the rooms dashboard',
        keywords: ['browse', 'rooms', 'dashboard'],
        run: () => navigate('/rooms'),
      },
      {
        id: 'copy-link',
        icon: Copy,
        label: 'Copy Link',
        meta: 'Copy the current page URL',
        keywords: ['copy', 'link', 'url', 'share'],
        run: async () => {
          await navigator.clipboard.writeText(window.location.href);
        },
      },
      {
        id: 'export-code',
        icon: Download,
        label: 'Export Code',
        meta: currentRoom ? `Download ${currentRoom.title}` : 'Available inside a room',
        keywords: ['export', 'download', 'code'],
        disabled: !currentRoom,
        run: () => downloadCode(currentRoom),
      },
    ];
  }, [navigate]);

  const filteredActions = actions.filter((action) => {
    const haystack = `${action.label} ${action.meta} ${action.keywords.join(' ')}`.toLowerCase();
    return haystack.includes(query.toLowerCase());
  });

  const filteredRooms = recentRooms.filter((room) => {
    const haystack = `${room.title} ${room.language}`.toLowerCase();
    return haystack.includes(query.toLowerCase());
  });

  if (!open) return null;

  return (
    <div className="command-overlay" onClick={onClose}>
      <div className="command-panel" onClick={(event) => event.stopPropagation()}>
        <div className="command-header">
          <div>
            <p className="command-title">CodeHive quick actions</p>
            <p className="command-sub">Search actions, recent rooms, and shortcuts.</p>
          </div>
          <button className="command-close" type="button" onClick={onClose}>Esc</button>
        </div>

        <label className="command-search">
          <Search size={16} />
          <input
            autoFocus
            placeholder="Search rooms, actions..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <div className="command-section">
          <p className="command-section-title">Actions</p>
          <div className="command-list">
            {filteredActions.map((action) => {
              const Icon = action.icon;

              return (
                <button
                  key={action.id}
                  className="command-item"
                  type="button"
                  disabled={action.disabled}
                  onClick={async () => {
                    await action.run();
                    onClose();
                  }}
                >
                  <span className="command-icon"><Icon size={15} /></span>
                  <span className="command-copy">
                    <span className="command-item-title">{action.label}</span>
                    <span className="command-item-meta">{action.meta}</span>
                  </span>
                  <span className="command-shortcut">{action.id === 'copy-link' ? 'URL' : 'GO'}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="command-section">
          <p className="command-section-title">Recent rooms</p>
          <div className="command-list">
            {filteredRooms.length === 0 ? (
              <div className="command-empty">No recent rooms yet. Create a room to pin it here.</div>
            ) : (
              filteredRooms.map((room) => (
                <button
                  key={room._id}
                  className="command-item"
                  type="button"
                  onClick={() => {
                    navigate(`/room/${room._id}`);
                    onClose();
                  }}
                >
                  <span className="command-icon">{room.language.slice(0, 2).toUpperCase()}</span>
                  <span className="command-copy">
                    <span className="command-item-title">{room.title}</span>
                    <span className="command-item-meta">{room.language}</span>
                  </span>
                  <span className="command-shortcut">
                    {location.pathname === `/room/${room._id}` ? 'OPEN' : 'ROOM'}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>

        <div className="command-footer">
          <Sparkles size={14} />
          <span>Press Ctrl/Cmd + K any time to reopen this palette.</span>
        </div>
      </div>
    </div>
  );
}
