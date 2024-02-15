const express = require("express");
const whois = require("whois-api");
const cors = require("cors");

const app = express();
const PORT = 3000;

// CORS Configuration
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:5500",
      "chrome-extension://ojbnbopipeggcopbibbpdpiacmpeacbe",
    ], // Update with your front-end origin
    credentials: true,
  })
);

app.get("/whois", (req, res) => {
  const domain = req.query.domain;

  whois.lookup(domain, (error, result) => {
    if (error) {
      res.status(500).json({ error: "Failed to perform WHOIS lookup" });
    } else {
      res.json(result);
    }
  });
});

app.get("/", function (req, res) {
  res.send("Welcome to Domain Age Checker");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
