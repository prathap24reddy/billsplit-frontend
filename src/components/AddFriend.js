import React, { useState } from "react";
import axios from "axios";

function AddFriend({ onFriendAdded }) {
    const [name, setName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:4000/addFriend", { name });
            setName("");
            onFriendAdded();
        } catch (err) {
            console.error("Error adding friend:", err);
        }
    };

    return (
        <div>
            <h1>Add Friend</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter a Friend Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default AddFriend;
