import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Link } from "react-scroll";
import { RouterToast } from "../../../Screens/sideMenuRouters";

// gm : material ui ↓
import { Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/UserSettings.module.css";

// mrx : context ↓
import { Context } from "../../../../context/index";

// gm : files ↓
import MetaMaskPng from "../../../../public/images/metamask.png";

function isMobileDevice() {
  if (typeof window !== "undefined") {
    return 'ontouchstart' in window || 'onmsgesturechange' in window;
  }
}

async function connect(onConnected) {
  if (!window.ethereum) {
    toast.info(`Install metamask extention first`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
    location.hash("https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en")
    return;
  }

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  onConnected(accounts[0]);
}

async function checkIfWalletIsConnected(onConnected, St) {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length > 0) {
      const account = accounts[0];
      onConnected(account);
      return;
    } else {
      if (St === true) {
        toast.warning("MetaMask is not connected");
        toast.info("if you want mint your artwork your metamask must be connected");
      }
    }

    if (isMobileDevice()) {
      await connect(onConnected);
    }
  }
}


export default function MetaMaskAuth({ onAddressChanged }) {
  const router = useRouter();
  const [connected, setconnected] = useState(false);
  const [ShowToast, setShowToast] = useState(false);
  // genetal state Start -----------------------------------------------------------------------------------------------
  // mrx : context
  const {
    setUserAddress,
    userAddress,
  } = useContext(Context);
  //  End -------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (
      RouterToast?.filter((item) => item?.router === router.pathname)?.length >= 1
    ) {
      checkIfWalletIsConnected(setUserAddress, false)
    } else {
      checkIfWalletIsConnected(setUserAddress, true)
    }
  }, [router.pathname]);

  // useEffect(() => {
  //   checkIfWalletIsConnected(setUserAddress);
  // }, []);

  return userAddress ? (
    <Grid item className={Style.connectBox_mR10}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item className={Style.textConnect}><span className={Style.GreenBadge}></span>Connected to MetaMask</Grid>
        <Grid item>
          <img src={MetaMaskPng.src} className={Style.fitStripImg} />
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <Connect setUserAddress={setUserAddress} />
  );
}


function Connect({ setUserAddress }) {
  if (isMobileDevice()) {
    const dappUrl = "metamask-auth.ilamanov.repl.co"; // TODO enter your dapp URL. For example: https://uniswap.exchange. (don't enter the "https://")
    const metamaskAppDeepLink = "https://metamask.app.link/dapp/" + dappUrl;
    return (
      <Grid onClick={() => connect(setUserAddress)} item className={Style.connectBox_mR10}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item className={Style.textConnect}>Connect to  MetaMask</Grid>
          <Grid item>
            <img src={MetaMaskPng.src} className={Style.fitStripImg} />
          </Grid>
        </Grid>
      </Grid>
    );
  }


  return (
    <Grid onClick={() => connect(setUserAddress)} item className={Style.connectBox_mR10}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item className={Style.textConnect}>Connect to  MetaMask</Grid>
        <Grid item>
          <img src={MetaMaskPng.src} className={Style.fitStripImg} />
        </Grid>
      </Grid>
    </Grid>
  );
}