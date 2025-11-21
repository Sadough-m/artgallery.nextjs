import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../styles/Exhibition.module.css";

// gm : files ↓
import editSvg from "../../../public/images/icons/Edit.svg";
import MashangPng from "../../../public/images/Mashang.png";

// gm : components ↓
import EditEmail from "../../Modals/Orders/EditEmail";
import ItemFolding from "./ItemFolding";
import EditInfo from "../../Modals/Exhibition/EditInfo";

export default function Folding() {
  // gm : states ↓
  const [ModalInfo, setModalInfo] = useState(false);

  return (
    <Grid item className={Style.Profile}>
      <Grid item className="posRel">
        {/* Title */}
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          className={Style.TitleProfile}
        >
          <Grid item className={Style.overView}>
            Folding the visable
          </Grid>
          <Grid item>
            <Button
              color="primary"
              variant="text"
              startIcon={<Image src={editSvg} />}
              onClick={() => setModalInfo(true)}
            >
              Edit
            </Button>
          </Grid>
        </Grid>

        <Grid item className={Style.InsideFold}>
          <ItemFolding
            Title="Description"
            Desk="Lorem Ipsum is simply dummy text of the printing and typesetting
        industry."
          />
          <ItemFolding Title="Exhibition type" Desk="Shared" />
          <ItemFolding TextButton="Add Location" Title="Location" Desk="London, UK" />
          <ItemFolding TextButton="Add Start date" Title="Start date" Desk="01 - 10 - 2021" />
          <ItemFolding Title="End date" Desk="20 - 10 - 2021" />

          <Grid item className={Style.ItemFolding_artist}>
            <Grid item className={Style.Title}>
              Artist(s)
            </Grid>
            <Grid item className={Style.Desk_artist}>
              <Grid item className={Style.ItemArtist}>
                <span className={Style.DotBlack}></span>Sohrab Sepehri
              </Grid>
              <Grid item className={Style.ItemArtist}>
              <span className={Style.DotBlack}></span>Black Panther
              </Grid>
              <Grid item className={Style.ItemArtist}>
              <span className={Style.DotBlack}></span>Soci Mata
              </Grid>
            </Grid>
          </Grid>


        </Grid>
      </Grid>
      <EditInfo
        open={ModalInfo}
        handleModal={() => setModalInfo(false)}
      />
    </Grid>
  );
}
