import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

// gm : material ui ↓
import { Grid, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Contacts.module.css";

// gm : files ↓
import markPic from "../../../../public/images/icons/Bookmark.svg";
import trashPic from "../../../../public/images/icons/Trash.svg";
import notificationPic from "../../../../public/images/icons/Notification 2.svg";
import InquriesPic from "../../../../public/images/icons/Inquries.svg";
import markPicBlue from "../../../../public/images/icons/Archive Blue.svg";
import unArchiveIcon from "../../../../public/images/icons/unArchive.svg";
import ToggleArchive from "../../../Modals/Contact/toggleArchive"

import {
  TOGGLE_SAVE_CONTACT,
  BASE_Image_Url,
  ARHIVE_CONTACT
} from "../../../../pages/api/index";

//rs : urls  and api helper methods
import { GetAuthUrl, PostAuthUrl, GetUrl } from "../../../../pages/api/config";

// gm : components ↓

export default function Icons({ getArtistDetails, AllData }) {
  // gm : states ↓
  const [ModalToggleArchive, setModalToggleArchive] = useState(false)

  // mrx : archive contact
  const handleSaveContact = () => {
    PostAuthUrl(TOGGLE_SAVE_CONTACT(localStorage.getItem("collectionId")), {
      "collectionId": localStorage.getItem("collectionId"),
      "contactId": AllData?.id,
    }).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          if (res?.data?.data?.isSaved !== true) {
            toast.success(`Saved successfully`);
          } else {
            toast.success(`unSaved successfully`);
          }
          getArtistDetails(AllData?.id)
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  }

  // mrx : archive contact
  const handleArchiveContact = () => {
    PostAuthUrl(ARHIVE_CONTACT(localStorage.getItem("collectionId")), {
      "collectionId": localStorage.getItem("collectionId"),
      "contactId": AllData?.id,
    }).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          if (res?.data?.data?.isArchived !== true) {
            toast.success(`Archived successfully`);
          } else {
            toast.success(`unArchived successfully`);
          }
          getArtistDetails(AllData?.id)
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  }

  return (
    <Grid item className={Style.Icons}>
      <IconButton onClick={() => handleSaveContact()} className={Style.IconInHover}>
        <img
          src={!AllData?.isSaved ? markPic.src : markPicBlue.src}
          width="20px"

        />
      </IconButton>
      <IconButton disabled={true} className={Style.IconInHover}>
        <Image src={notificationPic} />
      </IconButton>
      <IconButton disabled={true} className={Style.IconInHover}>
        <Image src={InquriesPic} />
      </IconButton>
      <IconButton onClick={() => { setModalToggleArchive(true); localStorage.setItem("contact-archiving-name", AllData.fullName) }} className={Style.IconInHover}>
        <img
          src={!AllData?.isArchived ? trashPic.src : unArchiveIcon.src}
          width="20px"
        />
      </IconButton>

      <ToggleArchive
        handleToggle={handleArchiveContact}
        open={ModalToggleArchive}
        handleModal={() => setModalToggleArchive(false)}
      />
    </Grid>
  );
}
