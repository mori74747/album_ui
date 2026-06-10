import { motion } from 'motion/react';
import { useMemo } from 'react';

interface AtmosphereEffectProps {
  season?: 'spring' | 'summer' | 'autumn' | 'winter';
  weather?: 'sunny' | 'rainy' | 'snowy' | 'cloudy';
}

export default function AtmosphereEffect({ season, weather }: AtmosphereEffectProps) {
  // 雪や雨のパーティクルを生成
  const particles = useMemo(() => {
    if (weather === 'rainy' || weather === 'snowy') {
      return Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 1 + Math.random() * 2,
      }));
    }
    return [];
  }, [weather]);

  // 季節ごとの背景色
  const getSeasonGradient = () => {
    switch (season) {
      case 'spring':
        return 'from-pink-50/30 via-transparent to-green-50/30';
      case 'summer':
        return 'from-blue-50/30 via-transparent to-yellow-50/30';
      case 'autumn':
        return 'from-orange-50/30 via-transparent to-red-50/30';
      case 'winter':
        return 'from-blue-100/30 via-transparent to-slate-100/30';
      default:
        return 'from-transparent via-transparent to-transparent';
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* 季節の雰囲気 */}
      <div className={`absolute inset-0 bg-gradient-to-b ${getSeasonGradient()}`} />

      {/* 雨のエフェクト */}
      {weather === 'rainy' && (
        <div className="absolute inset-0">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-0.5 h-8 bg-gradient-to-b from-blue-400/40 to-transparent"
              style={{ left: `${particle.x}%` }}
              initial={{ y: -100, opacity: 0 }}
              animate={{
                y: '100vh',
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      )}

      {/* 雪のエフェクト */}
      {weather === 'snowy' && (
        <div className="absolute inset-0">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 bg-white rounded-full opacity-70"
              style={{ left: `${particle.x}%` }}
              initial={{ y: -20, opacity: 0 }}
              animate={{
                y: '100vh',
                x: [0, 20, -20, 0],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: particle.duration + 2,
                delay: particle.delay,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      )}

      {/* 太陽の光のエフェクト */}
      {weather === 'sunny' && (
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-200/20 rounded-full blur-3xl" />
      )}

      {/* 曇りの雰囲気 */}
      {weather === 'cloudy' && (
        <div className="absolute inset-0 bg-gray-200/10" />
      )}
    </div>
  );
}
