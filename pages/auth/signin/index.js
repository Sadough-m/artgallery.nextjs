import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// mrx : material ui ↓
import { Hidden, Button, Grid, Container, IconButton } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

// rmx : files  ↓
import GoogleLogo from "../../../public/images/icons/Google.svg";
import GalleryImage from "../../../public/images/icons/Group 143724670.png";

// mrx : styles ↓

import signInStyle from "../../../styles/signIn.module.css";
import styles from "../../../styles/Home.module.css";

// mrx : Icons ↓
import MenuIcon from "@material-ui/icons/Menu";
import { Style } from "@material-ui/icons";

// mrx : components ↓
import InputForm from "../../../components/Forms/InputForm";
import MobileMenu from "../../../components/common/mobilemenu";
import CustomCheckBox from "../../../components/Forms/CustomCheckBox";
import CustomBtn from "../../../components/SignIn/CustomBtn";
import PasswordInput from "../../../components/Forms/passwordInput";

// mrx : Api functions ↓
import { PostUrl } from "./../../api/config";

//mrx: Api Urls
import {
  CLIENT_ID,
  GET_USER_DETAIL,
  SIGNIN_EXTERNAL_ACCOUNT,
} from "./../../api/index";

//mrx: Dependecies
import Joi from "joi";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { GoogleLogin } from "react-google-login";
import { refreshTokenSetup } from "../../../utils/refreshToken";



//all page schemas for inputForm(s)
const schema = {
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      "string.empty": `Email is required`,
      "string.email": `Enter a vaild email`,
      "string.base": `Email is required`,
    }),
  password: Joi.string().required(),
};

// mrx : Sign in index  page ↓
export default function SignIn() {
  const router = useRouter();
  // mrx : states ↓
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validateFlag, setvalidateFlag] = useState(false);
  const [validateEmailFlag, setvalidateEmailFlag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [rememberCheckBox, setRememberCheckBox] = useState(false);
  const [CallGoogle, setCallGoogle] = useState(false);

  //validate inputs before calling api
  const validateInputFileds = () => {
    const options = { abortEarly: false };
    const { error } = Joi.object(schema).validate({ email, password }, options);
    if (!error) return null;
    return error;
  };

  //check if ther is no schema validation error = > call api
  const error = validateInputFileds();

  const handleSignInClick = () => {
    if (error) {
      return setvalidateFlag(true);
    } else {
      signIn();
    }
  };

  // call api for login
  const signIn = () => {
    setLoading(true);
    PostUrl(GET_USER_DETAIL, {
      email,
      password,
    }).then((res, err) => {
      if (res && res.status === 200) {
        setLoading(false);
        if (res?.data?.isSuccess) {
          Cookies.set("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n", res?.data?.data?.jwtToken, {
            expires: rememberCheckBox ? 365 : 60,
          });
          router.push("/dashboard");
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        setLoading(false);
        toast.error("something went wrong !");
      }
    });
  };

  // rs : on google successfully call api
  const onSuccess = (res) => {
    if (CallGoogle === true) {
      // console.log(res);
      // res.profileObj;
      setGoogleLoading(true);
      PostUrl(SIGNIN_EXTERNAL_ACCOUNT, {
        email: res.profileObj.email,
        provider: "google",
      }).then((res, err) => {
        if (res && res.status === 200) {
          setGoogleLoading(false);
          if (res?.data?.isSuccess) {
            Cookies.set(
              "tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n",
              res?.data?.data?.s_Model?.jwtToken,
              {
                expires: rememberCheckBox ? 365 : 60,
              }
            );
            router.push("/dashboard");
          } else {
            toast.error(res?.data?.message);
          }
        } else {
          setGoogleLoading(false);
          toast.error("something went wrong !");
        }
      });
      refreshTokenSetup(res);
    }
  };

  //on google signin failure
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
        <Grid container className={signInStyle.fullHeight}>
          <Grid item md={6} sm={12} xs={12} className={signInStyle.scroll}>
            <Grid container justifyContent="center" align="center">
              <Hidden mdUp>
                <Grid item className={signInStyle.line2}></Grid>
              </Hidden>
              <Container>
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
                        Sign in
                      </Grid>
                      <Grid
                        item
                        className={`${signInStyle.line}`}
                        xs={8}
                        md={8}
                        sm={9}
                      ></Grid>
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
                          setValue={(e) => setEmail(e)}
                          validateFlag={validateFlag || validateEmailFlag}
                        />
                      </Grid>
                      <Grid item>
                        <PasswordInput
                          name="password"
                          placeHolder="Enter your Password"
                          label="Password"
                          value={password}
                          setValue={setPassword}
                          validateFlag={validateFlag}
                        />
                      </Grid>
                    </Grid>
                    <Button
                      variant="text"
                      color="primary"
                      className={`${signInStyle.some__Margin} ${signInStyle.margil_left}`}
                    >
                      <Link href="/auth/identify">Forgot Password?</Link>
                    </Button>
                    <Grid item className={signInStyle.checkBox}>
                      {/* <Check_Box label='Remember Me' /> */}
                      <CustomCheckBox
                        label="Remember Me"
                        checked={rememberCheckBox}
                        setChecked={setRememberCheckBox}
                      />
                    </Grid>
                    <CustomBtn
                      text="Sign in"
                      variants="contained"
                      styleBtn={signInStyle.signIn}
                      color="primary"
                      Img={null}
                      margin={false}
                      onClick={handleSignInClick}
                      loading={loading}
                      disabled={error}
                    />
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
                      autoLoad={false}
                      onAutoLoadFinished={() => setCallGoogle(true)}
                      render={renderProps => (
                        <CustomBtn
                          text="Sign In With Google"
                          variants="outlined"
                          styleBtn={signInStyle.SignInGoogle}
                          Img={GoogleLogo}
                          margin={false}
                          onClick={renderProps.onClick}
                          loading={googleLoading}
                        />
                      )}
                    />

                    <Grid className={signInStyle.havent__account} item>
                      You don’t have an account?
                      <Link href="/auth/signup/">
                        <Button
                          variant="text"
                          color="primary"
                          className={Style.text__trs__none}
                        >
                          <span className={styles.text__trs__none}>Sign Up</span>
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
