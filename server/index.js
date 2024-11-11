const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const Tesseract = require("tesseract.js");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 4321;
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());

// Serve static files from React app
app.use(express.static(path.join(__dirname, "../client/build")));

// Example API endpoint
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

// All other routes serve the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.post("/extract-text", upload.single("image"), async (req, res) => {
  const imagePath = req.file.path;

  try {
    // Use Tesseract.js to extract text from the image
    const {
      data: { text },
    } = await Tesseract.recognize(imagePath, "eng", {
      logger: (m) => console.log(m), // Optional: Log progress
    });

    fs.unlinkSync(imagePath); // Clean up the uploaded image
    res.json({ extractedText: text });
  } catch (error) {
    console.error("Error during text extraction:", error);
    res.status(500).json({ error: "Text extraction failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
