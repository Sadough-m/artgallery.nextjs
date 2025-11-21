import React, { useState, useEffect, useContext } from "react";
import Joi from "joi";
import { Link } from "react-scroll";
import { uuid } from 'uuidv4';
import { ToastContainer, toast } from "react-toastify";

// good man : material ui ↓
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

// mrx : styles ↓
import signUpStyle from '../../../../styles//signUp.module.css'
import styles from '../../../../styles/Home.module.css'

// good man : files ↓

import ArrowLeft from '../../../../public/images/icons/Arrow down.svg'

// mrx : components ↓
import InputForm from '../../../Forms/InputForm'
import Section from "./Items/ProfessionalOrganizationsSection";
import Date from '../../../Forms/Date';

// mrx : setCookies with this
import Cookies from "js-cookie";

// mrx : api links ↓
import { VALIDATE_CV_BUILDER_PROFESSIONAL_ORGANIZATIONLOCAL } from "../../../../pages/api/index";

// mrx : api ↓
import {
    PostUrl,
    PostAuthUrl,
    GetUrl,
    GetAuthUrl,
} from "../../../../pages/api/config";

// mrx : context ↓
import { Context } from "../../../../context/index";


export default function ProfessionalOrganizations({
    Wrong,
    setWrong,
    EndCallPropessionalOrganizations,
    setEndCallPropessionalOrganizations
}) {
    // mrx :  states ↓
    const [title, settitle] = useState("");

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


        ProfessionalOrganizationsEditData,
    } = useContext(Context);

    useEffect(() => {
        if (Publishing === true) {
            setLocalData(GET_ADDED_DATA);
            setPublishing(false);
        }
    }, [Publishing]);

    useEffect(() => {
        if (DataEdited === true) {
            setLocalData(ProfessionalOrganizationsEditData);
            setDataEdited(false);
        }
    }, [DataEdited]);

    // validate from step 2
    useEffect(() => {
        validatePublications()
    }, [Wrong])

    // validate from step 2
    const validatePublications = () => {
        // checking if any input is fill
        if (
            title?.length > 1
        ) {
            // set props value to false for next time
            // setWrong(false);

            // show the hint
            setCheckRequired(true);
            // mrx : if required value was not fill
            if (
                title === ""
            ) {
                // set Global state false
                setISAllformsOK(false);
            } else {
                // set Global state true
                setISAllformsOK(true);
                // hiddent the hint
                setCheckRequired(false);
                if (EndCallPropessionalOrganizations === "true") {
                    ValidateCvBuilderProfessionalOrganizationsLocal();
                } else {
                    return
                }
            }
        } else {
            if (EndCallPropessionalOrganizations === "true") {
                setEndCallPropessionalOrganizations("next");
            } else {
                return
            }
        }
    }

    // step-2  data
    const GET_ADDED_DATA = JSON.parse(
        typeof window !== "undefined"
            ? localStorage.getItem("CreateCv-Professional-Organizations") || "[]"
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
            localStorage.setItem("CreateCv-Professional-Organizations", "[]");
        }
    }, [LocalData]);

    // mrx : update state for set in localstorage  ↓
    const handleSetLocalProfessionalOrganizations = (data) => {
        setLocalData(data);
    };

    // mrx : set local data for eduction ↓
    useEffect(() => {
        localStorage.setItem("CreateCv-Professional-Organizations", JSON.stringify(LocalData));
    }, [LocalData]);

    // mrx : remove feild data / save it in local
    const handleAddAnother = (type) => {
        if (
            title === ""
        ) {
            if (type === "click") {
                toast.warning("Please fill the required values");
                setCheckRequired(true);
            } else {
                return "";
            }
        } else {
            setCheckRequired(false);
            ValidateCvBuilderProfessionalOrganizationsLocal();
        }
    };

    const ValidateCvBuilderProfessionalOrganizationsLocal = () => {
        PostAuthUrl(VALIDATE_CV_BUILDER_PROFESSIONAL_ORGANIZATIONLOCAL, {
            single: {
                isOpen: false,
                title: title,
                isPublished: false,
            },
            models: LocalData,
        }).then((res, err) => {
            if (res && res.status === 200) {
                if (res?.data?.isSuccess) {
                    handleSetLocalProfessionalOrganizations(res?.data?.data);
                    // mrx : clear the items for new data
                    setEndCallPropessionalOrganizations("next");
                    settitle("");
                } else {
                    handleSetLocalProfessionalOrganizations(res?.data?.data === null ? [] : res?.data?.data);
                    toast.error(res?.data?.message);
                }
            } else {
                toast.error("something went wrong !");
            }
        });
    };

    useEffect(() => {
        if (EndCallPropessionalOrganizations === "true") {
            validatePublications();
        } else {
            return
        }
    }, [EndCallPropessionalOrganizations])

    return (
        <Grid container alignItems='center' direction='column' className={`${signUpStyle.box}`} >
            <span className={signUpStyle.obj_for_id} id='ProfessionalOrganizations'></span>

            <Grid item className={`${signUpStyle.title}`}>Professional Organizations</Grid>

            <Section
                setLocalData={() => setLocalData()}
                LocalData={LocalData}
                haveData={HaveData}
                title="Saved info"
            />
            <Grid item className={`${styles.w_100}`}>
                <Grid item xs={12} className={`${styles.w_100}`} >
                    <InputForm
                        type='text'
                        placeHolder='Enter Organization title'
                        label='Organization title'
                        setCheckRequired={setCheckRequired}
                        validateFlag={CheckRequired}
                        setValue={settitle}
                        value={title}
                        schema={Joi.string()
                            .empty({ tlds: { allow: false } })
                            .messages({
                                "string.empty": `Organization title is required`,
                                "any.required": `Organization title is required`,
                            })}
                    />
                </Grid>
            </Grid>
            <Grid item className={`${styles.w_100}`}>
                <Link to="ProfessionalOrganizations" smooth={true} spy={true} duration={1000}>
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
