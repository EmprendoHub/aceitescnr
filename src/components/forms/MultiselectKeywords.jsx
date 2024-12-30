"use client";
import { useRef, useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";

const MultiselectKeywords = ({ handleAddKeywordField, keywords }) => {
  console.log(keywords);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(keywords || []);
  const [menuOpen, setMenuOpen] = useState(false);

  const inputRef = useRef(null);

  const tags = [
    "Marketing Tips",
    "Campaign Success",
    "Effective Strategies",
    "Sales Funnels",
    "Tech",
    "Gaming",
    "AI Tools",
    "Automation",
  ];

  const filteredTags = tags.filter(
    (item) =>
      item?.toLocaleLowerCase()?.includes(query.toLocaleLowerCase()?.trim()) &&
      !selected.includes(item)
  );

  const isDisable =
    !query?.trim() ||
    selected.filter(
      (item) =>
        item?.toLocaleLowerCase()?.trim() === query?.toLocaleLowerCase()?.trim()
    )?.length;

  // Effect to update parent component when selected changes
  useEffect(() => {
    handleAddKeywordField(selected);
  }, [selected, handleAddKeywordField]);

  return (
    <div className="relative h-full w-full">
      <div className="top-0 z-20 w-full h-full bg-dark text-white text-sm">
        {selected?.length ? (
          <div className="w-full relative text-[12px] font-primary flex flex-wrap gap-1 p-1 mb-2">
            {selected.map((tag) => {
              return (
                <div
                  key={tag}
                  className="rounded-full w-fit py-1 px-2 border border-gray-400 bg-gray-50 text-gray-500 flex items-center gap-1"
                >
                  {tag}
                  <div
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      const updatedSelected = selected.filter((i) => i !== tag);
                      setSelected(updatedSelected);
                      handleAddKeywordField(updatedSelected); // Update parent component
                    }}
                  >
                    <CgClose className="cursor-pointer text-secondary" />
                  </div>
                </div>
              );
            })}
            <div className="w-full text-right">
              <span
                className="text-gray-400 cursor-pointer"
                onClick={() => {
                  setSelected([]);
                  handleAddKeywordField([]); // Clear keywords in parent component
                  inputRef.current?.focus();
                }}
              >
                Limpiar Todas
              </span>
            </div>
          </div>
        ) : null}
        <div className="card flex items-center justify-between p-3 w-80 gap-2.5">
          <FaSearch />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value.trimStart())}
            placeholder="Buscar o Agregar Palabras Clave"
            className="bg-transparent text-sm flex-1 caret-secondary"
            onFocus={() => setMenuOpen(true)}
            onBlur={() => setMenuOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isDisable) {
                const updatedSelected = [...selected, query];
                setSelected(updatedSelected);
                handleAddKeywordField(updatedSelected); // Update parent component
                setQuery("");
                setMenuOpen(true);
              }
            }}
          />
          <button
            className="text-sm disabled:text-gray-300 text-secondary disabled:cursor-not-allowed"
            disabled={isDisable}
            onClick={() => {
              if (isDisable) {
                return;
              }
              const updatedSelected = [...selected, query];
              setSelected(updatedSelected);
              handleAddKeywordField(updatedSelected); // Update parent component
              setQuery("");
              inputRef.current?.focus();
              setMenuOpen(true);
            }}
          >
            + Nuevo
          </button>
        </div>

        {menuOpen ? (
          <div className="card absolute z-20 w-full max-h-52 mt-2 p-1 flex overflow-y-auto scrollbar-thin scrollbar-track-slate-50 scrollbar-thumb-slate-200 bg-dark">
            <ul className="w-full">
              {filteredTags?.length ? (
                filteredTags.map((tag, i) => (
                  <li
                    key={tag}
                    className="p-2 cursor-pointer hover:bg-light hover:text-secondary rounded-md w-full"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      const updatedSelected = [...selected, tag];
                      setMenuOpen(true);
                      setSelected(updatedSelected);
                      handleAddKeywordField(updatedSelected); // Update parent component
                      setQuery("");
                    }}
                  >
                    {tag}
                  </li>
                ))
              ) : (
                <li className="p-2 text-gray-500">No options available</li>
              )}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MultiselectKeywords;
