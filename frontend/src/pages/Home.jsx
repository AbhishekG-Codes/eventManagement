import { useState } from "react";
import EventList from "../components/EventList";
import EventForm from "../components/EventForm";
import SearchBar from "../components/SearchBar";

const Home = () => {
    const [eventToEdit, setEventToEdit] = useState(null);

    return (
        <div>
            <h1 style={{ 
                textAlign: "center", 
                color: "green", 
                fontSize: "32px", 
                fontWeight: "bold", 
                marginBottom: "20px" 
            }}>
                Events
            </h1>

            <SearchBar />
            {eventToEdit !== null && (
                <EventForm eventToEdit={eventToEdit} clearEdit={() => setEventToEdit(null)} />
            )}

           

            <EventList setEventToEdit={setEventToEdit} />
        </div>
    );
};

export default Home;
