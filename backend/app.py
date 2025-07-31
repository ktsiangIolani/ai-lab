from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from tensorflow.keras.models import load_model
import tensorflow as tf
import joblib
from tensorflow.keras.preprocessing.text import tokenizer_from_json
import json
import pandas as pd

app = Flask(__name__)
CORS(app)
model = load_model("./backend/dna_classifier_model.h5")
emi_llm_model = load_model("./backend/emi_llm.h5")

def convertToNumbers(sequence):
    #returns an array of numbers
    # example: 'ACTG--TG' -> [1, 2, 3, 4, 0, 0, 3, 4]
    mapping = {
    'A': 1, 'T': 3, 'G': 2, 'C': 4, '-': 0
    }
    nums = []
    for i in range(len(sequence)):
        nums.append(mapping[sequence[i]])
    return np.array(nums)

@app.route('/api/predict-specimen', methods=['POST'])
def predict_specimen():
    try:
        data = request.json['input']  # input should be a list or list of lists
        input_array = np.array([convertToNumbers(data)])
        predictions = model.predict(input_array)
        speciesEncoder = joblib.load("./backend/speciesEncoder.pkl")
        predicted = speciesEncoder.inverse_transform([np.argmax(predictions[0])])[0]
        return jsonify({"success": True, "prediction": predicted})
        #return jsonify({"prediction": predictions.tolist()})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})

@app.route('/api/student-chat', methods=['POST'])
def student_chat():
    try:
        data = request.json
        message = data.get('message', '')
        student = data.get('student', '')

        # 1. Read the JSON back in
        with open("./backend/emi_tokenizer.json", "r", encoding="utf-8") as f:
            data = json.load(f)

        # 2. Reconstruct the Tokenizer
        tokenizer = tokenizer_from_json(data)

        # 3. Use it
        predictions = []
        token_dict = {index:word for word, index in tokenizer.word_index.items()}
        next_prompt = message
  
        x = len(message) # we will make the response the same length as the prompt
        for i in range(x):
            tokenized_prompt = tokenizer.texts_to_sequences([next_prompt])[0] 
            while len(tokenized_prompt) < 5: 
                tokenized_prompt.append(1)
            input = pd.DataFrame({
                'token1': [tokenized_prompt[0]],
                'token2': [tokenized_prompt[1]],    
                'token3': [tokenized_prompt[2]],
                'token4': [tokenized_prompt[3]],
                'token5': [tokenized_prompt[4]],
            })
            result = emi_llm_model.predict(input)
            if not isinstance(result, np.integer):
                result = np.argmax(result)
            new_word = token_dict[result]
            predictions.append(new_word)
            next_prompt = " ".join((next_prompt + " " + new_word).split(" ")[1:])
        
        print("predictions", " ".join(predictions))
        return jsonify({
            "success": True, 
            "response": " ".join(predictions),
            "student": student
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})

if __name__ == '__main__':
    app.run(debug=True) 