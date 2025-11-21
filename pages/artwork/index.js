import React, { useEffect, useState, createContext, useContext } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

// mrx : material ui ↓
import { Hidden, Badge, Grid } from "@material-ui/core";

// mrx : context ↓
import { Context } from "../../context/index";

// mrx : styles ↓
import ArtWorkStyle from "../../styles/artworkflow.module.css";

// mrx : setCookies with this
import Cookies from "js-cookie";

// rmx : files  ↓
import searchImg from "../../public/images/icons/Search.svg";
import ImageArtistPage from "../../public/images/Mask.png";

// mrx : components ↓
import Header from "../../components/common/header";
import SideMenu from "../../components/Screens/Artist/SideMenu";
import ModalAddArtist from "../../components/Modals/ModalAddArtist";
import useWindowSize from "../../Hooks/useWindowSize";
import HeaderLanding from "../../components/common/header";
import AddArtWork from "../../components/Modals/ArtWork/AddArtWork";
import ArtWorkMenu from "../../components/Screens/ArtWork/ArtWorkMenu";
import ListArtWork from "../../components/Screens/ArtWork/ListArtWork";
import FilterBox from "../../components/Screens/ArtWork/FilterBox";
import ItemsList from "../../components/Screens/ArtWork/ItemsList";

//rs : get methods helper
import { GetAuthUrl, PostAuthUrl } from "../api/config";
import { GET_ARTWORK_BY_FILTER, GET_FILTERDATA_IN_ARTWORK } from "../api";

//rs : url constants
import TopMenuMobile from "../../components/Screens/ArtWork/TopMenuMobile";
import ButtonAddArt from "../../components/Screens/ArtWork/ButtonAddArt";
import ArtWorks from "../../components/Screens/ArtWork/ArtWorks";
import PuttingItem from "../../components/Screens/ArtWork/PuttingItem";

export const ArtworkCount = createContext();

