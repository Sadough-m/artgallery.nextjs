import React, { useState, useEffect } from "react";
import Image from "next/image";
import Joi from "joi";
import Link from "next/link";

import { SEARCH_IN_CONTACT_TAGS, ADD_NEW_TAG_CONTACT } from "../../../../pages/api/index";

// mrx : api ↓
import {

  PostUrl,
  PostAuthUrl,
  PutAuthUrl,
  GetUrl,
  GetAuthUrl,
} from "../../../../pages/api/config";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Contacts.module.css";
import styles from "../../../../styles/Home.module.css";
import savedArtistStyle from "../../../../styles/savedArtist.module.css";
import TagsS from "../../Artist/Tags";

// gm : files ↓
import emptySvg from "../../../../public/images/icons/empty.svg";

// gm : components ↓
import InputForm from "../../../Forms/InputForm";

export default function Tags({ TagList, setTagList }) {
  // gm : states ↓
  const [NewTag, setNewTag] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [AddingTags, setAddingTags] = useState(false);
  const [timer, setTimer] = useState(0);

  const [ShowSearchList, setShowSearchList] = useState(false);
  const [SearchData, setSearchData] = useState([]);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      setShowSearchList(true);
    } else {
      setShowSearchList(false);
    }
  }, [searchTerm])

  const handleAddNewTagFromSearch = (Value) => {
    setTagList((prev) => [...prev, Value]);
    setShowSearchList(false);
    setAddingTags(false);
    setSearchTerm("")
    setNewTag("")
    setFocus(false);
  };

  useEffect(() => {
    if (searchTerm === "") {
      setShowSearchList(false);
    } else {
      clearTimeout(timer);
      const newTimer = setTimeout(() => {
        handleSearchTags();
        setFocus(true);
      }, 500);
    }
    setTimer(newTimer);
  }, [searchTerm]);

  const handleSearchTags = () => {
    const COllectionID = localStorage.getItem("collectionId");

    GetAuthUrl(SEARCH_IN_CONTACT_TAGS(COllectionID, searchTerm)).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          setSearchData(res?.data?.data?.tags);
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  }

  const handleAddNewTag = (e) => {
    setAddingTags(true);
    if (e.key === "Enter" && NewTag.trim() !== "") {
      setTagList((prev) => [...prev, NewTag]);
      setSearchTerm("")
      setShowSearchList(false);
      setAddingTags(false);
      setNewTag("")
      setFocus(false);
    }
  };

  return (
    <Grid
      // onBlur={() => setFocus(false)}
      // onFocus={() => setFocus(true)}
      style={{ position: "relative" }} item className={Style.wrapper_main}>
      <Grid item className={Style.title_main}>
        Tags
      </Grid>

      {/* forms */}
      <input
        placeholder="Enter value and press “Enter”"
        value={searchTerm}

        onChange={(e) => {
          setNewTag(e.target.value); setSearchTerm(e.target.value)
        }}
        onKeyDown={(e) => handleAddNewTag(e)}
        className={`${styles.formInput}`}
      />

      {
        ShowSearchList && focus && SearchData?.length >= 1 ? (
          <Grid style={{ marginTop: "40px", width: "92%" }} item className={styles.P_Option_Select}>
            <Grid container direction="column">
              {SearchData &&
                SearchData?.map((item, index) => (
                  <Grid
                    item
                    key={index}
                    className={styles.Option_Select}
                    onClick={() => handleAddNewTagFromSearch(item)}
                  >
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item>
                        {item}
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
            </Grid>
          </Grid>
        ) : (
          <></>
        )
      }

      {TagList &&
        TagList?.map((item) => (
          <TagsS
            From="AddContact"
            // Data={Data}
            setTagList={setTagList}
            TagList={TagList}
            title={item}
          />
        ))}
    </Grid>
  );
}
