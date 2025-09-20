export default function CategoryDock({
  categories,
  selectedId,
  onSelect
}: {
  categories: { id: string; name: string }[];
  selectedId?: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <aside className="w-48 h-full border-r overflow-y-auto">
      <ul className="p-2 space-y-2">
        {categories.map(c => (
          <li key={c.id}>
            <button
              onClick={() => onSelect(c.id)}
              className={`w-full text-left px-3 py-2 rounded-xl transition
                ${selectedId===c.id ? "bg-black text-white" : "hover:bg-gray-100"}`}
            >
              {c.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
