import React, { useState, useEffect } from "react";

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
import InfoSvg from "../../../public/images/icons/Info blue.svg";

// gm : components ↓
import CustomCheckBox from "../../Forms/CustomCheckBox";

export default function AddShipping({ open, handleModal }) {
  // gm : states ↓
  const [Check1, setCheck1] = useState(false);
  const [Check2, setCheck2] = useState(false);

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
              <Grid item className={style.TitleModal}>
                Shipping info
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
              <Grid container alignItems="center" className={style.BG_Info}>
                <Grid item className={style.P_InfoSvg}>
                  <img src={InfoSvg.src} className={style.InfoSvg} />
                </Grid>
                <Grid item className={style.Desk_shipping}>
                  as soon as this consignment is official the values for
                  Consignment cost will be overrided in artwork
                </Grid>
              </Grid>

              {/* Check Boxes */}
              <Grid item className={style.CheckBox_Modal_2}>
                <CustomCheckBox label="debra.holt@example.com" checked={Check1} setChecked={setCheck1}/>
              </Grid>
              <Grid item className={style.CheckBox_Modal_1}>
                <CustomCheckBox label="bill.sanders@example.com" checked={Check2}  setChecked={setCheck2} />
              </Grid>
            </Grid>

            {/* footer */}
            <Grid item style={{ marginTop: "25px" }}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                className={style.buttonModal}
              >
                Add Shipping
              </Button>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </Grid>
  );
}
