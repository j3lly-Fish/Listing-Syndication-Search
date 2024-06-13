from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def search_webpage(url, search_term):
    try:
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        content = soup.get_text()
        lines = content.splitlines()
        
        found_lines = []
        for line in lines:
            if search_term in line:
                found_lines.append(line)
        
        if found_lines:
            return "Found", found_lines
        else:
            return "Not Found", []
    except requests.exceptions.RequestException as e:
        return f"Error accessing the webpage: {e}", []

@app.route('/search', methods=['POST'])
def search():
    data = request.json
    url1 = data.get('url1')
    url2 = data.get('url2')
    search_term = data.get('search_term')
    
    result1, lines1 = search_webpage(url1, search_term)
    result2, lines2 = search_webpage(url2, search_term)
    
    return jsonify({
        'result1': result1,
        'lines1': lines1,
        'result2': result2,
        'lines2': lines2
    })

if __name__ == "__main__":
    app.run(debug=True)
