import React, { useState } from 'react'
// MATERIAL UI
import Joi from "joi";

import Modal from '@material-ui/core/Modal'
import Fade from '@material-ui/core/Fade'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

// components
import ArtistStyle from '../../styles/artist.module.css'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'

import TextArea from '../Forms/TextArea'


// mrx : api links ↓
import { EDIT_BIO } from "../../pages/api/index";

// mrx : api ↓
import {
    PostUrl,
    PostAuthUrl,
    GetUrl,
    GetAuthUrl,
    PutAuthUrl,
} from "../../pages/api/config";
import { toast } from "react-toastify";



export default function EditBio({ Data, value, setValue, openModal, handleModal }) {

    // mrx : save artist
    const handleEditBio = () => {
        PutAuthUrl(EDIT_BIO, {
            "id": Data?.cvBuilderId,
            "bio": value
        }).then((res, err) => {
            if (res && res.status === 200) {
                if (res?.data?.isSuccess) {
                    toast.success(`Bio successfully edited`);
                    handleModal()
                } else {
                    toast.error(res?.data?.message);
                }
            } else {
                toast.error("something went wrong !");
            }
        });
    }

    return (
            <Container>
                <Grid item >
                    <Modal
                        className={ArtistStyle.Modal}
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={openModal}
                        // onClose={handleModal}
                        closeAfterTransition
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={openModal}>
                            <Grid item className={ArtistStyle.P_Bg_ModalBio}>
                                <Container>
                                    <Grid item className={ArtistStyle.Bg_Modal1}>
                                        <Grid item className={ArtistStyle.wrapperModal}>
                                            <Grid container justifyContent='space-between' alignItems='center'>
                                                <Grid item className={ArtistStyle.Text_titleModal}>Edit artist bio</Grid>
                                                <Grid item>
                                                    <IconButton className={ArtistStyle.IconClose} onClick={() => { handleModal(); setValue(Data?.bio) }}>
                                                        <CloseIcon color='secondary' fontSize='small' />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>

                                            <Grid item>
                                                <TextArea
                                                    schema={Joi.optional()}
                                                    label='Bio'
                                                    placeHolder='Hello, i’m an artists...'
                                                    value={value}
                                                    setValue={setValue}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Button
                                                    onClick={() => handleEditBio()}
                                                    variant='contained'
                                                    color='primary'
                                                    className={ArtistStyle.Button_Add_Artist}>
                                                    <span className={ArtistStyle.text_None}>
                                                        Save Changes
                                                    </span>
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Container>
                            </Grid>
                        </Fade>
                    </Modal>
                </Grid>
            </Container>

    )

}
