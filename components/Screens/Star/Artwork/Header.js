import React, { useState } from 'react';
import Link from 'next/link';


// gm : material ui ↓
import {
    Button,
    Grid, IconButton,
} from '@material-ui/core';

// gm : styles ↓
import Style from '../../../../styles/Star.module.css'

// gm : files ↓
import CloseSvg from '../../../../public/images/icons/Close dark.svg'

// gm : components ↓

export default function Header({HaveProcced}) {
    // gm : states ↓

    return (
        <Grid item className={Style.Header}>
            <IconButton >
                <img src={CloseSvg.src}/>
            </IconButton>
            <Button className={Style.Logo}>Logo</Button>
            {HaveProcced && (
                <Button className={Style.ProccedBtn} color="secondary" variant='contained'>Procced</Button>
            )}
        </Grid>
    )
}