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
import Cookies from 'js-cookie';

// mrx : context ↓
import { Context } from "../../../context/index";

// mrx : api links ↓
import {
    VALIDATE_CV_BUILDER_EXHIBITIONS
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

export default function EditExhibitionsCv({ LocalDatae, setLocalDatae, CountrySelectInputData, openModal, handleCloseModal, Data, SelectInputData }) {
    // mrx : Education states ↓
    // mrx : exhibitions states ↓
    const [exhibitionsYear, setexhibitionsYear] = useState(Data?.year);
    const [exhibitionsType, setexhibitionsType] = useState(Data?.typeId);
    const [exhibitionsTitle, setexhibitionsTitle] = useState(Data?.title);

    const [countryShortCode, setcountryShortCode] = useState(Data?.location?.countryShortCode);
    const [countryName, setcountryName] = useState(Data?.location?.countryName);
    const [cityName, setcityName] = useState(Data?.location?.cityName);

    const [Instituation, setInstituation] = useState(Data?.galleryInstutation);
    const [CheckRequired, setCheckRequired] = useState(false);
    const [LocalData, setLocalData] = useState([]);
    const [HaveData, setHaveData] = useState(false);

    const [exhibitionsTypeName, setexhibitionsTypeName] = useState("");


    // mrx : context
    const {
        DataEdited,
        setDataEdited,

        SelectedExhibitionsEditData,
        setSelectedExhibitionsEditData,
    } = useContext(Context);

    // mrx : remove feild data / save it in local 
    const handleSaveChange = (type) => {
        if (exhibitionsYear === "" || exhibitionsType === "" || exhibitionsTitle === "" || Instituation === "" || countryShortCode === "") {
            if (type === "click") {
                toast.warning("Please fill the required values");
                setCheckRequired(true);
            } else {
                return "";
            }
        } else {
            setCheckRequired(false);
            ValidateCvBuilderExhibitionsLocal()
        }
    }

    // step-2 education data
    const GET_ADDED_DATA = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("CreateCv-Exhibitions") || '[]' : '[]');

    useEffect(() => {
        setLocalData(GET_ADDED_DATA);
    }, [])

    useEffect(() => {
        if (LocalData?.length) {
            setHaveData(true);
        } else {
            setHaveData(false);
            localStorage.setItem("CreateCv-Exhibitions", '[]')
        }
    }, [LocalData]);


    // mrx : update state for set in localstorage  ↓
    const handleSetLocalExhibitions = (st, data) => {
        setLocalData(data);
        if (st === true) {
            toast.success("Your item Edited successfully");
            handleCloseModal();
            setSelectedExhibitionsEditData(data);
        }
    }


    // mrx : set local data for eduction ↓
    useEffect(() => {
        localStorage.setItem("CreateCv-Exhibitions", JSON.stringify(LocalData));
    }, [LocalData]);

    const ValidateCvBuilderExhibitionsLocal = () => {
        PostAuthUrl(VALIDATE_CV_BUILDER_EXHIBITIONS, {
            "single": {
                "id": Data?.id,
                "isOpen": false,
                "year": exhibitionsYear,
                "typeId": exhibitionsType,
                "title": exhibitionsTitle,
                "location": {
                    "countryShortCode": countryShortCode,
                    "countryName": countryName,
                    "cityName": cityName
                },
                "galleryInstutation": Instituation,
                "isPublished": false,
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
                                                        <Grid item className={ArtistStyle.cv_profe}>Selected exhibitions</Grid>
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
                                                        <Date
                                                            setValue={setexhibitionsYear}
                                                            Value={exhibitionsYear}
                                                            validateFlag={CheckRequired}
                                                            setCheckRequired={setCheckRequired}
                                                            label='Year'
                                                            placeHolder='Choose date'
                                                            bgColor='white'
                                                        />
                                                    </Grid>
                                                    <Grid item className={`${styles.TwoInput}`}>
                                                        <CustomSelect
                                                            label='Type'
                                                            setCheckRequired={setCheckRequired}
                                                            validateFlag={CheckRequired}
                                                            placeHolder='Choose an option'
                                                            Data={SelectInputData?.exhabitionTypes}
                                                            setValue={setexhibitionsType}
                                                            SelectName={exhibitionsTypeName ? exhibitionsTypeName : SelectInputData?.exhabitionTypes?.filter(item => item?.id === Data?.typeId).map(item => (item?.name))}
                                                            setSelectName={setexhibitionsTypeName}
                                                        />
                                                    </Grid>
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
                                                                    "string.empty": `Exhibitions title is required`,
                                                                })}
                                                            type='text'
                                                            setValue={setexhibitionsTitle}
                                                            value={exhibitionsTitle}
                                                            placeHolder='Enter first name'
                                                            label='Title'
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
                                            <Grid item xs={12} className={`${styles.w_100}`} >
                                                <InputForm
                                                    type='text'
                                                    placeHolder='Enter your text'
                                                    label='Gallery, Instituation'
                                                    schema={Joi.string()
                                                        .empty({ tlds: { allow: false } })
                                                        .messages({
                                                            "string.empty": `Gallery, Instituation is required`,
                                                        })}
                                                    setValue={setInstituation}
                                                    value={Instituation}
                                                    setCheckRequired={setCheckRequired}
                                                    validateFlag={CheckRequired}
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
