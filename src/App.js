import { useEffect, useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [crypto, setCrypto] = useState([]);

  useEffect(() => {
    Axios.get(`https://openapiv1.coinstats.app/coins?limit=100&currency=USD`, {
      headers: { "X-API-KEY": "CxH3TjHKy2sWtNkEhYaRaqlZP7k15qqwAsijn0d3mMU=" },
    }).then((res) => {
      setCrypto(res.data.result);
    });
  }, []);

  return (
    <div className="App">
      <h1>All Cryptocurrencies</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <table>
        <thead>
          <tr>
            <td>Rank</td>
            <td>Name</td>
            <td>Symbol</td>
            <td>Market Cap</td>
            <td>Price</td>
            <td>Available Supply</td>
            <td>Volume(24hrs)</td>
          </tr>
        </thead>
        <tbody>
          {crypto
            .filter((val) => {
              return val.name.toLowerCase().includes(search.toLowerCase());
            })
            .map((val, id) => {
              return (
                <>
                  <tr id={id}>
                    <td className="rank">{val.rank}</td>
                    <td className="logo">
                      <a href={val.websiteUrl}>
                        <img src={val.icon} alt="logo" width="30px" />
                      </a>

                      <p>{val.name}</p>
                    </td>
                    <td className="symbol">{val.symbol}</td>
                    <td>₹{val.marketCap}</td>
                    <td>₹{val.price.toFixed(2)}</td>
                    <td>{val.availableSupply}</td>
                    <td>{val.volume.toFixed(0)}</td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
