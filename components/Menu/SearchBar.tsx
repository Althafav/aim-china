import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { FaSearch } from "react-icons/fa";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/search?query=${encodeURIComponent(trimmed)}`);
      setQuery("");
    }
  };

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="position-fixed top-0 start-0 w-100 bg-white shadow search-bar-wrapper"
      style={{ zIndex: 1050 }}
    >
      <div className="container py-3">
        <form onSubmit={handleSubmit} className="d-flex">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What are you looking for?"
            autoFocus
            className="form-control rounded-start"
          />
          <button
            type="submit"
            className="bg-primary p-3 text-white rounded-end ms-2"
          >
            <FaSearch />
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default SearchBar;
