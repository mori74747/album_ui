import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { X, Share2, Play, Heart } from 'lucide-react';
import { Album } from '../App';
import PhotoViewer from './PhotoViewer';
import AtmosphereEffect from './AtmosphereEffect';

const photoIds = [
  'photo-1502082553048-f009c37129b9',
  'photo-1493246507139-91e8fad9978e',
  'photo-1476234251651-f353703a034d',
  'photo-1506905925346-21bda4d32df4',
  'photo-1472214103451-9374bd1c798e',
  'photo-1501594907352-04cda38ebc29',
  'photo-1469474968028-56623f02e42e',
  'photo-1470071459604-3b5ec3a7fe05',
  'photo-1441974231531-c6227db76b6e',
  'photo-1426604966848-d7adac402bff',
  'photo-1475924156734-496f6cac6ec1',
  'photo-1418065460487-3e41a6c84dc5',
];

const captions = [
  'あの日の笑顔', 'みんなで一緒に', '忘れない景色', '大切な瞬間',
  'またここへ来ようね', '空がきれいだった', '楽しかったね', 'ありがとう',
];

const tapeColors = [
  'rgba(254,240,138,0.7)',
  'rgba(196,252,196,0.6)',
  'rgba(251,207,232,0.7)',
  'rgba(186,230,253,0.6)',
];

const generateMockPhotos = (albumId: number, count: number) =>
  Array.from({ length: Math.min(count, 12) }, (_, i) => ({
    id: `${albumId}-${i}`,
    url: `https://images.unsplash.com/${photoIds[i % photoIds.length]}?w=800`,
    thumbnail: `https://images.unsplash.com/${photoIds[i % photoIds.length]}?w=300&h=300&fit=crop`,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    caption: captions[i % captions.length],
    rotate: (Math.random() * 6 - 3).toFixed(1),
    tape: tapeColors[i % tapeColors.length],
  }));

interface AlbumDetailProps {
  album: Album;
  onClose: () => void;
}

type Layout = 'hero' | 'pair' | 'single' | 'trio';

// 写真を視覚的に多様なセクションに分割する
function buildSections(photos: ReturnType<typeof generateMockPhotos>) {
  const layouts: Layout[] = ['hero', 'pair', 'single', 'trio', 'pair', 'single'];
  const sections: { layout: Layout; photos: typeof photos }[] = [];
  let i = 0;
  for (const layout of layouts) {
    const take = layout === 'hero' ? 1 : layout === 'pair' ? 2 : layout === 'trio' ? 3 : 1;
    const chunk = photos.slice(i, i + take);
    if (chunk.length === 0) break;
    sections.push({ layout, photos: chunk });
    i += take;
    if (i >= photos.length) break;
  }
  return sections;
}

