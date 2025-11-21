import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Joi from "joi";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
//rs : save local state
import { useLocalStorage } from "../../../Hooks/useLocalStorage";
// rmx : files  ↓
import ArrowLeft from "../../../public/images/icons/Arrow left -.svg";

// mrx : styles ↓
import signInStyle from "../../../styles/signIn.module.css";
import styles from "../../../styles/Home.module.css";
import signUpStyle from "../../../styles/signUp.module.css";

// mrx : material ui ↓
import { Hidden, Button, Grid, Container, IconButton } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

import useWindowSize from "../../../Hooks/useWindowSize";
import Cookies from "js-cookie";

// mrx : components ↓
import InputForm from "../../../components/Forms/InputForm";
import Header from "../../../components/common/header";
import CustomCheckBox from "../../../components/Forms/CustomCheckBox";
import EditAddress from "../../../components/Modals/EditAddress";
import MobileMenu from "../../../components/common/mobilemenu";
import Steps from "../../../components/Screens/Landing/Steps";

// mrx : Icons ↓
import MenuIcon from "@material-ui/icons/Menu";
import ShippingAddress from "../../../components/Forms/ShippingAddress";
import ShippingAddressMobile from "../../../components/Forms/ShippingAddressMobile";
import PasswordInput from "../../../components/Forms/passwordInput";
import NextButton from "../../../components/Screens/Landing/NextButton";
//rs : signup url
import { SIGNUP_STEP1, GET_USER_STEP_1 } from "../../api";
//rs : signup post method helper
import { PostAuthUrl, GetAuthUrl } from "../../api/config";

//rs : joi schema for input validation
const schema = {
  firstName: Joi.string().required().messages({
    "string.empty": `First name is required`,
  }),
  lastName: Joi.string().required().messages({
    "string.empty": `Last name is required`,
  }),
  password: Joi.string()
    .required()
    .pattern(new RegExp("^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z]).{8,}"))
    .messages({
      "string.empty": `password is required`,
    }),
};

