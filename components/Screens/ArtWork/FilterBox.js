import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// good man : material ui ↓
import { Button, Grid, Hidden, IconButton } from "@material-ui/core";

// good man : styles ↓
import ArtWorkStyle from "../../../styles/artworkflow.module.css";
import Style from "../../../styles/Home.module.css";

// good man : files ↓
import ListViewGray from "../../../public/images/icons/List view gray.svg";
import ListViewBlue from "../../../public/images/icons/List view blue.svg";
import GridViewBlue from "../../../public/images/icons/Grid view blue.svg";
import GridViewGray from "../../../public/images/icons/Grid view gray.svg";


// good man : components ↓
import CustomFilter from "../Artist/CustomFilter";
import useWindowSize from "../../../Hooks/useWindowSize";
import FilterMobile from "./FilterMobile";

export default function FilterBox({
  GridShow,
  hanldeGridShow,
  hanldeListShow,
  onFilter,
  data,
  getArtworksSearch,
  Width,
}) {
  // mrx : states ↓
  const [Statuse, setStatuse] = useState(null);
  const [SortBy, setSortBy] = useState(null);

  // good man : recocnize the page size
  const [width, height] = useWindowSize();
  const [filter, setFilter] = useState({
    statuse: { name: null, id: null },
    tags: { name: null, id: null },
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
          {/* <CustomFilter
            label="Tagged with"
            optionList={data?.tags}
            valueOptions={filter.tags.name}
            setValueOptions={(value, GetID) =>
              setFilter((prev) => {
                const prevObj = { ...prev };
                prevObj.tags.name = value;
                prevObj.tags.id = GetID;
                return prevObj;
              })
            }
          /> */}
          {/* <Grid item>
            <span className={ArtWorkStyle.line3}></span>
          </Grid> */}
          <CustomFilter
            label="Statuse"
            optionList={data?.statuse}
            valueOptions={filter.statuse.name}
            setValueOptions={(value, GetID) =>
              setFilter((prev) => {
                const prevObj = { ...prev };
                prevObj.statuse.name = value;
                prevObj.statuse.id = GetID;
                return prevObj;
              })
            }
            Width={Width}
          />
          <Grid item>
            <span className={ArtWorkStyle.line3}></span>
          </Grid>
          <CustomFilter
            label="Sort by"
            optionList={data?.sortBy}
            valueOptions={filter.sortBy.name}
            setValueOptions={(value, GetID) =>
               setFilter((prev) => {
                const prevObj = { ...prev };
                prevObj.sortBy.name = value;
                prevObj.sortBy.id = GetID;
                return prevObj;
              })
            }
            Width={Width}
          />
          <Grid item>
            <span className={ArtWorkStyle.line3}></span>
          </Grid>
          <Grid item>
            <IconButton size="small" onClick={hanldeListShow}>
              <Image src={GridShow ? ListViewGray : ListViewBlue} />
            </IconButton>
          </Grid>

          <Grid item>
            <IconButton size="small" onClick={hanldeGridShow}>
              <Image src={!GridShow ? GridViewGray : GridViewBlue} />
            </IconButton>
          </Grid>
        </Hidden>
        <Hidden mdUp>
          <FilterMobile
            Statuse={Statuse}
            SortBy={SortBy}
            setSortBy={setSortBy}
            setStatuse={setStatuse}
            setFilter={setFilter}
            Data={data}
          />
          <Grid item>
            <span className={ArtWorkStyle.line3}></span>
          </Grid>
        </Hidden>
      </Grid>
    </Grid>
  );
}
