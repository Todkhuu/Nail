import { motion } from "framer-motion";

export const GalleryHero = () => {
  return (
    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false }}
    >
      <h2 className="text-4xl font-light text-gray-800 mb-4">Миний Ажил</h2>
      <div className="w-20 h-1 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full mx-auto mb-6" />
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Френч маникюраас эхлээд нарийн хийцтэй урлагийн бүтээлүүд хүртэл миний
        бүтээлүүдтэй танилцаарай
      </p>
    </motion.div>
  );
};
