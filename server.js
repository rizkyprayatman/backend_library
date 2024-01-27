const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { specs, swaggerUi } = require('./swagger');

const libraryRoute = require("./routes/libraryRoute");
const memberRoute = require("./routes/memberRoute");

const app = express();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

//middlewares
app.use(bodyParser.json());

app.use("/api/library/member", memberRoute);
app.use("/api/library", libraryRoute);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));



app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running in port http://localhost:${process.env.PORT}`);
});

module.exports = app;
