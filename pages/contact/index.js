import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

// mrx : material ui ↓
import { Hidden, Button, Grid } from "@material-ui/core";

// mrx : styles ↓
import Style from "../../styles/Contacts.module.css";

// rmx : files  ↓
import plusCircle from "../../public/images/icons/Plus - Circle white.svg";
import searchImg from "../../public/images/icons/Search.svg";
import imgEmpty from "../../public/images/Mask.png";

// mrx : components ↓
import Header from "../../components/common/header";
import SideMenu from "../../components/Screens/Artist/SideMenu";
import AddContact from "../../components/Modals/Contact/AddContact";
import TableContacts from "../../components/Screens/Contact/TableContacts";
import useWindowSize from "../../Hooks/useWindowSize";

//rs : urls  and api helper methods
import { GetAuthUrl, PostAuthUrl, GetUrl } from "../api/config";

import {
  GET_COLLECTION_LIST_BY_COLLECTION_ID,
  FILTER_CONTACT_LIST,
  ARCHIVE_ARTIST,
  SAVE_ARTIST,
  GET_CONTACT_LIST_BY_COLLECTION_ID,
} from "../api";

// mrx : context ↓
import { Context } from "../../context/index";
import FilterBox from "../../components/Screens/Contact/FilterBox";

// mrx : Contacts List ↓
export default function Contacts() {
  // mrx : states ↓
  //rs : router
  const router = useRouter();
  // mrx : context
  const { saved, setSaved, collectionItem } = useContext(Context);
  const GET_COLLECTION_ID =
    typeof window !== "undefined"
      ? localStorage.getItem("collectionId") || "[]"
      : "[]";

  // mrx : states ↓
  const [ModalAddContact, setModalAddContact] = useState(false);
  const [FilterData, setFilterData] = useState([]);
  const [filter, setFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState(" ");
  const [CatFilter, setCatFilter] = useState(0);
  const [LastActivity, setLastActivity] = useState(0);
  const [TagFilter, setTagFilter] = useState("");
  const [SortFilter, setSortFilter] = useState(0);
  const [HaveData, setHaveData] = useState(false);
  const [SelectedArtistID, setSelectedArtistID] = useState(0);
  const [ContactList, setContactList] = useState([]);
  const [timer, setTimer] = useState();
  const [LoadingContactData, setLoadingContactData] = useState(false);

  // mrx : recocnize the page size
  const [width, height] = useWindowSize();

  useEffect(() => {
    if (searchTerm === "") {
      GetContactsFiltred();
    } else {
      clearTimeout(timer);
      const newTimer = setTimeout(() => {
        GetContactsFiltred();
      }, 500);
    }
    // setTimer(newTimer);
  }, [searchTerm]);

  useEffect(() => {
    handleGetAllContactList()
  }, [collectionItem])

  // mrx : get contact list
  const handleGetAllContactList = () => {
    setLoadingContactData(true);
    GetAuthUrl(GET_COLLECTION_LIST_BY_COLLECTION_ID(GET_COLLECTION_ID)).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          setContactList(res.data.data);
          setHaveData(res.data.data ? true : false);
          setLoadingContactData(false);
        } else {
          toast.error(res?.data?.message);
          setLoadingContactData(false);
        }
      } else {
        toast.error("something went wrong !");
        setLoadingContactData(false);
      }
    });
  }

  // mrx : get contact list
  const handleGetAllFilterData = () => {
    setLoadingContactData(true);
    GetAuthUrl(GET_CONTACT_LIST_BY_COLLECTION_ID(GET_COLLECTION_ID)).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          setFilterData(res.data.data);
          setLoadingContactData(false);
        } else {
          toast.error(res?.data?.message);
          setLoadingContactData(false);
        }
      } else {
        toast.error("something went wrong !");
        setLoadingContactData(false);
      }
    });
  }

  // filter artist
  const GetContactsFiltred = () => {
    if (
      CatFilter !== 0 ||
      SortFilter !== 0 ||
      TagFilter !== "" ||
      LastActivity !== 0 ||
      searchTerm !== " "
    ) {
      setLoadingContactData(true);
      PostAuthUrl(FILTER_CONTACT_LIST(GET_COLLECTION_ID), {
        collectionId: GET_COLLECTION_ID,
        category: CatFilter,
        sortBy: SortFilter,
        lastActivity: LastActivity,
        tag: TagFilter,
        search: searchTerm,
      }).then((res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            setContactList(res.data.data);
            setLoadingContactData(false);
          } else {
            toast.error(res?.data?.message);
            setLoadingContactData(false);
          }
        } else {
          toast.error("something went wrong !");
          setLoadingContactData(false);
        }
      });
    } else {
      setLoadingContactData(false);
    }
  };

  useEffect(() => {
    GetContactsFiltred();
  }, [filter]);

  // mrx : archive Contact
  const handleArchiveContact = () => {
    GetAuthUrl(ARCHIVE_ARTIST(GET_COLLECTION_ID, SelectedArtistID)).then(
      (res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            setContactList(res?.data?.data);
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

  useEffect(() => {
    if (saved === true) {
      router.push("/contact");
    }

    // get artist filter lsit
    // handleGetAllContactList();
    handleGetAllFilterData();
  }, [])

  // mrx : save artist
  const handleSaveContact = (artistID) => {
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

  if (HaveData) {
    return (
      <Grid item>
        {/* <Header DashboardHandle={DashboardHandle} /> */}
        <Grid container direction="row">
          {/* <SideMenu dashboardOpen={dashboardOpen} pageName="Contact" /> */}

          <Grid item className={Style.Wrapper}>
            <Grid item className={Style.P_artistNav}>
              <Grid container direction="column">
                <Grid item className={Style.p_contact}>
                  <Grid container justifyContent="space-between">
                    <Grid item className={Style.titleText}>
                      <span className={Style.badgeGreen}></span>Contacts
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Image src={plusCircle} />}
                        className={Style.btnAdd}
                        onClick={() => setModalAddContact(true)}
                      >
                        Add Contact
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  direction="row"
                  className={Style.P_search_Filter}
                >
                  <Grid item className={Style.P_tiny_search}>
                    <input
                      type="search"
                      placeholder="Search Contact"
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={Style.tiny_search}
                    />
                    <Grid item className={Style.searchImg}>
                      <Image src={searchImg} />
                    </Grid>
                  </Grid>
                  <FilterBox
                    setCatFilter={setCatFilter}
                    setLastActivity={setLastActivity}
                    setSortFilter={setSortFilter}
                    setTagFilter={setTagFilter}
                    FilterData={FilterData}
                    onFilter={() => setFilter(!filter)}
                    saved={false}
                    onSaved={() => setSaved(!saved)}
                    linkSave="/contact/saved"
                    haveLastActivity={true}
                  />
                </Grid>

                <TableContacts
                  category={CatFilter}
                  sortBy={SortFilter}
                  lastActivity={LastActivity}
                  tag={TagFilter}
                  search={searchTerm}

                  LoadingContactData={LoadingContactData}
                  handleSaveContact={handleSaveContact}
                  LoadingData={LoadingContactData}
                  data={ContactList}
                  setContactList={setContactList}
                  saved={false}
                  setSelectedArtistID={setSelectedArtistID}
                  handleArchiveArtist={() => handleArchiveContact()}
                />
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
        {/* <Header DashboardHandle={DashboardHandle} /> */}
        <Grid container direction="row">
          {/* <SideMenu dashboardOpen={dashboardOpen} pageName="Contact" /> */}

          {/* start contact area */}
          <Grid item className={Style.Wrapper}>
            <Grid item className={Style.titleText}>
              <span className={Style.badgeGreen}></span>Contacts
            </Grid>

            {/* empty contacts */}
            <Grid
              container
              alignItems="center"
              direction="column"
              justifyContent="center"
              className={Style.p_empty}
            >
              <Grid item className={Style.img_mask}>
                <img src={imgEmpty.src} />
              </Grid>
              <Grid item className={Style.text_manage}>
                Manage your Contacts
              </Grid>
              <Grid item className={Style.text_product}>
                This is where you’ll add products and manage your pricing. You
                can also import and export your product inventory.
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  className={Style.addButton}
                  onClick={() => setModalAddContact(true)}
                >
                  Add Contact
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
