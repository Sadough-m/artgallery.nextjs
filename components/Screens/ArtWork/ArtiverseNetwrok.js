import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// good man : material ui ↓
import { Button, Grid } from "@material-ui/core";
import SectionBranching from "../Artist/SectionBranching";

// good man : styles ↓
import artworkStyle from "../../../styles/artworkflow.module.css";

// good man : files ↓
import editPic from "../../../public/images/icons/Edit.svg";
import SectionPrivacy from "./SectionPrivacy";
import CustomCheckBox from "../../Forms/CustomCheckBox";
import TransferPublishDiscover from "../../Modals/ArtWork/TransferPublish";

// good man : components ↓

export default function ArtiverseNetwrok({
  mintingStatus,
  ArtWorkID
}) {
  // mrx : states ↓
  const [modal, setModal] = useState(false);
  const [checked, setChecked] = useState(false);

  return (
    <>
      <Grid item className={artworkStyle.p_0}>
        <Grid container direction="column" className={artworkStyle.box_wrapper}>
          <Grid item>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              className={artworkStyle.bgTitle}
            >
              <Grid item className={`${artworkStyle.title10} `}>
                Artiverse Netwrok
              </Grid>
            </Grid>

            <Grid item>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                className={artworkStyle.P_itemArtiverse}
              >
                <Grid item>
                  <span onClick={() => setModal(true)}>
                    <CustomCheckBox label="Discover" checked={false} setChecked={setChecked} />
                  </span>
                </Grid>
                <Grid item className={artworkStyle.publishText}>
                  Publish
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <TransferPublishDiscover
          ArtWorkID={ArtWorkID}
          openModal={modal}
          handleModal={() => setModal(false)}
        />
      </Grid>
    </>
  );
}
