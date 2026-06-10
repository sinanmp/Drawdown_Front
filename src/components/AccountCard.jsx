export default function AccountCard({
    account,
    onClick,
  }) {
    return (
      <div
        onClick={() => onClick(account)}
        className="
        cursor-pointer
        relative overflow-hidden
  
        bg-slate-900/70
        backdrop-blur-xl
  
        border border-slate-800
        rounded-3xl
  
        p-6
  
        hover:border-cyan-500/50
        hover:shadow-cyan-500/10
        hover:shadow-2xl
        hover:-translate-y-1
  
        transition-all duration-300
        "
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent" />
  
        <div className="relative">
  
          <div className="flex justify-between items-start">
  
            <div>
  
              <h2 className="text-xl font-bold text-white">
                {account.accountName || "Trading Account"}
              </h2>
  
              <p className="text-slate-400 text-sm">
                #{account.account}
              </p>
  
              <p className="text-slate-500 text-xs mt-1">
                {account.broker}
              </p>
  
            </div>
  
            <div className="flex items-center gap-2">
  
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
  
              <span className="text-green-400 text-sm">
                LIVE
              </span>
  
            </div>
  
          </div>
  
          <div className="grid grid-cols-2 gap-4 mt-6">
  
            <Metric
              title="Balance"
              value={`$${account.currentBalance?.toFixed(0) || 0}`}
            />
  
            <Metric
              title="Equity"
              value={`$${account.currentEquity?.toFixed(0) || 0}`}
            />
  
            <Metric
              title="Floating DD"
              value={`$${account.currentFloatingDD?.toFixed(0) || 0}`}
              danger
            />
  
            <Metric
              title="Max DD"
              value={`$${account.maxFloatingDD?.toFixed(0) || 0}`}
              warning
            />
  
          </div>
  
          <div className="mt-6">
  
            <div className="flex justify-between mb-2">
  
              <span className="text-xs text-slate-400">
                Daily DD %
              </span>
  
              <span className="text-xs text-red-400">
                {account.maxDailyDDPercent?.toFixed(2) || 0}%
              </span>
  
            </div>
  
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
  
              <div
                className="
                h-full
                bg-gradient-to-r
                from-red-500
                to-orange-500
                "
                style={{
                  width: `${Math.min(
                    account.maxDailyDDPercent || 0,
                    100
                  )}%`
                }}
              />
  
            </div>
  
          </div>
  
          <button
            className="
            mt-6 w-full
  
            bg-cyan-500/10
            text-cyan-400
  
            border border-cyan-500/20
  
            py-3 rounded-xl
  
            hover:bg-cyan-500/20
            transition-all
            "
          >
            View Details
          </button>
  
        </div>
      </div>
    );
  }
  
  function Metric({
    title,
    value,
    danger,
    warning
  }) {
  
    return (
      <div
        className="
        bg-slate-950/50
        rounded-2xl
        p-4
        border border-slate-800
        "
      >
        <p className="text-slate-500 text-xs">
          {title}
        </p>
  
        <h3
          className={`
          text-xl font-bold mt-2
  
          ${
            danger
              ? "text-red-400"
              : warning
              ? "text-orange-400"
              : "text-white"
          }
          `}
        >
          {value}
        </h3>
      </div>
    );
  }