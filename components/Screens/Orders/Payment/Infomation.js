import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';


// gm : material ui ↓
import {
    Grid,
} from '@material-ui/core';

// gm : styles ↓
import Style from "../../../../styles/Orders.module.css";

// gm : files ↓

// gm : components ↓

export default function Information({title, value, active}) {
    // gm : states ↓

    return (
        <Grid
          container
          justifyContent="space-between"
          className={active?Style.P_TotalPaid:Style.P_TotalPaid_deActive}
          
        >
          <Grid item>{title}</Grid>
          <Grid item>${value}</Grid>
        </Grid>
    )
}