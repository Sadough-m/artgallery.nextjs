import React, { useEffect, useState } from 'react';
import Joi from "joi";

// MATERIAL UI
import Modal from '@material-ui/core/Modal'
import Fade from '@material-ui/core/Fade'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

// mrx : api links ↓
import {
    EDIT_INFO_CONTACT
} from "../../../pages/api/index";

// mrx : api ↓
import {
    PostUrl,
    PostAuthUrl,
    PutAuthUrl,
    GetUrl,
    GetAuthUrl,
} from "../../../pages/api/config";

// components
import ArtistStyle from '../../../styles/artist.module.css'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import InputForm from '../../Forms/InputForm'

import styles from '../../../styles/Home.module.css'
import Select from '../../Forms/Select'
import PhoneNumber from '../../Forms/PhoneNumber'
import CustomSelect from '../../Forms/CustomSelect'
import { toast } from 'react-toastify';

export default function EditInfo({
    AllData,
    shippingAddress,
    handleModal,
    getArtistDetails
}) {
    const [Email, setEmail] = useState("");
    const [Title, setTitle] = useState("");
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [validateFlag, setValidateFlag] = useState("");
    const [KnownAslist, setKnownAslist] = useState([]);
    const [knownAs, setknownAs] = useState(0);

    const [phoneNumber, setPhoneNumber] = useState("");
    const [Code, setCode] = useState("");
    const [phoneNumber2, setPhoneNumber2] = useState("");
    const [Code2, setCode2] = useState("");
    const [ListPhoneNumber, setListPhoneNumber] = useState([{}]);
    const [Number2, setNumber2] = useState(false);

    const [CnaSaveAg, setCnaSaveAg] = useState(true);

    useEffect(() => {
        setPhoneNumber(ListPhoneNumber ? ListPhoneNumber?.map((item) => item?.phoneNumber)[0] : "");
        setCode(ListPhoneNumber ? ListPhoneNumber?.map((item) => item?.countryUniqCode)[0] : "");
        setPhoneNumber2(ListPhoneNumber ? ListPhoneNumber?.map((item) => item?.phoneNumber)[1] : "");
        setCode2(ListPhoneNumber ? ListPhoneNumber?.map((item) => item?.countryUniqCode)[1] : "");
        if (ListPhoneNumber?.map((item) => item?.phoneNumber)[1] === null) {
            setNumber2(false);
        } else {
            setNumber2(true);
        }
    }, [ListPhoneNumber]);

    useEffect(() => {
        setKnownAslist(shippingAddress?.knownAsList);
        setknownAs(shippingAddress?.knownAs);
        setTitle(shippingAddress?.title);
        setEmail(shippingAddress?.email);
        setfirstName(shippingAddress?.firstName);
        setlastName(shippingAddress?.lastName);
        setListPhoneNumber(shippingAddress?.phoneNumbers);
    }, [shippingAddress])

    useEffect(() => {
        if (Number2 === false) {
            setPhoneNumber2("");
            setCode2("");
        }
    }, [Number2])

    const SaveChange = (e) => {
        if (
            Email !== "" ||
            firstName.trim() !== "" ||
            lastName.trim() !== "" ||
            Title.trim() !== "" ||
            !knownAs
        ) {
            const COllectionID = localStorage.getItem("collectionId");
            PostAuthUrl(EDIT_INFO_CONTACT(COllectionID), {
                "email": Email,
                "firstName": firstName,
                "lastName": lastName,
                "title": Title,
                "knownAs": knownAs,
                "userId": shippingAddress?.userId,
                "id": AllData?.id,
                "phoneNumbers": [
                    JSON.parse(localStorage.getItem("Edit-Info-AllNumbers1"))
                        ?.phoneNumber
                        ? JSON.parse(localStorage.getItem("Edit-Info-AllNumbers1"))
                        : {},
                    JSON.parse(localStorage.getItem("Edit-Info-AllNumbers2"))
                        ?.phoneNumber
                        ? JSON.parse(localStorage.getItem("Edit-Info-AllNumbers2"))
                        : {},
                ]
            }).then((res, err) => {
                if (res && res.status === 200) {
                    if (res?.data?.isSuccess) {
                        toast.success(`Overview updated successfully`);
                        localStorage.removeItem("Edit-Info-AllNumbers1");
                        localStorage.removeItem("Edit-Info-AllNumbers2");
                        handleModal()
                        getArtistDetails(AllData?.id)
                    } else {
                        toast.error(res?.data?.message);
                    }
                } else {
                    toast.error("something went wrong !");
                }
            });
        } else {
            setValidateFlag(true);
            toast.error("Please fill the required values")
        }

    };


    // mrx : set local data for bio ↓
    // title input
    const handleSetLocal_info_AllNumbers1 = (e) => {
        localStorage.setItem("Edit-Info-AllNumbers1",
            JSON.stringify(
                {
                    countryUniqCode: Code,
                    phoneNumber: phoneNumber,
                },
                {
                    countryUniqCode: Code2,
                    phoneNumber: phoneNumber2,
                }

            )
        );
    }

    // mrx : set local data for bio ↓
    // title input
    const handleSetLocal_info_AllNumbers2 = (e) => {
        localStorage.setItem("Edit-Info-AllNumbers2",
            JSON.stringify(
                {
                    countryUniqCode: Code2,
                    phoneNumber: phoneNumber2,
                }
            )
        );
    }

    // phoneNumber 1 input
    useEffect(() => {
        handleSetLocal_info_AllNumbers1()
    }, [phoneNumber]);

    // Code 1 input
    useEffect(() => {
        handleSetLocal_info_AllNumbers1()
    }, [Code]);

    useEffect(() => {
        handleSetLocal_info_AllNumbers2()
    }, [phoneNumber2]);

    // Code 1 input
    useEffect(() => {
        handleSetLocal_info_AllNumbers2()
    }, [Code2]);

    console.log("mamad " + Code2)

    return (
        <Grid
            style={{ position: "relative", top: "-10px", width: '100%' }} item className={ArtistStyle.wrapperModal}>
            <Grid item className={`${styles.w_100}`}>
                <Grid container className={`${styles.TwoForm}`}>
                    <Grid item className={`${styles.TwoInput}`}>
                        <InputForm
                            type='email'
                            disabled={Email !== "" ? true : false}
                            placeHolder='Enter email address'
                            value={Email}
                            setValue={setEmail}
                            label='Email address'
                            schema={Joi.string()
                                .empty({ tlds: { allow: false } })
                                .messages({
                                    "string.empty": `Email address is required`,
                                })
                            }
                        />
                    </Grid>
                    <Grid item className={`${styles.TwoInput}`}>
                        <InputForm
                            value={Title}
                            setValue={setTitle}
                            type='text'
                            placeHolder='Enter contact title'
                            onChange={() => setCnaSaveAg(false)}
                            label='Title'
                            schema={Joi.string()
                                .empty({ tlds: { allow: false } })
                                .messages({
                                    "string.empty": `Contact title is required`,
                                })
                            }
                        />
                    </Grid>
                </Grid>
                <Grid container className={`${styles.TwoForm}`}>
                    <Grid item className={`${styles.TwoInput}`} >
                        <InputForm
                            type='text'
                            placeHolder='Enter first name'
                            label='First name'
                            value={firstName}
                            setValue={setfirstName}
                            onChange={() => setCnaSaveAg(false)}
                            schema={Joi.string()
                                .empty({ tlds: { allow: false } })
                                .messages({
                                    "string.empty": `First name is required`,
                                })
                            }
                        />
                    </Grid>
                    <Grid item className={`${styles.TwoInput}`}>
                        <InputForm
                            type='text'
                            placeHolder='Enter last name'
                            label='Last name'
                            value={lastName}
                            setValue={setlastName}
                            onChange={() => setCnaSaveAg(false)}
                            schema={Joi.string()
                                .empty({ tlds: { allow: false } })
                                .messages({
                                    "string.empty": `Last name is required`,
                                })
                            }
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={`${styles.w_100}`} >
                <CustomSelect
                    label='Known as'
                    have_img={true}
                    bgColor="white"
                    setValue={setknownAs}
                    Value={knownAs}
                    onChange={() => setCnaSaveAg(false)}
                    Data={KnownAslist}
                    validateFlag={validateFlag}
                    setSelectName={setknownAs}
                    SelectName={KnownAslist && KnownAslist
                        ?.filter((item) => item?.id === knownAs)
                        .map((item) => item?.name)
                    }
                />
            </Grid>

            <Grid item>
                <PhoneNumber
                    Label="Phone number"
                    PlaceHolder="Enter your number"
                    name="phoneNumber"
                    value={phoneNumber}
                    setValue={setPhoneNumber}
                    onChange={() => setCnaSaveAg(false)}
                    setCode={setCode}
                    SelectedFlag={Code ? Code : ListPhoneNumber ? ListPhoneNumber?.map((item) => item?.countryUniqCode)[0] : ""}
                />
            </Grid>
            <Grid item className={`${styles.w_100}`}>
                <Button
                    startIcon={!Number2 ? <AddCircleOutlineIcon /> : <RemoveCircleOutlineIcon />}
                    variant='text'
                    color='primary'
                    onClick={() => { setNumber2(!Number2); setCnaSaveAg(false) }}
                >
                    <span
                        className={`${styles.text__trs__none}`}
                    >
                        {!Number2 ? "Add" : "Remove"} Number
                    </span>
                </Button>
            </Grid>
            {
                Number2 ? (
                    <Grid item>
                        <PhoneNumber
                            Label="Phone number"
                            PlaceHolder="Enter your number"
                            name="phoneNumber"
                            value={phoneNumber2}
                            onChange={() => setCnaSaveAg(false)}
                            setValue={setPhoneNumber2}
                            setCode={setCode2}
                            SelectedFlag={Code2 ? Code2 : ListPhoneNumber ? ListPhoneNumber?.map((item) => item?.countryUniqCode)[1] : ""}
                        />
                    </Grid>
                ) : (
                    <></>
                )
            }
            <Grid
                style={{ top: "30px", position: "relative" }}
                item
            >
                <Button
                    disabled={CnaSaveAg}
                    onClick={() => SaveChange()}
                    variant='contained' color='primary' className={ArtistStyle.Button_Add_Artist}><span className={ArtistStyle.text_None}>Save Changes</span></Button>
            </Grid>
        </Grid>
    )

}
