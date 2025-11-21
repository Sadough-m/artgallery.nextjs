import React, { useState } from "react";

// mrx : material ui ↓
import { ClickAwayListener, Grid } from "@material-ui/core";

// mrx : Style ↓
import ArtistStyle from "../../../styles/artist.module.css";

// mrx : files ↓
import dropDown from "../../../public/images/icons/Arrow down header.svg";
import dropDown_Up from "../../../public/images/icons/Arrow Up.svg";
import Image from "next/image";

// mrx : components ↓

export default function CustomFilter({
  label = "Category",
  taged = false,
  optionList = [
    { id: 1, value: "value 1" },
    { id: 2, value: "value 2" },
    { id: 3, value: "value 3" },
  ],
  valueOptions,
  setValueOptions,
  Width 
}) {
  //type of filter that user selected
  const handleValueOptions = (value, id) => {
    setValueOptions(value, id);
  };

  //opening and closing option list
  const [openOption, setOpenOption] = useState(false);
  const handleOpenOptions = () => {
    setOpenOption(!openOption);
  };
  const closeOptions = () => {
    setOpenOption(false);
  };

  const handleStyleValye = () => {
    if (openOption) {
      return ArtistStyle.valueFilter_open;
    }
    if (valueOptions !== "") {
      return ArtistStyle.valueFilter;
    } else return ArtistStyle.valueFilter_selected;
  };

  return (
    <ClickAwayListener onClickAway={closeOptions}>
      <Grid item>
        <Grid container spacing={1} alignItems="center">
          <Grid item className={!openOption ? ArtistStyle.Label_filter : ArtistStyle.Label_filter_sel}>
            {label} :
          </Grid>
          <Grid
            item
            onClick={() => handleOpenOptions()}
            className={ArtistStyle.filterDropDown}
          >
            <Grid container alignItems="center" spacing={1}>
              <Grid item className={handleStyleValye()} style={{maxWidth: !openOption  ? Width:''}}>
                {valueOptions === null ? "Choose one" : valueOptions}
              </Grid>
              <Grid item className={ArtistStyle.imgFilter}>
                <Image src={!openOption ? dropDown : dropDown_Up} />
              </Grid>
            </Grid>
            {openOption && (
              <Grid
                container
                direction="column"
                className={ArtistStyle.P_options}
              >
                {optionList?.map((item) => (
                  <Grid
                    item
                    key={item?.id}
                    onClick={() => handleValueOptions(item?.name, item?.id)}
                    className={valueOptions === item?.name || valueOptions === item?.name ? ArtistStyle.itemfilter_selected : ArtistStyle.itemfilter}
                  >
                    {
                      item?.name
                    }
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </ClickAwayListener>
  );
}
