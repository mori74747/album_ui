import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, TrendingUp, Search, Heart, BookOpen, Star } from 'lucide-react';
import { Album, ViewMode } from '../App';

// ── データ ──────────────────────────────────────────────────────────────
const recommendedAlbums: Album[] = [
  { id: 1, title: '去年の今日', date: '2025年6月', thumbnail: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&h=600&fit=crop&auto=format', photoCount: 24, season: 'summer', weather: 'sunny' },
  { id: 2, title: '春の旅行', date: '2026年3月', thumbnail: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&h=600&fit=crop&auto=format', photoCount: 156, season: 'spring', weather: 'sunny' },
  { id: 3, title: '冬の思い出', date: '2025年12月', thumbnail: 'https://images.unsplash.com/photo-1476234251651-f353703a034d?w=800&h=600&fit=crop&auto=format', photoCount: 48, season: 'winter', weather: 'snowy' },
];

const allAlbums: Album[] = [
  { id: 1, title: '去年の今日', date: '2025年6月', thumbnail: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=300&h=400&fit=crop&auto=format', photoCount: 24, season: 'summer' },
  { id: 2, title: '春の旅行', date: '2026年3月', thumbnail: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=300&h=400&fit=crop&auto=format', photoCount: 156, season: 'spring' },
  { id: 3, title: '夏の記録', date: '2025年8月', thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop&auto=format', photoCount: 89, season: 'summer' },
  { id: 4, title: '冬の思い出', date: '2025年12月', thumbnail: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=300&h=400&fit=crop&auto=format', photoCount: 67, season: 'winter' },
  { id: 5, title: '家族旅行', date: '2025年10月', thumbnail: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=300&h=400&fit=crop&auto=format', photoCount: 120, season: 'autumn' },
  { id: 6, title: '誕生日', date: '2026年1月', thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=400&fit=crop&auto=format', photoCount: 35, season: 'winter' },
  { id: 7, title: 'お出かけ', date: '2025年9月', thumbnail: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&h=400&fit=crop&auto=format', photoCount: 52, season: 'autumn' },
  { id: 8, title: '夏休み', date: '2025年7月', thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=400&fit=crop&auto=format', photoCount: 98, season: 'summer' },
];

const timeCapsules = [
  { id: 1, title: '未来の自分へ', scheduledDate: '2030年1月1日', thumb: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&h=200&fit=crop&auto=format', message: '10年後のあなたへ、今日はとても幸せです。', locked: true },
  { id: 2, title: 'ゆいへ 20歳の誕生日に', scheduledDate: '2036年5月3日', thumb: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=200&h=200&fit=crop&auto=format', message: '20歳おめでとう！あの頃の思い出を…', locked: true },
  { id: 3, title: '家族みんなへ', scheduledDate: '2028年12月25日', thumb: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=200&h=200&fit=crop&auto=format', message: 'クリスマスに開けてください。', locked: false },
];

const growthRecords = [
  { id: 1, name: 'ゆい', age: '6歳', height: '112cm', thumb: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200&h=200&fit=crop&auto=format', milestones: ['初めての小学校', 'ピアノ発表会', 'お泳ぎ教室'] },
  { id: 2, name: 'こうた', age: '3歳', height: '96cm', thumb: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=200&h=200&fit=crop&auto=format', milestones: ['初めての言葉', 'ひとりで歩けた', 'トイレ完了'] },
];

// おすすめ → アルバム一覧 → タイムカプセル → 成長記録
const SECTIONS = ['おすすめ', 'アルバム一覧', 'タイムカプセル', '成長記録'] as const;
type Section = typeof SECTIONS[number];

interface HomeProps {
  onAlbumSelect: (album: Album) => void;
  onMenuOpen: () => void;
  viewMode: ViewMode;
}

export default function Home({ onAlbumSelect, onMenuOpen }: HomeProps) {
  const [section, setSection] = useState<Section>('おすすめ');
  const [dir, setDir] = useState<1 | -1>(1); // 1 = forward, -1 = back
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const idx = SECTIONS.indexOf(section);

  const goTo = (next: Section) => {
    const nextIdx = SECTIONS.indexOf(next);
    setDir(nextIdx > idx ? 1 : -1);
    setSection(next);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
    if (dy > Math.abs(dx) * 0.8 || Math.abs(dx) < 44) return;
    if (dx < 0 && idx < SECTIONS.length - 1) goTo(SECTIONS[idx + 1]);
    else if (dx > 0 && idx > 0) goTo(SECTIONS[idx - 1]);
  };

  const sectionLabel: Record<Section, string> = {
    'おすすめ': '今日のおすすめ',
    'アルバム一覧': 'アルバム一覧',
    'タイムカプセル': 'タイムカプセル',
    '成長記録': '成長記録',
  };

  return (
    <div
      className="size-full flex flex-col relative overflow-hidden"
      style={{ background: 'linear-gradient(170deg, #fef3c7 0%, #fde68a 45%, #fef9f0 100%)' }}
    >
      {/* 木目テクスチャ */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(92deg, transparent, transparent 4px, rgba(100,50,0,0.035) 4px, rgba(100,50,0,0.035) 8px)`,
          opacity: 1,
        }}
      />

      {/* ── ヘッダー ── */}
      <div className="relative z-10 flex items-center justify-between px-5 pt-1 pb-2 flex-shrink-0">
        <div>
          <p style={{ fontSize: 11, color: '#a16207', letterSpacing: '0.06em' }}>
            2026年6月10日 火曜日
          </p>
          <AnimatePresence mode="wait">
            <motion.h1
              key={section}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              style={{ fontSize: 20, fontWeight: 800, color: '#78350f', lineHeight: 1.2 }}
            >
              {sectionLabel[section]}
            </motion.h1>
          </AnimatePresence>
        </div>
        {/* ハンバーガー */}
        <button
          onClick={onMenuOpen}
          className="flex flex-col gap-1.5 p-2 rounded-xl active:scale-90 transition-transform"
        >
          <span className="block h-0.5 rounded-full" style={{ width: 22, background: '#92400e' }} />
          <span className="block h-0.5 rounded-full" style={{ width: 16, background: '#92400e' }} />
          <span className="block h-0.5 rounded-full" style={{ width: 22, background: '#92400e' }} />
        </button>
      </div>

      {/* ── セクションピル ── */}
      <div className="relative z-10 flex gap-1.5 px-5 pb-2.5 flex-shrink-0 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {SECTIONS.map((s) => (
          <button
            key={s}
            onClick={() => goTo(s)}
            className="flex-shrink-0 px-3 py-1 rounded-full transition-all"
            style={{
              fontSize: 11,
              fontWeight: s === section ? 700 : 400,
              background: s === section
                ? 'linear-gradient(135deg, #b45309, #d97706)'
                : 'rgba(180,100,20,0.1)',
              color: s === section ? '#fff' : '#92400e',
              boxShadow: s === section ? '0 2px 8px rgba(180,100,20,0.3)' : 'none',
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* ── スワイプコンテンツ ── */}
      <div
        className="flex-1 overflow-hidden relative z-10"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          {/* おすすめ */}
          {section === 'おすすめ' && (
            <SectionWrap key="rec" dir={dir}>
              <div className="space-y-4 pt-0.5">
                {recommendedAlbums.map((album, i) => (
                  <motion.div
                    key={album.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.09, type: 'spring', stiffness: 100 }}
                  >
                    <motion.div
                      whileTap={{ scale: 0.975 }}
                      onClick={() => onAlbumSelect(album)}
                      className="cursor-pointer rounded-3xl overflow-hidden relative"
                      style={{ boxShadow: '0 12px 40px rgba(100,50,0,0.2), 0 2px 8px rgba(100,50,0,0.1)' }}
                    >
                      {/* 背表紙帯 */}
                      <div
                        className="absolute left-0 top-0 bottom-0 w-4 z-10"
                        style={{ background: 'linear-gradient(180deg, #92400e 0%, #b45309 50%, #d97706 100%)', boxShadow: 'inset -3px 0 8px rgba(0,0,0,0.25)' }}
                      />
                      <div className="ml-4" style={{ aspectRatio: '16/10' }}>
                        <img src={album.thumbnail} alt={album.title} className="w-full h-full object-cover" />
                        {/* グラデオーバーレイ */}
                        <div className="absolute inset-0 ml-4" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.05) 55%, transparent 100%)' }} />
                        {/* テープ */}
                        <div className="absolute top-3 right-8 w-12 h-4 rotate-6 z-10" style={{ background: 'rgba(255,251,235,0.75)', borderRadius: 2 }} />
                        {/* テキスト */}
                        <div className="absolute bottom-0 left-4 right-0 p-4 z-10">
                          <div className="flex items-center gap-2 mb-1">
                            <Star className="w-3.5 h-3.5 fill-current" style={{ color: '#fbbf24' }} />
                            <span style={{ fontSize: 10, color: '#fde68a', letterSpacing: '0.08em' }}>AIおすすめ</span>
                          </div>
                          <h3 style={{ fontSize: 20, fontWeight: 800, color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>{album.title}</h3>
                          <div className="flex items-center justify-between mt-1">
                            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>{album.date}</span>
                            <span style={{ fontSize: 11, color: '#fef3c7', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', padding: '2px 10px', borderRadius: 999 }}>
                              {album.photoCount}枚
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
                <p className="text-center py-2" style={{ fontSize: 11, color: '#b45309', opacity: 0.7 }}>← スワイプでアルバム一覧へ →</p>
              </div>
            </SectionWrap>
          )}

          {/* アルバム一覧 */}
          {section === 'アルバム一覧' && (
            <SectionWrap key="albums" dir={dir}>
              {/* 検索 */}
              <div className="relative mb-3">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#d97706' }} />
                <input
                  type="text"
                  placeholder="思い出を探す..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl focus:outline-none"
                  style={{ background: 'rgba(255,255,255,0.8)', border: '1.5px solid rgba(180,100,20,0.2)', fontSize: 13, color: '#78350f' }}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {allAlbums.map((album, i) => (
                  <motion.div
                    key={album.id}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => onAlbumSelect(album)}
                    className="cursor-pointer rounded-2xl overflow-hidden"
                    style={{ boxShadow: '0 4px 16px rgba(100,50,0,0.14)' }}
                  >
                    {/* 背表紙帯 */}
                    <div className="relative">
                      <div className="absolute left-0 top-0 bottom-0 w-2.5 z-10" style={{ background: 'linear-gradient(180deg, #92400e, #d97706)' }} />
                      <div className="ml-2.5" style={{ aspectRatio: '3/4' }}>
                        <img src={album.thumbnail} alt={album.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 ml-2.5" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)' }} />
                      </div>
                    </div>
                    <div className="px-2.5 py-2" style={{ background: '#fff' }}>
                      <p className="truncate" style={{ fontSize: 12, fontWeight: 700, color: '#78350f' }}>{album.title}</p>
                      <div className="flex items-center justify-between mt-0.5">
                        <span style={{ fontSize: 10, color: '#a16207' }}>{album.date}</span>
                        <span style={{ fontSize: 10, color: '#b45309', background: 'rgba(180,100,20,0.1)', padding: '1px 6px', borderRadius: 999 }}>{album.photoCount}枚</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-3 text-center flex items-center justify-center gap-1" style={{ fontSize: 11, color: '#b45309', opacity: 0.7 }}>
                <BookOpen className="w-3 h-3" /><span>全 {allAlbums.length} 冊</span>
              </div>
            </SectionWrap>
          )}

          {/* タイムカプセル */}
          {section === 'タイムカプセル' && (
            <SectionWrap key="capsule" dir={dir}>
              <p style={{ fontSize: 12, color: '#92400e', marginBottom: 12 }}>未来の自分や家族に、今の想いを届けよう</p>
              <div className="space-y-3">
                {timeCapsules.map((c, i) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="rounded-2xl overflow-hidden"
                    style={{ background: c.locked ? 'linear-gradient(135deg, #fef3c7, #fde68a)' : 'linear-gradient(135deg, #d1fae5, #a7f3d0)', boxShadow: '0 4px 16px rgba(100,50,0,0.1)' }}
                  >
                    <div className="flex items-center gap-3 p-3.5">
                      <div className="relative rounded-xl overflow-hidden flex-shrink-0" style={{ width: 60, height: 60 }}>
                        <img src={c.thumb} alt={c.title} className="w-full h-full object-cover" style={{ filter: c.locked ? 'blur(5px) brightness(0.65)' : 'none' }} />
                        {c.locked && <div className="absolute inset-0 flex items-center justify-center"><Clock className="w-5 h-5 text-white" /></div>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate" style={{ fontSize: 14, fontWeight: 700, color: '#78350f' }}>{c.title}</p>
                        <p style={{ fontSize: 11, color: '#92400e', marginTop: 2 }}>開封日: {c.scheduledDate}</p>
                        <p className="truncate" style={{ fontSize: 11, color: '#a16207', marginTop: 2 }}>{c.message}</p>
                      </div>
                      <div className="flex-shrink-0 px-2 py-1 rounded-lg" style={{ background: c.locked ? 'rgba(180,100,20,0.15)' : 'rgba(5,150,105,0.15)', fontSize: 11, color: c.locked ? '#92400e' : '#065f46', fontWeight: 600 }}>
                        {c.locked ? '封印中' : '開封可'}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.button whileTap={{ scale: 0.97 }} className="w-full mt-4 py-3.5 rounded-2xl" style={{ background: 'linear-gradient(135deg, #b45309, #d97706)', color: '#fff', fontSize: 13, fontWeight: 700, boxShadow: '0 4px 16px rgba(180,100,20,0.3)' }}>
                + 新しいタイムカプセルを作成
              </motion.button>
            </SectionWrap>
          )}

          {/* 成長記録 */}
          {section === '成長記録' && (
            <SectionWrap key="growth" dir={dir}>
              <p style={{ fontSize: 12, color: '#92400e', marginBottom: 12 }}>子どもたちの大切な成長を記録しよう</p>
              {growthRecords.map((r, i) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="mb-4 rounded-2xl overflow-hidden"
                  style={{ background: '#fff', boxShadow: '0 4px 20px rgba(100,50,0,0.1)' }}
                >
                  <div className="flex items-center gap-3 p-3.5" style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)' }}>
                    <div className="rounded-full overflow-hidden flex-shrink-0 border-2" style={{ width: 50, height: 50, borderColor: '#d97706' }}>
                      <img src={r.thumb} alt={r.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p style={{ fontSize: 16, fontWeight: 800, color: '#78350f' }}>{r.name}</p>
                      <div className="flex gap-3 mt-0.5">
                        <span style={{ fontSize: 11, color: '#92400e' }}>{r.age}</span>
                        <span style={{ fontSize: 11, color: '#92400e' }}>身長 {r.height}</span>
                      </div>
                    </div>
                    <TrendingUp className="ml-auto w-4 h-4" style={{ color: '#d97706' }} />
                  </div>
                  <div className="p-3.5">
                    <p style={{ fontSize: 11, color: '#a16207', fontWeight: 700, marginBottom: 8 }}>最近のできごと</p>
                    <div className="space-y-1.5">
                      {r.milestones.map((m, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#d97706' }} />
                          <span style={{ fontSize: 13, color: '#78350f' }}>{m}</span>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-3 py-2 rounded-xl" style={{ background: 'rgba(180,100,20,0.08)', color: '#b45309', fontSize: 12, fontWeight: 700 }}>
                      記録を見る
                    </button>
                  </div>
                </motion.div>
              ))}
              <motion.button whileTap={{ scale: 0.97 }} className="w-full py-3.5 rounded-2xl" style={{ background: 'linear-gradient(135deg, #b45309, #d97706)', color: '#fff', fontSize: 13, fontWeight: 700, boxShadow: '0 4px 16px rgba(180,100,20,0.3)' }}>
                + 子どもを追加
              </motion.button>
            </SectionWrap>
          )}
        </AnimatePresence>
      </div>

      {/* ドットインジケーター */}
      <div className="flex justify-center items-center gap-2 pb-2.5 flex-shrink-0 relative z-10">
        {SECTIONS.map((s) => (
          <button
            key={s}
            onClick={() => goTo(s)}
            className="rounded-full transition-all"
            style={{
              width: s === section ? 22 : 6,
              height: 6,
              background: s === section ? '#b45309' : 'rgba(180,100,20,0.22)',
              transition: 'width 0.25s ease, background 0.2s',
            }}
          />
        ))}
      </div>
    </div>
  );
}

// スライドアニメーションラッパー
function SectionWrap({ children, dir }: { children: React.ReactNode; dir: 1 | -1 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: dir * 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: dir * -60 }}
      transition={{ duration: 0.26, ease: [0.32, 0, 0.18, 1] }}
      className="absolute inset-0 overflow-y-auto px-5 pb-4"
    >
      {children}
    </motion.div>
  );
}
