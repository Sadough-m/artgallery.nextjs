import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Joi from "joi";
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

// gm : styles ↓
import style from "../../../../styles/Home.module.css";

// gm : files ↓
import closeIcon from "../../../../public/images/icons/Close12.svg";
import ArrowRightSvg from "../../../../public/images/icons/ArrowRight.svg";
import Medium from "./Medium";
import ListModal from "./ListModal";
import Lists from "./Lists";
import TagsModal from "./TagsModal";
import AllArtworks from "./AllArtworks";

// gm : components ↓
import LoadingSpinerSvg from "../../../../public/loading.svg";

export default function AddArtwork({
  open,
  handleGetModalData,
  handleModal,
  AllData,
  setAllData,
  ModalData,
  setModalData,
  LoadingListData,
  setLoadingListData,
  ModalType,
  setModalType,
}) {
  // gm : states ↓

  return (
    <Grid item>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleModal}
        closeAfterTransition
        className={style.newModal}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Grid item>
            <Grid item className={style.wrapper_modal750}>
              <>
                {
                  LoadingListData && ModalType !== 2 && (
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
                {
                  !LoadingListData && ModalType === 0 && (
                    <ListModal
                      handleGetModalData={handleGetModalData}
                      handleModal={handleModal}
                      ModalData={ModalData}
                    />
                  )
                }
                {
                  ModalType === 2 && (
                    <AllArtworks
                      setAllData={setAllData}
                      AllData={AllData}
                      setModalType={setModalType}
                      LoadingListData={LoadingListData}
                      setLoadingListData={setLoadingListData}
                      handleGetModalData={handleGetModalData}
                      handleModal={handleModal}
                      ModalData={ModalData}
                    />
                  )
                }
                {
                  !LoadingListData && ModalType === 1 && (
                    <Medium
                      setModalType={setModalType}
                      handleGetModalData={handleGetModalData}
                      handleModal={handleModal}
                      ModalData={ModalData}
                    />
                  )
                }
              </>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
      {/* <Medium open={MediumModal} handleModal={() => setMediumModal(false)} /> */}
      {/* <Lists open={ListModal} handleModal={() => setListModal(false)} /> */}
      {/* <TagsModal open={tagsModal} handleModal={() => setTagsModal(false)} /> */}
      {/* <AllArtworks open={AllArtworkModal} handleModal={() => setAllArtworkModal(false)} /> */}
    </Grid>
  );
}
