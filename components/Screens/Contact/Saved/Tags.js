import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
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
import savedArtistStyle from "../../../../styles/savedArtist.module.css";
import styles from "../../../../styles/Home.module.css";
import LoadingSpinerSvg from "../../../../public/loading.svg";

// gm : files ↓
import editSvg from "../../../../public/images/icons/Edit.svg";

// gm : components ↓
import CustomCheckBox from "../../../Forms/CustomCheckBox";
import TagsItem from '../../Artist/Tags'

export default function Tags({
  Data,
  AllLoading
}) {
  // gm : states ↓
  const [TagList, setTagList] = useState([]);
  const [focus, setFocus] = useState(false);
  const [NewTag, setNewTag] = useState([]);
  const [AddingTags, setAddingTags] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [timer, setTimer] = useState(0);
  const [SearchData, setSearchData] = useState([]);

  const [ShowSearchList, setShowSearchList] = useState(false);

  const handleAddNewTag = (e) => {
    setAddingTags(true);
    if (e.key === "Enter" && NewTag?.trim() !== "") {
      setTagList((prev) => [...prev, NewTag]);
    }
  };

  const handleAddNewTagFromSearch = (Value) => {
    setTagList((prev) => [...prev, Value]);
  };

  useEffect(() => {
    if (searchTerm) {
      setShowSearchList(true);
    } else {
      setShowSearchList(false);
    }
  }, [searchTerm])

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

  const handleAddNewTagApi = () => {
    const COllectionID = localStorage.getItem("collectionId");
    setSearchTerm("")
    setNewTag("");

    PostAuthUrl(ADD_NEW_TAG_CONTACT(COllectionID), {
      "contactId": Data?.id,
      "collectionId": COllectionID,
      "tags": TagList
    }).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          // setSearchData(res?.data?.data?.tags);
          setTagList(res?.data?.data?.tags);
          setShowSearchList(false);
          setAddingTags(false);
          setFocus(false);
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  }

  useEffect(() => {
    if (AddingTags) {
      handleAddNewTagApi()
    }
  }, [TagList])

  useEffect(() => {
    setTagList(Data?.tags)
  }, [Data])

  return (
    <Grid item className={Style.ode}>
      {/* Tags */}
      <Grid item className="posRel">
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          className={Style.title_ode}
          style={{ height: "55px" }}
          onBlur={() => setFocus(false)}
          onFocus={() => setFocus(true)}
        >
          <Grid item className={Style.overView}>
            Tags
          </Grid>
        </Grid>

        {/* input search */}
        <input
          type="search"
          placeholder="search"
          value={NewTag}
          onChange={(e) => {
            setNewTag(e.target.value); setSearchTerm(e.target.value)
          }}
          onKeyDown={(e) => handleAddNewTag(e)}
          className={savedArtistStyle.inputSearch}
        />
        {
          ShowSearchList && focus && SearchData?.length >= 1 ? (
            <Grid style={{ marginTop: "60px" }} item className={styles.P_Option_Select}>
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

        {/* items */}
        {
          !AllLoading ? (
            <Grid item className={Style.p_check}>
              {TagList &&
                TagList?.map((item) => (
                  <TagsItem
                    From="Contact"
                    Data={Data}
                    setTagList={setTagList}
                    TagList={TagList}
                    title={item}
                  />
                ))}
            </Grid>
          ) : (
            <Grid
              style={{
                textAlign: "center",
                position: "relative",
                top: "12px",
                paddingBottom: "20px"
              }}
              alignItems="center" justifyContent="center"
              itemonClick={() => setModalTax(true)}>
              <img style={{ width: "60px" }} src={LoadingSpinerSvg.src} />
            </Grid>
          )
        }

      </Grid>
    </Grid >
  );
}
