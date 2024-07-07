import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TripManager({ onTripUpdate }) {
    const [trips, setTrips] = useState([]);
    const [newTrip, setNewTrip] = useState({ name: '', start_date: '', end_date: '' });
    const [editingTrip, setEditingTrip] = useState(null);

    const fetchTrips = async () => {
        try {
            const response = await axios.get("http://localhost:4000/trips");
            setTrips(response.data);
        } catch (err) {
            console.error("Error fetching trips:", err);
        }
    };

    const handleAddTrip = async () => {
        try {
            await axios.post("http://localhost:4000/addTrip", newTrip);
            setNewTrip({ name: '', start_date: '', end_date: '' });
            fetchTrips();
            if (onTripUpdate) onTripUpdate(); // Notify parent component
        } catch (err) {
            console.error("Error adding trip:", err);
        }
    };

    const handleEditTrip = async () => {
        if (editingTrip) {
            try {
                await axios.put(`http://localhost:4000/updateTrip/${editingTrip.id}`, editingTrip);
                setEditingTrip(null);
                fetchTrips();
                if (onTripUpdate) onTripUpdate(); // Notify parent component
            } catch (err) {
                console.error("Error updating trip:", err);
            }
        }
    };

    const handleDeleteTrip = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/deleteTrip/${id}`);
            fetchTrips();
            if (onTripUpdate) onTripUpdate(); // Notify parent component
        } catch (err) {
            console.error("Error deleting trip:", err);
        }
    };

    useEffect(() => {
        fetchTrips();
    }, []);

    return (
        <div>
            <h2>Manage Trips</h2>
            <div>
                <h3>Add New Trip</h3>
                <input
                    type="text"
                    placeholder="Trip Name"
                    value={newTrip.name}
                    onChange={(e) => setNewTrip({ ...newTrip, name: e.target.value })}
                />
                <input
                    type="date"
                    value={newTrip.start_date}
                    onChange={(e) => setNewTrip({ ...newTrip, start_date: e.target.value })}
                />
                <input
                    type="date"
                    value={newTrip.end_date}
                    onChange={(e) => setNewTrip({ ...newTrip, end_date: e.target.value })}
                />
                <button onClick={handleAddTrip}>Add Trip</button>
            </div>
            {editingTrip && (
                <div>
                    <h3>Edit Trip</h3>
                    <input
                        type="text"
                        value={editingTrip.name}
                        onChange={(e) => setEditingTrip({ ...editingTrip, name: e.target.value })}
                    />
                    <input
                        type="date"
                        value={editingTrip.start_date}
                        onChange={(e) => setEditingTrip({ ...editingTrip, start_date: e.target.value })}
                    />
                    <input
                        type="date"
                        value={editingTrip.end_date}
                        onChange={(e) => setEditingTrip({ ...editingTrip, end_date: e.target.value })}
                    />
                    <button onClick={handleEditTrip}>Update Trip</button>
                </div>
            )}
            <ul>
                {trips.map((trip) => (
                    <li key={trip.id}>
                        {trip.name} ({trip.start_date} - {trip.end_date})
                        <button onClick={() => setEditingTrip(trip)}>Edit</button>
                        <button onClick={() => handleDeleteTrip(trip.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TripManager;
