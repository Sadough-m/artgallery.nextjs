import React from 'react'
import { useRouter } from 'next/router';
import { ToastContainer, toast } from "react-toastify";

// Matrial 
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import { Avatar, Container, IconButton, Button, Grid, Fade, Modal } from '@material-ui/core'


// mrx : Styles ↓
import styles from '../../../styles/Home.module.css'
import ArtWorkFlowStyle from '../../../styles/artworkflow.module.css'
import ArtistStyle from '../../../styles/artist.module.css'

// mrx : cookie
import Cookies from "js-cookie";

// rmx : files  ↓
import Image from 'next/image'
import closeIcon from '../../../public/images/icons/Close dark.svg'
import removeImg from '../../../public/images/remove img Modal.png'
import phisicalCertificateImg from '../../../public/images/phisical certificate.png'

// Component 

// mrx : api links ↓
import {
    DELETE_OR_ARCHIVE_ARTWORK,
} from "../../../pages/api/index";

// mrx : api ↓
import {
    PostUrl,
    DeleteAuthUrl,
    PostAuthUrl,
    GetUrl,
    GetAuthUrl,
} from "../../../pages/api/config";


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
export default function RemoveAndArchive({
    openModal,
    ArtWorkID,
    IsMain,
    handleModal,
    remove = false,
    archive = false,
    Title = false,
    phisicalCertificate = false,
    phisicalCertificate_After = false,
}) {
    const router = useRouter();

    const handleText = () => {
        if (remove) {
            return `Are you sure you want to remove
         “${Title}” ?`
        }
        else if (archive) {
            return `Your creation is minted, you can only
            archive it. Are you sure you want to archive
         “${Title}” ?`
        }
        else if (phisicalCertificate) {
            return `For requesting “physical ceritifcate 
            you have to first enter your shipping info.`
        }
        else if (phisicalCertificate_After) {
            return `You are requesting “physical certificate”
            for “Black swan”. After your successfull
            payment of “$ 2.00”, you will recieve a
            tracking number shortly in email.`
        }
        else return ''
    }

    const handleTextBtn = () => {
        if (remove) {
            return 'Yes, Remove'
        } else if (archive) {
            return 'Procced'
        } else {
            return ''
        }
    }

    const handleFBtn = () => {
        if (remove) {
            REMOVE_OR_ARHIVE_ARTWROK()
        } else if (archive) {
            REMOVE_OR_ARHIVE_ARTWROK()
        } else {
            return ''
        }
    }

    const handlePic = () => {
        if (remove || archive || phisicalCertificate) {
            return removeImg
        }
        else if (phisicalCertificate_After) {
            return phisicalCertificateImg
        }
        else {
            return removeImg
        }
    }

    // mrx :REMOVE OR ARCHIVE Start --------------------------------------------------------------------------------------------
    const REMOVE_OR_ARHIVE_ARTWROK = () => {
        DeleteAuthUrl(DELETE_OR_ARCHIVE_ARTWORK(localStorage.getItem("collectionId"), ArtWorkID, Cookies.get("ClassificationID"), IsMain)).then(
            (res, err) => {
                if (res && res.status === 200) {
                    if (res?.data?.isSuccess) {
                        if (IsMain !== true) {
                            router.push("/artwork")
                        } {
                            router.push("/artwork")
                            // router.back()
                        }
                    } else {
                    }
                } else {
                    toast.error("something went wrong !");
                }
            }
        );
    };
    // End ---------------------------------------------------------------------------------------------------------------------

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
                                                <Grid item className={styles.mt_10}>
                                                    <Grid container justifyContent='space-between' alignItems='center'>
                                                        <Grid item>
                                                            <Image src={handlePic()} />
                                                        </Grid>
                                                        <Grid item>
                                                            <IconButton className={ArtistStyle.IconClose} onClick={() => handleModal()}>
                                                                <Image src={closeIcon} />
                                                            </IconButton>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                                <Grid item className={`${ArtWorkFlowStyle.textArchiveModal}`}>
                                                    {handleText()}
                                                </Grid>
                                                <Grid item>
                                                    <Grid container direction='column' spacing={0}>
                                                        <Grid item>
                                                            <Button
                                                                onClick={() => handleFBtn()}
                                                                variant='contained'
                                                                color='primary'
                                                                fullWidth
                                                                className={`${ArtistStyle.Button_Add_Artist1} `}
                                                            >
                                                                {handleTextBtn()}
                                                            </Button>
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
