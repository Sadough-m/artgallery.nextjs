import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

// mrx : files  ↓
import GalleryImage from "../../public/images/icons/Group 143724670.png";
import GoogleLogo from "../../public/images/icons/Google.svg";

// mrx : styles ↓
import signInStyle from "../../styles/signIn.module.css";

// mrx : material ui ↓
import { Hidden, Button, Grid, Container, IconButton } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import Cookies from "js-cookie";

// mrx : Icons ↓

// mrx : components ↓
import CustomBtn from "../../components/SignUp/CustomBtn";
import InputForm from "../../components/Forms/InputForm";
import MobileMenu from "../../components/common/mobilemenu";
import PasswordInput from "../../components/Forms/passwordInput";

//rs : api getter
import { PutAuthUrl } from "../../pages/api/config";

//rs : api url
import { CHANGE_USER_PASSWORD } from "../../pages/api";

// mrx : SignUp main page ↓
export default function NewPassword() {
  const router = useRouter();

  // mrx : states ↓
  const [password, setPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();
  const [validateFlag, setValidateFlag] = useState(false);
  const [loading, setLoading] = useState(false);

  //rs : verify new password -> call api
  const handleSetNewPassword = () => {
    if (!password || !repeatPassword) {
      toast.warning("pelase enter password")
    } else if (repeatPassword !== password) {
      toast.warning("passwords do not match");
    } else {
      setLoading(true);
      PutAuthUrl(CHANGE_USER_PASSWORD, {
        password: password,
      }).then((res, err) => {
        if (res && res.status === 200) {
          setLoading(false);
          if (res?.data?.isSuccess) {
            router.push("/user");
            toast.success("password updated");
          } else {
            toast.error(res?.data?.message);
          }
        } else {
          setLoading(false);
          toast.error("something went wrong !");
        }
      });
    }
  };

  useEffect(() => {
    if (!Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n")) {
      router.push("/");
    }
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
                    Change password{" "}
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
}
