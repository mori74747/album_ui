import { motion } from 'motion/react';
import { MapPin, Heart, ChevronRight, Camera } from 'lucide-react';

const familyMembers = [
  {
    id: 1,
    name: 'パパ',
    role: '父',
    thumb: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format',
    albumCount: 12,
  },
  {
    id: 2,
    name: 'ママ',
    role: '母',
    thumb: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&auto=format',
    albumCount: 18,
  },
  {
    id: 3,
    name: 'ゆい',
    role: '長女 6歳',
    thumb: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200&h=200&fit=crop&auto=format',
    albumCount: 7,
  },
  {
    id: 4,
    name: 'こうた',
    role: '長男 3歳',
    thumb: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=200&h=200&fit=crop&auto=format',
    albumCount: 4,
  },
];

const journeyItems = [
  {
    id: 1,
    title: '家族旅行 in 京都',
    date: '2026年5月',
    description: '初めての京都旅行。お寺や着物体験が思い出に残ったね。',
    thumb: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=400&fit=crop&auto=format',
    photoCount: 87,
    tag: '旅行',
    tagColor: '#b45309',
  },
  {
    id: 2,
    title: 'ゆいの入学式',
    date: '2026年4月',
    description: 'ついに小学1年生！ランドセル姿がかっこよかった。',
    thumb: 'https://images.unsplash.com/photo-1489659831163-682b5af42225?w=600&h=400&fit=crop&auto=format',
    photoCount: 45,
    tag: '記念日',
    tagColor: '#7c3aed',
  },
  {
    id: 3,
    title: 'お花見ピクニック',
    date: '2026年3月',
    description: '公園でお花見。こうたが桜の花びらで遊んでた。',
    thumb: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&h=400&fit=crop&auto=format',
    photoCount: 62,
    tag: '季節',
    tagColor: '#db2777',
  },
  {
    id: 4,
    title: 'クリスマス 2025',
    date: '2025年12月',
    description: 'サンタさんのプレゼントに大興奮の子どもたち。',
    thumb: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=600&h=400&fit=crop&auto=format',
    photoCount: 33,
    tag: 'イベント',
    tagColor: '#dc2626',
  },
];

export default function Family() {
  return (
    <div
      className="size-full flex flex-col relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #fef3c7 0%, #fde68a 40%, #fef9f0 100%)' }}
    >
      {/* 木目テクスチャ */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            93deg,
            transparent,
            transparent 3px,
            rgba(120,60,10,0.08) 3px,
            rgba(120,60,10,0.08) 6px
          )`,
        }}
      />

      <div className="relative z-10 size-full flex flex-col overflow-hidden">
        {/* ヘッダー */}
        <div className="px-5 pt-3 pb-4 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-current" style={{ color: '#e11d48' }} />
            <h1 style={{ fontWeight: 700, color: '#78350f', fontSize: 20 }}>家族の歩み</h1>
          </div>
          <p className="text-xs mt-0.5" style={{ color: '#92400e' }}>
            みんなで歩んできた大切な日々
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-6">
          {/* 家族メンバー */}
          <section className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 style={{ fontWeight: 600, color: '#78350f', fontSize: 14 }}>家族メンバー</h2>
              <button className="text-xs flex items-center gap-0.5" style={{ color: '#b45309' }}>
                全員見る <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
              {familyMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.06 }}
                  className="flex-shrink-0 flex flex-col items-center gap-1.5"
                >
                  <div
                    className="relative rounded-full overflow-hidden border-2"
                    style={{ width: 60, height: 60, borderColor: '#d97706' }}
                  >
                    <img
                      src={member.thumb}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs" style={{ color: '#78350f', fontWeight: 600 }}>{member.name}</p>
                  <p className="text-xs" style={{ color: '#92400e' }}>{member.albumCount}冊</p>
                </motion.div>
              ))}
              {/* 追加ボタン */}
              <div className="flex-shrink-0 flex flex-col items-center gap-1.5">
                <div
                  className="rounded-full flex items-center justify-center border-2 border-dashed"
                  style={{ width: 60, height: 60, borderColor: '#d97706' }}
                >
                  <span style={{ color: '#d97706', fontSize: 24, lineHeight: 1 }}>+</span>
                </div>
                <p className="text-xs" style={{ color: '#d97706' }}>招待</p>
              </div>
            </div>
          </section>

          {/* 区切り */}
          <div className="mb-5 h-px" style={{ background: 'rgba(180,100,20,0.15)' }} />

          {/* 旅行・思い出タイムライン */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 style={{ fontWeight: 600, color: '#78350f', fontSize: 14 }}>旅行・思い出</h2>
              <button className="text-xs flex items-center gap-0.5" style={{ color: '#b45309' }}>
                すべて <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-4">
              {journeyItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.08 }}
                  className="rounded-2xl overflow-hidden cursor-pointer"
                  style={{ boxShadow: '0 4px 20px rgba(120,60,10,0.12)' }}
                >
                  {/* サムネイル */}
                  <div className="relative" style={{ aspectRatio: '16/9' }}>
                    <img
                      src={item.thumb}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    {/* テープ装飾 */}
                    <div
                      className="absolute top-2 left-4 w-10 h-3 -rotate-6 opacity-75"
                      style={{ background: 'rgba(254,243,199,0.85)', borderRadius: 2 }}
                    />
                    <div className="absolute inset-0" style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)'
                    }} />
                    {/* タグ */}
                    <div
                      className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs"
                      style={{ background: item.tagColor, color: '#fff', fontWeight: 600 }}
                    >
                      {item.tag}
                    </div>
                    {/* 写真枚数 */}
                    <div
                      className="absolute bottom-2 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)' }}
                    >
                      <Camera className="w-3 h-3 text-white" />
                      <span className="text-xs text-white">{item.photoCount}</span>
                    </div>
                  </div>
                  {/* テキスト */}
                  <div className="p-3" style={{ background: '#fff' }}>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 style={{ fontWeight: 700, color: '#78350f', fontSize: 15 }}>{item.title}</h3>
                        <div className="flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" style={{ color: '#d97706' }} />
                          <span className="text-xs" style={{ color: '#92400e' }}>{item.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs mt-1.5" style={{ color: '#6b7280' }}>{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 新規追加ボタン */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="w-full mt-5 py-4 rounded-2xl text-sm"
              style={{
                background: 'linear-gradient(135deg, #b45309, #d97706)',
                color: '#fff',
                fontWeight: 600,
                boxShadow: '0 4px 16px rgba(180,100,20,0.3)',
              }}
            >
              + 思い出を追加
            </motion.button>
          </section>
        </div>
      </div>
    </div>
  );
}
