import React, { useState, useEffect, useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import Image from "next/image";
import { useRouter } from "next/router";

// good man : material ui ↓
import { ClickAwayListener, Hidden } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import profileUser from "../../public/images/profile user.png";

// good man : styles ↓
import HeaderStyle from "../../styles/Header.module.css";

//rs: api getter
import { GetAuthUrl } from "../../pages/api/config";

//rs: api url
import { BASE_Image_Url, GET_MAIN_DASHBOARD_DATA } from "../../pages/api";

//rs : set cookies with this
import Cookies from "js-cookie";

// good man : file ↓
import Search_Icon from "../../public/images/icons/Search.svg";
import SearchMobile from "../../public/images/icons/Search black.svg";
import GridView from "../../public/images/icons/Grid view.svg";
import ArrowDown from "../../public/images/icons/Arrow down.svg";
import Sep from "../../public/images/icons/mmd.svg";
import Notifocation from "../../public/images/icons/Notification.svg";
import NotifocationMobile from "../../public/images/icons/Notification mobile.svg";
import IconMenuChanger from "../../public/images/icons/Menu changer.svg";
import ArrowUpp from "../../public/images/icons/Arrow Up.svg";

// good man : Components ↓
import Collection from "../Screens/Header/Collection";
import useWindowSize from "../../Hooks/useWindowSize";
import UserMenu from "../Screens/Header/UserMenu";
import CollectionMenu from "../Modals/CollectionMenu";

// context ↓
import { Context } from "../../context/index";
import { toast } from "react-toastify";


export default function HeaderLanding({ HeaderShowen, DashboardHandle, haveAction = false }) {
  // mrx : context
  const { setModalCollectioMenu, HideHeader } = useContext(Context);

  const router = useRouter();

  const [width, height] = useWindowSize();
  const [userMenu, setUserMenu] = useState(false);
  const [UserName, setUserName] = useState("");
  const [UserProfile, setUserProfile] = useState("");


  // set item collection
  const [itemCol, setItemCol] = useState("col1");
  const selectCollection = (value) => {
    setItemCol(value);
    collectionHandler()
  };

  //open and close collection tab
  const [collection, setCollection] = useState(false);
  const collectionHandler = () => {
    setCollection(!collection);
  };

  // open UserMenu
  const handle_OpenUserMenu = () => {
    setUserMenu(true);
  };

  const GET_USER_DATA = () => {
    GetAuthUrl(GET_MAIN_DASHBOARD_DATA).then(
      (res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            if (res?.data?.data?.user?.collectionId === null) {
              router.push("/collection/add");
            } else {
              Cookies.set("Limited-ID", 0);
              localStorage.setItem("collectionId", res?.data?.data?.user?.defaultCollectionId);
              Cookies.set("USER_NAME", res?.data?.data?.user?.userFullName);
              Cookies.set("USER_ID", res?.data?.data?.user?.id);
              Cookies.set("USER_PROFILE", res?.data?.data?.user?.displayImage);
              setUserName(Cookies.get("USER_NAME"));
              setUserProfile(Cookies.get("USER_PROFILE"));
              if (res?.data?.data?.user?.registerStep === 4) {
                router.push("/auth/signup/step4");
                toast.info("Complete your registration first");
              }
              if (res?.data?.data?.user?.registerStep === 3) {
                router.push("/auth/signup/step3");
                toast.info("Complete your registration first");
              }
              if (res?.data?.data?.user?.registerStep === 2) {
                router.push("/auth/signup/step2");
                toast.info("Complete your registration first");
              }
              if (res?.data?.data?.user?.hasPassword === true) {
                router.push("/auth/signup/step1");
                toast.info("Complete your registration first");
              }
            }
          } else {
            Cookies.remove("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n");
          }
        } else {
          toast.error("something went wrong !");
        }
      }
    );
  };

  const handleLogOutUser = () => {
    setUserMenu(false);
    Cookies.remove("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n");
    Cookies.remove("USER_NAME");
    Cookies.remove("USER_PROFILE");
    router.push("/auth/signin");
    localStorage.clear();
  };

  useEffect(() => {
    if (HeaderShowen === true) {
      if (Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n")) {
        // if (!Cookies.get("USER_NAME") || !Cookies.get("USER_NAME")) {
        GET_USER_DATA();
        // }
        setUserName(Cookies.get("USER_NAME"));
        setUserProfile(Cookies.get("USER_PROFILE"));
      }
    }
  }, [])

  const GetUserProfile = () => {
    return UserProfile?.length < 8 ? "/UCstrAFCaLVt8g6JxqTSUzVH.svg" :
      BASE_Image_Url + UserProfile
  }

  const GetUserName = () => {
    return UserName?.length < 4 ? "My Profile" : UserName
  }

  return (
    <Grid item className={HeaderStyle.header_fix} style={{ display: HideHeader ? 'none' : 'block' }}>
      <Grid item className={`${HeaderStyle.margin__header__top}`}>
        <Grid container justifyContent="space-between">
          <Hidden smDown>
            <Grid item md={4} sm={6} xs={7}>
              <Grid
                container
                spacing={1}
                alignItems="center"
                className={`${HeaderStyle.c__gridCenter}`}
              >
                {
                  haveAction === true && (
                    <>
                      <Grid item>
                        <IconButton
                          onClick={() => {
                            DashboardHandle && DashboardHandle();
                          }}
                        >
                          <Image
                            src={IconMenuChanger}
                            width={"20px"}
                            height={"20px"}
                          />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <span className={`${HeaderStyle.vertical__line}`}></span>
                      </Grid>
                    </>
                  )
                }

                <Grid item className={HeaderStyle.posRel} style={{ marginLeft: !haveAction ? '40px' : '0' }}>
                  <Button
                    onClick={collectionHandler}
                    color={collection ? "primary" : "default"}
                    className={HeaderStyle.P_Collection}
                    
                  >
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item>
                        <Grid container alignItems="center" spacing={2}>
                          <Grid item >
                            <Badge color="primary" variant="dot" className={HeaderStyle.badge}></Badge>
                          </Grid>
                          <Grid item className={HeaderStyle.collection}>
                            Collections
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid item className={HeaderStyle.arrowUp}>
                          <Image src={collection ? ArrowUpp : ArrowDown} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Button>
                  {collection && (
                    <ClickAwayListener onClickAway={collectionHandler}>
                      <Grid item className={HeaderStyle.tabCol}>
                        <Collection
                          itemCol={itemCol}
                          selectCollection={selectCollection}
                        />
                      </Grid>
                    </ClickAwayListener>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Hidden>
          <Hidden mdUp>
            <Grid item xs={7} className={HeaderStyle.P_echoLab} onClick={() => setModalCollectioMenu(true)}>
              <Grid container alignItems="center" spacing={1}>
                <Button item startIcon={<Image src={GridView} />}>
                  <span className={HeaderStyle.echoLab}>
                    Echo lab’s Collection
                  </span>
                </Button>
              </Grid>
            </Grid>
          </Hidden>

          <Hidden smDown>
            <Grid item md={4} sm={12} xs={12}>
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item className={`${HeaderStyle.P__search__bar}`}>
                  <input
                    type="search"
                    className={HeaderStyle.newSearchInput}
                    placeholder="Search Echo`s collection"
                  ></input>
                  <Grid item className={HeaderStyle.Search__Icon}>
                    <Image src={Search_Icon} width={"20px"} height={"20px"} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Hidden>
          <Grid item md={4} xs={5}>
            <Grid
              container
              spacing={2}
              justifyContent="flex-end"
              alignItems="center"
              className={`${HeaderStyle.c__gridCenter} `}
            >
              <Hidden mdUp>
                <Grid item>
                  <IconButton size={width < 960 ? "small" : "medium"}>
                    <Image
                      src={SearchMobile}
                      width={width < 960 ? "22px" : "20px"}
                      height={width < 960 ? "22px" : "20px"}
                    />
                  </IconButton>
                </Grid>
              </Hidden>

              <Grid item>
                <IconButton onClick={()=>router.push("/dashboard/notification")} size={width < 960 ? "small" : "medium"}>
                  <Image
                    src={width < 960 ? NotifocationMobile : Notifocation}
                    width={width < 960 ? "22px" : "20px"}
                    height={width < 960 ? "22px" : "20px"}
                  />
                </IconButton>
              </Grid>

              <Hidden smDown>
                <Grid item>
                  <span className={`${HeaderStyle.vertical__line}`}></span>
                </Grid>
              </Hidden>

              <Grid item className={HeaderStyle.P_username}>
                <Avatar style={{ width: "33px", height: "33px", }} onClick={() => setUserMenu(true)}>
                  <img style={{ width: "100%" }} src={GetUserProfile()} />
                </Avatar>
                <Hidden mdUp>
                  <UserMenu userMenu={userMenu} setUserMenu={setUserMenu} handlelogout={() => handleLogOutUser()} />
                </Hidden>
              </Grid>

              <Hidden smDown>
                <Grid item className="posRel">
                  <Button onClick={() => handle_OpenUserMenu()}>
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item className={HeaderStyle.userName}>
                        {
                          GetUserName()
                        }
                      </Grid>
                      <Grid item className={HeaderStyle.collection1}>
                        <Image src={userMenu ? ArrowUpp : ArrowDown} width={"20px"} height={"20px"} />
                      </Grid>
                    </Grid>
                  </Button>
                  {/* panel User Menu */}
                  <UserMenu userMenu={userMenu} setUserMenu={setUserMenu} handlelogout={() => handleLogOutUser()} />
                </Grid>
              </Hidden>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
