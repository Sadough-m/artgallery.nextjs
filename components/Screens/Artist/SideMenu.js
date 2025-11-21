import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";

// mrx : material ui ↓
import {
  Hidden,
  Badge,
  Grid,
  Button,
  ClickAwayListener,
} from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

// mrx : styles ↓
import ArtistStyle from "../../../styles/artist.module.css";
import Style from "../../../styles/Home.module.css";

// mrx : files ↓
import EchoLabImg from "../../../public/images/icons/Rectangle 4371.svg";
import ArrowUpImg from "../../../public/images/icons/Arrow Up.svg";
import DasboardImg from "../../../public/images/icons/Dashboard.svg";
import consignments from "../../../public/images/icons/Consignments.svg";
import ArrowDown from "../../../public/images/icons/Arrow down.svg";
import Inquries from "../../../public/images/icons/Inquries.svg";
import ArrowRight from "../../../public/images/icons/Arrow right.svg";
import ChannelsImg from "../../../public/images/icons/Channels.svg";
import Channels1Img from "../../../public/images/icons/Channels1.svg";
import Channels2Img from "../../../public/images/icons/Channels2.svg";
import PlusCircle from "../../../public/images/icons/Plus - Circle gray.svg";
import addIcon from "../../../public/images/icons/Plus - Circle.svg";
import artistIconGray from "../../../public/images/icons/artist gray.svg";
import addUser from "../../../public/images/icons/Add user - Circle.svg";
import settings from "../../../public/images/icons/Settings.svg";
import placeHolder from "../../../public/images/icons/Place holder empty.svg";
import DasboardSvg from "../../../public/images/icons/Dashboard.svg";
import OrdersSvg from "../../../public/images/icons/Orders.svg";
import ContactsSvg from "../../../public/images/icons/Contacts.svg";
import InquriesSvg from "../../../public/images/icons/Inquries.svg";
import ArtworkSvg from "../../../public/images/icons/ArtworkIcon.svg";

// good man : components ↓
import EcholabItem from "./EchoLabItem";
import CollectionMenu from "../../Modals/CollectionMenu";
import SideMenuItem from "./SideMenuItem";

import {
  BASE_Image_Url,
  BASE_URL,
  COLLECTION_ARTIST,
  SET_SELECTED_COLLECTION_OF_USER,
  TEST_COLLECTIONS,
} from "../../../pages/api";
import { GetUrl, GetAuthUrl } from "../../../pages/api/config";

import Link from "next/link";
import Cookies from "js-cookie";

//rs : artwork count provider
import { ArtworkCount } from "../../../pages/artwork";
import InvitePeople from "../../Modals/Dashboard/InvitePeople";

// mrx : context ↓
import { Context } from "../../../context/index";

