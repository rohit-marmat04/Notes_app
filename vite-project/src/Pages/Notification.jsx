import React, { useEffect, useState } from "react";
import NotificationCard from "../components/NotificationCard";
import Navbar from "../components/Navbar";
import axios from "axios";

const Notification = () => {
  const [notifications, setNotifications] = useState([]); // initialize as []

  useEffect(() => {
    axios
      .get('https://notes-app-1-3rxs.onrender.com/api/notifications/getnotifications')
      .then((res) => {
        setNotifications(res.data.notifications || []); // fallback to empty array
      })
      .catch((err) => {
        console.error("Error fetching notifications:", err);
        setNotifications([]); // ensure fallback
      });
  }, []);

  return (
    <section className="bg-gray-800 min-h-screen">
      <Navbar/>
    <div className="max-w-3xl mx-auto p-4 bg-gray-700 rounded-2xl mt-2">
      <h2 className="text-2xl font-bold mb-6 text-white">Notifications</h2>
      {notifications && notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        notifications?.map((notif, idx) => (
          <NotificationCard
            key={idx}
            title={notif.title}
            type={notif.type}
            description={notif.description}
            link={notif.link}
            buttonLabel={notif.buttonLabel}
          />
        ))
      )}
    </div>
    </section>
  );
};

export default Notification;
