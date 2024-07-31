import React, { useState } from "react";
import "./App.css";

function Apicall({ apiResponse }) {
  return (
    <div>
      <h1>API Caller</h1>
      {apiResponse && (
        <div>
          <h2>API Response:</h2>
          <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

function App() {
  const [movieName, setMovieName] = useState("");
  const [movieYear, setMovieYear] = useState("");
  const [apiResponse, setApiResponse] = useState(null);

  const resetFields = () => {
    setMovieName("");
    setMovieYear("");
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      await callApi();
    }
  };

  const callApi = async () => {
    const url = `http://www.omdbapi.com/?t=${movieName}&y=${movieYear}&apikey=6f06c068`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setApiResponse(data);
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
      setApiResponse({ error: error.message });
    }
  };

  return (
    <div className="input-field1">
      <h3>Movie Name:</h3>
      <input
        className="input1"
        type="text"
        placeholder="name"
        id="i1"
        value={movieName}
        onChange={(e) => setMovieName(e.target.value)}
        onKeyPress={handleKeyPress}
      />

      <div className="input-field2">
        <h3>Movie Year(optional):</h3>
        <input
          className="input2"
          type="text"
          placeholder="year"
          value={movieYear}
          onChange={(e) => setMovieYear(e.target.value)}
        />

        <button className="btn" onClick={resetFields}>
          Reset
        </button>
        <br />
        <br />
        <p>Click Enter</p>
      </div>
      <Apicall apiResponse={apiResponse} />
    </div>
  );
}

export default App;
