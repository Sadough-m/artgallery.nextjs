import React, { useState, useEffect } from "react";
import Image from "next/image";

// good man : material ui ↓
import Grid from "@material-ui/core/Grid";

// good man : styles ↓
import signUpStyle from "../../../../styles/signUp.module.css";
import styles from "../../../../styles/Home.module.css";

// good man : files ↓
import ArrowLeft from "../../../../public/images/icons/Arrow down.svg";

// good man : components ↓
import Items from "./ProfessionalAppointmentsItems";

// good man : states ↓
export default function Section({ CountrySelectInputData, setLocalData, title, LocalData, haveData, SelectInputData }) {
  // mrx : states ↓
  const [Data, setData] = useState([]);
  const [titleListIsOpen, setTitleListIsOpen] = useState(false);

  useEffect(() => {
    setData(LocalData);
    setTitleListIsOpen(Data !== [] ? true : false);
  }, [LocalData]);

  return (
    <>
      {haveData ? (
        <Grid item className={`${styles.w_100} ${signUpStyle.bgColor}`}>
          <Grid
            container
            justifyContent="space-between"
            className={`${signUpStyle.SlideBox}`}
            onClick={() => setTitleListIsOpen(!titleListIsOpen)}
          >
            <Grid
              item
              className={
                !titleListIsOpen
                  ? signUpStyle.titleSlide
                  : signUpStyle.titleSlide_active
              }
            >
              {title}
            </Grid>
            <Grid item>
              <Image src={ArrowLeft} />
            </Grid>
          </Grid>
          <Grid
            item
            className={`${titleListIsOpen ? signUpStyle.line_tilte : ""}`}
          ></Grid>
          <Grid
            container
            justifyContent="center"
            className={titleListIsOpen ? signUpStyle.p_bot : ""}
          >
            <Grid item className={signUpStyle.w_95}>
              <Grid container alignItems="center">
                {Data?.map((item, index) => (
                  <Items key={index} CountrySelectInputData={CountrySelectInputData} setLocalData={setLocalData} LocalData={LocalData} SelectInputData={SelectInputData} Data={item} ItemId={index} titleListIsOpen={titleListIsOpen} />
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
    </>
  );
}
