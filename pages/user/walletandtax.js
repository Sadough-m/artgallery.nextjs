import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/router";
import { loadStripe } from '@stripe/stripe-js';

// gm : material ui ↓
import { Hidden, Grid, Button } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import Cookies from "js-cookie";

// gm : styles ↓
import Style from "../../styles/UserSettings.module.css";

// gm : files  ↓
import infoSvg from "../../public/images/icons/Info gray.svg";
import checkSvg from "../../public/images/icons/Check - Circle.svg";
import profileUser from "../../public/images/profile user.png";
import instagramSvg from "../../public/images/icons/instagram white.svg";
import instagramVerifiedSvg from "../../public/images/icons/instagram verified.svg";
import checkCircleGray from "../../public/images/icons/Check - Circle gray1.svg";

// gm : components ↓
import Header from "../../components/common/header";
import NavSettings from "../../components/Screens/UserSettings/NavSettings";
import CustomCheckBox from "../../components/Forms/CustomCheckBox";
import MetaMask from "../../components/Screens/UserSettings/Connect/MetaMask";
import Paypal from "../../components/Screens/UserSettings/Connect/Paypal";
import Stripe from "../../components/Screens/UserSettings/Connect/Stripe";
import Location from "../../components/Forms/Location";
import Menu from "../../components/Screens/UserSettings/Menu";
import LoadingSpiner from "../../components/common/loadingSpiner";
import VerifyBtn from "../../components/Screens/UserSettings/verifyAcountBtn";

// mrx : api links ↓
import {
  GET_COUNTRY_SELECT,
  GET_TAX_RATE_BY_COUNTRY,
  TOGGLE_PAY,
  GET_USER_INFO,
  CREATE_SESSION
} from "../../pages/api/index";

// mrx : api ↓
import { PostUrl, PostAuthUrl, PutAuthUrl, GetAuthUrl, GetUrl } from "../../pages/api/config";

