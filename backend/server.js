const express = require("express");
const app = express();
const cors = require("cors");

//importing 2 express routers
const eventRoutes = require("./routes/events"); 
const attendeeRoutes = require("./routes/attendees");

require("./db");

app.use(express.json());
app.use(cors());

app.use("/api/events", eventRoutes); // mounting with routerss
app.use("/api/attendees", attendeeRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000")}
);



// const authRoutes = require("./routes/auth");
// app.use("/api/auth", authRoutes);