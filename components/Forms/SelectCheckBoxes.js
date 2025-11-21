import React, { useState } from "react";
import Image from "next/image";

// mrx : material ui ↓
import Grid from "@material-ui/core/Grid";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

// mrx : styles ↓
import styles from "../../styles/Home.module.css";

// mrx : files ↓
import arrowDown from "../../public/images/icons/Arrow down.svg";
import arrowUp from "../../public/images/icons/Arrow Up.svg";
import lockIcon from "../../public/images/icons/Lock.svg";


// mrx : components ↓
import CustomCheckBox from "./CustomCheckBox";

const SubjectsList = [
  { id: 1, name: "One subject" },
  { id: 2, name: "Two subject" },
  { id: 3, name: "Three subject" },
  { id: 4, name: "one subject" },
];
export default function SelectCheckBoxes({
  label = "",
  placeHolder = "Choose One",
  bgColor = "white",
  disabled = false,
  have_error = false,
  Error_Text = "You should to choose an option.",
  locked = false,
}) {
  const [openOption, setOpenOption] = useState(false);

  //Open and close List Of Options for selecting
  const handleOption = () => {
    setOpenOption(!openOption);
  };
  const CloseOption = () => {
    setOpenOption(false);
  };

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
                openOption && !disabled && !locked ? styles.outlinePrimary : ""
              } `}
              placeholder={placeHolder}
              disabled={true}
              style={{
                backgroundColor:  bgColor ,
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
                <Image src={lockIcon} />
              </Grid>
            )}

            {/* drop down svg */}
            {(!disabled && !locked ) && (
              <Grid item className={styles.imageInsideForm}>
                <Image src={openOption ? arrowUp : arrowDown} />
              </Grid>
            )}
          </Grid>
          {!disabled && !locked && openOption && (
            <Grid item className={styles.P_Option_Select}>
              <Grid container direction="column">
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  className={styles.P_Option_Select1}
                >
                  {SubjectsList?.map((subject) => (
                    <Grid
                      item
                      key={subject.id}
                      className={styles.Option_Select1}
                    >
                      <CustomCheckBox label={subject.name} />
                      <span className={styles.line12}></span>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </ClickAwayListener>
  );
}
