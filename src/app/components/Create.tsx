import { motion } from 'motion/react';
import { Sparkles, Wand2, Calendar } from 'lucide-react';

export default function Create() {
  return (
    <div className="size-full flex flex-col bg-gradient-to-b from-purple-50 to-white">
      {/* ヘッダー */}
      <div className="px-6 pt-12 pb-6">
        <h1 className="text-2xl font-semibold text-gray-800">AIアルバム作成</h1>
        <p className="text-sm text-gray-500 mt-1">自動で思い出をまとめます</p>
      </div>

      {/* AI作成オプション */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto">
        <div className="space-y-4">
          {/* おすすめアルバム */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5" />
                  <h3 className="font-semibold">おすすめアルバム</h3>
                </div>
                <p className="text-sm opacity-90">
                  最近の思い出から自動でアルバムを作成
                </p>
              </div>
            </div>
          </motion.div>

          {/* 期間指定 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-md cursor-pointer hover:border-purple-300 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-800">期間を指定</h3>
                </div>
                <p className="text-sm text-gray-500">
                  特定の期間の思い出をまとめる
                </p>
              </div>
            </div>
          </motion.div>

          {/* テーマ別 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-md cursor-pointer hover:border-purple-300 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Wand2 className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-800">テーマ別作成</h3>
                </div>
                <p className="text-sm text-gray-500">
                  旅行、家族、イベントなどテーマで分類
                </p>
              </div>
            </div>
          </motion.div>

          {/* ヒント */}
          <div className="mt-8 p-4 bg-purple-50 rounded-xl">
            <p className="text-sm text-purple-800">
              <span className="font-semibold">💡 ヒント:</span> AIが撮影されたビデオから自動で写真を抽出し、最適なアルバムを作成します
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
