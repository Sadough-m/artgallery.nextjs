import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

// mrx : material ui ↓
import Grid from "@material-ui/core/Grid";
import { IconButton, Button } from "@material-ui/core";

// mrx : styles ↓
import styles from "../../styles/Home.module.css";

// mrx : files ↓
import eyeIcon from "../../public/images/icons/eye-cross_1.svg";
import eyeIconOpen from "../../public/images/icons/Color=Gray.svg";
import close from "../../public/images/icons/Close dark.svg";
import closePass from "../../public/images/icons/Close pass.svg";
import checkPass from "../../public/images/icons/Check pass.svg";
import changePassSvg from "../../public/images/icons/Change password.svg";

// mrx : components ↓

export default function PasswordInput({
  name,
  placeHolder = "Type here...",
  label = "",
  disabled = false,
  bgColor = "white",
  value,
  setValue,
  locked = false,
  validateFlag,
  routerLink,
  repeatValue,
  mode = "signin",
  changeButton = false,
}) {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [errorObj, setErrorObj] = useState(null);
  const [focus, setFocus] = useState(false);
  const inputFocus = useRef();

  useEffect(() => {
    if (validateFlag) vaildateValue(value);
  }, [validateFlag]);

  const passwordRegex = {
    oneDigit: /(?=.*?[0-9])/,
    oneCapLetter: /(?=.*?[A-Z])/,
    oneLowLetter: /(?=.*?[a-z])/,
    eightChar: /.{8,}/,
  };

  const ShowPassHandler = () => {
    setShowPass(!showPass);
  };

  const vaildateValue = (value) => {
    if (mode === "signup") {
      const hasOneDigit = value?.match(passwordRegex.oneDigit);
      const hasOneCapLetter = value?.match(passwordRegex.oneCapLetter);
      const hasOneLowLetter = value?.match(passwordRegex.oneLowLetter);
      const hasEightChar = value?.match(passwordRegex.eightChar);
      if (hasOneDigit && hasOneCapLetter && hasOneLowLetter && hasEightChar)
        setErrorObj(null);
      else
        setErrorObj({
          ...errorObj,
          hasOneDigit,
          hasOneCapLetter,
          hasOneLowLetter,
          hasEightChar,
        });
    } else if (mode === "signin") {
      if (value === "") {
        return setErrorObj({ message: "Password is required" });
      }
      setErrorObj(null);
    } else if (mode === "repeatPass") {
      if (value !== repeatValue) {
        return setErrorObj({ message: "Password confirmation does not match" });
      }
      setErrorObj(null);
    }
  };

  const handleInputChange = ({ target: input }) => {
    vaildateValue(input.value);
    setValue(input.value);
  };

  const resetText = () => {
    setValue("");
  };

  //change style of Status input like error , disabled , locked ...
  const handleStatusInput = () => {
    if (errorObj) {
      return styles.errorForm;
    } else if (disabled) {
      return styles.disabledForm;
    } else if (locked) {
      return styles.lockForm;
    } else return "";
  };

  return (
    <Grid item>
      <Grid
        item
        className={`${styles.Single__form} ${
          label === "" ? styles.Input_No_label : ""
        }`}
      >
        <label className={styles.label__input}>{label}</label>
        <Grid className={styles.InputAndEye}>
          <input
            ref={inputFocus}
            name={name}
            type={showPass ? "text" : "password"}
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
            className={`${styles.formInput} ${handleStatusInput()} ${
              changeButton ? styles.p_Left : ""
            }`}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder={placeHolder}
            disabled={disabled || locked}
            value={value}
            onChange={(e) => handleInputChange(e)}
            style={{ backgroundColor: bgColor }}
          />

          {/* Eye Icon  */}
          {!changeButton && (
            <Grid
              item
              className={styles.imageInsideForm}
              onClick={ShowPassHandler}
            >
              <Image
                src={showPass ? eyeIconOpen : eyeIcon}
                width={"20px"}
                height={"20px"}
              />
            </Grid>
          )}

          {errorObj && mode === "signup" && focus && (
            <>
              <Grid item className={styles.bg_warningPass}>
                <Grid item className={styles.desc_pass}>
                  Password must meet the following requirements :
                </Grid>
                <Grid
                  item
                  className={
                    errorObj?.hasOneDigit
                      ? styles.accept_pass_item
                      : styles.Decline_Pass_Item
                  }
                >
                  <img
                    src={errorObj?.hasOneDigit ? checkPass.src : closePass.src}
                    className={styles.ImgDigit}
                  />
                  At least one digit
                </Grid>
                <Grid
                  item
                  className={
                    errorObj?.hasOneCapLetter
                      ? styles.accept_pass_item
                      : styles.Decline_Pass_Item
                  }
                >
                  <img
                    src={
                      errorObj?.hasOneCapLetter ? checkPass.src : closePass.src
                    }
                    className={styles.ImgDigit}
                  />
                  At least one capital letter
                </Grid>
                <Grid
                  item
                  className={
                    errorObj?.hasOneLowLetter
                      ? styles.accept_pass_item
                      : styles.Decline_Pass_Item
                  }
                >
                  <img
                    src={
                      errorObj?.hasOneLowLetter ? checkPass.src : closePass.src
                    }
                    className={styles.ImgDigit}
                  />
                  At least one small letter
                </Grid>
                <Grid
                  item
                  className={
                    errorObj?.hasEightChar
                      ? styles.accept_pass_item
                      : styles.Decline_Pass_Item
                  }
                >
                  <img
                    src={errorObj?.hasEightChar ? checkPass.src : closePass.src}
                    className={styles.ImgDigit}
                  />
                  Be at least 8 characters
                </Grid>
              </Grid>
            </>
          )}

          {(mode === "signin" || mode === "repeatPass") && errorObj && (
            <Grid item className={styles.errorText_form}>
              {errorObj?.message}
            </Grid>
          )}

          {/* Close Icon when we have error */}
          {errorObj && !changeButton  && value!=="" && (
            <Grid item className={styles.passwordCloseIcon}>
              <IconButton size="small" onClick={resetText}>
                <Image src={close} />
              </IconButton>
            </Grid>
          )}

          {/* Button Change password inside input */}
          {changeButton && (
            <Grid item className={styles.ChangePass}>
              <Button
                onClick={() => router.push(routerLink)}
                startIcon={<Image src={changePassSvg} />}
                color="primary"
              >
                Change Password
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
