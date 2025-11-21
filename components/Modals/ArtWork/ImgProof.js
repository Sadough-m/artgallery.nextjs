import React from 'react'


// Matrial 
import { Grid } from '@material-ui/core'

// mrx : Styles ↓
import ArtWorkFlowStyle from '../../../styles/artworkflow.module.css'

// rmx : files  ↓
import Image from 'next/image'



// Component 
import ProofImg from '../../../public/images/Proof Img.png'
import hiddenProof from '../../../public/images/hidden proof.png'





export default function ImgProof({isHidden = false}) {
    return (
        <Grid item>
            <Grid container direction='column' alignItems='flex-start'>
                <Grid item>
                    <Image src={isHidden?hiddenProof:ProofImg} className={ArtWorkFlowStyle.imgProof} />
                </Grid>
                <Grid item className={ArtWorkFlowStyle.ProofText}>Title is here</Grid>
            </Grid>
        </Grid>
    )
}
