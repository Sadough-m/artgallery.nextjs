import React, { useState, useEffect } from "react";
import Image from "next/image";
import Joi from "joi";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Contacts.module.css";

// gm : files ↓
import circleIcon from "../../../../public/images/icons/Plus - Circle.svg";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

// gm : components ↓
import InputForm from "../../../Forms/InputForm";
import CustomSelect from "../../../Forms/CustomSelect";
import PhoneNumber from "../../../Forms/PhoneNumber";
import CustomCheckBox from "../../../Forms/CustomCheckBox";

const GET_EMAIL_ST = typeof window !== "undefined" ? localStorage.getItem("Adding-Artist-HaveEmail") : "";

export default function General({
  email,
  HaveEmailFromSearch,
  setEmail,
  CheckRequired,
  setCheckRequired,
  SelectInputData,
  setAddToEmailList,
  AddToEmailList,
  phoneNumber,
  setPhoneNumber2,
  setPhoneNumber,
  Code,
  phoneNumber2,
  Code2,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  KnownAs,
  setKnownAs,
  haveTwoNumber,
  sethaveTwoNumber,
  setCode2,
  setCode,
  Title,
  setTitle,
}) {
  // gm : states ↓

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

  // mrx : reset number 2
  const removeNumber2 = () => {
    sethaveTwoNumber(false);
    setPhoneNumber2("");
    setCode2("");
  }

  return (
    <Grid item className={Style.wrapper_main}>
      <Grid item className={Style.title_main}>
        General
      </Grid>

      {/* forms */}
      <Grid container justifyContent="space-between">
        <Grid item className={Style.TwoInput}>
          <InputForm
            disabled={HaveEmailFromSearch}
            type="email"
            placeHolder="Enter email address"
            label="Email address"
            schema={schema.email}
            value={email}
            setValue={setEmail}
            validateFlag={CheckRequired}
          />
        </Grid>
        <Grid item className={Style.TwoInput}>
          <InputForm
            placeHolder="Enter contact title"
            label="Title"
            schema={schema.title}
            value={Title}
            setValue={setTitle}
            validateFlag={CheckRequired}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="space-between">
        <Grid item className={Style.TwoInput}>
          <InputForm
            placeHolder="Enter first name"
            label="First name"
            schema={schema.firstName}
            value={firstName}
            setValue={setFirstName}
            validateFlag={CheckRequired}
          />
        </Grid>
        <Grid item className={Style.TwoInput}>
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

      <CustomSelect
        label="Known as"
        bgColor="#F7F8FA"
        Data={SelectInputData?.knownAs}
        setValue={setKnownAs}
        Value={KnownAs}
        SelectName={SelectInputData?.knownAs?.filter((item) => item?.id === KnownAs)?.map((item) => item?.name)}
        setSelectName={setKnownAs}
        placeHolder="Choose an option"
      // validateFlag={CheckRequired}
      />

      <PhoneNumber
        Label="Phone number"
        PlaceHolder="Enter your number"
        value={phoneNumber}
        setValue={setPhoneNumber}
        setCode={setCode}
        SelectedFlag={Code}
      // validateFlag={validateFlag}
      />

      <Button
        onClick={() => { haveTwoNumber === true ? removeNumber2() : sethaveTwoNumber(true) }}
        startIcon={haveTwoNumber ? <RemoveCircleOutlineIcon /> : <AddCircleOutlineIcon />}
        variant="text"
        color="primary"
      >
        {haveTwoNumber ? "Remove" : "Add"} Number
      </Button>

      {
        haveTwoNumber === true && (
          <Grid item xs={12} className={`${Style.w_100}`}>
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

      <Grid item style={{ marginTop: "15px" }}>
        <CustomCheckBox
          label="Add to Email lists?"
          checked={AddToEmailList}
          setChecked={setAddToEmailList}
        />
      </Grid>
      <Grid item className={Style.text1}>
        You should ask your customers for permission before you subscribe them
        to your marketing emails.
      </Grid>
    </Grid>
  );
}
