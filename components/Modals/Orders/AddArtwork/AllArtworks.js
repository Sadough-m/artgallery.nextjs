import React, { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

// gm : material ui ↓
import {
  Button,
  Fade,
  Grid,
  Hidden,
  IconButton,
  Modal,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import { CircularProgress } from "@material-ui/core";

// gm : styles ↓
import style from "../../../../styles/Home.module.css";

// gm : files ↓
import closeIcon from "../../../../public/images/icons/Close12.svg";
import ArrowRightSvg from "../../../../public/images/icons/ArrowRight.svg";
import ArrowLeftSvg from "../../../../public/images/icons/Arrow left -.svg";
import SearchSvg from "../../../../public/images/icons/Search.svg";
import TableArtwork from "../../../Screens/Orders/common/TableArtwork";

// gm : components ↓
import LoadingSpinerSvg from "../../../../public/loading.svg";

// mrx : api links ↓
import { ADD_ARTWORK_TO_ORDER } from "../../../../pages/api/index";

// mrx : api ↓
import {
  PostUrl,
  PostAuthUrl,
  GetUrl,
  GetAuthUrl,
} from "../../../../pages/api/config";

export default function AllArtworks({
  handleGetModalData,
  handleModal,
  ModalData,
  setLoadingListData,
  LoadingListData,
  setModalType,
  AllData,
  setAllData
}) {
  // gm : states ↓
  const [AddedArtworks, setAddedArtworks] = useState([])
  const [timer, setTimer] = useState(0);
  const [searchTerm, setSearchTerm] = useState(" ");
  const [AddLoading, setAddLoading] = useState(false);

  useEffect(() => {
    const newTimer = setTimeout(() => {
      if (searchTerm !== " ") {
        handleGetModalData("0", null, searchTerm, [], false);
        setAddedArtworks([]);
      }
    }, 500);
    if (searchTerm === "") {
      handleGetModalData("0", null, searchTerm, [], false);
      setAddedArtworks([]);
    } else {
      clearTimeout(timer);
    }
    setTimer(newTimer);
  }, [searchTerm]);

  const handleAddArtwork = () => {
    setAddLoading(true);
    PostAuthUrl(ADD_ARTWORK_TO_ORDER(AllData?.id), {
      "ids": AddedArtworks
    }).then(
      (res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            const Data = res.data.data;
            setModalType(Data?.menuStatus);
            handleModal();
            toast.success(res?.data?.message);
            setAddLoading(false);
            setAllData(Data);
          } else {
            toast.error(res?.data?.message);
            setAddLoading(false);
          }
        } else {
          toast.error("something went wrong !");
          setAddLoading(false);
        }
      }
    );
  }

  const Modal_id =
    typeof window !== "undefined"
      ? localStorage.getItem("Selected-Modal-id") || ""
      : "";

  return (
    <Grid item>
      {/* title */}
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item className={style.TitleModal}>
          <IconButton
            onClick={() => {
              parseInt(ModalData?.firstMenuItemSelected) === 2 ? setModalType(1) : setModalType(0);
              parseInt(ModalData?.firstMenuItemSelected) === 2 ? handleGetModalData(parseInt(Modal_id), null, null, [], false) : handleGetModalData(null, null, null, [], false);
            }}
            className={style.BackIcon}
          >
            <Image src={ArrowLeftSvg} />
          </IconButton>
          {ModalData?.modalTitle}
        </Grid>
        <Grid item>
          <IconButton
            size="small"
            className={style.border_btn}
            onClick={handleModal}
          >
            <img src={closeIcon.src} />
          </IconButton>
        </Grid>
      </Grid>

      {/* body */}
      <Grid item className={style.bodyModal}>
        <Grid item className="posRel">
          <input
            type="search"
            placeholder="Search exhibition name"
            className={style.inputSearchArtwork}
            value={searchTerm.trim()}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img src={SearchSvg.src} className={style.tinySeachArtwork} />
        </Grid>
        {
          LoadingListData && (
            <Grid
              style={{
                textAlign: "center",
                position: "relative",
                top: "60px",
                paddingBottom: "20px",
                height: "180px"
              }}
              alignItems="center"
              justifyContent="center"
            >
              <img style={{ width: "60px" }} src={LoadingSpinerSvg.src} />
            </Grid>
          )
        }
        {!LoadingListData &&
          <TableArtwork
            ModalData={ModalData}
            setAddedArtworks={setAddedArtworks}
            AddedArtworks={AddedArtworks}
          />
        }
      </Grid>

      {/* footer */}
      <Grid item style={{ marginTop: "25px" }}>
        <Button
          fullWidth
          color="primary"
          disabled={!AddedArtworks?.length || AddLoading}
          variant="contained"
          className={style.buttonModal}
          onClick={() => handleAddArtwork()}
        >
          {AddLoading && <CircularProgress color="white" size={20} />}
          {!AddLoading && "Add Selected"}
        </Button>
      </Grid>
    </Grid >
  );
}
