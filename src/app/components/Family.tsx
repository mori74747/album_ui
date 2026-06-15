import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ChevronRight, Plus, Lock } from 'lucide-react';

const familyMembers = [
  { id: 1, name: 'パパ', role: '父', thumb: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format', albumCount: 12, color: '#d97706' },
  { id: 2, name: 'ママ', role: '母', thumb: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&auto=format', albumCount: 18, color: '#be185d' },
  { id: 3, name: 'ゆい', role: '長女 6歳', thumb: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200&h=200&fit=crop&auto=format', albumCount: 7, color: '#0891b2' },
  { id: 4, name: 'こうた', role: '長男 3歳', thumb: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=200&h=200&fit=crop&auto=format', albumCount: 4, color: '#059669' },
];

const sharedMoments = [
  {
    id: 1,
    author: familyMembers[1],
    type: 'sound' as const,
    time: '今日 14:32',
    message: 'こうたがはじめて「パパだいすき」って言ったよ',
    reactions: [
      { member: familyMembers[0], emoji: '🥹' },
      { member: familyMembers[2], emoji: '💕' },
    ],
    duration: '0:06',
  },
  {
    id: 2,
    author: familyMembers[0],
    type: 'moment' as const,
    time: '昨日 08:12',
    message: '朝ごはんのゆいの顔がかわいすぎた',
    thumb: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop&auto=format',
    reactions: [
      { member: familyMembers[1], emoji: '😂' },
      { member: familyMembers[2], emoji: '😎' },
    ],
  },
  {
    id: 3,
    author: familyMembers[1],
    type: 'feeling' as const,
    time: '2日前 22:08',
    message: '川沿いのお散歩、夕焼けがきれいだった。風も気持ちよかったね',
    sensorSummary: { temp: '21.4°C', humid: '62%', vibr: '穏やか' },
    reactions: [{ member: familyMembers[0], emoji: '🌅' }],
  },
  {
    id: 4,
    author: familyMembers[0],
    type: 'moment' as const,
    time: '3日前 19:45',
    message: '京都旅行の最後の夜',
    thumb: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop&auto=format',
    reactions: [
      { member: familyMembers[1], emoji: '🏯' },
      { member: familyMembers[2], emoji: '✨' },
      { member: familyMembers[3], emoji: '🍡' },
    ],
  },
];

const TYPE_COLOR: Record<string, string> = { moment: '#d97706', sound: '#818cf8', feeling: '#34d399' };
const TYPE_LABEL: Record<string, string> = { moment: '瞬間', sound: '音', feeling: '感触' };

export default function Family() {
  const [reacting, setReacting] = useState<number | null>(null);

  return (
    <div
      className="size-full flex flex-col overflow-hidden relative"
      style={{ background: 'linear-gradient(170deg, #1a0a2e 0%, #16213e 55%, #0f1923 100%)' }}
    >
      {/* 星屑 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
            }}
            animate={{ opacity: [0.08, 0.4, 0.08] }}
            transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }}
          />
        ))}
      </div>

      <div className="relative z-10 size-full flex flex-col overflow-hidden">
        {/* ヘッダー */}
        <div className="px-5 pt-3 pb-3 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-current" style={{ color: '#e11d48' }} />
            <h1 style={{ fontWeight: 800, color: '#f1f5f9', fontSize: 20 }}>家族だけの場所</h1>
            <div
              className="flex items-center gap-1 px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <Lock className="w-2.5 h-2.5" style={{ color: 'rgba(255,255,255,0.4)' }} />
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em' }}>PRIVATE</span>
            </div>
          </div>
          <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
            家族だけが見られる思い出の記録
          </p>
        </div>

        {/* 家族メンバー */}
        <div className="px-5 mb-4 flex-shrink-0">
          <div className="flex gap-3 overflow-x-auto pb-1">
            {familyMembers.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                className="flex-shrink-0 flex flex-col items-center gap-1.5"
              >
                <div
                  className="rounded-full overflow-hidden"
                  style={{ width: 52, height: 52, boxShadow: `0 0 0 2px ${m.color}, 0 0 14px ${m.color}55` }}
                >
                  <img src={m.thumb} alt={m.name} className="w-full h-full object-cover" />
                </div>
                <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.65)', fontWeight: 600 }}>{m.name}</p>
              </motion.div>
            ))}
            <div className="flex-shrink-0 flex flex-col items-center gap-1.5">
              <div
                className="rounded-full flex items-center justify-center"
                style={{ width: 52, height: 52, border: '2px dashed rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.04)' }}
              >
                <Plus className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.25)' }} />
              </div>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>招待</p>
            </div>
          </div>
        </div>

        <div className="mx-5 mb-3 h-px flex-shrink-0" style={{ background: 'rgba(255,255,255,0.07)' }} />

        {/* 瞬間フィード */}
        <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-3">
          {sharedMoments.map((moment, idx) => (
            <motion.div
              key={moment.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.07 }}
              className="rounded-3xl overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}
            >
              {/* ヘッダー */}
              <div className="flex items-center gap-2.5 px-4 pt-3.5 pb-2">
                <div
                  className="rounded-full overflow-hidden flex-shrink-0"
                  style={{ width: 34, height: 34, boxShadow: `0 0 0 2px ${moment.author.color}` }}
                >
                  <img src={moment.author.thumb} alt={moment.author.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9' }}>{moment.author.name}</span>
                    <span
                      className="px-1.5 py-0.5 rounded-full"
                      style={{ fontSize: 9, fontWeight: 700, background: TYPE_COLOR[moment.type] + '22', color: TYPE_COLOR[moment.type], border: `1px solid ${TYPE_COLOR[moment.type]}44`, letterSpacing: '0.06em' }}
                    >
                      {TYPE_LABEL[moment.type]}
                    </span>
                  </div>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{moment.time}</span>
                </div>
              </div>

              {/* メッセージ */}
              <p className="px-4 pb-2" style={{ fontSize: 13, color: 'rgba(255,255,255,0.72)', lineHeight: 1.6 }}>
                {moment.message}
              </p>

              {/* 瞬間サムネイル */}
              {'thumb' in moment && moment.thumb && (
                <div className="mx-4 mb-2 rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <img src={moment.thumb as string} alt="" className="w-full h-full object-cover" />
                </div>
              )}

              {/* 音声バー */}
              {moment.type === 'sound' && (
                <div
                  className="mx-4 mb-2 flex items-center gap-3 px-3 py-2.5 rounded-2xl"
                  style={{ background: 'rgba(129,140,248,0.1)', border: '1px solid rgba(129,140,248,0.2)' }}
                >
                  <button className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs text-white" style={{ background: '#818cf8' }}>▶</button>
                  <div className="flex-1 flex items-end gap-0.5" style={{ height: 24 }}>
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div key={i} className="rounded-full" style={{ width: 3, background: '#818cf8', opacity: 0.55, height: `${15 + Math.abs(Math.sin(i * 0.9)) * 85}%` }} />
                    ))}
                  </div>
                  <span style={{ fontSize: 11, color: '#818cf8' }}>{'duration' in moment ? moment.duration : ''}</span>
                </div>
              )}

              {/* センサー */}
              {moment.type === 'feeling' && 'sensorSummary' in moment && moment.sensorSummary && (
                <div className="mx-4 mb-2 flex gap-2">
                  {Object.entries(moment.sensorSummary as Record<string, string>).map(([k, v]) => (
                    <div key={k} className="flex-1 px-2 py-1.5 rounded-xl text-center" style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)' }}>
                      <p style={{ fontSize: 9, color: 'rgba(52,211,153,0.55)', letterSpacing: '0.06em' }}>{k === 'temp' ? '温度' : k === 'humid' ? '湿度' : '振動'}</p>
                      <p style={{ fontSize: 12, fontWeight: 700, color: '#34d399' }}>{v}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* リアクション */}
              <div className="px-4 pb-3.5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {moment.reactions.map((r, i) => (
                    <motion.div key={i} className="flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }} whileTap={{ scale: 1.2 }}>
                      <span style={{ fontSize: 13 }}>{r.emoji}</span>
                      <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.38)' }}>{r.member.name}</span>
                    </motion.div>
                  ))}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setReacting(reacting === moment.id ? null : moment.id)}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}
                  >
                    +
                  </motion.button>
                </div>
                <ChevronRight className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.18)' }} />
              </div>

              <AnimatePresence>
                {reacting === moment.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-4 pb-3 flex gap-3 justify-center overflow-hidden"
                  >
                    {['🥹', '💕', '😂', '🌅', '✨', '😎', '🏯', '🍡'].map((e) => (
                      <motion.button key={e} whileTap={{ scale: 1.3 }} onClick={() => setReacting(null)} style={{ fontSize: 22 }}>{e}</motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          <motion.button
            whileTap={{ scale: 0.97 }}
            className="w-full py-4 rounded-3xl flex items-center justify-center gap-2"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1.5px dashed rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.38)', fontSize: 13, fontWeight: 600 }}
          >
            <Plus className="w-4 h-4" />
            今日の瞬間を家族に届ける
          </motion.button>
        </div>
      </div>
    </div>
  );
}
