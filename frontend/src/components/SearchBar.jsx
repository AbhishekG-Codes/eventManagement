import { useState, useContext } from "react";
import { EventContext } from "../context/EventProvider"; 
import "./SearchBar.css"; 
  
const SearchBar = () => {
    const { searchEvents } = useContext(EventContext);
    const [query, setQuery] = useState("");
    const [date, setDate] = useState("");

    const handleSearch = () => {
        console.log("Searching for:", { query, date }); 
        searchEvents(query, date);
    };

    return (
        <div className="search-bar">
            <input 
                type="text" 
                placeholder="Search by title or location..." 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
            />
            <input 
                type="date"  
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;
