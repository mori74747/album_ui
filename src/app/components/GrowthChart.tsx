import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, Mic, User, ChevronDown, ChevronUp } from 'lucide-react';

const growthRecords = [
  {
    id: 1,
    name: 'ゆい',
    age: '6歳',
    height: '112cm',
    thumb: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200&h=200&fit=crop&auto=format',
    milestones: ['初めての小学校', 'ピアノ発表会', 'お泳ぎ教室'],
    // 年齢ごとの顔写真データ（AIがアルバムから収集）
    faceTimeline: [
      { age: '0歳', label: '赤ちゃん', src: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=200&h=200&fit=crop&auto=format' },
      { age: '2歳', label: 'よちよち', src: 'https://images.unsplash.com/photo-1555009393-f20bdb245c4d?w=200&h=200&fit=crop&auto=format' },
      { age: '4歳', label: 'やんちゃ', src: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200&h=200&fit=crop&auto=format' },
      { age: '6歳', label: '今の笑顔', src: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200&h=200&fit=crop&auto=format' },
    ],
    // 声の成長データ
    voiceTimeline: [
      { age: '0歳', label: '初めての泣き声', date: '2020年5月', duration: '0:04', barHeight: 0.25, emoji: '👶' },
      { age: '2歳', label: '初めての「ママ」', date: '2022年3月', duration: '0:03', barHeight: 0.45, emoji: '🗣' },
      { age: '3歳', label: 'お歌を歌えた', date: '2023年8月', duration: '0:12', barHeight: 0.6, emoji: '🎵' },
      { age: '5歳', label: 'ピアノ発表会', date: '2024年11月', duration: '1:45', barHeight: 0.82, emoji: '🎹' },
      { age: '6歳', label: '今日のひとこと', date: '2026年5月', duration: '0:08', barHeight: 0.95, emoji: '💬' },
    ],
    // 身長推移
    heightData: [
      { age: '0歳', cm: 51 },
      { age: '1歳', cm: 74 },
      { age: '2歳', cm: 84 },
      { age: '3歳', cm: 93 },
      { age: '4歳', cm: 100 },
      { age: '5歳', cm: 107 },
      { age: '6歳', cm: 112 },
    ],
  },
  {
    id: 2,
    name: 'こうた',
    age: '3歳',
    height: '96cm',
    thumb: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=200&h=200&fit=crop&auto=format',
    milestones: ['初めての言葉', 'ひとりで歩けた', 'トイレ完了'],
    faceTimeline: [
      { age: '0歳', label: '誕生', src: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=200&h=200&fit=crop&auto=format' },
      { age: '1歳', label: 'よちよち', src: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=200&h=200&fit=crop&auto=format' },
      { age: '3歳', label: '今の笑顔', src: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=200&h=200&fit=crop&auto=format' },
    ],
    voiceTimeline: [
      { age: '0歳', label: '産声', date: '2023年2月', duration: '0:02', barHeight: 0.2, emoji: '👶' },
      { age: '1歳', label: '初めての「まんま」', date: '2024年1月', duration: '0:05', barHeight: 0.5, emoji: '🗣' },
      { age: '3歳', label: '今日のおしゃべり', date: '2026年4月', duration: '0:15', barHeight: 0.78, emoji: '💬' },
    ],
    heightData: [
      { age: '0歳', cm: 49 },
      { age: '1歳', cm: 73 },
      { age: '2歳', cm: 86 },
      { age: '3歳', cm: 96 },
    ],
  },
];

type ChartView = 'overview' | 'face' | 'voice';

function HeightGraph({ data }: { data: { age: string; cm: number }[] }) {
  const max = Math.max(...data.map((d) => d.cm));
  const min = Math.min(...data.map((d) => d.cm));
  const range = max - min || 1;
  const w = 100 / (data.length - 1);

  const points = data.map((d, i) => ({
    x: i * w,
    y: 100 - ((d.cm - min) / range) * 72,
  }));
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <div>
      <p style={{ fontSize: 11, color: '#a16207', fontWeight: 700, marginBottom: 6 }}>身長の成長</p>
      <div style={{ position: 'relative', height: 80 }}>
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* グリッド */}
          {[0, 33, 66, 100].map((y) => (
            <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(180,100,20,0.1)" strokeWidth="0.5" />
          ))}
          {/* 折れ線 */}
          <path d={pathD} fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {/* エリア */}
          <path
            d={`${pathD} L ${points[points.length - 1].x} 100 L 0 100 Z`}
            fill="url(#heightGrad)"
            opacity="0.3"
          />
          <defs>
            <linearGradient id="heightGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* 点 */}
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="2.5" fill="#d97706" />
          ))}
        </svg>
        {/* ラベル */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between" style={{ top: 82 }}>
          {data.map((d) => (
            <span key={d.age} style={{ fontSize: 9, color: '#a16207', textAlign: 'center' }}>{d.age}</span>
          ))}
        </div>
      </div>
      <div className="mt-7 text-right">
        <span style={{ fontSize: 11, color: '#78350f', fontWeight: 700 }}>現在 {data[data.length - 1].cm}cm</span>
        <span style={{ fontSize: 10, color: '#a16207' }}> (+{data[data.length - 1].cm - data[0].cm}cm)</span>
      </div>
    </div>
  );
}

function FaceTimeline({ data }: { data: { age: string; label: string; src: string }[] }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-3">
        <div className="px-2 py-0.5 rounded-full" style={{ background: 'rgba(139,92,246,0.12)', color: '#7c3aed', fontSize: 10, fontWeight: 700 }}>
          ✦ AI顔認識
        </div>
        <span style={{ fontSize: 10, color: '#a16207' }}>アルバムから自動収集</span>
      </div>
      {/* タイムライン横スクロール */}
      <div className="relative">
        {/* 繋ぐ線 */}
        <div className="absolute top-8 left-8 right-8 h-0.5" style={{ background: 'linear-gradient(to right, #d97706, #fbbf24)', opacity: 0.4 }} />
        <div className="flex gap-4 overflow-x-auto pb-2">
          {data.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              className="flex-shrink-0 flex flex-col items-center gap-2"
            >
              <div
                className="rounded-full overflow-hidden border-2"
                style={{ width: 56, height: 56, borderColor: '#d97706', boxShadow: '0 4px 12px rgba(180,100,20,0.2)' }}
              >
                <img src={f.src} alt={f.age} className="w-full h-full object-cover" />
              </div>
              <div className="text-center">
                <p style={{ fontSize: 11, fontWeight: 700, color: '#78350f' }}>{f.age}</p>
                <p style={{ fontSize: 9, color: '#a16207' }}>{f.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VoiceTimeline({ data }: { data: { age: string; label: string; date: string; duration: string; barHeight: number; emoji: string }[] }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-3">
        <div className="px-2 py-0.5 rounded-full" style={{ background: 'rgba(129,140,248,0.12)', color: '#818cf8', fontSize: 10, fontWeight: 700 }}>
          ✦ AI声解析
        </div>
        <span style={{ fontSize: 10, color: '#a16207' }}>動画・音声から自動抽出</span>
      </div>
      {/* 棒グラフ＋タイムライン */}
      <div className="mb-3 flex items-end gap-2" style={{ height: 72 }}>
        {data.map((v, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <span style={{ fontSize: 14 }}>{v.emoji}</span>
            <motion.div
              className="w-full rounded-t-lg"
              initial={{ height: 0 }}
              animate={{ height: `${v.barHeight * 44}px` }}
              transition={{ delay: i * 0.08, type: 'spring', stiffness: 120 }}
              style={{ background: `rgba(129,140,248,${0.3 + v.barHeight * 0.5})`, minHeight: 4 }}
            />
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {data.map((v, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex items-center gap-3 p-2.5 rounded-xl"
            style={{ background: 'rgba(129,140,248,0.06)', border: '1px solid rgba(129,140,248,0.12)' }}
          >
            <span style={{ fontSize: 18, flexShrink: 0 }}>{v.emoji}</span>
            <div className="flex-1 min-w-0">
              <p style={{ fontSize: 12, fontWeight: 600, color: '#78350f' }}>{v.label}</p>
              <p style={{ fontSize: 9, color: '#a16207' }}>{v.age} · {v.date}</p>
            </div>
            <button
              className="flex items-center gap-1 px-2 py-1 rounded-lg flex-shrink-0"
              style={{ background: 'rgba(129,140,248,0.15)', color: '#818cf8', fontSize: 10, fontWeight: 700 }}
            >
              ▶ {v.duration}
            </button>
          </motion.div>
        ))}
      </div>
      <p className="mt-2" style={{ fontSize: 10, color: '#9ca3af' }}>
        AIが声紋を解析し、{data.length}つの成長の記録を自動でまとめました。
      </p>
    </div>
  );
}

interface GrowthChartProps {
  dir: 1 | -1;
}

export default function GrowthChart({ dir }: GrowthChartProps) {
  const [selectedChild, setSelectedChild] = useState(0);
  const [view, setView] = useState<ChartView>('overview');
  const [expanded, setExpanded] = useState<ChartView | null>(null);
  const child = growthRecords[selectedChild];

  return (
    <motion.div
      initial={{ opacity: 0, x: dir * 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: dir * -60 }}
      transition={{ duration: 0.26, ease: [0.32, 0, 0.18, 1] }}
      className="absolute inset-0 overflow-y-auto px-5 pb-4"
    >
      <p style={{ fontSize: 12, color: '#92400e', marginBottom: 12 }}>子どもたちの大切な成長を記録しよう</p>

      {/* 子ども選択 */}
      <div className="flex gap-2 mb-4">
        {growthRecords.map((r, i) => (
          <button
            key={r.id}
            onClick={() => { setSelectedChild(i); setView('overview'); setExpanded(null); }}
            className="flex items-center gap-2 px-3 py-2 rounded-2xl transition-all"
            style={{
              background: selectedChild === i ? 'linear-gradient(135deg, #b45309, #d97706)' : 'rgba(255,255,255,0.8)',
              border: '1.5px solid rgba(180,100,20,0.2)',
              color: selectedChild === i ? '#fff' : '#78350f',
              fontWeight: selectedChild === i ? 700 : 400,
            }}
          >
            <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
              <img src={r.thumb} alt={r.name} className="w-full h-full object-cover" />
            </div>
            <span style={{ fontSize: 12 }}>{r.name}</span>
          </button>
        ))}
      </div>

      {/* プロフィール帯 */}
      <div
        className="flex items-center gap-3 p-3.5 rounded-2xl mb-3"
        style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)' }}
      >
        <div className="rounded-full overflow-hidden flex-shrink-0 border-2" style={{ width: 50, height: 50, borderColor: '#d97706' }}>
          <img src={child.thumb} alt={child.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <p style={{ fontSize: 16, fontWeight: 800, color: '#78350f' }}>{child.name}</p>
          <div className="flex gap-3 mt-0.5">
            <span style={{ fontSize: 11, color: '#92400e' }}>{child.age}</span>
            <span style={{ fontSize: 11, color: '#92400e' }}>身長 {child.height}</span>
          </div>
        </div>
        <TrendingUp className="ml-auto w-4 h-4" style={{ color: '#d97706' }} />
      </div>

      {/* ビュー切り替えタブ */}
      <div
        className="flex rounded-2xl p-0.5 mb-4"
        style={{ background: 'rgba(180,100,20,0.1)' }}
      >
        {([
          { key: 'overview', label: '成長グラフ', icon: TrendingUp },
          { key: 'face', label: '顔の成長', icon: User },
          { key: 'voice', label: '声の成長', icon: Mic },
        ] as { key: ChartView; label: string; icon: React.ElementType }[]).map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setView(key)}
            className="flex-1 py-2 rounded-xl flex items-center justify-center gap-1 transition-all"
            style={{
              background: view === key ? '#b45309' : 'transparent',
              color: view === key ? '#fff' : '#92400e',
              fontSize: 11,
              fontWeight: view === key ? 700 : 400,
              boxShadow: view === key ? '0 2px 8px rgba(180,100,20,0.3)' : 'none',
            }}
          >
            <Icon className="w-3 h-3" />
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {view === 'overview' && (
          <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {/* 身長グラフ */}
            <div
              className="rounded-2xl p-4 mb-3"
              style={{ background: '#fff', boxShadow: '0 4px 20px rgba(100,50,0,0.08)' }}
            >
              <HeightGraph data={child.heightData} />
            </div>

            {/* 顔の成長サマリー（折りたたみ） */}
            <div
              className="rounded-2xl overflow-hidden mb-3"
              style={{ background: '#fff', boxShadow: '0 4px 20px rgba(100,50,0,0.08)' }}
            >
              <button
                className="w-full flex items-center justify-between p-4"
                onClick={() => setExpanded(expanded === 'face' ? null : 'face')}
              >
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" style={{ color: '#7c3aed' }} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#78350f' }}>顔の成長タイムライン</span>
                  <span className="px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(139,92,246,0.1)', color: '#7c3aed', fontSize: 9, fontWeight: 700 }}>AI</span>
                </div>
                {expanded === 'face' ? <ChevronUp className="w-4 h-4" style={{ color: '#b45309' }} /> : <ChevronDown className="w-4 h-4" style={{ color: '#b45309' }} />}
              </button>
              <AnimatePresence>
                {expanded === 'face' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4">
                      <FaceTimeline data={child.faceTimeline} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 声の成長サマリー（折りたたみ） */}
            <div
              className="rounded-2xl overflow-hidden mb-3"
              style={{ background: '#fff', boxShadow: '0 4px 20px rgba(100,50,0,0.08)' }}
            >
              <button
                className="w-full flex items-center justify-between p-4"
                onClick={() => setExpanded(expanded === 'voice' ? null : 'voice')}
              >
                <div className="flex items-center gap-2">
                  <Mic className="w-4 h-4" style={{ color: '#818cf8' }} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#78350f' }}>声の成長タイムライン</span>
                  <span className="px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(129,140,248,0.1)', color: '#818cf8', fontSize: 9, fontWeight: 700 }}>AI</span>
                </div>
                {expanded === 'voice' ? <ChevronUp className="w-4 h-4" style={{ color: '#b45309' }} /> : <ChevronDown className="w-4 h-4" style={{ color: '#b45309' }} />}
              </button>
              <AnimatePresence>
                {expanded === 'voice' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4">
                      <VoiceTimeline data={child.voiceTimeline} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 最近のできごと */}
            <div className="rounded-2xl p-4" style={{ background: '#fff', boxShadow: '0 4px 20px rgba(100,50,0,0.08)' }}>
              <p style={{ fontSize: 11, color: '#a16207', fontWeight: 700, marginBottom: 10 }}>最近のできごと</p>
              <div className="space-y-2">
                {child.milestones.map((m, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#d97706' }} />
                    <span style={{ fontSize: 13, color: '#78350f' }}>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {view === 'face' && (
          <motion.div key="face" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="rounded-2xl p-4" style={{ background: '#fff', boxShadow: '0 4px 20px rgba(100,50,0,0.08)' }}>
              <FaceTimeline data={child.faceTimeline} />
            </div>
          </motion.div>
        )}

        {view === 'voice' && (
          <motion.div key="voice" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="rounded-2xl p-4" style={{ background: '#fff', boxShadow: '0 4px 20px rgba(100,50,0,0.08)' }}>
              <VoiceTimeline data={child.voiceTimeline} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button whileTap={{ scale: 0.97 }} className="w-full mt-3 py-3.5 rounded-2xl" style={{ background: 'linear-gradient(135deg, #b45309, #d97706)', color: '#fff', fontSize: 13, fontWeight: 700, boxShadow: '0 4px 16px rgba(180,100,20,0.3)' }}>
        + 子どもを追加
      </motion.button>
    </motion.div>
  );
}
