import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-scroll";
import { uuid } from 'uuidv4';
import { ToastContainer, toast } from "react-toastify";
import Joi from "joi";

// good man : material ui ↓
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

// mrx : styles ↓
import signUpStyle from '../../../../styles/signUp.module.css'
import styles from '../../../../styles/Home.module.css'

// good man : files ↓
import ArrowLeft from '../../../../public/images/icons/Arrow down.svg'

// mrx : components ↓
import InputForm from '../../../Forms/InputForm'
import Section from "./Items/ProfessionalServiceSection";
import Location from '../../../Forms/Location';
import Date from '../../../Forms/Date';

// mrx : setCookies with this
import Cookies from "js-cookie";

// mrx : api links ↓
import { VALIDATE_CV_BUILDER_PROFESSIONAL_SERVICE } from "../../../../pages/api/index";

// mrx : api ↓
import {
    PostUrl,
    PostAuthUrl,
    GetUrl,
    GetAuthUrl,
} from "../../../../pages/api/config";

// mrx : context ↓
import { Context } from "../../../../context/index";

export default function ProfessionalService({
    CountrySelectInputData,
    SelectInputData,
    Wrong,
    setWrong,
    EndCallprofessionalService,
    setEndCallprofessionalService
}) {
    // mrx :  states ↓
    const [ProfessionalServiceTitle, setProfessionalServiceTitle] = useState("");

    const [galleryInstutation, setgalleryInstutation] = useState("");
    const [ProfessionalServiceFromYear, setProfessionalServiceFromYear] = useState("");
    const [ProfessionalServiceToYear, setProfessionalServiceToYear] = useState("");

    const [countryShortCode, setcountryShortCode] = useState("");
    const [countryName, setcountryName] = useState("");
    const [cityName, setcityName] = useState("");

    const [CheckRequired, setCheckRequired] = useState(false);
    const [HaveData, setHaveData] = useState(false);
    const [LocalData, setLocalData] = useState([]);

    // mrx : context
    const {
        ISAllformsOK,
        setISAllformsOK,
        DataEdited,
        setDataEdited,
        Publishing,
        setPublishing,

        ProfessionalServiceEditData,
    } = useContext(Context);

    // validate from step 2
    useEffect(() => {
        validatePublications()
    }, [Wrong])

    useEffect(() => {
        if (DataEdited === true) {
            setLocalData(ProfessionalServiceEditData);
            setDataEdited(false);
        }
    }, [DataEdited]);

    useEffect(() => {
        if (Publishing === true) {
            setLocalData(GET_ADDED_DATA);
            setPublishing(false);
        }
    }, [Publishing]);

    // validate from step 2
    const validatePublications = () => {
        // checking if any input is fill
        if (
            ProfessionalServiceTitle?.length > 1 ||
            galleryInstutation?.length > 1 ||
            ProfessionalServiceFromYear?.length > 1 ||
            ProfessionalServiceToYear?.length > 1 ||
            countryShortCode?.length > 1
        ) {
            // set props value to false for next time
            // setWrong(false);

            // show the hint
            setCheckRequired(true);
            // mrx : if required value was not fill
            if (
                ProfessionalServiceTitle === "" ||
                galleryInstutation === ""
            ) {
                // set Global state false
                setISAllformsOK(false);
            } else {
                // set Global state true
                setISAllformsOK(true);
                // hiddent the hint
                setCheckRequired(false);
                if (EndCallprofessionalService === "true") {
                    ValidateCvBuilderExhibitionsLocal();
                } else {
                    return
                }
            }
        } else {
            if (EndCallprofessionalService === "true") {
                setEndCallprofessionalService("next");
            } else {
                return
            }
        }
    }

    // step-2 education data
    const GET_ADDED_DATA = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("CreateCv-Professional-Service") || '[]' : '[]');

    useEffect(() => {
        setLocalData(GET_ADDED_DATA);
    }, [])

    useEffect(() => {
        if (LocalData?.length) {
            setHaveData(true);
        } else {
            setHaveData(false);
            localStorage.setItem("CreateCv-Professional-Service", '[]')
        }
    }, [LocalData]);

    // mrx : update state for set in localstorage  ↓
    const handleSetLocalExhibitions = (data) => {
        setLocalData(data);
    }

    // mrx : set local data for eduction ↓
    useEffect(() => {
        localStorage.setItem("CreateCv-Professional-Service", JSON.stringify(LocalData));
    }, [LocalData]);

    // mrx : remove feild data / save it in local 
    const handleAddAnother = (type) => {
        if (
            ProfessionalServiceTitle === "" ||
            galleryInstutation === ""
        ) {
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
            },
            "models":
                LocalData
        }).then((res, err) => {
            if (res && res.status === 200) {
                if (res?.data?.isSuccess) {
                    handleSetLocalExhibitions(res?.data?.data);
                    setgalleryInstutation("");
                    setProfessionalServiceFromYear("");
                    setProfessionalServiceToYear("");
                    setcountryShortCode("");
                    setcountryName("");
                    setcityName("");
                    setEndCallprofessionalService("next");
                } else {
                    handleSetLocalExhibitions(res?.data?.data === null ? [] : res?.data?.data);
                    toast.error(res?.data?.message);
                }
            } else {
                toast.error("something went wrong !");
            }
        });
    }

    useEffect(() => {
        if (EndCallprofessionalService === "true") {
            validatePublications();
        } else {
            return
        }
    }, [EndCallprofessionalService])

    return (
        <Grid container alignItems='center' direction='column' className={`${signUpStyle.box}`} >
            <span className={signUpStyle.obj_for_id} id='ProfessionalService'></span>

            <Grid item className={`${signUpStyle.title}`}>Professional Service</Grid>

            <Section
                setLocalData={() => setLocalData()}
                LocalData={LocalData}
                SelectInputData={SelectInputData}
                CountrySelectInputData={CountrySelectInputData}
                haveData={HaveData}
                title="Saved info"
            />
            <Grid item className={`${styles.w_100}`}>
                <Grid container className={`${styles.TwoForm}`}>
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
                                    "any.required": `Title is required`,
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
                            Data={CountrySelectInputData}
                            setCheckRequired={setCheckRequired}
                            // mrx : select location states
                            cityName={cityName}
                            setcityName={setcityName}
                            setcountryName={setcountryName}
                            setcountryShortCode={setcountryShortCode}
                        />
                    </Grid>
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
                            "any.required": `Gallery Instituation is required`,
                        })}
                    setValue={setgalleryInstutation}
                    value={galleryInstutation}
                />
            </Grid>
            <Grid item className={`${styles.w_100}`}>
                <Link to="ProfessionalService" smooth={true} spy={true} duration={1000}>
                    <Button
                        startIcon={<AddCircleOutlineIcon />}
                        variant="text"
                        color="primary"
                        onClick={() => handleAddAnother("click")}
                    >
                        <span className={`${styles.text__trs__none}`}>Add Another</span>
                    </Button>
                </Link>
            </Grid>
        </Grid>
    )
}

