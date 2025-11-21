import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';


// gm : material ui ↓
import {
    Grid,
} from '@material-ui/core';

// gm : styles ↓
import Style from "../../../../../styles/Orders.module.css";

// gm : files ↓

// gm : components ↓

export default function Info({title, value}) {
    // gm : states ↓

    return (
        <Grid container justifyContent='space-between' className={Style.Info}>
            <Grid item className={Style.InfoTilte}>{title}</Grid>
            <Grid item className={Style.InfoValue}>{value}</Grid>
        </Grid>
    )
}