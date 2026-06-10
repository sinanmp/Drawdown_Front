import { useEffect, useState } from "react";

import SummaryCard from "../components/SummaryCard";
import AccountCard from "../components/AccountCard";
import AccountModal from "../components/AccountModal";
import axios from "axios";

export default function Dashboard() {

    const [selected, setSelected] = useState(null);

    const [accounts, setAccounts] = useState([]);

    useEffect(() => {

        async function loadData() {

            try {

                const res = await axios.get(
                    "http://69.10.45.229:5000/dashboard"
                );

                setAccounts(res.data);

            } catch (err) {

                console.error(err);

            }
        }

        loadData();

    }, []);

    const totalEquity =
        accounts.reduce(
            (sum, acc) =>
                sum + acc.currentEquity,
            0
        );

    const worstFloatingDD =
        Math.max(
            ...accounts.map(
                x => x.maxFloatingDD
            )
        );

    const worstDailyDD =
        Math.max(
            ...accounts.map(
                x => x.maxDailyDDPercent
            )
        );

    return (

        <div
            className="
      min-h-screen

      bg-gradient-to-br
      from-slate-950
      via-slate-900
      to-black

      text-white
      "
        >

            <div className="max-w-7xl mx-auto px-6 py-10">

                {/* HEADER */}

                <div className="flex flex-col lg:flex-row justify-between gap-6 mb-10">

                    <div>

                        <h1 className="text-6xl font-black tracking-tight">

                            Drawdown Tracker

                        </h1>

                        <p className="text-slate-400 mt-3 text-lg">

                            Monitor floating and daily drawdowns
                            across your MT5 accounts.

                        </p>

                    </div>

                    <div
                        className="
            bg-slate-900/80
            backdrop-blur-xl

            border border-slate-800

            rounded-3xl

            px-6 py-5

            flex items-center gap-4
            "
                    >

                        <div
                            className="
              w-3 h-3
              bg-green-500
              rounded-full
              animate-pulse
              "
                        />

                        <div>

                            <p className="text-slate-400 text-sm">
                                System Status
                            </p>

                            <h3 className="text-green-400 font-bold">
                                LIVE
                            </h3>

                        </div>

                    </div>

                </div>

                {/* SUMMARY CARDS */}

                <div
                    className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4

          gap-6
          mb-10
          "
                >

                    <SummaryCard
                        title="Accounts"
                        value={accounts.length}
                    />

                    <SummaryCard
                        title="Total Equity"
                        value={`$${totalEquity.toLocaleString()}`}
                    />

                    <SummaryCard
                        title="Worst Floating DD"
                        value={`$${worstFloatingDD.toFixed(2)}`}
                    />

                    <SummaryCard
                        title="Worst Daily DD"
                        value={`${worstDailyDD.toFixed(2)}%`}
                    />
                </div>

                {/* ACCOUNTS */}

                <div className="mb-5">

                    <h2 className="text-3xl font-bold">
                        Trading Accounts
                    </h2>

                    <p className="text-slate-400 mt-2">
                        Active MT5 accounts being monitored.
                    </p>

                </div>

                <div
                    className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3

          gap-6
          "
                >

                    {accounts.map(account => (

                        <AccountCard
                            key={account.account}
                            account={account}
                            onClick={setSelected}
                        />

                    ))}

                </div>

                {/* FOOTER */}

                <div className="mt-12 text-center">

                    <p className="text-slate-500 text-sm">

                        Last Refresh: {new Date().toLocaleTimeString()}

                    </p>

                </div>

            </div>

            <AccountModal
                account={selected}
                onClose={() => setSelected(null)}
            />

        </div>

    );
}