
import { useState, useEffect } from "react";
import axios from "axios";

const AvailabilityDisplay = ({ selectedDate }) => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [slotError, setSlotError] = useState("");

  // Time options to display
  const timeOptions = ["10:00 AM", "01:00 PM", "04:00 PM", "07:00 PM", "10:00 PM"];

  useEffect(() => {
    // Fetch the available slots for the selected date
    const fetchSlots = async () => {
      if (!selectedDate) return;

      try {
        const response = await axios.get(
          `http://localhost:5000/api/check-availability?date=${selectedDate}`
        );
        setAvailableSlots(response.data.availableSlots); // Assuming backend returns available slots
      } catch (error) {
        setSlotError("Error fetching availability data");
      }
    };

    fetchSlots();
  }, [selectedDate]);

  return (
    <div className="availability-display">
      {slotError && <p style={{ color: "red" }}>{slotError}</p>}
      {availableSlots.length ? (
        <p>No slots available for the selected date.</p>
      ):(
        <div className="time-options">
          <h2>Available Slots: </h2>
          
          <div >
          <p>Today:</p>
            {timeOptions.map((time) => (
            <button style={{margin:"35px"}}
              key={time}
              className={`time-button ${availableSlots.includes(time) ? "" : "unavailable"}`}
              disabled={!availableSlots.includes(time)}
            >
              {time}
            </button>
          ))}
          </div>
          <div >
          <p>Tomorrow:</p>
            {timeOptions.map((time) => (
            <button style={{margin:"35px"}}
              key={time}
              className={`time-button ${availableSlots.includes(time) ? "" : "unavailable"}`}
              disabled={!availableSlots.includes(time)}
            >
              {time}
            </button>
          ))}
          </div>
          
        </div>
      )}
    </div>
  );
};

export default AvailabilityDisplay;

