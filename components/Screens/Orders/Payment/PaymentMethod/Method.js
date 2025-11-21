import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';


// gm : material ui ↓
import {
    Grid,
} from '@material-ui/core';
import CustomCheckBox from '../../../../Forms/CustomCheckBox';

// gm : styles ↓
import Style from "../../../../../styles/Orders.module.css";

// gm : files ↓

// gm : components ↓

export default function Method({logo}) {
    // gm : states ↓
    const [Checked, setChecked] = useState(false)

    return (
        <Grid container justifyContent='space-between' alignItems='center' className={Style.Method}>
            <Grid item className='posRel'>
                <CustomCheckBox label="Amir Nikkhah" fontWeight='500' setChecked={setChecked} checked={Checked}/>
                <Grid item className={Style.CartNum}>**** **** **** 5022</Grid>
            </Grid>
            <Grid item>
                <img src={logo.src} className={Style.LogoMethod}/>
            </Grid>
        </Grid>
    )
}