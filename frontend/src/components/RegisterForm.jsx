
import { useState } from "react";

const RegisterForm = ({ eventId }) => {
    const [attendee, setAttendee] = useState({ name: "", email: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => setAttendee({ ...attendee, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`http://localhost:3000/api/attendees`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...attendee, eventId }),
        });
        const data = await res.json();
        setMessage(data.error ? data.error : "Registered successfully!");
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Your Name" onChange={handleChange} required />
                <input name="email" type="email" placeholder="Your Email" onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default RegisterForm;
