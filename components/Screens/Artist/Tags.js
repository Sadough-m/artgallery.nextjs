import Image from "next/image";
import React from "react";

// material ui
import { Grid, IconButton } from "@material-ui/core";

// files
import closeImg from "../../../public/images/icons/Close.svg";

// mrx : api links ↓
import { EDIT_TAGS, ADD_NEW_TAG_CONTACT } from "../../../pages/api/index";

// mrx : api ↓
import {
  PostUrl,
  PostAuthUrl,
  GetUrl,
  GetAuthUrl,
  PutAuthUrl,
} from "../../../pages/api/config";
import { toast } from "react-toastify";

// style
import savedArtistStyle from "../../../styles/savedArtist.module.css";

export default function Tags({
  Data,
  title,
  setTagList,
  TagList,
  From = "artist"
}) {
  const handleRemove = () => {
    setTagList(TagList?.filter((item) => item !== title));

    if (From === "artist") {
      PostAuthUrl(EDIT_TAGS, {
        "artistId": Data?.id,
        "collectionId": localStorage.getItem("collectionId"),
        "tags": TagList?.filter((item) => item !== title)
      }).then((res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            toast.success(`Tag removed successfully`);
          } else {
            toast.error(res?.data?.message);
          }
        } else {
          toast.error("something went wrong !");
        }
      });
    } else if (From === "Contact") {
      PostAuthUrl(ADD_NEW_TAG_CONTACT(localStorage.getItem("collectionId")), {
        "contactId": Data?.id,
        "collectionId": localStorage.getItem("collectionId"),
        "tags": TagList?.filter((item) => item !== title)
      }).then((res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            toast.success(`Tag removed successfully`);
          } else {
            toast.error(res?.data?.message);
          }
        } else {
          toast.error("something went wrong !");
        }
      });
    } else {

    }

  }

  return (
    <Grid item className={savedArtistStyle.tags}>
      {title}
      <IconButton onClick={() => handleRemove()} size="small" className={savedArtistStyle.closeImg}>
        <Image src={closeImg} />
      </IconButton>
    </Grid>
  );
}
