import React, { useState, useEffect, useContext } from "react";

// mrx : material ui ↓
import { Grid, Button } from "@material-ui/core";

// mrx : Icons ↓
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

// mrx : components ↓
import InputForm from "../../../../components/Forms/InputForm";
import PhoneNumber from "../../../../components/Forms/PhoneNumber";
import CustomSelect from "../../../../components/Forms/CustomSelect";

// mrx : styles ↓
import artsitStyle from "../../../../styles/artist.module.css";
import styles from "../../../../styles/Home.module.css";
import Joi from "joi";
import useLocalStorage from "../../../../Hooks/useLocalStorage";

// mrx : context ↓
import { Context } from "../../../../context/index";

const schema = {
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      "string.empty": `Email is required`,
      "string.email": `Enter a vaild email`,
      "string.base": `Email is required`,
    }),
  firstName: Joi.string().required().messages({
    "string.empty": `First name is required`,
    "any.required": "First name is required",
  }),
  title: Joi.string().required().messages({
    "string.empty": `Title is required`,
    "any.required": "Title is required",
  }),

  lastName: Joi.string().required().messages({
    "string.empty": `Last name is required`,
    "any.required": "Last name is required",
  }),
};

export default function Info({
  SelectInputData,
  Wrong,
  setWrong,
  EndCallInfo,
  setEndCallInfo,
  ClickedSave
}) {

  const KnownAsData = [
    {
      id: 1,
      name: "Artist"
    },
    {
      id: 2,
      name: "Gallery"
    }
  ]

  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");

  const [AllphoneNumbers1, setAllPhoneNumbers1] = useState([]);
  const [AllphoneNumbers2, setAllPhoneNumbers2] = useState([]);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [Code, setCode] = useState("");
  const [phoneNumber2, setPhoneNumber2] = useState("");
  const [Code2, setCode2] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [KnownAs, setKnownAs] = useState(0);
  const [haveTwoNumber, sethaveTwoNumber] = useState(false);

  const [CheckRequired, setCheckRequired] = useState(false);

  // mrx : context
  const { ISAllformsOK, setISAllformsOK } = useContext(Context);

  // validate from step 2
  useEffect(() => {
    if (ClickedSave === true) {
      validateEducation()
    } else {
      return
    }
  }, [Wrong])

  // validate from step 2
  const validateEducation = () => {
    // show the hint
    setCheckRequired(true);
    // mrx : if required value was not fill
    if (
      email === "" ||
      firstName === "" ||
      lastName === ""
    ) {
      // set Global state false
      setISAllformsOK(false);
    } else {
      // set Global state true
      setISAllformsOK(true);
      // hiddent the hint
      setCheckRequired(false);
      if (EndCallInfo === "true") {
        setEndCallInfo("next");
      } else {
        return
      }
    }
  }

  // step-2 education data
  const GET_Add_Artist_Info_email = typeof window !== "undefined" ? localStorage.getItem("Add-Artist-Info-email") : "";
  const GET_Add_Artist_Info_title = typeof window !== "undefined" ? localStorage.getItem("Add-Artist-Info-title") : "";
  const GET_Add_Artist_Info_firstName = typeof window !== "undefined" ? localStorage.getItem("Add-Artist-Info-firstName") : "";
  const GET_Add_Artist_Info_lastName = typeof window !== "undefined" ? localStorage.getItem("Add-Artist-Info-lastName") : "";
  const GET_Add_Artist_Info_KnownAs = typeof window !== "undefined" ? localStorage.getItem("Add-Artist-Info-KnownAs") : "";
  const GET_Add_Artist_Info_AllNumbers1 = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("Add-Artist-Info-AllNumbers1")) : [];
  const GET_Add_Artist_Info_AllNumbers2 = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("Add-Artist-Info-AllNumbers2")) : [];

  const GET_EMAIL_ST = typeof window !== "undefined" ? localStorage.getItem("Adding-Artist-HaveEmail") : false;
  const GET_ADDING_ARTIST_EMAIL = typeof window !== "undefined" ? localStorage.getItem("Adding-Artist-email") : "";
  const GET_ADDING_ARTIST_FName = typeof window !== "undefined" ? localStorage.getItem("Adding-Artist-firstName") : "";
  const GET_ADDING_ARTIST_LName = typeof window !== "undefined" ? localStorage.getItem("Adding-Artist-lastName") : "";

  // mrx : set local data for bio ↓
  // email input
  const handleSetLocal_info_Email = (e) => {
    localStorage.setItem("Add-Artist-Info-email", email);
  }

  // mrx : set local data for bio ↓
  // title input
  const handleSetLocal_info_Title = (e) => {
    localStorage.setItem("Add-Artist-Info-title", title);
  }

  // mrx : set local data for bio ↓
  // title input
  const handleSetLocal_info_firstName = (e) => {
    localStorage.setItem("Add-Artist-Info-firstName", firstName);
  }

  // mrx : set local data for bio ↓
  // title input
  const handleSetLocal_info_lastName = (e) => {
    localStorage.setItem("Add-Artist-Info-lastName", lastName);
  }

  // mrx : set local data for bio ↓
  // title input
  const handleSetLocal_info_KnownAs = (e) => {
    localStorage.setItem("Add-Artist-Info-KnownAs", KnownAs);
  }

  // mrx : set local data for bio ↓
  // title input
  const handleSetLocal_info_AllNumbers1 = (e) => {
    localStorage.setItem("Add-Artist-Info-AllNumbers1",
      JSON.stringify(
        {
          countryUniqCode: Code,
          phoneNumber: phoneNumber,
        },
        {
          countryUniqCode: Code2,
          phoneNumber: phoneNumber2,
        }

      )
    );
  }

  // mrx : set local data for bio ↓
  // title input
  const handleSetLocal_info_AllNumbers2 = (e) => {
    localStorage.setItem("Add-Artist-Info-AllNumbers2",
      JSON.stringify(
        {
          countryUniqCode: Code2,
          phoneNumber: phoneNumber2,
        }
      )
    );
  }

  // set get inputs
  useEffect(() => {
    setEmail(GET_ADDING_ARTIST_EMAIL ? GET_ADDING_ARTIST_EMAIL : GET_Add_Artist_Info_email ? GET_Add_Artist_Info_email : "");
    setTitle(GET_Add_Artist_Info_title ? GET_Add_Artist_Info_title : "");
    setFirstName(GET_ADDING_ARTIST_FName ? GET_ADDING_ARTIST_FName : GET_Add_Artist_Info_firstName ? GET_Add_Artist_Info_firstName : "");
    setLastName(GET_ADDING_ARTIST_LName ? GET_ADDING_ARTIST_LName : GET_Add_Artist_Info_lastName ? GET_Add_Artist_Info_lastName : "");
    setKnownAs(GET_Add_Artist_Info_KnownAs ? GET_Add_Artist_Info_KnownAs : "");

    setAllPhoneNumbers1(GET_Add_Artist_Info_AllNumbers1 ? GET_Add_Artist_Info_AllNumbers1 : []);
    setAllPhoneNumbers2(GET_Add_Artist_Info_AllNumbers2 ? GET_Add_Artist_Info_AllNumbers2 : []);

    setPhoneNumber(GET_Add_Artist_Info_AllNumbers1 ? GET_Add_Artist_Info_AllNumbers1?.phoneNumber : "");
    setCode(GET_Add_Artist_Info_AllNumbers1 ? GET_Add_Artist_Info_AllNumbers1?.countryUniqCode : "");

    setPhoneNumber2(GET_Add_Artist_Info_AllNumbers2 ? GET_Add_Artist_Info_AllNumbers2?.phoneNumber : "");
    setCode2(GET_Add_Artist_Info_AllNumbers2 ? GET_Add_Artist_Info_AllNumbers2?.countryUniqCode : "");

  }, [])

  // email input
  useEffect(() => {
    handleSetLocal_info_Email()
  }, [email]);

  // title input
  useEffect(() => {
    handleSetLocal_info_Title()
  }, [title]);

  // firstName input
  useEffect(() => {
    handleSetLocal_info_firstName()
  }, [firstName]);

  // lastName input
  useEffect(() => {
    handleSetLocal_info_lastName()
  }, [lastName]);

  // firstName input
  useEffect(() => {
    handleSetLocal_info_KnownAs()
  }, [KnownAs]);

  // phoneNumber 1 input
  useEffect(() => {
    handleSetLocal_info_AllNumbers1()
  }, [phoneNumber]);

  // Code 1 input
  useEffect(() => {
    handleSetLocal_info_AllNumbers1()
  }, [Code]);

  useEffect(() => {
    handleSetLocal_info_AllNumbers2()
  }, [phoneNumber2]);

  // Code 1 input
  useEffect(() => {
    handleSetLocal_info_AllNumbers2()
  }, [Code2]);

  // mrx : reset number 2
  const removeNumber2 = () => {
    sethaveTwoNumber(false);
    setPhoneNumber2("");
    setCode2("");
  }

  useEffect(() => {
    if (GET_Add_Artist_Info_AllNumbers2?.phoneNumber) {
      sethaveTwoNumber(true)
    }
  }, [])

  return (
    <Grid
      container
      alignItems="center"
      direction="column"
      className={`${artsitStyle.box}`}
    >
      <span className={artsitStyle.obj_for_id} id="Info & Bio"></span>

      <Grid item className={`${artsitStyle.title}`}>
        Info
      </Grid>

      <Grid item className={`${styles.w_100}`}>
        <Grid container className={`${styles.TwoForm}`}>
          <Grid item className={`${styles.TwoInput}`}>
            <InputForm
              disabled={GET_EMAIL_ST}
              type="email"
              placeHolder="Enter email address"
              label="Email address"
              schema={schema.email}
              value={email}
              setValue={setEmail}
              validateFlag={CheckRequired}
            />
          </Grid>
          <Grid item className={`${styles.TwoInput}`}>
            <InputForm
              placeHolder="Enter contact title"
              label="Title"
              schema={schema.title}
              value={title}
              setValue={setTitle}
            // validateFlag={CheckRequired}
            />
          </Grid>
        </Grid>
        <Grid container className={`${styles.TwoForm}`}>
          <Grid item className={`${styles.TwoInput}`}>
            <InputForm
              placeHolder="Enter first name"
              label="First name"
              schema={schema.firstName}
              value={firstName}
              setValue={setFirstName}
              validateFlag={CheckRequired}
            />
          </Grid>
          <Grid item className={`${styles.TwoInput}`}>
            <InputForm
              placeHolder="Enter last name"
              label="Last name"
              schema={schema.lastName}
              value={lastName}
              setValue={setLastName}
              validateFlag={CheckRequired}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className={`${styles.w_100}`}>
        <CustomSelect
          label="Known as"
          bgColor="#F7F8FA"
          Data={KnownAsData}
          setValue={setKnownAs}
          Value={KnownAs}
          SelectName={GET_Add_Artist_Info_KnownAs === "1" ? "Artist" : GET_Add_Artist_Info_KnownAs === "2" ? "Gallery" : ""}
          setSelectName={setKnownAs}
          placeHolder="Choose an option"
        // validateFlag={CheckRequired}
        />
      </Grid>
      <Grid item xs={12} className={`${styles.w_100}`}>
        <PhoneNumber
          Label="Phone number"
          PlaceHolder="Enter your number"
          value={phoneNumber}
          setValue={setPhoneNumber}
          setCode={setCode}
          SelectedFlag={Code}
        // validateFlag={validateFlag}
        />
      </Grid>

      <Grid item className={`${styles.w_100}`}>
        <Button
          onClick={() => { haveTwoNumber === true ? removeNumber2() : sethaveTwoNumber(true) }}
          startIcon={haveTwoNumber ? <RemoveCircleOutlineIcon /> : <AddCircleOutlineIcon />}
          variant="text"
          color="primary"
        >
          {haveTwoNumber ? "Remove" : "Add"} Number
        </Button>
      </Grid>

      {
        haveTwoNumber === true && (
          <Grid item xs={12} className={`${styles.w_100}`}>
            <PhoneNumber
              Label="Phone number"
              PlaceHolder="Enter your number"
              value={phoneNumber2}
              setValue={setPhoneNumber2}
              setCode={setCode2}
              SelectedFlag={Code2}
            // validateFlag={validateFlag}
            />
          </Grid>
        )
      }
    </Grid>
  );
}
