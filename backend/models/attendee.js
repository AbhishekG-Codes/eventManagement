
const mongoose = require("mongoose");

const AttendeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true }
});

AttendeeSchema.index({ email: 1, event: 1 }, { unique: true });

module.exports = mongoose.models.Attendee || mongoose.model("Attendee", AttendeeSchema);
