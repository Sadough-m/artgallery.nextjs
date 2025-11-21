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
                direction="row"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh' }}
            >
                <h1 style={{ fontSize: '3rem' }}>
                    Verifying
                </h1>
                <Image style={{ marginTop: '5px' }} src={Loading} />
            </Grid>
        </>
    );
};
