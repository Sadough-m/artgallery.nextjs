import React, { useState } from 'react'



// Matrial 
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import { IconButton, Button, Container, Grid, Fade, Modal } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';

// mrx : Styles ↓
import ArtistStyle from '../../../styles/artist.module.css'
import styles from '../../../styles/Home.module.css'
import ArtWorkFlowStyle from '../../../styles/artworkflow.module.css'

// rmx : files  ↓
import Image from 'next/image'
import PicModal from '../../../public/images/pic Modal artwork.png'
import info from '../../../public/images/icons/Info gray.svg'
import QrCode from '../../../public/images/qr code.png'


// Component 
import ImgProof from './ImgProof'
import ChainItems from './ChainItems'

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

    },
    overrides: {
        MuiButton: {
            root: {
                textTransform: 'none',
                fontSize: "14px"
            }
        }
    },
    typography: {
        fontFamily: 'Poppins',
        color: '#242328',
    },
    shape: {
        borderRadius: 6
    },
    spacing: 3

})


export default function ArtWorkV2({ openModal, handleModal, haveSeralPages = true }) {
    const [buttonSelected, setbuttonSelected] = useState('Information')
    const handleButtonSelected = (value) => {
        setbuttonSelected(value)
    }

    const [pageSelected, setPageSelected] = useState('Limited edition')
    const handlePageSelected = (value) => {
        setPageSelected(value)
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
                            <Grid item className={ArtistStyle.P_Bg_ModalArtwork1}>
                                <Grid container direction='column' >
                                    {haveSeralPages && (
                                        <Grid item className={ArtWorkFlowStyle.P_buttonsTop}>
                                            <Grid container spacing={3}>
                                                <Grid item>
                                                    <Button variant={pageSelected === 'Limited edition' ? 'contained' : ''} color={pageSelected === 'Limited edition' ? 'secondary' : ''} className={pageSelected !== 'Limited edition' ? ArtWorkFlowStyle.btnBgwhite : ArtWorkFlowStyle.btnSelectedTop}
                                                        onClick={() => handlePageSelected('Limited edition')}>Limited edition</Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant={pageSelected === '01' ? 'contained' : ''} color={pageSelected === '01' ? 'secondary' : ''} className={pageSelected !== '01' ? ArtWorkFlowStyle.btnBgwhite : ArtWorkFlowStyle.btnSelectedTop}
                                                        onClick={() => handlePageSelected('01')}>01</Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant={pageSelected === '02' ? 'contained' : ''} color={pageSelected === '02' ? 'secondary' : ''} className={pageSelected !== '02' ? ArtWorkFlowStyle.btnBgwhite : ArtWorkFlowStyle.btnSelectedTop}
                                                        onClick={() => handlePageSelected('02')}>02</Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant={pageSelected === '03' ? 'contained' : ''} color={pageSelected === '03' ? 'secondary' : ''} className={pageSelected !== '03' ? ArtWorkFlowStyle.btnBgwhite : ArtWorkFlowStyle.btnSelectedTop}
                                                        onClick={() => handlePageSelected('03')}>03</Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    )}
                                    <Grid item className={ArtistStyle.Bg_ModalWhite1}>
                                        <Grid item className={ArtistStyle.wrapperModal1}>
                                            <Grid item>
                                                <Grid container justifyContent='space-between' >
                                                    <Grid item xs={4} className={ArtWorkFlowStyle.bgLeftSide}>
                                                        <span className={ArtWorkFlowStyle.bg_half1}></span>

                                                        <Grid container direction='column' spacing={9} >
                                                            <Grid item className={ArtWorkFlowStyle.P_button_logo}>
                                                                <Button className={ArtWorkFlowStyle.button_logo}>Logo</Button>
                                                            </Grid>
                                                            <Grid item>
                                                                <Grid container direction='column' spacing={1}>
                                                                    <Grid item>
                                                                        <Image src={PicModal} className={ArtWorkFlowStyle.imgModalArt} />
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <Grid container spacing={3}>
                                                                            <Grid item>
                                                                                <Image src={PicModal} className={ArtWorkFlowStyle.imgModalArt} width={'50px'} height={'50px'} />
                                                                            </Grid>
                                                                            <Grid item>
                                                                                <Image src={PicModal} className={ArtWorkFlowStyle.imgModalArt} width={'50px'} height={'50px'} />
                                                                            </Grid>
                                                                            <Grid item>
                                                                                <Image src={PicModal} className={ArtWorkFlowStyle.imgModalArt} width={'50px'} height={'50px'} />
                                                                            </Grid>
                                                                            <Grid item>
                                                                                <Image src={PicModal} className={ArtWorkFlowStyle.imgModalArt} width={'50px'} height={'50px'} />
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item>
                                                                <Grid container direction='column' >
                                                                    <Grid item className={ArtWorkFlowStyle.P_txtAndBadge}>
                                                                        <Grid container spacing={2} alignItems='center'>
                                                                            <Grid item ><span className={ArtWorkFlowStyle.badge_green}></span></Grid>
                                                                            <Grid item className={` ${ArtWorkFlowStyle.txt_15_500}`}>Available</Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item className={ArtWorkFlowStyle.P_txtAndBadge1}>
                                                                        <Grid container justifyContent='space-between' alignItems='center'>
                                                                            <Grid item>
                                                                                <Grid container spacing={2} alignItems='center'>

                                                                                    <Grid item ><span className={ArtWorkFlowStyle.badge_green}></span></Grid>
                                                                                    <Grid item className={` ${ArtWorkFlowStyle.txt_15_500}`}>Chain info</Grid>
                                                                                </Grid>
                                                                            </Grid>
                                                                            <Grid item className={ArtWorkFlowStyle.p_iconInfo}>
                                                                                <Image src={info} />
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid item xs={8}>
                                                        <Grid container direction='column' className={ArtWorkFlowStyle.p_Itemss} >
                                                            <Grid item >
                                                                <Grid container justifyContent='space-between' alignItems='center' >
                                                                    <Grid item>
                                                                        <Grid container alignItems='center' spacing={4}>
                                                                            <Grid item>
                                                                                <Button variant={buttonSelected === 'Information' ? 'contained' : ''} color={buttonSelected === 'Information' ? 'secondary' : ''}
                                                                                    className={`${buttonSelected !== 'Information' ? ArtWorkFlowStyle.btn_Not_Selected : ''} ${styles.fw_400}`} onClick={() => handleButtonSelected('Information')}>Information</Button>
                                                                            </Grid>
                                                                            <Grid item>
                                                                                <Button variant={buttonSelected === 'Proof' ? 'contained' : ''} color={buttonSelected === 'Proof' ? 'secondary' : ''}
                                                                                    className={`${buttonSelected !== 'Proof' ? ArtWorkFlowStyle.btn_Not_Selected : ''} ${styles.fw_400}`} onClick={() => handleButtonSelected('Proof')}>Proof</Button>
                                                                            </Grid>
                                                                            <Grid item>
                                                                                <Button variant={buttonSelected === 'Chain info' ? 'contained' : ''} color={buttonSelected === 'Chain info' ? 'secondary' : ''}
                                                                                    className={`${buttonSelected !== 'Chain info' ? ArtWorkFlowStyle.btn_Not_Selected : ''} ${styles.fw_400}`} onClick={() => handleButtonSelected('Chain info')}>Chain info</Button>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item >
                                                                        <IconButton className={ArtistStyle.IconClose} onClick={() => handleModal()}>
                                                                            <CloseIcon color='secondary' fontSize='small' />
                                                                        </IconButton>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            {buttonSelected === 'Information' && (
                                                                <>
                                                                    <Grid item className={ArtWorkFlowStyle.marginTop}>
                                                                        <Grid container direction='column' spacing={10}>
                                                                            <Grid item className={ArtWorkFlowStyle.P_itemTitleValue}>
                                                                                <Grid container justifyContent='space-between' alignItems='center'>
                                                                                    <Grid item className={ArtWorkFlowStyle.titleItemsModal}>Title</Grid>
                                                                                    <Grid item className={ArtWorkFlowStyle.valueItemModal}>Black Swan</Grid>
                                                                                </Grid>
                                                                            </Grid>
                                                                            <Grid item className={ArtWorkFlowStyle.P_itemTitleValue}>
                                                                                <Grid container justifyContent='space-between' alignItems='center'>
                                                                                    <Grid item className={ArtWorkFlowStyle.titleItemsModal}>Artist</Grid>
                                                                                    <Grid item className={ArtWorkFlowStyle.valueItemModal}>Sohrab Sepehri</Grid>
                                                                                </Grid>
                                                                            </Grid>
                                                                            <Grid item className={ArtWorkFlowStyle.P_itemTitleValue}>
                                                                                <Grid container justifyContent='space-between' alignItems='center'>
                                                                                    <Grid item className={ArtWorkFlowStyle.titleItemsModal}>Size</Grid>
                                                                                    <Grid item className={ArtWorkFlowStyle.valueItemModal}>3 × 5 × 2</Grid>
                                                                                </Grid>
                                                                            </Grid>
                                                                            <Grid item className={ArtWorkFlowStyle.P_itemTitleValue}>
                                                                                <Grid container justifyContent='space-between' alignItems='center'>
                                                                                    <Grid item className={ArtWorkFlowStyle.titleItemsModal}>Medium</Grid>
                                                                                    <Grid item className={ArtWorkFlowStyle.valueItemModal}>Painting</Grid>
                                                                                </Grid>
                                                                            </Grid>
                                                                            <Grid item className={ArtWorkFlowStyle.P_itemTitleValue}>
                                                                                <Grid container justifyContent='space-between' alignItems='center'>
                                                                                    <Grid item className={ArtWorkFlowStyle.titleItemsModal}>Statuse</Grid>
                                                                                    <Grid item className={ArtWorkFlowStyle.valueItemModal}>Available</Grid>
                                                                                </Grid>
                                                                            </Grid>
                                                                            <Grid item >
                                                                                <Grid container justifyContent='space-between' alignItems='center'>
                                                                                    <Grid item className={ArtWorkFlowStyle.titleItemsModal}>Price</Grid>
                                                                                    <Grid item className={ArtWorkFlowStyle.valueItemModal}>$560.00</Grid>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item className={`${ArtWorkFlowStyle.marginTop1} ${ArtWorkFlowStyle.someHeight}`} >
                                                                        <Grid container justifyContent='space-between' alignItems='flex-end'>
                                                                            <Grid item xs={9} className={ArtWorkFlowStyle.P_buttonsModal}>
                                                                                <Grid container spacing={2}>
                                                                                    <Grid item xs={6} className={styles.w_100}>
                                                                                        <Button variant='contained' fullWidth color='primary' className={ArtWorkFlowStyle.YakBtn}>
                                                                                            Buy
                                                                                        </Button>
                                                                                    </Grid>
                                                                                    <Grid item xs={6} className={styles.w_100}>
                                                                                        <Button fullWidth className={ArtWorkFlowStyle.YakBtn1}>
                                                                                            Buy
                                                                                        </Button>
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </Grid>
                                                                            <Grid item >
                                                                                <Image src={QrCode} />
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </>
                                                            )}
                                                            {buttonSelected === 'Proof' && (
                                                                <Grid item className={ArtWorkFlowStyle.marginTop1}>
                                                                    <Grid container spacing={5}>
                                                                        <ImgProof />
                                                                        <ImgProof isHidden={true} />
                                                                        <ImgProof />
                                                                        <ImgProof />

                                                                    </Grid>
                                                                </Grid>
                                                            )}
                                                            {buttonSelected === 'Chain info' && (
                                                                <Grid item className={ArtWorkFlowStyle.marginTop}>
                                                                    <Grid container direction='column' spacing={5}>
                                                                        <ChainItems />
                                                                        <ChainItems />
                                                                        <ChainItems />
                                                                        <ChainItems />
                                                                    </Grid>
                                                                </Grid>
                                                            )}



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
