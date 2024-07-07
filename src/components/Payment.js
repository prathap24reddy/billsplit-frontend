import React, { useState } from 'react';
import axios from 'axios';


export default function Payment({data, onPaymentSubmit }) {
    const noOfFriends=data.length;
    // console.log(data);
    const [amount,setAmount]=useState(0);
    function handleChange(event){
        setAmount(event.target.value);
    }
    async function handleSubmit(event) {
        event.preventDefault();

        if (amount==0 || isNaN(Number(amount))) {
            alert('Please enter a valid number');
            return;
        }
        const perAmount = amount / noOfFriends;
        console.log(perAmount);

        try {
            for (const item of data) {
                const newBorrow = Number(item.borrow) + perAmount;
                await axios.patch(`http://localhost:4000/updateborrow/${item.id}`, {
                    borrow: newBorrow
                });
                console.log(`Updated borrow for ${item.name}`);
            }
            // Call the function to refresh data after all updates are done
            onPaymentSubmit();
            // Reset the amount input
            setAmount(0);
        } catch (err) {
            console.error("Error updating borrow amounts:", err);
        }
    }

  return (
    <form onSubmit={handleSubmit}>
        <p>Enter amount of a payment</p>
        <input
            type='number'
            onChange={handleChange}
            value={amount!=0?amount:""}
            ></input>
        <button type='submit'>Submit</button>
    </form>
  );
}
