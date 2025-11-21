import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";

import Cookies from "js-cookie";
// rmx : files  ↓
import GalleryImage from "../../../public/images/icons/Group 143724670.png";

// mrx : styles ↓
import signInStyle from "../../../styles/signIn.module.css";

// mrx : material ui ↓
import { Hidden, Button, Grid, Container, IconButton } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

// mrx : Icons ↓
import MenuIcon from "@material-ui/icons/Menu";

// mrx : components ↓
import CustomBtn from "../../../components/SignUp/CustomBtn";
import InputForm from "../../../components/Forms/InputForm";
import MobileMenu from "../../../components/common/mobilemenu";
import CodeVerification from "../../../components/SignIn/CodeVerification";

//rs : helper api call method
import { PostUrl } from "../../api/config";

//rs : url constants
import { RESEND_VERIFICATION_EMAIL, VERIFY_CODE } from "../../api";



// mrx : SignUp main page ↓
export default function VerificationSignUp() {
  // mrx : states ↓
  const router = useRouter();

  // mrx : states ↓
  const [timer, setTimer] = useState("02:00");
  const [allSeconds, setAllSeconds] = useState(120);
  const [loading, setLoading] = useState(false);
  const [verificationCode, setVerficationCode] = useState();
  const [verifyError, setVerifyError] = useState();
  // good man : active and de-Active button resend code !
  const [Access, setAccess] = useState(true);
  const GET_EMAIL_ADDRESS = typeof window !== "undefined" ? localStorage.getItem("email") || "" : "";

  useEffect(() => {
    if (!GET_EMAIL_ADDRESS) {
      router.push("/auth/signup");
    }
  }, [])

  //rs : subtraction seconds by one every second
  useEffect(() => {
    localStorage.setItem("seconds", allSeconds - 1);
    if (timer === "00:00") {
      setAccess(true);
    } else {
      setAccess(false);
    }
  }, [timer]);

  useEffect(() => {
    //logic for re routing user to signin page if user entered path by hand
    // if (router.asPath !== "/auth/signup") return router.push("/auth/signup");
    const seconds = parseInt(localStorage.getItem("seconds")) || 120;
    if (seconds === -1) seconds = 120;
    setAllSeconds(seconds);
    clearTimer(seconds);
  }, []);

  useEffect(() => {
    localStorage.setItem("seconds", allSeconds - 1);
  }, [timer]);

  //start logic for implementing timer
  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total,
      minutes,
      seconds,
    };
  };
  const startTimer = (e) => {
    let { total, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : "0" + minutes) +
        ":" +
        (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const getDeadTime = (seconds) => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + seconds);
    return deadline;
  };

  const resetTimer = () => {
    setAllSeconds(120);
    clearTimer(120);
  };

  useEffect(() => {
    if(verificationCode?.length >=5 ){
      handleVerifyEmail()
    }
  },[verificationCode])


  const clearTimer = (seconds) => {
    const e = getDeadTime(seconds);
    const id = setInterval(() => {
      setAllSeconds((second) => second - 1);
      startTimer(e);
    }, 1000);
    setTimeout(() => {
      clearInterval(id);
      setAllSeconds(0);
    }, (seconds + 1) * 1000);
  };
  //end logic for timer

  //resend verification code after resend button clicked
  const handleResendCode = () => {
    setLoading(true);
    setVerifyError(null);
    PostUrl(RESEND_VERIFICATION_EMAIL, {
      email: GET_EMAIL_ADDRESS,
    }).then((res, err) => {
      if (res && res.status === 200) {
        setLoading(false);
        if (res?.data?.isSuccess) {
          resetTimer();
          toast.success("Verification code sent again");
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        setLoading(false);
        toast.error("something went wrong !");
      }
    });
  };

  //rs : email verification api calling
  const handleVerifyEmail = () => {
    if (!verificationCode) return setVerifyError("Enter verification code");
    setLoading(true);
    PostUrl(VERIFY_CODE, {
      email: GET_EMAIL_ADDRESS,
      verifyCode: verificationCode,
    }).then((res, err) => {
      if (res && res.status === 200) {
        setLoading(false);
        if (res?.data?.isSuccess) {
          Cookies.set("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n", res?.data?.data?.jwtToke);
          setLoading(false);
          router.push("/auth/signup/step1");
        } else {
          setLoading(false);
          toast.error(res?.data?.message);
        }
      } else {
        setLoading(false);
        toast.error("something went wrong !");
      }
    });
  };

  return (
    <Grid container>
      <Grid item md={6} sm={12} xs={12} className={signInStyle.scroll}>
        <Grid container align="center" className={signInStyle.wrapperLeft}>
          <Hidden mdUp>
            <Grid item className={signInStyle.line2}></Grid>
          </Hidden>
          <Container className={signInStyle.w_90}>
            <Grid item className={signInStyle.wrapper}>
              <MobileMenu />
              <Grid item className={signInStyle.wrapper1}>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  className={signInStyle.margin__top}
                >
                  <Grid
                    item
                    className={signInStyle.signInFont}
                    xs={8}
                    md={9}
                    sm={5}
                  >
                    Verification Code
                  </Grid>
                  <Grid
                    item
                    className={`${signInStyle.line}`}
                    xs={4}
                    md={3}
                    sm={7}
                  ></Grid>
                </Grid>
                <Grid item className={signInStyle.txtSendCode}>
                  We have sent you an access code via Email for Email address
                  verifications.
                </Grid>

                <Grid
                  container
                  alignItems="center"
                  className={signInStyle.buttons_changeEmail}
                >
                  <Grid item>
                    <Button
                      variant="text"
                      color={allSeconds === 0 ? "primary" : "secondary"}
                      disabled={allSeconds > 0}
                      className={signInStyle.resendCode}
                      onClick={() => !allSeconds > 0 && handleResendCode()}
                    >
                      Resend code
                    </Button>
                  </Grid>
                </Grid>

                <Grid item className={signInStyle.p_enterCode}>
                  <Grid container direction="column" spacing={1}>
                    <Grid item className={signInStyle.fw500_fs14}>
                      Enter Code
                    </Grid>
                    <Grid item>
                      <CodeVerification
                        setCodeNumber={setVerficationCode}
                        error={verifyError}
                        setError={setVerifyError}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className={signInStyle.resendTime}>
                  {timer}
                </Grid>
                <CustomBtn
                  text="Continue"
                  variants="contained"
                  styleBtn={signInStyle.signIn1}
                  color="primary"
                  Img={null}
                  margin={false}
                  disabled={Access}
                  loading={loading}
                  onClick={() => handleVerifyEmail()}
                />
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
      <Hidden smDown>
        <Grid item md={6}>
          <Grid
            container
            className={signInStyle.pic__Gallery}
            justifyContent="center"
            direction="column-reverse"
            alignItems="flex-end"
          >
            <Image src={GalleryImage} height={"1500px"} width={"1500px"} />
          </Grid>
        </Grid>
      </Hidden>
    </Grid>
  );
}
