import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateFilter = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  return (
    <div>
      <header class="header navbar-fixed-top">
        <nav class="navbar bg-body-tertiary">
          <div class="container-fluid">
            <img src="../../logo-h10j.png" alt="" />
            <p class="navbar-brand">Agenda de Cirurgia</p>

            <form class="d-flex">
              <DatePicker selected={selectedDate} onChange={handleDateChange} />
            </form>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default DateFilter;
