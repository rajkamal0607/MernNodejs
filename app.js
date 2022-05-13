const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const router = require("./routes/router");

dotenv.config({ path: './config.env' });
require("./db/conn");

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(router);

const port = 8000;

app.listen(port,()=>{
    console.log("Server has Started");
});