import React, { useState, useEffect, useContext } from 'react'
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

// mrx : context ↓
import { Context } from "../../../context/index";

// components
import ArtistStyle from '../../../styles/artist.module.css'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import InputForm from '../../Forms/InputForm'
import CustomSelect from "../../Forms/CustomSelect";
import Date from '../../Forms/Date';
import Location from '../../Forms/Location';

// mrx : styled
import styles from '../../../styles/Home.module.css'

// mrx : setCookies with this
import Cookies from 'js-cookie'

// mrx : api links ↓
import {
    VALIDATE_CV_BUILDER_PROFESSIONAL_SERVICE
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
    // mrx : context
    const {
        DataEdited,
        setDataEdited,

        ProfessionalServiceEditData,
        setProfessionalServiceEditData,
    } = useContext(Context);

    // mrx :  states ↓
    const [ProfessionalServiceTitle, setProfessionalServiceTitle] = useState(Data?.title);

    const [galleryInstutation, setgalleryInstutation] = useState(Data?.galleryInstutation);
    const [ProfessionalServiceFromYear, setProfessionalServiceFromYear] = useState(Data?.from);
    const [ProfessionalServiceToYear, setProfessionalServiceToYear] = useState(Data?.to);

    const [countryShortCode, setcountryShortCode] = useState(Data?.location?.countryShortCode);
    const [countryName, setcountryName] = useState(Data?.location?.countryName);
    const [cityName, setcityName] = useState(Data?.location?.cityName);

    const [CheckRequired, setCheckRequired] = useState(false);
    const [HaveData, setHaveData] = useState(false);
    const [LocalData, setLocalData] = useState([]);

    // step-2 education data
    const GET_ADDED_DATA = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("Add-Artist-Professional-Service") || '[]' : '[]');

    useEffect(() => {
        setLocalData(GET_ADDED_DATA);
    }, [])

    useEffect(() => {
        if (LocalData?.length) {
            setHaveData(true);
        } else {
            setHaveData(false);
            localStorage.setItem("Add-Artist-Professional-Service", '[]')
        }
    }, [LocalData]);

    // mrx : update state for set in localstorage  ↓
    const handleSetLocalExhibitions = (st, data) => {
        setLocalData(data);
        if (st === true) {
            toast.success("Your item Edited successfully");
            handleCloseModal();
            setProfessionalServiceEditData(data);
        }
    }

    // mrx : set local data for eduction ↓
    useEffect(() => {
        localStorage.setItem("Add-Artist-Professional-Service", LocalData ? JSON.stringify(LocalData) : '[]');
    }, [LocalData]);

    // mrx : remove feild data / save it in local 
    const handleSaveChange = (type) => {
        if (ProfessionalServiceTitle === "" || galleryInstutation === "") {
            setCheckRequired(true);
            if (type === "click") {
                toast.warning("Please fill the required values");
            } else {
                return "";
            }
        } else {
            setCheckRequired(false);
            ValidateCvBuilderExhibitionsLocal()
        }
    }

    const ValidateCvBuilderExhibitionsLocal = () => {
        PostAuthUrl(VALIDATE_CV_BUILDER_PROFESSIONAL_SERVICE, {
            "single": {
                "isOpen": false,
                "from": ProfessionalServiceFromYear,
                "to": ProfessionalServiceToYear,
                "title": ProfessionalServiceTitle,
                // "professionalServiceType": ProfessionalServiceTitle,
                "location": {
                    "countryShortCode": countryShortCode,
                    "countryName": countryName,
                    "cityName": cityName
                },
                "galleryInstutation": galleryInstutation,
                "isPublished": false,
                "id": Data.id
            },
            "models":
                LocalDatae
        }).then((res, err) => {
            if (res && res.status === 200) {
                if (res?.data?.isSuccess) {
                    handleSetLocalExhibitions(true, res?.data?.data);
                    setDataEdited(true);
                } else {
                    handleSetLocalExhibitions(false, res?.data?.data);
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
                                                        <Grid item className={ArtistStyle.cv_profe}>Professional Service</Grid>
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
                                                    <Grid className={`${styles.TwoInput}`}>
                                                        <Date
                                                            label='From'
                                                            placeHolder='Choose date'
                                                            setValue={setProfessionalServiceFromYear}
                                                            Value={ProfessionalServiceFromYear}
                                                            // validateFlag={CheckRequired}
                                                            setCheckRequired={setCheckRequired}
                                                        />
                                                    </Grid>
                                                    <Grid className={`${styles.TwoInput}`}>
                                                        <Date
                                                            label='To'
                                                            placeHolder='Choose date'
                                                            setValue={setProfessionalServiceToYear}
                                                            Value={ProfessionalServiceToYear}
                                                            // validateFlag={CheckRequired}
                                                            setCheckRequired={setCheckRequired}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid container className={`${styles.TwoForm}`}>
                                                <Grid item className={`${styles.TwoInput}`}>
                                                    <InputForm
                                                        type='text'
                                                        placeHolder='Enter Title here'
                                                        label='Title'
                                                        setCheckRequired={setCheckRequired}
                                                        validateFlag={CheckRequired}
                                                        schema={Joi.string()
                                                            .empty({ tlds: { allow: false } })
                                                            .messages({
                                                                "string.empty": `Title is required`,
                                                            })}
                                                        setValue={setProfessionalServiceTitle}
                                                        value={ProfessionalServiceTitle}
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

                                            <Grid item className={`${styles.w_100}`}>
                                                <InputForm
                                                    type='text'
                                                    placeHolder='Enter Gallery Instituation here'
                                                    label='Gallery Instituation'
                                                    setCheckRequired={setCheckRequired}
                                                    validateFlag={CheckRequired}
                                                    schema={Joi.string()
                                                        .empty({ tlds: { allow: false } })
                                                        .messages({
                                                            "string.empty": `Gallery Instituation is required`,
                                                        })}
                                                    setValue={setgalleryInstutation}
                                                    value={galleryInstutation}
                                                />
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
