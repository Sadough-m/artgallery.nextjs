import React, { useState } from 'react';
import Link from 'next/link';


// gm : material ui ↓
import {
    Grid,
} from '@material-ui/core';

// gm : styles ↓
import Style from "../../../../../../styles/Star.module.css";

// gm : files ↓

// gm : components ↓
import ProfessionalAppointmentsSec from './Sections/GrantsSec';
import GrantsSec from './Sections/GrantsSec';

export default function GrantsAndAwards() {
    // gm : states ↓

    return (
        <Grid item className={Style.ProfessionalAppointments}>
            <Grid item >Grants and Awards</Grid>
            <GrantsSec/>
            <GrantsSec/>
        </Grid>
    )
}