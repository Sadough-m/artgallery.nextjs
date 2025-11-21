import React, { useState } from 'react';
import Link from 'next/link';


// gm : material ui ↓
import {
    Grid,
} from '@material-ui/core';

// gm : styles ↓
import Style from "../../../../../styles/Star.module.css";

// gm : files ↓
import ProfessionalAppointments from './Main/ProfessionalAppointments';
import GrantsAndAwards from './Main/GrantsAndAwards';

// gm : components ↓

export default function Cv() {
    // gm : states ↓

    return (
        <Grid item className={Style.CV} >
            <span className={Style.ForId} id="CV"></span>
            <Grid item className={Style.CVText}>CV</Grid>
            <ProfessionalAppointments/>
            <GrantsAndAwards/>
        </Grid>
    )
}