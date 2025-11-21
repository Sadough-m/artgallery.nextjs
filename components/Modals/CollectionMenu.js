import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Matrial
import {
  IconButton,
  Grid,
  Fade,
  Modal,
  Hidden,
  Button,
} from "@material-ui/core";

// mrx : Styles ↓
import Style from "../../styles/artworkflow.module.css";

//rs : set cookies with this
import Cookies from "js-cookie";

// rmx : files  ↓
import closeSvg from "../../public/images/icons/Close12.svg";
import plusCircle from "../../public/images/icons/Plus - Circle.svg";
import plusCircleGray from "../../public/images/icons/Plus - Circle gray.svg";
import NotifocationMobile from "../../public/images/icons/Notification mobile.svg";
import SearchMobile from "../../public/images/icons/Search black.svg";
import niki from "../../public/images/Rectangle 4352.png";
import EcholabItem from "../Screens/Artist/EchoLabItem";
import inviteSvg from "../../public/images/icons/Add user - Circle gray.svg";
import ArtistRoaster from "../../public/images/icons/Artist roaster.svg";
import Exhibition from "../../public/images/icons/Exhibition.svg";
import Artman from "../../public/images/icons/Artman.svg";
import arrowRight from "../../public/images/icons/Arrow right blue.svg";
import websiteSvg from "../../public/images/icons/Website gray.svg";
import arthurApp from "../../public/images/icons/arthurApp.svg";
import InvitePeople from "./Dashboard/InvitePeople";
import { BASE_Image_Url } from "../../pages/api";

// Component ↓

export default function CollectionMenu({
  openModal,
  handleModal,
  collections,
  hanldeEchoLab,
  echoText,
}) {
  // states ↓
  const [SelectedMenu, setSelectedMenu] = useState("Collections");
  const [ModalInvite, setModalInvite] = useState(false);

  // handle modal invite people
  const hanldeModalInvite = () => {
    setModalInvite(!ModalInvite)
  }

  // change selected menu
  const hanldeSelectedMenu = (value) => {
    setSelectedMenu(value);
  };

  // return style selected menu
  const hanldeStyleMenu = (value) => {
    if (value === SelectedMenu) {
      return Style.col_item;
    } else return Style.col_item_deactive;
  };

  // return badge
  const handleBadge = (value) => {
    if (value === SelectedMenu) {
      return <span className={Style.badgeBlue1}></span>;
    } else return "";
  };

  const GetUserProfile = () => {
    return Cookies.get("USER_PROFILE")?.length < 8 ? "/UCstrAFCaLVt8g6JxqTSUzVH.svg" :
      BASE_Image_Url + Cookies.get("USER_PROFILE")
  }

  return (
    <>
      {/* for mobile */}
      <Hidden smUp>
        <Modal
          open={openModal}
          onClose={handleModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <Fade direction="right" in={openModal} mountOnEnter unmountOnExit>
            <Grid item className={Style.BoxMenu}>
              <Grid item>
                {/* navbar */}
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  className={Style.posFixed1}
                >
                  <Grid item>
                    <IconButton className={Style.icon12} onClick={handleModal}>
                      <Image src={closeSvg} />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    {/* <IconButton size="small" className={Style.iconMobileCol}>
                      <Image src={SearchMobile} />
                    </IconButton> */}
                    {/* <IconButton size="small" className={Style.iconMobileCol}>
                      <Image src={NotifocationMobile} />
                    </IconButton> */}
                    <img src={GetUserProfile()} className={Style.personImg} />
                  </Grid>
                </Grid>

                {/* List select */}
                <Grid item className={Style.wrapperMobileArtwork1}>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-around"
                    className={Style.listCollection}
                  >
                    <Grid
                      item
                      className={hanldeStyleMenu("Collections")}
                      onClick={() => hanldeSelectedMenu("Collections")}
                    >
                      {handleBadge("Collections")}
                      Collections
                    </Grid>
                    <Grid
                      item
                      className={hanldeStyleMenu("All contact")}
                      onClick={() => hanldeSelectedMenu("All contact")}
                    >
                      {handleBadge("All contact")}
                      {/* All contact */}
                    </Grid>
                    <Grid
                      item
                      className={hanldeStyleMenu("Discover")}
                      onClick={() => hanldeSelectedMenu("Discover")}
                    >
                      {handleBadge("Discover")}
                      {/* Discover */}
                    </Grid>
                  </Grid>
                </Grid>

                {/* Colections */}
                <Grid item className={Style.collections}>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Grid item className={Style.collectionText}>
                      Collections
                    </Grid>
                    <Grid item className={Style.p_addNew}>
                      <Link href="/collection/add">
                        <Button
                          color="primary"
                          startIcon={
                            <Image src={true ? plusCircle : plusCircleGray} />
                          }
                        >
                          Add New
                        </Button>
                      </Link>
                    </Grid>
                  </Grid>

                  {/* list collections */}
                  <Grid item className={Style.p_echo}>
                    {collections?.map((collection) => (
                      <Grid item style={{ marginBottom: "13px" }}>
                        <EcholabItem
                          img={collection?.pictureUrl}
                          item={collection}
                          hanldeEchoLab={() => hanldeEchoLab(collection)}
                          echoSelected={echoText}
                        />
                      </Grid>
                    ))}
                  </Grid>

                  {/* invite people */}
                  <Grid item>
                    <Button
                      onClick={() => hanldeModalInvite()}
                      className={Style.invitePeople}
                      startIcon={<Image src={inviteSvg} />}
                    >
                      Invite people
                    </Button>
                  </Grid>

                  {/* Apps */}
                  {/* <Grid item className={Style.pAllApss}>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                      style={{ marginBottom: "10px" }}
                    >
                      <Grid item className={Style.appName}>
                        Apps
                      </Grid>
                      <Grid item>
                        <img
                          src={plusCircleGray.src}
                          className={Style.appIMg}
                        />
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      alignItems="center"
                      className={Style.p_apps}
                    >
                      <Grid item className={Style.p_app_svg}>
                        <img src={ArtistRoaster.src} className={Style.appIMg} />
                      </Grid>
                      <Grid item className={Style.appName_1}>
                        Artist roaster
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      alignItems="center"
                      className={Style.p_apps}
                    >
                      <Grid item className={Style.p_app_svg}>
                        <img src={Exhibition.src} className={Style.appIMg} />
                      </Grid>
                      <Grid item className={Style.appName_1}>
                        Exhibition
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      alignItems="center"
                      className={Style.p_apps}
                    >
                      <Grid item className={Style.p_app_svg}>
                        <img src={Artman.src} className={Style.appIMg} />
                      </Grid>
                      <Grid item className={Style.appName_1}>
                        Artman
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                      className={Style.viewApps}
                    >
                      <Grid item>View all apps</Grid>
                      <Grid item className={Style.p_app_svg}>
                        <img src={arrowRight.src} className={Style.appIMg} />
                      </Grid>
                    </Grid>
                  </Grid> */}

                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-around"
                    className={Style.p_mainWeb}
                  >
                    {/* <Grid item className={Style.mainWebText}>
                      <img src={websiteSvg.src} className={Style.imgWeb} />
                      Main website
                    </Grid>
                    <span className={Style.lineApp}></span>
                    <Grid item className={Style.mainWebText}>
                      <img src={arthurApp.src} className={Style.imgWeb} />
                      Open Artur app
                    </Grid> */}
                  </Grid>

                </Grid>
              </Grid>
            </Grid>
          </Fade>
        </Modal>
      </Hidden>
      <InvitePeople open={ModalInvite} handleModal={() => hanldeModalInvite()} />
    </>
  );
}
