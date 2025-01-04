
import { useState, useEffect } from "react";
import axios from "axios";

const BookingForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "",
    name: "",
    contact: "",
  });

  const [slotError, setSlotError] = useState("");
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  const timeOptions = ["10:00 AM", "01:00 PM", "04:00 PM", "07:00 PM", "10:00 PM"];

  useEffect(() => {
    const today = new Date();
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(today.getDate() + 7);

    const formatDate = (date) => date.toISOString().split("T")[0];

    setMinDate(formatDate(today));
    setMaxDate(formatDate(oneWeekFromNow));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setSlotError(""); // Clear the error message when the form changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (Object.values(formData).some((field) => field === "")) {
      alert("All fields are required!");
      return;
    }
    if (!/^\d{10}$/.test(formData.contact)) {
      alert("Please enter a valid 10-digit contact number.");
      return;
    }

    try {
      const response = await axios.post("https://backend-production-a99b.up.railway.app/bookings", formData);
      alert(response.data.message);
      setFormData({ date: "", time: "", guests: "", name: "", contact: "" }); // Reset form
      onSubmit(formData);
    } catch (error) {
      if (error.response?.data?.message === "Slot is not available") {
        setSlotError("Sorry, the selected slot is not available.");
      } else {
        alert(error.response?.data?.message || "Something went wrong!");
      }
    }
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          min={minDate}
          max={maxDate}
        />
      </label>
      <label>
        Time:
        <select name="time" value={formData.time} onChange={handleChange}>
          <option value="">Select a time</option>
          {timeOptions.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </label>
      <label>
        Guests:
        <input
          type="number"
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          min="1"
        />
      </label>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Contact:
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Book Now</button>
      {slotError && <p style={{ color: "red", marginTop: "10px" }}>{slotError}</p>}
    </form>
  );
};

export default BookingForm;
