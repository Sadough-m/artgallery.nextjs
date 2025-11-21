import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

// mrx : material ui ↓
import Grid from "@material-ui/core/Grid";
import { IconButton } from "@material-ui/core";

// mrx : styles ↓
import styles from "../../styles/Home.module.css";

// mrx : files ↓
import arrowRight from "../../public/images/icons/Arrow right blue.svg";
import guy1 from "../../public/images/guy.png";
import guy4 from "../../public/images/guy4.png";
import lockIcon from "../../public/images/icons/Lock.svg";
import close from "../../public/images/icons/Close dark.svg";
import loadingSvg from "../../public/images/icons/Loading.svg";

// mrx : components ↓

export default function InputForm({
  name,
  type = "text",
  placeHolder = "Type here...",
  label = "",
  top="",
  children,
  disabled = false,
  bgColor = "white",
  haveTabs = false,
  haveSubtitle = false,
  GuysInList = [
    { id: 1, name: "Robert Fox", pic: guy1 },
    { id: 2, name: "Annette Black", pic: guy4 },
  ],
  schema,
  value,
  setValue,
  onChange,
  locked = false,
  validateFlag,
  Loading = false,
}) {
  const [error, setError] = useState(null);
  const inputFocus = useRef()

  // check if parent component signaled for validation
  useEffect(() => {
    if (validateFlag) {
      vaildateValue(value);
    }
  }, [validateFlag]);

  // input validation function
  const vaildateValue = (value) => {
    if (type !== "email") {
      const { error } = schema?.validate(value?.trim());
      if (error) setError(error?.message);
      else setError(null);
    }
    if (type === "email") {
      const { error: e } = schema?.validate(value?.trim());
      if (e) setError(e?.message);
      else setError(null);
    }
  };

  // check for errors first , set value then
  const handleInputChange = ({ target: input }) => {
    vaildateValue(input.value);
    setValue(input.value);
  };

  const resetText = () => {
    setValue("");
    inputFocus.current.focus()
  };

  // change style of Status input like error , disabled , locked ...
  const handleStatusInput = () => {
    if (error) {
      return styles.errorForm;
    } else if (disabled) {
      return styles.disabledForm;
    } else if (locked) {
      return styles.lockForm;
    } else return "";
  };

  //change some style of input in diffrent situation
  const handleStyleInput = () => {
    if (haveSubtitle) {
      return styles.TextAndSubtitle;
    } else return "";
  };

  return (
    <Grid item>
      <Grid
        item
        style={{top:top}}
        className={`${styles.Single__form} ${label === "" ? styles.Input_No_label : ""
          }`}
      >
        <label className={styles.label__input}>{label}</label>
        <Grid className={styles.InputAndEye}>
          <input
            ref={inputFocus}
            name={name}
            type={type}
            onBlur={({ target: input }) => vaildateValue(input.value)}
            className={`${styles.formInput
              } ${handleStyleInput()}  ${handleStatusInput()} `}
            id={name}
            placeholder={placeHolder}
            disabled={disabled || locked}
            value={value === 0 ? "" : value}
            onChange={(e) => { handleInputChange(e); onChange ? onChange() : "" }}
            style={{ backgroundColor: bgColor }}
          />

          {/* when we have subtitle */}
          {haveSubtitle && (
            <Grid item className={styles.subtitleFont}>
              AN
            </Grid>
          )}

          {/* this is For Edition elements like Images at the end of input */}
          {children && (disabled || value !== "") && children}

          {/* Lock Icon For Locked State */}
          {locked && (
            <Grid item className={styles.lockIcon}>
              <Image src={lockIcon} />
            </Grid>
          )}

          {/* Loading Icon for looking for user */}
          {Loading ? (
            <Grid item className={styles.P_LoadingSvg}>
              <img src={loadingSvg.src} className={styles.LoadingSvg} />
            </Grid>
          ) : (
            <></>
          )
          }

          {/* Close Icon when we have error */}
          {error && value !== "" && (
            <Grid item className={styles.closeIcon}>
              <IconButton size="small" onClick={resetText}>
                <img src={close.src} />
              </IconButton>
            </Grid>
          )}

          {/* Text Error */}
          {error && (
            <Grid item className={styles.errorText_form}>
              {error}
            </Grid>
          )}

          {haveTabs && value !== "" && (
            <Grid item className={styles.P_Option_Select}>
              <Grid container direction="column">
                {GuysInList?.map((guy) => (
                  <Grid item className={styles.Option_Select} key={guy.id}>
                    <Grid container justifyContent="space-between">
                      <Grid item>
                        <Grid container spacing={1}>
                          <Grid item className={styles.picTabs}>
                            <Image src={guy.pic} className={styles.picCircle} />
                          </Grid>
                          <Grid item>{guy.name}</Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Image src={arrowRight} />
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
