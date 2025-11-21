import React, { useState } from "react";
import Image from "next/image";
import { Link } from "react-scroll";

// good man : material ui ↓
import { Button, Grid, Hidden } from "@material-ui/core";

// good man : styles ↓
import signUpStyle from "../../../styles/signUp.module.css";

// good man : files ↓

// good man : components ↓

export default function CvMobile() {
  // mrx : states ↓
  const [menuList, setMenuList] = useState(false);
  const [SelectedMenu, setSelectedMenu] = useState("");

  // mrx : functions ↓

  // mrx : chaning menu of side menu
  const handleChangeMenu = (value) => {
    setSelectedMenu(value);
  };

  // when more clicked , menu will open and will show other items
  const handleOpenMenu = () => {
    setMenuList(!menuList);
  };

  return (
    <Hidden mdUp>
      <Grid item className={`${signUpStyle.cv_parent_el}`}>
        <ul className={`${signUpStyle.cv_parent}`}>
          <Link to="Info & Bio" smooth={true} spy={true} duration={1000}>
            <li
              className={`${signUpStyle.cv_element} `}
              onClick={() => handleChangeMenu("Info & Bio")}
            >
              Info & Bio
            </li>
          </Link>
          <Link
            to="SelectedExhibitions"
            smooth={true}
            spy={true}
            duration={1000}
          >
            <li
              className={`${signUpStyle.cv_element} }`}
              onClick={() => handleChangeMenu("Selected exhibition")}
            >
              Selected exhibition
            </li>
          </Link>
          <Link to="Collections" smooth={true} spy={true} duration={1000}>
            <li
              className={`${signUpStyle.cv_element}`}
              onClick={() => handleChangeMenu("Collections")}
            >
              Collections
            </li>
          </Link>
          <li
            className={`${signUpStyle.cv_element_button} `}
            onClick={handleOpenMenu}
          >
            <Button
              variant={menuList ? "contained" : "text"}
              color={menuList ? "secondary" : "primary"}
              className={
                menuList ? signUpStyle.btn_dotActive : signUpStyle.btn_dot
              }
            >
              {" "}
              . . .{" "}
            </Button>
          </li>
          {menuList && (
            <>
              <Link to="Biography" smooth={true} spy={true} duration={1000}>
                <li
                  className={`${signUpStyle.cv_element} `}
                  onClick={() => handleChangeMenu("Biography")}
                >
                  Biography
                </li>
              </Link>
              <Link
                to="ProfessionalAppointments"
                smooth={true}
                spy={true}
                duration={1000}
              >
                <li
                  className={`${signUpStyle.cv_element} `}
                  onClick={() => handleChangeMenu("ProfessionalAppointments")}
                >
                  Appointments
                </li>
              </Link>
              <Link
                to="GrantsAndAwards"
                smooth={true}
                spy={true}
                duration={1000}
              >
                <li
                  className={`${signUpStyle.cv_element} `}
                  onClick={() => handleChangeMenu("Grants and Awards")}
                >
                  Grants and Awards
                </li>
              </Link>
              <Link to="Commissions" smooth={true} spy={true} duration={1000}>
                <li
                  className={`${signUpStyle.cv_element} `}
                  onClick={() => handleChangeMenu("Commissions")}
                >
                  Commissions
                </li>
              </Link>
              <Link to="Publications" smooth={true} spy={true} duration={1000}>
                <li
                  className={`${signUpStyle.cv_element} `}
                  onClick={() => handleChangeMenu("Publications")}
                >
                  Publications
                </li>
              </Link>
              <Link
                to="Representation"
                smooth={true}
                spy={true}
                duration={1000}
              >
                <li
                  className={`${signUpStyle.cv_element} `}
                  onClick={() => handleChangeMenu("Representation")}
                >
                  Representation
                </li>
              </Link>
              <Link
                to="ProfessionalService"
                smooth={true}
                spy={true}
                duration={1000}
              >
                <li
                  className={`${signUpStyle.cv_element} `}
                  onClick={() => handleChangeMenu("Professional Service")}
                >
                  Professional Service
                </li>
              </Link>
              <Link
                to="ProfessionalOrganizations"
                smooth={true}
                spy={true}
                duration={1000}
              >
                <li
                  className={`${signUpStyle.cv_element} `}
                  onClick={() => handleChangeMenu("ProfessionalOrganizations")}
                >
                  Organizations
                </li>
              </Link>
            </>
          )}
        </ul>
      </Grid>
    </Hidden>
  );
}
