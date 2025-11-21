import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { uuid } from 'uuidv4';
import { Link } from "react-scroll";
import Joi from "joi";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

// mrx : api
import {
  BASE_Image_Url,
  GET_USER_INFO,
  UPDATE_EMAIL_NOTIFICATION,
  EDIT_SHIPPING_ADDRESS
} from "../../pages/api";

import { GetUrl, GetAuthUrl, PutAuthUrl, PostAuthUrl } from "../../pages/api/config";

// gm : material ui ↓
import { Hidden, Grid, Button } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import Cookies from "js-cookie";

// gm : styles ↓
import Style from "../../styles/UserSettings.module.css";

// gm : files  ↓

// gm : components ↓
import Header from "../../components/common/header";
import useWindowSize from "../../Hooks/useWindowSize";
import NavSettings from "../../components/Screens/UserSettings/NavSettings";
import InputForm from "../../components/Forms/InputForm";
import PasswordInput from "../../components/Forms/passwordInput";
import SignInGoogle from "../../components/Screens/UserSettings/SignInGoogle";
import ShippingAddress from "../../components/Forms/ShippingAddressV2";
import Locations from "../../components/Screens/UserSettings/Locations";
import EmailNotification from "../../components/Screens/UserSettings/EmailNotification";
import Menu from "../../components/Screens/UserSettings/Menu";

// gm : Artist List ↓
export default function UserSettings() {
  // gm : states ↓
  const [UserInfo, setUserInfo] = useState([]);
  const [shippingAddress, setShippingAddress] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [ListPhoneNumber, setListPhoneNumber] = useState([{}]);

  const [numberCode, setCode] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");

  // mrx : user info
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [GoogleStatus, setGoogleStatus] = useState(false);
  const [emailNotification, setEmailNotification] = useState(false);
  const [LocationList, setLocationList] = useState([]);

  // gm : recocnize the page size
  const [width, height] = useWindowSize();
  const router = useRouter();

  const GetUserInfo = () => {
    GetAuthUrl(GET_USER_INFO).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          setLoading(false);
          setShippingAddress(res.data.data?.shippingAddress);
          setUserInfo(res.data.data);
          setName(res.data.data?.firstName);
          setEmailNotification(res.data.data?.isSendEmailNotification);
          setEmail(res.data.data?.email);
          setGoogleStatus(res.data.data?.UserConnectedWith === 2 ? true : false);
          setLocationList(res.data.data?.locatin);
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
    GetUserInfo();
  }, [])

  useEffect(() => {
    updateEmailNotification()
  }, [emailNotification])

  useEffect(() => {
    setListPhoneNumber(shippingAddress?.phoneNumber);
  }, [shippingAddress]);


  useEffect(() => {
    setphoneNumber(ListPhoneNumber ? ListPhoneNumber[0]?.phoneNumber : "");
    setCode(ListPhoneNumber ? ListPhoneNumber[0]?.countryUniqCode : "");
  }, [ListPhoneNumber]);

  const updateEmailNotification = () => {
    PutAuthUrl(UPDATE_EMAIL_NOTIFICATION(emailNotification)).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          // console.log("this is test " + res.data.data?.email)
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  }

  useEffect(() => {
    if (!Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n")) {
      router.push("/");
    }
  }, []);

  const saveShipping = () => {
    PutAuthUrl(EDIT_SHIPPING_ADDRESS, {
      "name": shippingAddress?.name,
      "familly": shippingAddress?.familly,
      "address": shippingAddress?.address,
      "country": shippingAddress?.country,
      "postalCode": shippingAddress?.postalCode,
      "state": shippingAddress?.state,
      "city": shippingAddress?.city,
      "phoneNumber": shippingAddress?.phoneNumber,
      "galleryStudioAppartmentEtc": shippingAddress?.galleryStudioAppartmentEtc,
      // "objectId": shippingAddress?.name,
    }).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          // console.log("this is test " + res.data.data?.email)
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  }


  return (
    <Grid item>

      {/* NavBar Settings */}
      <NavSettings />

      <Grid
        container
        direction="row"
        justifyContent="center"
        className={Style.margin1}
      >
        {/* left side */}

        <Grid item className={Style.leftSide}>
          <Menu SelectedPage="User settings" />
        </Grid>

        {/* right side */}
        <Grid item className={Style.rightSide}>
          <Grid item className={Style.wrapper_right}>
            <Grid item className={Style.text_userSetting}>
              User settings
            </Grid>

            {/* Forms */}
            <Grid
              container
              justifyContent="space-between"
              style={{ marginTop: "5px" }}
            >
              <Grid item className={Style.TwoForm}>
                <InputForm
                  type="text"
                  label="Name"
                  placeHolder="Enter your name"
                  value={Name}
                  setValue={setName}
                  schema={Joi.string()
                    .empty({ tlds: { allow: false } })
                    .messages({
                      "string.empty": `Name is required`,
                    })
                  }
                />
              </Grid>
              <Grid item className={Style.TwoForm}>
                <InputForm
                  type="email"
                  label="Email"
                  value={Email}
                  disabled={true}
                  setValue={setEmail}
                  placeHolder="Enter your email"
                  schema={Joi.string()
                    .email({ tlds: { allow: false } })
                    .messages({
                      "string.empty": `Email is required`,
                      "string.email": `Enter a vaild email`,
                      "string.base": `Email is required`,
                    })
                  }
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="space-between">
              <Grid item className={Style.TwoForm}>
                <PasswordInput
                  routerLink="/user/changePassword"
                  value="010101001010"
                  label="Password"
                  disabled={true}
                  placeHolder="Enter your password"
                  changeButton={true}
                />
              </Grid>
              <Grid item className={Style.P_signIn}>
                {
                  GoogleStatus && (
                    <SignInGoogle
                      setGoogleStatus={setGoogleStatus}
                      UserInfo={UserInfo}
                    />
                  )
                }
              </Grid>
            </Grid>
            <Grid item className={Style.p_shiiping}>
              <ShippingAddress
                shippingAddress={shippingAddress}
                setShippingAddress={setShippingAddress}
                label="Shipping Address"
                placeHolder="Address"
                saveShipping={saveShipping}
              />
            </Grid>
            <Grid item className={Style.p_location}>
              <Locations
                LocationList={LocationList}
                setLocationList={setLocationList}
                UserInfo={UserInfo}
              />
            </Grid>
            <Grid item className={Style.p_location}>
              <EmailNotification
                UserInfo={emailNotification}
                setUserInfo={setEmailNotification}
              />
            </Grid>
            <br />
            <br />
            <br />

            {/*End Forms */}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
