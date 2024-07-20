import React from 'react';

export default function Payment({ friend, transactions, totalPayments }) {
  const calculateDetailedPayments = () => {
    const detailedPayments = {};
    totalPayments.forEach(payment => {
      if (payment.name !== friend) {
        detailedPayments[payment.name] = { lent: 0, borrowed: 0 };
      }
    });

    transactions.forEach(transaction => {
      if (transaction.lender === friend) {
        const totalBorrowed = transaction.borrowers.reduce((sum, b) => sum + b.amount, 0);
        transaction.borrowers.forEach(borrower => {
          const ratio = borrower.amount / totalBorrowed;
          detailedPayments[borrower.name].borrowed += transaction.amount * ratio;
        });
      } else if (transaction.borrowers.some(b => b.name === friend)) {
        const borrower = transaction.borrowers.find(b => b.name === friend);
        const ratio = borrower.amount / transaction.amount;
        detailedPayments[transaction.lender].lent += transaction.amount * ratio;
      }
    });

    return detailedPayments;
  };

  const detailedPayments = calculateDetailedPayments();

  return (
    <div>
      <h3>Detailed Payments for {friend}</h3>
      <table>
        <thead>
          <tr>
            <th>Friend</th>
            <th>Lent</th>
            <th>Borrowed</th>
            <th>Net</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(detailedPayments).map(([name, amounts]) => {
            const net = amounts.lent - amounts.borrowed;
            let netText;
            if (net > 0) {
              netText = `Owed $${net.toFixed(2)}`;
            } else if (net < 0) {
              netText = `Owe $${Math.abs(net).toFixed(2)}`;
            } else {
              netText = 'Settled';
            }
            return (
              <tr key={name}>
                <td>{name}</td>
                <td>${amounts.lent.toFixed(2)}</td>
                <td>${amounts.borrowed.toFixed(2)}</td>
                <td>{netText}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}