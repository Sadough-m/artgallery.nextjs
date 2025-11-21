import React, { useState } from "react";
import Image from "next/image";

import Style from "../../styles/Home.module.css";

// mrx : material ui ↓
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";

import Loading from './spinning-circles.svg';

export default function LoadingSpiner({ display }) {

    if (display === true) {
        return (
            <Grid Item className={Style.loadingSpinerMain}>
                <Image src={Loading} />
            </Grid>
        )
    } else {
        return (
            <></>
        )
    }

}
