import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, ZapOff, FlipHorizontal, Video, Image as ImageIcon, X } from 'lucide-react';

// ファインダー風の背景写真（屋外の自然光、家族が撮りそうな場所）
const VIEWFINDER_BG = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&fit=crop&auto=format';

export default function Capture() {
  const [flash, setFlash] = useState(false);
  const [mode, setMode] = useState<'video' | 'photo'>('video');
  const [recording, setRecording] = useState(false);

  return (
    <div className="size-full relative overflow-hidden" style={{ background: '#000' }}>

      {/* ファインダー背景 */}
      <div className="absolute inset-0">
        <img
          src={VIEWFINDER_BG}
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.72) saturate(0.9)' }}
        />
        {/* 周辺減光（ビネット） */}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)' }}
        />
        {/* 上下グラデ */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 25%, transparent 65%, rgba(0,0,0,0.6) 100%)' }} />
      </div>

      {/* グリッド線（ファインダーグリッド） */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.18 }}>
        <div className="absolute top-1/3 left-0 right-0 h-px" style={{ background: '#fff' }} />
        <div className="absolute top-2/3 left-0 right-0 h-px" style={{ background: '#fff' }} />
        <div className="absolute top-0 bottom-0 left-1/3 w-px" style={{ background: '#fff' }} />
        <div className="absolute top-0 bottom-0 left-2/3 w-px" style={{ background: '#fff' }} />
      </div>

      {/* フォーカスエリア（中央の枠） */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative" style={{ width: 160, height: 160 }}>
          {/* 四隅のL字コーナー */}
          {[['top-0 left-0', 'border-t-2 border-l-2 rounded-tl-lg', 'w-8 h-8'],
            ['top-0 right-0', 'border-t-2 border-r-2 rounded-tr-lg', 'w-8 h-8'],
            ['bottom-0 left-0', 'border-b-2 border-l-2 rounded-bl-lg', 'w-8 h-8'],
            ['bottom-0 right-0', 'border-b-2 border-r-2 rounded-br-lg', 'w-8 h-8'],
          ].map(([pos, borders, size], i) => (
            <div
              key={i}
              className={`absolute ${pos} ${borders} ${size}`}
              style={{ borderColor: 'rgba(255,220,80,0.8)' }}
            />
          ))}
        </div>
      </div>

      {/* ── 上部コントロール ── */}
      <div className="absolute top-2 left-0 right-0 px-6 flex items-center justify-between z-10">
        {/* フラッシュ */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => setFlash(!flash)}
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: flash ? 'rgba(251,191,36,0.25)' : 'rgba(0,0,0,0.35)', backdropFilter: 'blur(8px)' }}
        >
          {flash
            ? <Zap className="w-5 h-5" style={{ color: '#fbbf24' }} />
            : <ZapOff className="w-5 h-5 text-white" />
          }
        </motion.button>

        {/* 録画中インジケーター */}
        <AnimatePresence>
          {recording && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(220,38,38,0.85)', backdropFilter: 'blur(8px)' }}
            >
              <motion.div
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="w-2 h-2 rounded-full bg-white"
              />
              <span className="text-white" style={{ fontSize: 12, fontWeight: 700 }}>REC</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* カメラ反転 */}
        <motion.button
          whileTap={{ scale: 0.85, rotate: 180 }}
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(8px)' }}
        >
          <FlipHorizontal className="w-5 h-5 text-white" />
        </motion.button>
      </div>

      {/* ── 下部コントロール ── */}
      <div className="absolute bottom-0 left-0 right-0 px-8 pb-6 z-10">
        {/* モード切り替え（写真/ビデオ） */}
        <div className="flex justify-center mb-6">
          <div className="flex rounded-full p-0.5" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)' }}>
            {(['video', 'photo'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full transition-all"
                style={{
                  background: mode === m ? 'rgba(255,255,255,0.2)' : 'transparent',
                  color: mode === m ? '#fff' : 'rgba(255,255,255,0.5)',
                  fontSize: 12,
                  fontWeight: mode === m ? 700 : 400,
                }}
              >
                {m === 'video'
                  ? <Video className="w-3.5 h-3.5" />
                  : <ImageIcon className="w-3.5 h-3.5" />
                }
                {m === 'video' ? 'ビデオ' : '写真'}
              </button>
            ))}
          </div>
        </div>

        {/* シャッター行 */}
        <div className="flex items-center justify-between">
          {/* 直近のサムネイル */}
          <div
            className="w-14 h-14 rounded-2xl overflow-hidden"
            style={{ border: '2px solid rgba(255,255,255,0.4)' }}
          >
            <img
              src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=120&h=120&fit=crop&auto=format"
              alt="直近の写真"
              className="w-full h-full object-cover"
            />
          </div>

          {/* シャッターボタン */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onTapStart={() => mode === 'video' && setRecording(r => !r)}
            onClick={() => mode === 'photo' && undefined}
            className="relative flex items-center justify-center"
            style={{ width: 76, height: 76 }}
          >
            {/* 外リング */}
            <div className="absolute inset-0 rounded-full" style={{ border: '3px solid rgba(255,255,255,0.8)' }} />
            {/* 内ボタン */}
            <AnimatePresence mode="wait">
              {mode === 'video' ? (
                <motion.div
                  key="vid"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="rounded-xl"
                  style={{
                    width: 50,
                    height: 50,
                    background: recording ? '#ef4444' : '#ef4444',
                    borderRadius: recording ? 8 : 25,
                    transition: 'border-radius 0.2s',
                  }}
                />
              ) : (
                <motion.div
                  key="pic"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="rounded-full"
                  style={{ width: 56, height: 56, background: '#fff' }}
                />
              )}
            </AnimatePresence>
          </motion.button>

          {/* 空スペース（左右対称） */}
          <div className="w-14 h-14" />
        </div>

        {/* ヒントテキスト */}
        <p className="text-center mt-4" style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>
          {mode === 'video' ? 'ボタンを押してビデオ撮影' : 'ボタンを押して写真を撮影'}
        </p>
      </div>
    </div>
  );
}
