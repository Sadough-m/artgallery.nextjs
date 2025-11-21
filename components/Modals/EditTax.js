import React, { useState } from 'react'
// MATERIAL UI
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
import Joi from "joi";

import TextArea from '../Forms/TextArea'
import CustomCheckBox from '../Forms/CustomCheckBox'

// mrx : api links ↓
import { EDIT_TAX } from "../../pages/api/index";

// mrx : api ↓
import {
    PostUrl,
    PostAuthUrl,
    GetUrl,
    GetAuthUrl,
    PutAuthUrl,
} from "../../pages/api/config";
import { toast } from "react-toastify";



export default function EditTax({ Data, value, setValue, openModal, handleModal }) {
    // mrx : save artist
    const handleEditTAX = () => {
        GetAuthUrl(EDIT_TAX(localStorage.getItem("collectionId"), Data?.id)).then((res, err) => {
            if (res && res.status === 200) {
                if (res?.data?.isSuccess) {
                    toast.success(`Tax settings successfully Edited`);
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
                        onClose={handleModal}
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
                                                <Grid item className={ArtistStyle.Text_titleModal}>Tax settings</Grid>
                                                <Grid item>
                                                    <IconButton className={ArtistStyle.IconClose} onClick={() => handleModal()}>
                                                        <CloseIcon color='secondary' fontSize='small' />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>

                                            <Grid item>
                                                <CustomCheckBox checked={value} setChecked={setValue} label='Collect tax' />
                                            </Grid>

                                            <Grid item>
                                                <Button onClick={() => handleEditTAX()} variant='contained' color='primary' className={ArtistStyle.Button_Add_Artist}><span className={ArtistStyle.text_None}>Save Changes</span></Button>
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
