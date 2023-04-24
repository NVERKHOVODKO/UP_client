import React from 'react';

const CoinTable = ({ coins }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Full name</th>
          <th>Short name</th>
          <th>Price</th>
          <th>Daily volume</th>
          <th>Daily impact</th>
          <th>Percentage price change per day</th>
        </tr>
      </thead>
      <tbody>
        {coins.map(coin => (
          <tr key={coin.id}>
            <td>{coin.fullName}</td>
            <td>{coin.shortName}</td>
            <td>{coin.price}</td>
            <td>{coin.dailyVolume}</td>
            <td>{coin.dailyImpact}</td>
            <td>{coin.percentagePriceChangePerDay}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CoinTable;