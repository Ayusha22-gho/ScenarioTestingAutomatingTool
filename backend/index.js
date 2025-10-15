const express = require("express");
const compression = require("compression");
const cors = require("cors");
const routes = require("./routes/v1");


const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);


app.use("/v1", routes);



const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
