const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const predictDisease = (req, res) => {

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "Please upload an image"
        });
    }

    const imagePath = path.resolve(req.file.path);

    // predict.py ab backend/ folder ke andar hai
    const pythonScript = path.resolve(
        __dirname,
        "../predict.py"
    );

    // Model root folder mein hai (2 levels up)
    const modelPath = path.resolve(
        __dirname,
        "../../potato_cnn_model.keras"
    );

    // Classification report root folder mein hai
    const classPath = path.resolve(
        __dirname,
        "../../classification_report.txt"
    );

    // Virtual environment (.venv) ka python path
    const pythonExecutable = path.resolve(
        __dirname,
        "../../.venv/Scripts/python.exe"
    );

    // System python ki jagah .venv ka python use karein
    const python = spawn(pythonExecutable, [
        pythonScript,
        imagePath,
        modelPath,
        classPath
    ]);

    let output = "";
    let errorOutput = "";

    python.stdout.on("data", (data) => {
        output += data.toString();
    });

    python.stderr.on("data", (data) => {
        errorOutput += data.toString();
    });

    python.on("close", (code) => {

        // Uploaded image ko delete karna
        fs.unlink(imagePath, () => {});

        if (code !== 0) {
            console.error("Python Error:", errorOutput);

            return res.status(500).json({
                success: false,
                message: "CNN prediction failed",
                error: errorOutput
            });
        }

        try {
            const result = JSON.parse(output);

            return res.json({
                success: true,
                ...result
            });

        } catch (error) {
            console.error("JSON Parse Error:", output);

            return res.status(500).json({
                success: false,
                message: "Invalid prediction response"
            });
        }
    });
};

module.exports = { predictDisease };