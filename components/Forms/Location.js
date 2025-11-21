import React, { useState, useEffect } from "react";
import Image from "next/image";

// mrx : material ui ↓
import Grid from "@material-ui/core/Grid";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

// mrx : styles ↓
import styles from "../../styles/Home.module.css";

// mrx : files ↓
import iran from "../../public/images/iran.png";
import usa from "../../public/images/united states.png";
import uk from "../../public/images/united kingdom.png";
import poland from "../../public/images/poland.png";
import irland from "../../public/images/ireland.png";
import arrowDown from "../../public/images/icons/Arrow down.svg";
import arrowUp from "../../public/images/icons/Arrow Up.svg";
import lockIcon from "../../public/images/icons/Lock.svg";
import search from "../../public/images/icons/Search.svg";

// mrx : components ↓

export default function Location({
  label = "",
  placeHolder = "Choose One",
  bgColor = "#F7F8FA",
  disabled = false,
  have_error = false,
  Error_Text = "You should to choose an option.",
  locked = false,
  Data,
  cityName,
  // mrx : country props
  setcityName,
  setcountryName,
  setcountryShortCode,
  DefultValue,
}) {
  const [openOption, setOpenOption] = useState(false);

  // value input (not for date)
  const [value, setValue] = useState("");
  const [Img, setImg] = useState("");
  const [SearchText, setSearchText] = useState("");
  const [SearchData, setSearchData] = useState([]);
  const [Country, setCountry] = useState([]);

  //Open and close List Of Options for selecting
  const handleOption = () => {
    setOpenOption(!openOption);
    setCountry(Data);
    setSearchData(Data);
  };
  const CloseOption = () => {
    setOpenOption(false);
  };

  useEffect(() => {
    if (DefultValue?.length > 1) {
      setValue(DefultValue);
      setImg(Data?.filter(item => item?.cityName === cityName).map(item => item?.countryFlag))
    } else {

    }
  }, [DefultValue])

  //this is for when our selector have images, and we can select images!
  const handleChangeValue = (Item) => {
    setValue(Item?.cityName + ", " + Item?.countryName);
    setImg(Item?.countryFlag);
    setcountryName(Item?.countryName);
    setcityName(Item?.cityName);
    setcountryShortCode(Item?.countryCode);
    handleOption();
  };

  useEffect(() => {
    if (cityName === "") {
      setValue("");
    }
  }, [cityName])


  //change style of input
  const handleStyleInput = () => {
    if (have_error) {
      return styles.errorForm;
    } else if (disabled) {
      return styles.disabledForm;
    } else if (locked) {
      return styles.lockForm;
    } else return "";
  };

  useEffect(() => {
    SearchCountryByCityName()
  }, [SearchText])


  const SearchCountryByCityName = () => {
    setSearchData(Country?.filter(item => {
      return item?.cityName.toLowerCase().indexOf(SearchText.toLowerCase()) > -1;
    }))
  }

  // console.log("test 22" + Data?.filter(item => item?.location?.id === LocationID).map(item => item?.countryFlag))

  return (
    <ClickAwayListener onClickAway={CloseOption}>
      <Grid
        item
        className={`${styles.Single__form} ${label === "" ? styles.Form_No_label : ""
          }`}
      >
        <label className={styles.label__input}>{label}</label>
        <Grid
          item
          className={`${styles.P_Select} ${!disabled && !locked ? styles.cursor_P : ""
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
              className={`${styles.formInput} ${!disabled && !locked ? styles.cursor_P : ""
                } 
                        ${handleStyleInput()} ${openOption && !disabled && !locked && !have_error ? styles.outlinePrimary : ""
                } ${value !== "" ? styles.Pl : ""}`}
              placeholder={placeHolder}
              disabled={true}
              value={`${value?.substring(0, 20)}${value?.length > 20 ? "..." : ""
                }`}
              style={{
                backgroundColor: value !== "" ? bgColor : "white",
              }}
            />

            {/* Text Error */}
            {have_error && (
              <Grid item className={styles.errorText_form}>
                {Error_Text}
              </Grid>
            )}

            {/* Lock Icon For Locked State */}
            {locked && (
              <Grid item className={styles.lockIcon}>
                <img width="65%" src={lockIcon} />
              </Grid>
            )}

            {/* editional Img...!  */}
            {value !== "" && (
              <Grid item className={styles.imgStartSelect}>
                <img width="20px" style={{ marginTop: "-3px" }} src={Img} />
              </Grid>
            )}

            {/* drop down svg */}
            {!disabled && !locked && (
              <Grid item className={styles.imageInsideForm}>
                <Image src={openOption ? arrowUp : arrowDown} />
              </Grid>
            )}
          </Grid>
          {!disabled && !locked && openOption && (
            <>
              <Grid item className={styles.P_Option_Select1}>
                {/* search input!  */}
                <Grid item className={styles.Search_options}>
                  <input
                    type="search"
                    autoFocus
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
                    {
                      SearchData?.map((item) => (
                        <Grid
                          key={item?.id}
                          item
                          className={styles.Option_Select}
                          onClick={() => handleChangeValue(item)}
                        >
                          <Grid container alignItems="center" spacing={1}>
                            <Grid item className={styles.imgOptions}>
                              <img width="32px" src={item?.countryFlag} />
                            </Grid>
                            <Grid item>
                              {item?.cityName.substring(0, 15)}
                              {item?.cityName.length > 14 ? "..." : ""}
                              {/* {item?.cityName + ", " + item?.countryName */}
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
      </Grid>
    </ClickAwayListener>
  );
}