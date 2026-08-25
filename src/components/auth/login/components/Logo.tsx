'use client';
import CacheLink from '@/components/commons/CacheLink';
import { motion } from 'framer-motion';
import Image from "next/image";

const Logo = () => (
    <CacheLink href="/" className="block mb-6 group">
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex justify-center"
        >
            <div className="relative w-80 h-20 overflow-hidden">
                <Image
                    src="/logo.png"
                    alt="Diambra Puzzle"
                    fill
                    sizes="(max-width: 768px) 120px, 160px"
                    className="object-contain p-3"
                    priority
                />
            </div>
        </motion.div>
    </CacheLink>
);

export default Logo;