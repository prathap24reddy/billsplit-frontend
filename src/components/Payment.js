import React, { useState } from 'react';
import axios from 'axios';
export default function Payment(e) {
    const data=e.data;
    const noOfFriends=data.length;
    console.log(data);
    // const [amount,setAmount]=useState(0);
    var amount=0;
    function handleChange(event){
        amount=event.target.value;
        // setAmount(event.target.value);
        // event.preventDefault();
        console.log(amount);
    }
    function handleClick(){
        const perAmount=amount/noOfFriends
        console.log(perAmount);
        data.forEach((item)=>{ 
            console.log(item);
            async function updateBorrow(){
                try{
                    await axios.patch("http://localhost:4000/updateborrow")
                }
            }
        })
    }
  return (
    <div>
        <p>Enter amount of a payment</p>
        <input onChange={handleChange} type='number'></input>
        <button type='submit'onClick={handleClick} >Submit</button>
    </div>
  );
}
