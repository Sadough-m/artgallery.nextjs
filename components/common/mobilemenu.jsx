import React, { useState } from "react";
import signInStyle from "../../styles/signIn.module.css";
import signUpStyle from "../../styles/signUp.module.css";
import styles from "../../styles/Home.module.css";
import Link from "next/link";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { Hidden } from "@material-ui/core";
import menuBurger from "../../public/images/icons/Menu-burger.svg";
import Image from "next/image";
// components
//rs : set cookies with this
import Cookies from "js-cookie";

export default function MobileMenu() {
  const [OpenMenu, setOpenMenu] = useState(false);

  return (
    <>
      <Grid container alignItems="center">
        <Grid item xs={5}>
          <Hidden mdUp>
            <Grid item className={signInStyle.IconMobile}>
              <IconButton className={`${signUpStyle.Icon_Menu}`}>
                <Image src={menuBurger} onClick={() => setOpenMenu(true)} />
              </IconButton>
            </Grid>
          </Hidden>
        </Grid>
        <Grid item xs={7} md={12}>
          <Button
            variant="contained"
            color="primary"
            className={signInStyle.TestBtn}
          ></Button>
        </Grid>
      </Grid>
      <Modal
        open={OpenMenu}
        onClose={() => setOpenMenu(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Slide direction="right" in={OpenMenu} mountOnEnter unmountOnExit>
          <Grid item className={signUpStyle.BoxMenu}>
            <Container>
            <Grid container alignItems="center" className={`${styles.mb_50}`}>
                <Grid item xs={5} className={`${signUpStyle.Wrapper_Box_1}`}>
                  <Grid item className={`${signInStyle.IconMobile_1}`}>
                    <IconButton size="small">
                      <CloseIcon
                        size="small"
                        className={`${styles.color_dark}`}
                        onClick={() => setOpenMenu(false)}
                      />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid item xs={7} md={12} style={{marginTop:'21px'}}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={`${signInStyle.TestBtn} `}
                  ></Button>
                </Grid>
              </Grid>
              <Grid container direction="column" spacing={3} className={signUpStyle.P_Home}>
                <Link href="/">
                  <Grid item className={signUpStyle.MenuItem}>
                    Home
                  </Grid>
                </Link>
                <Grid item className={signUpStyle.MenuItem}>
                  Contact us
                </Grid>
                <Grid item className={signUpStyle.MenuItem}>
                  About us
                </Grid>
              </Grid>
              {
                !Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n") && (
                  <Grid
                    container
                    direction="column"
                    spacing={2}
                    className={`${signUpStyle.Menu_Btn} ${styles.w_95}`}
                  >
                    <Link href="/auth/signin">
                      <Grid item className={`${styles.w_100}`}>
                        <Button
                          variant="contained"
                          color="primary"
                          className={`${styles.w_100} ${signUpStyle.SignInMenu} `}
                        >
                          Sign in
                        </Button>
                      </Grid>
                    </Link>
                    <Link href="/auth/signup">
                      <Grid item className={`${styles.w_100}`}>
                        <Button
                          className={`${styles.w_100} ${signUpStyle.SignUpMenu}`}
                        >
                          Sign up
                        </Button>
                      </Grid>
                    </Link>
                  </Grid>
                )
              }

            </Container>
            <Grid className={`${signUpStyle.line42}`}></Grid>
          </Grid>
        </Slide>
      </Modal>
    </>
  );
}
