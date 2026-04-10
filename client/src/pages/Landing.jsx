import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const previewLines = [
  { number: 1, content: "const reviewers = new Set(['yn', 'rk', 'pm']);" },
  { number: 2, content: "const syncRoom = createSocketRoom('auth-service');" },
  { number: 3, content: '' },
  { number: 4, content: 'const reviewLogin = async (req, res) => {', highlighted: true, note: 'Validate req.body before destructuring.' },
  { number: 5, content: '  const { email, password } = req.body;' },
  { number: 6, content: '  const user = await User.findOne({ email });' },
  { number: 7, content: "  if (!user) return res.status(404).json({ msg: 'Not found' });" },
  { number: 8, content: '  const valid = await bcrypt.compare(pass, user.hash);', selected: true, note: "Rename 'pass' to 'password' for clarity." },
  { number: 9, content: '  const token = jwt.sign({ id: user._id },' },
  { number: 10, content: "    process.env.JWT_SECRET, { expiresIn: '7d' });" },
  { number: 11, content: '  res.json({ token });' },
  { number: 12, content: '};' },
];

export default function Landing() {
  const glowRef = useRef(null);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let raf;

    const handleMouseMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const animate = () => {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;

      if (glowRef.current) {
        glowRef.current.style.left = `${currentX}px`;
        glowRef.current.style.top = `${currentY}px`;
      }

      raf = window.requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    raf = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <main className="page-wrap">
      <section className="hero">
        <div className="hero-grid" />
        <div ref={glowRef} className="hero-glow cursor-glow" />

        <div className="hero-copy">
          <p className="hero-kicker">FULL PROMPT · DEV AND TASTE INTO CODE</p>
          <p className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            Collaborative reviews every file.
          </p>

          <h1 className="hero-title">
            Review code.
            <br />
            Ship together.
          </h1>

          <p className="hero-sub">
            CodeHive keeps review rooms fast, inline, and calm. Open a room, drop comments on exact lines, and move through feedback without losing context.
          </p>

          <div className="hero-actions">
            <Link className="btn-primary" to="/rooms">Create Room</Link>
            <Link className="btn-secondary" to="/features">Explore Features</Link>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">Live</span>
              <span className="stat-label">socket sync</span>
            </div>
            <div className="stat">
              <span className="stat-num">5+</span>
              <span className="stat-label">languages</span>
            </div>
            <div className="stat">
              <span className="stat-num">Inline</span>
              <span className="stat-label">threaded comments</span>
            </div>
          </div>
        </div>

        <div className="hero-preview">
          <div className="preview-bar">
            <span className="dot dot-r" />
            <span className="dot dot-y" />
            <span className="dot dot-g" />
            <span className="preview-file">auth.js - CodeHive</span>
          </div>

          <div className="preview-tab-bar">
            <div className="preview-tab act">auth.js</div>
            <div className="preview-tab">utils.js</div>
            <div className="preview-tab">index.js</div>
          </div>

          <div className="preview-code">
            {previewLines.map((line) => (
              <div
                key={line.number}
                className={`preview-line${line.highlighted ? ' highlighted' : ''}${line.selected ? ' selected' : ''}`}
              >
                <span className="line-num">{line.number}</span>
                <span className="line-code">{line.content || ' '}</span>
                {line.note ? <span className="comment-badge">{line.note}</span> : null}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
