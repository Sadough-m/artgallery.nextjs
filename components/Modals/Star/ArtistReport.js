import React, { useState, useEffect } from "react";
import Image from "next/image";

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

// gm : Styles ↓
import Style from "../../../styles/Home.module.css";

// gm : files ↓
import closeIcon from "../../../public/images/icons/Close12.svg";
import ImagePng from "../../../public/images/Mashang1.png";
import GandomPng from "../../../public/images/Gandom.png";

// gm : components ↓
import TextArea from "../../Forms/TextArea";

export default function ArtistReport({ open, handleModal }) {
  // gm : states ↓
  const [ReportTopic, setReportTopic] = useState("Information");

  return (
    <Grid item>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleModal}
        closeAfterTransition
        className={Style.newModal}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Grid item className={Style.wrapper_modal440_mobileScroll}>
            {/* title */}
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item className={Style.TitleModal}>
                Report a problem
              </Grid>
              <Grid item>
                <IconButton
                  size="small"
                  className={Style.border_btn}
                  onClick={handleModal}
                >
                  <img src={closeIcon.src} />
                </IconButton>
              </Grid>
            </Grid>

            {/* body */}
            <Grid item className={Style.bodyModal}>
              <Grid
                container
                justifyContent="space-between"
                className={Style.P_Title_1}
              >
                <Grid item className={Style.ProofTitle}>
                  Subject
                </Grid>
                <Grid item className={Style.ProofDesk}>
                  You are the artist and you wanan report
                </Grid>
              </Grid>

              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                className={Style.P_Rep}
              >
                <Grid item className={Style.RepText}>
                  Report for
                </Grid>
                <Grid item>
                  <Grid container>
                    <Grid item>
                      <img src={GandomPng.src} className={Style.ImgRepArtist} />
                    </Grid>
                    <Grid item className={Style.P_RepName_1}>
                      <Grid item className={Style.NameRep}>
                        Black Swan
                      </Grid>
                      <Grid item className={Style.LocRep}>
                      Sohrab Sepehri
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={Style.AboutRep}>
                What are you reporting
              </Grid>

              <Grid item className={Style.P_RepBtn}>
                <Button
                  className={
                    ReportTopic === "Information"
                      ? Style.RepBtnSelected
                      : Style.RepBtn
                  }
                  onClick={() => setReportTopic("Information")}
                >
                  Information
                </Button>
                <Button
                  className={
                    ReportTopic === "Proof" ? Style.RepBtnSelected : Style.RepBtn
                  }
                  onClick={() => setReportTopic("Proof")}
                >
                  Proof
                </Button>
                
              </Grid>

              <Grid item className={Style.P_InputRep}>
                <TextArea label="Report description" placeHolder="Write description of your report "/>
              </Grid>
            </Grid>

            {/* footer */}
            <Grid item style={{ marginTop: "15px" }}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                className={Style.buttonModal}
              >
                Submit Report
              </Button>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </Grid>
  );
}
