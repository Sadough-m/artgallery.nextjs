import React, { useState, useEffect } from "react";
import Image from "next/image";

// mrx : material ui ↓
import Grid from "@material-ui/core/Grid";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

// mrx : styles ↓
import styles from "../../styles/Home.module.css";

// mrx : files ↓
import arrowUp from "../../public/images/icons/Arrow Up.svg";
import lockIcon from "../../public/images/icons/Lock.svg";
import calender from "../../public/images/icons/Calendar.svg";
import calenderDark from "../../public/images/icons/Calendar dark.svg";
import arrowDownCal from "../../public/images/icons/Arrow down cal.svg";
import arrowLeftCal from "../../public/images/icons/Arrow left cal.svg";
import arrowRightCal from "../../public/images/icons/Arrow right cal.svg";

// mrx : components ↓
import { Button, IconButton } from "@material-ui/core";

// list of our months and years
const monthList = [
  { id: 0, name: "Jan" },
  { id: 1, name: "Feb" },
  { id: 2, name: "Mar" },
  { id: 3, name: "Apr" },
  { id: 4, name: "May" },
  { id: 5, name: "Jun" },
  { id: 6, name: "Jul" },
  { id: 7, name: "Aug" },
  { id: 8, name: "Sep" },
  { id: 9, name: "Oct" },
  { id: 10, name: "Nov" },
  { id: 11, name: "Dec" },
];

