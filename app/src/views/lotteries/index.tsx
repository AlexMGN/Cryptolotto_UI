import React, { FC, useEffect, useState, Fragment, useRef } from "react";
import { RecentWinnersParticipationsAndDonationsTable } from "../../components/RecentWinnersParticipationsAndDonationsTable";
import { Dialog, Transition } from '@headlessui/react'
import { notify } from "../../utils/notifications";

export const LotteriesView: FC<{lotterie: string}> = ({ lotterie }) => {
  const [recentParticipations, setRecentParticipations] = useState([
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
  const [totalParticipation, setTotalParticipation] = useState(1);
  const [userParticipation, setUserParticipation] = useState(2);
  const [amountInLottery, setAmountInLottery] = useState(43520);
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds ] =  useState(null);
  const [lotteryEnded, setLotteryEnded] = useState(false);
  const [open, setOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const cancelButtonRef = useRef(null)

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
          { (data.lottery) &&
            data.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + 'USDC'
          }
          { (data.wallet) &&
            data.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
          }
        </td>
        <td className="px-6 py-4 text-center hidden md:flex md:justify-center">
          {new Date(data.date).toUTCString()}
        </td>
      </tr>
    )
  }

  const getTimeUntil = (deadline) => {
    const test = JSON.stringify(new Date());
    const timeRemaining = Date.parse(deadline) - Date.parse(JSON.parse(test));

    if (timeRemaining <= 0) {
      setHours(0)
      setMinutes(0)
      setSeconds(0)
    } else {
      setHours(Math.floor((timeRemaining / (1000 * 60 * 60)) % 24))
      setMinutes(Math.floor((timeRemaining / 1000 / 60) % 60))
      setSeconds(Math.floor((timeRemaining / 1000) % 60))
    }

    return timeRemaining
  }

  useEffect(() => {
    // Call le timestamp création loterie
    const createLotteryTimestamp = 1656430591000;
    // Closed : 1655758860000
    const createLotteryPlusOneDay = new Date(createLotteryTimestamp).setDate(new Date(createLotteryTimestamp).getDate() + 1);

    const Timer = setInterval(() => {
      const timeRemaining = getTimeUntil(new Date(createLotteryPlusOneDay));

      if (timeRemaining <= 0){
        setLotteryEnded(true);
        clearInterval(Timer);
      }
    }, 1000)
  }, [setLotteryEnded, getTimeUntil])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target

    setDepositAmount(parseInt(value));
  }

  const deposit = async () => {
    if (isNaN(depositAmount)) {
      notify({ type: 'error', message: 'Participation should be a number' });
      return
    }

    setLoading(true);
    // Envoi à l'API
    setTimeout(() => {
      setOpen(false);
      setLoading(false);
      notify({ type: 'success', message: `Participation of ${
          (lotterie === "low") ? (depositAmount ? depositAmount : 0):
            (lotterie === "medium") ? (depositAmount ? depositAmount * 2 : 0):
              (lotterie === "degen") ? (depositAmount ? depositAmount * 5 : 0):
                (lotterie === "whale") ? (depositAmount ? depositAmount * 10 : 0): "ERROR"
      } USDC entered!`, txid: '1' })
    }, 2000)
  }

  return (
    <div className="mx-auto">
      <div className="flex flex-col mt-10 md:mt-24 items-center">
        <div className="w-full items-center text-center flex flex-col">
          <h1 className="text-center text-4xl md:text-6xl font-bold text-primary">
            { capitalizeFirstLetter(lotterie) }<span style={{ color: "#F50009", fontSize: "1em" }}>.</span>
          </h1>

          <div className="hidden md:inline relative overflow-x-auto shadow-md mt-14 reward-table md:w-[80vw] xl:w-[50vw]" style={{ borderRadius: "20px" }}>
            <table className="w-full text-sm text-left">
              <thead className="uppercase bg-primary text-neutral">
              <tr className="flex flex-row w-full items-center justify-evenly pt-12 z-O">
                <th className="text-center text-4xl md:text-5xl font-bold">
                  <u>
                    { (lotterie === "low") && "1$ USDC" }
                    { (lotterie === "medium") && "2$ USDC" }
                    { (lotterie === "degen") && "5$ USDC" }
                    { (lotterie === "whale") && "10$ USDC" }
                  </u>
                </th>
              </tr>
              <tr className="flex flex-row w-full items-center justify-evenly">
                <th className="flex flex-col w-[48.5%] pl-12">
                  <div className="text-center">
                    {
                      (minutes === 0 && seconds === 0 && hours === 0) ? '' : "Random draw in"
                    }
                  </div>
                  <div>
                    {
                      (minutes === null && seconds === null && hours === null)
                        ? <p className="text-center text-sm md:text-3xl font-bold mt-5">Searching lottery...</p> : (minutes === 0 && seconds === 0 && hours === 0)
                          ? <p className="text-center text-sm md:text-3xl font-bold mt-5">Closed</p>
                          : <p className="text-center text-sm md:text-5xl xl:text-6xl font-bold mt-5"> {hours > 0 ? hours + ':' : ''}{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
                    }
                    </div>
                </th>
                <th className="flex flex-col w-[3%]">
                  <div className="text-center flex flex-col items-center">
                    <div style={{ borderLeft: "1px solid #F5FEF9", height: "250px", marginTop: "28px", marginBottom: "28px" }}> </div>
                  </div>
                </th>
                <th className="flex flex-col w-[48.5%] pr-12">
                  <div>
                    <div className="text-center">
                      Total in this lottery
                    </div>
                    <h1 className="text-center text-sm md:text-5xl xl:text-6xl font-bold mt-5">
                      {amountInLottery.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}$
                    </h1>
                  </div>
                </th>
              </tr>
              <tr className="flex flex-row w-full items-center justify-evenly pb-12">
                <th className="text-center flex flex-col items-center">
                  <button
                    className="btn btn-ghost deposit-button mb-3"
                    disabled={!!(lotteryEnded)}
                    onClick={() => setOpen(true)}>Deposit</button>
                  <u><a href="#participations" className="cursor-pointer">{(totalParticipation < 2) ? totalParticipation + " participation" : totalParticipation + " participations"}</a></u>
                </th>
              </tr>
              </thead>
            </table>
          </div>
          <div className="hidden md:inline relative overflow-x-auto shadow-md mt-14 reward-table md:w-[80vw] xl:w-[50vw]" style={{ borderRadius: "20px" }}>
            <table className="w-full text-sm text-left">
              <thead className="uppercase bg-primary text-neutral">
              <tr className="flex flex-row w-full items-center justify-evenly">
                <th className="flex flex-row w-[100%]">
                  <div className="flex items-center justify-evenly w-full flex flex-col">
                    Your participations: <p className="text-5xl mt-2">{userParticipation}</p>
                  </div>
                </th>
                <th className="flex flex-col w-[3%]">
                  <div className="text-center flex flex-col items-center">
                    <div style={{ borderLeft: "1px solid #F5FEF9", height: "50px", marginTop: "28px", marginBottom: "28px" }}> </div>
                  </div>
                </th>
                <th className="flex flex-row w-[100%]">
                  <div className="flex items-center justify-evenly w-full flex flex-col">
                    Your chances to win: <p className="text-5xl mt-2">{calculateChanceToWin(userParticipation, totalParticipation)}%</p>
                  </div>
                </th>
              </tr>
              </thead>
            </table>
          </div>

          <div className="md:hidden">
            <div className="flex mt-14 reward-table-mobile mb-10 overflow-x-auto" style={{ borderRadius: "20px" }}>
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="uppercase bg-primary text-neutral">
                <tr className="flex flex-row w-full items-center justify-evenly pt-10">
                  <th className="text-center text-4xl md:text-5xl font-bold">
                    <u>
                      { (lotterie === "low") && "1$ USDC" }
                      { (lotterie === "medium") && "2$ USDC" }
                      { (lotterie === "degen") && "5$ USDC" }
                      { (lotterie === "whale") && "10$ USDC" }
                    </u>
                  </th>
                </tr>
                <tr className="flex flex-col w-full items-center justify-evenly">
                  <th className="flex flex-col w-[48.5%] mt-8">
                    <div className="text-center">
                      {
                        (minutes === 0 && seconds === 0 && hours === 0) ? '' : "Random draw in"
                      }
                    </div>
                    <div>
                      {
                        (minutes === null && seconds === null && hours === null)
                          ? <p className="text-center text-xl font-bold mt-5">Searching lottery...</p> : (minutes === 0 && seconds === 0 && hours === 0)
                            ? <p className="text-center text-3xl font-bold mt-5">Closed </p>
                            : <p className="text-center text-3xl font-bold mt-5"> {hours > 0 ? hours + ':' : ''}{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
                      }
                    </div>
                  </th>
                  <th className="flex flex-col w-[3%]">
                    <div className="text-center flex flex-col items-center">
                      <div style={{ borderTop: "1px solid #F5FEF9", width: "250px", marginTop: "28px", marginBottom: "28px" }}> </div>
                    </div>
                  </th>
                  <th className="flex flex-col w-[48.5%]">
                    <div className="mb-12">
                      <div className="text-center">
                        Total in this lottery
                      </div>
                      <h2 className="text-center text-3xl font-bold mt-5">
                        {amountInLottery.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}$
                      </h2>
                    </div>
                  </th>
                </tr>
                </thead>
              </table>
            </div>
            <div className="flex flex-row w-full items-center justify-evenly mt-8">
              <div className="text-center flex flex-col items-center">
                <button
                  className="btn btn_sm btn-ghost wallet-button mb-3"
                  disabled={!!(lotteryEnded)}
                  onClick={() => setOpen(true)}>Deposit</button>
                <u className="text-primary"><a href="#participations" className="text-primary">{(totalParticipation < 2) ? totalParticipation + " participation" : totalParticipation + " participations"}</a></u>
              </div>
            </div>
          </div>
          <div className="md:hidden relative overflow-x-auto shadow-md mt-14 reward-table md:w-[80vw] xl:w-[50vw]" style={{ borderRadius: "20px" }}>
            <table className="w-full text-sm text-left">
              <thead className="uppercase bg-primary text-neutral">
              <tr className="flex flex-col w-full items-center justify-evenly">
                <th className="flex flex-row w-[100%]">
                  <div className="flex flex-col items-center justify-evenly w-full mt-5">
                    Your participations: <p className="text-5xl mt-2">{userParticipation}</p>
                  </div>
                </th>
                <th className="flex flex-col w-[3%]">
                  <div className="text-center flex flex-col items-center">
                    <div style={{ borderTop: "1px solid #F5FEF9", width: "250px", marginTop: "28px", marginBottom: "28px" }}> </div>
                  </div>
                </th>
                <th className="flex flex-row w-[100%]">
                  <div className="flex flex-col items-center justify-evenly w-full mb-5">
                    Your chances to win: <p className="text-5xl mt-2">{calculateChanceToWin(userParticipation, totalParticipation)}%</p>
                  </div>
                </th>
              </tr>
              </thead>
            </table>
          </div>
        </div>

        <div id="participations" className="w-full items-center text-center flex flex-col">
          <h2 className="text-center text-4xl md:text-6xl md:pl-12 font-bold text-primary mt-24">
            Last participations<span style={{ color: "#F50009", fontSize: "1em" }}>.</span>
          </h2>

          <RecentWinnersParticipationsAndDonationsTable data={recentParticipations} resultTable={resultTable} lotteryOrWalletName={"Wallet"} amountHeadName={"Participations"} />
        </div>

        {open ? (
          // Faire un fichier modal et envoyer le nombre de participations pour calculer les % de chance de gagner
          // % de chance de gagner en fonction des données dans l'input du modal
          // L'input placer un handle change sur un state
          // Changer la valeur du bouton par ce state
          <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
              <div className="fixed inset-0 bg-neutral bg-opacity-75 transition-opacity" />

              <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">

                  <Dialog.Panel
                    className="relative bg-primary rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-xl sm:w-full"
                  >
                      <div className="bg-primary px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div>
                          <div className="mt-3 text-center sm:mt-0 sm:text-left">
                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-neutral text-center">
                              { (lotterie === "low") && "One participation is 1 USDC" }
                              { (lotterie === "medium") && "One participation is 2 USDC" }
                              { (lotterie === "degen") && "One participation is 5 USDC" }
                              { (lotterie === "whale") && "One participation is 10 USDC" }
                            </Dialog.Title>
                            <div style={{ borderTop: "1px solid white", width: "100%", marginTop: "28px", marginBottom: "28px" }}> </div>
                            <div className="mt-2">
                              <form className="flex flex-col">
                                <div className="flex flex-row flex-none w-full">
                                  <div className="w-full pl-16 pr-16">
                                    <div className="flex flex-col justify-center mt-2">
                                      <label className="text-neutral font-semibold">
                                        Enter your participation
                                      </label>
                                      <input
                                        className="appearance-none border rounded w-full py-2 px-3 text-primary focus:border-transparent focus:shadow-none focus:outline-neutral focus:ring-transparent"
                                        type="number"
                                        placeholder="200"
                                        onChange={handleChange}
                                        value={ depositAmount }
                                        name="name"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </form>
                              <div className="mt-6 pl-16 pr-16 text-center">
                                <p className="text-xl text-neutral flex flex-col md:flex-row items-center justify-evenly">
                                  Your chance to win: &nbsp;<span className="text-5xl">
                                  { calculateChanceToWin(depositAmount, totalParticipation) }%
                                </span>
                                </p>
                              </div>
                            </div>

                            <div className="w-full text-center mt-8 mb-8">
                              { !loading &&
                                <button
                                  type="button"
                                  className="btn btn-ghost deposit-button"
                                  onClick={() => deposit()}
                                  ref={cancelButtonRef}
                                >
                                  Participation:&nbsp;
                                  {
                                    (lotterie === "low") ? (depositAmount ? depositAmount : 0) + " USDC" :
                                      (lotterie === "medium") ? (depositAmount ? depositAmount * 2 : 0) + " USDC" :
                                        (lotterie === "degen") ? (depositAmount ? depositAmount * 5 : 0) + " USDC" :
                                          (lotterie === "whale") ? (depositAmount ? depositAmount * 10 : 0) + " USDC" : "ERROR"
                                  }
                                </button>
                              }
                              { loading &&
                                <button
                                    type="button"
                                    className="btn btn-ghost loading-button"
                                >
                                  <svg role="status"
                                       className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-neutral fill-primary"
                                       viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path
                                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                          fill="currentColor"/>
                                      <path
                                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                          fill="currentFill"/>
                                  </svg>
                              </button>
                              }
                            </div>

                          </div>
                        </div>
                      </div>
                    </Dialog.Panel>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        ) : null}
      </div>
    </div>
  );
};


const calculateChanceToWin = (amount, participation) => {
  if (parseInt(amount) > 0 && participation > 0) {
    return ((parseInt(amount) * 100 / participation) / (participation + parseInt(amount))).toPrecision(4).replace(/\.0+$/,'')
  }

  return 0
}