// mrx : SignUp step 1 page ↓
export default function SignUpStep1() {
  // mrx : Detect Page Size ----------------------------------------------------------------------------------------------------
  const [width, height] = useWindowSize();
  // End -----------------------------------------------------------------------------------------------------------------------

  const GET_EMAIL_ADDRESS =
    typeof window !== "undefined" ? localStorage.getItem("email") || "" : "";

  const router = useRouter();
  // mrx : states ↓
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [password, setPassword] = useState("");
  const [shippingAddress, setshippingAddress] = useState([]);
  const [imCreator, setimCreator] = useState(false);
  const [validateFlag, setValidateFlag] = useState();
  const [loading, setLoading] = useState();
  const [stepNumber, setstepNumber] = useState(false);

  const GET_STEP_1_USER_DETAIL = () => {
    GetAuthUrl(GET_USER_STEP_1).then((res, err) => {
      if (res && res.status === 200) {
        setfirstName(res?.data?.data?.firstName);
        setlastName(res?.data?.data?.lastName);
        setimCreator(res?.data?.data?.isCreator);
        setshippingAddress([res?.data?.data?.shippingAddress]);
      } else {
        setLoading(false);
        toast.error("something went wrong !");
      }
    });
  };

  //rs : call step 1 api
  const handleSignUpStep1 = () => {
    const regMatch = (value) => /^[a-zA-Z]*$/.test(value.replace(/\s/g, ''));
    const { error } = Joi.object(schema).validate({
      firstName,
      lastName,
      password,
    });
    if (error) {
      return setValidateFlag(true);
    } else if (regMatch(firstName) === false) {
      toast.error("You can only enter alphabets for your name");
    } else if (regMatch(lastName) === false) {
      toast.error("You can only enter alphabets for your last name");
    } else if (!shippingAddress[0]?.address) {
      toast.warning("pelase enter address from Shipping address");
    } else {
      PostAuthUrl(SIGNUP_STEP1, {
        email: GET_EMAIL_ADDRESS,
        firstName: firstName,
        lastName: lastName,
        password: password,
        shippingAddress: shippingAddress[0],
        imCreator: imCreator,
      }).then((res, err) => {
        if (res && res.status === 200) {
          setLoading(false);
          if (res?.data?.isSuccess) {
            if (res?.data?.data?.isCreator === false) {
              router.push("/auth/signup/step2");
            } else {
              router.push("/auth/signup/step3");
            }
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
    } else {
      GET_STEP_1_USER_DETAIL();
    }
  }, []);

  useEffect(() => {
    setstepNumber(!stepNumber);
    localStorage.setItem("is-Creator", imCreator);
  }, [imCreator]);

  useEffect(() => {
    localStorage.setItem("is-Creator", !imCreator);
  }, [imCreator]);

  return (
    <>
      {/* <Hidden smDown>
        <Header />
      </Hidden> */}
      <Hidden mdUp>
        <Grid item className={signUpStyle.line42}></Grid>
      </Hidden>
      <Container className={`${signUpStyle.m__top}  ${styles.mb_100}`}>
        <Hidden mdUp>
          <MobileMenu />
        </Hidden>
        <Grid container justifyContent="center">
          <Grid item md={3} sm={12} xs={12} className={signUpStyle.mt_title}>
            <Grid container alignItems="center">
              <Hidden smDown>
                <Grid item>
                  <Link href="/auth/signup">
                    <IconButton
                      size="small"
                      className={`${signUpStyle.ArrowLeft}`}
                    >
                      <Image src={ArrowLeft} alt="" />
                    </IconButton>
                  </Link>
                </Grid>
              </Hidden>

              <Grid
                item
                xs={4}
                className={`${signUpStyle.SignUp__font} ${styles.m_b25_xs} ${styles.m_t20_xs1}`}
              >
                Sign up
              </Grid>

              <Hidden mdUp>
                <Grid item xs={7} className={`${signUpStyle.line2}`}></Grid>
              </Hidden>
            </Grid>
          </Grid>
          <Grid item md={5} sm={12}>
            <Steps isCreator={stepNumber ? false : true} step={1} text={`Step 1 of ${stepNumber ? 4 : 3} - Personal information`} />

            <Grid container justifyContent="space-between" alignItems="center">
              <Grid container className={`${styles.TwoForm}`}>
                <Grid item className={`${styles.TwoInput}`}>
                  <InputForm
                    placeHolder="Enter your first name"
                    label="First name"
                    name="fName"
                    value={firstName}
                    setValue={setfirstName}
                    schema={schema.firstName}
                    validateFlag={validateFlag}
                  />
                </Grid>
                <Grid item className={`${styles.TwoInput}`}>
                  <InputForm
                    placeHolder="Enter your last name"
                    label="Last name"
                    name="last Name"
                    value={lastName}
                    setValue={setlastName}
                    schema={schema.lastName}
                    validateFlag={validateFlag}
                  />
                </Grid>
              </Grid>
              <Grid item sm={12} xs={12}>
                <PasswordInput
                  name="password"
                  placeHolder="Enter the Password"
                  label="Password"
                  value={password}
                  setValue={setPassword}
                  mode="signup"
                  validateFlag={validateFlag}
                  schema={schema.password}
                />
              </Grid>
              <Grid
                item
                sm={12}
                xs={12}
                className={signUpStyle.P_shippingAddress}
              >
                {
                  width > 960 ? (
                    <ShippingAddress
                      shippingAddress={shippingAddress}
                      label="Shipping address"
                      setValue={setshippingAddress}
                      validateFlag={validateFlag}
                    />
                  ) : (
                    <ShippingAddressMobile
                      shippingAddress={shippingAddress}
                      label="Shipping address"
                      setValue={setshippingAddress}
                      validateFlag={validateFlag}
                    />
                  )
                }


              </Grid>
              <Grid item xs={12}>
                <CustomCheckBox
                  label="I’m Creator"
                  setChecked={() => setimCreator(!imCreator)}
                  checked={imCreator ? false : true}
                />
              </Grid>
            </Grid>
          </Grid>

          <NextButton onClick={handleSignUpStep1} loading={loading} />
        </Grid>
      </Container>
    </>
  );
}
