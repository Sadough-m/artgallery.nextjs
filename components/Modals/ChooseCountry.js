import React, { useState } from 'react'
// MATERIAL UI
import Modal from '@material-ui/core/Modal'
import Fade from '@material-ui/core/Fade'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { Avatar, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

// components
import ArtistStyle from '../../styles/artist.module.css'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import CountryCodeList from './CountryCodeList'



export default function ChooseCountry({ openModal, handleModal }) {


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
                            <Grid item className={ArtistStyle.P_Bg_Modal2}>
                                <Container>
                                    <Grid item className={ArtistStyle.Bg_Modal}>

                                        <Grid item className={`${ArtistStyle.wrapperModal}`}>
                                            <Grid container justifyContent='space-between' alignItems='center' className={ArtistStyle.mb_10}>
                                                <Grid item className={`${ArtistStyle.Text_AddArtist} `}>Select Country Code</Grid>
                                                <Grid item>
                                                    <IconButton className={ArtistStyle.IconClose} onClick={() => handleModal()}>
                                                        <CloseIcon color='secondary' fontSize='small' />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                            <Grid item className={ArtistStyle.MaiItemInModal1}>
                                                <CountryCodeList handleModal={() => handleModal()} />
                                                <CountryCodeList handleModal={() => handleModal()} />
                                                <CountryCodeList handleModal={() => handleModal()} />
                                                <CountryCodeList handleModal={() => handleModal()} />
                                                <CountryCodeList handleModal={() => handleModal()} />
                                                <CountryCodeList handleModal={() => handleModal()} />
                                                <CountryCodeList handleModal={() => handleModal()} />
                                                <CountryCodeList handleModal={() => handleModal()} />
                                                <CountryCodeList handleModal={() => handleModal()} />
                                                <CountryCodeList handleModal={() => handleModal()} />

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
