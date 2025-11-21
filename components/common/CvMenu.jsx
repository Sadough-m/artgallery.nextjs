import React, { useState } from "react";
import Image from "next/image";
import { Link } from "react-scroll";

// good man : material ui ↓
import { Grid } from "@material-ui/core";

// good man : styles ↓
import styles from "../../styles/Home.module.css";
import signUpStyle from "../../styles/signUp.module.css";

// good man : files ↓
import closeIcon from "../../public/images/icons/close cirle blue.svg";

// good man : components ↓

export default function CvMenu({ havePrimary = false }) {
  // mrx : states ↓
  const [menuList, setMenuList] = useState(false);
  const [SelectedMenu, setSelectedMenu] = useState("");

  // mrx : chaning color of side menu
  const changeColorMenu = (value) => {
    if (SelectedMenu === value) {
      return signUpStyle.color_Active;
    } else {
      return signUpStyle.color_deActive;
    }
  };

  const handleChangeMenu = (value) => {
    setSelectedMenu(value);
  };

  const handleOpenMenu = () => {
    setMenuList(!menuList);
  };

  return (
    <Grid item className={signUpStyle.P_Menu}>
      {havePrimary && (
        <Grid item className={signUpStyle.primaryMenu}>
          <Grid
            item
            className={`${styles.fw_500} ${styles.text__Primary} ${styles.mb_10}`}
          >
            PRIMARY
          </Grid>
          <Grid container direction="column">
            <Link to="Info & Bio" smooth={true} spy={true} duration={1000}>
              <Grid
                item
                className={`${signUpStyle.cv_element} ${changeColorMenu(
                  "Info"
                )}`}
                onClick={() => handleChangeMenu("Info")}
              >
                Info
              </Grid>
            </Link>

            <Link to="Bio" smooth={true} spy={true} duration={1000}>
              <Grid
                item
                className={`${signUpStyle.cv_element} ${changeColorMenu(
                  "Bio"
                )}`}
                onClick={() => handleChangeMenu("Bio")}
              >
                Bio
              </Grid>
            </Link>
          </Grid>
        </Grid>
      )}

      <Grid
        item
        className={`${styles.fw_500} ${styles.text__Primary} ${styles.mb_10}`}
      >
        CV
      </Grid>
      <Grid container direction="column">
        {!havePrimary && (
          <Link to="Bio" smooth={true} spy={true} duration={1000}>
            <Grid
              item
              className={`${signUpStyle.cv_element} ${changeColorMenu("Bio")}`}
              onClick={() => handleChangeMenu("Bio")}
            >
              Bio
            </Grid>
          </Link>
        )}

        <Link to="Education" smooth={true} spy={true} duration={1000}>
          <Grid
            item
            className={`${signUpStyle.cv_element} ${changeColorMenu(
              "Education"
            )}`}
            onClick={() => handleChangeMenu("Education")}
          >
            Education
          </Grid>
        </Link>
        <Link to="SelectedExhibitions" smooth={true} spy={true} duration={1000}>
          <Grid
            item
            className={`${signUpStyle.cv_element} ${changeColorMenu(
              "Selected exhibition"
            )}`}
            onClick={() => handleChangeMenu("Selected exhibition")}
          >
            Selected exhibition
          </Grid>
        </Link>

        <Link to="Collections" smooth={true} spy={true} duration={1000}>
          <Grid
            item
            className={`${signUpStyle.cv_element} ${changeColorMenu(
              "Collections"
            )}`}
            onClick={() => handleChangeMenu("Collections")}
          >
            Collections
          </Grid>
        </Link>
        {havePrimary && (
          <Link to="Biography" smooth={true} spy={true} duration={1000}>
            <Grid
              item
              className={`${signUpStyle.cv_element} ${changeColorMenu(
                "Biography"
              )}`}
              onClick={() => handleChangeMenu("Biography")}
            >
              Biography
            </Grid>
          </Link>
        )}

        <Grid
          item
          className={`${signUpStyle.cv_element}  ${styles.text__Primary}`}
          onClick={handleOpenMenu}
        >
          {!menuList && <span>+ Menu</span>}

          {menuList && (
            <Grid container spacing={1}>
              <Grid item>Close</Grid>
              <Grid item className={signUpStyle.closeIcon}>
                <Image src={closeIcon} />
                {/* loader={true} */}
              </Grid>
            </Grid>
          )}
        </Grid>

        {menuList && (
          <>
            {!havePrimary && (
              <Link to="Biography" smooth={true} spy={true} duration={1000}>
                <Grid
                  item
                  className={`${signUpStyle.cv_element} ${changeColorMenu(
                    "Biography"
                  )}`}
                  onClick={() => handleChangeMenu("Biography")}
                >
                  Biography
                </Grid>
              </Link>
            )}
            <Link
              to="ProfessionalAppointments"
              smooth={true}
              spy={true}
              duration={1000}
            >
              <Grid
                item
                className={`${signUpStyle.cv_element} ${changeColorMenu(
                  "ProfessionalAppointments"
                )}`}
                onClick={() => handleChangeMenu("ProfessionalAppointments")}
              >
                Professional Appointments
              </Grid>
            </Link>

            <Link to="GrantsAndAwards" smooth={true} spy={true} duration={1000}>
              <Grid
                item
                className={`${signUpStyle.cv_element} ${changeColorMenu(
                  "GrantsAndAwards"
                )}`}
                onClick={() => handleChangeMenu("GrantsAndAwards")}
              >
                Grants and Awards
              </Grid>
            </Link>
            <Link to="Commissions" smooth={true} spy={true} duration={1000}>
              <Grid
                item
                className={`${signUpStyle.cv_element} ${changeColorMenu(
                  "Commissions"
                )}`}
                onClick={() => handleChangeMenu("Commissions")}
              >
                Commissions
              </Grid>
            </Link>

            <Link to="Publications" smooth={true} spy={true} duration={1000}>
              <Grid
                item
                className={`${signUpStyle.cv_element} ${changeColorMenu(
                  "Publications"
                )}`}
                onClick={() => handleChangeMenu("Publications")}
              >
                Publications
              </Grid>
            </Link>

            <Link to="Representation" smooth={true} spy={true} duration={1000}>
              <Grid
                item
                className={`${signUpStyle.cv_element} ${changeColorMenu(
                  "Representation"
                )}`}
                onClick={() => handleChangeMenu("Representation")}
              >
                Representation
              </Grid>
            </Link>
            <Link
              to="ProfessionalService"
              smooth={true}
              spy={true}
              duration={1000}
            >
              <Grid
                item
                className={`${signUpStyle.cv_element} ${changeColorMenu(
                  "ProfessionalService"
                )}`}
                onClick={() => handleChangeMenu("ProfessionalService")}
              >
                Professional Service
              </Grid>
            </Link>
            <Link
              to="ProfessionalOrganizations"
              smooth={true}
              spy={true}
              duration={1000}
            >
              <Grid
                item
                className={`${signUpStyle.cv_element} ${changeColorMenu(
                  "ProfessionalOrganizations"
                )}`}
                onClick={() => handleChangeMenu("ProfessionalOrganizations")}
              >
                Professional Organizations
              </Grid>
            </Link>
          </>
        )}
      </Grid>
    </Grid>
  );
}
