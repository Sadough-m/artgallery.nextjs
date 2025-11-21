import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-scroll";
import Image from "next/image";
import LinkPages from "next/link";
import Joi from "joi";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";

// mrx : material ui ↓
import { Hidden, Button, Grid, Container, IconButton } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import Cookies from "js-cookie";

// mrx : components ↓
import Education from "../../../components/SignUp/Main/Education";
import ProfessionalAppointments from "../../../components/SignUp/Main/ProfessionalAppointments";
import GrantsAndAwards from "../../../components/SignUp/Main/GrantsAndAwards";
import Commissions from "../../../components/SignUp/Main/Commissions";
import Collections from "../../../components/SignUp/Main/Collections";
import Bio from "../../../components/SignUp/Main/Bio";
import Publications from "../../../components/SignUp/Main/Publications";
import Representation from "../../../components/SignUp/Main/Representation";
import ProfessionalService from "../../../components/SignUp/Main/ProfessionalService";
import ProfessionalOrganizations from "../../../components/SignUp/Main/ProfessionalOrganizations";
import MobileMenu from "../../../components/common/mobilemenu";
import SelectedExhibitions from "../../../components/SignUp/Main/SelectedExhibitions";
import Bilbiography from "../../../components/SignUp/Main/Bilbiography";
import Steps from "../../../components/Screens/Landing/Steps";
import CvMenu from "../../../components/common/CvMenu";
import CvMobile from "../../../components/common/CvMobile";
import Location from "../../../components/Forms/Location";

// mrx : styles ↓
import styles from "../../../styles/Home.module.css";
import signUpStyle from "../../../styles/signUp.module.css";

// mrx : files ↓
import ArrowLeft from "../../../public/images/icons/Arrow left -.svg";
import NextButton from "../../../components/Screens/Landing/NextButton";

// mrx : api links ↓
import {
  GET_SELECT_INPUTS_STEP_2,
  GET_COUNTRY_SELECT,
  CV_BUILDER_SAVE_ALL_DATA,
  GET_LANDING_CV,
} from "../../api/index";

// mrx : api ↓
import { PostUrl, PostAuthUrl, GetUrl, GetAuthUrl } from "../../api/config";

// mrx : context ↓
import { Context } from "../../../context/index";

