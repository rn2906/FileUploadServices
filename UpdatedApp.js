const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
const port = 5000;

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use(cors()); // Enable CORS for all routes

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Use the dynamically created directory
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post(
  "/upload",
  upload.fields([{ name: "UploadInvoice" }, { name: "ConfirmationInvoice" }]),
  (req, res) => {
    try {
      const files = req.files;
      const fileName1 = files.UploadInvoice
        ? files.UploadInvoice[0].filename
        : null;
      const fileName2 = files.ConfirmationInvoice
        ? files.ConfirmationInvoice[0].filename
        : null;

      res.status(200).json({
        message: "Files uploaded successfully",
        fileName1,
        fileName2,
      });
    } catch (error) {
      res.status(500).json({ error: "Error uploading files" });
    }
  }
);

app.get("/filenames", (req, res) => {
  const { fileName1, fileName2 } = req.query;
  console.log("Received file names:", fileName1, fileName2);

  // Handle the file names as needed
  res.json({ message: `File names received: ${fileName1}, ${fileName2}` });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
