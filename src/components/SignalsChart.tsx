import { FC, useMemo } from "react";
import { useAppContext } from "../context/globalContext";
import { AssetType, LogType, SignalsType, Ticker } from "../types/d";
const TICKER_SYMBOLS: Ticker[] = ["btcusd", "ethbtc", "ethusd"];

const Cell: FC<{ symbol: Ticker; signal: SignalsType }> = ({ symbol, signal }) => (
  <div className="cell" style={cellStyle(symbol, signal)}></div>
);

const SignalsRow: FC<{ log: LogType }> = ({ log }) => {
  return (
    <div className="row" style={{ display: "flex", width: "100%" }}>
      {TICKER_SYMBOLS.map((symbol, idx) => (
        <Cell key={idx} symbol={symbol} signal={getSignal(symbol, log)} />
      ))}
    </div>
  );
};

const SignalsHeader: FC = () => {
  return (
    <div className="row" style={{ display: "flex", width: "100%" }}>
      {TICKER_SYMBOLS.map((symbol, idx) => (
        <p
          key={idx}
          style={{
            fontWeight: "bold",
            position: "relative",
            transform: "rotate(-45deg)",
            width: "30px",
          }}
        >
          {symbol}
        </p>
      ))}
    </div>
  );
};

type SignalsPropType = {
  signalsLimit?: number;
};

export const SignalsChart: FC<SignalsPropType> = ({ signalsLimit = 500 }) => {
  const { logs: rawLogs } = useAppContext();

  if (!rawLogs?.length) return null;

  const logs = useMemo(() => {
    // get the last signalsLimit of the logs
    const signals = rawLogs.slice(rawLogs.length - signalsLimit);
    // sort from most recent to oldest
    const signalsRecentSort = [...signals].reverse();

    return signalsRecentSort;
  }, [rawLogs]);

  const signals = useMemo(() => {
    const labels: Ticker[] = ["btcusd", "ethbtc", "ethusd"];

    return {
      labels,
      values: logs.map((log) =>
        labels.map((label) => convertSignalToNumber(getSignal(label, log).daily)),
      ),
    };
  }, [logs]);

  const csvData = useMemo(() => {
    return `
    ${signals.labels.join(",")}\n
    ${signals.values.map((row) => row.join(",")).join("\n")}
      `;
  }, [signals]);

  console.log({ csvData });
  if (!csvData) return null;

  return (
    <div>
      <pre>{csvData}</pre>
      {/* <Line
        data={csvData}
        y='btcusd'
        y2='ethbtc'
        y3='ethbtc'
        // colorVar='continent'
        // highlightLabel='country'
        highlight='red'
        fillWeight={2}
        roughness={4}
        width='500'
        height='300'
        legend={false}
        strokeWidth={3}
        circle={false}
      /> */}
    </div>
  );
};

function getSignal(symbol: Ticker, log: LogType): SignalsType {
  return ((log as any)[symbol] as AssetType).signals;
}

function cellStyle(symbol: Ticker, signal: SignalsType): React.CSSProperties {
  return {
    backgroundColor: calcSignalColor(signal),
    height: "10px",
    width: "30px",
    border: "1px solid white",
  };
}

function calcSignalColor(signal: SignalsType): string {
  switch (signal?.daily) {
    case "strong buy":
      return "darkgreen";
    case "buy":
      return "green";
    case "sell":
      return "red";
    case "strong sell":
      return "darkred";
    case "neutral":
      return "lightgrey";
    default:
      return "transparent";
  }
}

function convertSignalToNumber(signal: string): number {
  switch (signal) {
    case "strong buy":
      return 2;
    case "buy":
      return 1;
    case "neutral":
      return 0;
    case "sell":
      return -1;
    case "strong sell":
      return -1;
    default:
      return 0;
  }
}
