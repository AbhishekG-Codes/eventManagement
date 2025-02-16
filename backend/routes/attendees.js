const express = require("express");
const router = express.Router();
const Attendee = require("../models/attendee");
const Event = require("../models/event");

router.post("/", async (req, res) => {
    try {
        const { name, email, eventId } = req.body;

        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ error: "Event not found" });

        if (event.attendees.length >= event.maxAttendees) {
            return res.status(400).json({ error: "Event is full" });
        }

        const existingAttendee = await Attendee.findOne({ email, event: eventId });
        if (existingAttendee) {
            return res.status(400).json({ error: "You have already registered for this event." });
        }

        const attendee = new Attendee({ name, email, event: eventId });
        await attendee.save();

        event.attendees.push(attendee);
        await event.save();

        res.status(201).json(attendee);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ error: "You have already registered for this event." });
        }
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
