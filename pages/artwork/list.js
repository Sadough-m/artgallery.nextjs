import React, { useEffect, useState, createContext } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from 'next/router';

// mrx : material ui ↓
import { Hidden, Button, Badge, Grid, IconButton } from "@material-ui/core";

// mrx : styles ↓
import ArtWorkStyle from "../../styles/artworkflow.module.css";

// mrx : setCookies with this
import Cookies from "js-cookie";

// rmx : files  ↓
import searchImg from "../../public/images/icons/Search.svg";
import arrowLeftSvg from "../../public/images/icons/Arrow left -.svg";
import imgEcholab from "../../public/images/Image echo lab2.png";

// mrx : components ↓
import SideMenu from "../../components/Screens/Artist/SideMenu";
import useWindowSize from "../../Hooks/useWindowSize";
import HeaderLanding from "../../components/common/header";
import ArtWorkMenu from "../../components/Screens/ArtWork/ArtWorkMenu";
import ListArtWork from "../../components/Screens/ArtWork/ListArtWork";
import FilterBox from "../../components/Screens/ArtWork/FilterBox";
import ItemsList from "../../components/Screens/ArtWork/ItemsList";

//rs : get methods helper
import { GetAuthUrl, PostAuthUrl } from "../api/config";

//rs : url constants
import { GET_ARTWORK_BY_FILTER, GET_FILTERDATA_IN_ARTWORK } from "../api";
import TopMenuMobile from "../../components/Screens/ArtWork/TopMenuMobile";
import ButtonAddArt from "../../components/Screens/ArtWork/ButtonAddArt";

export const ArtworkCount = createContext();

