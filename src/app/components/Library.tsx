import { motion } from 'motion/react';
import { Search, Heart } from 'lucide-react';
import { Album } from '../App';

// モックデータ
const allAlbums: Album[] = [
  { id: 1, title: '去年の今日', date: '2025年6月', thumbnail: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400', photoCount: 24, season: 'summer', weather: 'sunny' },
  { id: 2, title: '春の旅行', date: '2026年3月', thumbnail: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=400', photoCount: 156, season: 'spring', weather: 'sunny' },
  { id: 3, title: '最近の思い出', date: '2026年6月', thumbnail: 'https://images.unsplash.com/photo-1476234251651-f353703a034d?w=400', photoCount: 48, season: 'summer', weather: 'sunny' },
  { id: 4, title: '夏の記録', date: '2025年8月', thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', photoCount: 89, season: 'summer', weather: 'sunny' },
  { id: 5, title: '冬の思い出', date: '2025年12月', thumbnail: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400', photoCount: 67, season: 'winter', weather: 'snowy' },
  { id: 6, title: '家族旅行', date: '2025年10月', thumbnail: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400', photoCount: 120, season: 'autumn', weather: 'cloudy' },
  { id: 7, title: '誕生日', date: '2026年1月', thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400', photoCount: 35, season: 'winter', weather: 'sunny' },
  { id: 8, title: 'お出かけ', date: '2025年9月', thumbnail: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400', photoCount: 52, season: 'autumn', weather: 'sunny' },
  { id: 9, title: '夏休み', date: '2025年7月', thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400', photoCount: 98, season: 'summer', weather: 'sunny' },
];

interface LibraryProps {
  onAlbumSelect: (album: Album) => void;
}

export default function Library({ onAlbumSelect }: LibraryProps) {
  return (
    <div className="size-full flex flex-col relative overflow-hidden">
      {/* 温かみのある背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-50 via-amber-50 to-yellow-50">
        {/* 木目調の本棚背景 */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 120px,
            rgba(139, 69, 19, 0.15) 120px,
            rgba(139, 69, 19, 0.15) 125px
          )`
        }} />
      </div>

      {/* コンテンツ */}
      <div className="relative z-10 size-full flex flex-col">
        {/* ヘッダー */}
        <div className="px-6 pt-12 pb-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-gray-800">思い出の本棚</h1>
            <Heart className="w-5 h-5 text-red-400 fill-red-400" />
          </div>
          <p className="text-sm text-gray-600 mt-1">大切な思い出がいっぱい</p>
        </div>

        {/* 検索バー */}
        <div className="px-6 pb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-600" />
            <input
              type="text"
              placeholder="思い出を探す..."
              className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-amber-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all placeholder:text-amber-400"
            />
          </div>
        </div>

        {/* 本棚風のアルバム一覧 */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="grid grid-cols-2 gap-6">
            {allAlbums.map((album, index) => (
              <motion.div
                key={album.id}
                initial={{ opacity: 0, y: 30, rotateX: 20 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                style={{ perspective: 1000 }}
              >
                <motion.div
                  whileHover={{
                    y: -12,
                    rotateY: -3,
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onAlbumSelect(album)}
                  className="cursor-pointer relative"
                >
                  {/* 本の影 */}
                  <div className="absolute -inset-1 bg-black/5 blur-md rounded-xl transform translate-y-2" />

                  {/* 本体 */}
                  <div className="relative bg-white rounded-xl shadow-xl overflow-hidden border-2 border-amber-100">
                    {/* 背表紙（左側） */}
                    <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-amber-200 to-amber-100 z-10">
                      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/10" />
                    </div>

                    {/* サムネイル */}
                    <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 ml-3">
                      <img
                        src={album.thumbnail}
                        alt={album.title}
                        className="w-full h-full object-cover"
                      />
                      {/* 写真の上にグラデーションオーバーレイ */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent ml-3" />
                    </div>

                    {/* タイトルラベル */}
                    <div className="absolute bottom-0 left-3 right-0 p-3 bg-gradient-to-t from-white via-white to-transparent">
                      <h3 className="font-bold text-gray-800 text-sm leading-tight">
                        {album.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">{album.date}</span>
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                          {album.photoCount}枚
                        </span>
                      </div>
                    </div>

                    {/* ページの質感 */}
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-l from-gray-300 via-white to-transparent opacity-50" />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* 温かいメッセージ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center pb-4"
          >
            <p className="text-sm text-amber-700 italic">
              ✨ 全部で {allAlbums.length} 冊のアルバム ✨
            </p>
            <p className="text-xs text-amber-600 mt-2">
              家族みんなの大切な思い出
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
