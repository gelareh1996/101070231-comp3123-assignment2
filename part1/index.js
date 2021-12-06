const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 9090;
const connect = require("./config/db");
var cors = require("cors");
connect();
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(cors());
app.use((err, req, res, next) => {
    res.locals.error = err;
    if (err.status >= 100 && err.status < 600) res.status(err.status);
    else res.status(500);
    res.render("error");
});
const employeesRouter = require("./routes/employeeRouter");
app.use("/api/v1", employeesRouter);

app.get("/", (req, res) => {
    res.send("working");
});

app.listen(PORT, () => {
    console.log("Server running in port " + PORT);
});
