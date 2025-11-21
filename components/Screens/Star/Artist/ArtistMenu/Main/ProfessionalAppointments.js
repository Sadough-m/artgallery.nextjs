import React, { useState } from 'react';
import Link from 'next/link';


// gm : material ui ↓
import {
    Grid,
} from '@material-ui/core';

// gm : styles ↓
import Style from "../../../../../../styles/Star.module.css";
import ProfessionalAppointmentsSec from './Sections/ProfessionalAppointmentsSec';

// gm : files ↓

// gm : components ↓

export default function ProfessionalAppointments() {
    // gm : states ↓

    return (
        <Grid item className={Style.ProfessionalAppointments}>
            <Grid item >Professional Appointments</Grid>
            <ProfessionalAppointmentsSec/>
        </Grid>
    )
}