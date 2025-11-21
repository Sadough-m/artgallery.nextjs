import React, { useState } from "react";
import Image from "next/image";

// gd : material ui ↓
import { Grid } from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

// gd : styles ↓
import ArtWorkFlowStyle from "../../styles/artworkflow.module.css";
import styles from "../../styles/Home.module.css";

// gd : files ↓
import img2 from "../../public/images/icons/classifi2.svg";
import arrowDown from "../../public/images/icons/Arrow down white.svg";
import arrowUp from "../../public/images/icons/Arrow Up white.svg";
import LockSvg from "../../public/images/icons/Lock.svg";

// gd : components ↓

export default function FormClassification({
  label = "",
  handleRemoveEditions,
  placeHolder = "Choose One",
  bgColor = "#363539",
  disabled = false,
  Data,
  value,
  locked = false,
  setValue
}) {
  const [openOption, setOpenOption] = useState(false);

  const handleOption = () => {
    setOpenOption(!openOption);
  };
  const CloseOption = () => {
    setOpenOption(false);
  };


  return (
    <ClickAwayListener onClickAway={CloseOption}>
      <Grid item className={ArtWorkFlowStyle.P_selectClassi}>
        <Grid
          item
          className={`${styles.Single__form_classfif} ${label === "" ? styles.Form_No_label : ""
            }`}
        >
          <Grid
            item
            className={`${styles.P_Select} ${!disabled ? styles.cursor_P : ""}`}
          >
            <Grid item className={styles.posRel}>
              <Grid item className={styles.label__Classifi}>
                <label className={`${styles.label__input} `}>{label}</label>
              </Grid>
              <input
                type="text"
                className={`${styles.formInput__classifi} ${!disabled ? styles.cursor_P : ""
                  } ${openOption && !disabled ? styles.outlinePrimary : ""}`}
                placeholder={placeHolder}
                disabled={true}
                value={value}
                style={{ backgroundColor: bgColor }}
              />
              <span
                className={styles.fixBuGFireFox1}
                onClick={handleOption}
              ></span>
              {/* Lock icon */}
              {disabled && (
                <Grid item className={styles.imageInsideFormClassifi}>
                  <img src={LockSvg.src} />
                </Grid>
              )}
              {!disabled && (
                <Grid item className={styles.imageInsideFormClassifi}>
                  <Image src={openOption ? arrowUp : arrowDown} />
                </Grid>
              )}
            </Grid>
            {!disabled && openOption && (
              <Grid item className={styles.P_Option_Select_classifi}>
                <Grid container direction="column">
                  {Data?.map((item) => (
                    <Grid
                      item
                      key={item?.id}
                      className={styles.Option_Select_classifi}
                      onClick={() => { setValue(item?.name); CloseOption(); handleRemoveEditions() }}
                    >
                      {item?.name}
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </ClickAwayListener>
  );
}
