import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// good man : material ui ↓
import { Grid, Hidden, IconButton } from "@material-ui/core";

// good man : styles ↓
import ArtWorkflowStyle from "../../../styles/artworkflow.module.css";

// good man : files ↓
import markPic from "../../../public/images/icons/Bookmark.svg";
import trashPic from "../../../public/images/icons/Trash.svg";
import notificationPic from "../../../public/images/icons/Notification 2.svg";
import InquriesPic from "../../../public/images/icons/Inquries.svg";
import invoice from "../../../public/images/icons/Invoice.svg";
import EditIcon from "../../../public/images/icons/Edit.svg";

// good man : components ↓
import RemoveAndArchive from "../../Modals/ArtWork/RemoveAndArchive";

export default function IconBar({
  mintingStatus,
  IsMain,
  ArtWorkID,
  Title = ""
}) {
  // mrx : states ↓
  const [AriciveModal, setAriciveModal] = useState(false);

  return (
    <Hidden smDown>
      <Grid item className={ArtWorkflowStyle.icon_tops}>
        <Grid container>
          <Grid container justifyContent="flex-end" spacing={0}>
            {/* <Grid item>
              <IconButton>
                <Image src={invoice} />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <Image src={InquriesPic} />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <Image src={notificationPic} />
              </IconButton>
            </Grid> */}
            <Grid item>
              <IconButton onClick={() => setAriciveModal(true)}>
                <Image src={trashPic} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <RemoveAndArchive
          Title={Title}
          IsMain={IsMain}
          ArtWorkID={ArtWorkID}
          mintingStatus={mintingStatus}
          remove={parseInt(mintingStatus) !== 4 && parseInt(mintingStatus) !== 3 ? true : false}
          archive={parseInt(mintingStatus) === 4 || parseInt(mintingStatus) === 3 ? true : false}
          openModal={AriciveModal}
          handleModal={() => setAriciveModal(false)}
        />
      </Grid>
    </Hidden>
  );
}
