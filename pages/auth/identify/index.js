import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// rmx : files  ↓
import GoogleLogo from "../../../public/images/icons/Google.svg";
import { useRouter } from "next/router";
// rmx : files  ↓
import GalleryImage from "../../../public/images/icons/Group 143724670.png";

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
import { FORGOT_PASSWORD } from "../../api";
import Joi from "joi";
import { toast } from "react-toastify";
import { GetUrl } from "../../api/config";

//schema for validating email field
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
export default function Identify() {
  //router
  const router = useRouter();
  // mrx : states ↓
  const [email, setEmail] = useState("");
  const [validateFlag, setvalidateFlag] = useState(false);
  const [loading, setLoading] = useState(false);

  const GET_EMAIL_ADDRESS =
    typeof window !== "undefined" ? localStorage.getItem("email") || "" : "";

  //check if the user entered input field then call forget pass api
  const { error } = schema.email.validate(email);
  const handleForgotPassClick = () => {
    if (error) return setvalidateFlag(true);
    localStorage.removeItem("seconds");
    setLoading(true);
    GetUrl(FORGOT_PASSWORD + `?email=${email}`).then((res, err) => {
      if (res && res.status === 200) {
        setLoading(false);
        if (res?.data?.isSuccess) {
          localStorage.setItem("email", email);
          router.push("/auth/identify/verification");
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        setLoading(false);
        toast.error("something went wrong !");
      }
    });
  };

  useEffect(() => {
    setEmail(GET_EMAIL_ADDRESS);
  }, []);

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
              <Grid container alignItems="center">
                <Grid item xs={5}></Grid>
              </Grid>
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
                    Forgot Password{" "}
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
                    <InputForm
                      type="email"
                      placeHolder="Enter your email address"
                      label="Email"
                      value={email}
                      setValue={setEmail}
                      schema={schema.email}
                      validateFlag={validateFlag}
                    />
                  </Grid>
                </Grid>
                <Grid item>
                  <CustomBtn
                    text="Continue"
                    variants="contained"
                    styleBtn={signInStyle.signIn1}
                    color="primary"
                    Img={null}
                    margin={false}
                    link="/auth/identify/verification"
                    onClick={handleForgotPassClick}
                    loading={loading}
                    disabled={error}
                  />
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
}
