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

// mrx : styled
import styles from '../../../styles/Home.module.css'

// mrx : setCookies with this
import Cookies from 'js-cookie'

// mrx : api links ↓
import {
    VALIDATE_CV_BUILDER_EDUCATIONLOCAL
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

export default function EditEducationCv({
    openModal,
    handleCloseModal,
    LocalDatae,
    setLocalDatae,
    Data,
    SelectInputData
}) {
    // mrx : context
    const {
        EdDataEdited,
        setEdDataEdited,

        EducationEditData,
        setEducationEditData,
    } = useContext(Context);

    // mrx : Education states ↓
    const [educationYear, seteducationYear] = useState(Data?.completionYear);
    const [educationDegreeType, seteducationDegreeType] = useState(Data?.degreeTypeId);
    const [educationMajor, seteducationMajor] = useState(Data?.majorTypeId);
    const [educationInstitution, seteducationInstitution] = useState(Data?.instutation);
    const [educationDepartment, seteducationDepartment] = useState(Data?.departementId);
    const [educationHonors, seteducationHonors] = useState(Data?.cumLaudeAndOtherHonors);
    const [educationDissertation, seteducationDissertation] = useState(Data?.dissertationThesisTitleAndAdvisor);
    const [CheckRequired, setCheckRequired] = useState(false);
    const [LocalData, setLocalData] = useState([]);
    const [HaveData, setHaveData] = useState(false);

    const [educationDepartmentName, seteducationDepartmentName] = useState("");
    const [educationMajorName, seteducationMajorName] = useState("");
    const [educationDegreeName, seteducationDegreeName] = useState("");

    // mrx : remove feild data / save it in local 
    const handleSaveChange = (type) => {
        if (educationYear === "" || educationDegreeType === "" || educationMajor === "" || educationInstitution === "") {
            if (type === "click") {
                toast.warning("Please fill the required values");
                setCheckRequired(true);
            } else {
                return "";
            }
        } else {
            setCheckRequired(false);
            ValidateCvBuilderEducationLocal()
        }
    }

    // step-2 education data
    const GET_ADDED_DATA = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("Step2-Eduction") || '[]' : '[]');

    useEffect(() => {
        setLocalData(GET_ADDED_DATA);
    }, [])

    useEffect(() => {
        if (LocalData?.length) {
            setHaveData(true);
        } else {
            setHaveData(false);
            localStorage.setItem("Step2-Eduction", '[]')
        }
    }, [LocalData]);


    // mrx : update state for set in localstorage  ↓
    const handleSetLocalEduction = (st, data) => {
        setLocalData(data);
        if (st === true) {
            toast.success("Your item Edited successfully");
            handleCloseModal();
            setEducationEditData(data);
            // window.location.reload(), 1500;
        }
    }


    // mrx : set local data for eduction ↓
    useEffect(() => {
        localStorage.setItem("Step2-Eduction", JSON.stringify(LocalData));
    }, [LocalData]);

    const ValidateCvBuilderEducationLocal = () => {
        PostAuthUrl(VALIDATE_CV_BUILDER_EDUCATIONLOCAL, {
            "single": {
                "isOpen": false,
                "completionYear": educationYear,
                "degreeTypeId": educationDegreeType,
                "majorTypeId": educationMajor,
                "departementId": educationDepartment,
                "instutation": educationInstitution,
                "cumLaudeAndOtherHonors": educationHonors,
                "dissertationThesisTitleAndAdvisor": educationDissertation,
                "completionYear": educationYear,
                "completionYear": educationYear,
                "isPublished": false,
                "id": Data?.id,
            },
            "models":
                LocalDatae
        }).then((res, err) => {
            if (res && res.status === 200) {
                if (res?.data?.isSuccess) {
                    handleSetLocalEduction(true, res?.data?.data);
                    setEdDataEdited(true);
                } else {
                    handleSetLocalEduction(false, res?.data?.data);
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
                                                        <Grid item className={ArtistStyle.cv_profe}>Education</Grid>
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
                                                            placeHolder='Choose date'
                                                            label='Completetion year'
                                                            setValue={seteducationYear}
                                                            Value={educationYear}
                                                        />
                                                    </Grid>
                                                    <Grid item className={`${styles.TwoInput}`}>
                                                        <CustomSelect
                                                            Data={SelectInputData?.degreeTypes}
                                                            setValue={seteducationDegreeType}
                                                            Value={educationDegreeType}
                                                            SelectName={educationDegreeName ? educationDegreeName : SelectInputData?.degreeTypes?.filter(item => item?.id === Data?.degreeTypeId).map(item => (item?.name))}
                                                            setSelectName={seteducationDegreeName}
                                                            label='Degree type'
                                                            placeHolder='Choose an option'
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item className={`${styles.w_100}`}>
                                                <Grid container className={`${styles.TwoForm}`}>
                                                    <Grid item className={`${styles.TwoInput}`}>
                                                        <CustomSelect
                                                            label='Major'
                                                            placeHolder='Choose one'
                                                            setValue={seteducationMajor}
                                                            Value={educationMajor}
                                                            setSelectName={seteducationMajorName}
                                                            SelectName={educationMajorName ? educationMajorName : SelectInputData?.majorTypes?.filter(item => item?.id === Data?.majorTypeId).map(item => (item?.name))}
                                                            Data={SelectInputData?.majorTypes}
                                                        />
                                                    </Grid>
                                                    <Grid item className={`${styles.TwoInput}`}>
                                                        <InputForm
                                                            setCheckRequired={setCheckRequired}
                                                            CheckRequired={CheckRequired}
                                                            schema={Joi.string()
                                                                .empty({ tlds: { allow: false } })
                                                                .messages({
                                                                    "string.empty": `Institution is required`,
                                                                })}
                                                            type='text'
                                                            setValue={seteducationInstitution}
                                                            value={educationInstitution}
                                                            placeHolder='Search'
                                                            label='Institution'
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} className={`${styles.w_100}`} >
                                                <CustomSelect
                                                    label='Department'
                                                    placeHolder='Choose an option'
                                                    Data={SelectInputData?.deptTypes}
                                                    SelectName={educationDepartmentName ? educationDepartmentName : SelectInputData?.deptTypes?.filter(item => item?.id === Data?.departementId).map(item => (item?.name))}
                                                    setSelectName={seteducationDepartmentName}
                                                    setValue={seteducationDepartment}
                                                    Value={educationDepartment}
                                                />
                                            </Grid>

                                            <Grid item xs={12} className={`${styles.w_100}`} >
                                                <InputForm
                                                    type='text'
                                                    setValue={seteducationHonors}
                                                    value={educationHonors}
                                                    setCheckRequired={setCheckRequired}
                                                    CheckRequired={CheckRequired}
                                                    placeHolder='Write a title'
                                                    label='Cum laude and other honors'
                                                    schema={Joi.optional()}
                                                />
                                            </Grid>

                                            <Grid item xs={12} className={`${styles.w_100}`} >
                                                <InputForm
                                                    type='text'
                                                    setCheckRequired={setCheckRequired}
                                                    CheckRequired={CheckRequired}
                                                    setValue={seteducationDissertation}
                                                    value={educationDissertation}
                                                    placeHolder='Write a title'
                                                    label='Dissertation/Thesis title and advisor'
                                                    schema={Joi.optional()}
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
