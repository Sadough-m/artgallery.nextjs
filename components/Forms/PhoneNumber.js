import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// good man : material ↓
import { Grid, Button, ClickAwayListener, IconButton } from "@material-ui/core";

// good man : files ↓
import arrowBot from "../../public/images/icons/Path.svg";
import Usa from "../../public/images/icons/USA.svg";
import Iran from "../../public/images/iran.png";
import close from "../../public/images/icons/Close dark.svg";
import lockIcon from "../../public/images/icons/Lock.svg";
import search from "../../public/images/icons/Search.svg";

// good man : styles ↓
import styles from "../../styles/Home.module.css";

// good man : components ↓
import ChooseCountry from "../Modals/ChooseCountry";
import Joi from "joi";

// mrx : api links ↓
import {
  GET_SELECT_INPUTS_STEP_2,
  GET_COUNTRY_SELECT,
  SAVE_ARTIST_CV_BUILDER,
  CV_BUILDER_ARTIST_GET_COUNTRY_NUMBERS,
} from "../../pages/api/index";

// mrx : api ↓
import {
  PostUrl,
  PostAuthUrl,
  GetUrl,
  GetAuthUrl,
} from "../../pages/api/config";

// mrx : context ↓
import { Context } from "../../context/index";
import { toast } from "react-toastify";

