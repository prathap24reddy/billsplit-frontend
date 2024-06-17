import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Payment from '../components/Payment';

function BillSplit() {
    const [data, setData]=useState(null);
    useEffect(()=>{
        async function fetchData(){
            try{
                const response=await axios.get("http://localhost:4000/friendList");
                // console.log(response.data);  
                setData(response.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    },[]);
    if(data===null){
        return(
            <div>Loading...</div>
        );
    }
  return (
    <div>
        <Payment data={data}/>
        <table>
            <tr>
                <th>Name</th>
                <th>Lent</th>
                <th>Borrowed</th>
            </tr>
        {
            data.map((d,i)=>{
                {/* console.log(d); */}
                return(
                    <tr key={i}>
                        <td>{d.name}</td>
                        <td>{d.lent}</td>
                        <td>{d.borrow}</td>
                    </tr>
                );
            })
        }
        </table>
    </div>
  );
}

export default BillSplit;