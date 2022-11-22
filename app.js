const express = require("express"); // access express.
const app = express(); // create a new application.

app.set("view engine", "ejs"); // set view engine to ejs.
app.set("views", __dirname + "/views"); // set views folder.
app.use(express.static(__dirname + "/css")); // include folder (css).
app.use(express.static(__dirname + "/js"));// include folder (js).

// home route which is simply /
app.get("/", (request, response) => {
    // console.log(request);
    response.render("dice");
});

// reset route, redirect backs to /
app.get("/reset", (request, response) => {
    response.redirect("/");
});

// a catch all route, will be fired if the route the user tries to access doesnt exist within this application.
app.get("*", (request, response) => {
    response.redirect("/");
});

// development mode. application is hosted on http://localhost:3000/
app.listen(3000, () => {
    console.log("server started. Listening on port 3000.");
});