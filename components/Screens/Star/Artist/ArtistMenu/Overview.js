import React, { useState } from 'react';
import Link from 'next/link';


// gm : material ui ↓
import {
    Grid,
} from '@material-ui/core';

// gm : styles ↓
import Style from "../../../../../styles/Star.module.css";

// gm : files ↓

// gm : components ↓
import Biography from './Biography';
import RelatedCategory from './RelatedCategory';

export default function Overview() {
    // gm : states ↓

    return (
        <Grid item className={Style.Overview}>
            <span className={Style.ForId} id="Overview"></span>

            <Grid item className={Style.OvText}>Overview</Grid>
            <Biography/>
            <RelatedCategory/>
        </Grid>
    )
}