const yearList = [
  { id: 0, name: "2017" },
  { id: 1, name: "2018" },
  { id: 2, name: "2019" },
  { id: 3, name: "2020" },
  { id: 4, name: "2021" },
  { id: 5, name: "2022" },
  { id: 6, name: "2023" },
  { id: 7, name: "2024" },
  { id: 8, name: "2025" },
  { id: 9, name: "2026" },
  { id: 10, name: "2027" },
  { id: 11, name: "2028" },
];
export default function Date({
  label = "",
  placeHolder = "Choose One",
  bgColor = "white",
  disabled = false,
  locked = false,
  setValue,
  Value,
  validateFlag,
}) {
  const [openOption, setOpenOption] = useState(false);

  //year
  const [YearSelect, setYear] = useState(yearList[5].id);

  // month
  const [MonthSelect, setMonth] = useState(monthList[4].id);

  // just for when our select box is Date selector (opening and closing year list)
  const [yearOptions, setYearOptions] = useState(false);
  const [errorObj, setErrorObj] = useState(null);

  useEffect(() => {
    if (validateFlag) {
      if (Value === "" || !Value)
        return setErrorObj({ message: "Date is required" });
      setErrorObj(null);
    }
  }, [validateFlag]);

  //Open and close List Of Options for selecting
  const handleOption = () => {
    setOpenOption(!openOption);
  };
  const CloseOption = () => {
    setOpenOption(false);
  };

  //select month
  const handleChangeValue = (value) => {
    setMonth(value);
    calculateValue(value, YearSelect);
    CloseOption()

  };

  //select year
  const yearHandle = (value) => {
    setYear(value);
    calculateValue(MonthSelect, value);
    CloseYearOption();
  };

  //open and close year list
  const yearSelectorHandle = () => {
    setYearOptions(!yearOptions);
  };

  //close year option for date select
  const CloseYearOption = () => {
    setYearOptions(false);
  };

  //increment and decrement year for date
  const ChangeYear = (value) => {
    if (value >= 0 && value < yearList.length) {
      setYear(value);
      calculateValue(MonthSelect, value);
    }
  };

  //calculate value of Date
  const calculateValue = (monthId = MonthSelect, yearId = YearSelect) => {
    const date = monthList[monthId]?.name + " - " + yearList[yearId]?.name;
    setValue(date);
  };

  //change style of input
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
        className={`${styles.Single__form} ${
          label === "" ? styles.Form_No_label : ""
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
              className={`${styles.formInput} ${
                !disabled && !locked ? styles.cursor_P : ""
              } 
                        ${handleStyleInput()} ${
                (openOption && !disabled && !locked && !errorObj) ? styles.outlinePrimary : ""
              } `}
              placeholder={placeHolder}
              disabled={true}
              value={Value}
              style={{
                backgroundColor: bgColor,
              }}
            />

            {/* Text Error */}
            {errorObj && (
              <Grid item className={styles.errorText_form}>
                {errorObj.message}
              </Grid>
            )}

            {/* Lock Icon For Locked State */}
            {locked && (
              <Grid item className={styles.lockIcon}>
                <Image src={lockIcon} />
              </Grid>
            )}

            {/* Lock Icon For Locked State */}
            {!locked && (
              <Grid item className={styles.calenderIcon}>
                <IconButton size="small" disabled={disabled || locked}>
                  <Image src={!openOption ? calender : calenderDark} />
                </IconButton>
              </Grid>
            )}
          </Grid>
          {!disabled && !locked && openOption && (
            <Grid item className={styles.P_Option_Select_Date}>
              <Grid container direction="column">
                <Grid item className={styles.Option_Select_Date}>
                  <Grid container direction="column">
                    <Grid item>
                      <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Grid item>
                          <IconButton
                            onClick={() => ChangeYear(YearSelect - 1)}
                          >
                            <Image src={arrowLeftCal} />
                          </IconButton>
                        </Grid>
                        <Grid item className={styles.posRel}>
                          <Grid item>
                            <Button onClick={yearSelectorHandle}>
                              <Grid container alignItems="flex-start">
                                <Grid item>{yearList[YearSelect].name}</Grid>
                                <Grid item className={styles.imgYear}>
                                  <Image
                                    src={!yearOptions ? arrowDownCal : arrowUp}
                                  />
                                </Grid>
                              </Grid>
                            </Button>
                          </Grid>

                          {yearOptions && (
                            <ClickAwayListener onClickAway={CloseYearOption}>
                              <Grid
                                item
                                className={styles.P_Option_Select_Date1}
                              >
                                <Grid
                                  container
                                  direction="column"
                                  spacing={0}
                                  align="center"
                                >
                                  {yearList.map((year) => (
                                    <Grid
                                      item
                                      key={year.id}
                                      className={styles.itemListYear}
                                    >
                                      <Button
                                        className={
                                          year.id === YearSelect
                                            ? styles.buttonYear
                                            : styles.buttonYearDeActive
                                        }
                                        onClick={() => yearHandle(year.id)}
                                        variant={
                                          year.id === YearSelect
                                            ? "contained"
                                            : "text"
                                        }
                                        color={
                                          year.id === YearSelect
                                            ? "primary"
                                            : "default"
                                        }
                                      >
                                        {year.name}
                                      </Button>
                                    </Grid>
                                  ))}
                                </Grid>
                              </Grid>
                            </ClickAwayListener>
                          )}
                        </Grid>
                        <Grid item>
                          <IconButton
                            onClick={() => ChangeYear(YearSelect + 1)}
                          >
                            <Image src={arrowRightCal} />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid
                        container
                        justifyContent="space-between"
                        spacing={1}
                      >
                        {monthList.map((month) => (
                          <Grid item key={month.id} xs={4}>
                            <Grid
                              container
                              justifyContent={
                                month.id === 1 || month.id % 3 === 1
                                  ? "center"
                                  : month.id === 2 || month.id % 3 === 2
                                  ? "flex-end"
                                  : "flex-start"
                              }
                            >
                              <Grid item>
                                <Button
                                  className={styles.buttonMonth}
                                  variant={
                                    month.id === MonthSelect
                                      ? "contained"
                                      : "text"
                                  }
                                  color={
                                    month.id === MonthSelect
                                      ? "secondary"
                                      : "default"
                                  }
                                  onClick={() => handleChangeValue(month.id)}
                                >
                                  {month.name}
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </ClickAwayListener>
  );
}
