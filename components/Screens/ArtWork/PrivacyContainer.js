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
import EditPrivacyModal from "../../Modals/ArtWork/EditPrivacy";

// good man : components ↓

export default function PrivacyContainer({ Data, GetSingle = false, SelectInputData }) {
  // mrx : states ↓
  const [modal, setModal] = useState(false);

  return (
    <Grid item >
      <Grid container direction="column" className={artworkStyle.box_wrapper}>
        <Grid item >
          <Grid container justifyContent="space-between" alignItems="center" className={artworkStyle.bgTitle}>
            <Grid
              item
              className={`${artworkStyle.title10} `}
            >
              Privacy
            </Grid>
            <Grid item className={artworkStyle.editBTN}>
              <Button startIcon={<Image src={editPic} />} color='primary' variant="text" onClick={() => setModal(true)}>Edit</Button>
            </Grid>
          </Grid>

          <Grid item>
            <SectionPrivacy title="Ownership" value=
              {
                GetSingle === true ?
                  SelectInputData?.privacies?.filter((item) => item?.id === Data[0]?.privacy?.ownerShip)?.map((item) => item?.name)
                  :
                  SelectInputData?.privacies?.filter((item) => item?.id === Data?.privacy?.ownerShip)?.map((item) => item?.name)
              } />
            <SectionPrivacy title="Price" value=
              {
                GetSingle === true ?
                  SelectInputData?.privacies?.filter((item) => item?.id === Data[0]?.privacy?.privacyPrice)?.map((item) => item?.name)
                  :
                  SelectInputData?.privacies?.filter((item) => item?.id === Data?.privacy?.privacyPrice)?.map((item) => item?.name)
              }
            />
            <SectionPrivacy title="Transfer date" value=
              {
                GetSingle === true ?
                  SelectInputData?.privacies?.filter((item) => item?.id === Data[0]?.privacy?.transferDate)?.map((item) => item?.name)
                  :
                  SelectInputData?.privacies?.filter((item) => item?.id === Data?.privacy?.transferDate)?.map((item) => item?.name)
              }
            />
            <SectionPrivacy title="Transfer type" value=
              {
                GetSingle === true ?
                  SelectInputData?.privacies?.filter((item) => item?.id === Data[0]?.privacy?.transferType)?.map((item) => item?.name)
                  :
                  SelectInputData?.privacies?.filter((item) => item?.id === Data?.privacy?.transferType)?.map((item) => item?.name)
              } />
          </Grid>
        </Grid>
      </Grid>
      <EditPrivacyModal
        GetSingle={GetSingle}
        Data={
          GetSingle === true ?
            Data[0]
            :
            Data
        }
        SelectInputData={SelectInputData}
        openModal={modal}
        handleModal={() => setModal(false)}
      />
    </Grid>
  );
}
