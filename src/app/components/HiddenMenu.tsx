import { motion, AnimatePresence } from 'motion/react';
import { X, Eye, Settings, Link, Users, Bell, HelpCircle, ChevronRight, Monitor } from 'lucide-react';
import { ViewMode } from '../App';

interface HiddenMenuProps {
  open: boolean;
  onClose: () => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export default function HiddenMenu({ open, onClose, viewMode, onViewModeChange }: HiddenMenuProps) {
  const settingButtons = [
    { icon: Link, label: '接続', sublabel: 'ファミリーと動作共有/接続' },
    { icon: Monitor, label: '大画面モード', sublabel: 'ファミリーと画面を共有\nスマホをつなげて大きな画面に' },
    { icon: Users, label: '家族メンバーを招待', sublabel: 'リンクで簡単に招待' },
    { icon: Bell, label: '通知設定', sublabel: '思い出の通知をカスタマイズ' },
    { icon: Settings, label: '設定', sublabel: 'アプリの各種設定' },
    { icon: HelpCircle, label: 'ヘルプ', sublabel: '使い方のガイド' },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* 背景オーバーレイ */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40"
            style={{ background: 'rgba(60,30,0,0.45)', backdropFilter: 'blur(2px)' }}
            onClick={onClose}
          />

          {/* メニューパネル（右からスライドイン） */}
          <motion.div
            key="panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute top-0 right-0 bottom-0 z-50 flex flex-col"
            style={{
              width: '82%',
              maxWidth: 340,
              background: 'linear-gradient(160deg, #fffbf0 0%, #fef3c7 100%)',
              boxShadow: '-4px 0 40px rgba(0,0,0,0.2)',
            }}
          >
            {/* ヘッダー */}
            <div className="px-5 pt-14 pb-4 flex items-center justify-between flex-shrink-0">
              <h2 style={{ fontWeight: 700, color: '#78350f', fontSize: 20 }}>メニュー</h2>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(180,100,20,0.1)' }}
              >
                <X className="w-5 h-5" style={{ color: '#92400e' }} />
              </button>
            </div>

            {/* 鑑賞/管理モード切り替え */}
            <div className="px-5 mb-5 flex-shrink-0">
              <p className="text-xs mb-2" style={{ color: '#92400e', fontWeight: 600, letterSpacing: '0.05em' }}>
                表示モード
              </p>
              <div
                className="flex rounded-2xl p-1"
                style={{ background: 'rgba(180,100,20,0.1)' }}
              >
                {(['browse', 'manage'] as ViewMode[]).map((mode) => {
                  const isActive = viewMode === mode;
                  return (
                    <button
                      key={mode}
                      onClick={() => onViewModeChange(mode)}
                      className="flex-1 py-2.5 rounded-xl text-sm transition-all flex items-center justify-center gap-1.5"
                      style={{
                        background: isActive ? '#b45309' : 'transparent',
                        color: isActive ? '#fff' : '#92400e',
                        fontWeight: isActive ? 600 : 400,
                        boxShadow: isActive ? '0 2px 8px rgba(180,100,20,0.3)' : 'none',
                      }}
                    >
                      <Eye className="w-4 h-4" />
                      {mode === 'browse' ? '鑑賞モード' : '管理モード'}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs mt-2" style={{ color: '#a16207' }}>
                {viewMode === 'browse'
                  ? 'アルバムをゆっくり楽しむモードです'
                  : '写真の整理・編集ができるモードです'}
              </p>
            </div>

            {/* 区切り */}
            <div className="mx-5 mb-4 h-px" style={{ background: 'rgba(180,100,20,0.15)' }} />

            {/* 設定ボタン群 */}
            <div className="flex-1 overflow-y-auto px-5 pb-6">
              <p className="text-xs mb-3" style={{ color: '#92400e', fontWeight: 600, letterSpacing: '0.05em' }}>
                設定・その他
              </p>
              <div className="space-y-2">
                {settingButtons.map((btn) => {
                  const Icon = btn.icon;
                  return (
                    <button
                      key={btn.label}
                      className="w-full flex items-center gap-3 p-3 rounded-xl text-left active:scale-98 transition-transform"
                      style={{ background: 'rgba(255,251,240,0.8)', border: '1px solid rgba(180,100,20,0.1)' }}
                    >
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(180,100,20,0.1)' }}
                      >
                        <Icon className="w-4 h-4" style={{ color: '#b45309' }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm" style={{ color: '#78350f', fontWeight: 500 }}>{btn.label}</p>
                        <p className="text-xs whitespace-pre-line" style={{ color: '#a16207' }}>{btn.sublabel}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: '#d97706' }} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* バージョン */}
            <div className="px-5 pb-8 text-center flex-shrink-0">
              <p className="text-xs" style={{ color: '#d97706' }}>FamilyAlbum v1.0.0</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
