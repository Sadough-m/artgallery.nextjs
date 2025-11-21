import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// mrx : styles ↓
import styles from "../../../styles/Home.module.css";
import signUpStyle from "../../../styles/signUp.module.css";

// mrx : setCookies with this
import Cookies from 'js-cookie'

// rmx : files  ↓
import img1 from "../../../public/images/h1.png";
import img2 from "../../../public/images/h2.png";
import img3 from "../../../public/images/h3.png";

// mrx : material ui ↓
import { Hidden, Button, Grid, Container, IconButton } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

// mrx : components ↓
import Header from "../../../components/common/header";
import MobileMenu from "../../../components/common/mobilemenu";
import Steps from "../../../components/Screens/Landing/Steps";

// mrx : Icons ↓
import MenuIcon from "@material-ui/icons/Menu";
import NextButton from "../../../components/Screens/Landing/NextButton";
import { useRouter } from "next/router";

//rs : signup url
import { STEP3_PASSED } from "../../api";

//rs : signup post method helper
import { PostAuthUrl, GetAuthUrl } from "../../api/config";

// mrx : SignUp step 3 page ↓
export default function SignUpStep3() {
  // mrx : states ↓
  const router = useRouter();

  useEffect(() => {
    if (!Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n")) {
      router.push("/");
    }
  }, [])

  const STEP_3_PASSED = () => {
    GetAuthUrl(STEP3_PASSED).then((res, err) => {
      if (res && res.status === 200) {
        router.push("/auth/signup/step4")
      } else {
        setLoading(false);
        toast.error("something went wrong !");
      }
    });
  };

  if (Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n")) {
    return (
      <>
        {/* <Hidden smDown>
                <Header />
            </Hidden> */}
        <Hidden mdUp>
          <Grid item className={signUpStyle.line42}></Grid>
        </Hidden>

        <Container className={`${signUpStyle.m__top} ${styles.mb_100}`}>
          <Hidden mdUp>
            <MobileMenu />
          </Hidden>

          <Grid container justifyContent="center">
            <Grid item md={3} sm={12} xs={12} className={signUpStyle.mt_title}>
              <Grid container alignItems="flex-start" justifyContent="flex-start">
                <Hidden mdUp>
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Grid
                      item
                      xs={4}
                      className={`${signUpStyle.SignUp__font} ${styles.m_b25_xs} ${styles.m_t20_xs1}`}
                    >
                      <Grid item>Beta test</Grid>
                    </Grid>
                    <Hidden mdUp>
                      <Grid item xs={7} className={`${signUpStyle.line2}`}></Grid>
                    </Hidden>
                  </Grid>
                </Hidden>
              </Grid>
            </Grid>

            <Grid item md={5} sm={12} xs={12}>
              <Steps
                step={3}
                text="Step 3 of 4 - Premium account"
                link={localStorage.getItem("is-Creator") === "true" ? "/auth/signup/step2" : "/auth/signup/step1"}
              />

              <Grid item>
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  className={`${signUpStyle.Txt_Gallery_Group}`}
                  direction="column"
                >
                  <Grid item className={`${signUpStyle.txt_Welcome_gallery}`}>
                    Welcome to Artiverse premium!
                  </Grid>
                  <Grid item className={`${signUpStyle.txt1}`}>
                    You now have access to features that give your more power,
                    customization, and control
                  </Grid>
                </Grid>
                <Grid
                  container
                  justifyContent="flex-start"
                  direction="column"
                  spacing={3}
                >
                  <Grid item>
                    <Grid container alignItems="center">
                      <Grid item xs={3} md={2}>
                        <Image src={img3} />
                      </Grid>
                      <Grid item className={`${styles.fs_12}`} xs={8} md={9}>
                        Visualize candidate management.
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container alignItems="center">
                      <Grid item xs={3} md={2}>
                        <Image src={img1} />
                      </Grid>
                      <Grid item className={`${styles.fs_12}`} xs={8} md={9}>
                        Create document template to process candidate faster.
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container alignItems="center">
                      <Grid item xs={3} md={2}>
                        <Image src={img2} />
                      </Grid>
                      <Grid item className={`${styles.fs_12}`} xs={8} md={9}>
                        Share your Board or post link to accept applicants.
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    className={`${signUpStyle.Learn_moreAbout_Pr} ${styles.m_b25}`}
                  >
                    {" "}
                    Learn more about Premium
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <NextButton onClick={() => STEP_3_PASSED()} />
          </Grid>
        </Container>
      </>);
  } else {
    return <></>
  }
}