export default function AlbumDetail({ album, onClose }: AlbumDetailProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [showShare, setShowShare] = useState(false);
  const [likedPhotos, setLikedPhotos] = useState<Set<string>>(new Set());
  const photos = generateMockPhotos(album.id, album.photoCount);
  const sections = buildSections(photos);

  const toggleLike = (id: string) => {
    setLikedPhotos((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="size-full flex flex-col relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #fef9f0 0%, #fef3c7 50%, #fde68a 100%)' }}
    >
      <AtmosphereEffect season={album.season} weather={album.weather} />

      {/* ヘッダー */}
      <div className="relative z-20 px-4 pt-3 pb-3 flex-shrink-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ fontWeight: 800, color: '#78350f', fontSize: 22 }}
            >
              {album.title}
            </motion.h1>
            <p className="text-xs mt-0.5" style={{ color: '#92400e' }}>
              {album.date} · {album.photoCount}枚の思い出
            </p>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowShare(true)}
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.9)', border: '1.5px solid rgba(180,100,20,0.25)' }}
            >
              <Share2 className="w-4 h-4" style={{ color: '#b45309' }} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.9)', border: '1.5px solid rgba(180,100,20,0.25)' }}
            >
              <X className="w-4 h-4" style={{ color: '#78350f' }} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* スクラップブック本体 */}
      <div className="flex-1 overflow-y-auto relative z-10 px-4 pb-8">
        {sections.map((section, si) => (
          <motion.div
            key={si}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: si * 0.08, duration: 0.5 }}
            className="mb-6"
          >
            {/* ヒーロー: 全幅1枚 */}
            {section.layout === 'hero' && section.photos[0] && (
              <ScrapPhoto
                photo={section.photos[0]}
                wide
                liked={likedPhotos.has(section.photos[0].id)}
                onLike={() => toggleLike(section.photos[0].id)}
                onClick={() => setSelectedPhoto(section.photos[0].id)}
              />
            )}

            {/* ペア: 2列 */}
            {section.layout === 'pair' && (
              <div className="flex gap-3">
                {section.photos.map((p) => (
                  <div key={p.id} className="flex-1">
                    <ScrapPhoto
                      photo={p}
                      liked={likedPhotos.has(p.id)}
                      onLike={() => toggleLike(p.id)}
                      onClick={() => setSelectedPhoto(p.id)}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* シングル: 中央寄り */}
            {section.layout === 'single' && section.photos[0] && (
              <div className="px-6">
                <ScrapPhoto
                  photo={section.photos[0]}
                  liked={likedPhotos.has(section.photos[0].id)}
                  onLike={() => toggleLike(section.photos[0].id)}
                  onClick={() => setSelectedPhoto(section.photos[0].id)}
                />
              </div>
            )}

            {/* トリオ: 3列 */}
            {section.layout === 'trio' && (
              <div className="flex gap-2">
                {section.photos.map((p) => (
                  <div key={p.id} className="flex-1">
                    <ScrapPhoto
                      photo={p}
                      small
                      liked={likedPhotos.has(p.id)}
                      onLike={() => toggleLike(p.id)}
                      onClick={() => setSelectedPhoto(p.id)}
                    />
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center py-2"
        >
          <p className="text-sm italic" style={{ color: '#b45309' }}>
            — 大切な思い出、ずっとここに —
          </p>
        </motion.div>
      </div>

      {/* 写真ビューア */}
      <AnimatePresence>
        {selectedPhoto && (
          <PhotoViewer
            photo={photos.find((p) => p.id === selectedPhoto)!}
            onClose={() => setSelectedPhoto(null)}
          />
        )}
      </AnimatePresence>

      {/* 共有シート */}
      <AnimatePresence>
        {showShare && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-end"
            style={{ background: 'rgba(60,30,0,0.45)', backdropFilter: 'blur(2px)' }}
            onClick={() => setShowShare(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full rounded-t-3xl p-6"
              style={{ background: '#fef9f0' }}
            >
              <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: '#d97706' }} />
              <h2 style={{ fontWeight: 700, color: '#78350f', fontSize: 18 }} className="mb-1">
                思い出を共有
              </h2>
              <p className="text-sm mb-5" style={{ color: '#92400e' }}>
                家族や友達と一緒に見ましょう
              </p>
              <div className="space-y-3">
                <button
                  className="w-full py-4 rounded-2xl text-sm flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #be185d, #e11d48)', color: '#fff', fontWeight: 600 }}
                >
                  <Heart className="w-4 h-4" /> 家族と共有
                </button>
                <button
                  className="w-full py-4 rounded-2xl text-sm"
                  style={{ background: 'rgba(180,100,20,0.1)', color: '#92400e', fontWeight: 600 }}
                >
                  🔗 リンクをコピー
                </button>
                <button
                  onClick={() => setShowShare(false)}
                  className="w-full py-3 text-sm"
                  style={{ color: '#9ca3af' }}
                >
                  キャンセル
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ポラロイド/スクラップブック風の1枚
function ScrapPhoto({
  photo,
  wide,
  small,
  liked,
  onLike,
  onClick,
}: {
  photo: { id: string; thumbnail: string; caption: string; rotate: string; tape: string };
  wide?: boolean;
  small?: boolean;
  liked: boolean;
  onLike: () => void;
  onClick: () => void;
}) {
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      className="relative cursor-pointer select-none"
      style={{ transform: `rotate(${photo.rotate}deg)` }}
    >
      {/* テープ */}
      <div
        className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 z-10"
        style={{ background: photo.tape, borderRadius: 2, transform: 'translateX(-50%) rotate(-2deg)' }}
      />
      {/* ポラロイド枠 */}
      <div
        className="bg-white rounded-sm"
        style={{
          padding: small ? '4px 4px 20px' : '6px 6px 28px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15), 0 1px 4px rgba(0,0,0,0.08)',
        }}
      >
        {/* 写真 */}
        <div
          className="relative overflow-hidden rounded-sm group"
          style={{ aspectRatio: wide ? '4/3' : '1' }}
          onClick={onClick}
        >
          <img
            src={photo.thumbnail}
            alt={photo.caption}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
              <Play className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
        {/* キャプション */}
        {!small && (
          <div className="flex items-center justify-between mt-1 px-0.5">
            <p className="text-xs italic flex-1 truncate" style={{ color: '#78350f' }}>
              {photo.caption}
            </p>
            <button
              onClick={(e) => { e.stopPropagation(); onLike(); }}
              className="ml-1 flex-shrink-0"
            >
              <Heart
                className="w-3.5 h-3.5 transition-all"
                style={{
                  color: liked ? '#e11d48' : '#d1d5db',
                  fill: liked ? '#e11d48' : 'transparent',
                  transform: liked ? 'scale(1.2)' : 'scale(1)',
                }}
              />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