// gm : Artist List ↓
export default function WalletAndTax() {
  // gm : states ↓
  const [CollectOrPay, setCollectOrPay] = useState(false)
  const [CountrySelectInputData, setCountrySelectInputData] = useState([])
  const [CheckRequired, setCheckRequired] = useState(false);

  const [countryShortCode, setcountryShortCode] = useState("");
  const [countryName, setcountryName] = useState("");
  const [cityName, setcityName] = useState("");
  const [TaxRate, setTaxRate] = useState("");
  const [Loading, setLoading] = useState(true);
  const [AllData, setAllData] = useState([]);
  const [IsUserVerifyIden, setIsUserVerifyIden] = useState(true);

  const GetUserInfo = () => {
    GetAuthUrl(GET_USER_INFO).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          setLoading(false);
          setAllData(res?.data?.data);
          setIsUserVerifyIden(res.data.data?.isVerifyIdentity);
        } else {
          toast.error(res?.data?.message);
          setLoading(false);
        }
      } else {
        toast.error("something went wrong !");
        setLoading(false);
      }
    });
  }

  useEffect(() => {
    setCollectOrPay(AllData?.taxCollect?.isCollect);
    setTaxRate(AllData?.taxCollect?.taxRate);
  }, [AllData])

  useEffect(() => {
    setcityName(CountrySelectInputData?.filter((item) => item?.countryName === AllData?.taxCollect?.country)?.map((item) => item?.cityName)[0]);
    setcountryName(CountrySelectInputData?.filter((item) => item?.countryName === AllData?.taxCollect?.country)?.map((item) => item?.countryName)[0]);
  }, [CountrySelectInputData])

  useEffect(() => {
    setcityName(CountrySelectInputData?.filter((item) => item?.countryName === AllData?.taxCollect?.country)?.map((item) => item?.cityName)[0]);
    setcountryName(CountrySelectInputData?.filter((item) => item?.countryName === AllData?.taxCollect?.country)?.map((item) => item?.countryName)[0]);
  }, [AllData])

  useEffect(() => {
    GetUserInfo()
  }, [])

  // mrx : get country select inputs data
  const handleGetCountrySelectInputsData = () => {
    GetAuthUrl(GET_COUNTRY_SELECT).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          setCountrySelectInputData(res?.data?.data);
        } else {
          toast.warning(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  };

  // mrx : get country select inputs data
  const handleGetTaxRateCountry = () => {
    if (countryName?.length > 1) {
      GetAuthUrl(GET_TAX_RATE_BY_COUNTRY(countryName)).then((res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            setTaxRate(res?.data?.data?.taxRate);
          } else {
            toast.warning(res?.data?.message);
          }
        } else {
          toast.error("something went wrong !");
        }
      });
    }
  };

  // mrx : get country select inputs data
  const hanleTogglePay = () => {
    if (countryName !== "") {
      GetAuthUrl(TOGGLE_PAY(countryName)).then((res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            setCollectOrPay(res.data?.data?.taxCollect?.isCollect);
          } else {
            toast.warning(res?.data?.message);
          }
        } else {
          toast.error("something went wrong !");
        }
      });
    } else {
      toast.error("First select your country");
    }
  };

  useEffect(() => {
    handleGetCountrySelectInputsData();
  }, [])

  useEffect(() => {
    if (countryName !== "") {
      handleGetTaxRateCountry();
    }
  }, [countryName])

  useEffect(() => {
    if (!Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n")) {
      router.push("/");
    }
  }, []);

  return (
    <Grid item>

      {/* NavBar Settings */}
      <NavSettings haveSaveChange={false} />

      <Grid
        container
        direction="row"
        justifyContent="center"
        className={Style.margin2}
      >
        {/*  menu left side */}
        <Grid item className={Style.leftSide}>
          <Menu SelectedPage="Wallet & Tax" />
        </Grid>

        {/* right side */}
        <Grid item className={Style.rightSide}>
          <Grid item className={Style.wrapper_right}>
            {/* Tax */}
            <Grid item className={Style.titleWallet}>
              Tax
            </Grid>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item className={Style.form54}>
                <Location
                  label="Country / Region"
                  placeHolder="Choose one"
                  Data={CountrySelectInputData}
                  setCheckRequired={setCheckRequired}
                  validateFlag={CheckRequired}
                  // mrx : select location states
                  DefultValue={cityName ? cityName : "" + ", " + countryName ? countryName : ""}
                  cityName={cityName}
                  setcityName={setcityName}
                  setcountryName={setcountryName}
                  setcountryShortCode={setcountryShortCode}
                />
              </Grid>
              <Grid item className={Style.formLive}>
                <CustomCheckBox label="Collect or pay when making payment" setChecked={() => hanleTogglePay()} checked={CollectOrPay} />
                <Grid item style={{ marginTop: "5px" }}>
                  According yo where you live
                  <Hidden smDown>
                    <br />
                  </Hidden>{" "}
                  your taxt rate is{" "}
                  <span style={{ color: "#3772FF" }}>{TaxRate ? TaxRate + "%" : "0%"}</span>{" "}
                </Grid>
              </Grid>
            </Grid>

            {/* Connect Fiat method  */}
            <Grid item className={Style.titleWallet1}>
              <Grid item className={Style.margin3}>
                Connect Fiat method
              </Grid>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item className={Style.P_connectComponent}>
                  <Stripe />
                </Grid>
                <Grid item className={Style.text1}>
                  Or
                </Grid>
                <Grid item className={Style.P_connectComponent}>
                  <Paypal />
                </Grid>
              </Grid>
              <Grid container className={Style.bgPayment} alignItems="center">
                <Grid item>
                  <img src={infoSvg.src} className={Style.infoSvg1} />
                </Grid>
                <Grid item className="flex1">
                  For recieiving fiat payment , please connect a payment method
                </Grid>
              </Grid>
            </Grid>

            {/* Connect Walelt    */}
            <Grid item className={Style.titleWallet2}>
              <Grid item className={Style.margin3}>
                Connect Walelt
              </Grid>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item className={Style.P_connectComponent}>
                  <MetaMask />
                </Grid>
                {
                  IsUserVerifyIden === true ? (
                    <Grid item className={Style.text2}>
                      Your identity verification is handled by{" "}
                      <a className="link">Echo</a>
                    </Grid>
                  ) : (
                    <></>
                  )
                }

                {
                  IsUserVerifyIden === false ? (
                    <>
                      <Grid item className={Style.text2}>
                        To use metamask you have verify
                        <Hidden smDown>
                          <br />
                        </Hidden>{" "}
                        Your identity verification is handled by{" "}
                        <a className="link">Echo</a>
                      </Grid>
                      { }
                      <Grid item className={Style.p_buttonV}>
                        <VerifyBtn />
                      </Grid>
                    </>
                  ) : (
                    <></>
                  )
                }

              </Grid>
              {/* <Grid
                container
                className={Style.bgPayment_mb50_xs}
                alignItems="center"
              >
                <Grid item>
                  <img src={checkCircleGray.src} className={Style.infoSvg1} />
                </Grid>
                <Grid item className="flex1">
                  For storing & transfering Digital Art, please sign in to
                  metamask
                </Grid>
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <LoadingSpiner display={Loading} />
    </Grid>
  );
}
