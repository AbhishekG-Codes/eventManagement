const express = require("express");
const router = express.Router();
const Event = require("../models/event");
const Attendee = require("../models/attendee");

router.post("/", async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).json(event);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const { search, date } = req.query;
        let query = {};

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { location: { $regex: search, $options: "i" } }
            ];
        }

        if (date) {
            const start = new Date(date);
            const end = new Date(date);
            end.setHours(23, 59, 59, 999);
            query.dateTime = { $gte: start, $lte: end };
        }

        const events = await Event.find(query);
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(event);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ error: "Event not found" });

        await Attendee.deleteMany({ event: req.params.id });
        await Event.findByIdAndDelete(req.params.id);

        res.json({ message: "Event and all associated attendees deleted" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
