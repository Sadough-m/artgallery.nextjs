import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

// mrx : material ui ↓
import { Hidden, Button, Grid } from "@material-ui/core";

// mrx : styles ↓
import Style from "../../styles/Orders.module.css";

// rmx : files  ↓
import plusCircle from "../../public/images/icons/Plus - Circle white.svg";
import searchImg from "../../public/images/icons/Search.svg";
import imgEmpty from "../../public/images/Mask.png";

// mrx : components ↓
import Header from "../../components/common/header";
import SideMenu from "../../components/Screens/Artist/SideMenu";
import TableOrders from "../../components/Screens/Orders/common/TableOrders";
import FilterBox from "../../components/Screens/Orders/common/FilterBox";
import TopMenuMobile from "../../components/Screens/Orders/common/TopMenuMobile";
import useWindowSize from "../../Hooks/useWindowSize";

//rs : urls  and api helper methods
import { GetAuthUrl, PostAuthUrl, GetUrl } from "../api/config";

import {
  GET_ORDER_LIST,
  FILTER_ORDER_LIST,
  ARCHIVE_ARTIST,
  ARCHIVE_ORDER_LIST,
  GET_ORDER_LIST_DATA_BY_COLLECTION_ID,
} from "../api";

// mrx : context ↓
import { Context } from "../../context/index";

// mrx : Contacts List ↓
export default function Orders() {
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

  const [HaveData, setHaveData] = useState(false);
  const [SelectedDraftID, setSelectedDraftID] = useState(0);
  const [OrderList, setOrderList] = useState([]);
  const [timer, setTimer] = useState();
  const [LoadingDraftData, setLoadingDraftData] = useState(false);

  const [TypeFilter, setTypeFilter] = useState(0);
  const [SortFilter, setSortFilter] = useState(0);
  const [SortDestination, setSortDestination] = useState(0);
  const [SorStatuse, setSorStatuse] = useState(0);

  const [ModalArchive, setModalArchive] = useState(false);

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
    setTimer(newTimer);
  }, [searchTerm]);

  useEffect(() => {
    handleGetAllOrderList()
  }, [collectionItem])

  // mrx : get contact list
  const handleGetAllOrderList = () => {
    setLoadingDraftData(true);
    GetAuthUrl(GET_ORDER_LIST(GET_COLLECTION_ID)).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          setOrderList(res.data.data);
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
    GetAuthUrl(GET_ORDER_LIST_DATA_BY_COLLECTION_ID(GET_COLLECTION_ID)).then((res, err) => {
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
    if (
      SortFilter !== 0 ||
      TypeFilter !== 0 ||
      SortDestination !== 0 ||
      SortDestination !== 0 ||
      searchTerm !== " "
    ) {
      setLoadingDraftData(true);
      PostAuthUrl(FILTER_ORDER_LIST(GET_COLLECTION_ID), {
        "search": searchTerm.trim(),
        "type": TypeFilter,
        "sortBy": SortFilter,
        "destination": SortDestination,
        "status": SorStatuse,
      }).then((res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            setOrderList(res.data.data);
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

  useEffect(() => {
    if (saved === true) {
      router.push("/contact");
    }

    // get artist filter lsit
    // handleGetAllOrderList();
    handleGetAllFilterData();
  }, [])

  // mrx : save artist
  const handleArchiveOrder = (OrderID) => {
    PostAuthUrl(ARCHIVE_ORDER_LIST(GET_COLLECTION_ID, OrderID), {
      "search": searchTerm.trim(),
      "type": TypeFilter,
      "sortBy": SortFilter,
      "destination": SortDestination,
      "status": SorStatuse,
    }).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          setOrderList(res?.data?.data);
          setModalArchive(false)
          toast.success(`Order archived successfully`);
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
            <TopMenuMobile PageName="All Orders" />
            <Grid item className={Style.P_artistNav}>
              <Grid container direction="column">
                <Grid item className={Style.p_contact}>
                  <Grid container justifyContent="space-between">
                    <Grid item className={Style.titleText}>
                      <span className={Style.badgeGreen}></span>Orders
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
                  <FilterBox
                    setSorStatuse={setSorStatuse}
                    setSortDestination={setSortDestination}
                    setSortFilter={setSortFilter}
                    setTypeFilter={setTypeFilter}
                    FilterData={FilterData}
                    onFilter={() => setFilter(!filter)}
                    saved={false}
                    onSaved={() => setSaved(!saved)}
                  />
                </Grid>

                <TableOrders
                  setModalArchive={setModalArchive}
                  ModalArchive={ModalArchive}
                  SortDestination={SortDestination}
                  searchTerm={searchTerm}
                  TypeFilter={TypeFilter}
                  SortFilter={SortFilter}
                  // category={CatFilter}
                  sortBy={SortFilter}

                  handleArchiveOrder={handleArchiveOrder}
                  LoadingData={LoadingDraftData}
                  data={OrderList}
                  setOrderList={setOrderList}
                  setSelectedDraftID={setSelectedDraftID}
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
            <TopMenuMobile PageName="All Orders" />
            <Hidden smDown>
              <Grid item className={Style.titleText}>
                <span className={Style.badgeGreen}></span>Orders
              </Grid>
            </Hidden>


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
                Manage Consignment orders and incoming inventory
              </Grid>
              <Grid item className={Style.text_product}>
                This is where you’ll add products and manage your pricing. You
                can also import and export your product inventory.
              </Grid>
            </Grid>
          </Grid>
          {/* end contact area */}
        </Grid>

      </Grid>
    );
  }
}
