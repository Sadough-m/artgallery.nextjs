import React, { useState, useEffect, useContext } from 'react'
import { uuid } from 'uuidv4';
import { Link } from "react-scroll";
import { ToastContainer, toast } from "react-toastify";
import Joi from "joi";

// good man : material ui ↓
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

// good man : styles ↓
import signUpStyle from '../../../../styles/signUp.module.css'
import styles from '../../../../styles/Home.module.css'

// good man : files ↓

// mrx : components ↓
import InputForm from '../../../Forms/InputForm'
import Date from '../../../Forms/Date';
import Section from "./Items/ProfessionalAppointmentsSection";
import Location from '../../../Forms/Location';

// mrx : setCookies with this
import Cookies from "js-cookie";

// mrx : api links ↓
import { VALIDATE_CV_BUILDER_PROESSIONALAPPOINTMENTLOCAL } from "../../../../pages/api/index";

// mrx : api ↓
import {
    PostUrl,
    PostAuthUrl,
    GetUrl,
    GetAuthUrl,
} from "../../../../pages/api/config";

// mrx : context ↓
import { Context } from "../../../../context/index";

export default function ProfessionalAppointments({
    SelectInputData,
    CountrySelectInputData,
    Wrong,
    setWrong,
    EndCallprofessionalAppointments,
    setEndCallprofessionalAppointments
}) {
    // mrx :  states ↓
    const [AppointmentsTitle, setAppointmentsTitle] = useState("");

    const [AppointmentsToYear, setAppointmentsToYear] = useState("");
    const [AppointmentsFromYear, setAppointmentsFromYear] = useState("");
    const [Instituation, setInstituation] = useState("");

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


        ProfessionalAppointmentsEditData,
    } = useContext(Context);
    
    // validate from step 2
    useEffect(() => {
        validateProfessionalAppointments()
    }, [Wrong])

    useEffect(() => {
        if (DataEdited === true) {
            setLocalData(ProfessionalAppointmentsEditData);
            setDataEdited(false);
        }
    }, [DataEdited]);

    // validate from step 2
    const validateProfessionalAppointments = () => {
        // checking if any input is fill
        if (
            AppointmentsTitle?.length > 1 ||
            AppointmentsToYear?.length > 1 ||
            Instituation?.length > 1 ||
            AppointmentsFromYear?.length > 1 ||
            Instituation?.length > 1 ||
            countryShortCode?.length > 1
        ) {
            // set props value to false for next time
            // setWrong(false);

            // show the hint
            setCheckRequired(true);
            // mrx : if required value was not fill
            if (
                AppointmentsTitle === "" ||
                Instituation === ""
            ) {
                // set Global state false
                setISAllformsOK(false);
            } else {
                // set Global state true
                setISAllformsOK(true);
                // hiddent the hint
                setCheckRequired(false);
                if (EndCallprofessionalAppointments === "true") {
                    ValidateCvBuilderProfessionalAppointments();
                } else {
                    return
                }
            }
        } else {
            if (EndCallprofessionalAppointments === "true") {
                setEndCallprofessionalAppointments("next");
            } else {
                return
            }
        }
    }

    // step-2 education data
    const GET_ADDED_DATA = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("Add-Artist-ProfessionalAppointments") || '[]' : '[]');

    useEffect(() => {
        setLocalData(GET_ADDED_DATA);
    }, [])

    useEffect(() => {
        if (LocalData?.length) {
            setHaveData(true);
        } else {
            setHaveData(false);
            localStorage.setItem("Add-Artist-ProfessionalAppointments", '[]')
        }
    }, [LocalData]);

    // mrx : update state for set in localstorage  ↓
    const handleSetLocalExhibitions = (data) => {
        setLocalData(data);
    }

    // mrx : set local data for eduction ↓
    useEffect(() => {
        localStorage.setItem("Add-Artist-ProfessionalAppointments", JSON.stringify(LocalData));
    }, [LocalData]);

    // mrx : remove feild data / save it in local 
    const handleAddAnother = (type) => {
        if (
            AppointmentsTitle === "" ||
            Instituation === ""
        ) {
            setCheckRequired(true);
            if (type === "click") {
                toast.warning("Please fill the required values");
            } else {
                return "";
            }
        } else {
            setCheckRequired(false);
            ValidateCvBuilderProfessionalAppointments()
        }
    }

    const ValidateCvBuilderProfessionalAppointments = () => {
        PostAuthUrl(VALIDATE_CV_BUILDER_PROESSIONALAPPOINTMENTLOCAL, {
            "single": {
                "isOpen": false,
                "from": AppointmentsFromYear,
                "to": AppointmentsToYear,
                "title": AppointmentsTitle,
                "location": {
                    "countryShortCode": countryShortCode,
                    "countryName": countryName,
                    "cityName": cityName
                },
                "instutation": Instituation,
                "isPublished": false,
            },
            "models":
                LocalData
        }).then((res, err) => {
            if (res && res.status === 200) {
                if (res?.data?.isSuccess) {
                    handleSetLocalExhibitions(res?.data?.data);
                    // mrx : clear the items for new data
                    setInstituation("");
                    setAppointmentsTitle("");
                    setAppointmentsToYear("");
                    setAppointmentsFromYear("");
                    setcountryShortCode("");
                    setcountryName("");
                    setcityName("");
                    setEndCallprofessionalAppointments("next");
                    // setSelectInputData(res?.data?.data);
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
        if (EndCallprofessionalAppointments === "true") {
            validateProfessionalAppointments();
        } else {
            return
        }
    }, [EndCallprofessionalAppointments])

    return (
        <Grid container alignItems='center' direction='column' className={`${signUpStyle.box}`} >
            <span className={signUpStyle.obj_for_id} id='ProfessionalAppointments'></span>

            <Grid item className={`${signUpStyle.title}`}>Professional Appointments</Grid>

            <Section
                setLocalData={() => setLocalData()}
                LocalData={LocalData}
                SelectInputData={SelectInputData}
                CountrySelectInputData={CountrySelectInputData}
                haveData={HaveData}
                title="Professional Appointments info"
            />

            <Grid item className={`${styles.w_100}`}>
                <Grid container className={`${styles.TwoForm}`}>
                    <Grid className={`${styles.TwoInput}`}>
                        <Date
                            label='From'
                            placeHolder='Choose date'
                            setValue={setAppointmentsFromYear}
                            Value={AppointmentsFromYear}
                            // validateFlag={CheckRequired}
                            setCheckRequired={setCheckRequired}
                        />
                    </Grid>
                    <Grid className={`${styles.TwoInput}`}>
                        <Date
                            label='To'
                            placeHolder='Choose date'
                            setValue={setAppointmentsToYear}
                            Value={AppointmentsToYear}
                            // validateFlag={CheckRequired}
                            setCheckRequired={setCheckRequired}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} className={`${styles.w_100}`} >
                    <InputForm
                        type='text'
                        placeHolder='Write a biography refrence here'
                        label='Title'
                        setCheckRequired={setCheckRequired}
                        validateFlag={CheckRequired}
                        schema={Joi.string()
                            .empty({ tlds: { allow: false } })
                            .messages({
                                "string.empty": `biography refrence is required`,
                            })}
                        setValue={setAppointmentsTitle}
                        value={AppointmentsTitle}
                    />
                </Grid>
                <Grid container className={`${styles.TwoForm}`}>
                    <Grid className={`${styles.TwoInput}`} >
                        <InputForm
                            type='text'
                            placeHolder='Enter Instituation'
                            label='Instituation'
                            setCheckRequired={setCheckRequired}
                            validateFlag={CheckRequired}
                            schema={Joi.string()
                                .empty({ tlds: { allow: false } })
                                .messages({
                                    "string.empty": `Instituation is required`,
                                })}
                            setValue={setInstituation}
                            value={Instituation}
                        />
                    </Grid>
                    <Grid className={`${styles.TwoInput}`}>
                        <Location
                            label='Location'
                            placeHolder='Choose location'
                            bgColor='white'
                            // mrx : send location data 
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
            <Grid item className={`${styles.w_100}`}>
                <Link to="ProfessionalAppointments" smooth={true} spy={true} duration={1000}>
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
