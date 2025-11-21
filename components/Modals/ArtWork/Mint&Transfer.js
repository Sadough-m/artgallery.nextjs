import React, { useState } from 'react'



// Matrial 
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import { IconButton,Button, Container, Grid, Fade, Modal } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';


// mrx : Styles ↓
import ArtistStyle from '../../../styles/artist.module.css'
import styles from '../../../styles/Home.module.css'
import ArtWorkFlowStyle from '../../../styles/artworkflow.module.css'

// rmx : files  ↓
import Image from 'next/image'
import foxIcon from '../../../public/images/icons/fox.svg'

// Component 
import CustomSelect from '../../Forms/CustomSelect'

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
            main: '#242328'
        },
        tertiary: {
            main: '#F7F8FA'
        }
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

const OptionList = [{ id: 1, name: 'View all' }, { id: 2, name: 'HIdden all' }, { id: 3, name: 'For owners' },]

export default function MintTransfer({ openModal, handleModal }) {
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
                                                        <Grid item className={ArtistStyle.Text_AddArtist}>Mint & Transfer</Grid>
                                                        <Grid item>
                                                            <IconButton className={ArtistStyle.IconClose} onClick={() => handleModal()}>
                                                                <CloseIcon color='secondary' fontSize='small' />
                                                            </IconButton>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                                <Grid item className={styles.fs_14}>
                                                    To mint an artwork your have to connect your wallet
                                                </Grid>
                                                <Grid item className={ArtWorkFlowStyle.P_foxAndText}>
                                                    <Grid container align='center' justifyContent='space-between' alignItems='center'>
                                                        <Grid item className={ArtWorkFlowStyle.text_metamask}>
                                                            Connect to MetaMask
                                                        </Grid>
                                                        <Grid item className={ArtWorkFlowStyle.imgFox}>
                                                            <Image src={foxIcon} />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                                <Grid item className={ArtWorkFlowStyle.txtPayment1}>To use metamask you must verify your identiy.</Grid>
                                                <Grid item>
                                                    <Button variant='contained' color='primary' fullWidth className={`${ArtistStyle.Button_Add_Artist1}`}>Done</Button>
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
