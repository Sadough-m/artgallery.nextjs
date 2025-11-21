import React, { useState, useContext } from "react";
import Image from "next/image";
import { Link } from "react-scroll";

// good man : material ui ↓
import { Grid } from "@material-ui/core";

// good man : styles ↓
import artworkStyle from "../../../styles/artworkflow.module.css";

// mrx : setCookies with this
import Cookies from "js-cookie";

// mrx : context ↓
import { Context } from "../../../context/index";

// good man : files ↓

// good man : components ↓
export default function PrimaryMenu() {
  // mrx : context
  const { ShowenReproduction, setShowenReproduction } = useContext(Context);

  // mrx : states ↓
  const [SelectedMenu, setSelectedMenu] = useState("");

  const LocalClassificationID = parseInt(Cookies.get("ClassificationID"));

  // mrx : chaning color of side menu
  const changeColorMenu = (value) => {
    if (SelectedMenu === value) {
      return artworkStyle.color_Active;
    } else {
      return artworkStyle.color_deActive;
    }
  };

  // change menu selected
  const handleChangeMenu = (value) => {
    setSelectedMenu(value);
  };

  return (
    <Grid item className={artworkStyle.P_Menu}>
      <Grid item className={artworkStyle.primaryMenu}>
        <Grid item className={artworkStyle.primaryText}>
          PRIMARY
        </Grid>
        <Grid container direction="column">
          {LocalClassificationID === 0 ||
          LocalClassificationID === 1 ||
          LocalClassificationID === 2 ? (
            <Link to="General" smooth={true} spy={true} duration={1000}>
              <Grid
                item
                className={`${artworkStyle.cv_element} ${changeColorMenu(
                  "General"
                )}`}
                onClick={() => handleChangeMenu("General")}
              >
                General
              </Grid>
            </Link>
          ) : (
            <></>
          )}

          {LocalClassificationID === 0 ||
          LocalClassificationID === 1 ||
          LocalClassificationID === 2 ? (
            <Link to="Root" smooth={true} spy={true} duration={1000}>
              <Grid
                item
                className={`${artworkStyle.cv_element} ${changeColorMenu(
                  "Root"
                )}`}
                onClick={() => handleChangeMenu("Root")}
              >
                Root
              </Grid>
            </Link>
          ) : (
            <></>
          )}

          {LocalClassificationID === 0 ||
          LocalClassificationID === 1 ||
          LocalClassificationID === 2 ? (
            <Link to="Media" smooth={true} spy={true} duration={1000}>
              <Grid
                item
                className={`${artworkStyle.cv_element} ${changeColorMenu(
                  "Media"
                )}`}
                onClick={() => handleChangeMenu("Media")}
              >
                Media
              </Grid>
            </Link>
          ) : (
            <></>
          )}

          {LocalClassificationID === 0 ? (
            <Link to="Measurment" smooth={true} spy={true} duration={1000}>
              <Grid
                item
                className={`${artworkStyle.cv_element} ${changeColorMenu(
                  "Measurment"
                )}`}
                onClick={() => handleChangeMenu("Measurment")}
              >
                Measurment
              </Grid>
            </Link>
          ) : (
            <></>
          )}

          {LocalClassificationID === 0 ? (
            <Link to="Proof" smooth={true} spy={true} duration={1000}>
              <Grid
                item
                className={`${artworkStyle.cv_element} ${changeColorMenu(
                  "Proof"
                )}`}
                onClick={() => handleChangeMenu("Proof")}
              >
                Proof
              </Grid>
            </Link>
          ) : (
            <></>
          )}

          {LocalClassificationID === 0 ? (
            <Link to="Availibility" smooth={true} spy={true} duration={1000}>
              <Grid
                item
                className={`${artworkStyle.cv_element} ${changeColorMenu(
                  "Availibility"
                )}`}
                onClick={() => handleChangeMenu("Availibility")}
              >
                Availibility
              </Grid>
            </Link>
          ) : (
            <></>
          )}

          {LocalClassificationID === 1 ? (
            <Link to="Editions" smooth={true} spy={true} duration={1000}>
              <Grid
                item
                className={`${artworkStyle.cv_element} ${changeColorMenu(
                  "Editions"
                )}`}
                onClick={() => handleChangeMenu("Editions")}
              >
                Editions
              </Grid>
            </Link>
          ) : (
            <></>
          )}

          {LocalClassificationID === 2 && ShowenReproduction === false ? (
            <Link to="Original" smooth={true} spy={true} duration={1000}>
              <Grid
                item
                className={`${artworkStyle.cv_element} ${changeColorMenu(
                  "Original"
                )}`}
                onClick={() => handleChangeMenu("Original")}
              >
                Original
              </Grid>
            </Link>
          ) : (
            <></>
          )}

          {LocalClassificationID === 2 ? (
            <Link to="Reproduction" smooth={true} spy={true} duration={1000}>
              <Grid
                item
                className={`${artworkStyle.cv_element} ${changeColorMenu(
                  "Reproduction"
                )}`}
                onClick={() => handleChangeMenu("Reproduction")}
              >
                Reproduction
              </Grid>
            </Link>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