// mrx : SignUp step 2 page ↓
export default function SignUpStep2() {
  const router = useRouter();

  // mrx : states ↓
  const [SelectInputData, setSelectInputData] = useState([]);
  const [CountrySelectInputData, setCountrySelectInputData] = useState([]);
  const [Wrong, setWrong] = useState(false);
  const [ClickedSave, setClickedSave] = useState(false);

  // last validate for next button : state
  const [EndCallEducation, setEndCallEducation] = useState("false");
  const [EndCallExhibitions, setEndCallExhibitions] = useState("false");
  const [EndCallCollections, setEndCallCollections] = useState("false");
  const [EndCallBilbiography, setEndCallBilbiography] = useState("false");
  const [EndCallprofessionalAppointments, setEndCallprofessionalAppointments] =
    useState("false");
  const [EndCallgrantsAndAwards, setEndCallgrantsAndAwards] = useState("false");
  const [EndCallcommissions, setEndCallcommissions] = useState("false");
  const [EndCallpublications, setEndCallpublications] = useState("false");
  const [EndCallrepresentation, setEndCallrepresentation] = useState("false");
  const [EndCallprofessionalService, setEndCallprofessionalService] =
    useState("false");
  const [
    EndCallPropessionalOrganizations,
    setEndCallPropessionalOrganizations,
  ] = useState("false");

  // mrx : context
  const { ISAllformsOK, setISAllformsOK } = useContext(Context);

  // get all data from local storage ( start ) ------------------------------
  const EDUCATION_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("Step2-Eduction") || "[]"
      : "[]"
  );

  const COLLECTIONS_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("Step2-Collections") || "[]"
      : "[]"
  );

  const REPRESENTATION_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("Step2-Representation") || "[]"
      : "[]"
  );

  const BILBIGRAPHY_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("Step2-Bilbiography") || "[]"
      : "[]"
  );

  const PROGESSIONAL_SERVICE_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("Step2-Professional-Service") || "[]"
      : "[]"
  );

  const GRANTS_AND_AWARDS_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("Step2-Grants-And-Awards") || "[]"
      : "[]"
  );

  const PROGESSIONAL_ORGANIZATIONS_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("Step2-Professional-Organizations") || "[]"
      : "[]"
  );

  const PROFESSIONAL_APPOINTMENTS_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("Step2-ProfessionalAppointments") || "[]"
      : "[]"
  );

  const PUBLICATIONS_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("Step2-Publications") || "[]"
      : "[]"
  );

  const EXHIBITIONS_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("Step2-Exhibitions") || "[]"
      : "[]"
  );

  const COMMISSIONS_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("Step2-Commissions") || "[]"
      : "[]"
  );

  const BIO_DATA =
    typeof window !== "undefined" ? localStorage.getItem("Step2-Bio") : "";

  // get all data from local storage ( end ) ------------------------------

  // mrx : get select inputs data
  const handleGetSelectInputsData = () => {
    GetAuthUrl(GET_SELECT_INPUTS_STEP_2).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          setSelectInputData(res?.data?.data);
        } else {
          toast.warning(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  };

  // mrx : get country select inputs data
  const handleGetCountrySelectInputsData = () => {
    GetAuthUrl(GET_COUNTRY_SELECT).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          setCountrySelectInputData(res?.data?.data);
        } else {
          toast.warning(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  };

  // get select input and location input
  useEffect(() => {
    handleGetSelectInputsData();
    handleGetCountrySelectInputsData();
  }, []);

  useEffect(() => {
    if (ISAllformsOK === false) {
      toast.warning("Please fill the required values");
    }
  }, [ISAllformsOK]);

  // mrx : Start validating from step 2 () ----------------------------------------------------------------
  // education
  useEffect(() => {
    if (EndCallEducation === "next") {
      setEndCallExhibitions("true");
    } else {
      return;
    }
  }, [EndCallEducation]);

  // exabishions
  useEffect(() => {
    if (EndCallExhibitions === "next") {
      setEndCallCollections("true");
    } else {
      return;
    }
  }, [EndCallExhibitions]);

  // Collections
  useEffect(() => {
    if (EndCallCollections === "next") {
      setEndCallBilbiography("true");
    } else {
      return;
    }
  }, [EndCallCollections]);

  // Bilbiography
  useEffect(() => {
    if (EndCallBilbiography === "next") {
      setEndCallprofessionalAppointments("true");
    } else {
      return;
    }
  }, [EndCallBilbiography]);

  // Professional Appointments
  useEffect(() => {
    if (EndCallprofessionalAppointments === "next") {
      setEndCallgrantsAndAwards("true");
    } else {
      return;
    }
  }, [EndCallprofessionalAppointments]);

  // Grants and Awards
  useEffect(() => {
    if (EndCallgrantsAndAwards === "next") {
      setEndCallcommissions("true");
    } else {
      return;
    }
  }, [EndCallgrantsAndAwards]);

  // Commissions
  useEffect(() => {
    if (EndCallcommissions === "next") {
      setEndCallpublications("true");
    } else {
      return;
    }
  }, [EndCallcommissions]);

  // Publications
  useEffect(() => {
    if (EndCallpublications === "next") {
      setEndCallrepresentation("true");
    } else {
      return;
    }
  }, [EndCallpublications]);

  // Representation
  useEffect(() => {
    if (EndCallrepresentation === "next") {
      setEndCallprofessionalService("true");
    } else {
      return;
    }
  }, [EndCallrepresentation]);

  // Professional Service
  useEffect(() => {
    if (EndCallprofessionalService === "next") {
      setEndCallPropessionalOrganizations("true");
    } else {
      return;
    }
  }, [EndCallprofessionalService]);

  // Professional Organizations
  useEffect(() => {
    if (EndCallPropessionalOrganizations === "next") {
      handleSaveAllData();
    } else {
      return;
    }
  }, [EndCallPropessionalOrganizations]);

  // mrx : End validating from step 2 () ----------------------------------------------------------------

  // Showing the hint
  const handleValidateStep2 = () => {
    // set hint true
    setWrong(Wrong ? false : true);
    setISAllformsOK(true);
    setClickedSave(true);
    setEndCallEducation("true");
  };

  // next btn api call save all data
  const handleGetCVLanding = () => {
    // if there was not global err and next clicked not effect ↓
    GetAuthUrl(GET_LANDING_CV).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          if (res?.data?.message !== "cv for user not found!") {
            localStorage.setItem(
              "Step2-Eduction",
              JSON.stringify(
                res?.data?.data?.cvBuilderEducations?.map((item) => ({
                  isOpen: item?.isOpen,
                  cvBuilderId: item?.cvBuilderId,
                  completionYear: item?.completionYear,
                  degreeTypeId: item?.degreeTypeId,
                  majorTypeId: item?.majorTypeId,
                  departementId: item?.departementId ? item?.departementId : null,
                  instutation: item?.instutation,
                  cumLaudeAndOtherHonors: item?.cumLaudeAndOtherHonors,
                  dissertationThesisTitleAndAdvisor:
                    item?.dissertationThesisTitleAndAdvisor,
                  completionYear: item?.completionYear,
                  completionYear: item?.completionYear,
                  isPublished: item?.isPublished,
                  id: item?.id,
                }))
              )
            );
            localStorage.setItem(
              "Step2-Collections",
              JSON.stringify(
                res?.data?.data?.cvBuilderCollections?.map((item) => ({
                  isOpen: item?.isOpen,
                  collectorCollection: item?.collectorCollection,
                  location: item?.location,
                  cvBuilderId: item?.cvBuilderId,
                  isPublished: item?.isPublished,
                  id: item?.id,
                }))
              )
            );
            localStorage.setItem(
              "Step2-Representation",
              JSON.stringify(
                res?.data?.data?.cvBuilderReperesentations?.map((item) => ({
                  isOpen: item?.isOpen,
                  galleryInstutation: item?.galleryInstutation,
                  location: item?.location,
                  isPublished: item?.isOpen,
                  cvBuilderId: item?.cvBuilderId,
                  cvBuilderId: item?.cvBuilderId,
                  id: item?.id,
                }))
              )
            );
            localStorage.setItem(
              "Step2-Bilbiography",
              JSON.stringify(
                res?.data?.data?.cvBuilderBios?.map((item) => ({
                  isOpen: item?.isOpen,
                  description: item?.description,
                  isPublished: item?.isPublished,
                  cvBuilderId: item?.cvBuilderId,
                  id: item?.id,
                }))
              )
            );
            localStorage.setItem(
              "Step2-Professional-Service",
              JSON.stringify(
                res?.data?.data?.cvBuilderProfessionalServices?.map((item) => ({
                  isOpen: item?.isOpen,
                  from: item?.from,
                  cvBuilderId: item?.cvBuilderId,
                  to: item?.to,
                  title: item?.title,
                  location: item?.location,
                  galleryInstutation: item?.galleryInstutation,
                  isPublished: item?.isPublished,
                  id: item?.id,
                }))
              )
            );
            localStorage.setItem(
              "Step2-Grants-And-Awards",
              JSON.stringify(
                res?.data?.data?.cvBuilderGrantAndAwards?.map((item) => ({
                  isOpen: item?.isOpen,
                  year: item?.year,
                  title: item?.title,
                  cvBuilderId: item?.cvBuilderId,
                  instutation: item?.instutation,
                  isPublished: item?.isPublished,
                  id: item?.id,
                }))
              )
            );
            localStorage.setItem(
              "Step2-Professional-Organizations",
              JSON.stringify(
                res?.data?.data?.cvBuilderProfessionalOrganizations?.map(
                  (item) => ({
                    isOpen: item?.isOpen,
                    title: item?.title,
                    cvBuilderId: item?.cvBuilderId,
                    isPublished: item?.isPublished,
                    cvBuilderId: item?.cvBuilderId,
                    id: item?.id,
                  })
                )
              )
            );
            localStorage.setItem(
              "Step2-ProfessionalAppointments",
              JSON.stringify(
                res?.data?.data?.cvBuilderProfessionalAppointments?.map(
                  (item) => ({
                    isOpen: item?.isOpen,
                    from: item?.from,
                    to: item?.to,
                    title: item?.title,
                    location: item?.location,
                    cvBuilderId: item?.cvBuilderId,
                    instutation: item?.instutation,
                    isPublished: item?.isPublished,
                    id: item?.id,
                  })
                )
              )
            );
            localStorage.setItem(
              "Step2-Publications",
              JSON.stringify(
                res?.data?.data?.cvBuilderPublications?.map((item) => ({
                  isOpen: item?.isOpen,
                  cvBuilderId: item?.cvBuilderId,
                  name: item?.name,
                  isPublished: item?.isPublished,
                  id: item?.id,
                }))
              )
            );
            localStorage.setItem(
              "Step2-Exhibitions",
              JSON.stringify(
                res?.data?.data?.cvBuilderSelectedExhibitions?.map((item) => ({
                  isOpen: item?.isOpen,
                  year: item?.year,
                  typeId: item?.typeId,
                  cvBuilderId: item?.cvBuilderId,
                  title: item?.title,
                  location: item?.location,
                  galleryInstutation: item?.galleryInstutation,
                  isPublished: item?.isPublished,
                  id: item?.id,
                }))
              )
            );
            localStorage.setItem(
              "Step2-Commissions",
              JSON.stringify(
                res?.data?.data?.cvBuilderCommissions?.map((item) => ({
                  isOpen: item?.isOpen,
                  year: item?.year,
                  typeId: item?.typeId,
                  title: item?.title,
                  location: item?.isOplocationen,
                  cvBuilderId: item?.cvBuilderId,
                  galleryInstutation: item?.galleryInstutation,
                  isPublished: item?.isPublished,
                  id: item?.id,
                }))
              )
            );
            localStorage.setItem("Step2-Bio", res?.data?.data?.bio);
            window.onload();
          }

        } else {
          // toast.error(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  };

  // next btn api call save all data
  const handleSaveAllData = () => {
    // if there was not global err and next clicked not effect ↓
    if (ISAllformsOK === true && ClickedSave === true) {
      PostAuthUrl(CV_BUILDER_SAVE_ALL_DATA, {
        bio: BIO_DATA,
        cvBuilderEducations: EDUCATION_DATA,
        cvBuilderSelectedExhibitions: EXHIBITIONS_DATA,
        cvBuilderCollections: COLLECTIONS_DATA,
        cvBuilderBios: BILBIGRAPHY_DATA,
        cvBuilderProfessionalAppointments: PROFESSIONAL_APPOINTMENTS_DATA,
        cvBuilderGrantAndAwards: GRANTS_AND_AWARDS_DATA,
        cvBuilderCommissions: COMMISSIONS_DATA,
        cvBuilderPublications: PUBLICATIONS_DATA,
        cvBuilderReperesentations: REPRESENTATION_DATA,
        cvBuilderProfessionalServices: PROGESSIONAL_SERVICE_DATA,
        cvBuilderProfessionalOrganizations: PROGESSIONAL_ORGANIZATIONS_DATA,
      }).then((res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            toast.success(res?.data?.message);
            // clear all data
            localStorage.removeItem("Step2-Collections");
            localStorage.removeItem("Step2-Representation");
            localStorage.removeItem("tep2-Bilbiography");
            localStorage.removeItem("Step2-Professional-Service");
            localStorage.removeItem("Step2-Grants-And-Awards");
            localStorage.removeItem("Step2-Professional-Organizations");
            localStorage.removeItem("Step2-ProfessionalAppointments");
            localStorage.removeItem("Step2-Publications");
            localStorage.removeItem("Step2-Exhibitions");
            localStorage.removeItem("Step2-Commissions");
            localStorage.removeItem("Step2-Bio");
            localStorage.removeItem("Step2-Bilbiography");
            localStorage.removeItem("Step2-Eduction");

            router.push("/auth/signup/step3");
          } else {
            toast.error(res?.data?.message);
            setClickedSave(false);
          }
        } else {
          toast.error("something went wrong !");
        }
      });
    }
  };

  useEffect(() => {
    if (!Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n")) {
      router.push("/");
    }
    handleGetCVLanding();
    window.onload = function () {
      if (!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
      }
    }
  }, []);

  if (Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n")) {
    return (
      <>
        <Hidden mdUp>
          <Grid item className={signUpStyle.line42}></Grid>
        </Hidden>

        <Container className={`${signUpStyle.m__top} ${styles.mb_100}`}>
          <Hidden mdUp>
            <MobileMenu />
          </Hidden>

          <Grid container justifyContent="center">
            <Grid item md={3} sm={12} xs={12} className={signUpStyle.mt_title}>
              <Grid
                container
                alignItems="flex-start"
                justifyContent="flex-start"
                className={signUpStyle.height100}
              >
                <Hidden smDown>
                  <Grid
                    item
                    className={`${signUpStyle.flex1} ${signUpStyle.height100}`}
                  >
                    <Grid
                      container
                      direction="column"
                      justifyContent="flex-start"
                      className={signUpStyle.height100}
                      spacing={8}
                    >
                      <Grid item>
                        <Grid container>
                          <Grid item className={signUpStyle.P_Arrow}>
                            <LinkPages href="/auth/signup/step1">
                              <IconButton
                                size="small"
                                className={`${signUpStyle.ArrowLeft}`}
                              >
                                <Image src={ArrowLeft} alt="" />
                              </IconButton>
                            </LinkPages>
                          </Grid>
                          <Grid
                            item
                            className={`${signUpStyle.SignUp__font} ${styles.m_b25_xs} ${styles.m_t10_xs}`}
                          >
                            Sign up
                          </Grid>
                        </Grid>
                      </Grid>
                      {/* mrx : side menu start */}
                      <CvMenu />
                      {/* mrx : side menu end */}
                    </Grid>
                  </Grid>
                </Hidden>
                <Hidden mdUp>
                  <Grid container alignItems="center">
                    <Grid
                      item
                      xs={4}
                      className={`${signUpStyle.SignUp__font} ${styles.m_b25_xs} ${styles.m_t20_xs1}`}
                    >
                      <Grid item> Sign Up</Grid>
                    </Grid>
                    <Hidden mdUp>
                      <Grid
                        item
                        xs={7}
                        className={`${signUpStyle.line2}`}
                      ></Grid>
                    </Hidden>
                  </Grid>
                </Hidden>
              </Grid>
            </Grid>

            <Grid item md={5} sm={12} xs={12}>
              <Steps
                step={2}
                text="Step 2 of 4 - CV"
                link="/auth/signup/step1"
              />

              <CvMobile SignUpPage={true}/>

              {/* sections start */}
              <Grid item>
                <Bio />
                <Education
                  SelectInputData={SelectInputData}
                  Wrong={Wrong}
                  setWrong={setWrong}
                  EndCallEducation={EndCallEducation}
                  setEndCallEducation={setEndCallEducation}
                />

                <SelectedExhibitions
                  Wrong={Wrong}
                  setWrong={setWrong}
                  SelectInputData={SelectInputData}
                  CountrySelectInputData={CountrySelectInputData}
                  EndCallExhibitions={EndCallExhibitions}
                  setEndCallExhibitions={setEndCallExhibitions}
                />

                <Collections
                  SelectInputData={SelectInputData}
                  Wrong={Wrong}
                  setWrong={setWrong}
                  CountrySelectInputData={CountrySelectInputData}
                  EndCallCollections={EndCallCollections}
                  setEndCallCollections={setEndCallCollections}
                />

                <Bilbiography
                  Wrong={Wrong}
                  setWrong={setWrong}
                  SelectInputData={SelectInputData}
                  EndCallBilbiography={EndCallBilbiography}
                  setEndCallBilbiography={setEndCallBilbiography}
                />

                <ProfessionalAppointments
                  SelectInputData={SelectInputData}
                  CountrySelectInputData={CountrySelectInputData}
                  Wrong={Wrong}
                  setWrong={setWrong}
                  EndCallprofessionalAppointments={
                    EndCallprofessionalAppointments
                  }
                  setEndCallprofessionalAppointments={
                    setEndCallprofessionalAppointments
                  }
                />

                <GrantsAndAwards
                  SelectInputData={SelectInputData}
                  Wrong={Wrong}
                  setWrong={setWrong}
                  EndCallgrantsAndAwards={EndCallgrantsAndAwards}
                  setEndCallgrantsAndAwards={setEndCallgrantsAndAwards}
                />

                <Commissions
                  SelectInputData={SelectInputData}
                  CountrySelectInputData={CountrySelectInputData}
                  Wrong={Wrong}
                  setWrong={setWrong}
                  EndCallcommissions={EndCallcommissions}
                  setEndCallcommissions={setEndCallcommissions}
                />

                <Publications
                  SelectInputData={SelectInputData}
                  Wrong={Wrong}
                  setWrong={setWrong}
                  EndCallpublications={EndCallpublications}
                  setEndCallpublications={setEndCallpublications}
                />

                <Representation
                  SelectInputData={SelectInputData}
                  CountrySelectInputData={CountrySelectInputData}
                  Wrong={Wrong}
                  setWrong={setWrong}
                  EndCallrepresentation={EndCallrepresentation}
                  setEndCallrepresentation={setEndCallrepresentation}
                />

                <ProfessionalService
                  SelectInputData={SelectInputData}
                  CountrySelectInputData={CountrySelectInputData}
                  Wrong={Wrong}
                  setWrong={setWrong}
                  EndCallprofessionalService={EndCallprofessionalService}
                  setEndCallprofessionalService={setEndCallprofessionalService}
                />

                <ProfessionalOrganizations
                  SelectInputData={SelectInputData}
                  Wrong={Wrong}
                  setWrong={setWrong}
                  EndCallPropessionalOrganizations={
                    EndCallPropessionalOrganizations
                  }
                  setEndCallPropessionalOrganizations={
                    setEndCallPropessionalOrganizations
                  }
                />
              </Grid>
            </Grid>

            <NextButton onClick={() => handleValidateStep2()} />
          </Grid>
        </Container>
      </>
    );
  } else {
    return <></>;
  }
}
