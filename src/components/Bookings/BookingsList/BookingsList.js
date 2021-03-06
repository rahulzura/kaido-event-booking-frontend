import React from "react";

import "./BookingsList.css";

const bookingList = props => (
  <ul className="booking__list">
    {props.bookings.map(booking => {
      return (
        <li className="booking__item" key={booking._id}>
          <div className="booking__item-data">
            {booking.event.title} -{" "}
            {new Date(booking.createdAt).toLocaleDateString()}
          </div>
          <div className="booking__item-actions">
            <button className="btn" onClick={() => props.onDelete(booking._id)}>
              Cancel
            </button>
          </div>
        </li>
      );
    })}
  </ul>
);

export default bookingList;
