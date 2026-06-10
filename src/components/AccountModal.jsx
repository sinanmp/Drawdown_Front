
import { useState, useEffect } from "react";
import axios from "axios";

export default function AccountModal({
  account,
  onClose,
}) {
 const [history, setHistory] = useState([]);
 const [loadingHistory, setLoadingHistory] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  

  useEffect(() => {

    if (!account) return;
  
    async function loadHistory() {
  
      try {
  
        setLoadingHistory(true);
  
        const res = await axios.get(
          `https://drawdownapi.greenbonds.biz/history/${account.account}`
        );
  
        setHistory(res.data);
  
      } catch (err) {
  
        console.error(err);
  
      } finally {
  
        setLoadingHistory(false);
  
      }
  
    }
  
    loadHistory();
  
  }, [account]);

  if (!account) return null;

  return (
    <div
      className="
      fixed inset-0
      bg-black/80
      backdrop-blur-lg
      z-50
      p-4

      flex
      items-center
      justify-center
      "
      onClick={onClose}
    >
      <div
        className="
        bg-slate-900

        w-full
        max-w-6xl

        h-[90vh]

        rounded-3xl

        border border-slate-800

        overflow-hidden

        flex
        flex-col
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}

        <div
          className="
          bg-slate-900

          p-6

          border-b
          border-slate-800

          flex
          justify-between
          items-center
          "
        >
          <div>
            <h2 className="text-3xl font-bold text-white">
              {account.accountName || "Trading Account"}
            </h2>

            <p className="text-slate-400 mt-1">
              #{account.account}
            </p>
          </div>

          <button
            onClick={onClose}
            className="
            w-10
            h-10

            rounded-xl

            bg-slate-800

            hover:bg-slate-700

            text-white

            transition-all
            "
          >
            ✕
          </button>
        </div>

        {/* CONTENT */}

        <div className="flex-1 overflow-y-auto">
          {/* TABS */}

          <div
            className="
            sticky top-0 z-10

            bg-slate-900

            border-b
            border-slate-800

            px-6
            py-4
            "
          >
            <div className="flex gap-3">
              {["overview", "history", "analytics"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() =>
                      setActiveTab(tab)
                    }
                    className={`
                    px-4 py-2
                    rounded-xl
                    capitalize
                    transition-all

                    ${
                      activeTab === tab
                        ? "bg-cyan-500 text-black font-semibold"
                        : "bg-slate-800 text-slate-300"
                    }
                  `}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="p-6">
            {/* OVERVIEW */}

            {activeTab === "overview" && (
              <>
                <div
                  className="
                  grid

                  grid-cols-1
                  sm:grid-cols-2
                  xl:grid-cols-3

                  gap-5
                  "
                >
                  <Stat
                    title="Balance"
                    value={`$${account.currentBalance || 0}`}
                  />

                  <Stat
                    title="Equity"
                    value={`$${account.currentEquity || 0}`}
                  />

                  <Stat
                    title="Floating DD"
                    value={`$${account.currentFloatingDD || 0}`}
                    red
                  />

                  <Stat
                    title="Max Floating DD"
                    value={`$${account.maxFloatingDD || 0}`}
                    orange
                  />

                  <Stat
                    title="Daily DD $"
                    value={`$${account.maxDailyDDDollar || 0}`}
                  />

                  <Stat
                    title="Daily DD %"
                    value={`${account.maxDailyDDPercent?.toFixed(2) || 0}%`}
                  />
                </div>

                {/* ACCOUNT INFO */}

                <div className="mt-8">
                  <div
                    className="
                    bg-slate-950/50

                    border
                    border-slate-800

                    rounded-2xl

                    p-6
                    "
                  >
                    <h3
                      className="
                      text-xl
                      font-bold
                      text-white

                      mb-5
                      "
                    >
                      Account Information
                    </h3>

                    <div
                      className="
                      grid
                      md:grid-cols-2

                      gap-5
                      "
                    >
                      <Info
                        label="Account Number"
                        value={account.account}
                      />

                      <Info
                        label="Broker"
                        value={account.broker}
                      />

                      <Info
                        label="Status"
                        value="LIVE"
                      />

                      <Info
                        label="Last Update"
                        value="Just Now"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* HISTORY */}

            {activeTab === "history" && (
              <div
                className="
                overflow-x-auto

                rounded-2xl

                border
                border-slate-800
                "
              >
                <table className="w-full">
                  <thead>
                    <tr
                      className="
                      bg-slate-950

                      text-slate-400
                      "
                    >
                      <th className="p-4 text-left">
                        Date
                      </th>

                      <th className="p-4 text-left">
                        Max Float DD
                      </th>

                      <th className="p-4 text-left">
                        Daily DD $
                      </th>

                      <th className="p-4 text-left">
                        Daily DD %
                      </th>
                    </tr>
                  </thead>

                  <tbody>

  {loadingHistory && (

    <tr>
      <td
        colSpan="4"
        className="p-8 text-center text-slate-400"
      >
        Loading history...
      </td>
    </tr>

  )}

  {!loadingHistory && history.length === 0 && (

    <tr>
      <td
        colSpan="4"
        className="p-8 text-center text-slate-400"
      >
        No history available
      </td>
    </tr>

  )}

  {!loadingHistory &&
    history.map((row) => (

      <tr
        key={row._id}
        className="
        border-t
        border-slate-800

        hover:bg-slate-800/40
        "
      >

        <td className="p-4 text-white">
          {row.date}
        </td>

        <td className="p-4 text-orange-400">
          ${row.maxFloatingDD?.toFixed(2)}
        </td>

        <td className="p-4 text-white">
          ${row.maxDailyDDDollar?.toFixed(2)}
        </td>

        <td className="p-4 text-red-400">
          {row.maxDailyDDPercent?.toFixed(2)}%
        </td>

      </tr>

    ))}

</tbody>
                </table>
              </div>
            )}

            {/* ANALYTICS */}

            {activeTab === "analytics" && (
              <div
                className="
                bg-slate-950/50

                border
                border-slate-800

                rounded-2xl

                p-10

                text-center
                "
              >
                <h3 className="text-3xl font-bold text-white">
                  Analytics
                </h3>

                <p className="text-slate-400 mt-3">
                  Floating DD charts,
                  Equity Curve,
                  Daily DD history and
                  advanced analytics
                  will be displayed here.
                </p>

                <div
                  className="
                  mt-8

                  h-72

                  rounded-2xl

                  border
                  border-dashed
                  border-slate-700

                  flex
                  items-center
                  justify-center

                  text-slate-500
                  "
                >
                  Chart Area
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({
  title,
  value,
  red,
  orange,
}) {
  return (
    <div
      className="
      bg-slate-950/50

      border
      border-slate-800

      rounded-2xl

      p-5
      "
    >
      <p className="text-slate-500 text-sm">
        {title}
      </p>

      <h2
        className={`
        text-3xl
        font-bold
        mt-2

        ${
          red
            ? "text-red-400"
            : orange
            ? "text-orange-400"
            : "text-white"
        }
      `}
      >
        {value}
      </h2>
    </div>
  );
}

function Info({
  label,
  value,
}) {
  return (
    <div>
      <p className="text-slate-500 text-sm">
        {label}
      </p>

      <p className="text-white mt-1">
        {value}
      </p>
    </div>
  );
}