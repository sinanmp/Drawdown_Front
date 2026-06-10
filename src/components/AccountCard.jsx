export default function AccountCard({
    account,
    onClick,
  }) {
  
    const money = (v) =>
      Number(v || 0).toLocaleString();
  
    return (
      <div
        onClick={() => onClick(account)}
        className="
        cursor-pointer
  
        bg-slate-900
        border border-slate-800
  
        rounded-2xl
  
        p-4
  
        active:scale-95
        transition-all
        "
      >
  
        <div className="flex justify-between">
  
          <div className="min-w-0">
  
            <h2
              className="
              text-white
              font-semibold
              truncate
              "
            >
              {account.accountName || "Trading Account"}
            </h2>
  
            <p className="text-xs text-slate-400">
              #{account.account}
            </p>
  
            <p
              className="
              text-xs
              text-slate-500
              truncate
              "
            >
              {account.broker}
            </p>
  
          </div>
  
          <div
            className="
            flex items-center gap-2
            "
          >
            <div className="w-2 h-2 bg-green-500 rounded-full" />
  
            <span className="text-xs text-green-400">
              LIVE
            </span>
          </div>
  
        </div>
  
        <div
          className="
          grid
          grid-cols-3
          gap-2
          mt-4
          "
        >
  
          <MiniStat
            title="Bal"
            value={`$${money(account.currentBalance)}`}
          />
  
          <MiniStat
            title="Eq"
            value={`$${money(account.currentEquity)}`}
          />
  
          <MiniStat
            title="DD"
            value={`$${money(account.maxFloatingDD)}`}
            danger
          />
  
        </div>
  
      </div>
    );
  }
  
  function MiniStat({
    title,
    value,
    danger,
  }) {
    return (
      <div
        className="
        bg-slate-950
        rounded-xl
        p-2
        "
      >
        <p className="text-[10px] text-slate-500">
          {title}
        </p>
  
        <p
          className={`
          text-xs
          font-semibold
          truncate
  
          ${
            danger
              ? "text-red-400"
              : "text-white"
          }
          `}
        >
          {value}
        </p>
      </div>
    );
  }