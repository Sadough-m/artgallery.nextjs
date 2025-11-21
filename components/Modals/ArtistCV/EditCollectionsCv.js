import React, { useState, useEffect, useContext } from 'react';
import Joi from "joi";
import { ToastContainer, toast } from 'react-toastify';

// MATERIAL UI
import Modal from '@material-ui/core/Modal'
import Fade from '@material-ui/core/Fade'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

// components
import ArtistStyle from '../../../styles/artist.module.css'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import InputForm from '../../Forms/InputForm'
import CustomSelect from "../../Forms/CustomSelect";
import Date from '../../Forms/Date';
import Location from '../../Forms/Location';

// mrx : context ↓
import { Context } from "../../../context/index";

// mrx : styled
import styles from '../../../styles/Home.module.css'

// mrx : setCookies with this
import Cookies from 'js-cookie'

// mrx : api links ↓
import {
    VALIDATE_CV_BUILDER_COLLECTIONS
} from '../../../pages/api/index';

// mrx : api ↓
import { PostUrl, PostAuthUrl, PutAuthUrl, GetUrl, GetAuthUrl, DeleteAuthUrl } from '../../../pages/api/config';

const theme = createTheme({
    props: {
        MuiButton: {
            disableElevation: true,
        },
    },
    palette: {
        primary: {
            main: "#3772FF",
        },
        secondary: {
            main: "#242328",
        },
        error: {
            main: "#A6E9DE",
        },
    },
    typography: {
        button: {
            fontFamily: "Poppins",
            textTransform: "none",
        },
    },
});

export default function EditExhibitionsCv({ LocalDatae, CountrySelectInputData, openModal, handleCloseModal, Data, SelectInputData }) {
    // mrx : Collections states ↓
    const [CollectionsColection, setCollectionsColection] = useState(Data?.collectorCollection);

    const [countryShortCode, setcountryShortCode] = useState(Data?.location?.countryShortCode);
    const [countryName, setcountryName] = useState(Data?.location?.countryName);
    const [cityName, setcityName] = useState(Data?.location?.cityName);

    const [CheckRequired, setCheckRequired] = useState(false);
    const [HaveData, setHaveData] = useState(false);
    const [LocalData, setLocalData] = useState([]);

    // step-2 education data
    const GET_ADDED_DATA = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("Add-Artist-Collections") || '[]' : '[]');

    // mrx : context
    const {
        DataEdited,
        setDataEdited,

        CollectionsEditData,
        setCollectionsEditData,
    } = useContext(Context);

    useEffect(() => {
        setLocalData(GET_ADDED_DATA);
    }, [])

    useEffect(() => {
        if (LocalData?.length) {
            setHaveData(true);
        } else {
            setHaveData(false);
            localStorage.setItem("Add-Artist-Collections", '[]')
        }
    }, [LocalData]);

    // mrx : update state for set in localstorage  ↓
    const handleSetLocalCollections = (st, data) => {
        setLocalData(data);
        if (st === true) {
            toast.success("Your item Edited successfully");
            handleCloseModal();
            setCollectionsEditData(data);
        }
    }

    // mrx : set local data for eduction ↓
    useEffect(() => {
        localStorage.setItem("Add-Artist-Collections", LocalData ? JSON.stringify(LocalData) : '[]');
    }, [LocalData]);

    // mrx : remove feild data / save it in local 
    const handleSaveChange = (type) => {
        if (CollectionsColection === "") {
            setCheckRequired(true);
            if (type === "click") {
                toast.warning("Please fill the required values");
            } else {
                return "";
            }
        } else {
            setCheckRequired(false);
            ValidateCvBuilderCollectionsLocal()
        }
    }

    const ValidateCvBuilderCollectionsLocal = () => {
        PostAuthUrl(VALIDATE_CV_BUILDER_COLLECTIONS, {
            "single": {
                "isOpen": false,
                "collectorCollection": CollectionsColection,
                "location": {
                    "countryShortCode": countryShortCode,
                    "countryName": countryName,
                    "cityName": cityName
                },
                "isPublished": false,
                "id": Data?.id
            },
            "models":
                LocalDatae
        }).then((res, err) => {
            if (res && res.status === 200) {
                if (res?.data?.isSuccess) {
                    handleSetLocalCollections(true, res?.data?.data);
                    setDataEdited(true);
                    // mrx : clear the items for new data
                } else {
                    handleSetLocalCollections(false, res?.data?.data);
                    toast.error(res?.data?.message);
                }
            } else {
                toast.error("something went wrong !");
            }
        });
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
                        onClose={handleCloseModal}
                        closeAfterTransition
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={openModal}>
                            <Grid item className={ArtistStyle.P_Bg_ModalCV}>
                                <Container>
                                    <Grid item className={`${ArtistStyle.Bg_Modal1} ${ArtistStyle.mtb_10}`}>
                                        <Grid item className={ArtistStyle.wrapperModal}>

                                            <Grid container justifyContent='space-between' alignItems='center'>
                                                <Grid item className={ArtistStyle.P_title1}>
                                                    <Grid container alignItems='center' spacing={2} className={ArtistStyle.cv_txt}>
                                                        <Grid item className={ArtistStyle.Text_titleModal}>Edit CV</Grid>
                                                        <Grid item className={ArtistStyle.cv_profe}>Collections</Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item>
                                                    <IconButton className={ArtistStyle.IconClose} onClick={() => handleCloseModal()}>
                                                        <CloseIcon color='secondary' fontSize='small' />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>

                                            <Grid item className={`${styles.w_100}`}>
                                                <Grid container className={`${styles.TwoForm}`}>
                                                    <Grid item className={`${styles.TwoInput}`}>
                                                        <InputForm
                                                            setCheckRequired={setCheckRequired}
                                                            validateFlag={CheckRequired}
                                                            schema={Joi.string()
                                                                .empty({ tlds: { allow: false } })
                                                                .messages({
                                                                    "string.empty": `Colection is required`,
                                                                })}
                                                            type='text'
                                                            setValue={setCollectionsColection}
                                                            value={CollectionsColection}
                                                            placeHolder='Enter Collector or Colection'
                                                            label='Collector or Colection'

                                                        />
                                                    </Grid>
                                                    <Grid item className={`${styles.TwoInput}`}>
                                                        <Location
                                                            label='Location'
                                                            placeHolder='Choose location'
                                                            bgColor='white'
                                                            // mrx : send location data 
                                                            DefultValue={cityName + ", " + countryName}
                                                            Data={CountrySelectInputData}
                                                            setCheckRequired={setCheckRequired}
                                                            validateFlag={CheckRequired}
                                                            // mrx : select location states
                                                            cityName={cityName}
                                                            setcityName={setcityName}
                                                            setcountryName={setcountryName}
                                                            setcountryShortCode={setcountryShortCode}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <Grid item>
                                                <Button
                                                    onClick={() => handleSaveChange()}
                                                    variant='contained'
                                                    color='primary'
                                                    className={ArtistStyle.Button_Add_Artist}>
                                                    <span className={ArtistStyle.text_None}>Save Changes</span>
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Container>
                            </Grid>
                        </Fade>
                    </Modal>
                </Grid >
            </Container >

        </ThemeProvider >
    )

}
