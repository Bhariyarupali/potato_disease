
const express = require("express");
const multer = require("multer");

const {
    predictDisease
} = require("../controllers/predictionController");

const router = express.Router();

// Store uploaded images
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        const uniqueName =
            Date.now() + "-" + file.originalname;

        cb(null, uniqueName);
    }
});

// Allow only image files
const fileFilter = (req, file, cb) => {

    const allowedTypes = [
        "image/jpeg",
        "image/png"
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only JPG and PNG images allowed"));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

// Prediction API
router.post(
    "/predict",
    upload.single("file"),
    predictDisease
);

module.exports = router;
