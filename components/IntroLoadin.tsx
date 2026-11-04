"use client"
import React from "react"
import { motion } from 'motion/react'
import { portforlioData } from "@/portFolioData/portFolioData"

const tickerItems = Array.from({ length: 8 }, (_, index) => (
    <span key={index} className="shrink-0">
        {portforlioData.currentRole}
    </span>
))

const tickerRows = Array.from({ length: 8 }, (_, index) => (
    <div key={index} className="flex min-h-0 flex-1 items-center overflow-hidden whitespace-nowrap">
        <motion.div
            className="flex w-max text-2xl font-mono font-bold tracking-widest text-black"
            animate={{ x: index % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        >
            <div className="flex shrink-0 gap-12 pr-12">{tickerItems}</div>
            <div className="flex shrink-0 gap-12 pr-12" aria-hidden="true">{tickerItems}</div>
        </motion.div>
    </div>
))

export default function IntroAnimation() {
    return (
        <motion.div
            className="relative flex h-screen w-full items-center justify-center overflow-hidden"
            style={{ perspective: 1000 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <div className="absolute inset-0 flex flex-col gap-5 py-5" aria-hidden="true">
                {tickerRows}
            </div>
            <motion.span
                initial={{ z: 1000 }}
                animate={{ x: 0, z: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 uppercase font-extrabold font-mono text-5xl"
            >
                ADITYA RAWAT
            </motion.span>
        </motion.div>
    )
}