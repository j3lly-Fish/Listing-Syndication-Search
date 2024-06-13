import requests
from bs4 import BeautifulSoup

def search_webpage(url, search_term):
    try:
        # Send a GET request to the URL
        response = requests.get(url)
        response.raise_for_status()  # Raise an error for bad status codes

        # Parse the webpage content
        soup = BeautifulSoup(response.text, 'html.parser')
        content = soup.get_text()

        # Search for the term in the webpage content
        if search_term in content:
            print("Found")
        else:
            print("Not Found")
    except requests.exceptions.RequestException as e:
        print(f"Error accessing the webpage: {e}")

if __name__ == "__main__":
    # Input URL and search term
    url = input("Enter the URL of the webpage: ")
    search_term = input("Enter the term to search for: ")
    
    # Search the webpage for the term
    search_webpage(url, search_term)
