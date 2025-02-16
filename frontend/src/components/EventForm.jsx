import { useState, useContext, useEffect } from "react";
import { EventContext } from "../context/EventProvider";
import "./EventForm.css";

const EventForm = ({ eventToEdit, clearEdit }) => {
    const { addOrUpdateEvent } = useContext(EventContext);
    const [event, setEvent] = useState({
        title: "",
        description: "",
        dateTime: "",
        location: "",
        organizer: "",
        maxAttendees: "",
    });

    useEffect(() => {
        if (eventToEdit) {
            setEvent(eventToEdit);
        }
    }, [eventToEdit]);

    const handleChange = (e) => setEvent({ ...event, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addOrUpdateEvent(event);
        setEvent({ title: "", description: "", dateTime: "", location: "", organizer: "", maxAttendees: "" });
        if (clearEdit) clearEdit();
    };


    const getMinDateTime = () => {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset()); 
        return now.toISOString().slice(0, 16);
    };

    return (
        <form className="event-form" onSubmit={handleSubmit}>
            <h2>{event._id ? "Edit Event" : "Create Event"}</h2>
            <input name="title" placeholder="Title" onChange={handleChange} value={event.title} required />
            <input name="description" placeholder="Description" onChange={handleChange} value={event.description} required />
            <input 
                type="datetime-local" 
                name="dateTime" 
                onChange={handleChange} 
                value={event.dateTime} 
                min={getMinDateTime()} 
                required 
            />
            <input name="location" placeholder="Location" onChange={handleChange} value={event.location} required />
            <input name="organizer" placeholder="Organizer" onChange={handleChange} value={event.organizer} required />
            <input type="number" name="maxAttendees" placeholder="Max Attendees" onChange={handleChange} value={event.maxAttendees} required />
            <button type="submit">{event._id ? "Update Event" : "Create Event"}</button>
        </form>
    );
};

export default EventForm;
