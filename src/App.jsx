
import { useState } from "react";
import BookingForm from "./Components/BookingForm";
import AvailabilityDisplay from "./Components/AvailabilityDisplay";
import BookingSummary from "./Components/BookingSummary";
import './styles/app.css';

function App() {
  const [bookingDetails, setBookingDetails] = useState(null);

  const handleBookingSubmit = (details) => {
    setBookingDetails(details);
  };

  return (
    <div className="app">
      <h1 style={{border:"2px, solid, black", marginBottom:"10px"}} >Restaurant Table Booking</h1>
     
      {!bookingDetails ? (
        <>
          <BookingForm onSubmit={handleBookingSubmit} />
          <AvailabilityDisplay />
        </>
      ) : (
        <BookingSummary details={bookingDetails} />
      )}
    </div>
  );
}

export default App;
