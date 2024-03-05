import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FLIGHT_API_URL } from "../../utils/Constants";
import "./FlightDetails.css";

const FlightDetails = () => {
  const { id } = useParams();
  const [flightDetails, setFlightDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlightDetails = async () => {
      try {
        const response = await fetch(`${FLIGHT_API_URL}/${id}`);
        const jsonResponse = await response.json();
        setFlightDetails(jsonResponse);
        setLoading(false);
      } catch (error) {
        setError(
          "Flight details not found. Please check the flight number and try again."
        );
        setLoading(false);
      }
    };
    fetchFlightDetails();
  }, [id]);

  return (
    <div className="flight-details-container">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : flightDetails ? (
        <>
          <h2 className="flight-details-header">Flight Details</h2>
          <div className="flight-detail">
            <label>Flight Number:</label> {flightDetails.flightNumber}
          </div>
          <div className="flight-detail">
            <label>Airline:</label> {flightDetails.airline}
          </div>
          <div className="flight-detail">
            <label>Origin:</label> {flightDetails.origin}
          </div>
          <div className="flight-detail">
            <label>Destination:</label> {flightDetails.destination}
          </div>
          <div className="flight-detail">
            <label>Departure Time:</label>{" "}
            {new Date(flightDetails.departureTime).toLocaleString()}
          </div>
          <div className="flight-detail">
            <label>Status:</label>{" "}
            <span className={`status ${flightDetails.status.toLowerCase()}`}>
              {flightDetails.status}
            </span>
          </div>
        </>
      ) : (
        <div className="error">Flight details not found.</div>
      )}
    </div>
  );
};
export default FlightDetails;
