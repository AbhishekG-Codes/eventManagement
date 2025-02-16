
const mongoose = require("mongoose");
const Attendee = require("./attendee"); 

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    dateTime: { type: Date, required: true },
    location: { type: String, required: true },
    organizer: { type: String, required: true },
    maxAttendees: { type: Number, required: true },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attendee" }]
});


EventSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
    try {
        await Attendee.deleteMany({ event: this._id });
        console.log(`All attendees for event ${this._id} deleted.`);
        next();
    } catch (err) {
        console.error("Error deleting attendees:", err);
        next(err);
    }
});

module.exports = mongoose.models.Event || mongoose.model("Event", EventSchema);
