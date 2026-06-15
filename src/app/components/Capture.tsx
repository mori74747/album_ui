import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, ZapOff, FlipHorizontal, Wind, Activity, Sparkles } from 'lucide-react';

const VIEWFINDER_BG = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&fit=crop&auto=format';

type CaptureMode = 'moment' | 'sound' | 'feeling';

const MODE_CONFIG: Record<CaptureMode, {
  label: string;
  sublabel: string;
  icon: React.ElementType;
  color: string;
  glow: string;
  description: string;
}> = {
  moment: {
    label: '瞬間',
    sublabel: 'MOMENT',
    icon: Sparkles,
    color: '#fbbf24',
    glow: 'rgba(251,191,36,0.35)',
    description: '光と映像で今を残す',
  },
  sound: {
    label: '音',
    sublabel: 'SOUND',
    icon: Activity,
    color: '#818cf8',
    glow: 'rgba(129,140,248,0.35)',
    description: '声・音・BGMで記憶を刻む',
  },
  feeling: {
    label: '感触',
    sublabel: 'FEELING',
    icon: Wind,
    color: '#34d399',
    glow: 'rgba(52,211,153,0.35)',
    description: '温度・振動・空気感まで',
  },
};

// 波形バーコンポーネント
function WaveBar({ active, color }: { active: boolean; color: string }) {
  const heights = useRef(Array.from({ length: 28 }, () => Math.random() * 0.6 + 0.1));
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setTick((t) => t + 1), 120);
    return () => clearInterval(id);
  }, [active]);
  return (
    <div className="flex items-center gap-0.5" style={{ height: 40 }}>
      {heights.current.map((h, i) => {
        const animated = active ? Math.random() * 0.7 + 0.2 : h;
        return (
          <motion.div
            key={i}
            animate={{ scaleY: active ? animated : h, opacity: active ? 0.85 : 0.3 }}
            transition={{ duration: 0.12, ease: 'easeOut' }}
            style={{
              width: 3,
              borderRadius: 2,
              background: color,
              originY: 0.5,
              height: '100%',
              transformOrigin: 'center',
            }}
          />
        );
      })}
      {/* tick を消費してre-renderをトリガー */}
      <span className="sr-only">{tick}</span>
    </div>
  );
}

