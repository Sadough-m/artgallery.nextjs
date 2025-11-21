import React, { seContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

// mrx : material ui
import { Button, Grid, IconButton } from "@material-ui/core";

// mrx : components
import SideMenu from "../Screens/Artist/SideMenu";
import Header from "../common/header";
import { routers } from "../Screens/sideMenuRouters";
import { HeaderRouters, MenuHeaderBtnRoutes, HeaderRoutersMobile } from "../Screens/sideMenuRouters";
import useWindowSize from "../../Hooks/useWindowSize";
import { Context } from "../../context/index";

// mrx : context ↓
function Layout({ children }) {
  const { setHideHeader, DashboardOpen, setDashboardOpen } = useContext(Context);
  const router = useRouter();

  // const [dashboardOpen, setDashboardOpen] = useState(false);
  const [HeaderShowen, setHeaderShowen] = useState(false);
  const [ShowBtnForHeaderSideMenu, setShowBtnForHeaderSideMenu] = useState(false);

  const [width, height] = useWindowSize();

  // mrx : functions ↓
  const DashboardHandle = () => {
    setDashboardOpen(!DashboardOpen);
  };

  useEffect(() => {
    if (
      routers?.filter((item) => item?.router === router.pathname)?.length >= 1
    ) {
      setDashboardOpen(true);
    } else {
      setDashboardOpen(false);
    }
  }, [router.pathname]);

  const handleShowItems = () => {
    if (width >= 960) {
      if (
        HeaderRouters?.filter((item) => item?.router === router.pathname)
          ?.length >= 1
      ) {
        setHeaderShowen(false);
      } else {
        setHeaderShowen(true);
      }
    } else {
      if (
        HeaderRoutersMobile?.filter((item) => item?.router === router.pathname)
          ?.length >= 1
      ) {
        setHeaderShowen(false);
      } else {
        setHeaderShowen(true);
      }
    }
  };

  const handleShowMenuHeader = () => {
    if (
      MenuHeaderBtnRoutes?.filter((item) => item?.router === router.pathname)
        ?.length >= 1
    ) {
      setShowBtnForHeaderSideMenu(false);
    } else {
      setShowBtnForHeaderSideMenu(true);
    }
  };

  useEffect(() => {
    handleShowItems();
    handleShowMenuHeader()
  }, [router.pathname, width]);

  // reset Hide Header for Each Route
  useEffect(() => {
    setHideHeader(false)
  }, [router.pathname])


  return (
    <>
      {HeaderShowen ? (
        <Header
          HeaderShowen={HeaderShowen}
          haveAction={ShowBtnForHeaderSideMenu}
          DashboardHandle={DashboardHandle}
        />
      ) : (
        ""
      )}

      <Grid container>
        <Grid>
          {DashboardOpen  ? (
            <SideMenu dashboardOpen={DashboardOpen}  />
          ) : (
            <></>
          )}
        </Grid>
        <Grid style={{ flex: "1" }}>{children}</Grid>
      </Grid>
    </>
  );
}

export default Layout;

// mrx : you must enter a title in here ( not in documnet
// mrx : ContextProvider is our context ( global states )
