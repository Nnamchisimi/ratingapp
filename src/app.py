from flask import Flask, request, jsonify
from flask_cors import CORS
from openpyxl import Workbook, load_workbook
import os
from datetime import datetime
import webbrowser  

app = Flask(__name__)
CORS(app)

EXCEL_FILE = "feedback_weights.xlsx"

# Initialize Excel file if it doesn't exist
def initialize_excel():
    if not os.path.exists(EXCEL_FILE):
        wb = Workbook()
        ws = wb.active
        ws.title = "Feedback"
        ws.append(["Timestamp", "Emoji", "Weight", "Suggestion"])  # Column headers
        wb.save(EXCEL_FILE)

# Save feedback data to the Excel file
@app.route("/save-feedback", methods=["POST"])
def save_feedback():
    initialize_excel()  # Ensure the file is initialized if not present

    data = request.json  # Get the JSON data from the request
    emoji = data.get("emoji")
    weight = data.get("weight")
    suggestion = data.get("suggestion", "")  # Suggestion is optional

    if not emoji or weight is None:
        return jsonify({"error": "Missing emoji or weight"}), 400  # Return error if missing

    try:
        wb = load_workbook(EXCEL_FILE)  # Load existing Excel file
        ws = wb["Feedback"]  # Get the 'Feedback' sheet
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")  # Get current timestamp
        ws.append([timestamp, emoji, weight, suggestion])  # Append the new data
        wb.save(EXCEL_FILE)  # Save the updated Excel file
        return jsonify({"message": "Feedback saved"}), 200  # Return success
    except Exception as e:
        return jsonify({"error": str(e)}), 500  # Handle errors and return them

if __name__ == '__main__':
    # Open the browser automatically when the app starts
    webbrowser.open("http://127.0.0.1:4000")  # Change the port if needed
    app.run(port=4000)  # Run on port 4000 (or whatever port you want)
