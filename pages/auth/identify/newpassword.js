import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

// mrx : files  ↓
import GalleryImage from "../../../public/images/icons/Group 143724670.png";
import GoogleLogo from "../../../public/images/icons/Google.svg";

// mrx : styles ↓
import signInStyle from "../../../styles/signIn.module.css";

// mrx : material ui ↓
import { Hidden, Button, Grid, Container, IconButton } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

// mrx : Icons ↓

// mrx : components ↓
import CustomBtn from "../../../components/SignUp/CustomBtn";
import InputForm from "../../../components/Forms/InputForm";
import MobileMenu from "../../../components/common/mobilemenu";
import PasswordInput from "../../../components/Forms/passwordInput";

//rs : api getter
import { PostUrl } from "../../api/config";

//rs : api url
import { RESEND_PASSWORD } from "../../api";



// mrx : SignUp main page ↓
export default function NewPassword() {
  const router = useRouter();
  const GET_EMAIL_ADDRESS = typeof window !== "undefined" ? localStorage.getItem("email") || "" : "";
  const GET_EMAIL_VEERIFICATION_CODE = typeof window !== "undefined" ? localStorage.getItem("verificationCode") || "" : "";
  // mrx : states ↓
  const [password, setPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();
  const [validateFlag, setValidateFlag] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordRegex = {
    oneDigit: /(?=.*?[0-9])/,
    oneCapLetter: /(?=.*?[A-Z])/,
    oneLowLetter: /(?=.*?[a-z])/,
    eightChar: /.{8,}/,
  };
  
  const hasOneDigit = password?.match(passwordRegex.oneDigit);
  const hasOneCapLetter = password?.match(passwordRegex.oneCapLetter);
  const hasOneLowLetter = password?.match(passwordRegex.oneLowLetter);
  const hasEightChar = password?.match(passwordRegex.eightChar);


  useEffect(() => {
    if (!GET_EMAIL_VEERIFICATION_CODE) {
      router.push("/");
    }
  }, [])

  //rs : verify new password -> call api
  const handleSetNewPassword = () => {

    if (hasOneDigit && hasOneCapLetter && hasOneLowLetter && hasEightChar) {

      if (!password || !repeatPassword) {
        toast.warning("pelase enter password")
      } else if (repeatPassword !== password) {
        toast.warning("passwords do not match");
      } else {
        setLoading(true);
        if (!GET_EMAIL_VEERIFICATION_CODE) {
          router.push("/");
        } else {
          PostUrl(RESEND_PASSWORD, {
            email: GET_EMAIL_ADDRESS,
            forgetPasswordCode: GET_EMAIL_VEERIFICATION_CODE,
            newPassword: password,
          }).then((res, err) => {
            if (res && res.status === 200) {
              setLoading(false);
              if (res?.data?.isSuccess) {
                router.push("/");
                localStorage.removeItem("verificationCode");
                localStorage.removeItem("email");
              } else {
                toast.error(res?.data?.message);
              }
            } else {
              setLoading(false);
              toast.error("something went wrong !");
            }
          });
        }
      }
    } else {
      toast.error("password is not valid")
    }
  };

  if (GET_EMAIL_VEERIFICATION_CODE) {
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
                      Set new password{" "}
                    </Grid>
                    <Grid
                      item
                      className={`${signInStyle.line}`}
                      xs={4}
                      md={3}
                      sm={7}
                    >
                      {" "}
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    className={signInStyle.form__Group}
                    direction="column"
                  >
                    <Grid item>
                      <PasswordInput
                        placeHolder="Enter new password"
                        label="New Password"
                        value={password}
                        setValue={setPassword}
                        validateFlag={validateFlag}
                        newPassMode={true}
                        mode="signup"
                      />
                    </Grid>
                    <Grid item>
                      <PasswordInput
                        placeHolder="Enter new password again"
                        label="Confirm Password"
                        value={repeatPassword}
                        repeatValue={password}
                        setValue={setRepeatPassword}
                        validateFlag={validateFlag}
                        mode="repeatPass"
                      />
                    </Grid>
                  </Grid>

                  <CustomBtn
                    text="Confirm & Continue"
                    variants="contained"
                    styleBtn={signInStyle.signIn1}
                    color="primary"
                    Img={null}
                    margin={false}
                    onClick={handleSetNewPassword}
                    loading={loading}
                    disabled={!password || !repeatPassword}
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
              <Image src={GalleryImage} height={"2000px"} width={"2000px"} />
            </Grid>
          </Grid>
        </Hidden>
      </Grid>
    );
  } else {
    return <></>;
  }
}
