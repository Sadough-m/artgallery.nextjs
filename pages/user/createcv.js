import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-scroll";
import Image from "next/image";
import LinkPages from "next/link";
import Joi from "joi";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";

// gm : material ui ↓
import { Hidden, Grid, Button } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import Cookies from "js-cookie";

// gm : styles ↓
import Style from "../../styles/UserSettings.module.css";

// gm : files  ↓

// gm : components ↓
import Header from "../../components/common/header";
import NavSettings from "../../components/Screens/UserSettings/NavSettings";
import Menu from "../../components/Screens/UserSettings/Menu";
import CvMenu from "../../components/common/CvMenu";
import PublishCv from "../../components/Screens/UserSettings/PublishCv";
import CvMobile from "../../components/common/CvMobile";

import Education from "../../components/Screens/UserSettings/Main/Education";
import ProfessionalAppointments from "../../components/Screens/UserSettings/Main/ProfessionalAppointments";
import GrantsAndAwards from "../../components/Screens/UserSettings/Main/GrantsAndAwards";
import Commissions from "../../components/Screens/UserSettings/Main/Commissions";
import Collections from "../../components/Screens/UserSettings/Main/Collections";
import Bio from "../../components/Screens/UserSettings/Main/Bio";
import Publications from "../../components/Screens/UserSettings/Main/Publications";
import Representation from "../../components/Screens/UserSettings/Main/Representation";
import ProfessionalService from "../../components/Screens/UserSettings/Main/ProfessionalService";
import ProfessionalOrganizations from "../../components/Screens/UserSettings/Main/ProfessionalOrganizations";
import SelectedExhibitions from "../../components/Screens/UserSettings/Main/SelectedExhibitions";
import Bilbiography from "../../components/Screens/UserSettings/Main/Bilbiography";

// mrx : api links ↓
import {
  GET_SELECT_INPUTS_STEP_2,
  GET_COUNTRY_SELECT,
  CV_BUILDER_SAVE_ALL_DATA,
  GET_SETTING_CV,
  SAVE_SETTING_CV
} from "../../pages/api/index";

// mrx : api ↓
import { PostUrl, PostAuthUrl, GetUrl, GetAuthUrl } from "../../pages/api/config";

// mrx : context ↓
import { Context } from "../../context/index";

