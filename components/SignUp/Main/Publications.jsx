import React, { useState, useEffect, useContext } from "react";
import { uuid } from 'uuidv4';
import Joi from "joi";
import { Link } from "react-scroll";
import { ToastContainer, toast } from "react-toastify";

// good man : material ui ↓
import {
    Button,
    Grid,
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';


// good man : styles ↓
import signUpStyle from '../../../styles/signUp.module.css'
import styles from '../../../styles/Home.module.css'

// good man : files ↓

// good man : components ↓
import InputForm from '../../Forms/InputForm';
import Section from "./Items/PublicationsSection";

// mrx : setCookies with this
import Cookies from "js-cookie";

// mrx : api links ↓
import { VALIDATE_CV_BUILDER_PUBLICATION } from "../../../pages/api/index";

// mrx : api ↓
import {
    PostUrl,
    PostAuthUrl,
    GetUrl,
    GetAuthUrl,
} from "../../../pages/api/config";

// mrx : context ↓
import { Context } from "../../../context/index";

export default function Publications({
    Wrong,
    setWrong,
    EndCallpublications,
    setEndCallpublications
}) {
    // mrx :  states ↓
    const [Name, setName] = useState("");

    const [CheckRequired, setCheckRequired] = useState(false);
    const [HaveData, setHaveData] = useState(false);
    const [LocalData, setLocalData] = useState([]);
    
    // mrx : context
    const {
        ISAllformsOK,
        setISAllformsOK,
        PubiataEdited,
        setPubiataEdited,


        PublicationsEditData,
    } = useContext(Context);
    
    // validate from step 2
    useEffect(() => {
        validatePublications()
    }, [Wrong])

    useEffect(() => {
        if (PubiataEdited === true) {
            setLocalData(PublicationsEditData);
            setPubiataEdited(false);
        }
    }, [PubiataEdited]);

    // validate from step 2
    const validatePublications = () => {
        // checking if any input is fill
        if (
            Name?.length > 1
        ) {
            // set props value to false for next time
            // setWrong(false);

            // show the hint
            setCheckRequired(true);
            // mrx : if required value was not fill
            if (
                Publications === ""
            ) {
                // set Global state false
                setISAllformsOK(false);
            } else {
                // set Global state true
                setISAllformsOK(true);
                // hiddent the hint
                setCheckRequired(false);
                if (EndCallpublications === "true") {
                    ValidateCvBuilderPublicationsLocal();
                } else {
                    return
                }
            }
        } else {
            if (EndCallpublications === "true") {
                setEndCallpublications("next");
            } else {
                return
            }
        }
    }

    // step-2  data
    const GET_ADDED_DATA = JSON.parse(
        typeof window !== "undefined"
            ? localStorage.getItem("Step2-Publications") || "[]"
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
            localStorage.setItem("Step2-Publications", "[]");
        }
    }, [LocalData]);

    // mrx : update state for set in localstorage  ↓
    const handleSetLocalPublications = (data) => {
        setLocalData(data);
    };

    // mrx : set local data for eduction ↓
    useEffect(() => {
        localStorage.setItem("Step2-Publications", JSON.stringify(LocalData));
    }, [LocalData]);

    // mrx : remove feild data / save it in local
    const handleAddAnother = (type) => {
        if (
            Publications === ""
        ) {
            if (type === "click") {
                toast.warning("Please fill the required values");
                setCheckRequired(true);
            } else {
                return "";
            }
        } else {
            setCheckRequired(false);
            ValidateCvBuilderPublicationsLocal();
        }
    };

    const ValidateCvBuilderPublicationsLocal = () => {
        PostAuthUrl(VALIDATE_CV_BUILDER_PUBLICATION, {
            single: {
                isOpen: false,
                name: Name,
                isPublished: false,
            },
            models: LocalData,
        }).then((res, err) => {
            if (res && res.status === 200) {
                if (res?.data?.isSuccess) {
                    handleSetLocalPublications(res?.data?.data);
                    // mrx : clear the items for new data
                    setName("");
                    setEndCallpublications("next");
                } else {
                    handleSetLocalPublications(res?.data?.data === null ? [] : res?.data?.data);
                    toast.error(res?.data?.message);
                }
            } else {
                toast.error("something went wrong !");
            }
        });
    };

    useEffect(() => {
        if (EndCallpublications === "true") {
            validatePublications();
        } else {
            return
        }
    }, [EndCallpublications])

    return (
        <Grid container alignItems='center' direction='column' className={`${signUpStyle.box}`} >
            <span className={signUpStyle.obj_for_id} id='Publications'></span>
            <Grid item className={`${signUpStyle.title}`}>Publications</Grid>

            <Section
                setLocalData={() => setLocalData()}
                LocalData={LocalData}
                haveData={HaveData}
                title="Saved info"
            />

            <Grid item xs={12} className={`${styles.w_100}`}>
                <InputForm
                    type='text'
                    placeHolder='Write a publication name'
                    label='Publications'
                    setCheckRequired={setCheckRequired}
                    validateFlag={CheckRequired}
                    setValue={setName}
                    value={Name}
                    schema={Joi.string()
                        .empty({ tlds: { allow: false } })
                        .messages({
                            "string.empty": `Publications is required`,
                            "any.required": `Publications is required`,
                        })}
                />
            </Grid>

            <Grid item className={`${styles.w_100}`}>
                <Link to="Publications" smooth={true} spy={true} duration={1000}>
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