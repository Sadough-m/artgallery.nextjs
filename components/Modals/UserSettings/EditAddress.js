import React, { useState, useEffect } from "react";
import Joi from "joi";
import { useLocalStorage } from "../../../Hooks/useLocalStorage";
import { toast } from "react-toastify";

// mrx : material ui
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { Hidden, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";

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
  galleryStudioAppartmentEtc: Joi.string().required().messages({
    "string.empty": `Field is required`,
  }),
};

export default function EditAddress({
  openModal,
  handleModal,
  have_edit_gallery = true,
  saveShipping,
  setAddressData,
  shippingAddress,
  setValue,
}) {
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
  const [ListPhoneNumber, setListPhoneNumber] = useState([{}]);
  const [CountryLast, setCountryLast] = useState("");
  const [AddShippingAddress, setAddShippingAddress] = useState(false);

  useEffect(() => {
    setaddress(shippingAddress?.address);
    setname(shippingAddress?.name);
    setfamilly(shippingAddress?.familly);
    setpostalCode(shippingAddress?.postalCode);
    setcountry(shippingAddress?.country ? shippingAddress?.country : "");
    setgalleryStudioAppartmentEtc(shippingAddress?.galleryStudioAppartmentEtc);
    setcity(shippingAddress?.city);
    setListPhoneNumber(shippingAddress?.phoneNumber);
    setcountry(countryList?.filter((item) => item?.name === shippingAddress?.country)?.map((item) => item?.id)[0])
  }, [shippingAddress]);

  useEffect(() => {
    setphoneNumber(ListPhoneNumber ? ListPhoneNumber[0]?.phoneNumber : "");
    setCode(ListPhoneNumber ? ListPhoneNumber[0]?.countryUniqCode : "");
  }, [ListPhoneNumber]);

  useEffect(() => {
    setCountryLast(countryList?.filter((item) => item?.id === country)?.map((item) => item?.name)[0]);
  }, [country])

  //rs : validate and save address and pass to parent component
  const handleSaveAddress = () => {
    setAddShippingAddress(true);
    setValidateFlag(true);
    if (
      name == "" ||
      familly == "" ||
      address == "" ||
      country == "" ||
      postalCode === "" ||
      (galleryStudioAppartmentEtc === "" && validateFlag === true)
    ) {
      // toast.error(`name : ${name} / familly: ${familly} / address: ${address} / country:${country} / postalCode:${postalCode} / galleryStudioAppartmentEtc: ${galleryStudioAppartmentEtc}`)
      setValidateFlag(false);
    } else {
      setValue({
        name: name,
        familly: familly,
        address: address,
        country: CountryLast,
        postalCode: postalCode,
        city: city,
        phoneNumber: [
          { countryUniqCode: numberCode, phoneNumber: phoneNumber },
        ],
        galleryStudioAppartmentEtc: galleryStudioAppartmentEtc,
      });
      setValidateFlag(false);
      handleModal();
    }
  };

  useEffect(() => {
    if (AddShippingAddress === true) {
      saveShipping();
      setAddShippingAddress(false);
    }
  }, [shippingAddress])

  return (
    <ThemeProvider theme={theme}>
      <Grid item>
        <Modal
          className={ArtistStyle.Modal}
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openModal}
          onClose={handleModal}
          closeAfterTransition
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModal}>
            <Grid item className={ArtistStyle.P_Bg_Modal1}>
              <Container>
                <Grid
                  item
                  className={`${ArtistStyle.Bg_Modal13} ${ArtistStyle.mtb_10}`}
                >
                  <Grid item className={ArtistStyle.wrapperModal}>
                    <Hidden mdUp>
                      <Grid
                        container
                        spacing={1}
                        alignItems="center"
                        className={ArtistStyle.mBottom}
                      >
                        <Grid item>
                          <IconButton
                            size="small"
                            onClick={() => handleModal()}
                          >
                            <Image src={arrowBack} />
                          </IconButton>
                        </Grid>
                        <Grid item className={ArtistStyle.font_editAddress}>
                          Edit address
                        </Grid>
                      </Grid>
                      <Grid item>
                        <span className={ArtistStyle.lineModal}></span>
                      </Grid>
                    </Hidden>
                    <Hidden smDown>
                      <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Grid item className={ArtistStyle.Text_titleModal}>
                          Edit address
                        </Grid>

                        <Grid item>
                          <IconButton
                            className={ArtistStyle.IconClose}
                            onClick={() => handleModal()}
                          >
                            <CloseIcon color="secondary" fontSize="small" />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Hidden>
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
                            validateFlag={validateFlag}
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
                          name="galleryStudioAppartmentEtc"
                          value={galleryStudioAppartmentEtc}
                          setValue={setgalleryStudioAppartmentEtc}
                          schema={Joi.optional()}
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
                            Data={countryList}
                            validateFlag={validateFlag}
                            setSelectName={setcountryName}
                            SelectName={countryList?.filter((item) => item?.id === country)?.map((item) => item?.name)[0]}
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
                        setValue={setcity}
                        schema={schema.city}
                        validateFlag={validateFlag}
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
                    <Grid item className={ArtistStyle.buttonEditModal}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={ArtistStyle.Button_Add_Artist2}
                        onClick={() => handleSaveAddress()}
                      >
                        Save Changes
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Container>
            </Grid>
          </Fade>
        </Modal>
      </Grid>
    </ThemeProvider>
  );
}
