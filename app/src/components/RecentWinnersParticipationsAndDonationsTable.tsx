export const RecentWinnersParticipationsAndDonationsTable = ({ data, resultTable, lotteryOrWalletName, amountHeadName }) => {
  return (
    <div className="relative overflow-x-auto shadow-md mt-14 reward-table xl:w-[50vw]" style={{ borderRadius: "20px" }}>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="uppercase bg-primary text-neutral">
        <tr>
          <th scope="col" className="px-6 py-3 text-center">
            Transaction ID
          </th>
          <th scope="col" className="px-6 py-3 text-center">
            {lotteryOrWalletName}
          </th>
          <th scope="col" className="px-6 py-3 text-center">
            {amountHeadName}
          </th>
          <th scope="col" className="px-6 py-3 text-center">
            Date
          </th>
        </tr>
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
        })}
        </tbody>
      </table>
    </div>
  )
};
