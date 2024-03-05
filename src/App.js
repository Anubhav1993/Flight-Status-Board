import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FlightDetail from "./components/FlightDetails/FlightDetail";
import FlightTable from "./components/FlightTable/FlightTable";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element=<FlightTable /> />
        <Route path="/flight/:id" element=<FlightDetail /> />
      </Routes>
    </Router>
  );
}

export default App;