export default function ArtWork() {
  const router = useRouter();

  // mrx : states ↓
  const [Artworks, setArtworks] = useState();
  const [searchTerm, setSearchTerm] = useState();
  const [filterBoxList, setFilterBoxList] = useState();
  const [filter, setFilter] = useState({});
  const [selectedArtwork, setSelectedArtwork] = useState();
  const [artWorkModal, setArtWorkModal] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(true);
  const [artWorkDetail, setArtWorkDetail] = useState(false);
  const [GridShow, setGridShow] = useState(true);
  const [timer, setTimer] = useState(0);

  const collectionID =
    typeof window !== "undefined"
      ? localStorage.getItem("collectionId") || 0
      : 0;

  //rs : call get artworks list api
  const getArtworks = (tagId = null, statuse = null, sortBy = null, te) => {
    PostAuthUrl(GET_ARTWORK_BY_FILTER(collectionID), {
      tagId: tagId,
      statuse: statuse,
      sortBy: sortBy,
      searchText: searchTerm ? searchTerm : "",
    }).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          setArtworks(res.data.data);
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  };

  //rs : call get artwork filters api
  const getArtworkFilters = () => {
    GetAuthUrl(GET_FILTERDATA_IN_ARTWORK(collectionID)).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          setFilterBoxList(res.data.data);
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      getArtworks(
        collectionID,
        filter?.tags?.id,
        filter?.statuse?.id,
        filter?.sortBy?.id,
        searchTerm
      );
    }, 500);

    setTimer(newTimer);
  };

  // good man : recocnize the page size
  const [width, height] = useWindowSize();

  // open and close side menu
  const DashboardHandle = () => {
    setDashboardOpen(!dashboardOpen);
  };

  //open and close artwork modal
  const artWorkHandle = () => {
    setArtWorkModal(!artWorkModal);
  };

  // good man : when artworks clicked , a menu will open //rs : set selected artwork
  const menuArtWork_Open = (data) => {
    if (data?.classificationId === 0) {
      Cookies.set("Selected-item-artwork-type", data?.classificationId);
      localStorage.setItem("Adding-Art-Work", JSON.stringify({ SelectedClassificationID: parseInt(data?.classificationId) }))
      setArtWorkDetail(true);
      setSelectedArtwork(data);
    } else {
      Cookies.set("Selected-item-artwork-type", data?.classificationId);
      localStorage.setItem("Adding-Art-Work", JSON.stringify({ SelectedClassificationID: parseInt(data?.classificationId) }))
      router.push(`/artwork/${data?.artworkId}`)
    }
  };
  // good man : when artworks clicked , a menu will close
  const menuArtWork_Close = () => {
    setArtWorkDetail(false);
  };

  // good man : change type of showing list of artworks ( grid or list )
  const hanldeGridShow = () => {
    setGridShow(true);
  };
  const hanldeListShow = () => {
    if (width > 960) {
      setGridShow(false);
    }
  };

  //rs : get artworks list on component did mount
  useEffect(() => {
    getArtworkFilters();
    getArtworks();
  }, []);

  useEffect(() => {
    if (!JSON.stringify(filter?.statuse?.name !== null)) {
      getArtworks(
        collectionID,
        filter?.tags?.id,
        filter?.statuse?.id,
        filter?.sortBy?.id,
        searchTerm
      );
    }
  }, [filter]);

  return (
    <>
      <Grid item>
        {/* this is for mobile mood, when artwork detail is open , we hide some components */}
        {/* {!(width < 960 && artWorkDetail) && (
          <HeaderLanding DashboardHandle={DashboardHandle} haveAction={true} />
        )} */}

        <Grid container direction="row">
          {/* <SideMenu dashboardOpen={dashboardOpen} /> */}

          <Grid item className={ArtWorkStyle.container_artwork}>
            <Grid item className={ArtWorkStyle.P_artistNav_list}>
              <Grid container spacing={3} direction="column">
                {/* this is for mobile mood, when artwork detail is open , we hide some components */}
                {!(width < 960 && artWorkDetail) && (
                  <Grid item className={ArtWorkStyle.p_artworkList}>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                      className="posRel"
                    >
                      <span className={ArtWorkStyle.lineGradient}></span>
                      <Hidden smDown>
                        <Grid item>
                          <Grid
                            container
                            spacing={1}
                            className={ArtWorkStyle.Artist_Text1}
                          >
                            <Grid item>
                              <IconButton
                                size="small"
                                className={ArtWorkStyle.icon33}
                              >
                                <Image src={arrowLeftSvg} />
                              </IconButton>
                              Artwork list
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item style={{ marginTop: "5px" }}>
                          <ButtonAddArt />
                        </Grid>
                      </Hidden>
                    </Grid>
                  </Grid>
                )}
                <Grid item className={ArtWorkStyle.p_art_artist}>
                  <Grid container alignItems="flex-end">
                    <Grid item>
                      <img
                        src={imgEcholab.src}
                        className={ArtWorkStyle.imgArt}
                      />
                    </Grid>
                    <Grid iten className={ArtWorkStyle.p_name_art}>
                      <Grid container direction="column">
                        <Grid item className={ArtWorkStyle.artwork__name}>
                          BlackSwan
                        </Grid>
                        <Grid item className={ArtWorkStyle.artist__name}>
                          Sohrab Sepehri
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item className={ArtWorkStyle.ed_text}>
                      Ed. of 100
                    </Grid>
                    <Grid item className={ArtWorkStyle.p_viewMaster}>
                      <Button
                        color="secondary"
                        variant="contained"
                        className={ArtWorkStyle.viewMater}
                      >
                        View Master file
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>

                {!(width < 960 && artWorkDetail) && (
                  <>
                    <TopMenuMobile />
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                      direction="row"
                      className={ArtWorkStyle.P_search_Filter}
                    >
                      <Grid item className={ArtWorkStyle.P_tiny_search}>
                        <input
                          type="search"
                          placeholder="Search artwork name"
                          className={ArtWorkStyle.tiny_search}
                          value={searchTerm}
                          onChange={(e) => handleSearch(e.target.value)}
                        />
                        <Grid item className={ArtWorkStyle.searchImg}>
                          <Image src={searchImg} />
                        </Grid>
                      </Grid>

                      <FilterBox
                        hanldeGridShow={hanldeGridShow}
                        hanldeListShow={hanldeListShow}
                        GridShow={GridShow}
                        onFilter={setFilter}
                        data={filterBoxList}
                      />
                      <Hidden mdUp>
                        <ButtonAddArt />
                      </Hidden>
                    </Grid>
                  </>
                )}

                {/* ------------------------------ Art Works --------------------------- */}

                <Grid
                  container
                  justifyContent="space-between"
                  style={{ width: "99%" }}
                >
                  {/* desktop Artworks */}
                  {GridShow && !(width < 960 && artWorkDetail) && (
                    <>
                      <Hidden smDown>
                        <ItemsList
                          menuArtWork={menuArtWork_Open}
                          artWorkDetail={artWorkDetail}
                          width={width}
                          GridShow={GridShow}
                          data={Artworks}
                          items={Artworks ? Artworks?.length : 0}
                        />
                      </Hidden>
                    </>
                  )}

                  {/* artwork table list */}

                  {!GridShow && !(width < 960 && artWorkDetail) && (
                    <ListArtWork
                      menuArtWork={menuArtWork_Open}
                      dashboardOpen={dashboardOpen}
                      artWorkDetail={artWorkDetail}
                      ArtWorksData={Artworks}
                    />
                  )}

                  {/* artwork Detail Menu */}
                  {artWorkDetail && (
                    <ArtWorkMenu
                      menuArtWork={menuArtWork_Close}
                      data={selectedArtwork}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
