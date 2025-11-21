import React, { useState } from 'react';
import Link from 'next/link';


// gm : material ui ↓
import {
    Button,
    Grid,
} from '@material-ui/core';

// gm : styles ↓
import Style from "../../../../styles/Star.module.css";
import ShippingItem from './ShippingItem';

// gm : files ↓
import PlusCircleSvg from '../../../../public/images/icons/Plus - Circle.svg'

// gm : components ↓

export default function ChooseShipping() {
    // gm : states ↓

    return (
        <Grid item className={Style.ChooseShipping}>
            <Grid item className={Style.ChoosetTxt}>Choose shipping</Grid>
            <ShippingItem/>
            <ShippingItem/>
            <Button color="primary" startIcon={<img src={PlusCircleSvg.src}/>} className={Style.BtnReq}>Request Custom Services</Button>
        </Grid>
    )
}