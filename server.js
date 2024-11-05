const express = require("express");
const bodyParser = require('body-parser')


const envRouter = require("./api/envelopes");
const transRouter = require("./api/transactions")


const app = express();

app.use(express.json());
app.use('/env',envRouter)
app.use('/trans',transRouter)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
