import React, { useContext, useEffect, useState } from "react";
// import Document, { Head, Main, NextScript, meta } from 'next/document'

// mrx : material ui
// import { ThemeProvider } from "@material-ui/styles";

import LoadingSpiner from "../components/common/loadingSpiner";
import Layout from "../components/Screens/layout";

// mrx : context
import ContextProvider from "../context/index";

// mrx : context ↓
import { Context } from "../context/index";

// mrx : cookie
import Cookies from "js-cookie";

// mrx : styles
import "../styles/globals.css";

// mrx : material ui
import { Button, Grid, IconButton } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

// alert
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// gm : custom styles and theme ↓
const theme = createTheme({
  overrides: {
    MuiButton: {
      disableElevation: true,
    },
    MuiIconButton: {
      root: {
        '&:hover': {
          backgroundColor: "transparent"
        }
      },
    },
    MuiButton: {
      root: {
        '&:hover': {
          backgroundColor: "transparent"
        }
      },

    }
  },
  props: {
    MuiButton: {
      disableElevation: true,
      disableRipple: true
    },
    MuiIconButton:{
      disableRipple: true,
    },
    root: {
      borderRadius: 6,
    },
  },
  palette: {
    primary: {
      main: "#3772FF",
    },
    secondary: {
      main: "#242328",
    },
    error: {
      main: "#A6E9DE",
    },
  },
  typography: {
    button: {
      fontFamily: "Poppins",
      textTransform: "none",
    },
  },
});

function MyApp({ Component, pageProps }) {
  // mrx : context Data Start ------------------------------------------------------------------------------------
  const {
    LoadingPage,
  } = useContext(Context);
  // mrx : End ----------------------------------------------------------------------------------------------------

  // useEffect(() => {
  //   Cookies.set(
  //     "tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n",
  //     "eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwidHlwIjoiSldUIn0.F-kYZ8sRBkfnEz8pcyzMpeC4rLx6c_u9TjpnaSYttCg5eHhkfWWOyA.SBQmnbLev_r3mF_LOR7A_w.CoRv9U5ci7L1M83pEU8WfepGeLC_flhQ-DvC9KzGf8s3PquXdY1BRXB2L2yf678m3Rl03dpF46nSfP6uhC9ZG172HAQLhDkrtfRmRxB14nOb9CSWlYGUggRtzvQVyn7vqd_p07n7WC3W78TmE2-m0GhuPRW3X2oCDWhzR8rALDH6DjgVCeryPQYaorgKBPHG3MaEyLxnt6CnYxdrEfaYvM-U6Xz7YyuE240f2RvOncfnjwFyzrpSZGGTjGD_ncRVKg51iyM7sp0l89XiXIGTYOlBen5KlVAdrymW9MKfXz87cENdYmhLosQx86EGTx4-L3g28hMaA1bZJETsVlHdBgCCvpLO2aS3i-0NpolB_O3xzkA6VkTgz914tjjBwLGwyybxVobCzoQiYYAwe0XV6jqEgPBVr7s7FIvWYIZaJMtK01RKwjUbuQUV9wIsC9RhAoj_jewZeFsfF2EltBziTNHLoBo9NTH3lVyjVhgyuwouaEUajDGvaMyCo_7JeUQG2AWbYCaXg87yezh8jk8gKWaJ-KCeWxJ6n9xt9CiXY2dHmarg3yqCzp_qm5pyoGysfqQut9iLLIkLnVZ4I63HFNech34rQX1EmvMHR514Yis-XF64lCxMTYV-mVniQH8G.SX1F2CsrjSlWTIcj1MmvDQ"
  //   );
  // }, []);

  return (
    <>
      <title>Artor</title>
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <ContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <LoadingSpiner display={LoadingPage} />
        </ContextProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;

// mrx : you must enter a title in here ( not in documnet
// mrx : ContextProvider is our context ( global states )
