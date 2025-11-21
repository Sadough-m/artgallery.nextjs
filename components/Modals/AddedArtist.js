import React from 'react'
import Image from 'next/image'
import { useRouter } from "next/router";

// mrx : material ui
import Grid from '@material-ui/core/Grid'
import { IconButton } from '@material-ui/core';

// mrx : style
import ArtistStyle from '../../styles/artist.module.css'

// mrx : files
import pic from '../../public/images/icons/pic guy1.svg';
import close from '../../public/images/icons/Close dark.svg';
import { BASE_Image_Url } from '../../pages/api';


export default function AddedArtist({
    firstName,
    lastName,
    Search,
    setArtistList,
    id,
    DisplayImage,
    setSearching,
    removeItem,
    HaveIcon = false,
}) {

    const router = useRouter();
    const handleAddingArtist = () => {
        setArtistList([{
            firstName: firstName,
            id: id,
            lastName: lastName,
            displayImage: DisplayImage,
        }])
        setSearching(false);
        localStorage.setItem("Adding-Artist-firstName", firstName && firstName);
        localStorage.setItem("Adding-Artist-lastName", lastName && lastName);
    }

    return (
        <Grid item className={ArtistStyle.BG_FindUser1}>
            <Grid onClick={() => handleAddingArtist()} container justifyContent='space-between' alignItems='center' className={ArtistStyle.bgGray}>
                <Grid item>
                    <Grid container className={ArtistStyle.wrapper_foundUser} alignItems='center' >
                        <Grid item className={ArtistStyle.mt_5}>
                            <img src={BASE_Image_Url + DisplayImage} width={'22px'} height={'22px'} className={ArtistStyle.img_circle} />
                        </Grid>
                        <Grid item className={ArtistStyle.ArtistName}>{firstName + " " + lastName}</Grid>
                    </Grid>
                </Grid>

            </Grid>
            {
                Search === false && (
                    <Grid onClick={() => removeItem()}
                        style={{
                            zIndex: 111,
                            position: "absolute",
                            top: "3px",
                        }}
                        item className={ArtistStyle.iconClose_1}>
                        <IconButton size='small'><Image src={close} /></IconButton>
                    </Grid>
                )
            }
        </Grid >
    )
}
