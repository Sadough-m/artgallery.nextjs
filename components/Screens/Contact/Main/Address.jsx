import React, { useState, useEffect } from "react";
import Joi from "joi";
import { toast } from "react-toastify";

// mrx : material ui
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { Hidden, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import Style from "../../../../styles/Contacts.module.css";

// mrx : components
import ArtistStyle from "../../../../styles/artist.module.css";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import InputForm from "../../../Forms/InputForm";
import styles from "../../../../styles/Home.module.css";
import PhoneNumber from "../../../Forms/PhoneNumber";
import CustomSelect from "../../../Forms/CustomSelect";
import iran from "../../../../public/images/iran.png";
import usa from "../../../../public/images/united states.png";
import uk from "../../../../public/images/united kingdom.png";
import poland from "../../../../public/images/poland.png";
import irland from "../../../../public/images/ireland.png";
import arrowBack from "../../../../public/images/icons/Arrow left -.svg";
import Image from "next/image";

const theme = createTheme({
  props: {
    MuiButton: {
      disableElevation: true,
    },
  },
  palette: {
    primary: {
      main: "#3772FF",
    },
    secondary: {
      main: "#242328",
    },
    error: {
      main: "#A6E9DE",
    },
  },
  typography: {
    button: {
      fontFamily: "Poppins",
      textTransform: "none",
    },
  },
});

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

export default function Address({
  have_edit_gallery = true,
  setValue,
  setCheckRequired,
  CheckRequired,
}) {
  //rs : states
  const [name, setname] = useState("");
  const [city, setcity] = useState("");
  const [numberCode, setCode] = useState("");
  const [familly, setfamilly] = useState("");
  const [address, setaddress] = useState("");
  const [country, setcountry] = useState(-1);
  const [postalCode, setpostalCode] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [galleryStudioAppartmentEtc, setgalleryStudioAppartmentEtc] = useState("");
  const [CountryLast, setCountryLast] = useState("");

  //rs : validate and save address and pass to parent component

  useEffect(() => {
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
  }, [name, familly, address, CountryLast, postalCode, city, numberCode, phoneNumber, galleryStudioAppartmentEtc])

  useEffect(() => {
    setCountryLast(countryList?.filter((item) => item?.id === country)?.map((item) => item?.name)[0]);
  }, [country])

  return (
    <Grid item className={Style.wrapper_main}>
      <Grid item className={Style.title_main}>
        Address
      </Grid>

      <Grid item className={`${styles.w_100}`}>
        <Grid container className={`${styles.TwoForm}`}>
          <Grid item className={`${styles.TwoInput1}`}>
            <InputForm
              type="text"
              placeHolder="Enter first name"
              label="First name"
              name="firstName"
              value={name}
              setValue={setname}
              schema={schema.name}
              validateFlag={CheckRequired}
            />
          </Grid>
          <Grid item className={`${styles.TwoInput1}`}>
            <InputForm
              type="text"
              placeHolder="Enter last name"
              label="Last name"
              name="lastName"
              value={familly}
              setValue={setfamilly}
              schema={schema.familly}
              validateFlag={CheckRequired}
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
          value={address}
          setValue={setaddress}
          schema={schema.address}
          validateFlag={CheckRequired}
        />
      </Grid>

      {have_edit_gallery && (
        <Grid item xs={12} className={`${styles.w_100}`}>
          <InputForm
            type="text"
            placeHolder="Enter Gallery, Studio, Appartment, etc."
            label="Gallery, Studio, Appartment, etc."
            name="galleryStudioAppartmentEtc"
            value={galleryStudioAppartmentEtc}
            setValue={setgalleryStudioAppartmentEtc}
            schema={schema.galleryStudioAppartmentEtc}
            validateFlag={CheckRequired}
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
              Data={countryList}
              validateFlag={CheckRequired}
              setSelectName={setcountry}
              SelectName={CountryLast}
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
              schema={schema.postalCode}
              validateFlag={CheckRequired}
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
          setValue={setcity}
          schema={schema.city}
          validateFlag={CheckRequired}
        />
      </Grid>

      <Grid item className={ArtistStyle.mb_mobile}>
        <PhoneNumber
          Label="Phone number"
          PlaceHolder="Enter your number"
          name="phoneNumber"
          value={phoneNumber}
          setValue={setphoneNumber}
          setCode={setCode}
          SelectedFlag={numberCode}
        />
      </Grid>

    </Grid>
  );
}
