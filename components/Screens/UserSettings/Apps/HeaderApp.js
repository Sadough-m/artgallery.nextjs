import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';


// gm : material ui ↓
import {
    Grid, IconButton,
} from '@material-ui/core';

// gm : styles ↓
import Style from "../../../../styles/UserSettings.module.css";

// gm : files ↓
import ArrowLeftSvg from "../../../../public/images/icons/Arrow left -.svg";

// gm : components ↓

export default function HeaderApp() {
    // gm : states ↓

    return (
        <Grid item className={Style.Slack}>
          <IconButton size="small" className={Style.P_ArrowLeft}>
            <Image src={ArrowLeftSvg} />
          </IconButton>
          Slack
        </Grid>
    )
}