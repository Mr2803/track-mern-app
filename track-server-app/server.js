const express = require("express");
const connectToDb = require("./config/db");
const bodyParser = require("body-parser");

const app = express();

//Connect to db mongoose
connectToDb();
app.use(bodyParser.json());
app.use("/api/user", require("./src/routes/api/user"));
app.use("/api/tracks", require("./src/routes/api/track"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