export default function PhoneNumber({
  Label,
  value,
  setValue,
  PlaceHolder,
  disabled = false,
  locked = false,
  setCode,
  SelectedFlag,
  onChange,
}) {
  const [ModalCountryCode, setModalCountryCode] = useState(false);
  const [NumberCode, setNumberCode] = useState("+01");
  const [insideClick, setInsideClick] = useState(false);
  const [OpenOption, setOpenOption] = useState(false);
  const [errorObj, setErrorObj] = useState(null);
  const [SearchText, setSearchText] = useState("");
  const [SearchData, setSearchData] = useState([]);
  const [Country, setCountry] = useState([]);
  const [Data, setData] = useState([]);
  const [CountryPic, setCountryPic] = useState(
    "https://flagcdn.com/32x24/us.png"
  );

  // mrx : get select inputs data
  const handleGetCountryNumberSelectInputsData = () => {
    GetAuthUrl(CV_BUILDER_ARTIST_GET_COUNTRY_NUMBERS).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          setData(res?.data?.data);
          console.log("this is real " + SelectedFlag)
          if (SelectedFlag === "") {
            setCode(res?.data?.data?.filter((item) => item?.code === "US")?.map((item) => item?.code)[0] ? res?.data?.data?.filter((item) => item?.code === "US")?.map((item) => item?.code)[0] : "")
          }
        } else {
          toast.warning(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  };

  useEffect(() => {
    handleGetCountryNumberSelectInputsData();
  }, []);

  const SearchCountryByCityName = () => {
    setSearchData(
      Country?.filter((item) => {
        return item?.name.toLowerCase().indexOf(SearchText.toLowerCase()) > -1;
      })
    );
  };

  useEffect(() => {
    SearchCountryByCityName();
  }, [SearchText]);

  const schema = Joi.number()
    .min(1000000000)
    .max(9999999999)
    .required()
    .messages({
      "number.empty": "Phone number is required",
      "number.min": `Enter a valid Phone number`,
      "number.max": `Enter a valid Phone number`,
      "number.base": "Enter a valid Phone number",
    });

  // useEffect(() => {
  //   if (validateFlag) {
  //     validateInput(value);
  //   }
  // }, [validateFlag]);

  const handleModal = () => {
    setModalCountryCode(!ModalCountryCode);
  };
  const receiveCode = (code) => {
    setNumberCode(code);
  };

  // good man : when user clicked outside of input this function will execute
  const outClickHandler = () => {
    setInsideClick(false);
    setOpenOption(false);
  };

  // good man : when user clicked on input this function will execute
  const insideClickHandler = () => {
    setInsideClick(true);
    handleOpenOptions();
  };

  const handleOpenOptions = () => {
    setOpenOption(!OpenOption);
    setCountry(Data);
    setSearchData(Data);
  };

  const resetText = () => {
    setValue("");
    setInsideClick(false);
  };

  // change country picture
  const handleChangeCountry = (item) => {
    setCountryPic(item?.logo);
    setCode(item?.code);
    handleOpenOptions();
  };

  // good man : color of line
  const lineStyleHandler = () => {
    if (errorObj) {
      return styles.lineRed;
    } else if (disabled) {
      return styles.lineWhite;
    } else if (insideClick) {
      return styles.lineBlue;
    } else {
      return styles.lineGray;
    }
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

  //vaildating input value ; show possible errors
  const validateInput = (input) => {
    // const { error: errorObj } = schema.validate(parseInt(input.value));
    // if (errorObj) setErrorObj(errorObj);
    // else 
    setErrorObj(null);
  };

  const valueHandle = (e) => {
    if (isNaN(parseInt(e.target.value)))
      setErrorObj({ message: "Enter a valid phone" });
    else validateInput(e.target.value);
    setValue(e.target.value);
  };

  return (
    <ClickAwayListener onClickAway={outClickHandler}>
      <Grid item>
        <Grid item className={`${styles.Single__form}`}>
          <Grid item className={styles.label__input}>
            {Label}
          </Grid>
          <Grid item className={styles.p_formNum}>
            <span
              className={`${styles.line_phone} ${lineStyleHandler()}`}
            ></span>
            <Grid item className={styles.button_Phone}>
              <Button
                onClick={() => {
                  onChange ? onChange() : "";
                  !disabled && !locked && insideClickHandler();
                }}
                disabled={disabled || locked}
              >
                <Grid
                  style={{
                    marginRight: "-20px"
                  }}
                  container alignItems="center" spacing={1}>
                  <Grid item>
                    <img
                      style={{
                        width: "20px",
                        top: "3px",
                        marginLeft: "-9px",
                        position: "relative",
                        left: "5px",
                      }}
                      src={
                        Data?.filter((item) => item?.code === SelectedFlag).map(
                          (item) => item?.logo
                        )
                          ? Data?.filter(
                            (item) => item?.code === SelectedFlag
                          ).map((item) => item?.logo)
                          : CountryPic
                      }
                    />
                  </Grid>
                  <Grid item className={styles.arrowPhone}>
                    <Image src={arrowBot} />
                  </Grid>
                </Grid>
              </Button>
            </Grid>
            <Grid item className={styles.inputPhone}>
              <input
                type="number"
                id="fname"
                name="fname"
                value={value}
                onChange={(e) => { valueHandle(e); onChange ? onChange() : "" }}
                className={`${styles.formNumberPhone} ${handleStatusInput()}`}
                placeholder={PlaceHolder}
                onClick={() => setInsideClick(true)}
                disabled={disabled || locked}
                style={{
                  outline:
                    insideClick && !errorObj && !disabled && !locked
                      ? "2px solid #3772FF"
                      : "none",
                  borderRadius: "6px",
                }}
              ></input>
            </Grid>

            {/* Close Icon when we have error */}
            {errorObj && value !== "" && (
              <Grid item className={styles.closeIcon}>
                <IconButton size="small" onClick={resetText}>
                  <Image src={close} />
                </IconButton>
              </Grid>
            )}

            {/* Lock Icon For Locked State */}
            {locked && (
              <Grid item className={styles.lockIcon}>
                <Image src={lockIcon} />
              </Grid>
            )}
          </Grid>
          {/* Text Error */}
          {errorObj && (
            <Grid item className={styles.errorText_form}>
              {errorObj.message}
            </Grid>
          )}
          {!disabled && !locked && OpenOption && (
            <>
              <Grid item className={styles.P_Option_Select123}>
                {/* search input!  */}
                <Grid item className={styles.Search_options}>
                  <input
                    type="search"
                    className={styles.searchSelectBox}
                    placeholder="Search"
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <Grid item className={styles.searchIcon}>
                    <Image src={search} />
                  </Grid>
                </Grid>
                <Grid item className={styles.P_search_loc1}>
                  <Grid container direction="column">
                    {/* our list for slecting country */}

                    {SearchData?.map((item) => (
                      <Grid
                        key={item?.id}
                        item
                        className={styles.Option_Select_number}
                        onClick={() => handleChangeCountry(item)}
                      >
                        <Grid
                          container
                          alignItems="center"
                          spacing={1}
                          className={styles.font_contry}
                        >
                          <Grid item className={styles.imgOptions}>
                            {/* <img width="80%" src={Usa} /> */}
                            <img width="32px" src={item?.logo} />
                          </Grid>
                          <Grid item>
                            {item?.name.substring(0, 30)}
                            {item?.name.length < 30
                              ? "..." + `( ${item?.dial_Code} )`
                              : ""}
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
        {/* <ChooseCountry
          openModal={ModalCountryCode}
          handleModal={handleModal}
          receiveCode={receiveCode}
        /> */}
      </Grid>
    </ClickAwayListener >
  );
}
