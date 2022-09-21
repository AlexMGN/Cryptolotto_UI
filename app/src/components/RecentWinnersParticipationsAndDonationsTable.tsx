export const RecentWinnersParticipationsAndDonationsTable = ({ data, resultTable, lotteryOrWalletName, amountHeadName }) => {
  return (
    <div className="relative overflow-x-auto shadow-md mt-14 reward-table xl:w-[50vw]" style={{ borderRadius: "20px" }}>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="uppercase bg-primary text-neutral">
        {
          (data.length <= 0) ?
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                No participations yet
              </th>
            </tr> :
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                Transaction ID
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                <div>{lotteryOrWalletName}</div>
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                <div>{amountHeadName}</div>
              </th>
              <th scope="col" className="px-6 py-3 text-center hidden md:flex md:justify-center">
                Date
              </th>
            </tr>
        }
        </thead>
        <tbody>
        { data?.map((result, i) => {
          if (i % 2 === 0) {
            return (
              resultTable(result, i, "bg-white border-b")
            )
          } else {
            return (
              resultTable(result, i, "bg-neutral border-b")
            )
          }
        })
        }
        </tbody>
      </table>
    </div>
  )
};
