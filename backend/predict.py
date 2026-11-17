import sys
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import json

# 1. Command line se arguments lena (image path, model path, class path)
image_path = sys.argv[1]
model_path = sys.argv[2]
class_path = sys.argv[3]

# 2. Model load karna
model = tf.keras.models.load_model(model_path)

# 3. Image ko load aur preprocess karna (jaisa aapne training ke waqt kiya ho)
img = image.load_img(image_path, target_size=(128,128)) # Apne size ke hisaab se check kar lein
img_array = image.img_to_array(img)
img_array = tf.expand_dims(img_array, 0) # Create a batch

# 4. Model se prediction karvana (Yahan 'predictions' define hota hai!)
predictions = model.predict(img_array, verbose=0)

# 5. Classes ke naam (Aapke dataset ke hisaab se)
class_names = ['Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy']

# 6. Probabilities nikalna
preds = predictions[0]

# 7. Aapke maange hue format ke mutabiq string banana
result_string = f"{class_names[0]} : {preds[0]:.2f}{class_names[1]} : {preds[1]:.2f}{class_names[2]} : {preds[2]:.2f}"

# 8. Node.js ke liye JSON output print karna
output_data = {
    "predictionText": result_string,
    "class": class_names[np.argmax(preds)],
    "confidence": float(np.max(preds) * 100)
}

print(json.dumps(output_data))