import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { uuid } from 'uuidv4';
import { useRouter } from "next/router";

// good man : material ui ↓
import { Button, Grid, Hidden } from "@material-ui/core";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

// good man : styles ↓
import ArtistStyle from "../../../styles/artist.module.css";
import Style from "../../../styles/Home.module.css";

// good man : files ↓
import Filters from "../../../public/images/icons/Filters.svg";

// good man : components ↓
import CustomFilter from "../Artist/CustomFilter";
import useWindowSize from "../../../Hooks/useWindowSize";

export default function FilterBoxList({
  FilterData,
  saved,
  onSaved,
  onFilter,
  setCatFilter,
  setTagFilter,
  setSortFilter,
  linkSave,
  haveLastActivity
}) {

  const router = useRouter();

  // mrx : states ↓

  // good man : recocnize the page size
  const [width, height] = useWindowSize();
  const [filter, setFilter] = useState({
    category: { name: null, id: null },
    sortBy: { name: null, id: null },
    tags: { name: null, id: null },
  });

  useEffect(() => {
    onFilter(filter);
  }, [filter]);

  return (
    <Grid item>
      <Grid
        container
        spacing={width > 960 ? 3 : 1}
        alignItems="center"
        className={Style.w_100}
      >
        <Hidden smDown>
          <Grid item>
            <span className={ArtistStyle.line3}></span>
          </Grid>
          <CustomFilter
            optionList={FilterData?.sortBy}
            valueOptions={filter?.sortBy?.name}
            // setValueOptions={(value, id) => {
            //   setFilter((prev) => {
            //     let prevObj = { ...prev };
            //     prevObj?.sortBy?.name = value;
            //     prevObj?.sortBy?.id = id;
            //     return prevObj;
            //   }); setSortFilter(id)
            // }
            // }
            label="Sort by"
          />
        </Hidden>
        <Hidden mdUp>
          <Grid item>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <Button startIcon={<Image src={Filters} />}>
                  <span className={ArtistStyle.text_None}>Filters</span>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <span className={ArtistStyle.line3}></span>
          </Grid>
        </Hidden>
      </Grid>
    </Grid>
  );
}
