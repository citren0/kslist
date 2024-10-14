const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const fs = require('node:fs');
 
const app = express();

app.use(helmet({
  contentSecurityPolicy: false,
}));

app.use(cors({ origin: true, credentials: true, }));
 
app.use("/", express.static(path.join(__dirname, "static")));

app.listen(6443, () =>
{
    console.log('Server started.');
});