// gm : Artist List ↓
export default function CreateCv() {
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
  const [EndCallprofessionalAppointments, setEndCallprofessionalAppointments] = useState("false");
  const [EndCallgrantsAndAwards, setEndCallgrantsAndAwards] = useState("false");
  const [EndCallcommissions, setEndCallcommissions] = useState("false");
  const [EndCallpublications, setEndCallpublications] = useState("false");
  const [EndCallrepresentation, setEndCallrepresentation] = useState("false");
  const [EndCallprofessionalService, setEndCallprofessionalService] = useState("false");
  const [EndCallPropessionalOrganizations, setEndCallPropessionalOrganizations] = useState("false");

  // mrx : context
  const { ISAllformsOK, setISAllformsOK } = useContext(Context);

  // get all data from local storage ( start ) ------------------------------
  const EDUCATION_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("CreateCv-Eduction") || "[]"
      : "[]"
  );

  const COLLECTIONS_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("CreateCv-Collections") || "[]"
      : "[]"
  );

  const REPRESENTATION_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("CreateCv-Representation") || "[]"
      : "[]"
  );

  const BILBIGRAPHY_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("CreateCv-Bilbiography") || "[]"
      : "[]"
  );

  const PROGESSIONAL_SERVICE_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("CreateCv-Professional-Service") || "[]"
      : "[]"
  );

  const GRANTS_AND_AWARDS_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("CreateCv-Grants-And-Awards") || "[]"
      : "[]"
  );

  const PROGESSIONAL_ORGANIZATIONS_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("CreateCv-Professional-Organizations") || "[]"
      : "[]"
  );

  const PROFESSIONAL_APPOINTMENTS_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("CreateCv-ProfessionalAppointments") || "[]"
      : "[]"
  );

  const PUBLICATIONS_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("CreateCv-Publications") || "[]"
      : "[]"
  );

  const EXHIBITIONS_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("CreateCv-Exhibitions") || "[]"
      : "[]"
  );

  const COMMISSIONS_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("CreateCv-Commissions") || "[]"
      : "[]"
  );

  const BIO_DATA =
    typeof window !== "undefined" ? localStorage.getItem("CreateCv-Bio") : "";

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
  const handleSaveAllData = () => {
    // if there was not global err and next clicked not effect ↓
    if (ISAllformsOK === true && ClickedSave === true) {
      PostAuthUrl(SAVE_SETTING_CV, {
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
            localStorage.removeItem("CreateCv-Collections");
            localStorage.removeItem("CreateCv-Representation");
            localStorage.removeItem("tep2-Bilbiography");
            localStorage.removeItem("CreateCv-Professional-Service");
            localStorage.removeItem("CreateCv-Grants-And-Awards");
            localStorage.removeItem("CreateCv-Professional-Organizations");
            localStorage.removeItem("CreateCv-ProfessionalAppointments");
            localStorage.removeItem("CreateCv-Publications");
            localStorage.removeItem("CreateCv-Exhibitions");
            localStorage.removeItem("CreateCv-Commissions");
            localStorage.removeItem("CreateCv-Bio");
            localStorage.removeItem("CreateCv-Bilbiography");
            localStorage.removeItem("CreateCv-Eduction");
            
            window.location.reload(), 1500;
            
            // router.push("/auth/signup/step3");
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
  }, []);

  // next btn api call save all data
  const handleGetCVLanding = () => {
    // if there was not global err and next clicked not effect ↓
    GetAuthUrl(GET_SETTING_CV).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          if (res?.data?.message !== "cv for user not found!") {
            localStorage.setItem(
              "CreateCv-Eduction",
              JSON.stringify(
                res?.data?.data?.cvBuilderEducations?.map((item) => ({
                  isOpen: item?.isOpen,
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
              "CreateCv-Collections",
              JSON.stringify(
                res?.data?.data?.cvBuilderCollections?.map((item) => ({
                  isOpen: item?.isOpen,
                  collectorCollection: item?.collectorCollection,
                  location: item?.location,
                  isPublished: item?.isPublished,
                  id: item?.id,
                }))
              )
            );
            localStorage.setItem(
              "CreateCv-Representation",
              JSON.stringify(
                res?.data?.data?.cvBuilderReperesentations?.map((item) => ({
                  isOpen: item?.isOpen,
                  galleryInstutation: item?.galleryInstutation,
                  location: item?.location,
                  isPublished: item?.isOpen,
                  id: item?.id,
                }))
              )
            );
            localStorage.setItem(
              "CreateCv-Bilbiography",
              JSON.stringify(
                res?.data?.data?.cvBuilderBios?.map((item) => ({
                  isOpen: item?.isOpen,
                  description: item?.description,
                  isPublished: item?.isPublished,
                  id: item?.id,
                }))
              )
            );
            localStorage.setItem(
              "CreateCv-Professional-Service",
              JSON.stringify(
                res?.data?.data?.cvBuilderProfessionalServices?.map((item) => ({
                  isOpen: item?.isOpen,
                  from: item?.from,
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
              "CreateCv-Grants-And-Awards",
              JSON.stringify(
                res?.data?.data?.cvBuilderGrantAndAwards?.map((item) => ({
                  isOpen: item?.isOpen,
                  year: item?.year,
                  title: item?.title,
                  instutation: item?.instutation,
                  isPublished: item?.isPublished,
                  id: item?.id,
                }))
              )
            );
            localStorage.setItem(
              "CreateCv-Professional-Organizations",
              JSON.stringify(
                res?.data?.data?.cvBuilderProfessionalOrganizations?.map(
                  (item) => ({
                    isOpen: item?.isOpen,
                    title: item?.title,
                    isPublished: item?.isPublished,
                    id: item?.id,
                  })
                )
              )
            );
            localStorage.setItem(
              "CreateCv-ProfessionalAppointments",
              JSON.stringify(
                res?.data?.data?.cvBuilderProfessionalAppointments?.map(
                  (item) => ({
                    isOpen: item?.isOpen,
                    from: item?.from,
                    to: item?.to,
                    title: item?.title,
                    location: item?.location,
                    instutation: item?.instutation,
                    isPublished: item?.isPublished,
                    id: item?.id,
                  })
                )
              )
            );
            localStorage.setItem(
              "CreateCv-Publications",
              JSON.stringify(
                res?.data?.data?.cvBuilderPublications?.map((item) => ({
                  isOpen: item?.isOpen,
                  name: item?.name,
                  isPublished: item?.isPublished,
                  id: item?.id,
                }))
              )
            );
            localStorage.setItem(
              "CreateCv-Exhibitions",
              JSON.stringify(
                res?.data?.data?.cvBuilderSelectedExhibitions?.map((item) => ({
                  isOpen: item?.isOpen,
                  year: item?.year,
                  typeId: item?.typeId,
                  title: item?.title,
                  location: item?.location,
                  galleryInstutation: item?.galleryInstutation,
                  isPublished: item?.isPublished,
                  id: item?.id,
                }))
              )
            );
            localStorage.setItem(
              "CreateCv-Commissions",
              JSON.stringify(
                res?.data?.data?.cvBuilderCommissions?.map((item) => ({
                  isOpen: item?.isOpen,
                  year: item?.year,
                  typeId: item?.typeId,
                  title: item?.title,
                  location: item?.isOplocationen,
                  galleryInstutation: item?.galleryInstutation,
                  isPublished: item?.isPublished,
                  id: item?.id,
                }))
              )
            );
            localStorage.setItem("CreateCv-Bio", res?.data?.data?.bio);
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

  return (
    <Grid item>

      {/* NavBar Settings */}
      <NavSettings handleValidateStep2={handleValidateStep2} save_discard_btn={true} />

      <Grid
        container
        direction="row"
        justifyContent="center"
        className={Style.margin2}
      >
        {/*  menu left side */}
        <Grid item className={Style.leftSide}>
          <Menu SelectedPage="Creator CV" />
        </Grid>
        <Hidden mdUp>
          <Grid item className={Style.PcvMobile}>
            <CvMobile />
          </Grid>
        </Hidden>

        {/* right side */}
        <Grid item className={Style.rightSide}>
          <Grid container>
            <Grid item className={Style.wrapper_creatorCv}>
              <Hidden smDown>
                <Grid item className={Style.text_userSetting}>
                  Creator CV
                </Grid>
                <Grid item className={Style.p_cvMenu}>
                  <CvMenu />
                </Grid>
              </Hidden>
            </Grid>

            {/* CV Items */}
            <Grid item className={Style.wrapper_right_cv}>
              {/* start PublishCV */}
              <PublishCv />
              {/* end PublishCV */}

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
              <br />
              <br />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid >
  );
}
