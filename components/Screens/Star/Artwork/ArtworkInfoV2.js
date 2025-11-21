import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Star.module.css";

// gm : files ↓
import ArtworkPng from "../../../../public/images/pic Modal artwork.png";
import Img1 from "../../../../public/images/img1.png";
import AvailableSvg from "../../../../public/images/icons/Available.svg";
import InfoSvg from "../../../../public/images/icons/Info gray.svg";
import QrPng from "../../../../public/images/qr code.png";

// gm : components ↓
import AboutArtwork from "./AboutArtwork";
import ButtonList from "./ButtonList";
import ImgProof from "./ImgProof";
import useWindowSize from "../../../../Hooks/useWindowSize";
import ChainItem from "./ChainItem";
import LimittedButton from "./LimittedButtons";

export default function ArtworkInfoV2({ HaveLimitted  }) {
  // gm : states ↓
  const [SelectedButton, setSelectedButton] = useState("Information");
  const [SelectedLimitted, setSelectedLimitted] = useState("Limited edition");

  const [width, height] = useWindowSize();

  return (
    <Grid item className={Style.ArtworkInfo}>
      <Grid container justifyContent="center">
        {/* Left Side */}
        <Grid item className={Style.LeftSide}>
          {HaveLimitted && (
            <LimittedButton
              SelectedLimitted={SelectedLimitted}
              setSelectedLimitted={setSelectedLimitted}
            />
          )}

          <Grid item>
            <img src={ArtworkPng.src} className={Style.ImgArtwork} />
          </Grid>
          <Grid item>
            <Grid container>
              <Grid item>
                <img src={ArtworkPng.src} className={Style.TinyImg} />
              </Grid>
              <Grid item>
                <img src={ArtworkPng.src} className={Style.TinyImg} />
              </Grid>
              <Grid item>
                <img src={ArtworkPng.src} className={Style.TinyImg} />
              </Grid>
              <Grid item>
                <img src={ArtworkPng.src} className={Style.TinyImg} />
              </Grid>
              <Grid item>
                <img src={ArtworkPng.src} className={Style.TinyImg1} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={Style.AvText}>
            <img src={AvailableSvg.src} className={Style.AvImage} />
            Available
          </Grid>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item className={Style.MnText}>
              <span className={Style.BadgeGreen}></span>
              Minted
            </Grid>
            <Grid item>
              <img src={InfoSvg.src} className={Style.InfoSvg} />
            </Grid>
          </Grid>
        </Grid>
        {/* Right Side */}
        <Grid item className={Style.RightSide_V2}>
          <ButtonList
            SelectedButton={SelectedButton}
            setSelectedButton={setSelectedButton}
          />

          {SelectedButton === "Information" && (
            <>
              <Grid item className={Style.P_AboutArtwork}>
                <AboutArtwork title="Title" value="Black Swan" />
                <AboutArtwork title="Artist" value="Sohrab Sepehri" />
                <AboutArtwork title="Size" value="3 × 5 × 2" />
                <AboutArtwork title="Medium" value="Painting" />
                <AboutArtwork title="Statuse" value="Available" />
                <AboutArtwork title="Price" value="$560.00" />
                {HaveLimitted && (
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    className={Style.P_InputText}
                  >
                    <Grid item className={Style.OfferP}>
                      Offer price
                    </Grid>
                    <Grid item>
                      <input
                        type="number"
                        className={Style.InputPrice}
                        placeholder="Enter price"
                      />
                    </Grid>
                  </Grid>
                )}

                <span className={Style.LineFake}></span>
              </Grid>

              <Grid
                container
                className={Style.P_Buy}
                direction={width>960?"row":"column"}
                alignItems= {width>960?"flex-end":"center"}
                justifyContent="center"
              >
                {!HaveLimitted && (
                  <Grid item className={Style.B_Buy}>
                    <Button
                      color="primary"
                      variant="contained"
                      className={Style.Buy}
                    >
                      Buy
                    </Button>
                  </Grid>
                )}

                <Grid item className={Style.B_Inq}>
                  <Button className={Style.Inq}>Inquaire</Button>
                </Grid>
                <Grid item className={Style.Qrcode}>
                  <img src={QrPng.src} className={Style.QrImg} />
                </Grid>
              </Grid>
            </>
          )}

          {SelectedButton === "Proof" && (
            <Grid
              container
              className={Style.P_imgProofs}
              justifyContent={width < 960 ? "space-between" : "flex-start"}
            >
              <ImgProof />
              <ImgProof NotSuported={true} />
              <ImgProof />
              <ImgProof />
              <ImgProof />
              <ImgProof />
            </Grid>
          )}

          {SelectedButton === "Chain info" && (
            <Grid item className={Style.P_ChainItem}>
              <ChainItem />
              <ChainItem />
              <ChainItem />
              <ChainItem />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
