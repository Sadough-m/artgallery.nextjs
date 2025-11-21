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
import ArrowLeftSvg from "../../../public/images/icons/Arrow left -.svg";
import PlusSvg from "../../../public/images/icons/Plus - Circle.svg";
import EmptyPng from "../../../public/images/EmptyImage.png";

// gm : components ↓
import CustomSelect from "../../Forms/CustomSelect";
import PhoneNumber from "../../Forms/PhoneNumber";
import Location from "../../Forms/Location";
import InputForm from "../../Forms/InputForm";
import Date from "../../Forms/Date";
import ImgModal from "../../Screens/Exhibition/ImgModal";
import useWindowSize from "../../../Hooks/useWindowSize";

export default function EditMedia({ open, handleModal, Disabled = true }) {
  // gm : states ↓
  const [MarketPlaceOne, setMarketPlaceOne] = useState(false);

  const [width, height] = useWindowSize();
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
          <Grid item className={style.wrapper_modal750_mbileScroll}>
            {/* title */}
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item className={style.TitleModal_Media}>
                <Hidden mdUp>
                  <IconButton size="small" className={style.ArrowLeft} onClick={handleModal}>
                    <img src={ArrowLeftSvg.src} />
                  </IconButton>
                </Hidden>
                Media
              </Grid>
              <Hidden smDown>
                <Grid item>
                  <IconButton
                    size="small"
                    className={style.border_btn}
                    onClick={handleModal}
                  >
                    <img src={closeIcon.src} />
                  </IconButton>
                </Grid>
              </Hidden>
            </Grid>

            {/* body */}
            <Grid item className={style.bodyModal_form_noMargin}>
              {/* Images */}
              <div className={style.Scrollable_Images}>
                <ImgModal IsSupport={true} />
                <ImgModal IsSupport={false} />
                <ImgModal IsSupport={true} />
                <ImgModal IsSupport={true} />
                <ImgModal IsSupport={true} />
              </div>
              {/* Buttons */}
              <Grid
                container
                justifyContent={width > 960 ? "center" : "flex-start"}
                className={style.P_Button_cntainer}
              >
                <Button
                  className={
                    !MarketPlaceOne
                      ? style.MarketPlace
                      : style.MarketPlace_Active
                  }
                  onClick={() => setMarketPlaceOne(true)}
                >
                  Marketplace 01
                </Button>
                <Button
                  className={
                    MarketPlaceOne
                      ? style.MarketPlace
                      : style.MarketPlace_Active
                  }
                  onClick={() => setMarketPlaceOne(false)}
                >
                  Marketplace 02
                </Button>
              </Grid>
              {/* Text */}
              <Grid item className={style.Text_14}>
                Drag pictures from{" "}
                <span className={style.ColorDark}>Medias</span> to any of the
                placement bellow.
              </Grid>

              <Grid
                container
                className={style.P_AllImages}
                justifyContent="space-between"
                direction={width > 960 ? "row" : "column"}
              >
                {/* left Image */}
                <Grid item>
                  <Grid item className={style.TitleImage}>
                    Thumbnail
                  </Grid>
                  <Grid item className={style.ImgModal}>
                  {false ? <img src={EmptyPng.src} /> : <ImgModal HaveMiddleIcon={true} IsSupport={false} Mg_Right="0"/>}
                  </Grid>
                </Grid>

                {/* Middle Image */}
                <Grid item className={style.WrapperImg}>
                  <Grid item className={style.TitleImage}>
                    Slider
                  </Grid>
                  <Grid container>
                    <Grid item className={style.ImgModal_1_Left}>
                      {false ? <img src={EmptyPng.src} /> : <ImgModal HaveMiddleIcon={true} IsSupport={true} Mg_Right="0"/>}
                    </Grid>
                    <Grid item className={style.ImgModal_1}>
                      <img src={EmptyPng.src} />
                    </Grid>
                    <Grid
                      item
                      className={
                        width > 390
                          ? style.ImgModal_1
                          : style.ImgModal_1_Right_2
                      }
                    >
                      <img src={EmptyPng.src} />
                    </Grid>
                  </Grid>
                </Grid>

                {/* Right Image */}
                <Grid item className={style.WrapperImg_1}>
                  <Grid item className={style.TitleImage}>
                    Audio
                  </Grid>
                  <Grid item className={style.ImgModal}>
                    {false ? <img src={EmptyPng.src} /> : <ImgModal HaveLeftIcon={true} IsSupport={true} Mg_Right="0"/>}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* footer */}
            <Grid item className={style.button_saveChange}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                className={
                  Disabled ? style.buttonModal_Disabled : style.buttonModal
                }
                disabled={Disabled}
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </Grid>
  );
}
