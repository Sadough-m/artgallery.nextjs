import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";

// gm : material ui ↓
import {
  Button,
  Fade,
  Grid,
  Hidden,
  IconButton,
  Modal,
} from "@material-ui/core";
import { StylesContext } from "@material-ui/styles";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";

// gm : styles ↓
import style from "../../../styles/Home.module.css";

// gm : files ↓
import archivePng from "../../../public/images/remove img Modal.png";
import closeIcon from "../../../public/images/icons/Close12.svg";
import {GetAuthUrl} from "../../../pages/api/config";
import {Remove_EMAIL_LIST,Remove_EMAIL_LIST_Item} from "../../../pages/api";

// gm : components ↓

export default function RemoveEmailList({ open, handleModal,effectedEmailList }) {
  // console.log('effectedEmailList',effectedEmailList)
  // gm : states ↓

  // sa :remove email list func
  const removeEmailList=()=>{
    // console.log('removeEmailList',effectedEmailList.id)
    GetAuthUrl(Remove_EMAIL_LIST(effectedEmailList?.id)).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          //setLoading(false);
          toast.success(res?.data?.message);
          handleModal()
          //setFirst(false);
        } else {
          toast.error(res?.data?.message);
          // setLoading(false);
        }
      } else {
        toast.error("something went wrong !");
        //setLoading(false);
      }
    });

  }
  // sa :remove email list func
  const removeEmailListItem=()=>{
    // console.log('removeEmailList',effectedEmailList.id)
    GetAuthUrl(Remove_EMAIL_LIST_Item(effectedEmailList?.id)).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          //setLoading(false);
          toast.success(res?.data?.message);
          handleModal()
          //setFirst(false);
        } else {
          toast.error(res?.data?.message);
          // setLoading(false);
        }
      } else {
        toast.error("something went wrong !");
        //setLoading(false);
      }
    });

  }
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
          <Grid item className={style.wrapper_modal440}>
            {/* title */}
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item className={style.fitPic}>
                <img src={archivePng.src} />
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
              {`Are you sure you want to Remove ${effectedEmailList?.title}`}
              <Hidden xsDown>
                <br />
              </Hidden>{" "}
              {effectedEmailList?.email?'email item':'email list?'}
            </Grid>

            {/* footer */}
            <Grid item className={style.p_buttonModal}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                className={style.buttonModal}
                onClick={()=>{
                 effectedEmailList?.email?removeEmailListItem(): removeEmailList()
                }}
              >
                Yes, Remove
              </Button>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </Grid>
  );
}
