import { Home, Camera, Users } from 'lucide-react';
import { Tab } from '../App';

interface BottomNavProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
  dark?: boolean;
}

export default function BottomNav({ currentTab, onTabChange, dark = false }: BottomNavProps) {
  const tabs = [
    { id: 'home' as const, icon: Home, label: 'ホーム' },
    { id: 'capture' as const, icon: Camera, label: '撮影' },
    { id: 'family' as const, icon: Users, label: '家族' },
  ];

  return (
    <div
      className="flex-shrink-0 border-t"
      style={{
        background: dark ? 'rgba(10,10,20,0.95)' : 'rgba(255,251,235,0.97)',
        backdropFilter: 'blur(16px)',
        borderColor: dark ? 'rgba(255,255,255,0.08)' : 'rgba(180,130,60,0.18)',
      }}
    >
      <div className="flex items-center justify-around px-6 py-2 pb-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          const activeColor = dark ? '#fff' : '#b45309';
          const inactiveColor = dark ? 'rgba(255,255,255,0.35)' : 'rgba(120,80,20,0.4)';

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center gap-0.5 px-5 py-1.5 rounded-2xl transition-all"
              style={{ color: isActive ? activeColor : inactiveColor }}
            >
              <div className="relative flex items-center justify-center w-8 h-7">
                {isActive && (
                  <div
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: dark ? 'rgba(255,255,255,0.1)' : 'rgba(180,100,20,0.1)',
                    }}
                  />
                )}
                <Icon
                  className="relative z-10"
                  style={{
                    width: 20,
                    height: 20,
                    transform: isActive ? 'scale(1.15)' : 'scale(1)',
                    transition: 'transform 0.2s',
                  }}
                />
              </div>
              <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 400, letterSpacing: '0.02em' }}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
