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
import FilterMobile from "./FilterMobile";

export default function FilterBox({
  FilterData,
  saved,
  onSaved,
  onFilter,
  setCatFilter,
  setLastActivity,
  setTagFilter,
  setSortFilter,
  linkSave,
  haveLastActivity
}) {

  const router = useRouter();
  const [Statuse, setStatuse] = useState("");
  const [SortBy, setSortBy] = useState("");
  const [TaggedWithData, setTaggedWithData] = useState("");
  // mrx : states ↓

  // good man : recocnize the page size
  const [width, height] = useWindowSize();
  const [filter, setFilter] = useState({
    category: { name: null, id: null },
    sortBy: { name: null, id: null },
    tags: { name: null, id: null },
    lastActivity: { name: null, id: null },
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
            optionList={FilterData?.category}
            valueOptions={filter?.category?.name}
            setValueOptions={(value, id) => {
              setFilter((prev) => {
                const prevObj = { ...prev };
                prevObj.category.name = value;
                prevObj.category.id = id;
                return prevObj;
              }); setCatFilter(id)
            }
            }
            label="Category"
          />
          <Grid item>
            <span className={ArtistStyle.line3}></span>
          </Grid>
          <CustomFilter
            taged={true}
            optionList={FilterData?.tags}
            valueOptions={filter?.tags?.name}
            setValueOptions={(value, id) => {
              setFilter((prev) => {
                const prevObj = { ...prev };
                prevObj.tags.name = value;
                prevObj.tags.id = uuid();
                return prevObj;
              }); setTagFilter(value)
            }}
            label="Tagged with"
          />
          {haveLastActivity && (
            <>
              <Grid item>
                <span className={ArtistStyle.line3}></span>
              </Grid>
              <CustomFilter
                optionList={FilterData?.lastActivity}
                valueOptions={filter?.lastActivity?.name}
                setValueOptions={(value, id) => {
                  setFilter((prev) => {
                    var prevObj = { ...prev };
                    prevObj.lastActivity.name = value;
                    prevObj.lastActivity.id = id;
                    return prevObj;
                  }); setLastActivity(id)
                }
                }
                label="Last activity"
              />
            </>

          )}
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

          <Grid item>
            <span className={ArtistStyle.line3}></span>
          </Grid>
        </Hidden>
        <Hidden mdUp>
          <FilterMobile
            Statuse={Statuse}
            SortBy={SortBy}
            setSortBy={setSortBy}
            setStatuse={setStatuse}
            setFilter={setFilter}
            TaggedWithData={TaggedWithData}
            setTaggedWithData={setTaggedWithData}
            Data={FilterData}
            onFilter={onFilter}
          />
          <Grid item>
            <span className={ArtistStyle.line3}></span>
          </Grid>
        </Hidden>

        <Grid item>
          <Grid item>
            <Button
              startIcon={<BookmarkBorderIcon />}
              color={saved ? "primary" : "default"}
              onClick={() => { onSaved(true); router.push(linkSave) }}
            >
              Saved
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
