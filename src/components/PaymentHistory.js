import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PaymentHistory({ friendList, onUpdate }) {
    const [history, setHistory] = useState([]);

    const fetchPaymentHistory = async () => {
        try {
            const response = await axios.get("http://localhost:4000/paymentHistory");
            setHistory(response.data);
        } catch (err) {
            console.error("Error fetching payment history:", err);
        }
    };

    const handleDeleteTransaction = async (id) => {
        try {
            const response=await axios.delete(`http://localhost:4000/deleteTransaction/${id}`);
            console.log("Delete response:", response);
            fetchPaymentHistory(); // Refresh the payment history
            if (onUpdate) onUpdate(); // Call the update function to refresh other components
        } catch (err) {
            console.error("Error deleting transaction:", err);
        }
    };

    useEffect(() => {
        fetchPaymentHistory();
    }, []);

    const getFriendName = (id) => {
        const friend = friendList.find(f => f.id === id);
        return friend ? friend.name : 'Unknown';
    };

    const parseJSONSafely = (data) => {
        try {
            if (typeof data === 'string') {
                return JSON.parse(data);
            }
            return data || [];
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return [];
        }
    };

    return (
        <div>
            <h2>Payment History</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Lenders</th>
                        <th>Borrowers</th>
                        <th>Total Amount</th>
                        <th>Note</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((entry) => (
                        <tr key={entry.id}>
                            <td>{new Date(entry.date).toLocaleString()}</td>
                            <td>
                                {parseJSONSafely(entry.lenders).map((lender, index) => (
                                    <div key={index}>
                                        {getFriendName(lender.id)}: ${parseFloat(lender.amount).toFixed(2)}
                                    </div>
                                ))}
                            </td>
                            <td>
                                {parseJSONSafely(entry.borrowers).map((borrower, index) => (
                                    <div key={index}>
                                        {getFriendName(borrower.id)}: ${parseFloat(borrower.amount).toFixed(2)}
                                    </div>
                                ))}
                            </td>
                            <td>${parseFloat(entry.amount).toFixed(2)}</td>
                            <td>{entry.note}</td>
                            <td>
                                <button onClick={() => handleDeleteTransaction(entry.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PaymentHistory;
