import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
import style from "../../../styles/Home.module.css";

// gm : files ↓
import closeIcon from "../../../public/images/icons/Close12.svg";

// gm : components ↓
import MEditInfo from "../../Modals/Contact/EditInfo";
import EditAddress from "../../Modals/Contact/EditAddress";

export default function EditInfoAddress({
  shippingAddress,
  open,
  getArtistDetails,
  AllData,
  handleModal,
}) {
  // gm : states ↓
  const [EditInfo, setEditInfo] = useState(true);
  const [Address, setAddress] = useState([]);

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
          <Grid item className={style.wrapper_modal592_mbileScroll_top_btn}>
            <Hidden mdUp>
              <Grid item className={style.p_editBtn}>
                <Button
                  color={EditInfo ? "secondary" : "default"}
                  variant={EditInfo ? "contained" : "text"}
                  className={
                    EditInfo ? style.editInfoBtn : style.editInfoBtn_deactive
                  }
                  onClick={() => setEditInfo(true)}
                >
                  Edit info
                </Button>
                <Button
                  className={
                    EditInfo ? style.editAddBtn : style.editAddBtn_active
                  }
                  onClick={() => setEditInfo(false)}
                >
                  Edit address
                </Button>
              </Grid>
            </Hidden>

            {/* title */}
            <Grid container justifyContent="space-between" alignItems="center">
              <Hidden mdUp>
                <Grid item className="fw_500">
                  {EditInfo ? "Edit info" : "Edit address"}
                </Grid>
              </Hidden>
              <Hidden smDown>
                <Grid item>
                  <span
                    className={
                      EditInfo
                        ? style.TitleModal_cursor
                        : style.TitleModal_cursor_deactive
                    }
                    onClick={() => setEditInfo(true)}
                  >
                    Edit info
                  </span>
                  <span className={style.line2}></span>

                  <span
                    className={
                      !EditInfo
                        ? style.TitleModal_cursor
                        : style.TitleModal_cursor_deactive
                    }
                    onClick={() => setEditInfo(false)}
                  >
                    Edit address
                  </span>
                </Grid>
              </Hidden>

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

            {/* forms INFO*/}
            {EditInfo && (
              <MEditInfo
                handleModal={handleModal}
                AllData={AllData}
                shippingAddress={AllData?.overView}
                handleModal={handleModal}
                getArtistDetails={getArtistDetails}
              />
            )}
            {/* forms Address*/}
            {!EditInfo && (
              <EditAddress
                AllData={AllData}
                getArtistDetails={getArtistDetails}
                setValue={setAddress}
                shippingAddress={AllData?.address[0]}
                handleModal={handleModal}
                handleModal={() => handleModal()}
              />
            )}

          </Grid>
        </Fade>
      </Modal>
    </Grid>
  );
}
