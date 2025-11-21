import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Joi from "joi";

// good man : material ui ↓
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

// mrx : styles ↓
import signUpStyle from '../../../styles/signUp.module.css'
import styles from '../../../styles/Home.module.css';

// good man : files ↓
import ArrowLeft from '../../../public/images/icons/Arrow down.svg';

// good man : Component ↓
import TextArea from '../../Forms/TextArea';
// import Section from './Section';

export default function Bio() {
    // mrx : Bio states ↓
    const [bio, setbio] = useState("");

    // step-2 education data
    const GET_ADDED_DATA = typeof window !== "undefined" ? localStorage.getItem("Step2-Bio") : "";

    // mrx : local storage ↓
    // 
    // mrx : set local data for bio ↓
    const handleSetLocalBio = (e) => {
        localStorage.setItem("Step2-Bio", bio);
    }

    useEffect(() => {
        setbio(GET_ADDED_DATA);
    }, [])

    useEffect(() => {
        handleSetLocalBio()
    }, [bio]);

    return (
        <Grid container alignItems='center' direction='column' className={`${signUpStyle.box}`} >
            <span className={signUpStyle.obj_for_id} id='Bio'></span>

            <Grid item className={`${signUpStyle.title}`}>Bio</Grid>

            {/* <Section
                addedData={'[]'}
                title='Saved Info'
            /> */}

            <Grid item className={`${styles.w_100}`}>
                <TextArea
                    value={bio === "null" ? "" : bio}
                    setValue={(e) => {
                        setbio(e);
                    }}
                    schema={Joi.optional()}
                    name="bio"
                    label='Write bio' placeHolder='Write your long text here' />

                {/* mrx : testing local data ↓ */}
                {/* <Button onClick={() => handleSetLocalBio()}> sdfssdfs</Button> */}
            </Grid>

        </Grid >
    )
}

