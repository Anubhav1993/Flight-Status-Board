import { useCallback } from "react";
import { Link } from "react-router-dom";

const FlightRow = ({ flight, index }) => {
  const {
    id,
    flightNumber,
    airline,
    origin,
    destination,
    departureTime,
    status,
  } = flight;
  const getStatusClass = useCallback((status) => {
    switch (status.toLowerCase()) {
      case "on time":
        return "on-time";
      case "delayed":
        return "delayed";
      case "boarding":
        return "boarding";
      case "departed":
        return "departed";
      default:
        return "";
    }
  }, []);
  return (
    <tr>
      <td>{flightNumber}</td>
      <td>{airline}</td>
      <td>{origin}</td>
      <td>{destination}</td>
      <td>{new Date(departureTime).toLocaleString()}</td>
      <td className={getStatusClass(status)}>{status}</td>
      <td>
        <Link to={`/flight/${id}`} className="details-link">
          View Details
        </Link>
      </td>
    </tr>
  );
};

export default FlightRow;
