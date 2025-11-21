import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

// mrx : material ui ↓
import { Hidden, Button, Badge, Grid, IconButton } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

// mrx : components ↓
import Header from "../../components/common/header";
import SideMenu from "../../components/Screens/Artist/SideMenu";
import ModalAddArtist from "../../components/Modals/ModalAddArtist";
import useWindowSize from "../../Hooks/useWindowSize";
import withAuth from "../../components/common/withAuth";

// mrx : styles ↓
import ArtistStyle from "../../styles/artist.module.css";
import Style from "../../styles/Home.module.css";

// rmx : files  ↓
import plusCircle from "../../public/images/icons/Plus - Circle white.svg";
import searchImg from "../../public/images/icons/Search.svg";
import ImageArtistPage from "../../public/images/Mask.png";
import close from "../../public/images/icons/Close1.svg";

// mrx : Icons ↓
import FilterBox from "../../components/Screens/Artist/FilterBox";
import ListArtists from "../../components/Screens/Artist/ListArtists";

//rs : urls  and api helper methods
import { GetAuthUrl, PostAuthUrl, GetUrl } from "../api/config";
import {
  GET_ARTIST_FILTER_LIST,
  FILTER_ARTIST_LIST,
  ARCHIVE_ARTIST,
  SAVE_ARTIST,
  COLLECTION_ARTIST
} from "../api";

// mrx : context ↓
import { Context } from "../../context/index";

