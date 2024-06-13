import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // Hardcoded URLs
  const url1 = 'https://feeds.hotpads.com/report/DoorLoop/latest.txt'; // Replace with the actual Zillow URL
  const url2 = 'https://www.rentalsource.com/feeds/response/doorloop-a32u3mjw.xml'; // Replace with the actual RentalSource URL

  const [unitNumber, setUnitNumber] = useState('');
  const [result1, setResult1] = useState('');
  const [lines1, setLines1] = useState([]);
  const [result2, setResult2] = useState('');
  const [lines2, setLines2] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/search', {
        url1,
        url2,
        search_term: unitNumber
      });
      setResult1(response.data.result1);
      setLines1(response.data.lines1 || []); // Ensure lines1 is an array
      setResult2(response.data.result2);
      setLines2(response.data.lines2 || []); // Ensure lines2 is an array
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Listing Syndication Search</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Unit Number:
              <input
                type="text"
                value={unitNumber}
                onChange={(e) => setUnitNumber(e.target.value)}
                required
              />
            </label>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
        {result1 && (
          <div>
            <h2>Results for Zillow</h2>
            <p>Status: {result1}</p>
            {lines1.map((line, index) => (
              <div key={index}>
                <p>{line}</p>
              </div>
            ))}
          </div>
        )}
        {result2 && (
          <div>
            <h2>Results for RentalSource</h2>
            <p>Status: {result2}</p>
            {lines2.map((line, index) => (
              <div key={index}>
                <p>{line}</p>
              </div>
            ))}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
