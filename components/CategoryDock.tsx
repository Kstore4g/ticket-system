"use client";
import React from "react";
import { motion } from "framer-motion";
import useSfxHowler from "../hooks/useSfxHowler";

export type Category = { id: number; name: string; emoji: string };

export default function CategoryDock({ categories, selectedId, onSelect }: {
  categories: Category[]; selectedId: number | null; onSelect: (id: number) => void;
}) {
  const { unlock, playKey } = useSfxHowler();

  return (
    <div className="sticky top-4 flex flex-col items-center gap-4">
      {categories.map((c) => {
        const active = selectedId === c.id;
        return (
          <motion.button key={c.id} layoutId={`cat-${c.id}`} type="button"
            onClick={() => { unlock(); playKey(); onSelect(c.id); }} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }}
            className={`w-20 h-20 rounded-full flex items-center justify-center border text-3xl shadow ${
              active ? "bg-blue-500 text-white border-blue-600 ring-2 ring-blue-300"
                     : "bg-white text-black border-gray-300 hover:bg-gray-50"}`} title={c.name}>
            <span aria-hidden>{c.emoji}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
