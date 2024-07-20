import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TripManager from '../components/TripManager';
import AddFriend from '../components/AddFriend';
import DataEntryTable from '../components/DataEntryTable';
import TotalPayment from '../components/TotalPayment';
import PaymentHistory from '../components/PaymentHistory';

function BillSplit({userData}) {
    // console.log(userData);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [friends, setFriends] = useState([]);
    const [refresh, setRefresh] = useState(false); // State to trigger refresh
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [transactions, setTransactions] = useState([]);

    const handleTripSelect = (trip) => {
        setSelectedTrip(trip);
    };

    const fetchFriends = async () => {
        try {
            const response = await axios.get('http://localhost:4000/users');
            setFriends(response.data);
        } catch (error) {
            console.error('Error fetching friends:', error);
        }
    };

    const fetchTransactions = async (tripId) => {
        try {
            const response = await axios.get(`http://localhost:4000/transaction/${tripId}`);
            setTransactions(response.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    useEffect(() => {
        fetchFriends();
    }, []);

    useEffect(() => {
        if (selectedTrip) {
            fetchTransactions(selectedTrip.id);
        }
    }, [selectedTrip, refresh]);

    const handleFriendAdded = () => {
        setRefresh(prev => !prev); // Toggle refresh state to trigger DataEntryTable update
    };

    const handleTransactionSubmitted = () => {
        setRefresh(prev => !prev); // Toggle refresh state to trigger PaymentHistory update
        setEditingTransaction(null);  // Clear editingTransaction state after submission or cancel
    };

    const handleEditTransaction = (transaction) => {
        setEditingTransaction(transaction);
    };

    const handleDeleteTransaction = (transactionId) => {
        setTransactions(prevTransactions => 
            prevTransactions.filter(transaction => transaction.id !== transactionId)
        );
        setRefresh(prev => !prev);
    };

    return (
        <div>
            <TripManager onTripSelect={handleTripSelect} userData={userData}/>
            {selectedTrip && (
                <>  
                    <div className='box'>
                        <DataEntryTable
                            tripId={selectedTrip.id}
                            refreshData={refresh}
                            onTransactionSubmitted={handleTransactionSubmitted}
                            editingTransaction={editingTransaction}
                        />
                        <AddFriend tripId={selectedTrip.id} friends={friends} onFriendAdded={handleFriendAdded} />
                    </div>
                    <TotalPayment transactions={transactions}/>
                    <PaymentHistory
                        transactions={transactions}
                        onEditTransaction={handleEditTransaction}
                        onDeleteTransaction={handleDeleteTransaction}
                    />
                </>
            )}
        </div>
    );
}

export default BillSplit;