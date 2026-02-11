'use client';

import {motion, useInView} from 'framer-motion';
import {type ReactNode, useRef} from 'react';

interface StaggerAnimationProps {
    children: ReactNode[];
    className?: string;
    staggerDelay?: number;
    duration?: number;
    once?: boolean;
    amount?: number | 'some' | 'all';
}

export default function StaggerAnimation({
                                             children,
                                             className = '',
                                             staggerDelay = 0.1,
                                             duration = 0.6,
                                             once = true,
                                             amount = 0.2,
                                         }: StaggerAnimationProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, {once, amount});

    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
            },
        },
    };

    const itemVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {
            opacity: 1,
            y: 0,
        },
    };

    return (
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className={className}
        >
            {children.map((child, index) => (
                <motion.div
                    key={index}
                    variants={itemVariants}
                    transition={{
                        duration,
                        ease: [0.25, 0.4, 0.25, 1],
                    }}
                >
                    {child}
                </motion.div>
            ))}
        </motion.div>
    );
}

