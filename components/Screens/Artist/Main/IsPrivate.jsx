import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Joi from "joi";
import CustomCheckBox from "../../../Forms/CustomCheckBox";

// good man : material ui ↓
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

// mrx : styles ↓
import signUpStyle from '../../../../styles/signUp.module.css'
import styles from '../../../../styles/Home.module.css';

// good man : files ↓

// good man : Component ↓
import TextArea from '../../../Forms/TextArea';
// import Section from './Section';

export default function Bio({ userRegisterBySelf, IsPrivateY = false, setIsPrivateData, IsPrivateData }) {
    // mrx : Bio states ↓
    return (
        <Grid container direction='column' className={`${signUpStyle.box}`} >
            <Grid item className={`${signUpStyle.title}`}>CV Status</Grid>
            <Grid item style={{ marginTop: '0px' }}>
                <CustomCheckBox
                    disabled={IsPrivateY === true ? IsPrivateY : userRegisterBySelf}
                    setChecked={setIsPrivateData}
                    checked={IsPrivateData}
                    label="Is Private"
                />
            </Grid>

        </Grid >
    )
}

