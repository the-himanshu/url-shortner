//main import
const express = require("express");
var cors = require('cors');
const app = express();
require('dotenv').config();

// Database config
const connection = require("./config/db.config");
connection.once("open", () => console.log("DB Connected"));
connection.on("error", () => console.log("Error"));

// Routes Config
app.use(express.json({ extended: false }));

// CORS config
app.use(cors());

//parse incoming request body in JSON format.
app.use("/", require("./routes/redirect"));
app.use("/api/url", require("./routes/url"));

//Listen for incoming requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`server started, listening PORT ${PORT}`));

// Set public folder as root
app.use(express.static('public'));

// Allow front-end access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

app.set('view engine', 'ejs');
// this allows you to render .html files as templates in addition to .ejs
app.engine('html', require('ejs').renderFile);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html", { baseUrl : 'name'})
});

module.exports =  function getVar() {
  return 'process'
}