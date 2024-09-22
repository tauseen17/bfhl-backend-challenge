const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import cors package

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all origins or specify your frontend's origin
const corsOptions = {
  origin: "https://bfhl-frontend.vercel.app", // Update this to match your frontend URL
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post("/bfhl", (req, res) => {
  const { data } = req.body;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      message: "Invalid input: data should be an array",
    });
  }

  const numbers = data.filter(
    (item) => !isNaN(item) && item !== null && item !== ""
  );
  const alphabets = data.filter(
    (item) => isNaN(item) && typeof item === "string"
  );
  const highest_alphabet = alphabets.length
    ? [
        alphabets
          .sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }))
          .pop(),
      ]
    : [];

  res.json({
    is_success: true,
    user_id: "mohd_tauseen_17022003",
    email: "mm0313@srmist.edu.in",
    roll_number: "RA2111028010066",
    numbers: numbers,
    alphabets: alphabets,
    highest_alphabet: highest_alphabet,
  });
});

app.get("/bfhl", (req, res) => {
  res.json({ operation_code: 1 });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
