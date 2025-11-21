import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

// mrx : material ui ↓
import { Button, Grid } from "@material-ui/core";

// mrx : styles ↓
import ArtWorkStyle from "../../styles/artworkflow.module.css";

// rmx : files  ↓
import plusCircle from "../../public/images/icons/Plus - Circle white.svg";
import searchImg from "../../public/images/icons/Search.svg";
import imgEmpty from "../../public/images/Mask.png";
import imageArtwork from "../../public/images/image ArtworkModal.png";

// mrx : components ↓
import Header from "../../components/common/header";
import SideMenu from "../../components/Screens/Artist/SideMenu";
import useWindowSize from "../../Hooks/useWindowSize";
import FilterBox from "../../components/Screens/Artist/FilterBox";
import AddContact from "../../components/Modals/Contact/AddContact";

//rs : urls  and api helper methods

//rs : urls  and api helper methods
import { GetAuthUrl, PostAuthUrl, GetUrl } from "../api/config";
import {
  GET_ARTIST_FILTER_LIST,
  FILTER_ARTIST_LIST,
  ARCHIVE_ARTIST,
  SAVE_ARTIST,
} from "../api";

// mrx : context ↓
import { Context } from "../../context/index";
import FilterBoxList from "../../components/Screens/ArtWork/FilterBoxList";
import TableList from "../../components/Screens/ArtWork/TableList";

// mrx : Contacts List ↓
export default function Contacts() {
  const router = useRouter();
  // mrx : context
  const { setArtistList, saved, setSaved } = useContext(Context);
  const GET_COLLECTION_ID =
    typeof window !== "undefined"
      ? localStorage.getItem("collectionId") || "[]"
      : "[]";

  // mrx : states ↓
  const [ModalAddContact, setModalAddContact] = useState(false);
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
  // const [width, height] = useWindowSize();

  // mrx : functions ↓
  const DashboardHandle = () => {
    setDashboardOpen(!dashboardOpen);
  };

  useEffect(() => {
    if (searchTerm === "") {
      GetArtistFiltred();
    } else {
      clearTimeout(timer);
      const newTimer = setTimeout(() => {
        GetArtistFiltred();
      }, 500);
    }
    setTimer(newTimer);
  }, [searchTerm]);

  // get artist filter lsit
  useEffect(() => {
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

  if (true) {
    return (
      <Grid item>
        {/* <Header DashboardHandle={DashboardHandle} haveAction={true} /> */}
        <Grid container direction="row">
          {/* <SideMenu dashboardOpen={dashboardOpen} pageName="All artworks" /> */}

          <Grid item className={ArtWorkStyle.Wrapper}>
            <Grid item className={ArtWorkStyle.P_artistNav}>
              <Grid container direction="column">
                <Grid item className={ArtWorkStyle.p_contact}>
                  <Grid container justifyContent="space-between">
                    <Grid item className={ArtWorkStyle.titleText}>
                      <span className={ArtWorkStyle.badgeGreen_1}></span>Lists
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Image src={plusCircle} />}
                        className={ArtWorkStyle.btnAdd_1}
                        onClick={() => setModalAddContact(true)}
                      >
                        Create a Collection
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  direction="row"
                  className={ArtWorkStyle.P_search_Filter_1}
                >
                  <Grid item className={ArtWorkStyle.P_tiny_search_1}>
                    <input
                      type="search"
                      placeholder="Search artwork name"
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={ArtWorkStyle.tiny_search_1}
                    />
                    <Grid item className={ArtWorkStyle.searchImg_1}>
                      <Image src={searchImg} />
                    </Grid>
                  </Grid>
                  <FilterBoxList
                    setCatFilter={setCatFilter}
                    setSortFilter={setSortFilter}
                    setTagFilter={setTagFilter}
                    FilterData={FilterData}
                    onFilter={() => setFilter(!filter)}
                    saved={false}
                    onSaved={() => setSaved(!saved)}
                    linkSave="/contact/savedcontacts"
                    haveLastActivity={true}
                  />
                </Grid>

                {/* <TableList /> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* modals */}
        <AddContact
          open={ModalAddContact}
          handleModal={() => setModalAddContact(false)}
        />
      </Grid>
    );
  } else {
    return (
      <Grid item>
        {/* <Header DashboardHandle={DashboardHandle} haveAction={true} /> */}
        <Grid container direction="row">
          {/* <SideMenu dashboardOpen={dashboardOpen} pageName="Contact" /> */}

          {/* start contact area */}
          <Grid item className={ArtWorkStyle.Wrapper_1}>
            <Grid item className={ArtWorkStyle.titleText}>
              <span className={ArtWorkStyle.badgeGreen_1}></span>Collections
            </Grid>

            {/* empty contacts */}
            <Grid
              container
              alignItems="center"
              direction="column"
              justifyContent="center"
              className={ArtWorkStyle.p_empty}
            >
              <Grid item className={ArtWorkStyle.img_mask}>
                <img src={imageArtwork.src} />
              </Grid>
              <Grid item className={ArtWorkStyle.text_manage}>
                Manage your Artworks
              </Grid>
              <Grid item className={ArtWorkStyle.text_product}>
                This is where you’ll add products and manage your pricing. You
                can also import and export your product inventory.
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  className={ArtWorkStyle.addButton}
                  onClick={() => setModalAddContact(true)}
                >
                  Create a Collection
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {/* end contact area */}
        </Grid>

        {/* modals */}
        <AddContact
          open={ModalAddContact}
          handleModal={() => setModalAddContact(false)}
        />
      </Grid>
    );
  }
}
