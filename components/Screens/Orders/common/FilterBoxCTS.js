import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { uuid } from "uuidv4";
import { useRouter } from "next/router";

// good man : material ui ↓
import { Button, Grid, Hidden } from "@material-ui/core";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

// good man : styles ↓
import ArtistStyle from "../../../../styles/artist.module.css";
import Style from "../../../../styles/Home.module.css";

// good man : files ↓
import Filters from "../../../../public/images/icons/Filters.svg";

// good man : components ↓
import useWindowSize from "../../../../Hooks/useWindowSize";
import CustomFilter from "../../Artist/CustomFilter";
import FilterMobileCTS from "./FilterMobileCTS";

export default function FilterBoxCTS({
  FilterData,
  saved,
  onSaved,
  onFilter,
  setTypeFilter,
  setSortFilter,
  linkSave,
}) {
  // mrx : states ↓


  const router = useRouter();
  const [TypeWithData, setTypeWithData] = useState("");
  const [SortBy, setSortBy] = useState("");
  // mrx : states ↓

  // good man : recocnize the page size
  const [width, height] = useWindowSize();
  const [filter, setFilter] = useState({
    type: { name: null, id: null },
    sortBy: { name: null, id: null },
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
          <CustomFilter
            optionList={FilterData?.type}
            valueOptions={filter?.type?.name}
            setValueOptions={(value, id) => {
              setFilter((prev) => {
                const prevObj = { ...prev };
                prevObj.type.name = value;
                prevObj.type.id = id;
                return prevObj;
              }); setTypeFilter(id)
            }
            }
            label="Type"
          />

          <Grid item>
            <span className={ArtistStyle.line3}></span>
          </Grid>
          <CustomFilter
            optionList={FilterData?.sortBy}
            valueOptions={filter?.sortBy?.name}
            setValueOptions={(value, id) => {
              setFilter((prev) => {
                const prevObj = { ...prev };
                prevObj.sortBy.name = value;
                prevObj.sortBy.id = id;
                return prevObj;
              }); setSortFilter(id)
            }
            }
            label="Sort by"
          />
        </Hidden>
        <Hidden mdUp>
          <FilterMobileCTS
            TypeWithData={TypeWithData}
            setTypeWithData={setTypeWithData}
            SortBy={SortBy}
            setSortBy={setSortBy}
            setFilter={setFilter}
            Data={FilterData}
            onFilter={onFilter}
            setSortFilter={setSortFilter}
            setTypeFilter={setTypeFilter}
          />
        </Hidden>
      </Grid>
    </Grid>
  );
}
