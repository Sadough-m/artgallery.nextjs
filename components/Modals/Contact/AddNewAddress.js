import React, { useState, useEffect } from "react";
import Joi from "joi";
import { toast } from "react-toastify";

// mrx : material ui
import { Grid, Modal, Fade } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { Hidden, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import { CircularProgress } from "@material-ui/core";

// mrx : api links ↓
import {
  ADD_NEW_ADDRESS
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
import useWindowSize from "../../../Hooks/useWindowSize";

// gm : files ↓
import closeIcon from "../../../public/images/icons/Close12.svg";

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

export default function AddNewAddress({
  open,
  handleModal,
  AllData,
  getArtistDetails
}) {
  const [width, height] = useWindowSize();

  //rs : states
  const [name, setname] = useState("");
  const [city, setcity] = useState("");
  const [numberCode, setCode] = useState("");
  const [familly, setfamilly] = useState("");
  const [address, setaddress] = useState("");
  const [country, setcountry] = useState(0);
  const [postalCode, setpostalCode] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [galleryStudioAppartmentEtc, setgalleryStudioAppartmentEtc] = useState("");
  const [validateFlag, setValidateFlag] = useState(false);
  const [CountryLast, setCountryLast] = useState("");
  const [CnaSaveAg, setCnaSaveAg] = useState(true);
  const [Loading, setLoading] = useState(false);

  //rs : validate and save address and pass to parent component
  const handleSaveAddress = () => {
    setValidateFlag(true);
    if (
      name === "" ||
      familly === "" ||
      address === "" ||
      city === "" ||
      country === 0 ||
      postalCode === ""
    ) {
      setValidateFlag(true);
      toast.error("please fill the required values");
    } else {
      setValidateFlag(false);
      lastcallUpdate();
    }
  };

  // useEffect(() => {
  //   if (
  //     name !== "" &&
  //     familly !== "" &&
  //     address !== "" &&
  //     country !== 0 &&
  //     city !== "" &&
  //     postalCode !== ""
  //   ) {
  //     setCnaSaveAg(false);
  //   } else {
  //     setCnaSaveAg(true);
  //   }
  // }, [name, familly, postalCode, country, address])

  const lastcallUpdate = () => {
    setLoading(true);
    const COllectionID = localStorage.getItem("collectionId");
    PostAuthUrl(ADD_NEW_ADDRESS(COllectionID), {
      contactId: AllData?.id,
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
    }).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          setLoading(false);
          toast.success(`Address Added successfully`);
          getArtistDetails(AllData?.id);
          handleModal();
          hanldeClearInput();
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

  const hanldeClearInput = () => {
    setname("");
    setcity("");
    setCode("");
    setfamilly("");
    setaddress("");
    setcountry(-1);
    setpostalCode("");
    setphoneNumber("");
    setgalleryStudioAppartmentEtc("");
    setCnaSaveAg(true);
    setValidateFlag(false);
  }

  useEffect(() => {
    setCountryLast(countryList?.filter((item) => item?.id === country)?.map((item) => item?.name)[0]);
  }, [country])

  return (
    <Grid item>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        // onClose={handleModal}
        closeAfterTransition
        className={styles.newModal}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Grid item className={styles.wrapper_modal592_mbileScroll}>
            {/* title */}
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item className={styles.TitleModal}>
                Add new address
              </Grid>
              <Grid item>
                <IconButton
                  size="small"
                  className={styles.border_btn}
                  onClick={() => { hanldeClearInput(); handleModal() }}
                >
                  <img src={closeIcon.src} />
                </IconButton>
              </Grid>
            </Grid>

            {/* body */}
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

              <Grid item xs={12} className={`${styles.w_100}`}>
                <InputForm
                  type="text"
                  placeHolder="Enter Gallery, Studio, Appartment, etc."
                  label="Gallery, Studio, Appartment, etc."

                  name="galleryStudioAppartmentEtc"
                  value={galleryStudioAppartmentEtc}
                  setValue={setgalleryStudioAppartmentEtc}
                  schema={schema.galleryStudioAppartmentEtc}
                  validateFlag={validateFlag}
                />
              </Grid>

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
                      schema={schema.country}
                      setSelectName={setcountry}
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

              <Grid
                item
                className={styles.mb_mobile}
                style={{ height: width > 960 ? "150px" : "50px" }}
              >
                <PhoneNumber
                  Label="Phone number"
                  PlaceHolder="Enter your number"
                  name="phoneNumber"
                  value={phoneNumber}

                  setValue={setphoneNumber}
                  setCode={setCode}
                  SelectedFlag={numberCode}
                // SelectedFlag={numberCode ? numberCode : ListPhoneNumber && ListPhoneNumber[0]?.countryUniqCode}
                />
                <Button
                  variant="contained"
                  // disabled={CnaSaveAg}
                  color="primary"
                  className={styles.Button_Add_Artist2}
                  onClick={() => !Loading && handleSaveAddress()}
                >
                  <span
                    style={{ marginTop: Loading ? "8px" : "0px" }}
                    className={`${styles.text__trs__none} ${styles.px__btn} `}
                  >
                    {Loading && <CircularProgress color="white" size={20} />}
                    {!Loading && "Save Changes"}
                  </span>
                </Button>
              </Grid>

            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </Grid>
  );
}
