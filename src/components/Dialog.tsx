import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

type DialogProps = {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  persistent?: boolean
  className?: string
}

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

const modal = {
  hidden: { opacity: 0, scale: 0.95, y: -30 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: -20 }
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  persistent,
  className,
  children
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`fixed inset-0 z-10 flex items-center justify-center ${
            persistent ? 'bg-gray-900' : 'bg-[rgba(0,0,0,0.72)]'
          }`}
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className={`bg-white rounded-2xl shadow-xl w-full max-w-6xl mx-4 p-6 relative ${className}`}
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25 }}
          >
            {!persistent && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-4xl cursor-pointer transition-colors"
                aria-label="Cerrar"
              >
                &times;
              </button>
            )}
            {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
            <div>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Dialog
