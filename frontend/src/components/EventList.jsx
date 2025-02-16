import { useContext, useState } from "react";
import { EventContext } from "../context/EventProvider";
import RegisterForm from "./RegisterForm";
import EventForm from "./EventForm";
import "./EventList.css";

const EventList = () => {
    const { events, deleteEvent } = useContext(EventContext);
    const [eventToEdit, setEventToEdit] = useState(null);

    return (
        <div className="event-list-container">

            <EventForm eventToEdit={eventToEdit} clearEdit={() => setEventToEdit(null)} />


            <div className="event-cards-container">
                {events.map((event) => (
                    <div key={event._id} className="event-card">
                        <h3>{event.title}</h3>
                        <p><strong>Date:</strong> {new Date(event.dateTime).toLocaleString()}</p>
                        <p><strong>Location:</strong> {event.location}</p>
                        <p><strong>Organizer:</strong> {event.organizer}</p>
                        <RegisterForm eventId={event._id} />
                        <button className="edit-btn" onClick={() => setEventToEdit(event)}>Edit</button>
                        <button className="delete-btn" onClick={() => deleteEvent(event._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventList;
