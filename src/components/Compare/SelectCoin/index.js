import { MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import SelectDays from "../../Coin/SelectDays";
import "./styles.css";

function SelectCoin({
  allCoins,
  crypto1,
  crypto2,
  days,
  handleCoinChange,
  handleDaysChange,
}) {
  const selectStyle = {
    height: "2.5rem",
    color: "var(--white)",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--white)",
    },
    "& .MuiSvgIcon-root": {
      color: "var(--white)",
    },
    "&:hover": {
      "&& fieldset": {
        borderColor: "#3a80e9",
      },
    },
  };

  return (
    <div className="select-flex">
      <p>Crypto 1</p>
      <Select
        className="select-coin"
        value={crypto1}
        onChange={(e) => handleCoinChange(e, true)}
        sx={selectStyle}
      >
        {allCoins
          .filter((coin) => coin.id != crypto2)
          .map((coin, index) => (
            <MenuItem key={index} value={coin.id}>
              {coin.name}
            </MenuItem>
          ))}
      </Select>

      <p>Crypto 2</p>
      <Select
        className="select-coin"
        value={crypto2}
        onChange={(e) => handleCoinChange(e, false)}
        sx={selectStyle}
      >
        {allCoins
          .filter((coin) => coin.id != crypto1)
          .map((coin, index) => (
            <MenuItem key={index} value={coin.id}>
              {coin.name}
            </MenuItem>
          ))}
      </Select>

      <SelectDays
        days={days}
        handleDaysChange={(e) => handleDaysChange(e)}
        noPTag={true}
      />
    </div>
  );
}

export default SelectCoin;