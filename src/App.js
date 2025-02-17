import React from "react";
import FlightSearch from "./Components/FlightsSearch";
import { FlightsProvider } from "./Context/FlightsContext";
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <FlightsProvider>
      <FlightSearch />
    </FlightsProvider>
  );
}

export default App;