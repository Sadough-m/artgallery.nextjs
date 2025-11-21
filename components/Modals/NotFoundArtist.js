import React from 'react'

import Grid from '@material-ui/core/Grid'





// components
import ArtistStyle from '../../styles/artist.module.css'

export default function NotFoundArtist({ found }) {
    if (!found) {
        return (
            <Grid item className={ArtistStyle.BG_FindUser}>
                <Grid item className={ArtistStyle.Text_NotFound}>Not Found</Grid>
            </Grid>
        )
    }
    else{
        return(
            <></>
        )
    }
}
