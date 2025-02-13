import os
import json
import subprocess
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Define the folder path and JSON file name
folder_path = '../akashicRecords/config_files'  # Adjust this as per your folder structure
json_file_path = os.path.join(folder_path, 'app_configuration.json')

# Read saved paths from the JSON file
def read_saved_paths():
    if os.path.exists(json_file_path):
        with open(json_file_path, 'r') as file:
            return json.load(file)
    return {}

# Write saved paths to the JSON file
def write_saved_paths(saved_paths):
    with open(json_file_path, 'w') as file:
        json.dump(saved_paths, file)

@app.route('/get_saved_path', methods=['GET'])
def get_saved_path():
    item = request.args.get('item')
    saved_paths = read_saved_paths()

    if item in saved_paths:
        return jsonify({'status': 'success', 'path': saved_paths[item]}), 200
    else:
        return jsonify({'status': 'error', 'message': f'No saved path for {item}!'}), 404

@app.route('/save_path', methods=['POST'])
def save_path():
    data = request.get_json()
    item = data.get('item')
    path = data.get('path')

    if not item or not path:
        return jsonify({'status': 'error', 'message': 'Item and path must be provided!'}), 400

    saved_paths = read_saved_paths()
    saved_paths[item] = path  # Save the new path for the item
    write_saved_paths(saved_paths)  # Write updated paths to the file

    return jsonify({'status': 'success', 'message': f'Path for {item} saved successfully!'}), 200

@app.route('/open_application', methods=['POST', 'OPTIONS'])
def open_application():
    if request.method == 'OPTIONS':
        # Handle preflight request
        return '', 200

    # Retrieve item and path from request
    data = request.get_json()
    item = data.get('item')
    path = data.get('path')
    
    if not item or not path or not os.path.exists(path):
        return jsonify({'status': 'error', 'message': 'Invalid path or missing item!'}), 400

    try:
        # Use subprocess to open the application or file
        # For example, on Windows, you can use `start` to open an executable or file
        subprocess.run(["start", path], shell=True, check=True)  # Adjust this line as needed
        return jsonify({'status': 'success', 'message': f'Opening {item} at {path}'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': f'Failed to open application: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
