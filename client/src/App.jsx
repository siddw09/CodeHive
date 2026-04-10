import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CommandPalette from './components/CommandPalette';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Features from './pages/Features';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Room from './pages/Room';

function AppShell() {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsPaletteOpen((current) => !current);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <Navbar onOpenPalette={() => setIsPaletteOpen(true)} />
      <CommandPalette open={isPaletteOpen} onClose={() => setIsPaletteOpen(false)} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/features" element={<Features />} />
        <Route path="/rooms" element={<Home />} />
        <Route path="/room/:id" element={<Room />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
