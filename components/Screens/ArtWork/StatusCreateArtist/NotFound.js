import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';

// mrx : material ui ↓
import { Grid, Button } from '@material-ui/core'

// mrx : Styles ↓
import ArtWorkFlowStyle from '../../../../styles/artworkflow.module.css'
import styles from '../../../../styles/Home.module.css'

// mrx : setCookies with this
import Cookies from "js-cookie";

// rmx : files  ↓

// mrx : components ↓
import searchError from '../../../../public/images/icons/Seach error.svg'
import plus from '../../../../public/images/icons/Plus - Circle.svg'

export default function NotFound() {
    const router = useRouter();
    return (
        <Grid item className={ArtWorkFlowStyle.boxNotFound} >
            <Grid container justifyContent='space-between' alignItems='center' >
                <Grid item>
                    <Grid container spacing={1} alignItems='center'>
                        <Grid item className={ArtWorkFlowStyle.searchError}>
                            <Image src={searchError} />
                        </Grid>
                        <Grid item className={ArtWorkFlowStyle.artistNotFound}>Artist not found</Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Button
                        onClick={() => {
                            router.push("/artist/add");
                            Cookies.set("add-artist-from-artwork", true);
                        }}
                        variant='text'
                        color='primary'
                        startIcon={<Image src={plus} />}>
                        <span className={`${styles.text__trs__none}`}
                        >
                            Add Artist
                        </span>
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}
