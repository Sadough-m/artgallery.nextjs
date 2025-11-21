import React, { useState, useEffect } from "react";
import Joi from "joi";
import { toast } from "react-toastify";

// mrx : material ui
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { Hidden, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";

// mrx : api links ↓
import {
    EDIT_DEFULT_ADDRESS_CONTACT
} from "../../../pages/api/index";

// mrx : api ↓
import {
    PostUrl,
    PostAuthUrl,
    PutAuthUrl,
    GetUrl,
    GetAuthUrl,
} from "../../../pages/api/config";

// mrx : components
import ArtistStyle from "../../../styles/artist.module.css";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import InputForm from "../../Forms/InputForm";
import styles from "../../../styles/Home.module.css";
import PhoneNumber from "../../Forms/PhoneNumber";
import CustomSelect from "../../Forms/CustomSelect";
import iran from "../../../public/images/iran.png";
import usa from "../../../public/images/united states.png";
import uk from "../../../public/images/united kingdom.png";
import poland from "../../../public/images/poland.png";
import irland from "../../../public/images/ireland.png";
import arrowBack from "../../../public/images/icons/Arrow left -.svg";
import Image from "next/image";
import useWindowSize from "../../../Hooks/useWindowSize";
import { CircularProgress } from "@material-ui/core";



const countryList = [
    { id: 1, name: "Iran", img: iran },
    { id: 2, name: "United state", img: usa },
    { id: 3, name: "United kingdom", img: uk },
    { id: 4, name: "Poland", img: poland },
    { id: 5, name: "Irland", img: irland },
];

const schema = {
    name: Joi.string().required().messages({
        "string.empty": `First name is required`,
    }),
    city: Joi.string().required().messages({
        "string.empty": `City  is required`,
    }),
    familly: Joi.string().required().messages({
        "string.empty": `Last name  is required`,
    }),
    address: Joi.string().required().messages({
        "string.empty": `Address  is required`,
    }),
    country: Joi.number().required().messages({
        "number.empty": `Country  is required`,
    }),
    postalCode: Joi.string().required().messages({
        "string.empty": `Postal code  is required`,
    }),
    phoneNumber: Joi.number()
        .min(1000000000)
        .max(9999999999)
        .required()
        .messages({
            "number.empty": "Phone number is required",
            "number.min": `Enter a valid Phone number`,
            "number.max": `Enter a valid Phone number`,
        }),
    galleryStudioAppartmentEtc: Joi.optional(),
};

export default function EditAddress({
    handleModal,
    have_edit_gallery = true,
    shippingAddress,
    AllData,
    setValue,
    getArtistDetails,
}) {
    const [width, height] = useWindowSize();
    //rs : states
    const [name, setname] = useState("");
    const [city, setcity] = useState("");
    const [numberCode, setCode] = useState("");
    const [familly, setfamilly] = useState("");
    const [address, setaddress] = useState("");
    const [country, setcountry] = useState("");
    const [countryName, setcountryName] = useState("");
    const [postalCode, setpostalCode] = useState("");
    const [phoneNumber, setphoneNumber] = useState("");
    const [galleryStudioAppartmentEtc, setgalleryStudioAppartmentEtc] = useState("");
    const [validateFlag, setValidateFlag] = useState(false);
    const [CountryLast, setCountryLast] = useState("");
    const [ListPhoneNumber, setListPhoneNumber] = useState([{}]);
    const [Loading, setLoading] = useState(false);


    const [CnaSaveAg, setCnaSaveAg] = useState(true);

    useEffect(() => {
        setaddress(shippingAddress?.address);
        setname(shippingAddress?.name);
        setfamilly(shippingAddress?.familly);
        setpostalCode(shippingAddress?.postalCode);
        setcountry(shippingAddress?.country ? shippingAddress?.country : "");
        setgalleryStudioAppartmentEtc(shippingAddress?.galleryStudioAppartmentEtc);
        setcity(shippingAddress?.city);
        setListPhoneNumber(shippingAddress?.phoneNumber);
    }, [shippingAddress]);

    useEffect(() => {
        setphoneNumber(ListPhoneNumber ? ListPhoneNumber[0]?.phoneNumber : "");
        setCode(ListPhoneNumber ? ListPhoneNumber[0]?.countryUniqCode : "");
    }, [ListPhoneNumber]);

    //rs : validate and save address and pass to parent component
    const handleSaveAddress = () => {
        setValidateFlag(true);
        if (
            name == "" ||
            familly == "" ||
            address == "" ||
            country == -1 ||
            postalCode === "" ||
            (validateFlag === true)
        ) {
            // toast.error(`name : ${name} / familly: ${familly} / address: ${address} / country:${country} / postalCode:${postalCode} / galleryStudioAppartmentEtc: ${galleryStudioAppartmentEtc}`)
            setValidateFlag(false);
        } else {
            setValue([{
                name: name,
                familly: familly,
                address: address,
                Country: CountryLast,
                postalCode: postalCode,
                city: city,
                phoneNumber: [
                    { countryUniqCode: numberCode, phoneNumber: phoneNumber },
                ],
                galleryStudioAppartmentEtc: galleryStudioAppartmentEtc,
            }]);
            setValidateFlag(false);
            lastcallUpdate();
        }
    };

    const lastcallUpdate = () => {
        setLoading(true);
        const COllectionID = localStorage.getItem("collectionId");
        PostAuthUrl(EDIT_DEFULT_ADDRESS_CONTACT(COllectionID), {
            "id": shippingAddress?.id,
            name: name,
            familly: familly,
            address: address,
            Country: CountryLast ? CountryLast : countryList?.filter((item) => item?.name === country)?.map((item) => item?.name)[0],
            postalCode: postalCode,
            city: city,
            phoneNumber: [
                { countryUniqCode: numberCode, phoneNumber: phoneNumber },
            ],
            galleryStudioAppartmentEtc: galleryStudioAppartmentEtc,
            "contactId": AllData?.id
        }).then((res, err) => {
            if (res && res.status === 200) {
                if (res?.data?.isSuccess) {
                    toast.success(`Defult address updated successfully`);
                    getArtistDetails(AllData?.id);
                    handleModal();
                    setLoading(false);
                } else {
                    toast.error(res?.data?.message);
                    setLoading(false);
                }
            } else {
                toast.error("something went wrong !");
                setLoading(false);
            }
        });
    }

    useEffect(() => {
        setCountryLast(countryList?.filter((item) => item?.id === country)?.map((item) => item?.name)[0]);
    }, [country])

    return (
        <Grid
            style={{ position: "relative", top: "0px", width: '100%' }} item>
            <Grid item className={`${styles.w_100}`}>
                <Grid container className={`${styles.TwoForm}`}>
                    <Grid item className={`${styles.TwoInput1}`}>
                        <InputForm
                            type="text"
                            placeHolder="Enter first name"
                            label="First name"
                            name="firstName"
                            value={name}
                            onChange={() => setCnaSaveAg(false)}
                            setValue={setname}
                            schema={schema.name}
                            validateFlag={validateFlag}
                        />
                    </Grid>
                    <Grid item className={`${styles.TwoInput1}`}>
                        <InputForm
                            type="text"
                            placeHolder="Enter last name"
                            label="Last name"
                            name="lastName"
                            onChange={() => setCnaSaveAg(false)}
                            value={familly}
                            setValue={setfamilly}
                            schema={schema.familly}
                            validateFlag={validateFlag}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={`${styles.w_100}`}>
                <InputForm
                    type="text"
                    placeHolder="Enter address"
                    label="Address"
                    name="address"
                    onChange={() => setCnaSaveAg(false)}
                    value={address}
                    setValue={setaddress}
                    schema={schema.address}
                    validateFlag={validateFlag}
                />
            </Grid>

            {have_edit_gallery && (
                <Grid item xs={12} className={`${styles.w_100}`}>
                    <InputForm
                        type="text"
                        placeHolder="Enter Gallery, Studio, Appartment, etc."
                        label="Gallery, Studio, Appartment, etc."
                        onChange={() => setCnaSaveAg(false)}
                        name="galleryStudioAppartmentEtc"
                        value={galleryStudioAppartmentEtc}
                        setValue={setgalleryStudioAppartmentEtc}
                        schema={schema.galleryStudioAppartmentEtc}
                        validateFlag={validateFlag}
                    />
                </Grid>
            )}

            <Grid item className={`${styles.w_100}`}>
                <Grid container className={`${styles.TwoForm}`}>
                    <Grid item className={`${styles.TwoInput}`}>
                        <CustomSelect
                            label="Country / Region"
                            have_img={true}
                            OptionList={countryList}
                            bgColor="white"
                            setValue={setcountry}
                            Value={country}
                            onChange={() => setCnaSaveAg(false)}
                            Data={countryList}
                            validateFlag={validateFlag}
                            setSelectName={setcountryName}
                            SelectName={countryList?.filter((item) => item?.name === country)?.map((item) => item?.name)[0]}
                        />
                    </Grid>
                    <Grid item className={`${styles.TwoInput}`}>
                        <InputForm
                            type="number"
                            placeHolder="Enter postal code"
                            label="Postal code"
                            name="postalCode"
                            value={postalCode}
                            setValue={setpostalCode}
                            onChange={() => setCnaSaveAg(false)}
                            schema={schema.postalCode}
                            validateFlag={validateFlag}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item className={`${styles.w_100}`}>
                <InputForm
                    type="text"
                    placeHolder="Enter a city name"
                    label="City"
                    name="city"
                    value={city}
                    onChange={() => setCnaSaveAg(false)}
                    setValue={setcity}
                    schema={schema.city}
                    validateFlag={validateFlag}
                />
            </Grid>

            <Grid
                item
                className={ArtistStyle.mb_mobile}
                style={{ height: width > 960 ? "150px" : "50px" }}
            >
                <PhoneNumber
                    Label="Phone number"
                    PlaceHolder="Enter your number"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={() => setCnaSaveAg(false)}
                    setValue={setphoneNumber}
                    setCode={setCode}
                    SelectedFlag={numberCode ? numberCode : ListPhoneNumber && ListPhoneNumber[0]?.countryUniqCode}
                />
                <Button
                    style={{ width: "100%" }}
                    variant="contained"
                    disabled={CnaSaveAg}
                    color="primary"
                    className={ArtistStyle.Button_Add_Artist2}
                    onClick={() => !Loading && handleSaveAddress()}
                >
                    {Loading && <CircularProgress color="white" size={20} />}
                    {!Loading && "Save Changes"}
                </Button>
            </Grid>

        </Grid>
    );
}
