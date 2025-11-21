import React, { useState, useEffect } from "react";
import Image from "next/image";

// mrx : material ui ↓
import Grid from "@material-ui/core/Grid";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

// mrx : styles ↓
import styles from "../../styles/Home.module.css";

// mrx : files ↓

// mrx : components ↓
import arrowDown from "../../public/images/icons/Arrow down.svg";
import arrowUp from "../../public/images/icons/Arrow Up.svg";
import lockIcon from "../../public/images/icons/Lock.svg";
import { BASE_Image_Url } from "../../pages/api";

export default function CustomSelect({
  label = "",
  haveIcon = false,
  placeHolder = "Choose One",
  bgColor = "#F7F8FA",
  children,
  top="",
  disabled = false,
  locked = false,
  setValue,
  Value,
  Data,
  onChange,
  SelectName,
  setSelectName,
  validateFlag,
  optional,
  labelSpace = true,
  IsPackaging = false,
}) {
  const [openOption, setOpenOption] = useState(false);
  // mrx : use this state for showing selected
  const [name, setname] = useState("");
  const validateValue = (value) => {
    if ((!value || value === undefined || value === "") && !optional) {
      return setErrorObj({ message: `${label} is required` });
    }
    setErrorObj(null);
  };

  // mrx : empty the value
  useEffect(() => {
    if (Value === "") {
      setname("");
    } else {
      setname(SelectName);
    }
  }, [Value]);

  useEffect(() => {
    setname(SelectName);
  }, [SelectName]);

  useEffect(() => {
    if (validateFlag) {
      validateValue(Value);
    }
  }, [validateFlag]);

  // error object for validation
  const [errorObj, setErrorObj] = useState(null);

  // Open and close List Of Options for selecting
  const handleOption = () => {
    setOpenOption(!openOption);
  };

  const CloseOption = () => {
    setOpenOption(false);
  };

  // this is for when our selector have images, and we can select images!
  const handleChangeValue = (name, id) => {
    console.log('handleChangeValue id',id,name)
    setname(name);
    onChange ? onChange() : ""
    if (SelectName?.length > 0) {
      setSelectName(name);
    }
    // mrx : set id for sending data
    setValue(id);
    setSelectName({id,name});
    validateValue(name);
    handleOption();
  };

  // change style of input
  const handleStyleInput = () => {
    if (errorObj) {
      return styles.errorForm;
    } else if (disabled) {
      return styles.disabledForm;
    } else if (locked) {
      return styles.lockForm;
    } else return "";
  };

  return (
    <ClickAwayListener onClickAway={CloseOption}>
      <Grid
        item
        style={{top:top}}
        className={`${styles.Single__form}  ${
          label === "" && labelSpace ? styles.Form_No_label : ""
        }`}
      >
        <label className={styles.label__input}>{label}</label>
        <Grid
          item
          className={`${styles.P_Select} ${
            !disabled && !locked ? styles.cursor_P : ""
          }`}
        >
          <Grid item onClick={() => handleOption()} className={styles.posRel}>
            <Grid
              item
              className={styles.fixBugFireFox}
              onClick={() => handleOption()}
            ></Grid>

            <input
              type="text"
              className={`${styles.formInput} ${haveIcon && styles.IconInput} ${
                !disabled && !locked ? styles.cursor_P : ""
              } 
                        ${handleStyleInput()} ${
                openOption && !disabled && !locked && !errorObj
                  ? styles.outlinePrimary
                  : ""
              } `}
              onBlur={({ target: input }) => validateValue(input.value)}
              placeholder={placeHolder}
              disabled={true}
              value={name}
              style={{
                backgroundColor: Value !== "" && name != "" ? bgColor : "white",
              }}
            />

            {/* if We Have and a Icon */}
            {haveIcon && (
                <img
                  src={ Data && BASE_Image_Url + Data[Value]?.description}
                  className={styles.PositionIcon}
                />
            )}

            {/* Text Error */}
            {errorObj && (
              <Grid item className={styles.errorText_form}>
                {errorObj?.message}
              </Grid>
            )}

            {/* Lock Icon For Locked State */}
            {locked && (
              <Grid item className={styles.lockIcon}>
                <Image src={lockIcon} />
              </Grid>
            )}

            {/* drop down svg */}
            {!disabled && !locked && (
              <Grid item className={styles.imageInsideForm}>
                <Image src={openOption ? arrowUp : arrowDown} />
              </Grid>
            )}
          </Grid>
          {!disabled && !locked && openOption && !IsPackaging && (
            <Grid item className={styles.P_Option_Select}>
              <Grid container direction="column">
                {Data &&
                  Data?.map((item) => (
                    <Grid
                      item
                      key={item?.id}
                      className={styles.Option_Select}
                      onClick={() => handleChangeValue(item?.name, item?.id)}
                    >
                      <Grid container alignItems="center" spacing={1}>
                        <Grid item>
                          {haveIcon ? (
                            <img
                            className={styles.ImgDropDown}
                              style={{ position: "relative", top: "5px" }}
                              src={BASE_Image_Url + item?.description}
                            />
                          ) : (
                            <></>
                          )}
                          {haveIcon ? (
                            <span style={{ position: "relative", left: "5px" }}>
                              {item?.name}
                            </span>
                          ) : (
                            item?.name
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          )}

          {/* just for Packaging Select Box */}
          {!disabled && !locked && openOption && IsPackaging && (
            <Grid item className={styles.P_Option_Select_pk}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                className={styles.P_OptionPk}
              >
                <Grid
                  item
                  className={styles.Option_Select_Pk_1}
                  onClick={() => handleChangeValue("Small", 1)}
                >
                  Small
                </Grid>
                <Grid item className={styles.Option_Select_Pk}>
                  Max <span className={styles.amount}>× by × Cm , Y kg</span>
                </Grid>
              </Grid>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                className={styles.P_OptionPk}
              >
                <Grid item className={styles.Option_Select_Pk_1}>
                  Medium
                </Grid>
                <Grid item className={styles.Option_Select_Pk}>
                  Max <span className={styles.amount}>× by × Cm , Y kg</span>
                </Grid>
              </Grid>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                className={styles.P_OptionPk}
              >
                <Grid item className={styles.Option_Select_Pk_1}>
                  Large
                </Grid>
                <Grid item className={styles.Option_Select_Pk}>
                  Max <span className={styles.amount}>× by × Cm , Y kg</span>
                </Grid>
              </Grid>
              <span className={styles.LinePk}></span>
              <Grid item className={styles.Concierge}>
                Concierge
              </Grid>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                className={styles.P_OptionPk}
              >
                <Grid item className={styles.Option_Select_Pk_1}>
                  First
                </Grid>
                <Grid item className={styles.Option_Select_Pk}>
                  Max <span className={styles.amount}>× by × Cm , Y kg</span>
                </Grid>
              </Grid>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                className={styles.P_OptionPk}
              >
                <Grid item className={styles.Option_Select_Pk_1}>
                  Second
                </Grid>
                <Grid item className={styles.Option_Select_Pk}>
                  Max <span className={styles.amount}>× by × Cm , Y kg</span>
                </Grid>
              </Grid>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                className={styles.P_OptionPk}
              >
                <Grid item className={styles.Option_Select_Pk_1}>
                  Third
                </Grid>
                <Grid item className={styles.Option_Select_Pk}>
                  Max <span className={styles.amount}>× by × Cm , Y kg</span>
                </Grid>
              </Grid>
            </Grid>
          )}
          {children && children}
        </Grid>
      </Grid>
    </ClickAwayListener>
  );
}
