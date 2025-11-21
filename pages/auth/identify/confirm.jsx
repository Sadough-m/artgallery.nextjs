import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// mrx : material ui ↓
import {
    Hidden,
    Button,
    Grid,
    Container,
    IconButton,
} from '@material-ui/core';

// rmx : files  ↓
import Loading from '../../../public/loading.svg';


// mrx : styles ↓
import styles from '../../../styles/identify.module.css';

export default function verify() {
    return (
        <>
            <Grid
                lg={12}
                md={12}
                xs={12}
                sm={12}
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh' }}
            >
                <h1 className={styles.Title}>
                    Awaiting Confirmation
                </h1>
                <b>Do not close this window until opening the email link.</b>
                <p className={styles.Description}>
                    We just sent an email to
                    <b>
                        <a className={styles.Link} href="https://mail.google.com" >
                             mrx427173@gmail.com 
                        </a>
                    </b>
                    (<Link className={styles.Undo} href="#">undo</Link>)
                    {/* <br />Verify that the provided security code matches the following text: */}
                </p>
            </Grid>
        </>
    );
};
