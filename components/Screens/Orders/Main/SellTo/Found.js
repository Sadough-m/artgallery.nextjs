import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

// mrx : material ui ↓
import Grid from '@material-ui/core/Grid'
import { Avatar, Button } from '@material-ui/core'

// mrx : Styles ↓
import Styles from "../../../../../styles/Orders.module.css";
import ArtWorkFlowStyle from '../../../../../styles/artworkflow.module.css'

// rmx : files  ↓
import Image from 'next/image'
import g1 from '../../../../../public/images/sample.png'
import arrowRight from '../../../../../public/images/icons/Arrow right blue.svg'

// mrx : api links ↓
import { BASE_Image_Url } from "../../../../../pages/api/index";

// mrx : components ↓

export default function TypingArtistFound({ Item, handleAddArtist }) {
  return (
    <Grid onClick={() => handleAddArtist(Item)} container direction='column' disabled>
      <Grid item className={Styles.Found}>
        <Grid container alignItems="center">
          <Grid item>
            <img src={BASE_Image_Url + Item?.displayImage} className={Styles.ImgFound} />
          </Grid>
          <Grid item>
            <Grid item className={Styles.NameArtistFound}>
              {(Item?.firstName && Item?.firstName)} {(Item?.lastName && Item?.lastName)}
            </Grid>
            <Grid item className={Styles.EmailArtistFound}>
              {Item?.email}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
