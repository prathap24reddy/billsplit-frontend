import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TotalPayment from '../components/TotalPayment';
import DataEntryTable from '../components/DataEntryTable';
import PaymentHistory from '../components/PaymentHistory';
import AddFriend from '../components/AddFriend';

function BillSplit() {
    const [data, setData] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:4000/friendList");
            setData(response.data);
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDataUpdate = () => {
        fetchData();
    };

    if (data === null) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <DataEntryTable data={data} onDataUpdate={handleDataUpdate} />
            <AddFriend onFriendAdded={handleDataUpdate} />
            <TotalPayment data={data} />
            <PaymentHistory friendList={data} onUpdate={handleDataUpdate} />
        </div>
    );
}

export default BillSplit;
