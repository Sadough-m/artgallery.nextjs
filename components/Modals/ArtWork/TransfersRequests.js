import React from 'react'

// Matrial 
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import {  Container, IconButton, Button, Grid, Fade, Modal } from '@material-ui/core'

// mrx : Styles ↓
import ArtistStyle from '../../../styles/artist.module.css'
import styles from '../../../styles/Home.module.css'
import ArtWorkFlowStyle from '../../../styles/artworkflow.module.css'

// rmx : files  ↓
import Image from 'next/image'
import infoIcon from '../../../public/images/icons/Info.svg'
import closeIcon from '../../../public/images/icons/Close dark.svg'


// Component 





const theme = createTheme({
    props: {
        MuiButton: {
            disableElevation: true
        }
    },
    palette: {
        primary: {
            main: '#3772FF'
        },
        secondary: {
            main: '#F7F8FA'
        },

    },
    overrides: {
        MuiButton: {
            root: {
                textTransform: 'none'
            }
        }
    },
    typography: {
        fontFamily: 'Poppins',
        color: '#242328',
    },
    shape: {
        borderRadius: 8
    },

})
export default function TransfersRequests({ openModal, handleModal, request_Pending = true, payment_Pending = false, rejected_Success = false, rejected_Error = false }) {
    const handleTextTitle = () => {
        if (request_Pending) {
            return 'Transfer “Request pending”'
        }
        else if (payment_Pending) {
            return 'Transfer “Payment pending”'
        }
        else if (rejected_Success || rejected_Error) {
            return 'Transfer “Rejected”'
        }
        else return ''
    }
    const handleBgcolor = () => {
        if (request_Pending) {
            return ArtWorkFlowStyle.bgRqPending
        }
        else if (payment_Pending) {
            return ArtWorkFlowStyle.bgPayPending
        }
        else if (rejected_Success) {
            return ArtWorkFlowStyle.bgRjError
        }
        else if (rejected_Error) {
            return ArtWorkFlowStyle.bgRjSuccess
        }
        else return ''
    }
    const handleTextBtn = () => {
        if (request_Pending || payment_Pending) {
            return 'Notify Again'
        }
        else if (rejected_Success || rejected_Error) {
            return 'Done'
        }
        else return ''
    }
    return (
        <ThemeProvider theme={theme} >
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
                            <Grid item className={ArtistStyle.P_Bg_ModalMedia}>
                                <Grid item className={ArtistStyle.Bg_ModalWhite}>
                                    <Grid item className={ArtistStyle.wrapperModal}>

                                        <Grid item>
                                            <Grid container direction='column' spacing={3}>
                                                <Grid item>
                                                    <Grid container justifyContent='space-between' alignItems='center'>
                                                        <Grid item className={ArtistStyle.Text_AddArtist}>
                                                            {handleTextTitle()}
                                                        </Grid>
                                                        <Grid item>
                                                            <IconButton className={ArtistStyle.IconClose} onClick={() => handleModal()}>
                                                                <Image src={closeIcon} />
                                                            </IconButton>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item className={`${ArtWorkFlowStyle.bg_req_pending} ${handleBgcolor()}`}>
                                                    <Grid container justifyContent='space-between' alignItems='center'>
                                                        <Grid item xs={1} className={ArtWorkFlowStyle.imgReq}>
                                                            <Image src={infoIcon} />
                                                        </Grid>
                                                        <Grid item xs={11} className={styles.fs_12}>This will create an order. Mark this order as pending
                                                            payment if you will receive $226.90 outside of Artiverse.</Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item>
                                                    <Grid container direction='column' spacing={0}>
                                                        <Grid item>
                                                            <Button variant='contained' color='primary' fullWidth className={`${ArtistStyle.Button_Add_Artist1} ${ArtistStyle.btnDeactive}`}>{handleTextBtn()}</Button>
                                                        </Grid>
                                                        <Grid item>
                                                            <Button variant='contained' color='secondary' fullWidth className={`${ArtistStyle.Button_Add_Artist1}`}>Abort</Button>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Fade>
                    </Modal>
                </Grid>
            </Container>

        </ThemeProvider>
    )
}
