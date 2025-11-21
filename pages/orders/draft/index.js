import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Link from "next/link";

// mrx : material ui ↓
import { Hidden, Button, Grid } from "@material-ui/core";

// mrx : styles ↓
import Style from "../../../styles/Orders.module.css";

// rmx : files  ↓
import plusCircle from "../../../public/images/icons/Plus - Circle white.svg";
import searchImg from "../../../public/images/icons/Search.svg";
import imgEmpty from "../../../public/images/Mask.png";

// mrx : components ↓
import TableDraftOrders from "../../../components/Screens/Orders/common/TableDraftOrders";
import FilterBoxCTS from "../../../components/Screens/Orders/common/FilterBoxCTS";
import useWindowSize from "../../../Hooks/useWindowSize";
import TopMenuMobile from "../../../components/Screens/Orders/common/TopMenuMobile";

//rs : urls  and api helper methods
import { GetAuthUrl, PostAuthUrl, GetUrl } from "../../api/config";

import {
  GET_DRAFT_ORDER_LIST,
  FILTER_DRAFT_ORDER_LIST,
  ARCHIVE_ARTIST,
  SAVE_ARTIST,
  GET_DARFT_ORDER_LIST_DATA_BY_COLLECTION_ID,
} from "../../api";

// mrx : context ↓
import { Context } from "../../../context/index";
import FilterBox from "../../../components/Screens/Contact/FilterBox";


export default function Draft() {
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
  const [FilterData, setFilterData] = useState([]);
  const [filter, setFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState(" ");
  const [TypeFilter, setTypeFilter] = useState(0);
  const [SortFilter, setSortFilter] = useState(0);
  const [HaveData, setHaveData] = useState(false);
  const [SelectedDraftID, setSelectedDraftID] = useState(0);
  const [DraftOrderList, setDraftOrderList] = useState([]);
  const [timer, setTimer] = useState();
  const [LoadingDraftData, setLoadingDraftData] = useState(false);

  // mrx : recocnize the page size
  const [width, height] = useWindowSize();

  useEffect(() => {
    if (searchTerm === " ") {
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
    handleGetAllDraftOrderList()
  }, [collectionItem])

  // mrx : get contact list
  const handleGetAllDraftOrderList = () => {
    setLoadingDraftData(true);
    GetAuthUrl(GET_DRAFT_ORDER_LIST(GET_COLLECTION_ID)).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          setDraftOrderList(res.data.data);
          setHaveData(res?.data?.data?.lenght ? true : false);
          setLoadingDraftData(false);
        } else {
          toast.error(res?.data?.message);
          setLoadingDraftData(false);
        }
      } else {
        toast.error("something went wrong !");
        setLoadingDraftData(false);
      }
    });
  }

  // mrx : get contact list
  const handleGetAllFilterData = () => {
    setLoadingDraftData(true);
    GetAuthUrl(GET_DARFT_ORDER_LIST_DATA_BY_COLLECTION_ID(GET_COLLECTION_ID)).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          setFilterData(res.data.data);
          setLoadingDraftData(false);
        } else {
          toast.error(res?.data?.message);
          setLoadingDraftData(false);
        }
      } else {
        toast.error("something went wrong !");
        setLoadingDraftData(false);
      }
    });
  }

  // filter artist
  const GetContactsFiltred = () => {
    console.log("ali : " + SortFilter + " " + TypeFilter)
    if (
      SortFilter !== 0 ||
      TypeFilter !== 0 ||
      searchTerm !== " "
    ) {
      setLoadingDraftData(true);
      PostAuthUrl(FILTER_DRAFT_ORDER_LIST(GET_COLLECTION_ID), {
        "search": searchTerm.trim(),
        "type": TypeFilter,
        "sortBy": SortFilter
      }).then((res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            setDraftOrderList(res.data.data);
            setLoadingDraftData(false);
          } else {
            toast.error(res?.data?.message);
            setLoadingDraftData(false);
          }
        } else {
          toast.error("something went wrong !");
          setLoadingDraftData(false);
        }
      });
    } else {
      setLoadingDraftData(false);
    }
  };

  useEffect(() => {
    GetContactsFiltred();
  }, [filter]);

  // mrx : archive Contact
  const handleArchiveDraftOrder = () => {
    GetAuthUrl(ARCHIVE_ARTIST(GET_COLLECTION_ID, SelectedArtistID)).then(
      (res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            setDraftOrderList(res?.data?.data);
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
    // handleGetAllDraftOrderList();
    handleGetAllFilterData();
  }, [])

  // mrx : save artist
  const handleSaveDraft = (artistID) => {
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
        <Grid container direction="row">

          <Grid item className={Style.Wrapper}>
            <TopMenuMobile PageName="Draft Orders" />
            <Grid item className={Style.P_artistNav}>
              <Grid container direction="column">
                <Grid item className={Style.p_contact}>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item className={Style.titleText}>
                      <span className={Style.badgeGreen}></span>Draft orders
                    </Grid>
                    <Grid item className={Style.P_Create}>
                      <Link href="/orders/add">
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<img src={plusCircle.src} />}
                          className={Style.Create}
                        >
                          Create Draft
                        </Button>
                      </Link>
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
                      placeholder="Search order"
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={Style.tiny_search}
                    />
                    <Grid item className={Style.searchImg}>
                      <img src={searchImg.src} />
                    </Grid>
                  </Grid>
                  <FilterBoxCTS
                    setSortFilter={setSortFilter}
                    setTypeFilter={setTypeFilter}
                    FilterData={FilterData}
                    onFilter={() => setFilter(!filter)}
                    saved={false}
                    onSaved={() => setSaved(!saved)}
                  />
                </Grid>

                <TableDraftOrders
                  searchTerm={searchTerm}
                  TypeFilter={TypeFilter}
                  SortFilter={SortFilter}
                  // category={CatFilter}
                  sortBy={SortFilter}

                  LoadingDraftData={LoadingDraftData}
                  handleSaveDraft={handleSaveDraft}
                  LoadingData={LoadingDraftData}
                  data={DraftOrderList}
                  setDraftOrderList={setDraftOrderList}
                  setSelectedDraftID={setSelectedDraftID}
                  handleArchiveDraftOrder={() => handleArchiveDraftOrder()}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid item>
        <Grid container direction="row">

          {/* start contact area */}
          <Grid item className={Style.Wrapper}>
            <Hidden smDown>
              <Grid item className={Style.titleText}>
                <span className={Style.badgeGreen}></span>Draft orders
              </Grid>
            </Hidden>
            <TopMenuMobile PageName="Draft Orders" />


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
              <Grid item className={Style.text_manage_noWidth}>
                {width > 960
                  ? "Manage orders and Out going Artworks"
                  : "Manage Consignment orders and incoming inventory"}
              </Grid>
              <Grid item className={Style.text_product}>
                This is where you’ll add products and manage your pricing. You
                can also import and export your product inventory.
              </Grid>

              <Grid item>
                <Link href="/orders/add">
                  <Button
                    variant="contained"
                    color="primary"
                    className={Style.addButton}
                  >
                    {width > 960 ? "Create a New" : "Add Exhibition"}
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          {/* end contact area */}
        </Grid>
      </Grid>
    );
  }
}
