import React, { useState } from "react";
import Image from "next/image";
import { Link } from "react-scroll";

// good man : material ui ↓
import { Button, Grid, Hidden } from "@material-ui/core";

// good man : styles ↓
import styles from "../../styles/Home.module.css";
import signUpStyle from "../../styles/signUp.module.css";

// good man : files ↓
import closeIcon from "../../public/images/icons/close cirle blue.svg";
import MoreSvg from "../../public/images/icons/MoreNew.svg";
import MoreWhiteSvg from "../../public/images/icons/MoreWhite.svg";

// good man : components ↓

export default function CvMobile({SignUpPage}) {
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
      <Grid item className={SignUpPage? signUpStyle.cv_parent_el_signUp : signUpStyle.cv_parent_el} style={{maxWidth:'94vw'}}>
        <ul className={`${signUpStyle.cv_parent}`}>
          <Link to="Bio" smooth={true} spy={true} duration={1000}>
            <li
              className={`${signUpStyle.cv_element} `}
              onClick={() => handleChangeMenu("Bio")}
            >
              Bio
            </li>
          </Link>
          <Link to="Education" smooth={true} spy={true} duration={1000}>
            <li
              className={`${signUpStyle.cv_element} `}
              onClick={() => handleChangeMenu("Education")}
            >
              Education
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
              <img src={menuList ? MoreWhiteSvg.src : MoreSvg.src}/>
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
