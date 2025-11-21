import React, { useState, useEffect, useContext } from "react";
import { uuid } from 'uuidv4';
import { Link } from "react-scroll";
import Joi from "joi";
import { ToastContainer, toast } from "react-toastify";

// good man : material ui ↓
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

// mrx : styles ↓
import signUpStyle from '../../../styles/signUp.module.css'
import styles from '../../../styles/Home.module.css'

// good man : files ↓
import ArrowLeft from '../../../public/images/icons/Arrow down.svg'

// good man : Component ↓
import InputForm from '../../Forms/InputForm'
import Date from '../../Forms/Date';
import CustomSelect from '../../Forms/CustomSelect';
import Section from './Items/CommissionsSection';
import Location from '../../Forms/Location';


// mrx : setCookies with this
import Cookies from "js-cookie";

// mrx : api links ↓
import { VALIDATE_CV_BUILDER_COMMISSION } from "../../../pages/api/index";

// mrx : api ↓
import {
    PostUrl,
    PostAuthUrl,
    GetUrl,
    GetAuthUrl,
} from "../../../pages/api/config";

// mrx : context ↓
import { Context } from "../../../context/index";

export default function Commissions({
    SelectInputData,
    CountrySelectInputData,
    Wrong,
    setWrong,
    setEndCallcommissions,
    EndCallcommissions
}) {
    // mrx : Commissions states ↓
    const [CommissionsYear, setCommissionsYear] = useState("");
    const [CommissionsType, setCommissionsType] = useState("");
    const [CommissionsTitle, setCommissionsTitle] = useState("");
    const [CommissionsInstitution, setCommissionsInstitution] = useState("");

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
        CommiataEdited,
        setCommiataEdited,


        CommissionsEditData,
    } = useContext(Context);
    
    // validate from step 2
    useEffect(() => {
        validateCommissions()
    }, [Wrong])


    useEffect(() => {
        if (CommiataEdited === true) {
            setLocalData(CommissionsEditData);
            setCommiataEdited(false);
        }
    }, [CommiataEdited]);

    // validate from step 2
    const validateCommissions = () => {
        // checking if any input is fill
        if (
            CommissionsYear?.length > 1 ||
            CommissionsTitle?.length > 1 ||
            CommissionsInstitution?.length > 1 ||
            CommissionsType?.length > 1 ||
            countryShortCode?.length > 1
        ) {
            // set props value to false for next time
            // setWrong(false);

            // show the hint
            setCheckRequired(true);
            // mrx : if required value was not fill
            if (
                CommissionsYear === "" ||
                CommissionsTitle === "" ||
                CommissionsInstitution === ""
            ) {
                // set Global state false
                setISAllformsOK(false);
            } else {
                // set Global state true
                setISAllformsOK(true);
                // hiddent the hint
                setCheckRequired(false);
                if (EndCallcommissions === "true") {
                    ValidateCvBuilderCommissionsLocal();
                } else {
                    return
                }
            }
        } else {
            if (EndCallcommissions === "true") {
                setEndCallcommissions("next");
            } else {
                return
            }
        }
    }

    // step-2 Commissions data
    const GET_ADDED_DATA = JSON.parse(
        typeof window !== "undefined"
            ? localStorage.getItem("Step2-Commissions") || "[]"
            : "[]"
    );

    useEffect(() => {
        setLocalData(GET_ADDED_DATA);
    }, []);

    useEffect(() => {
        if (LocalData?.length) {
            setHaveData(true);
        } else {
            setHaveData(false);
            localStorage.setItem("Step2-Commissions", "[]");
        }
    }, [LocalData]);

    // mrx : update state for set in localstorage  ↓
    const handleSetLocalCommissions = (data) => {
        setLocalData(data);
    };

    // mrx : set local data for eduction ↓
    useEffect(() => {
        localStorage.setItem("Step2-Commissions", JSON.stringify(LocalData));
    }, [LocalData]);

    // mrx : remove feild data / save it in local
    const handleAddAnother = (type) => {
        if (
            CommissionsYear === "" ||
            CommissionsTitle === "" ||
            CommissionsInstitution === ""
        ) {
            if (type === "click") {
                toast.warning("Please fill the required values");
                setCheckRequired(true);
            } else {
                return "";
            }
        } else {
            setCheckRequired(false);
            ValidateCvBuilderCommissionsLocal();
        }
    };

    const ValidateCvBuilderCommissionsLocal = () => {
        PostAuthUrl(VALIDATE_CV_BUILDER_COMMISSION, {
            single: {
                isOpen: false,
                year: CommissionsYear,
                typeId: CommissionsType,
                title: CommissionsTitle,
                location: {
                    "countryShortCode": countryShortCode,
                    "countryName": countryName,
                    "cityName": cityName
                },
                galleryInstutation: CommissionsInstitution,
                isPublished: false,
            },
            models: LocalData,
        }).then((res, err) => {
            if (res && res.status === 200) {
                if (res?.data?.isSuccess) {
                    handleSetLocalCommissions(res?.data?.data);
                    // mrx : clear the items for new data
                    setCommissionsYear("");
                    setCommissionsType("");
                    setCommissionsTitle("");
                    setCommissionsInstitution("");
                    setcountryShortCode("");
                    setcountryName("");
                    setcityName("");
                    setEndCallcommissions("next");
                    // setSelectInputData(res?.data?.data);
                } else {
                    handleSetLocalCommissions(res?.data?.data === null ? [] : res?.data?.data);
                    toast.error(res?.data?.message);
                }
            } else {
                toast.error("something went wrong !");
            }
        });
    };

    useEffect(() => {
        if (EndCallcommissions === "true") {
            validateCommissions();
        } else {
            return
        }
    }, [EndCallcommissions])

    return (
        <Grid container alignItems='center' direction='column' className={`${signUpStyle.box}`} >
            <span className={signUpStyle.obj_for_id} id='Commissions'></span>

            <Grid item className={`${signUpStyle.title}`}>Commissions</Grid>

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
                    <Grid item className={`${styles.TwoInput}`}>
                        <Date
                            label='Year'
                            placeHolder='Choose date'
                            bgColor='white'
                            setValue={setCommissionsYear}
                            Value={CommissionsYear}
                            validateFlag={CheckRequired}
                        />
                    </Grid>
                    <Grid item className={`${styles.TwoInput}`}>
                        <CustomSelect
                            label='Type'
                            placeHolder='Choose an option'
                            Data={SelectInputData?.commissionTypes}
                            setValue={setCommissionsType}
                            Value={CommissionsType}
                        />
                    </Grid>
                </Grid>
                <Grid container className={`${styles.TwoForm}`}>
                    <Grid item className={`${styles.TwoInput}`} >
                        <InputForm
                            type='text'
                            placeHolder='Enter Title'
                            label='Title'
                            setCheckRequired={setCheckRequired}
                            validateFlag={CheckRequired}
                            schema={Joi.string()
                                .empty({ tlds: { allow: false } })
                                .messages({
                                    "string.empty": `Institution is required`,
                                    "any.required": `Institution is required`,
                                })}
                            setValue={setCommissionsTitle}
                            value={CommissionsTitle}
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
                            validateFlag={CheckRequired}
                            setcountryName={setcountryName}
                            setcountryShortCode={setcountryShortCode}
                        />
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} className={`${styles.w_100}`} >
                <InputForm
                    type='text'
                    placeHolder='Search for instituation or enter a gallery name'
                    label='Gallery or Instituation'
                    setCheckRequired={setCheckRequired}
                    validateFlag={CheckRequired}
                    schema={Joi.string()
                        .empty({ tlds: { allow: false } })
                        .messages({
                            "string.empty": `Institution is required`,
                            "any.required": `Institution is required`,
                        })}
                    setValue={setCommissionsInstitution}
                    value={CommissionsInstitution}
                />
            </Grid>

            <Grid item className={`${styles.w_100}`}>
                <Link to="Commissions" smooth={true} spy={true} duration={1000}>
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

