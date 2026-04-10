import React from 'react';
import { Database, MessageSquareMore, MessageSquareReply, MonitorCog, Share2, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Zap,
    title: 'Real-time Sync',
    kicker: 'live updates',
    description: 'Code updates appear instantly over WebSocket without forcing refresh cycles or awkward merge narration.',
  },
  {
    icon: MessageSquareMore,
    title: 'Inline Comments',
    kicker: 'exact line anchors',
    description: 'Write directly into the moment. Threads stay pinned to exact line numbers for tighter review context.',
  },
  {
    icon: MonitorCog,
    title: 'Monaco Editor',
    kicker: 'VS Code muscle memory',
    description: 'The same editor you already trust, with syntax highlighting and space to inspect real code.',
  },
  {
    icon: Share2,
    title: 'Instant Sharing',
    kicker: 'one room URL',
    description: 'Share a URL and collaborators join instantly. No account maze, no extra onboarding friction.',
  },
  {
    icon: MessageSquareReply,
    title: 'Threaded Replies',
    kicker: 'discussions stay tidy',
    description: 'Full conversation threads per line keep decisions organized while feedback stays easy to revisit.',
  },
  {
    icon: Database,
    title: 'Persistent Rooms',
    kicker: 'Mongo-backed',
    description: 'Everything is stored in MongoDB, so rooms stay alive between sessions instead of disappearing overnight.',
  },
];

export default function Features() {
  return (
    <main className="page-wrap">
      <section className="features-page">
        <div className="page-header">
          <p className="page-eyebrow">WHAT YOU GET</p>
          <h1 className="page-title">Built for developers.</h1>
          <p className="page-sub">
            Every surface is tuned for focused review: sharp hierarchy, warm contrast, and enough structure to keep the room moving.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article key={feature.title} className="feat-card">
                <div className="feat-topline">
                  <span className="feat-icon"><Icon size={18} /></span>
                  <span className="feat-kicker">
                    <span className="feat-dot" />
                    {feature.kicker}
                  </span>
                </div>
                <h2 className="feat-title">{feature.title}</h2>
                <p className="feat-desc">{feature.description}</p>
              </article>
            );
          })}
        </div>

        <div className="features-actions">
          <Link className="btn-primary" to="/rooms">Create Room</Link>
          <Link className="btn-secondary" to="/">See it live</Link>
        </div>
      </section>
    </main>
  );
}
