import React from 'react';

export default function TotalPayment({data}) {
    const calculateTotal = (lent, borrowed) => {
        const total = parseFloat(lent) - parseFloat(borrowed);
        if (total > 0) {
            return `Owed ${total.toFixed(2)}`;
        } else if (total < 0) {
            return `Owes ${Math.abs(total).toFixed(2)}`;
        } else {
            return 'Settled';
        }
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Lent</th>
                        <th>Borrowed</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((d, i) => (
                        <tr key={i}>
                            <td>{d.name}</td>
                            <td>{parseFloat(d.lent).toFixed(2)}</td>
                            <td>{parseFloat(d.borrow).toFixed(2)}</td>
                            <td>{calculateTotal(d.lent, d.borrow)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}