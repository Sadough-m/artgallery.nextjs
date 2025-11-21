import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";

// Matrial 
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { IconButton, Button, Container, Grid, Fade, Modal } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

// mrx : Styles ↓
import ArtWorkStyle from '../../../styles/artworkflow.module.css';

// rmx : files  ↓

// mrx : api links ↓
import {
    EDIT_PRIVACY_ARTWORK
} from "../../../pages/api/index";

// mrx : api ↓
import {
    PostUrl,
    PostAuthUrl,
    GetUrl,
    GetAuthUrl,
} from "../../../pages/api/config";

// Component 
import CustomSelect from '../../Forms/CustomSelect';

// style of material Theme -------------------------------------------------------------------------------------------------------
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
        color: '#242328'
    },
    shape: {
        borderRadius: 8
    },
})
// End -----------------------------------------------------------------------------------------------------------------------

export default function EditPrivacyModal({
    // mrx : Props ↓ ------------------------------------------------------------------------------------------------------------
    Data,
    SelectInputData,
    openModal,
    handleModal
    // End -----------------------------------------------------------------------------------------------------------------------
}) {

    // mrx : states ↓ ------------------------------------------------------------------------------------------------------------
    const [OwnershipID, setOwnershipID] = useState(0);
    const [PriceID, setPriceID] = useState(0);
    const [TrandferDateID, setTrandferDateID] = useState(0);
    const [TransferTypeID, setTransferTypeID] = useState(0);
    // End -----------------------------------------------------------------------------------------------------------------------

    // mrx : Setting Values from local storage ↓ ---------------------------------------------------------------------------------
    useEffect(() => {
        setOwnershipID(Data?.privacy?.ownerShip);
        setPriceID(Data?.privacy?.privacyPrice);
        setTrandferDateID(Data?.privacy?.transferDate);
        setTransferTypeID(Data?.privacy?.transferType);
    }, [Data])
    // End -----------------------------------------------------------------------------------------------------------------------

    // mrx : update values in local when they cahnge in state ↓ ------------------------------------------------------------------
    useEffect(() => {
        localStorage.setItem("Add-ArtWork-OwnershipID", OwnershipID);
    }, [OwnershipID])

    useEffect(() => {
        localStorage.setItem("Add-ArtWork-PriceID", PriceID);
    }, [PriceID])

    useEffect(() => {
        localStorage.setItem("Add-ArtWork-TrandferDateID", TrandferDateID);
    }, [TrandferDateID])

    useEffect(() => {
        localStorage.setItem("Add-ArtWork-TransferTypeID", TransferTypeID);
    }, [TransferTypeID])
    // End -----------------------------------------------------------------------------------------------------------------------

    // mrx : update privacy APi ↓ ------------------------------------------------------------------------------------------------
    const handleSavePrivacy = () => {
        PostAuthUrl(EDIT_PRIVACY_ARTWORK(localStorage.getItem("collectionId")),
            {
                "ownerShip": OwnershipID,
                "privacyPrice": PriceID,
                "transferDate": TrandferDateID,
                "transferType": TransferTypeID,
                "id": Data?.privacy?.id
            }
        ).then(
            (res, err) => {
                if (res && res.status === 200) {
                    if (res?.data?.isSuccess) {
                        toast.success("Privacy edited successfully");
                        location.reload()
                    } else {
                        toast.error(res?.data?.message)
                    }
                } else {
                    toast.error("something went wrong !");
                }
            }
        );
    }
    // End -----------------------------------------------------------------------------------------------------------------------

    return (
        <ThemeProvider theme={theme} >
            <Container>
                <Grid item >
                    <Modal
                        className={ArtWorkStyle.Modal}
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
                            <Grid item className={`${ArtWorkStyle.P_Bg_ModalMedia} ${ArtWorkStyle.maxWidth90}`}>
                                <Grid item className={ArtWorkStyle.Bg_ModalWhite}>
                                    <Grid item className={ArtWorkStyle.wrapperModal}>

                                        <Grid item>
                                            <Grid container direction='column' spacing={3}>
                                                <Grid item>
                                                    <Grid item>
                                                        <Grid container justifyContent='space-between' alignItems='center'>
                                                            <Grid item className={ArtWorkStyle.Text_AddArtist}>Edit privacy</Grid>
                                                            <Grid item>
                                                                <IconButton className={ArtWorkStyle.IconClose} onClick={() => handleModal()}>
                                                                    <CloseIcon color='secondary' fontSize='small' />
                                                                </IconButton>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <CustomSelect
                                                            SelectName={SelectInputData?.privacies?.filter((item) => item?.id === OwnershipID)?.map((item) => item?.name)}
                                                            setSelectName={setOwnershipID}
                                                            Value={OwnershipID}
                                                            setValue={setOwnershipID}
                                                            Data={SelectInputData?.privacies}
                                                            label='Ownership'
                                                            bgColor='#F7F8FA'
                                                            defaultValue='View all'
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <CustomSelect
                                                            SelectName={SelectInputData?.privacies?.filter((item) => item?.id === PriceID)?.map((item) => item?.name)}
                                                            setSelectName={setPriceID}
                                                            Value={PriceID}
                                                            setValue={setPriceID}
                                                            Data={SelectInputData?.privacies}
                                                            label='Price'
                                                            bgColor='#F7F8FA'
                                                            defaultValue='HIddenall'
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <CustomSelect
                                                            SelectName={SelectInputData?.privacies?.filter((item) => item?.id === TrandferDateID)?.map((item) => item?.name)}
                                                            setSelectName={setTrandferDateID}
                                                            Value={TrandferDateID}
                                                            setValue={setTrandferDateID}
                                                            Data={SelectInputData?.privacies}
                                                            label='Trandfer date'
                                                            bgColor='#F7F8FA'
                                                            defaultValue='For owners'
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <CustomSelect
                                                            SelectName={SelectInputData?.privacies?.filter((item) => item?.id === TransferTypeID)?.map((item) => item?.name)}
                                                            setSelectName={setTransferTypeID}
                                                            Value={TransferTypeID}
                                                            setValue={setTransferTypeID}
                                                            Data={SelectInputData?.privacies}
                                                            label='Transfer type'
                                                            bgColor='#F7F8FA'
                                                            defaultValue='Transfer type'
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid item>
                                                    <Button
                                                        variant='contained'
                                                        color='primary'
                                                        fullWidth
                                                        className={`${ArtWorkStyle.Button_Add_Artist1}`}
                                                        onClick={() => handleSavePrivacy()}
                                                    >
                                                        <span
                                                            className={ArtWorkStyle.text_None}
                                                        >
                                                            Save Changes
                                                        </span>
                                                    </Button>
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
