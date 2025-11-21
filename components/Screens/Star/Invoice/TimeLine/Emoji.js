import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';


// gm : material ui ↓
import {
    Grid,
} from '@material-ui/core';

// gm : styles ↓
import Style from "../../../../../styles/Star.module.css";

// gm : files ↓
import EmojiSvg from '../../../../../public/images/icons/Emoji.svg'

// gm : components ↓

export default function Emoji() {
    // gm : states ↓

    return (
        <Grid item className={Style.Emoji}>
            <img src={EmojiSvg.src} className={Style.ImgEmoji}/>
        </Grid>
    )
}