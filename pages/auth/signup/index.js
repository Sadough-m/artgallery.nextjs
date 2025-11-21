import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Joi from "joi";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
//rs : google refresher token
import { refreshTokenSetup } from "../../../utils/refreshToken";
import { GoogleLogin } from "react-google-login";
//rs : save states on localstorage
import { useLocalStorage } from "../../../Hooks/useLocalStorage";

// rmx : files  ↓
import GalleryImage from "../../../public/images/icons/Group 143724670.png";
import GoogleLogo from "../../../public/images/icons/Google.svg";

// mrx : styles ↓
import signInStyle from "../../../styles/signIn.module.css";
import styles from "../../../styles/Home.module.css";

// mrx : material ui ↓
import { Hidden, Button, Grid, Container, IconButton } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

// mrx : Icons ↓

// mrx : components ↓
import CustomBtn from "../../../components/SignUp/CustomBtn";
import InputForm from "../../../components/Forms/InputForm";

import MobileMenu from "../../../components/common/mobilemenu";

//rs : api ulr constants
import {
  SEND_REGISTRATION_EMAIL,
  CLIENT_ID,
  SIGNUP_WITH_GOOGLE,
} from "../../api";

import Cookies from "js-cookie";

//rs : api getters and setters
import { GetUrl, PostUrl } from "../../api/config";

const schema = {
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      "string.empty": `Email is required`,
      "string.email": `Enter a vaild email`,
      "string.base": `Email is required`,
    }),
};



// mrx : SignUp main page ↓
export default function SignUp() {
  const router = useRouter();
  // mrx : states ↓
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setGoogleLoading] = useState(false);
  const [validateFlag, setvalidateFlag] = useState(false);
  const [CallGoogle, setCallGoogle] = useState(false);

  //obvious : handle signing up through google ! complete comment! why should we comment these clear things?
  const { error } = schema.email.validate(email);

  const handleSignUp = () => {
    // router.push("/auth/signup/verification", { as: "/auth/signup" });
    if (error) {
      return setvalidateFlag(true);
    } else {
      localStorage.removeItem("seconds");
      setLoading(true);
      GetUrl(SEND_REGISTRATION_EMAIL + `/${email}`).then((res, err) => {
        if (res && res.status === 200) {
          setLoading(false);
          if (res?.data?.isSuccess) {
            if (res?.data?.isSuccess) {
              localStorage.setItem("email", email);
              router.push("/auth/signup/verification", { as: "/auth/signup" });
            } else {
              toast.error(res?.data?.message);
            }
          } else {
            setLoading(false);
            toast.error(res?.data?.message);
          }
        }
      });
    }
  };

  //rs : called on successfully signed up with google
  const onSuccess = (res) => {
    if (CallGoogle === true) {
      localStorage.setItem(
        "firstName",
        JSON.stringify(res.profileObj?.givenName)
      );
      localStorage.setItem(
        "lastName",
        JSON.stringify(res.profileObj?.familyName)
      );
      localStorage.setItem("email", JSON.stringify(res.profileObj?.email));
      localStorage.removeItem("seconds");
      setGoogleLoading(true);
      PostUrl(SIGNUP_WITH_GOOGLE, {
        email: res.profileObj.email,
        provider: "google",
      }).then((res, err) => {
        if (res && res.status === 200) {
          setGoogleLoading(false);
          if (res?.data?.isSuccess) {
            // console.log(res.data.data);
            Cookies.set(
              "tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n",
              res?.data?.data?.token
            );
            router.push("/auth/signup/step1");
          } else {
            toast.error(res?.data?.message);
          }
        } else {
          setGoogleLoading(false);
          toast.error(res?.data?.message);
        }
      });
      refreshTokenSetup(res);
    }
  };

  // rs : on google signup failed
  const onFailure = (res) => {
    if (CallGoogle === true) {
      // console.log(res);
      toast(`Auto authorization failed`);
    }
  };

  useEffect(() => {
    if (Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n")) {
      router.push("/dashboard");
    }
  }, [])

  if (!Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n")) {
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
                        xs={4}
                        md={4}
                        sm={3}
                      >
                        Sign up{" "}
                      </Grid>
                      <Grid
                        item
                        className={`${signInStyle.line}`}
                        xs={8}
                        md={8}
                        sm={9}
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
                        <InputForm
                          name="email"
                          type="email"
                          placeHolder="Enter your email address"
                          label="Email"
                          schema={schema.email}
                          value={email}
                          setValue={setEmail}
                          validateFlag={validateFlag}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      justifyContent="space-between"
                      className={signInStyle.line1__P}
                      alignItems="center"
                    >
                      <Grid item className={signInStyle.line1}></Grid>
                      <Grid item>
                        <Grid className={signInStyle.or}>Or</Grid>
                      </Grid>
                      <Grid item className={signInStyle.line1}></Grid>
                    </Grid>
                    <GoogleLogin
                      clientId="371745629926-p8ter69lh68hv75dqtancqlb3o0c8dhb.apps.googleusercontent.com"
                      buttonText="Login"
                      onSuccess={onSuccess}
                      onAutoLoadFinished={() => setCallGoogle(true)}
                      onFailure={onFailure}
                      autoLoad={false}
                      render={renderProps => (
                        <CustomBtn
                          text="Sign up with Google"
                          variants="outlined"
                          styleBtn={signInStyle.SignInGoogle}
                          Img={GoogleLogo}
                          margin={true}
                          loading={loadingGoogle}
                          onClick={renderProps.onClick}
                        />
                      )}
                    />

                    <CustomBtn
                      text="Sign up"
                      variants="contained"
                      styleBtn={signInStyle.signIn2}
                      color="primary"
                      Img={null}
                      margin={false}
                      loading={loading}
                      onClick={handleSignUp}
                      disabled={error}
                    />

                    <Grid className={signInStyle.havent__account1} item>
                      You have an account?
                      <Link href="/auth/signin/">
                        <Button
                          variant="text"
                          color="primary"
                          className={styles.text__trs__none}
                        >
                          Sign in
                        </Button>
                      </Link>
                    </Grid>
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
    return <></>
  }
}
