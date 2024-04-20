import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/Coin/CoinInfo";
import LineChart from "../components/Coin/LineChart";
import ToggleComponents from "../components/Coin/ToggleComponent";
import SelectDays from "../components/Coin/SelectDays";
import Header from "../components/Common/Header";
import Loader from "../components/Common/Loader";
import ListComponent from "../components/Dashboard/List";
import { settingCoinObject } from "../functions/settingCoinObject";
import { getCoinData } from "../functions/getCoinData";
import { getPrices } from "../functions/getCoinPrices";
import { settingChartData } from "../functions/settingChartData";

function CoinPage() {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState(120);
  const [priceType, setPriceType] = useState("prices");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getData();
  }, [id]);

  const getData = async () => {
    setLoading(true);
    const data = await getCoinData(id);
    if (data) {
      settingCoinObject(setCoin, data); //For Coin Obj being passed in the List
      const prices = await getPrices(id, days, priceType);
      if (prices) {
        settingChartData(setChartData, prices, data);
        setLoading(false);
      }
    }
  };

  const handleDaysChange = async (event) => {
    setLoading(true);
    setDays(event.target.value);
    const prices = await getPrices(id, event.target.value, priceType);
    if (prices) {
      settingChartData(setChartData, prices, coin);
      setLoading(false);
    }
  };

  const handlePriceTypeChange = async (event) => {
    setLoading(true);
    setPriceType(event.target.value);
    const prices = await getPrices(id, days, event.target.value);
    if (prices) {
      settingChartData(setChartData, prices, coin);
    }
    setLoading(false);
  };

  return (
    <div>
      <Header />
      {loading || !coin?.id || !chartData ? (
        <Loader />
      ) : (
        <>
          <div className="grey-wrapper">
            <ListComponent coin={coin} delay={0.1} />
          </div>
          <div className="grey-wrapper">
            <SelectDays days={days} handleDaysChange={handleDaysChange} />
            <ToggleComponents
              handlePriceTypeChange={handlePriceTypeChange}
              priceType={priceType}
            />
            <LineChart chartData={chartData} priceType={priceType} />
          </div>
          <CoinInfo name={coin.name} desc={coin.desc} />
        </>
      )}
      
    </div>
  );
}

export default CoinPage;