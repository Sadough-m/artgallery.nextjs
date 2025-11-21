import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";

// mrx : material ui ↓
import { Hidden, Grid } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

// mrx : styles ↓
import Style from "../../styles/Dashboard.module.css";

import Cookies from "js-cookie";

// rmx : files  ↓
import postPic1 from "../../public/images/post pic 1.png";
import postPic2 from "../../public/images/post pic2.png";
import postPic3 from "../../public/images/post pic 3.png";

// mrx : components ↓
import Header from "../../components/common/header";
import SideMenu from "../../components/Screens/Artist/SideMenu";
import useWindowSize from "../../Hooks/useWindowSize";
import WelcomeArea from "../../components/Screens/Dashboard/WelcomeArea";
import Post from "../../components/Screens/Dashboard/Post";
import WidePost from "../../components/Screens/Dashboard/WidePost";
import TodaysIncome from "../../components/Screens/Dashboard/TodaysIncome";
import Inbox from "../../components/Screens/Dashboard/Inbox";
import NotificationList from "../../components/Screens/Dashboard/NotificationList";

//rs : urls  and api helper methods
import { GetAuthUrl, GetUrl } from "../api/config";
import { COLLECTION_ARTIST, TEST_COLLECTIONS } from "../api";
import Chart from "../../components/Screens/Dashboard/Chart";


// mrx : Artist List ↓
export default function Dashboard({ isEmpty }) {
  //rs : router
  const router = useRouter();

  // mrx : states ↓
  const [dashboardOpen, setDashboardOpen] = useState(true);
  const [collections, setCollections] = useState();
  const [saved, setSaved] = useState(false);
  const [collectionItem, setCollectionItem] = useState();

  // mrx : recocnize the page size
  const [width, height] = useWindowSize();

  // mrx : functions ↓
  const DashboardHandle = () => {
    setDashboardOpen(!dashboardOpen);
  };

  //rs : call api to get test artist collections
  const getTestArtistCollections = () => {
    GetAuthUrl(TEST_COLLECTIONS).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          setCollections(res.data?.data);
          if (res.data?.data?.length < 1) {
            router.push("/collection/add");
            toast.info("You have no collection");
          }
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  };

  useEffect(() => {
    if (Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n")) {
      getTestArtistCollections();
    }
  }, [collectionItem]);

  useEffect(() => {
    if (!Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n")) {
      router.push("/");
    }
  }, []);
  
  if (isEmpty) {
    return (
      <Grid item>
        {/* <Header DashboardHandle={DashboardHandle} haveAction={true} /> */}
        <Grid container direction="row">
          {/* <SideMenu
            dashboardOpen={dashboardOpen}
            collections={collections}
            onSetCollectionItem={setCollectionItem}
            pageName="dashboard"
          /> */}

          {/* Start Dashboard */}
          <Grid item className={Style.wrapper}>
            <Grid container direction="column">
              {/* title */}
              <Grid item className={Style.title}>
                <span className={Style.badge_dot_Gr}></span> Dashboard
              </Grid>

              {/* Welcome Area */}
              {/* <WelcomeArea /> */}

              {/* Post Components */}
              {/* <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              > */}
              {/* <Post
                  img={postPic1}
                  textButton="Read Post"
                  timeRead="5 min read"
                /> */}
              {/* <Post img={postPic2} textButton="Learn More" timeRead="02:30" />
                <Post
                  img={postPic3}
                  textButton="Read Post"
                  timeRead="5 min read"
                /> */}
              {/* <Post
                  img={postPic2}
                  textButton="Explore"
                  timeRead="02:30"
                  haveImg={false}
                /> */}

              {/* Wide Post */}
              {/* <WidePost /> */}
              {/* </Grid> */}
            </Grid>
          </Grid>
          {/* End Dashboard */}
        </Grid>
      </Grid>
    );
  } else if (!isEmpty) {
    return (
      <Grid item>
        {/* <Header DashboardHandle={DashboardHandle} haveAction={true} /> */}
        <Grid container direction="row">
          {/* <SideMenu
            dashboardOpen={dashboardOpen}
            collections={collections}
            onSetCollectionItem={setCollectionItem}
            pageName="dashboard"
          /> */}

          {/* Start Dashboard */}
          <Grid item className={Style.wrapper}>
            <Grid container direction="column">
              {/* title */}
              <Grid item className={Style.title}>
                <span className={Style.badge_dot_Gr}></span> Dashboard
              </Grid>

              {/* Welcome Area */}
              {/* <WelcomeArea haveImg={false} /> */}

              {/* Information */}
              {/* <Grid
                container
                justifyContent="space-between"
                className={Style.mt_30}
              >
                <Grid item className={Style.leftSide_Dash}>
                  <TodaysIncome />
                  <NotificationList />
                  <Inbox />
                </Grid>
                <Grid item className={Style.rightSide_Dash}>
                  <Chart />
                </Grid>
              </Grid>  */}
            </Grid>
          </Grid>
          {/* End Dashboard */}
        </Grid>
      </Grid>
    );
  }
}