export default function ArtWork() {
  const { setCollectionItem, collectionItem, setHideHeader, HideHeader } = useContext(Context);

  const router = useRouter();
  // mrx : states ↓ -----------------------------------------------------------------------------------------------------------
  const [AddArtistModal, setAddArtistModal] = useState(false);
  const [Artworks, setArtworks] = useState();
  const [searchTerm, setSearchTerm] = useState();
  const [SearchData, setSearchData] = useState([]);
  const [filterBoxList, setFilterBoxList] = useState();
  const [filter, setFilter] = useState({});
  const [selectedArtwork, setSelectedArtwork] = useState();
  const [artWorkModal, setArtWorkModal] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(true);
  const [artWorkDetail, setArtWorkDetail] = useState(false);
  const [GridShow, setGridShow] = useState(true);
  const [timer, setTimer] = useState();
  const [Height, setHeight] = useState();

  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : get Collection id from localStorage ↓ -------------------------------------------------------------------------------
  const collectionID =
    typeof window !== "undefined"
      ? localStorage.getItem("collectionId") || 0
      : 0;
  // End -----------------------------------------------------------------------------------------------------------------------

  //rs : call get artworks list api --------------------------------------------------------------------------------------------
  const getArtworks = () => {
    PostAuthUrl(GET_ARTWORK_BY_FILTER(collectionID), {
      tagId: filter?.tags?.id,
      statuse: filter?.statuse?.id,
      sortBy: filter?.sortBy?.id ? filter?.sortBy?.id : null,
      searchText: searchTerm ? searchTerm : "",
    }).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          setArtworks(res.data.data);
          setSearchData(res.data.data);
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  };

  const getArtworksSearch = () => {
    PostAuthUrl(GET_ARTWORK_BY_FILTER(collectionID), {
      tagId: filter?.tags?.id,
      statuse: filter?.statuse?.id,
      sortBy: filter?.sortBy?.id,
      searchText: searchTerm ? searchTerm : "",
    }).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          // if (res?.data?.data?.length < 1)
          //   toast.info("No artworks found !!");
          // else
          setSearchData(res.data.data);
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  };
  // End -----------------------------------------------------------------------------------------------------------------------

  // rs : call get artwork filters API -----------------------------------------------------------------------------------------
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
  // End -----------------------------------------------------------------------------------------------------------------------

  // rs : Search table API -----------------------------------------------------------------------------------------------------
  useEffect(() => {
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      getArtworksSearch();
    }, 500);
    setTimer(newTimer);
  }, [searchTerm])

  // End -----------------------------------------------------------------------------------------------------------------------

  // good man : recocnize the page size ----------------------------------------------------------------------------------------
  const [width, height] = useWindowSize();
  // End -----------------------------------------------------------------------------------------------------------------------

  // open and close side menu --------------------------------------------------------------------------------------------------
  const DashboardHandle = () => {
    setDashboardOpen(!dashboardOpen);
  };
  // End -----------------------------------------------------------------------------------------------------------------------

  // open and close artwork modal ----------------------------------------------------------------------------------------------
  const artWorkHandle = () => {
    setArtWorkModal(!artWorkModal);
  };
  // End -----------------------------------------------------------------------------------------------------------------------

  // good man : when artworks clicked , a menu will open //rs : set selected artwork -------------------------------------------
  const menuArtWork_Open = (data) => {
    if (data?.classificationId === 0) {
      Cookies.set("Selected-item-artwork-type", data?.classificationId);
      localStorage.setItem(
        "Adding-Art-Work",
        JSON.stringify({
          SelectedClassificationID: parseInt(data?.classificationId),
        })
      );
      setArtWorkDetail(true);
      if(width<960){
        setHideHeader(true);
      }
      setSelectedArtwork(data);
    } else {
      Cookies.set("Selected-item-artwork-type", data?.classificationId);
      localStorage.setItem(
        "Adding-Art-Work",
        JSON.stringify({
          SelectedClassificationID: parseInt(data?.classificationId),
        })
      );
      router.push(`/artwork/${data?.artworkId}`);
    }
  };
  // End -----------------------------------------------------------------------------------------------------------------------

  // good man : when artworks clicked A menu will close -----------------------------------------------------------------------
  const menuArtWork_Close = () => {
    if(width<960){
      setHideHeader(false)
    }
    setArtWorkDetail(false);

  };
  // End -----------------------------------------------------------------------------------------------------------------------

  // good man : change type of showing list of artworks ( grid or list ) -------------------------------------------------------
  const hanldeGridShow = () => {
    setGridShow(true);
  };
  // End -----------------------------------------------------------------------------------------------------------------------

  // good man : Responsive  ----------------------------------------------------------------------------------------------------
  const hanldeListShow = () => {
    if (width > 960) {
      setGridShow(false);
    }
  };
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : Get artworks list on component did mount ----------------------------------------------------------------------------
  useEffect(() => {
    getArtworkFilters();
    handleRemoveLocalData();
    getArtworks();
    Cookies.remove("add-artist-from-artwork");
  }, []);

  useEffect(() => {
    getArtworkFilters();
    handleRemoveLocalData();
    getArtworks();
  }, [collectionItem]);
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : Get ArtWorks when filter --------------------------------------------------------------------------------------------
  useEffect(() => {
    // if (!JSON.stringify(filter?.statuse?.name !== null)) {
    getArtworksSearch();
    // }
  }, [filter]);
  // End -----------------------------------------------------------------------------------------------------------------------

  // removeing the data from local storage Start ----------------------------------------------------------------------
  const handleRemoveLocalData = () => {
    localStorage.removeItem("Add-ArtWork-Measurment");
    localStorage.removeItem("Add-Artwork-ArtistList");
    localStorage.removeItem("Minting-Data");
    localStorage.removeItem("ArtWork-Editions");
    localStorage.removeItem("ArtWork-Editions-Values");
    localStorage.removeItem("UploadingFileMedia-Limited");
    localStorage.removeItem("Add-Artwork-GeneralDescription");
    localStorage.removeItem("Add-Artwork-AvailibilityID");
    localStorage.removeItem("Add-Artwork-StyleMedium");
    localStorage.removeItem("ArtWork-Editions-Media-GET");
    localStorage.removeItem("ArtWork-Reproduction-Media-Meraged");
    localStorage.removeItem("Add-ArtWork-TrandferDateID");
    localStorage.removeItem("UploadingFileMedia");
    localStorage.removeItem("Add-ArtWork-Measurment");
    localStorage.removeItem("Add-Artwork-subMedium");
    localStorage.removeItem("Add-ArtWork-OwnershipID");
    localStorage.removeItem("Add-ArtWork-TransferTypeID");
    localStorage.removeItem("Add-Artwork-GeneralCreationyear");
    localStorage.removeItem("Add-Artwork-MediumType");
    localStorage.removeItem("Add-Artwork-GeneralTitle");
    localStorage.removeItem("Add-ArtWork-PriceID");
    localStorage.removeItem("Add-Artwork-CheckBoxValue");
    localStorage.removeItem("Add-Artwork-GeneralCreationyear");
    localStorage.removeItem("ArtWork-Proof");
    localStorage.removeItem("Add-ArtWork-Original");
    localStorage.removeItem("Add-Artwork-StatuseID");
    localStorage.removeItem("Reproduction-Media");
    localStorage.removeItem("Add-ArtWork-Reproduction");
    localStorage.removeItem("SelctedMediaID");
    localStorage.removeItem("ArtWork-SameMeida-CheckBox");
    localStorage.removeItem("Add-ArtWork-Limited-Media");
    localStorage.removeItem("ArtWork-Editions-Media");
    localStorage.removeItem("Original-Media");
  };
  //  End -------------------------------------------------------------------------------------------------------------

  // def variables
  var TopDef = 20;
  var LeftDef = 8.5;

  // break point (num of items in a row)
  var IncreaseBreakPoint = 5;
  var BreakPoint = 5;

  // space
  var Y_Space = 230;
  var X_Space = 235;

  // Top Position
  const Top = (index) => {
    if (index / BreakPoint > 1) {
      BreakPoint += IncreaseBreakPoint;
      TopDef += Y_Space;
      LeftDef = 8.5;
    }
    return `${TopDef}px`;
  };

  // set height parent of artworks
  setTimeout(() => {
    setHeight(TopDef);
  }, 500);

  // Left Position
  const Left = (index) => {
    const Temp = LeftDef;
    LeftDef += X_Space;
    return `${Temp}px`;
  };

  // set number of artworks in a row
  const SetBreakPoint = () => {
    if (width > 1900) {
      BreakPoint = 7;
    } else if (width > 1700) {
      BreakPoint = 6;
    } else if (width > 1500) {
      BreakPoint = 5;
    } else if (width > 1200) {
      BreakPoint = 4;
    } else if (width <= 1200 && width > 960) {
      BreakPoint = 3;
    }
    if (artWorkDetail) {
      if (width > 2200) {
        BreakPoint = 6;
      } else if (width > 1950) {
        BreakPoint = 5;
      } else if (width > 1650) {
        BreakPoint = 4;
      } else if (width > 1450) {
        BreakPoint = 3;
      } else if (width > 1200) {
        BreakPoint = 2;
      } else if (width > 960) {
        BreakPoint = 1;
      }
    }
    if (!dashboardOpen) {
      BreakPoint++;
    }
    IncreaseBreakPoint = BreakPoint;
  };
  //
  return (
    <>
      {SetBreakPoint()}
      {Artworks?.length >= 1 ? (
        <>
          <Grid item>
            {/* this is for mobile mood, when artwork detail is open , wen hide some components */}
            {/* {!(width < 960 && artWorkDetail) && (
              <HeaderLanding
                DashboardHandle={DashboardHandle}
                haveAction={true}
              />
            )} */}

            <Grid container direction="row">
              <ArtworkCount.Provider value={Artworks.length}>
                {/* <SideMenu
                  dashboardOpen={dashboardOpen}
                  pageName="All artworks"
                /> */}
              </ArtworkCount.Provider>

              <Grid item className={ArtWorkStyle.container_artwork}>
                <Grid item className={ArtWorkStyle.P_artistNav}>
                  <Grid container spacing={3} direction="column">
                    {/* this is for mobile mood, when artwork detail is open , we hide some components */}
                    {!(width < 960 && artWorkDetail) && (
                      <Grid item>
                        <Grid
                          container
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Hidden smDown>
                            <Grid item style={{ marginBottom: "30px" }}>
                              <Grid
                                container
                                spacing={1}
                                className={ArtWorkStyle.Artist_Text}
                              >
                                <Grid item style={{ marginRight: '5px' }}>
                                  <Badge variant="dot" color="error"></Badge>
                                </Grid>
                                {/* <Grid item>On transit artworks </Grid> */}
                                <Grid item>Artworks </Grid>
                              </Grid>
                            </Grid>
                            <ButtonAddArt />
                          </Hidden>
                        </Grid>
                      </Grid>
                    )}

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
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Grid item className={ArtWorkStyle.searchImg}>
                              <Image src={searchImg} />
                            </Grid>
                          </Grid>

                          <FilterBox
                            getArtworksSearch={getArtworksSearch}
                            hanldeGridShow={hanldeGridShow}
                            hanldeListShow={hanldeListShow}
                            GridShow={GridShow}
                            onFilter={setFilter}
                            data={filterBoxList}
                            Width = "120px"

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
                      style={{ position: "relative" }}
                    >
                      {/* desktop Artworks */}
                      {GridShow && !(width < 960 && artWorkDetail) && (
                        <>
                          <Grid
                            item
                            className={ArtWorkStyle.XXX}
                            style={{ height: width > 960 ? `${Height + 220}px` : 'auto' }}
                          >
                            <Hidden smDown>
                              {SearchData?.map((item, index) => (
                                <Grid
                                  item
                                  style={{
                                    top: Top(index + 1),
                                    left: Left(index),
                                  }}
                                  className={ArtWorkStyle.BoxTest}
                                >
                                  <ArtWorks
                                    item={item}
                                    onClick={() => menuArtWork_Open(item)}
                                  />
                                </Grid>
                              ))}
                            </Hidden>

                            <Hidden mdUp>
                              {SearchData?.map((item, index) => (
                                <ArtWorks
                                  item={item}
                                  onClick={() => menuArtWork_Open(item)}
                                />
                              ))}
                            </Hidden>
                          </Grid>
                        </>
                      )}

                      {/* artwork table list */}

                      {!GridShow && !(width < 960 && artWorkDetail) && (
                        <ListArtWork
                          menuArtWork={menuArtWork_Open}
                          dashboardOpen={dashboardOpen}
                          artWorkDetail={artWorkDetail}
                          ArtWorksData={SearchData}
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
      ) : (
        <Grid item>
          {/* <Header DashboardHandle={DashboardHandle} haveAction={true} /> */}
          <Grid container direction="row">
            {/* <SideMenu dashboardOpen={dashboardOpen} pageName="All artworks" /> */}

            <Grid item className={ArtWorkStyle.container_artwork}>
              <Grid item className={ArtWorkStyle.P_artistNav_empty}>
                <Hidden mdUp>
                  <Grid item className={ArtWorkStyle.p_TopMenu}>
                    <TopMenuMobile />
                  </Grid>
                </Hidden>

                <Hidden smDown>
                  <Grid container className={ArtWorkStyle.Artist_Text}>
                    <Grid item className={ArtWorkStyle.badgeArtist}>
                      <Badge variant="dot" color="error"></Badge>
                    </Grid>
                    <Grid item>Artworks </Grid>
                  </Grid>
                </Hidden>

                <Grid
                  container
                  alignItems="center"
                  justifyContent="center"
                  style={{ height: "100%" }}
                >
                  <Grid item >
                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      style={{ height: "100%" }}
                      className={ArtWorkStyle.C_Artist_Empty_Page}
                    >
                      <Grid item className={ArtWorkStyle.Artist_title_empty}>
                        <Grid
                          container
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Grid item>
                            <Image src={ImageArtistPage} />
                          </Grid>
                          <Grid item className={ArtWorkStyle.CreateArtwork}>Create a new artwork</Grid>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        className={ArtWorkStyle.Artist_description_empty}
                      >
                        This is where you’ll add products and manage your
                        pricing. You can also import and export your product
                        inventory.
                      </Grid>
                      <ButtonAddArt is_middle={true} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
      <ModalAddArtist
        openModal={AddArtistModal}
        handleModal={() => setAddArtistModal(false)}
      />

      {AddArtistModal === true ? (
        <AddArtWork openModal={artWorkModal} handleModal={artWorkHandle} />
      ) : (
        <></>
      )}
    </>
  );
}