// パルスリング
function PulseRings({ color, glow }: { color: string; glow: string }) {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ border: `1.5px solid ${color}`, boxShadow: `0 0 12px ${glow}` }}
          initial={{ width: 90, height: 90, opacity: 0.8 }}
          animate={{ width: 90 + i * 55, height: 90 + i * 55, opacity: 0 }}
          transition={{ duration: 2.4, delay: i * 0.8, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

// 粒子エフェクト
function Particles({ color }: { color: string }) {
  const dots = Array.from({ length: 18 }, (_, i) => ({
    angle: (i / 18) * 360,
    dist: 60 + Math.random() * 80,
    size: 2 + Math.random() * 3,
    delay: Math.random() * 2,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {dots.map((d, i) => {
        const x = Math.cos((d.angle * Math.PI) / 180) * d.dist;
        const y = Math.sin((d.angle * Math.PI) / 180) * d.dist;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{ width: d.size, height: d.size, background: color }}
            animate={{ x: [0, x * 0.4, x], y: [0, y * 0.4, y], opacity: [0, 0.7, 0] }}
            transition={{ duration: 3 + Math.random(), delay: d.delay, repeat: Infinity, ease: 'easeOut' }}
          />
        );
      })}
    </div>
  );
}

export default function Capture() {
  const [flash, setFlash] = useState(false);
  const [mode, setMode] = useState<CaptureMode>('moment');
  const [recording, setRecording] = useState(false);
  const [flashOverlay, setFlashOverlay] = useState(false);
  const cfg = MODE_CONFIG[mode];
  const Icon = cfg.icon;

  const handleShutter = () => {
    if (mode === 'moment') {
      setFlashOverlay(true);
      setTimeout(() => setFlashOverlay(false), 180);
    } else {
      setRecording((r) => !r);
    }
  };

  return (
    <div className="size-full relative overflow-hidden" style={{ background: '#05050f' }}>

      {/* ── ファインダー背景 ── */}
      <div className="absolute inset-0">
        <img
          src={VIEWFINDER_BG}
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.45) saturate(0.7)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, transparent 30%, rgba(5,5,15,0.75) 100%)`,
          }}
        />
        {/* モードカラーの光 */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: recording ? 0.18 : 0.08 }}
          style={{ background: `radial-gradient(ellipse at center, ${cfg.color} 0%, transparent 70%)` }}
          transition={{ duration: 0.6 }}
        />
      </div>

      {/* フラッシュオーバーレイ */}
      <AnimatePresence>
        {flashOverlay && (
          <motion.div
            className="absolute inset-0 z-50"
            style={{ background: '#fff' }}
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          />
        )}
      </AnimatePresence>

      {/* グリッド線 */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.12 }}>
        <div className="absolute top-1/3 left-0 right-0 h-px bg-white" />
        <div className="absolute top-2/3 left-0 right-0 h-px bg-white" />
        <div className="absolute top-0 bottom-0 left-1/3 w-px bg-white" />
        <div className="absolute top-0 bottom-0 left-2/3 w-px bg-white" />
      </div>

      {/* ── パルスリング & 粒子（中央フォーカスエリア） ── */}
      <AnimatePresence>
        {recording && (
          <>
            <PulseRings color={cfg.color} glow={cfg.glow} />
            <Particles color={cfg.color} />
          </>
        )}
      </AnimatePresence>

      {/* 中央フォーカスL字 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative" style={{ width: 160, height: 160 }}>
          {[
            'top-0 left-0 border-t-2 border-l-2 rounded-tl-lg w-8 h-8',
            'top-0 right-0 border-t-2 border-r-2 rounded-tr-lg w-8 h-8',
            'bottom-0 left-0 border-b-2 border-l-2 rounded-bl-lg w-8 h-8',
            'bottom-0 right-0 border-b-2 border-r-2 rounded-br-lg w-8 h-8',
          ].map((cls, i) => (
            <motion.div
              key={i}
              className={`absolute ${cls}`}
              animate={{ borderColor: cfg.color, boxShadow: recording ? `0 0 8px ${cfg.glow}` : 'none' }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </div>
      </div>

      {/* ── 上部コントロール ── */}
      <div className="absolute top-2 left-0 right-0 px-6 flex items-center justify-between z-10">
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => setFlash(!flash)}
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          {flash
            ? <Zap className="w-5 h-5" style={{ color: '#fbbf24' }} />
            : <ZapOff className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.5)' }} />
          }
        </motion.button>

        {/* センサーインジケーター */}
        <AnimatePresence>
          {recording && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(5,5,15,0.6)', backdropFilter: 'blur(12px)', border: `1px solid ${cfg.color}40` }}
            >
              <motion.div
                animate={{ opacity: [1, 0.2, 1], scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-2 h-2 rounded-full"
                style={{ background: cfg.color }}
              />
              <span style={{ color: cfg.color, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em' }}>
                {mode === 'moment' ? 'CAPTURING' : mode === 'sound' ? 'RECORDING' : 'SENSING'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileTap={{ scale: 0.85, rotate: 180 }}
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          <FlipHorizontal className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.6)' }} />
        </motion.button>
      </div>

      {/* ── 音声波形（SOUNDモード時） ── */}
      <AnimatePresence>
        {mode === 'sound' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute left-8 right-8 flex justify-center"
            style={{ bottom: 260 }}
          >
            <WaveBar active={recording} color={cfg.color} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* FEELINGモードのセンサー表示 */}
      <AnimatePresence>
        {mode === 'feeling' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute left-6 right-6 flex gap-3 justify-center"
            style={{ bottom: 260 }}
          >
            {[
              { label: '温度', value: '24.3°C', bar: 0.6 },
              { label: '湿度', value: '58%', bar: 0.58 },
              { label: '振動', value: '0.02g', bar: recording ? 0.8 : 0.15 },
            ].map((s) => (
              <div
                key={s.label}
                className="flex-1 rounded-2xl p-2.5"
                style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', border: '1px solid rgba(52,211,153,0.2)' }}
              >
                <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em' }}>{s.label}</p>
                <p style={{ fontSize: 13, fontWeight: 700, color: cfg.color }}>{s.value}</p>
                <div className="mt-1.5 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    animate={{ width: `${s.bar * 100}%` }}
                    style={{ background: cfg.color }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 下部コントロール ── */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 z-10">

        {/* モード説明 */}
        <AnimatePresence mode="wait">
          <motion.p
            key={mode}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="text-center mb-3"
            style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.06em' }}
          >
            {cfg.description}
          </motion.p>
        </AnimatePresence>

        {/* モード切り替え */}
        <div className="flex justify-center mb-6">
          <div
            className="flex rounded-full p-0.5"
            style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            {(Object.keys(MODE_CONFIG) as CaptureMode[]).map((m) => {
              const c = MODE_CONFIG[m];
              const MIcon = c.icon;
              const isActive = mode === m;
              return (
                <motion.button
                  key={m}
                  onClick={() => { setMode(m); setRecording(false); }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full transition-all"
                  animate={{
                    background: isActive ? c.color + '28' : 'transparent',
                    color: isActive ? c.color : 'rgba(255,255,255,0.4)',
                  }}
                  style={{ fontSize: 11, fontWeight: isActive ? 700 : 400 }}
                >
                  <MIcon className="w-3 h-3" />
                  {c.sublabel}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* シャッター行 */}
        <div className="flex items-center justify-between">
          {/* 最近のサムネイル */}
          <div
            className="w-14 h-14 rounded-2xl overflow-hidden"
            style={{ border: '1.5px solid rgba(255,255,255,0.2)', boxShadow: '0 4px 16px rgba(0,0,0,0.4)' }}
          >
            <img
              src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=120&h=120&fit=crop&auto=format"
              alt="直近"
              className="w-full h-full object-cover"
            />
          </div>

          {/* シャッターボタン */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleShutter}
            className="relative flex items-center justify-center"
            style={{ width: 80, height: 80 }}
          >
            {/* 外リング */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ borderColor: cfg.color, boxShadow: recording ? `0 0 20px ${cfg.glow}` : 'none' }}
              style={{ border: '2.5px solid' }}
              transition={{ duration: 0.4 }}
            />
            {/* 中ボタン */}
            <motion.div
              animate={{
                width: recording && mode !== 'moment' ? 28 : 58,
                height: recording && mode !== 'moment' ? 28 : 58,
                borderRadius: recording && mode !== 'moment' ? 8 : 999,
                background: cfg.color,
                boxShadow: `0 0 ${recording ? 28 : 12}px ${cfg.glow}`,
              }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            />
            {/* アイコン */}
            <motion.div
              className="absolute flex items-center justify-center"
              animate={{ opacity: recording ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <Icon className="w-5 h-5" style={{ color: '#05050f' }} />
            </motion.div>
          </motion.button>

          {/* モードアイコン表示 */}
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <motion.div animate={{ color: cfg.color }} transition={{ duration: 0.4 }}>
              <Icon className="w-6 h-6" />
            </motion.div>
          </div>
        </div>

        {/* ヒントテキスト */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`hint-${mode}-${recording}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center mt-4"
            style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}
          >
            {recording
              ? mode === 'moment' ? '撮影完了' : 'タップして終了'
              : mode === 'moment' ? 'タップして撮影' : 'タップして開始'}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
