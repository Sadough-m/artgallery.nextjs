import React, { useState, useEffect } from "react";
import Joi from "joi";

// Matrial
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import {
  Container,
  IconButton,
  Button,
  Grid,
  Fade,
  Modal,
  Hidden,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

// mrx : Styles ↓
import styles from "../../../styles/Home.module.css";
import ArtWorkFlowStyle from "../../../styles/artworkflow.module.css";

// rmx : files  ↓
import showIcon from "../../../public/images/icons/Showicon.svg";
import UnshowIcon from "../../../public/images/icons/UnshowIcon.svg";
import Image from "next/image";
import arrowLeft from "../../../public/images/icons/Arrow left -.svg";


// mrx : setCookies with this
import Cookies from "js-cookie";

// mrx : api links ↓
import {
  GET_TYPES_DISCOVER_MODAL,
  GET_DISCOVER_MODAL,
  EDIT_DISCOVER_MODAL
} from "../../../pages/api/index";

// mrx : api ↓
import {
  PostUrl,
  PostAuthUrl,
  GetUrl,
  GetAuthUrl,
} from "../../../pages/api/config";

// Component
import Check_Box from "../../Forms/CheckBox";
import CustomSelect from "../../Forms/CustomSelect";
import InputForm from "../../Forms/InputForm";
import CustomCheckBox from "../../Forms/CustomCheckBox";
import useWindowSize from "../../../Hooks/useWindowSize";
import { toast } from "react-toastify";

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
    tertiary: {
      main: "#F7F8FA",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none",
      },
    },
  },
  typography: {
    fontFamily: "Poppins",
    color: "#242328",
  },
  shape: {
    borderRadius: 8,
  },
});

const OptionList = [
  { id: 1, name: "View all" },
  { id: 2, name: "HIdden all" },
  { id: 3, name: "For owners" },
];

