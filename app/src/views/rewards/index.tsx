// Next, React
import { FC, useEffect, useRef, useState } from 'react';
import axios from 'axios';

import { RecentWinnersParticipationsAndDonationsTable } from "../../components/RecentWinnersParticipationsAndDonationsTable";
import {notify} from "../../utils/notifications";
import CryptolottoApi from "../../utils/Cryptolotto.utils";

export const RewardsView: FC = ({ }) => {
  const [recentWinners, setRecentWinners] = useState([]);
  const [recentDonations, setRecentDonations] = useState([]);

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

  useEffect(() => {
    const fetchLotteriesData = async () => {
      await refreshRewardAndDonationData(setRecentWinners, setRecentDonations);
    }
    fetchLotteriesData().catch((e) => {
      if (e && e.response && e.response.data && e.response.data.errors && e.response.data.errors.length > 0) {
        notify({ type: 'error', message: e.response.data.errors[0] });
      } else {
        console.log(e)
      }
    })
  }, [setRecentWinners, setRecentDonations])

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

const refreshRewardAndDonationData = async (setRecentWinners, setRecentDonations) => {
  const { data, status } = await CryptolottoApi.lottery.getLotteries()
  let recentWinners = [];
  let recentDonations = [];

  for (const lottery in data) {
    if (data[lottery].status === 'distributed') {
      recentWinners.push({
        transaction: data[lottery].distribution_transaction_id,
        lottery: data[lottery].slug,
        amount: data[lottery].amount_win,
        date: data[lottery].distribution_date
      })

      recentDonations.push({
        transaction: data[lottery].distribution_transaction_id,
        wallet: data[lottery].winner,
        amount: data[lottery].association_part,
        date: data[lottery].distribution_date,
      })
    }
  }

  recentWinners.sort(function(x, y){
    return new Date(x.timestamp) < new Date(y.timestamp) ? 1 : -1
  })

  recentDonations.sort(function(x, y){
    return new Date(x.timestamp) < new Date(y.timestamp) ? 1 : -1
  })

  setRecentWinners(recentWinners);
  setRecentDonations(recentDonations);
}
