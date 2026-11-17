
import { useState } from "react";
import "./App.css";

function App() {

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
const [result, setResult] = useState(null);
  // Handle image upload
  const handleImageUpload = (event) => {

    const file = event.target.files[0];

    if (file) {

      if (!["image/jpeg", "image/png"].includes(file.type)) {
        alert("Please upload JPG or PNG image");
        return;
      }

      setImage(file);
      setPreview(URL.createObjectURL(file));
     setResult(null);
    }
  };

  // Predict disease
  const handlePredict = async () => {
  if (!image) return;

  const formData = new FormData();
  formData.append("file", image);

  try {
    const response = await fetch(
      "http://localhost:5000/api/predict",
      {
        method: "POST",
        body: formData
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    setResult(data);

  } catch (error) {
    alert(error.message);
  }
};

  return (

    <div className="app">

      {/* Heading */}

      <div className="header">

        <h2> Potato Disease Detection</h2>


      </div>


      {/* Upload Section */}

      <div className="main-container">

        <h3>Upload Potato Leaf Image</h3>

        


        {/* Image Upload Box */}

        <div className="upload-box">

          {preview ? (

            <img
              src={preview}
              alt="Uploaded Potato Leaf"
              className="preview-image"
            />

          ) : (

            <div className="upload-content">

              <span className="upload-icon">📷</span>

              <h3>Select Potato Leaf Image</h3>

              <p>JPG or PNG format supported</p>

            </div>

          )}

          <input
            type="file"
            accept="image/png,image/jpeg"
            id="imageUpload"
            onChange={handleImageUpload}
            hidden
          />

          <label
            htmlFor="imageUpload"
            className="upload-button"
          >
            Choose Image
          </label>

        </div>


        {/* Selected Image Name */}

        {image && (

          <p className="file-name">
            Selected Image: {image.name}
          </p>

        )}


        {/* Predict Button */}

        <button
          className="predict-button"
          onClick={handlePredict}
          disabled={!image}
        >
          Predict Disease
        </button>

        {/* Prediction Result Display Section */}
        {result && (
  <div className="result-container" style={{ marginTop: "20px" }}>
    <h3>Prediction Result:</h3>
    {/* Yeh aapke maange hue format ko print kar dega */}
    <p style={{ fontFamily: "monospace", fontSize: "16px" }}>
      {result.predictionText}
    </p>
  </div>
)}

      </div>


     

    </div>

  );

}

export default App;
