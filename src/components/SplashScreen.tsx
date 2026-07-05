import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ASSETS } from '../data/siteData'

interface SplashScreenProps {
  onComplete: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1400)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#fdfcfa]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <img
        src={ASSETS.logo}
        alt="Jovoy Paris"
        className="h-11 w-auto md:h-14"
        fetchPriority="high"
        decoding="sync"
      />

      <p className="mt-8 font-serif text-xl italic text-jovoy-gold md:text-2xl">
        The Embassy of Rare Perfumes
      </p>
      <p className="mt-2 text-xs tracking-[0.25em] uppercase text-jovoy-muted">London · Mayfair</p>

      <div className="mt-8 h-1 w-24 overflow-hidden rounded-full bg-jovoy-border">
        <motion.div
          className="h-full rounded-full bg-jovoy-gold"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  )
}
