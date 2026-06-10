import { useState } from 'react';
import Home from './components/Home';
import Capture from './components/Capture';
import Family from './components/Family';
import AlbumDetail from './components/AlbumDetail';
import BottomNav from './components/BottomNav';
import StatusBar from './components/StatusBar';
import HiddenMenu from './components/HiddenMenu';

export type Album = {
  id: number;
  title: string;
  date: string;
  thumbnail: string;
  photoCount: number;
  season?: 'spring' | 'summer' | 'autumn' | 'winter';
  weather?: 'sunny' | 'rainy' | 'snowy' | 'cloudy';
};

export type ViewMode = 'browse' | 'manage';
export type Tab = 'home' | 'capture' | 'family';

export default function App() {
  const [currentTab, setCurrentTab] = useState<Tab>('home');
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('browse');
  const [menuOpen, setMenuOpen] = useState(false);

  if (selectedAlbum) {
    return (
      <div className="size-full flex flex-col" style={{ background: '#fef3c7' }}>
        <StatusBar />
        <div className="flex-1 overflow-hidden">
          <AlbumDetail album={selectedAlbum} onClose={() => setSelectedAlbum(null)} />
        </div>
      </div>
    );
  }

  return (
    <div
      className="size-full flex flex-col"
      style={{ background: currentTab === 'capture' ? '#0a0a0f' : '#fef3c7' }}
    >
      <StatusBar dark={currentTab === 'capture'} />

      <div className="flex-1 overflow-hidden relative">
        {currentTab === 'home' && (
          <Home
            onAlbumSelect={setSelectedAlbum}
            onMenuOpen={() => setMenuOpen(true)}
            viewMode={viewMode}
          />
        )}
        {currentTab === 'capture' && <Capture />}
        {currentTab === 'family' && <Family />}
      </div>

      <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} dark={currentTab === 'capture'} />

      <HiddenMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
    </div>
  );
}
