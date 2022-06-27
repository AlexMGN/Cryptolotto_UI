// Next, React
import { FC, useEffect, useRef, useState } from 'react';
import axios from 'axios';

import { RecentWinnersParticipationsAndDonationsTable } from "../../components/RecentWinnersParticipationsAndDonationsTable";

export const RewardsView: FC = ({ }) => {
  const [recentWinners, setRecentWinners] = useState([
    {
      id: 0,
      transaction: "546H4G34GVV35dazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3b",
      lottery: "low",
      amount: "50000",
      date: 1655331046687
    },
    {
      id: 0,
      transaction: "546H4G34GVV35dazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3b",
      lottery: "low",
      amount: "50000",
      date: 1655331046687
    },
    {
      id: 0,
      transaction: "546H4G34GVV35dazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3b",
      lottery: "low",
      amount: "50000",
      date: 1655331046687
    },
    {
      id: 0,
      transaction: "546H4G34GVV35dazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3b",
      lottery: "whale",
      amount: "50000",
      date: 1655331046687
    },
    {
      id: 0,
      transaction: "546H4G34GVV35dazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3b",
      lottery: "degen",
      amount: "50000",
      date: 1655331046687
    },
    {
      id: 0,
      transaction: "546H4G34GVV35dazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3b",
      lottery: "low",
      amount: "50000",
      date: 1655331046687
    },
    {
      id: 0,
      transaction: "546H4G34GVV35dazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3b",
      lottery: "low",
      amount: "50000",
      date: 1655331046687
    },
    {
      id: 0,
      transaction: "546H4G34GVV35dazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3b",
      lottery: "low",
      amount: "50000",
      date: 1655331046687
    },
  ]);
  const [recentDonations, setRecentDonations] = useState([
    {
      id: 0,
      transaction: "546H4G34GVV35dazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3b",
      wallet: "546H4G34GVV35dazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3b",
      amount: "50000",
      date: 1655331046687
    },
    {
      id: 0,
      transaction: "546H4G34GVV35dazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3b",
      wallet: "546H4G34GVV35dazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3b",
      amount: "50000",
      date: 1655331046687
    },
    {
      id: 0,
      transaction: "546H4G34GVV35dazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3b",
      wallet: "546H4G34GVV35dazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3b",
      amount: "50000",
      date: 1655331046687
    },
    {
      id: 0,
      transaction: "546H4G34GVV35dazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3b",
      wallet: "546H4G34GVV35dazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3b",
      amount: "50000",
      date: 1655331046687
    },
    {
      id: 0,
      transaction: "546H4G34GVV35dazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3b",
      wallet: "546H4G34GVV35dazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3b",
      amount: "50000",
      date: 1655331046687
    },
    {
      id: 0,
      transaction: "546H4G34GVV35dazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3b",
      wallet: "546H4G34GVV35dazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3b",
      amount: "50000",
      date: 1655331046687
    },
    {
      id: 0,
      transaction: "546H4G34GVV35dazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3b",
      wallet: "546H4G34GVV35dazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3b",
      amount: "50000",
      date: 1655331046687
    },
    {
      id: 0,
      transaction: "546H4G34GVV35dazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3b",
      wallet: "546H4G34GVV35dazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3bdazddadadzadazdBYB3b",
      amount: "50000",
      date: 1655331046687
    },
  ]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const walletAndTransactionReducer = (string, reducer) => {
    return string.slice(0, reducer)  + '...' + string.slice(-reducer)
  }

  const resultTable = (data, i, tailwindClass) => {
    return (
      <tr key={i} className={tailwindClass}>
        <th scope="row" className="p-0 md:px-6 md:py-4 font-medium text-info whitespace-nowrap text-center">
          <u>
            <a
              href={"https://explorer.solana.com/tx/" + data.transaction}
              target="_blank">
              {walletAndTransactionReducer(data.transaction, 5)}
            </a>
          </u>
        </th>
        <td className="p-0 md:px-6 md:py-4 text-center">
          { (data.lottery) &&
            capitalizeFirstLetter(data.lottery)
          }
          { (data.wallet) &&
            walletAndTransactionReducer(data.wallet, 4)
          }
        </td>
        <td className="px-6 py-4 text-center">
          {data.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} USDC
        </td>
        <td className="px-6 py-4 text-center hidden md:flex md:justify-center">
          {new Date(data.date).toUTCString()}
        </td>
      </tr>
    )
  }

 /* useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        console.log(res)
        setTest(res.data);
      })
  }, [setTest])

  console.log(test)*/

  return (
    <div className="mx-auto p-4">
      <div className="flex flex-col mt-10 md:mt-24 items-center">
        <div className="w-full items-center text-center flex flex-col">
          <h1 className="text-center text-4xl md:text-6xl font-bold text-primary">
            Recent winners<span style={{ color: "#F50009", fontSize: "1em" }}>.</span>
          </h1>

          <RecentWinnersParticipationsAndDonationsTable data={recentWinners} resultTable={resultTable} lotteryOrWalletName={"Lottery"} amountHeadName={"Amount win"} />
        </div>

        <div className="w-full items-center text-center flex flex-col">
          <h2 className="text-center text-4xl md:text-6xl font-bold text-primary mt-24">
            Recent donations<span style={{ color: "#F50009", fontSize: "1em" }}>.</span>
          </h2>

          <RecentWinnersParticipationsAndDonationsTable data={recentDonations} resultTable={resultTable} lotteryOrWalletName={"Wallet"} amountHeadName={"Amount donated"} />
        </div>
      </div>
    </div>
  );
};
