Potato Leaf Disease Detection (CNN)
A deep learning-based web application designed to detect diseases in potato leaves using a Convolutional Neural Network (CNN).
The project features frontend ( React ) backend (Node.js / Express) ,and a Python processing script powered by **TensorFlow/Keras**

 Features
- **AI-Powered Prediction**: Uses a custom trained CNN model to classify potato leaf images into categories: *Early Blight*, *Late Blight*, or *Healthy*.
- **Interactive UI**: Clean and responsive React frontend where users can easily upload leaf images and view instant predictions with confidence scores.
- **Robust Integration**: Node.js backend uses child processes (`spawn`) to seamlessly execute Python prediction scripts using a dedicated virtual environment.

-  Tech Stack
- **Frontend**: React.js, CSS
- **Backend**: Node.js, Express.js, Multer (for image uploads)
- **Machine Learning / AI**: Python, TensorFlow, Keras, NumPy
- **Model Storage**: `.keras` model format
