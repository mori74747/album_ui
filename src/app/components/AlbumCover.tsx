import { motion } from 'motion/react';

interface Album {
  id: number;
  title: string;
  date: string;
  thumbnail: string;
  photoCount: number;
}

interface AlbumCoverProps {
  album: Album;
}

export default function AlbumCover({ album }: AlbumCoverProps) {
  return (
    <div className="relative">
      {/* 影とボーダー効果 */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl transform rotate-1 translate-y-2" />
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl transform -rotate-1 translate-y-1" />

      {/* メインカード */}
      <motion.div
        className="relative bg-white rounded-2xl shadow-2xl overflow-hidden"
        whileHover={{ rotateY: 2, rotateX: -2 }}
        transition={{ duration: 0.3 }}
      >
        {/* サムネイル */}
        <div className="aspect-[4/3] overflow-hidden bg-gray-100">
          <img
            src={album.thumbnail}
            alt={album.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* アルバム情報 */}
        <div className="p-4 bg-gradient-to-b from-white to-gray-50">
          <h3 className="font-semibold text-gray-800">{album.title}</h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-gray-500">{album.date}</span>
            <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              {album.photoCount}枚
            </span>
          </div>
        </div>

        {/* 本のような質感 */}
        <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50" />
      </motion.div>
    </div>
  );
}
