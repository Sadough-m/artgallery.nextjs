import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid, ClickAwayListener } from "@material-ui/core";

// gm : styles ↓
import HeaderStyles from "../../../styles/Header.module.css";

// gm : files ↓
import settingIcon from "../../../public/images/icons/Settings.svg";
import LogOutIcon from "../../../public/images/icons/Logout.svg";
import LogOut from "../../Modals/Dashboard/LogOut";
import useWindowSize from "../../../Hooks/useWindowSize";

// gm : components ↓

export default function UserMenu({
  userMenu,
  handlelogout,
  setUserMenu,
  handle_OpenUserMenu,
}) {
  // gm : states ↓
  const [LogOutModal, setLogOutModal] = useState(false);

  // close UserMenu
  const handle_CloseUserMenu = () => {
    setUserMenu(false);
  };

  // handle log out modal
  const handleLogOutModal = () => {
    setLogOutModal(!LogOutModal);
    handle_CloseUserMenu();
  };

  const [width, height] = useWindowSize()

  return (
    <>
      {userMenu && (
        <ClickAwayListener onClickAway={() => handle_CloseUserMenu()}>
          <Grid
            item
            className={width > 960 ? HeaderStyles.UserMenu : HeaderStyles.UserMenu_1}
            onClick={() => handle_OpenUserMenu}
          >
            <Grid item className="posRel">
              <span className={HeaderStyles.SquareUser}></span>
              <Link href="/user">
                <Grid
                  item
                  className={HeaderStyles.item_userMenu}
                  onClick={() => handle_CloseUserMenu()}
                >
                  <img src={settingIcon.src} className={HeaderStyles.fitSvg} />
                  Settings
                </Grid>
              </Link>
              <Grid
                item
                className={HeaderStyles.item_userMenu}
                onClick={() => handleLogOutModal()}
              >
                <img src={LogOutIcon.src} className={HeaderStyles.fitSvg} />
                Logout
              </Grid>
            </Grid>
          </Grid>
        </ClickAwayListener>
      )}
      <LogOut handlelogout={handlelogout} open={LogOutModal} handleModal={() => { handleLogOutModal(); setLogOutModal(false) }} />
    </>
  );
}
