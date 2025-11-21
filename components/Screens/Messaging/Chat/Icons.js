import React, { useState } from 'react';
import Link from 'next/link';


// gm : material ui ↓
import {
    Grid, IconButton,
} from '@material-ui/core';

// gm : styles ↓
import Style from "../../../../styles/Messaging.module.css";

// gm : files ↓
import DotSvg from '../../../../public/images/icons/3dot.svg'
import LableSvg from '../../../../public/images/icons/Lable.svg'
import MessageDelSvg from '../../../../public/images/icons/Message - Deleted.svg'

// gm : components ↓

export default function Icons() {
    // gm : states ↓

    return (
        <Grid item className={Style.P_Icons}>
            <IconButton size='small' className={Style.IconChat}>
                <img src={MessageDelSvg.src}/>
            </IconButton>
            <IconButton size='small' className={Style.IconChat}>
                <img src={LableSvg.src}/>
            </IconButton>
            <IconButton size='small' className={Style.IconChat}>
                <img src={DotSvg.src}/>
            </IconButton>
        </Grid>
    )
}