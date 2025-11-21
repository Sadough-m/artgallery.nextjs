import React, { useState } from 'react';
import Image from 'next/image'

// mrx : cookie ↓

// mrx : styles ↓
import HeaderStyles from '../../../styles/Header.module.css'

// mrx : material ui ↓
import {Grid} from '@material-ui/core';

// mrx : file ↓
import collectionImg from '../../../public/images/bgCollection.png'

// mrx : Components ↓


export default function ItemCol({itemCol, id, selectCollection, title, img}) {
    
    return (
        <Grid item className={HeaderStyles.itemCol} onClick={()=>selectCollection(id)}>
            {(itemCol === id) && (
                <Grid item className={HeaderStyles.BgCollection}>
                    <Image src={collectionImg} />
                </Grid>
            )}
            <Grid container alignItems='center' spacing={2} className={`${HeaderStyles.Bg_Collection_items} ${itemCol !== id ? HeaderStyles.bg_when_not_image : ''}`}>
                <Grid item>
                    <Image src={img} width={'48px'} height={'48px'} />
                </Grid>
                <Grid item className={HeaderStyles.title_and_info_col}>
                    <Grid container direction='column' spacing={1}>
                        <Grid item className={HeaderStyles.collection_title}>{title}</Grid>
                        <Grid item className={HeaderStyles.collection_info}>Lorem ipsum dolor sit amet, conse
                            tetur apiscing elit. Volutpat, arcu
                            nec risus conseq at urna nunc.
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}