// mrx : Side Menu ↓
export default function Dashboard({
  // mrx : Props ------------------------------------------------------------------------------------------------------
  dashboardOpen = true,
  pageName = "",
  // End --------------------------------------------------------------------------------------------------------------
}) {
  const router = useRouter();
  // mrx : context
  const {
    ArtistList,
    setArtistList,
    saved,
    setSaved,
    ModalCollectioMenu,
    setModalCollectioMenu,
    setCollectionItem,
    collectionItem,
  } = useContext(Context);

  // mrx : states ↓ ---------------------------------------------------------------------------------------------------
  const [EcholabOpen, setEcholabOpen] = useState(false);
  const [echoText, setEcho] = useState("");
  const [echoID, setechoID] = useState("");
  const [picEcho, setPicEcho] = useState(EchoLabImg);
  const [ModalInvite, setModalInvite] = useState(false);
  const [collections, setCollections] = useState();

  const [ArtworksTab, setArtworksTab] = useState(false);
  const [ArtistTab, setArtistTab] = useState(false);
  const [OrderTab, setOrderTab] = useState(false);
  const [OrdersTab, setOrdersTab] = useState(false);
  const [ContactTab, setContactTab] = useState(false);
  const [DashTab, setDashTab] = useState(false);
  const [InquriesTab, setInquriesTab] = useState(false);

  // End --------------------------------------------------------------------------------------------------------------

  // mrx : handle Collection Menu -------------------------------------------------------------------------------------
  const handleCollectionMenu = () => {
    setModalCollectioMenu(!ModalCollectioMenu);
  };
  // End --------------------------------------------------------------------------------------------------------------

  // mrx : artwork count to show in sidebar ---------------------------------------------------------------------------
  const artworkCount = useContext(ArtworkCount);
  // End --------------------------------------------------------------------------------------------------------------

  // mrx : artwork count to show in sidebar ---------------------------------------------------------------------------
  const collectionIDE =
    typeof window !== "undefined"
      ? localStorage.getItem("collectionId") || 0
      : 0;
  // End --------------------------------------------------------------------------------------------------------------

  // mrx : some handle when collection id change ----------------------------------------------------------------------
  useEffect(() => {
    // setNewCollection(collectionIDE);
    if (collections && !echoText) {
      if (collections
        ?.filter((item) => item?.isDefault === true)?.length < 1) {
        localStorage.setItem(
          "collectionId",
          collections?.map((item) => item?.id)[0]
        );
        setechoID(
          collections?.map((item) => item?.id)[0]
        )
        setEcho(
          collections?.map((item) => item?.name)[0]
        );
        setPicEcho(
          collections?.map((item) => item?.pictureUrl)[0]
        );
        setCollectionItem(
          collections?.map((item) => item)[0]
        );
      } else {
        localStorage.setItem(
          "collectionId",
          collections
            ?.filter((item) => item?.isDefault === true)
            ?.map((item) => item?.id)
        );
        setechoID(
          collections
            ?.filter((item) => item?.isDefault === true)
            ?.map((item) => item?.id)
        )
        setEcho(
          collections
            ?.filter((item) => item?.isDefault === true)
            ?.map((item) => item?.name)
        );
        setPicEcho(
          collections
            ?.filter((item) => item?.isDefault === true)
            ?.map((item) => item?.pictureUrl)
        );
        setCollectionItem(
          collections
            ?.filter((item) => item?.isDefault === true)
            ?.map((item) => item)
        );
      }
    }
  }, [collections]);
  // End --------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    setNewCollection(collectionIDE);
  }, [picEcho]);

  // mrx : Common Start --------------------------------------------------------------------------------------------
  const EcholabHandle = () => {
    setEcholabOpen(!EcholabOpen);
  };

  // ---- close echo lab options
  const CloseOption = () => {
    setEcholabOpen(!EcholabOpen);
  };

  // ---- open and close modal invite
  const handleModalInvite = () => {
    setModalInvite(!ModalInvite);
  };

  // End --------------------------------------------------------------------------------------------------------------

  // mrx : set item echolab -------------------------------------------------------------------------------------------
  const hanldeEchoLab = (item) => {
    if (item?.id) {
      localStorage.setItem("collectionId", item?.id);
    }
    setechoID(item?.id)
    setEcho(item?.name);
    setPicEcho(item?.pictureUrl);
    setCollectionItem(item);
    EcholabHandle();
  };

  // End --------------------------------------------------------------------------------------------------------------

  // mrx : Style handle Staet -----------------------------------------------------------------------------------------
  const handleTabMobile = (value) => {
    setArtWorkOpen(false);
    setConsignmentOpen(false);
    setOrdersOpen(false);
    setContactsOpen(false);
    setInquriesOpen(false);
    setDashboard(false);
    if (value === "DashBoard") {
      setDashboard(true);
    } else if (value === "Artworks") {
      setArtWorkOpen(true);
    } else if (value === "Orders") {
      setOrdersOpen(true);
    } else if (value === "Contacts") {
      setContactsOpen(true);
    } else if (value === "Inquries") {
      setInquriesOpen(true);
    }
  };

  // End --------------------------------------------------------------------------------------------------------------

  // useEffect(() => {
  //   {
  //     collections?.map((collection) => (
  //       <EcholabItem
  //         img={collection?.pictureUrl}
  //         item={collection}
  //         Count={collection?.artworkCount}
  //         hanldeEchoLab={() => hanldeEchoLab(collection)}
  //         echoSelected={echoText}
  //       />
  //     ));
  //   }
  // }, []);

  // mrx : call api to get collection artists ---------------------------------------------------------------------------
  const getCollectionArtists = () => {
    if (router.pathname === "/artist/list" || router.pathname === "/artist/saved") {
      if (collectionItem && collectionIDE) {
        GetAuthUrl(COLLECTION_ARTIST + `/${collectionIDE}/false/${saved}`).then(
          (res, err) => {
            if (res && res.status === 200) {
              if (res?.data?.isSuccess) {
                setArtistList(res.data.data);
              } else {
                toast.error(res?.data?.message);
              }
            } else {
              toast.error("something went wrong !");
            }
          }
        );
      }
    }
  };
  // End --------------------------------------------------------------------------------------------------------------

  // mrx : set new collection id API ---------------------------------------------------------------------------
  const setNewCollection = (CollectioID) => {
    if (!CollectioID || CollectioID !== undefined || CollectioID !== null) {
      if (parseInt(CollectioID) !== 0) {
        GetAuthUrl(SET_SELECTED_COLLECTION_OF_USER(CollectioID)).then(
          (res, err) => {
            if (res && res.status === 200) {
              if (res?.data?.isSuccess) {
                // setArtistList(res.data.data);
              } else {
                // toast.error(res?.data?.message);
              }
            } else {
              toast.error("something went wrong !");
            }
          }
        );
      }
    }
  };
  // End --------------------------------------------------------------------------------------------------------------

  // mrx : call api to get test artist collections --------------------------------------------------------------------
  const getTestArtistCollections = () => {
    GetAuthUrl(TEST_COLLECTIONS).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          setCollections(res.data?.data);
          if (res.data?.data?.length < 1) {
            router.push("/collection/add");
          }
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  };
  // End --------------------------------------------------------------------------------------------------------------

  // mrx : set added artist to localstorage ---------------------------------------------------------------------------
  const handleAddArtist = (artist) => {
    localStorage.setItem("addedArtist", artist);
    router.push("/artist/add");
  };
  // End --------------------------------------------------------------------------------------------------------------

  // mrx :  call functions to get artists on collectionItem change ----------------------------------------------------
  useEffect(() => {
    if (Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n")) {
      getCollectionArtists();
    }
  }, [collectionItem]);

  useEffect(() => {
    if (dashboardOpen === true) {
      getTestArtistCollections();
    }
  }, []);

  // End --------------------------------------------------------------------------------------------------------------

  // mrx : get artist in component did mount --------------------------------------------------------------------------
  useEffect(() => {
    if (Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n")) {
      getCollectionArtists();
    }
  }, [saved]);
  // End --------------------------------------------------------------------------------------------------------------

  // mrx : if the Cookies was not set ---------------------------------------------------------------------------------
  useEffect(() => {
    if (!Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n")) {
      router.push("/");
    }
  }, []);
  // End --------------------------------------------------------------------------------------------------------------

  // mrx : open tab if we are in Intended page ------------------------------------------------------------------------
  // useEffect(() => {
  //   if (pageName === "All artworks") {
  //     setArtWorkOpen(true)
  //   }
  // }, [])
  // End --------------------------------------------------------------------------------------------------------------

  // Our data for sub menu
  const SubMenuItems = [
    { id: 0, title: "All artworks", count: 0, link: "/artwork" },
  ];

  const SubMenuItems2 = [
    { id: 0, title: "All artworkss", count: 0, link: "/artist" },
    { id: 1, title: "On transits", count: 0, link: "/artwork" },
    { id: 2, title: "Collectionss", count: 0, link: "/artwork" },
  ];

  return (
    <>
      <Grid item style={{ position: "relative" }}>
        {/* Pc */}
        <Hidden smDown>
          <Grid item >
          <Grid item style={{ width: "260px" }}></Grid>
            {EcholabOpen && (
              <ClickAwayListener onClickAway={CloseOption}>
                <Grid item className={ArtistStyle.echo_pannel}>
                  <span className={ArtistStyle.Square}></span>
                  <Grid item>
                    <Grid container direction="column" spacing={1}>
                      <Grid item className={ArtistStyle.P_collectionList}>
                        {collections?.map((collection) => (
                          <EcholabItem
                            img={collection?.pictureUrl}
                            item={collection}
                            Count={collection.artworkCount}
                            hanldeEchoLab={() => hanldeEchoLab(collection)}
                            echoSelected={echoText}
                            echoID={echoID}
                          />
                        ))}
                      </Grid>
                      <Grid item className={ArtistStyle.p_addNew}>
                        <Link href="/collection/add">
                          <Button
                            variant="text"
                            color="primary"
                            startIcon={<Image src={addIcon} />}
                          >
                            Add New
                          </Button>
                        </Link>
                      </Grid>
                      <Grid item className={ArtistStyle.posRel}>
                        <span className={ArtistStyle.lineEcho}></span>
                      </Grid>
                      <Grid item style={{ alignSelf: "flex-start" }}>
                        <Button
                          startIcon={
                            <Image
                              src={addUser}
                              className={ArtistStyle.imgartInvite}
                            />
                          }
                          className={ArtistStyle.button_Echo}
                          onClick={() => handleModalInvite()}
                        >
                          Invite people
                        </Button>
                      </Grid>
                      <Grid item style={{ alignSelf: "flex-start" }}>
                        <Link href={`/collection/${collectionIDE}`}>
                          <Button
                            startIcon={
                              <Image
                                src={settings}
                                className={ArtistStyle.img_btn_Echo}
                              />
                            }
                            className={ArtistStyle.button_Echo}
                          >
                            Collection settings
                          </Button>
                        </Link>
                      </Grid>
                      {/* <Grid item style={{ alignSelf: "flex-start" }}>
                        <Button
                          startIcon={
                            <Image
                              src={placeHolder}
                              className={ArtistStyle.img_btn_Echo}
                            />
                          }
                          className={ArtistStyle.button_Echo}
                        >
                          Open Artur app
                        </Button>
                      </Grid> */}
                    </Grid>
                  </Grid>
                </Grid>
              </ClickAwayListener>
            )}
            <Grid item className={ArtistStyle.P_Dashbord}>
              <Grid
                container
                direction="column"
                className={ArtistStyle.dashboard}
                spacing={2}
              >
                <Grid item className={ArtistStyle.P_echo}>
                  <Grid
                    item
                    className={ArtistStyle.P_echolab}
                    onClick={() => EcholabHandle()}
                  >
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Grid item>
                        <Grid container alignItems="center" spacing={1}>
                          <Grid item>
                            <img
                              style={{
                                borderRadius: "5px",
                              }}
                              src={
                                picEcho !== null
                                  ? BASE_Image_Url + picEcho
                                  : "/images/Image echo lab1.png"
                              }
                              width="32px"
                              height="32px"
                            />
                          </Grid>
                          <Grid item className={ArtistStyle.text_echo}>
                            {echoText}
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item className={ArtistStyle.Arrow_Dashboard}>
                        <Image src={EcholabOpen ? ArrowUpImg : ArrowDown} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                {/* className={EcholabOpen ? ArtistStyle.IsOpen : ArtistStyle.IsClose} */}
                <Grid item className={ArtistStyle.P_AllSideMenu}>
                  {/* Dashboard */}
                  <SideMenuItem
                    title="Dashboard"
                    icon={DasboardSvg}
                    pageName={pageName}
                    link="/dashboard"
                    setOpen={setDashTab}
                    Open={DashTab}
                    targetPage="dashboard"
                  />

                  {/* Artworks */}
                  <SideMenuItem
                    title="Artworks"
                    icon={ArtworkSvg}
                    link="/artwork"
                    Open={ArtworksTab}
                    setOpen={setArtworksTab}
                    pageName={pageName}
                    subMenu={SubMenuItems}
                  />

                  {/* Artist */}
                  <SideMenuItem
                    title="Artist"
                    icon={artistIconGray}
                    Open={ArtistTab}
                    setOpen={setArtistTab}
                    pageName={pageName}
                    subMenu={[
                      { id: 0, title: "All Artist", count: 0, SubLink: "/artist/list" },
                    ]}
                  />

                  {/* orders */}
                  {/* <SideMenuItem
                    title="Orders"
                    icon={OrdersSvg}
                    Open={OrdersTab}
                    setOpen={setOrdersTab}
                    pageName={pageName}
                    subMenu={SubMenuItems2}
                  /> */}

                  {/* contact */}
                  <SideMenuItem
                    title="Contacts"
                    icon={ContactsSvg}
                    link="/contact"
                    pageName={pageName}
                    setOpen={setContactTab}
                    Open={ContactTab}
                    targetPage="Contact"
                  />

                  <SideMenuItem
                    title="Orders"
                    icon={OrdersSvg}
                    Open={OrderTab}
                    setOpen={setOrderTab}
                    pageName={pageName}
                    subMenu={[
                      { id: 0, title: "All orders", count: 0, SubLink: "/orders" },
                      { id: 0, title: "Draft orders", count: 0, SubLink: "/orders/draft" },
                    ]}
                  />

                  {/* Inquries */}
                  <SideMenuItem
                    title="Inquries"
                    icon={InquriesSvg}
                    pageName={pageName}
                    setOpen={setInquriesTab}
                    Open={InquriesTab}
                    targetPage="Inquries"
                    subMenu={[
                      { id: 0, title: "messaging", count: 0, SubLink: "/messaging" },
                    ]}
                  />
                </Grid>
              </Grid>

              {/* apps */}
              {/* <Grid
                container
                direction="column-reverse"
                className={ArtistStyle.Apps_Bar}
                spacing={2}
              >
                <Grid item className={ArtistStyle.Item_App_Bar}>
                  <Grid className={ArtistStyle.ViewAllApps}>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item>View all apps</Grid>
                      <Grid item className={ArtistStyle.arrow_apps}>
                        <Image src={ArrowRight} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className={ArtistStyle.Item_App_Bar}>
                  <Grid
                    container
                    spacing={1}
                    className={`${ArtistStyle.font_app_item}`}
                  >
                    <Grid item>
                      <Image src={ChannelsImg} />
                    </Grid>
                    <Grid item>Artman</Grid>
                  </Grid>
                </Grid>
                <Grid item className={ArtistStyle.Item_App_Bar}>
                  <Grid
                    container
                    spacing={1}
                    className={`${ArtistStyle.font_app_item}`}
                  >
                    <Grid item>
                      <Image src={Channels1Img} />
                    </Grid>
                    <Grid item>Minto</Grid>
                  </Grid>
                </Grid>
                <Grid item className={ArtistStyle.Item_App_Bar}>
                  <Grid
                    container
                    spacing={1}
                    className={`${ArtistStyle.font_app_item} `}
                  >
                    <Grid item>
                      <Image src={Channels2Img} />
                    </Grid>
                    <Grid item>Websites</Grid>
                  </Grid>
                </Grid>
                <Grid item className={ArtistStyle.Item_App_Bar}>
                  <Grid
                    container
                    alignItems="center"
                    className={`${ArtistStyle.font_app_item}`}
                  >
                    <Grid item md={10}>
                      Apps
                    </Grid>
                    <Grid
                      item
                      md={2}
                      className={`${ArtistStyle.imgDashboard} ${ArtistStyle.imgDashboard1}`}
                    >
                      <Image src={PlusCircle} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid> */}
            </Grid>
          </Grid>
        </Hidden>

        {/* mobile */}
        <Hidden mdUp>
          <Grid item className={ArtistStyle.DashBoardMobile}>
            <Grid container justifyContent="space-between" alignItems="center">
              {/* Dashboard */}
              <SideMenuItem
                title="Dashboard"
                icon={DasboardSvg}
                pageName={pageName}
                link="/dashboard"
                setOpen={setDashTab}
                open={DashTab}
                targetPage="dashboard"
              />

              {/* Artworks */}
              <SideMenuItem
                title="Artworks"
                icon={ArtworkSvg}
                Open={ArtworksTab}
                setOpen={setArtworksTab}
                pageName={pageName}
                subMenu={SubMenuItems}
                targetPage="/artwork"
                link="/artwork"
              />

              {/* Artist */}
              <SideMenuItem
                title="Artist"
                icon={artistIconGray}
                Open={ArtistTab}
                setOpen={setArtistTab}
                pageName={pageName}
                subMenu={SubMenuItems}
                targetPage="All Artist"
                link="/artist/list"
              />

              {/* orders */}
              <SideMenuItem
                title="Orders"
                icon={OrdersSvg}
                Open={OrderTab}
                setOpen={setOrderTab}
                pageName={pageName}
                subMenu={SubMenuItems2}
                targetPage="orders"
                link="/orders"
              />

              {/* contact */}
              <SideMenuItem
                title="Contacts"
                icon={ContactsSvg}
                pageName={pageName}
                link="/contact"
                setOpen={setContactTab}
                open={ContactTab}
                targetPage="Contact"
              />

              {/* Inquries */}
              <SideMenuItem
                title="Inquries"
                icon={InquriesSvg}
                pageName={pageName}
                link="/messaging"
                setOpen={setInquriesTab}
                open={InquriesTab}
                targetPage="Inquries"
              />
            </Grid>
          </Grid>
        </Hidden>
        <InvitePeople
          open={ModalInvite}
          handleModal={() => handleModalInvite()}
        />
        <CollectionMenu
          handleModal={() => handleCollectionMenu()}
          openModal={ModalCollectioMenu}
          hanldeEchoLab={hanldeEchoLab}
          collections={collections}
          echoText={echoText}
        />
      </Grid>
    </>
  );
}
