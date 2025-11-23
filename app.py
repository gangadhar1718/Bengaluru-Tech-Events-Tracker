from flask import Flask, send_from_directory, jsonify
import json
import os

app = Flask(__name__, static_folder='build')

@app.route('/')
def serve_react():
    """Serve the React application"""
    return send_from_directory('build', 'index.html')

@app.route('/test-data.json')
def serve_test_data():
    """Serve the test data JSON file"""
    try:
        with open('test data.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
        return jsonify(data)
    except FileNotFoundError:
        return jsonify({"error": "Test data file not found"}), 404
    except json.JSONDecodeError:
        return jsonify({"error": "Invalid JSON in test data file"}), 500

@app.route('/<path:path>')
def serve_static(path):
    """Serve static files from the React build"""
    try:
        return send_from_directory('build', path)
    except:
        # If file not found, serve index.html for client-side routing
        return send_from_directory('build', 'index.html')

if __name__ == '__main__':
    app.run(port=8000, debug=True)
