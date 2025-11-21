import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import { uuid } from 'uuidv4';
import { Link } from "react-scroll";
import Joi from "joi";
import { ToastContainer, toast } from "react-toastify";

// good man : material ui ↓
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

// good man : styles ↓
import signUpStyle from '../../../styles/signUp.module.css'
import styles from '../../../styles/Home.module.css'

// good man : files ↓
import ArrowLeft from '../../../public/images/icons/Arrow down.svg'


// mrx : components ↓
import InputForm from '../../Forms/InputForm'
import Date from '../../Forms/Date';
import Section from "./Items/GrantsAndAwardsSection";

// mrx : setCookies with this
import Cookies from "js-cookie";

// mrx : api links ↓
import { VALIDATE_CV_BUILDER_GRANS_AND_AWARDS } from "../../../pages/api/index";

// mrx : api ↓
import {
    PostUrl,
    PostAuthUrl,
    GetUrl,
    GetAuthUrl,
} from "../../../pages/api/config";

// mrx : context ↓
import { Context } from "../../../context/index";

export default function GrantsAndAwards({
    SelectInputData,
    Wrong,
    setWrong,
    EndCallgrantsAndAwards,
    setEndCallgrantsAndAwards
}) {
    // mrx : GrantsAndAwards states ↓
    const [GrantsAndAwardsYear, setGrantsAndAwardsYear] = useState("");
    const [GrantsAndAwardsTitle, setGrantsAndAwardsTitle] = useState("");
    const [GrantsAndAwardsInstituation, setGrantsAndAwardsInstituation] = useState("");

    const [CheckRequired, setCheckRequired] = useState(false);
    const [HaveData, setHaveData] = useState(false);
    const [LocalData, setLocalData] = useState([]);

    // mrx : context
    const {
        ISAllformsOK,
        setISAllformsOK,
        GAAataEdited,
        setGAAataEdited,


        GrantsAndAwardsEditData,
    } = useContext(Context);


    useEffect(() => {
        if (GAAataEdited === true) {
            setLocalData(GrantsAndAwardsEditData);
            setGAAataEdited(false);
        }
    }, [GAAataEdited]);

    // validate from step 2
    useEffect(() => {
        validateGrantsAndAwards()
    }, [Wrong])

    // validate from step 2
    const validateGrantsAndAwards = () => {
        // checking if any input is fill
        if (
            GrantsAndAwardsYear?.length > 1 ||
            GrantsAndAwardsTitle?.length > 1 ||
            GrantsAndAwardsInstituation?.length > 1
        ) {
            // set props value to false for next time
            // setWrong(false);

            // show the hint
            setCheckRequired(true);
            // mrx : if required value was not fill
            if (
                GrantsAndAwardsYear === "" ||
                GrantsAndAwardsTitle === "" ||
                GrantsAndAwardsInstituation === ""
            ) {
                // set Global state false
                setISAllformsOK(false);
            } else {
                // set Global state true
                setISAllformsOK(true);
                // hiddent the hint
                setCheckRequired(false);
                if (EndCallgrantsAndAwards === "true") {
                    ValidateCvBuilderGrantsAndAwardsLocal();
                } else {
                    return
                }
            }
        } else {
            if (EndCallgrantsAndAwards === "true") {
                setEndCallgrantsAndAwards("next");
            } else {
                return
            }
        }
    }

    // step-2 GrantsAndAwards data
    const GET_ADDED_DATA = JSON.parse(
        typeof window !== "undefined"
            ? localStorage.getItem("Step2-Grants-And-Awards") || "[]"
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
            localStorage.setItem("Step2-Grants-And-Awards", "[]");
        }
    }, [LocalData]);

    // mrx : update state for set in localstorage  ↓
    const handleSetLocalGrantsandAwards = (data) => {
        setLocalData(data);
    };

    // mrx : set local data for eduction ↓
    useEffect(() => {
        localStorage.setItem("Step2-Grants-And-Awards", JSON.stringify(LocalData));
    }, [LocalData]);

    // mrx : remove feild data / save it in local
    const handleAddAnother = (type) => {
        if (
            GrantsAndAwardsYear === "" ||
            GrantsAndAwardsTitle === "" ||
            GrantsAndAwardsInstituation === ""
        ) {
            if (type === "click") {
                toast.warning("Please fill the required values");
                setCheckRequired(true);
            } else {
                return "";
            }
        } else {
            setCheckRequired(false);
            ValidateCvBuilderGrantsAndAwardsLocal();
        }
    };

    const ValidateCvBuilderGrantsAndAwardsLocal = () => {
        PostAuthUrl(VALIDATE_CV_BUILDER_GRANS_AND_AWARDS, {
            single: {
                isOpen: false,
                year: GrantsAndAwardsYear,
                title: GrantsAndAwardsTitle,
                instutation: GrantsAndAwardsInstituation,
                isPublished: false,
            },
            models: LocalData,
        }).then((res, err) => {
            if (res && res.status === 200) {
                if (res?.data?.isSuccess) {
                    handleSetLocalGrantsandAwards(res?.data?.data);
                    // mrx : clear the items for new data
                    setGrantsAndAwardsYear("");
                    setGrantsAndAwardsTitle("");
                    setGrantsAndAwardsInstituation("");
                    // setSelectInputData(res?.data?.data);
                    setEndCallgrantsAndAwards("next");
                } else {
                    handleSetLocalGrantsandAwards(res?.data?.data === null ? [] : res?.data?.data);
                    toast.error(res?.data?.message);
                }
            } else {
                toast.error("something went wrong !");
            }
        });
    };

    useEffect(() => {
        if (EndCallgrantsAndAwards === "true") {
            validateGrantsAndAwards();
        } else {
            return
        }
    }, [EndCallgrantsAndAwards])

    return (
        <Grid container alignItems='center' direction='column' className={`${signUpStyle.box}`} >
            <span className={signUpStyle.obj_for_id} id='GrantsAndAwards'></span>
            <Grid item className={`${signUpStyle.title}`}>Grants and Awards</Grid>

            <Section
                setLocalData={() => setLocalData()}
                LocalData={LocalData}
                SelectInputData={SelectInputData}
                haveData={HaveData}
                title="Saved info"
            />

            <Grid item className={`${styles.w_100}`}>

                <Grid container className={`${styles.TwoForm}`}>
                    <Grid item className={`${styles.TwoInput}`}>
                        <Date
                            label='Year'
                            placeHolder='Choose year'
                            setValue={setGrantsAndAwardsYear}
                            Value={GrantsAndAwardsYear}
                            validateFlag={CheckRequired}
                        />
                    </Grid>
                    <Grid item className={`${styles.TwoInput}`}>
                        <InputForm
                            placeHolder='Enter award title'
                            label='Title'
                            setCheckRequired={setCheckRequired}
                            validateFlag={CheckRequired}
                            schema={Joi.string()
                                .empty({ tlds: { allow: false } })
                                .messages({
                                    "string.empty": `award title is required`,
                                    "any.required": `award title is required`,
                                })}
                            type="text"
                            setValue={setGrantsAndAwardsTitle}
                            value={GrantsAndAwardsTitle}
                        />
                    </Grid>
                </Grid>

                <Grid item xs={12} className={`${styles.w_100}`} >
                    <InputForm
                        setCheckRequired={setCheckRequired}
                        validateFlag={CheckRequired}
                        schema={Joi.string()
                            .empty({ tlds: { allow: false } })
                            .messages({
                                "string.empty": `Instituation is required`,
                                "any.required": `Instituation is required`,
                            })}
                        type="text"
                        setValue={setGrantsAndAwardsInstituation}
                        value={GrantsAndAwardsInstituation}
                        placeHolder='Enter Instituation'
                        label='Instituation'
                    />
                </Grid>

            </Grid>

            <Grid item className={`${styles.w_100}`}>
                <Link to="GrantsAndAwards" smooth={true} spy={true} duration={1000}>
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
