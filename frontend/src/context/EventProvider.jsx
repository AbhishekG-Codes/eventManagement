import { createContext, useState, useEffect } from "react";

export const EventContext = createContext();

const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/events")
            .then((res) => res.json())
            .then((data) => setEvents(data))
            .catch((err) => console.error("Error fetching events:", err));
    }, []);

    const addOrUpdateEvent = async (eventData) => {
        const method = eventData._id ? "PUT" : "POST";
        const url = eventData._id
            ? `http://localhost:3000/api/events/${eventData._id}`
            : "http://localhost:3000/api/events";

        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(eventData),
        });

        const updatedEvent = await res.json();
        setEvents((prevEvents) =>
            eventData._id
                ? prevEvents.map((e) => (e._id === updatedEvent._id ? updatedEvent : e))
                : [...prevEvents, updatedEvent]
        );
    };

    const deleteEvent = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/api/events/${id}`, { method: "DELETE" });
            if (res.ok) {
                setEvents(events.filter((event) => event._id !== id));
            } else {
                console.error("Failed to delete event");
            }
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    const searchEvents = async (query, date) => {
        let url = "http://localhost:3000/api/events";
        if (query || date) {
            url += `?search=${query || ""}`;
            if (date) url += `&date=${date}`;
        }

        try {
            const res = await fetch(url);
            const data = await res.json();
            setEvents(data);
        } catch (error) {
            console.error("Error searching events:", error);
        }
    };

    return (
        <EventContext.Provider value={{ events, setEvents, addOrUpdateEvent, deleteEvent, searchEvents }}>
            {children}
        </EventContext.Provider>
    );
};

export default EventProvider;
