import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import Joi from "joi";
import { uuid } from 'uuidv4';
import { Link } from "react-scroll";
import { ToastContainer, toast } from "react-toastify";

// good man : material ui ↓
import {
    Button,
    Grid,
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

// good man : styles ↓
import signUpStyle from '../../../../styles/signUp.module.css'
import styles from '../../../../styles/Home.module.css'

// good man : files ↓

// good man : components ↓
import InputForm from '../../../Forms/InputForm';
import Section from "./Items/BilbiographySection";

// mrx : setCookies with this
import Cookies from "js-cookie";

// mrx : api links ↓
import { VALIDATE_CV_BUILDER_BILBIOGRAPHY } from "../../../../pages/api/index";

// mrx : api ↓
import {
    PostUrl,
    PostAuthUrl,
    GetUrl,
    GetAuthUrl,
} from "../../../../pages/api/config";

// mrx : context ↓
import { Context } from "../../../../context/index";

export default function Bilbiography({
    Wrong,
    setWrong,
    EndCallBilbiography,
    setEndCallBilbiography
}) {
    // mrx :  states ↓
    const [Bilbiography, setBilbiography] = useState("");

    const [CheckRequired, setCheckRequired] = useState(false);
    const [HaveData, setHaveData] = useState(false);
    const [LocalData, setLocalData] = useState([]);

    // mrx : context
    const {
        ISAllformsOK,
        setISAllformsOK,
        DataEdited,
        setDataEdited,


        BilbiographyEditData,
    } = useContext(Context);
    
    // validate from step 2
    useEffect(() => {
        validateBilbiography()
    }, [Wrong])

    useEffect(() => {
        if (DataEdited === true) {
            setLocalData(BilbiographyEditData);
            setDataEdited(false);
        }
    }, [DataEdited]);

    // validate from step 2
    const validateBilbiography = () => {
        // checking if any input is fill
        if (
            Bilbiography?.length > 1
        ) {
            // set props value to false for next time
            // setWrong(false);

            // show the hint
            setCheckRequired(true);
            // mrx : if required value was not fill
            if (
                Bilbiography === ""
            ) {
                // set Global state false
                setISAllformsOK(false);
            } else {
                // set Global state true
                setISAllformsOK(true);
                // hiddent the hint
                setCheckRequired(false);
                if (EndCallBilbiography === "true") {
                    ValidateCvBuilderBilbiographyLocal();
                } else {
                    return
                }
            }
        } else {
            if (EndCallBilbiography === "true") {
                setEndCallBilbiography("next");
            } else {
                return
            }
        }
    }

    // step-2  data
    const GET_ADDED_DATA = JSON.parse(
        typeof window !== "undefined"
            ? localStorage.getItem("Add-Artist-Bilbiography") || "[]"
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
            localStorage.setItem("Add-Artist-Bilbiography", "[]");
        }
    }, [LocalData]);

    // mrx : update state for set in localstorage  ↓
    const handleSetLocalBilbiography = (data) => {
        setLocalData(data);
    };

    // mrx : set local data for eduction ↓
    useEffect(() => {
        localStorage.setItem("Add-Artist-Bilbiography", JSON.stringify(LocalData));
    }, [LocalData]);

    // mrx : remove feild data / save it in local
    const handleAddAnother = (type) => {
        if (
            Bilbiography === ""
        ) {
            if (type === "click") {
                toast.warning("Please fill the required values");
                setCheckRequired(true);
            } else {
                return "";
            }
        } else {
            setCheckRequired(false);
            ValidateCvBuilderBilbiographyLocal();
        }
    };

    const ValidateCvBuilderBilbiographyLocal = () => {
        PostAuthUrl(VALIDATE_CV_BUILDER_BILBIOGRAPHY, {
            single: {
                isOpen: false,
                description: Bilbiography,
                isPublished: false,
            },
            models: LocalData,
        }).then((res, err) => {
            if (res && res.status === 200) {
                if (res?.data?.isSuccess) {
                    handleSetLocalBilbiography(res?.data?.data);
                    // mrx : clear the items for new data
                    setBilbiography("");
                    setEndCallBilbiography("next");
                } else {
                    handleSetLocalBilbiography(res?.data?.data === null ? [] : res?.data?.data);
                    toast.error(res?.data?.message);
                }
            } else {
                toast.error("something went wrong !");
            }
        });
    };

    useEffect(() => {
        if (EndCallBilbiography === "true") {
            validateBilbiography();
        } else {
            return
        }
    }, [EndCallBilbiography])

    return (
        <Grid container alignItems='center' direction='column' className={`${signUpStyle.box}`} >
            <span className={signUpStyle.obj_for_id} id='Biography'></span>
            <Grid item className={`${signUpStyle.title}`}>Bilbiography</Grid>

            <Section
                setLocalData={() => setLocalData()}
                LocalData={LocalData}
                haveData={HaveData}
                title="Saved info"
            />

            <Grid item xs={12} className={`${styles.w_100}`}>
                <InputForm
                    type='text'
                    placeHolder='Write a biography refrence here'
                    label='Bilbiography'
                    setCheckRequired={setCheckRequired}
                    validateFlag={CheckRequired}
                    setValue={setBilbiography}
                    value={Bilbiography}
                    schema={Joi.string()
                        .empty({ tlds: { allow: false } })
                        .messages({
                            "string.empty": `Bilbiography is required`,
                        })}
                />
            </Grid>

            <Grid item className={`${styles.w_100}`}>
                <Link to="Biography" smooth={true} spy={true} duration={1000}>
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