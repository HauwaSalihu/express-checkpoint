import express from "express";
const app = express();
const port = 3000;

import fs from "fs";

app.use(express.static("public"));
// custom middeleware to check time of accessing the site
function timeCheckMiddleware(req, res, next) {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  const startHour = 9; // 9 AM
  const endHour = 17; // 5 PM

  // Check if the current hour is within the allowed range
  if (currentHour >= startHour && currentHour < endHour) {
    next(); // Continue to the next middleware or route handler
  } else {
    res
      .status(403)
      .json({ message: "Access allowed only between 9 AM and 5 PM." });
  }
}
//calling the middleware
app.use(timeCheckMiddleware);

app.get("/", (req, res) => {
  console.log(req);
});
// home page route
app.get("/home", (req, res) => {
  fs.readFile("public/home.html", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .send("<h1>Sorry server error</h1> <p>Try again</p>");
    }
    return res.status(200).send(data);
  });
});
//Our services page route
app.get("/service", (req, res) => {
  fs.readFile("public/services.html", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .send("<h1>Sorry server error</h1> <p>Try again</p>");
    }
    return res.status(200).send(data);
  });
});
//Contact us page route
app.get("/contact", (req, res) => {
  fs.readFile("public/contact.html", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .send("<h1>Sorry server error</h1> <p>Try again</p>");
    }
    return res.status(200).send(data);
  });
});

app.listen(port, () => {
  console.log("server running on port:" + port);
});
