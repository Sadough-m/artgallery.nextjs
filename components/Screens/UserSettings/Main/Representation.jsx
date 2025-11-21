import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-scroll";
import { uuid } from 'uuidv4';
import Joi from "joi";
import { ToastContainer, toast } from 'react-toastify';

// good man : material ui ↓
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

// good man : styles ↓
import signUpStyle from '../../../../styles/signUp.module.css'
import styles from '../../../../styles/Home.module.css'

// good man : files ↓
import ArrowLeft from '../../../../public/images/icons/Arrow down.svg'


// good man : components ↓
import InputForm from '../../../Forms/InputForm'
import Section from './Items/RepresentationSection';
import Location from '../../../Forms/Location';

// mrx : setCookies with this
import Cookies from 'js-cookie'

// mrx : api links ↓
import {
    VALIDATE_CV_BUILDER_REPERESENATIONLOCAL
} from '../../../../pages/api/index';

// mrx : api ↓
import { PostUrl, PostAuthUrl, GetUrl, GetAuthUrl } from '../../../../pages/api/config';

// mrx : context ↓
import { Context } from "../../../../context/index";

export default function Representation({
    SelectInputData,
    CountrySelectInputData,
    Wrong,
    setWrong,
    EndCallrepresentation,
    setEndCallrepresentation
}) {
    // mrx : Representation states ↓
    const [RepresentationTitle, setRepresentationTitle] = useState("");

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

        RepresentationEditData,
    } = useContext(Context);

    // validate from step 2
    useEffect(() => {
        validatePublications()
    }, [Wrong]);

    useEffect(() => {
        if (Publishing === true) {
            setLocalData(GET_ADDED_DATA);
            setPublishing(false);
        }
    }, [Publishing]);

    useEffect(() => {
        if (DataEdited === true) {
            setLocalData(RepresentationEditData);
            setDataEdited(false);
        }
    }, [DataEdited]);

    // validate from step 2
    const validatePublications = () => {
        // checking if any input is fill
        if (
            RepresentationTitle?.length > 1 ||
            cityName?.length > 1
        ) {
            // set props value to false for next time
            // setWrong(false);

            // show the hint
            setCheckRequired(true);
            // mrx : if required value was not fill
            if (
                RepresentationTitle === "" ||
                cityName === ""
            ) {
                // set Global state false
                setISAllformsOK(false);
            } else {
                // set Global state true
                setISAllformsOK(true);
                // hiddent the hint
                setCheckRequired(false);
                if (EndCallrepresentation === "true") {
                    ValidateCvBuilderRepresentationLocal();
                } else {
                    return
                }
            }
        } else {
            if (EndCallrepresentation === "true") {
                setEndCallrepresentation("next");
            } else {
                return
            }
        }
    }

    // step-2 education data
    const GET_ADDED_DATA = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("CreateCv-Representation") || '[]' : '[]');

    useEffect(() => {
        setLocalData(GET_ADDED_DATA);
    }, [])

    useEffect(() => {
        if (LocalData?.length) {
            setHaveData(true);
        } else {
            setHaveData(false);
            localStorage.setItem("CreateCv-Representation", '[]')
        }
    }, [LocalData]);

    // mrx : update state for set in localstorage  ↓
    const handleSetLocalRepresentation = (data) => {
        setLocalData(data);
    }

    // mrx : set local data for eduction ↓
    useEffect(() => {
        localStorage.setItem("CreateCv-Representation", JSON.stringify(LocalData));
    }, [LocalData]);

    // mrx : remove feild data / save it in local 
    const handleAddAnother = (type) => {
        if (
            RepresentationTitle === "" ||
            cityName === ""
        ) {
            setCheckRequired(true);
            if (type === "click") {
                toast.warning("Please fill the required values");
            } else {
                return "";
            }
        } else {
            setCheckRequired(false);
            ValidateCvBuilderRepresentationLocal()
        }
    }

    const ValidateCvBuilderRepresentationLocal = () => {
        PostAuthUrl(VALIDATE_CV_BUILDER_REPERESENATIONLOCAL, {
            "single": {
                "isOpen": false,
                "galleryInstutation": RepresentationTitle,
                "location": {
                    "countryShortCode": countryShortCode,
                    "countryName": countryName,
                    "cityName": cityName
                },
                "isPublished": false,
            },
            "models":
                LocalData
        }).then((res, err) => {
            if (res && res.status === 200) {
                if (res?.data?.isSuccess) {
                    handleSetLocalRepresentation(res?.data?.data);
                    // mrx : clear the items for new data
                    setRepresentationTitle("");
                    setcountryShortCode("");
                    setcountryName("");
                    setcityName("");
                    // setSelectInputData(res?.data?.data);
                    setEndCallrepresentation("next");
                } else {
                    handleSetLocalRepresentation(res?.data?.data === null ? [] : res?.data?.data);
                    toast.error(res?.data?.message);
                }
            } else {
                toast.error("something went wrong !");
            }
        });
    }

    useEffect(() => {
        if (EndCallrepresentation === "true") {
            validatePublications();
        } else {
            return
        }
    }, [EndCallrepresentation])

    return (
        <Grid container alignItems='center' direction='column' className={`${signUpStyle.box}`} >
            <span className={signUpStyle.obj_for_id} id='Representation'></span>

            <Grid item className={`${signUpStyle.title}`}>Representation</Grid>

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
                        <InputForm
                            setCheckRequired={setCheckRequired}
                            validateFlag={CheckRequired}
                            schema={Joi.string()
                                .empty({ tlds: { allow: false } })
                                .messages({
                                    "string.empty": `Title is required`,
                                    "any.required": `Title is required`,
                                })}
                            type='text'
                            setValue={setRepresentationTitle}
                            value={RepresentationTitle}
                            placeHolder='Enter Title'
                            label='Title'

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
            <Grid item className={`${styles.w_100}`}>
                <Link to="Representation" smooth={true} spy={true} duration={1000}>
                    <Button
                        startIcon={<AddCircleOutlineIcon />}
                        variant='text'
                        color='primary'
                        onClick={() => handleAddAnother("click")}
                    >
                        <span className={`${styles.text__trs__none}`}>Add Another</span>
                    </Button>
                </Link>            </Grid>
        </Grid>
    )
}

