import React, { useState, useEffect } from 'react'
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

import archiveMd from '../../public/images/icons/archiveMd.svg';
import UnarchiveMd from '../../public/images/icons/unarchiving.svg';

import Image from 'next/image'


export default function Archive({
    ISArchived,
    openModal,
    setopenArchiveMd,
    handleArchiveMd,
    handleArchiveMdRightNow
}) {
    const Name = typeof window !== "undefined" ? localStorage.getItem("artist-archiving-name") || "" : "";

    return (
            <Container>
                <Grid item >
                    <Modal
                        className={ArtistStyle.Modal}
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={openModal}
                        onClose={() => {
                            setopenArchiveMd(false);
                            localStorage.removeItem("artist-archiving-name");
                            localStorage.removeItem("artist-archiving-Status");
                        }}
                        closeAfterTransition
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={openModal}>
                            <Grid item className={ArtistStyle.P_Bg_Modal2}>
                                <Container>
                                    <Grid item className={ArtistStyle.Bg_Modal1}>
                                        <Grid item className={ArtistStyle.wrapperModal}>
                                            <Grid container direction='column' spacing={2}>
                                                <Grid item>
                                                    <Grid container justifyContent='space-between' alignItems='center'>
                                                        <Grid item className={ArtistStyle.Text_AddArtist}>
                                                            {
                                                                ISArchived === true ? (
                                                                    <Image src={UnarchiveMd} />
                                                                ) : (
                                                                    <Image src={archiveMd} />
                                                                )
                                                            }
                                                        </Grid>
                                                        <Grid item>
                                                            <IconButton className={ArtistStyle.IconClose} onClick={() => {
                                                                setopenArchiveMd(false);
                                                                localStorage.removeItem("artist-archiving-name");
                                                            }}>
                                                                <CloseIcon color='secondary' fontSize='small' />
                                                            </IconButton>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item className={ArtistStyle.textArchive}>
                                                    You are {ISArchived === true ? ("unarchiving") : ("archiving")} “{Name ? Name : ""}”,<br />
                                                    Are you sure?
                                                </Grid>
                                                <Grid item>
                                                    <Button
                                                        onClick={() => {
                                                            handleArchiveMdRightNow();
                                                            localStorage.removeItem("artist-archiving-name");
                                                        }}
                                                        variant='contained'
                                                        color='primary'
                                                        className={ArtistStyle.Button_Add_Artist}
                                                    >
                                                        <span className={ArtistStyle.text_None}>
                                                            Yes, {ISArchived === true ? ("unArchive") : ("Archive")}
                                                        </span>
                                                    </Button>
                                                </Grid>
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
