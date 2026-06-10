import { motion } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface Photo {
  id: string;
  url: string;
  thumbnail: string;
  videoUrl: string;
}

interface PhotoViewerProps {
  photo: Photo;
  onClose: () => void;
}

export default function PhotoViewer({ photo, onClose }: PhotoViewerProps) {
  const [showVideo, setShowVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (showVideo && videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, [showVideo]);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black flex flex-col"
      onClick={onClose}
    >
      {/* 閉じるボタン */}
      <div className="absolute top-0 left-0 right-0 z-10 px-4 pt-12 pb-4 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex justify-end">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
          >
            <X className="w-6 h-6 text-white" />
          </motion.button>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div
        className="flex-1 flex items-center justify-center px-4"
        onClick={(e) => e.stopPropagation()}
      >
        {!showVideo ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative max-w-full max-h-full"
          >
            <img
              src={photo.url}
              alt="Photo"
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />

            {/* ビデオ再生ボタン */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowVideo(true)}
              className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-blue-600 shadow-2xl flex items-center justify-center"
            >
              <Play className="w-8 h-8 text-white ml-1" />
            </motion.button>
          </motion.div>
        ) : (
          <div className="relative w-full max-w-full">
            <video
              ref={videoRef}
              src={photo.videoUrl}
              className="w-full max-h-[70vh] object-contain rounded-lg"
              loop
              playsInline
              onClick={togglePlayPause}
            />

            {/* ビデオコントロール */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={togglePlayPause}
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white ml-1" />
                )}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleMute}
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
              >
                {isMuted ? (
                  <VolumeX className="w-6 h-6 text-white" />
                ) : (
                  <Volume2 className="w-6 h-6 text-white" />
                )}
              </motion.button>
            </div>
          </div>
        )}
      </div>

      {/* 説明テキスト */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-12 pt-6 bg-gradient-to-t from-black/70 to-transparent">
        <p className="text-white text-sm text-center">
          {showVideo ? 'タップして再生/一時停止' : 'タップしてビデオを再生'}
        </p>
      </div>
    </motion.div>
  );
}
