import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import FlightDetails from "./components/FlightDetails/FlightDetails";

const FlightTable = lazy(() => import("./components/FlightTable/FlightTable"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" exact element=<FlightTable /> />

          <Route path="/flight/:id" element=<FlightDetails /> />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
