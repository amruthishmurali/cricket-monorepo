interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  loading?: boolean;
}

function SearchBar({ value, onChange, onSearch, loading }: SearchBarProps) {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search player (e.g. Kohli)"
        className="border px-3 py-2 rounded w-full text-sm"
      />
      <button
        onClick={onSearch}
        disabled={loading}
        className="bg-green-700 text-white px-4 py-2 rounded text-sm hover:bg-green-800 disabled:opacity-50"
      >
        {loading ? "..." : "Search"}
      </button>
    </div>
  );
}

export default SearchBar;