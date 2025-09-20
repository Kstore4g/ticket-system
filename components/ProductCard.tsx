import { motion } from "framer-motion";

export default function ProductCard({
  name, price, onAdd, qty
}: {
  name: string; price: number; qty?: number; onAdd: ()=>void;
}) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="relative border rounded-2xl p-4 hover:shadow transition"
    >
      <div className="text-lg font-semibold">{name}</div>
      <div className="text-gray-500">¥{price.toLocaleString()}</div>
      <button
        onClick={onAdd}
        className="absolute right-3 top-3 rounded-xl border px-3 py-1"
      >
        ＋{qty ? `(${qty})` : ""}
      </button>
    </motion.div>
  );
}
