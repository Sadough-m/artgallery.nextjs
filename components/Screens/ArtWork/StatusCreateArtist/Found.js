import React, { useEffect, useState } from 'react'

// mrx : material ui ↓
import Grid from '@material-ui/core/Grid'
import { Avatar, Button } from '@material-ui/core'

// mrx : Styles ↓
import styles from '../../../../styles/Home.module.css'
import ArtWorkFlowStyle from '../../../../styles/artworkflow.module.css'

// rmx : files  ↓
import guy1 from '../../../../public/images/icons/pic guy1.svg';
import Image from 'next/image'
import g1 from '../../../../public/images/sample.png'
import g2 from '../../../../public/images/icons/g2.png'
import g3 from '../../../../public/images/icons/g3.png'
import arrowRight from '../../../../public/images/icons/Arrow right blue.svg'
import { toast } from 'react-toastify'

// mrx : api links ↓
import { BASE_Image_Url } from "../../../../pages/api/index";

// mrx : components ↓

export default function TypingArtistFound({ Item, handleAddArtist }) {

    const [MoreImageNumber, setMoreImageNumber] = useState(0);

    useEffect(() => {
        var all = Item?.userArtworkImage?.length > 4 ? Item?.userArtworkImage?.length : 0;
        if (all === 0) {
            var num = all - 0;
        } else {
            var num = all - 4 + 1;
        }
        setMoreImageNumber(num);
    }, [])


    return (
        <Grid onClick={() => handleAddArtist(Item)} container direction='column' disabled>
            <Grid item className={ArtWorkFlowStyle.bgOnHoverUser}>
                <Grid container justifyContent='space-between' alignItems='center' className={ArtWorkFlowStyle.P_wrapperAvatar}>
                    <Grid item>
                        <Grid container className={ArtWorkFlowStyle.Wrapper_avatar} alignItems='center' spacing={1}>
                            <Grid item>
                                <Avatar style={{ width: '20px', height: '20px' }}>
                                    <img style={{ width: '100%' }} src={BASE_Image_Url + Item?.profileImage} />
                                </Avatar>
                            </Grid>
                            <Grid item className={ArtWorkFlowStyle.userName}>
                                {Item?.firstName + " " + Item?.lastName}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item className={ArtWorkFlowStyle.Pbutton_view}>
                        <Button color='primary' endIcon={<Image src={arrowRight} />}>View Artist</Button>
                    </Grid>
                </Grid>
                {
                    Item?.userArtworkImage?.length >= 1 && MoreImageNumber !== 0 && (
                        <Grid container className={ArtWorkFlowStyle.ImagesModal} spacing={1}>
                            {Item?.userArtworkImage.slice(0, 3)?.map((Item, index) => (
                                <Grid item key={index}>
                                    <img  src={BASE_Image_Url + Item} width={'65px'} height={'65px'} className={ArtWorkFlowStyle.img_Modal} />
                                </Grid>
                            ))}
                            <Grid item className={ArtWorkFlowStyle.pos_relative}>
                                <img src={g1.src}  className={`${ArtWorkFlowStyle.img_Modal} ${ArtWorkFlowStyle.Last_img_Modal}`} />
                                <span className={ArtWorkFlowStyle.num_arts}>+{MoreImageNumber}</span>
                            </Grid>
                        </Grid>
                    )
                }
            </Grid>
        </Grid>
    )
}