// mrx : Artist List ↓
function ArtistsList() {
  //rs : router
  const router = useRouter();
  // mrx : context
  const { ArtistList, setArtistList, saved, setSaved } = useContext(Context);
  const GET_COLLECTION_ID =
    typeof window !== "undefined"
      ? localStorage.getItem("collectionId") || "[]"
      : "[]";

  // mrx : states ↓
  const [AddArtistModal, setAddArtistModal] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(true);
  const [FilterData, setFilterData] = useState([]);
  const [filter, setFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState(" ");
  const [CatFilter, setCatFilter] = useState(0);
  const [TagFilter, setTagFilter] = useState("");
  const [SortFilter, setSortFilter] = useState(0);
  const [HaveData, setHaveData] = useState(false);
  const [SelectedArtistID, setSelectedArtistID] = useState(0);
  const [timer, setTimer] = useState(0);

  // mrx : recocnize the page size
  const [width, height] = useWindowSize();

  // mrx : functions ↓
  const DashboardHandle = () => {
    setDashboardOpen(!dashboardOpen);
  };

  useEffect(() => {
    const newTimer = setTimeout(() => {
      GetArtistFiltred();
    }, 500);
    if (searchTerm === "") {
      GetArtistFiltred();
    } else {
      clearTimeout(timer);
    }
    setTimer(newTimer);
  }, [searchTerm]);

  // get artist filter lsit

  const handleGetAllArtist = () => {
    GetAuthUrl(GET_ARTIST_FILTER_LIST(GET_COLLECTION_ID)).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          setFilterData(res.data.data);
          setHaveData(res.data.data ? true : false);
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });

    GetAuthUrl(COLLECTION_ARTIST + `/${GET_COLLECTION_ID}/false/${saved}`).then(
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

  useEffect(() => {

  }, []);

  // filter artist
  const GetArtistFiltred = () => {
    if (
      CatFilter !== 0 ||
      SortFilter !== 0 ||
      TagFilter !== "" ||
      searchTerm !== " "
    ) {
      PostAuthUrl(FILTER_ARTIST_LIST(GET_COLLECTION_ID), {
        enumCategorySearchArtist: CatFilter,
        enumSortBySearchArtist: SortFilter,
        taggedWith: TagFilter,
        search: searchTerm,
        inSaved: saved,
      }).then((res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            setArtistList(res.data.data);
          } else {
            toast.error(res?.data?.message);
          }
        } else {
          toast.error("something went wrong !");
        }
      });
    }
  };

  useEffect(() => {
    GetArtistFiltred();
  }, [filter]);

  // mrx : archive artist
  const handleArchiveArtist = () => {
    GetAuthUrl(ARCHIVE_ARTIST(GET_COLLECTION_ID, SelectedArtistID)).then(
      (res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            setArtistList(res?.data?.data);
            toast.success(`successfully Done`);
          } else {
            toast.error(res?.data?.message);
          }
        } else {
          toast.error("something went wrong !");
        }
      }
    );
  };

  // mrx : save artist
  const handleSaveArtist = (artistID) => {
    GetAuthUrl(SAVE_ARTIST(GET_COLLECTION_ID, artistID)).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          setArtistList(res?.data?.data);
          toast.success(`successfully Done`);
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  };

  useEffect(() => {
    if (saved === true) {
      router.push("/artist/saved")
    }
    handleGetAllArtist()
  }, [])

  if (HaveData === true || saved) {
    return (
      <Grid item>
        <Grid container direction="row">
          <Grid item className={ArtistStyle.container_artist}>
            <Grid item className={ArtistStyle.P_artistNav}>
              <Grid container spacing={3} direction="column">
                <Grid item className={ArtistStyle.p_wrapperBtn}>
                  <Grid container justifyContent="space-between">
                    <Hidden smDown>
                      <Grid item>
                        <Grid
                          container
                          spacing={2}
                          className={ArtistStyle.Artist_Text}
                        >
                          <Grid item>
                            <Badge variant="dot" color="error"></Badge>
                          </Grid>
                          <Grid item>Artists </Grid>
                        </Grid>
                      </Grid>
                    </Hidden>
                    <Grid
                      item
                      className={width < 960 ? ArtistStyle.Btn_add : ""}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={
                          width > 960 ? <Image src={plusCircle} /> : ""
                        }
                        className={`${ArtistStyle.btnAdd} ${Style.w_100}`}
                        onClick={() => setAddArtistModal(true)}
                      >
                        Add Artist
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  direction="row"
                  className={ArtistStyle.P_search_Filter}
                >
                  <Grid item className={ArtistStyle.P_tiny_search}>
                    <input
                      type="search"
                      placeholder="Search artist"
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={ArtistStyle.tiny_search}
                    />
                    <Grid item className={ArtistStyle.searchImg}>
                      <Image src={searchImg} />
                    </Grid>
                  </Grid>
                  <FilterBox
                    setCatFilter={setCatFilter}
                    setSortFilter={setSortFilter}
                    setTagFilter={setTagFilter}
                    FilterData={FilterData}
                    onFilter={() => setFilter(!filter)}
                    saved={false}
                    onSaved={() => setSaved(!saved)}
                    linkSave="/artist/saved"
                  />
                </Grid>

                <ListArtists
                  data={ArtistList}
                  handleSaveArtist={handleSaveArtist}
                  saved={false}
                  setSelectedArtistID={setSelectedArtistID}
                  handleArchiveArtist={() => handleArchiveArtist()}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <ModalAddArtist
          openModal={AddArtistModal}
          handleModal={() => setAddArtistModal(false)}
        />
      </Grid>
    );
  } else {
    return (
      <Grid item>
        {/* <Header DashboardHandle={DashboardHandle} haveAction={true} /> */}
        <Grid container direction="row">
          {/* <SideMenu dashboardOpen={dashboardOpen} pageName="All Artist" /> */}

          <Grid item className={ArtistStyle.container_artist_empty}>
            <Grid item className={ArtistStyle.P_artistNav_1}>
              <Grid
                container
                direction="column"
                className={ArtistStyle.C_Artist_Empty_Page}
                spacing={3}
              >
                <Grid item className={ArtistStyle.Artist_title_empty}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid item>
                      <Image src={ImageArtistPage} />
                    </Grid>
                    <Grid item>Manage your Artists</Grid>
                  </Grid>
                </Grid>
                <Grid item className={ArtistStyle.Artist_description_empty}>
                  This is where you’ll add products and manage your pricing. You
                  can also import and export your product inventory.
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    className={ArtistStyle.button_emptyList}
                    onClick={() => setAddArtistModal(true)}
                  >
                    Add Artist
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <ModalAddArtist
          openModal={AddArtistModal}
          handleModal={() => setAddArtistModal(false)}
        />
      </Grid>
    );
  }
}
export default ArtistsList;
