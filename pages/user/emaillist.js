import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { uuid } from "uuidv4";
import { Link } from "react-scroll";
import Joi from "joi";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

// mrx : api
import {
  BASE_Image_Url,
  GET_USER_INFO,
  UPDATE_EMAIL_NOTIFICATION,
  EDIT_SHIPPING_ADDRESS,
  GET_USER_EMAIL_LIST
} from "../../pages/api";

import {
  GetUrl,
  GetAuthUrl,
  PutAuthUrl,
  PostAuthUrl,
} from "../../pages/api/config";

// gm : material ui ↓
import { Hidden, Grid, Button } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import Cookies from "js-cookie";

// gm : styles ↓
import Style from "../../styles/UserSettings.module.css";

// gm : files  ↓

// gm : components ↓
import Header from "../../components/common/header";
import NavSettings from "../../components/Screens/UserSettings/NavSettings";
import Menu from "../../components/Screens/UserSettings/Menu";
import EmailList from "../../components/Screens/UserSettings/EmailList";
import Emails from "../../components/Screens/UserSettings/Emails";

// gm : Artist List ↓
export default function EmailLists() {
  const router = useRouter();
  // gm : states ↓
  //A A : states 
  //for get and save user email list
  const [UEmailList, setUEmailList] = useState([]);
  const [SelectedEmailID, setSelectedEmailID] = useState("");
  const [SelectedEmailData, setSelectedEmailData] = useState([]);

  //for handle changing selected email list
  const ChangeSelectedEmailList = (id) => {
    // console.log('selected email id',id)
    setSelectedEmailID(id);
  }

  useEffect(() => {
    if (SelectedEmailID) {
      setSelectedEmailData(UEmailList?.filter((item) => item?.id === SelectedEmailID))
    }
  }, [SelectedEmailID]);

  //for getting user email list for first time page loaded
  const GetUserEmaiList = () => {
    //setLoading(true);
    //setFirst(true);
    GetAuthUrl(GET_USER_EMAIL_LIST).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          //setLoading(false);
          setUEmailList(res?.data?.data);
          setSelectedEmailID('')
          setSelectedEmailID(SelectedEmailID)
          //setFirst(false);
        } else {
          toast.error(res?.data?.message);
          // setLoading(false);
        }
      } else {
        toast.error("something went wrong !");
        //setLoading(false);
      }
    });
  }
  //end ==================================================================================

  useEffect(() => {
    if (!Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n")) {
      router.push("/");
    }
  }, []);

  //first time
  useEffect(() => {
    GetUserEmaiList()
  }, [])
  //end

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
          <Menu SelectedPage="Email list" />
        </Grid>

        {/* right side */}
        <Grid item className={Style.rightSide}>
          <Grid item className={Style.wrapper_right}>

            <Grid item className={Style.mtn5}>
              <EmailList Data={UEmailList} ChangeSelect={ChangeSelectedEmailList} refreshEmit={GetUserEmaiList} />
            </Grid>


            <Grid item className={Style.mt25}>
              <Emails Data={SelectedEmailData} allEmailListData={UEmailList} refreshEmit={GetUserEmaiList} />
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
