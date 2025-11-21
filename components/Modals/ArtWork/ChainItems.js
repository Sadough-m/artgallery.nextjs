import React from 'react'

// Matrial 
import { Button, Grid } from '@material-ui/core'

// mrx : Styles ↓
import ArtWorkFlowStyle from '../../../styles/artworkflow.module.css'

// rmx : files  ↓
import Image from 'next/image'
import elipsPic from '../../../public/images/icons/Ellipse 176.svg'
import arrowRight from '../../../public/images/icons/Arrow right blue.svg'


// Component 







export default function ChainItems() {
    return (
        <Grid item>
            <Grid container justifyContent='space-between' alignItems='center'>
                <Grid item>
                    <Grid container spacing={5} alignItems='center'>
                        <Grid item className={ArtWorkFlowStyle.P_elips}>
                            <Image src={elipsPic} />
                            <span className={ArtWorkFlowStyle.lineElips}></span>
                        </Grid>
                        <Grid item className={ArtWorkFlowStyle.chainItems}>Hidden</Grid>
                    </Grid>
                </Grid>
                <Grid item className={ArtWorkFlowStyle.chainItems}>Transfered</Grid>
                <Grid item className={ArtWorkFlowStyle.chainItems}>Date</Grid>
                <Grid item className={ArtWorkFlowStyle.chainItems}>
                    <Button variant='text' color='primary' endIcon={<Image src={arrowRight} />}>More Info</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}