export default function TransferPublishDiscover({
  openModal,
  handleModal,
  ArtWorkID
}) {
  const CollectionID = typeof window !== "undefined" ? localStorage.getItem("collectionId") || '' : '';

  // gd : states  ↓
  const [DiscoverToggle, setDiscoverToggle] = useState(false);
  const [AcceptInquiries, setAcceptInquiries] = useState(false);
  const [NoPricing, setNoPricing] = useState(false);
  const [Pricing, setPricing] = useState(false);
  const [PickUpAvailabel, setPickUpAvailabel] = useState(false);
  const [ShippingAvailable, setShippingAvailable] = useState(false);
  const [CalculateShipping, setCalculateShipping] = useState(false);
  const [SelectInputData, setSelectInputData] = useState([]);
  const [CheckRequired, setCheckRequired] = useState(false);

  // ------ Amount States Start -------------------------------------
  const [Amount, setAmount] = useState("");
  const [AmountUnitID, setAmountUnitID] = useState("");
  // ------ End -----------------------------------------------------

  // ------ Shipping price States Start -----------------------------
  const [ShippingPrice, setShippingPrice] = useState("");
  const [ShippingPriceUnitID, setShippingPriceUnitID] = useState("");
  // ------ End -----------------------------------------------------

  const [width, height] = useWindowSize();

  // mrx : GET modal info Start --------------------------------------------------------------------------------------------
  const GET_TYPES_DISCOVER_MODAL_INFO = () => {
    GetAuthUrl(GET_TYPES_DISCOVER_MODAL).then(
      (res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            setSelectInputData(res.data.data);
          } else {
          }
        } else {
          toast.error("something went wrong !");
        }
      }
    );
  };

  const GET_DISCOVER_MODAL_INFO = () => {
    if (ArtWorkID) {
      GetAuthUrl(GET_DISCOVER_MODAL(CollectionID, ArtWorkID)).then(
        (res, err) => {
          if (res && res.status === 200) {
            if (res?.data?.isSuccess) {
              const Data = res.data.data;
              setPricing(Data?.showDiscoverPrice);
              setDiscoverToggle(Data?.publishStatus === 1 ? true : false);
              setAmount(Data?.discoverPrice === -1 ? 0 : Data?.discoverPrice);
              setAmountUnitID(Data?.discoverPriceUnit);
              setAcceptInquiries(Data?.acceptInquiries);
              setPickUpAvailabel(Data?.isPickUpAvailable);
              setShippingAvailable(Data?.isShippingAvailable);
              setCalculateShipping(Data?.calculateShipping);
              setShippingPrice(Data?.shippingPrice === -1 ? 0 : Data?.shippingPrice);
              setShippingPriceUnitID(Data?.shippingPriceUnit);
            } else {
            }
          } else {
            toast.error("something went wrong !");
          }
        }
      );
    }
  };

  const EDIT_DISCOVER_MODAL_INFO = () => {
    if (
      !NoPricing && Pricing && Amount === "" ||
      !NoPricing && Pricing && AmountUnitID === ""
    ) {
      toast.error("Please fill the required values");
    } else if (
      !CalculateShipping && ShippingAvailable && ShippingPrice === "" ||
      !CalculateShipping && ShippingAvailable && ShippingPriceUnitID === ""
    ) {
      toast.error("Please fill the required values");
    } else {
      PostAuthUrl(EDIT_DISCOVER_MODAL(CollectionID), {
        "edditionId": ArtWorkID,
        "acceptInquiries": AcceptInquiries,
        "showDiscoverPrice": Pricing,
        "discoverPrice": Amount,
        "discoverPriceUnit": AmountUnitID,
        "isPickUpAvailable": PickUpAvailabel,
        "isShippingAvailable": ShippingAvailable,
        "calculateShipping": CalculateShipping,
        "shippingPrice": ShippingPrice,
        "shippingPriceUnit": ShippingPriceUnitID,
        "publishStatus": DiscoverToggle ? 1 : 0
      }).then(
        (res, err) => {
          if (res && res.status === 200) {
            if (res?.data?.isSuccess) {
              toast.success("Artiverse updated successfully");
              handleModal()
            }
          } else {
            toast.error("something went wrong !");
          }
        }
      );
    }
  };

  // End ---------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    GET_TYPES_DISCOVER_MODAL_INFO();
    GET_DISCOVER_MODAL_INFO();
  }, [ArtWorkID])

  useEffect(() => {
    if (Pricing === true) {
      setNoPricing(false);
    }
  }, [Pricing])

  useEffect(() => {
    if (NoPricing === true) {
      setPricing(false);
    }
  }, [NoPricing])

  useEffect(() => {
    if (CalculateShipping === true) {
      setShippingAvailable(false);
    }
  }, [CalculateShipping])

  useEffect(() => {
    if (ShippingAvailable === true) {
      setCalculateShipping(false);
    }
  }, [ShippingAvailable])

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Grid item>
          <Modal
            className={width > 960 ? ArtWorkFlowStyle.Modal : ""}
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
              <Grid
                item
                className={
                  width > 960
                    ? ArtWorkFlowStyle.P_Bg_ModalMedia
                    : ArtWorkFlowStyle.Bg_ModalWhite56
                }
              >
                <Grid item className={ArtWorkFlowStyle.Bg_ModalWhite}>
                  <Grid item className={ArtWorkFlowStyle.wrapperModal}>
                    <Grid item>
                      <Grid container direction="column" spacing={3}>
                        <Grid item>
                          <Grid item>
                            <Grid
                              container
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Grid
                                item
                                className={ArtWorkFlowStyle.Text_AddArtist3}
                              >
                                <Hidden mdUp>
                                  <IconButton
                                    onClick={handleModal}
                                    size="small"
                                    style={{ marginRight: "8px" }}
                                  >
                                    <Image src={arrowLeft} />
                                  </IconButton>
                                </Hidden>
                                Discover
                              </Grid>
                              <Hidden smDown>
                                <Grid item>
                                  <IconButton
                                    className={ArtWorkFlowStyle.IconClose}
                                    onClick={() => handleModal()}
                                  >
                                    <CloseIcon
                                      color="secondary"
                                      fontSize="small"
                                    />
                                  </IconButton>
                                </Grid>
                              </Hidden>
                              <Hidden mdUp>
                                <span
                                  className={ArtWorkFlowStyle.line100_3}
                                ></span>
                              </Hidden>
                            </Grid>
                          </Grid>
                          <Grid item className={ArtWorkFlowStyle.p_visible}>
                            <Grid container justifyContent="space-between">
                              <Grid item>
                                <Grid container spacing={1} alignItems="center">
                                  <Grid
                                    item
                                    className={ArtWorkFlowStyle.P_elips}
                                  >
                                    <Image src={DiscoverToggle ? showIcon : UnshowIcon} />
                                  </Grid>
                                  <Grid item className={styles.fs_14}>
                                    Discover
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid
                                item

                              >
                                <Button onClick={() => setDiscoverToggle(!DiscoverToggle)} className={styles.visibleBtn}>
                                  {DiscoverToggle ? "Visible" : "Unvisible"}
                                </Button>

                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            <span className={ArtWorkFlowStyle.line100}></span>
                          </Grid>

                          <Grid
                            item
                            xs={12}
                            className={`${ArtWorkFlowStyle.some_p_r} ${ArtWorkFlowStyle.mt_10}`}
                          >
                            <CustomCheckBox
                              label="Accept inquiries"
                              setChecked={setAcceptInquiries}
                              checked={AcceptInquiries}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <span className={ArtWorkFlowStyle.line100}></span>
                          </Grid>

                          <Grid
                            item
                            xs={12}
                            className={`${ArtWorkFlowStyle.some_p_r} ${ArtWorkFlowStyle.mt_10}`}
                          >
                            <CustomCheckBox
                              label="No pricing"
                              setChecked={setNoPricing}
                              checked={NoPricing}
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <span className={ArtWorkFlowStyle.line100}></span>
                          </Grid>

                          <Grid
                            item
                            xs={12}
                            className={`${ArtWorkFlowStyle.some_p_r} ${ArtWorkFlowStyle.mt_10}`}
                          >
                            <CustomCheckBox
                              label="Set pricing"
                              setChecked={setPricing}
                              checked={Pricing}
                            />
                          </Grid>
                          {
                            !NoPricing && Pricing && (
                              <Grid item xs={12}>
                                <Grid
                                  container
                                  justifyContent="space-between"
                                  alignItems="center"
                                >
                                  <Grid item className={ArtWorkFlowStyle.form55}>
                                    <InputForm
                                      setCheckRequired={setCheckRequired}
                                      validateFlag={CheckRequired}
                                      value={Amount}
                                      setValue={setAmount}
                                      type="number"
                                      placeHolder="Enter a number"
                                      label="Amount"
                                      schema={Joi.string()
                                        .empty({ tlds: { allow: false } })
                                        .messages({
                                          "string.empty": `Amount is required`,
                                          "any.required": `Amount is required`,
                                        })
                                      }
                                    />
                                  </Grid>
                                  <Grid item className={ArtWorkFlowStyle.form33}>
                                    <CustomSelect
                                      schema={Joi.string()
                                        .empty({ tlds: { allow: false } })
                                        .messages({
                                          "string.empty": `Unit is required`,
                                          "any.required": `Unit is required`,
                                        })
                                      }
                                      setCheckRequired={setCheckRequired}
                                      validateFlag={CheckRequired}
                                      Data={SelectInputData?.priceUints}
                                      SelectName={SelectInputData?.priceUints?.filter((item) => item?.id === AmountUnitID)?.map((item) => item?.name)}
                                      setSelectName={setAmountUnitID}
                                      label="Unit"
                                      value={AmountUnitID}
                                      setValue={setAmountUnitID}
                                      placeHolder="Choose One"
                                      OptionList={OptionList}
                                      bgColor="#F7F8FA"
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                            )
                          }
                          <Grid item className={ArtWorkFlowStyle.textGray}>
                            If the check box is not selected,{" "}
                            <span className={ArtWorkFlowStyle.colorDark}>
                              Contact for pricing
                            </span>{" "}
                            witll be shown
                          </Grid>
                          <Grid item xs={12}>
                            <span className={ArtWorkFlowStyle.line100}></span>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            className={ArtWorkFlowStyle.someMargin}
                          >
                            <CustomCheckBox
                              label="Pick up availabel"
                              setChecked={setPickUpAvailabel}
                              checked={PickUpAvailabel}
                            />
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            className={ArtWorkFlowStyle.someMargin}
                          >
                            <CustomCheckBox
                              label="Shipping available"
                              setChecked={setShippingAvailable}
                              checked={ShippingAvailable}
                            />
                          </Grid>
                          {
                            !CalculateShipping && ShippingAvailable && (
                              <Grid item xs={12}>
                                <Grid
                                  container
                                  justifyContent="space-between"
                                  alignItems="center"
                                >
                                  <Grid item className={ArtWorkFlowStyle.form55}>
                                    <InputForm
                                      setCheckRequired={setCheckRequired}
                                      validateFlag={CheckRequired}
                                      type="number"
                                      value={ShippingPrice}
                                      setValue={setShippingPrice}
                                      placeHolder="Enter a number"
                                      label="Shipping price"
                                      schema={Joi.string()
                                        .empty({ tlds: { allow: false } })
                                        .messages({
                                          "string.empty": `Shipping price is required`,
                                          "any.required": `Shipping price is required`,
                                        })
                                      }
                                    />
                                  </Grid>
                                  <Grid item className={ArtWorkFlowStyle.form33}>
                                    <CustomSelect
                                      setCheckRequired={setCheckRequired}
                                      validateFlag={CheckRequired}
                                      Data={SelectInputData?.priceUints}
                                      value={ShippingPriceUnitID}
                                      setValue={setShippingPriceUnitID}
                                      SelectName={SelectInputData?.priceUints?.filter((item) => item?.id === ShippingPriceUnitID)?.map((item) => item?.name)}
                                      setSelectName={setShippingPriceUnitID}
                                      label="Unit"
                                      placeHolder="Choose One"
                                      OptionList={OptionList}
                                      bgColor="#F7F8FA"
                                      schema={Joi.string()
                                        .empty({ tlds: { allow: false } })
                                        .messages({
                                          "string.empty": `Unit is required`,
                                          "any.required": `Unit is required`,
                                        })
                                      }
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                            )
                          }
                          <Grid
                            item
                            xs={12}
                            className={`${ArtWorkFlowStyle.some_p_r} ${ArtWorkFlowStyle.mt_20}`}
                          >
                            <CustomCheckBox
                              label="Calculate shipping"
                              setChecked={setCalculateShipping}
                              checked={CalculateShipping}
                            />
                          </Grid>
                        </Grid>
                        <Grid item className={ArtWorkFlowStyle.posRel}>
                          <span className={ArtWorkFlowStyle.line100_bot}></span>
                          <Button
                            onClick={() => EDIT_DISCOVER_MODAL_INFO()}
                            variant="contained"
                            color="primary"
                            fullWidth
                            className={`${ArtWorkFlowStyle.Button_Add_Artist1}`}
                          >
                            Transfer
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Fade>
          </Modal>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
