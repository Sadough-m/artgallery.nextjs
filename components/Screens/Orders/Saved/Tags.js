import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Orders.module.css";

// gm : files ↓
import editSvg from "../../../../public/images/icons/Edit.svg";

// gm : components ↓
import CustomCheckBox from "../../../Forms/CustomCheckBox";
import TagsItem from '../../Artist/Tags'

export default function Tags() {
  // gm : states ↓

  return (
    <Grid item className={Style.Tags}>
      {/* Tags */}
      <Grid item className="posRel">
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          className={Style.TitleTags}
        >
          <Grid item className={Style.overView}>
          Tags
          </Grid>
          
        </Grid>

        {/* input search */}
        <input type="search" className={Style.searchInput_Tags} placeholder="Search"/>

        {/* items */}
        <Grid item className={Style.P_ItemTags}>
          <TagsItem title="One tag"/>
          <TagsItem title="Two tag"/>
          <TagsItem title="Three tag"/>

        </Grid>
      </Grid>
    </Grid>
  );
}
