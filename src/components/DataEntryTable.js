import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DataEntryTable({ data, onDataUpdate }) {
    // console.log(data);
    const [tableData, setTableData] = useState([]);
    const [totalLent, setTotalLent] = useState(0);
    const [splitEqually, setSplitEqually] = useState(false);
    const [note, setNote] = useState('');

    useEffect(() => {
        setTableData(data.map(item => ({ ...item, newLent: '', newBorrow: '' })));
    }, [data]);

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedData = [...tableData];
        updatedData[index][name] = value;
        setTableData(updatedData);

        if (name === 'newLent') {
            const newTotal = updatedData.reduce((sum, item) => sum + (Number(item.newLent) || 0), 0);
            setTotalLent(newTotal);
        }
    };

    const handleTotalLentChange = (event) => {
        const value = Number(event.target.value);
        setTotalLent(value);
        if (splitEqually) {
            const perPersonAmount = value / tableData.length;
            setTableData(tableData.map(item => ({ ...item, newBorrow: perPersonAmount.toFixed(2) })));
        }
    };

    const handleNoteChange = (event) => {
        setNote(event.target.value);
    };

    const toggleSplitEqually = () => {
        setSplitEqually(!splitEqually);
        if (!splitEqually) {
            const perPersonAmount = totalLent / tableData.length;
            setTableData(tableData.map(item => ({ ...item, newBorrow: perPersonAmount.toFixed(2) })));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const totalBorrow = tableData.reduce((sum, item) => sum + (Number(item.newBorrow) || 0), 0);
        if (Math.abs(totalLent - totalBorrow) >= data.length) {
            alert('Total lent must equal total borrowed');
            return;
        }

        try {
            const updatedData = tableData.map(item => ({
                id: item.id,
                name: item.name,
                newLent: Number(item.newLent) || 0,
                newBorrow: Number(item.newBorrow) || 0
            })).filter(item => item.newLent !== 0 || item.newBorrow !== 0);

            await axios.post('http://localhost:4000/updateFriends', { data: updatedData, note });
            
            alert('Data updated successfully!');
            if (onDataUpdate) onDataUpdate();
            setTableData(data.map(item => ({ ...item, newLent: '', newBorrow: '' })));
            setTotalLent(0);
            setSplitEqually(false);
            setNote('');
        } catch (error) {
            console.error('Error updating data:', error);
            alert('Error updating data. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Total Lent:
                    <input
                        type="number"
                        value={totalLent}
                        onChange={handleTotalLentChange}
                    />
                </label>
                <label>
                    Note:
                    <input
                        type="text"
                        value={note}
                        onChange={handleNoteChange}
                        placeholder="Add a note for this transaction"
                    />
                </label>
                <label>
                    Split Equally:
                    <input
                        type="checkbox"
                        checked={splitEqually}
                        onChange={toggleSplitEqually}
                    />
                </label>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>New Lent</th>
                        <th>New Borrow</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>
                                <input
                                    type="number"
                                    name="newLent"
                                    value={item.newLent}
                                    onChange={(e) => handleInputChange(index, e)}
                                    disabled={splitEqually}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="newBorrow"
                                    value={item.newBorrow}
                                    onChange={(e) => handleInputChange(index, e)}
                                    disabled={splitEqually}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button type="submit">Submit Data</button>
        </form>
    );
}

export default DataEntryTable;
