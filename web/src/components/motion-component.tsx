"use client";

import { motion, type Variants, type HTMLMotionProps } from "framer-motion";

/**
 * Shared scroll-triggered animation primitives built on framer-motion.
 * Import these into server components and use them to wrap the pieces
 * of the page you want to animate on scroll.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Fade + slide up, rendered as a <section>                            */
/* ------------------------------------------------------------------ */
type FadeInProps = HTMLMotionProps<"section"> & {
    delay?: number;
    y?: number;
    duration?: number;
    once?: boolean;
    amount?: number;
};

export function FadeInSection({
                                  children,
                                  delay = 0,
                                  y = 48,
                                  duration = 0.7,
                                  once = true,
                                  amount = 0.15,
                                  ...props
                              }: FadeInProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once, amount }}
            transition={{ duration, delay, ease: EASE }}
            {...props}
        >
            {children}
        </motion.section>
    );
}

/* ------------------------------------------------------------------ */
/* Fade + slide up, rendered as a <div> (for non-section wrappers)     */
/* ------------------------------------------------------------------ */
type FadeInDivProps = HTMLMotionProps<"div"> & {
    delay?: number;
    y?: number;
    duration?: number;
    once?: boolean;
    amount?: number;
};

export function FadeInDiv({
                              children,
                              delay = 0,
                              y = 32,
                              duration = 0.6,
                              once = true,
                              amount = 0.2,
                              ...props
                          }: FadeInDivProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once, amount }}
            transition={{ duration, delay, ease: EASE }}
            {...props}
        >
            {children}
        </motion.div>
    );
}

/* ------------------------------------------------------------------ */
/* Fade only (no movement) - good for images / backgrounds             */
/* ------------------------------------------------------------------ */
export function FadeSection({
                                children,
                                delay = 0,
                                duration = 0.8,
                                once = true,
                                amount = 0.15,
                                ...props
                            }: HTMLMotionProps<"div"> & {
    delay?: number;
    duration?: number;
    once?: boolean;
    amount?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once, amount }}
            transition={{ duration, delay, ease: EASE }}
            {...props}
        >
            {children}
        </motion.div>
    );
}

/* ------------------------------------------------------------------ */
/* Staggered children container + item                                 */
/* ------------------------------------------------------------------ */
const containerVariants: Variants = {
    hidden: {},
    visible: (staggerDelay: number = 0.12) => ({
        transition: { staggerChildren: staggerDelay },
    }),
};

export function StaggerContainer({
                                     children,
                                     staggerDelay = 0.12,
                                     once = true,
                                     amount = 0.15,
                                     ...props
                                 }: HTMLMotionProps<"div"> & {
    staggerDelay?: number;
    once?: boolean;
    amount?: number;
}) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount }}
            custom={staggerDelay}
            variants={containerVariants}
            {...props}
        >
            {children}
        </motion.div>
    );
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: EASE },
    },
};

export function StaggerItem({
                                children,
                                ...props
                            }: HTMLMotionProps<"div">) {
    return (
        <motion.div variants={itemVariants} {...props}>
            {children}
        </motion.div>
    );
}

/* ------------------------------------------------------------------ */
/* Stagger variants for semantic <ul>/<li> lists                       */
/* ------------------------------------------------------------------ */
export function StaggerList({
                                children,
                                staggerDelay = 0.1,
                                once = true,
                                amount = 0.15,
                                ...props
                            }: HTMLMotionProps<"ul"> & {
    staggerDelay?: number;
    once?: boolean;
    amount?: number;
}) {
    return (
        <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount }}
            custom={staggerDelay}
            variants={containerVariants}
            {...props}
        >
            {children}
        </motion.ul>
    );
}

export function StaggerListItem({
                                    children,
                                    ...props
                                }: HTMLMotionProps<"li">) {
    return (
        <motion.li variants={itemVariants} {...props}>
            {children}
        </motion.li>
    );
}

/* ------------------------------------------------------------------ */
/* Scale in - nice for cards / logos                                   */
/* ------------------------------------------------------------------ */
export function ScaleInDiv({
                               children,
                               delay = 0,
                               duration = 0.6,
                               once = true,
                               amount = 0.2,
                               ...props
                           }: HTMLMotionProps<"div"> & {
    delay?: number;
    duration?: number;
    once?: boolean;
    amount?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once, amount }}
            transition={{ duration, delay, ease: EASE }}
            {...props}
        >
            {children}
        </motion.div>
    );
}