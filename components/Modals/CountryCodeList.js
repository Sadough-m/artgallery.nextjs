import { Grid } from '@material-ui/core'
import Image from 'next/image'
import React from 'react'
import ArtistStyle from '../../styles/artist.module.css'
import Usa from '../../public/images/icons/USA.svg'

export default function CountryCodeList({ handleModal }) {
    return (
        <Grid container direction='column'>
            <Grid item>
                <Grid container justifyContent='space-between' className={`${ArtistStyle.listCountries}`} onClick={() => handleModal()} >
                    <Grid item>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Image src={Usa} />
                            </Grid>
                            <Grid item>USA</Grid>
                        </Grid>
                    </Grid>
                    <Grid item>+01</Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
