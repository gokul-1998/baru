from flask import Flask, render_template, request, jsonify, send_file
from werkzeug.utils import secure_filename
import os
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'
app.config['UPLOAD_FOLDER'] = 'uploads'

# Ensure upload folder exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/save_resume', methods=['POST'])
def save_resume():
    data = request.json
    try:
        # Save resume data
        with open(f"uploads/{data['id']}.json", 'w') as f:
            json.dump(data, f)
        return jsonify({"status": "success"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

@app.route('/get_resume/<resume_id>')
def get_resume(resume_id):
    try:
        with open(f"uploads/{resume_id}.json", 'r') as f:
            data = json.load(f)
        return jsonify(data)
    except FileNotFoundError:
        return jsonify({"status": "error", "message": "Resume not found"})

if __name__ == '__main__':
    app.run(debug=True)
