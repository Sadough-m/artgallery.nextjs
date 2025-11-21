import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-scroll";
import Image from "next/image";
import LinkPages from "next/link";
import Joi from "joi";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";

// mrx : styles ↓
import styles from "../../styles/Home.module.css";
import ArtistStyle from "../../styles/artist.module.css";

// mrx : files ↓
import ArrowLeft from "../../public/images/icons/Arrow left -1.svg";

// mrx : material ui ↓
import { Hidden, Button, Grid, Container, IconButton } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";

// mrx : Components ↓
import Header from "../../components/common/header";
import Info from "../../components/Screens/Artist/Main/Info";
import Bio from "../../components/Screens/Artist/Main/Bio";
import Education from "../../components/Screens/Artist/Main/Education";
import GrantsAndAwards from "../../components/Screens/Artist/Main/GrantsAndAwards";
import SelectedExhibitions from "../../components/Screens/Artist/Main/SelectedExhibitions";
import ProfessionalAppointments from "../../components/Screens/Artist/Main/ProfessionalAppointments";
import Commissions from "../../components/Screens/Artist/Main/Commissions";
import Collections from "../../components/Screens/Artist/Main/Collections";
import Publications from "../../components/Screens/Artist/Main/Publications";
import Representation from "../../components/Screens/Artist/Main/Representation";
import ProfessionalService from "../../components/Screens/Artist/Main/ProfessionalService";
import ProfessionalOrganizations from "../../components/Screens/Artist/Main/ProfessionalOrganizations";
import IsPrivate from "../../components/Screens/Artist/Main/IsPrivate";

import CvMenu from "../../components/common/CvMenu";
import Bilbiography from "../../components/Screens/Artist/Main/Bilbiography";
import ButtonNext from "../../components/Screens/Artist/ButtonNext";
import CvMobile from "../../components/Screens/Artist/CvMobile";

// mrx : setCookies with this
import Cookies from "js-cookie";

// mrx : api links ↓
import {
  GET_SELECT_INPUTS_STEP_2,
  GET_COUNTRY_SELECT,
  GET_CV_BUILDER_ARTIST_PRIVATE,
  SAVE_ARTIST_CV_BUILDER,
  GET_CV_BUILDER_ARTIST,
  SAVE_ARTIST_BY_ANOTHER
} from "../../pages/api/index";

// mrx : api ↓
import {
  PostUrl,
  PostAuthUrl,
  GetUrl,
  GetAuthUrl,
} from "../../pages/api/config";

// mrx : context ↓
import { Context } from "../../context/index";
import Location from "../../components/Forms/Location";

export default function AddArtist({ IsPrivateY = false, ArtistID = "00000000-0000-0000-0000-000000000000" }) {
  const router = useRouter();

  // mrx : states ↓
  const [SelectInputData, setSelectInputData] = useState([]);
  const [CountrySelectInputData, setCountrySelectInputData] = useState([]);
  const [Wrong, setWrong] = useState(false);
  const [ClickedSave, setClickedSave] = useState(false);

  const [PhoneNumbers, setPhoneNumbers] = useState([]);

  // last validate for next button : state
  const [EndCallEducation, setEndCallEducation] = useState("false");
  const [IsPrivateData, setIsPrivateData] = useState(false);
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
  const [EndCallInfo, setEndCallInfo] = useState("false");
  const [userRegisterBySelf, setuserRegisterBySelf] = useState(false);

  // mrx : context
  const { ISAllformsOK, setISAllformsOK } = useContext(Context);

  // mrx : get collection ID frm local 
  const CollectionID = typeof window !== "undefined" ? localStorage.getItem("collectionId") || "[]" : "[]";

  // get all data from local storage ( start ) ------------------------------
  const EDUCATION_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("Add-Artist-Eduction") || "[]"
      : "[]"
  );

  const COLLECTIONS_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("Add-Artist-Collections") || "[]"
      : "[]"
  );

  const REPRESENTATION_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("Add-Artist-Representation") || "[]"
      : "[]"
  );

  const BILBIGRAPHY_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("Add-Artist-Bilbiography") || "[]"
      : "[]"
  );

  const PROGESSIONAL_SERVICE_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("Add-Artist-Professional-Service") || "[]"
      : "[]"
  );

  const GRANTS_AND_AWARDS_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("Add-Artist-Grants-And-Awards") || "[]"
      : "[]"
  );

  const PROGESSIONAL_ORGANIZATIONS_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("Add-Artist-Professional-Organizations") || "[]"
      : "[]"
  );

  const PROFESSIONAL_APPOINTMENTS_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("Add-Artist-ProfessionalAppointments") || "[]"
      : "[]"
  );

  const PUBLICATIONS_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("Add-Artist-Publications") || "[]"
      : "[]"
  );

  const EXHIBITIONS_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("Add-Artist-Exhibitions") || "[]"
      : "[]"
  );

  const COMMISSIONS_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("Add-Artist-Commissions") || "[]"
      : "[]"
  );

  const BIO_DATA =
    typeof window !== "undefined" ? localStorage.getItem("Add-Artist-Bio") : "";

  const Title_Artist_DATA =
    typeof window !== "undefined"
      ? localStorage.getItem("Add-Artist-Info-title")
      : "";

  const FirstName_Artist_DATA =
    typeof window !== "undefined"
      ? localStorage.getItem("Add-Artist-Info-firstName")
      : "";

  const LastName_Artist_DATA =
    typeof window !== "undefined"
      ? localStorage.getItem("Add-Artist-Info-lastName")
      : "";


  const Email_Artist_DATA =
    typeof window !== "undefined"
      ? localStorage.getItem("Add-Artist-Info-email")
      : "";


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
  // info
  useEffect(() => {
    if (EndCallInfo === "next") {
      setEndCallEducation("true");
    } else {
      return;
    }
  }, [EndCallInfo]);

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

  const GET_Add_Artist_Info_KnownAs = typeof window !== "undefined" ? localStorage.getItem("Add-Artist-Info-KnownAs") : "";


  // mrx : End validating from step 2 () ----------------------------------------------------------------

  // Showing the hint
  const handleValidateStep2 = () => {
    // set hint true
    setWrong(Wrong ? false : true);
    setISAllformsOK(true);
    setClickedSave(true);
    setEndCallInfo("true");
  };

  const habdleRemoveArtistData = () => {
    localStorage.removeItem("Add-Artist-Collections");
    localStorage.removeItem("Add-Artist-Representation");
    localStorage.removeItem("Add-Artist-Bilbiography");
    localStorage.removeItem("Add-Artist-Professional-Service");
    localStorage.removeItem("Add-Artist-Grants-And-Awards");
    localStorage.removeItem("Add-Artist-Professional-Organizations");
    localStorage.removeItem("Add-Artist-ProfessionalAppointments");
    localStorage.removeItem("Add-Artist-Publications");
    localStorage.removeItem("Add-Artist-Exhibitions");
    localStorage.removeItem("Add-Artist-Commissions");
    localStorage.removeItem("Add-Artist-Bio");
    localStorage.removeItem("Add-Artist-Bilbiography");
    localStorage.removeItem("Add-Artist-Eduction");

    localStorage.removeItem("Add-Artist-Info-title");
    localStorage.removeItem("Add-Artist-Info-firstName");
    localStorage.removeItem("Add-Artist-Info-lastName");
    localStorage.removeItem("Add-Artist-Info-email");
    localStorage.removeItem("Add-Artist-Info-KnownAs");

    localStorage.removeItem("Adding-Artist-email");
      localStorage.removeItem("Adding-Search-UserID");
      localStorage.removeItem("Adding-Artist-firstName");
    localStorage.removeItem("Add-Artist-Info-AllNumbers2");
    localStorage.removeItem("Add-Artist-Info-AllNumbers1");
  }

  // next btn api call save all data
  const handleSaveAllData = () => {
    const getType = () => {
      if (ArtistID !== "00000000-0000-0000-0000-000000000000") {
        return SAVE_ARTIST_CV_BUILDER(CollectionID)
      } else {
        return SAVE_ARTIST_CV_BUILDER(CollectionID)
      }
    }
    // if there was not global err and next clicked not effect ↓
    if (ISAllformsOK === true && ClickedSave === true) {
      PostAuthUrl(getType(), {
        userId: ArtistID,
        collectionId: CollectionID,
        isPrivate: IsPrivateData,
        firstname: FirstName_Artist_DATA,
        isAlive: true,
        lastName: LastName_Artist_DATA,
        email: Email_Artist_DATA,
        title: Title_Artist_DATA,
        knownAs: GET_Add_Artist_Info_KnownAs ? parseInt(GET_Add_Artist_Info_KnownAs) : 0,
        phoneNumbers: [
          JSON.parse(localStorage.getItem("Add-Artist-Info-AllNumbers1"))
            ?.phoneNumber
            ? JSON.parse(localStorage.getItem("Add-Artist-Info-AllNumbers1"))
            : {},
          JSON.parse(localStorage.getItem("Add-Artist-Info-AllNumbers2"))
            ?.phoneNumber
            ? JSON.parse(localStorage.getItem("Add-Artist-Info-AllNumbers2"))
            : {},
        ],
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

            habdleRemoveArtistData();
            // if (Cookies.get("add-artist-from-artwork") == true) {
            // router.push("/artwork/add");
            // } else {
            // router.push("/");
            // }

            router.push(`/artist/${ArtistID}`)

            // ArtistID !== "00000000-0000-0000-0000-000000000000" ? router.push(`/artist/${ArtistID}`) : Cookies.get("add-artist-from-artwork") == true ?
            //   router.push("/artist/list") : router.push("/artwork/add"), Cookies.remove("add-artist-from-artwork")
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

  // next btn api call save all data
  const handleGetCVArtist = () => {
    if (ArtistID) {
      const getType = () => {
        if (IsPrivateY && ArtistID) {
          if (ArtistID) {
            return GET_CV_BUILDER_ARTIST_PRIVATE(ArtistID, CollectionID)
          }
        } else {
          if (ArtistID) {
            return GET_CV_BUILDER_ARTIST(ArtistID, CollectionID)
          }
        }
      }

      // if there was not global err and next clicked not effect ↓
      GetAuthUrl(getType()).then((res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            if (res?.data?.message !== "cv for user not found!") {
              setuserRegisterBySelf(res?.data?.data?.userRegisterBySelf);
              localStorage.setItem(
                "Add-Artist-Eduction",
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
                "Add-Artist-Collections",
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
                "Add-Artist-Representation",
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
                "Add-Artist-Bilbiography",
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
                "Add-Artist-Professional-Service",
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
                "Add-Artist-Grants-And-Awards",
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
                "Add-Artist-Professional-Organizations",
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
                "Add-Artist-ProfessionalAppointments",
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
                "Add-Artist-Publications",
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
                "Add-Artist-Exhibitions",
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
                "Add-Artist-Commissions",
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
              localStorage.setItem("Add-Artist-Bio", res?.data?.data?.bio);
              localStorage.setItem("Add-Artist-Info-KnownAs", res?.data?.data?.knownAs);
              localStorage.setItem("Add-Artist-Info-email", res?.data?.data?.email);
              localStorage.setItem("Add-Artist-Info-firstName", res?.data?.data?.firstName);
              localStorage.setItem("Add-Artist-Info-lastName", res?.data?.data?.lastName);
              localStorage.setItem("Add-Artist-Info-title", res?.data?.data?.title);
            }
            window.onload()
          } else {
            toast.error(res?.data?.message);
          }
        } else {
          toast.error("something went wrong !");
        }
      });
    }
  };

  useEffect(() => {
    if (IsPrivateY === true) {
      setIsPrivateData(true);
    }
  }, [IsPrivateY])


  useEffect(() => {
    if (!Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n")) {
      // router.push("/");
    } else {
      if (ArtistID !== "00000000-0000-0000-0000-000000000000") {
        handleGetCVArtist();
        window.onload = function () {
          if (!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
          }
        }
      }
    }
  }, [ArtistID]);

  return (
    <>
      <Hidden mdUp>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          className={ArtistStyle.P_addArtist}
        >
          <Grid item>
            <Grid item className="fw_500">
              <IconButton
                onClick={() => {
                  habdleRemoveArtistData();
                  router.push("/artist/list");
                }}
                size="small"
                className={ArtistStyle.ArrowBack}
              >
                <Image src={ArrowLeft} />
              </IconButton>
              Add artist
            </Grid>
          </Grid>

          <Grid item>
            <Button
              onClick={() => handleValidateStep2()}
              variant="contained"
              color="primary"
              className={ArtistStyle.addArtistBtn}
            >
              Add Artist
            </Button>
          </Grid>
        </Grid>
      </Hidden>

        <Grid container justifyContent="space-between" className={ArtistStyle.WrapperAdd}>
          <Grid
            item
            md={3}
            xs={9}
            className={`${ArtistStyle.AddArtist1} ${ArtistStyle.P_add_artist}`}
          >

            <Grid
              container
              alignItems="flex-start"
              justifyContent="flex-start"
              className={ArtistStyle.height100}
            >
              <Hidden smDown>
                <Grid item className={`${ArtistStyle.height100} `}>
                  <Grid
                    container
                    direction="column"
                    className={ArtistStyle.height100}
                    spacing={8}
                  >
                    <Grid item>
                      <Grid container>
                        <Grid
                          item
                          className={`${ArtistStyle.addArtist_1} ${styles.m_b25_xs} `}
                        // onClick={() => handleValidateStep2()}
                        >
                          Add artist
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item className={ArtistStyle.P_primary_cv}>
                      <Grid container direction="column" spacing={3}>
                        <CvMenu havePrimary={true} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Hidden>

            </Grid>
          </Grid>
          <Grid item className={ArtistStyle.cv_parent_el}>
            <CvMobile />
          </Grid>

          <Grid item md={5} sm={12} xs={12} className={ArtistStyle.middleItems}>
            <IsPrivate
              userRegisterBySelf={userRegisterBySelf}
              IsPrivateY={IsPrivateY}
              IsPrivateData={IsPrivateData}
              setIsPrivateData={setIsPrivateData}
            />
            <Info
              setEndCallInfo={setEndCallInfo}
              EndCallInfo={EndCallInfo}
              Wrong={Wrong}
              ClickedSave={ClickedSave}
              setWrong={setWrong}
              SelectInputData={SelectInputData}
            />
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
              EndCallprofessionalAppointments={EndCallprofessionalAppointments}
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
          <Grid
            item
            md={3}
            xs={3}
            className={` ${ArtistStyle.bottom_next} ${ArtistStyle.BtnAddArtist}`}
          >
            <ButtonNext
              ArtistID={ArtistID}
              handleDiscardArtist={() => {
                // {
                //   habdleRemoveArtistData()
                //   ArtistID !== "00000000-0000-0000-0000-000000000000" ? router.push(`/artist/${ArtistID}`) : Cookies.get("add-artist-from-artwork") == true ?
                //     router.push("/artist/list") : router.push("/artwork/add"), Cookies.remove("add-artist-from-artwork")
                // }
                {
                  habdleRemoveArtistData()
                  router.push("/artist/list")
                }
              }}
              handleAddArtist={() => handleValidateStep2()}
            />
          </Grid>
        </Grid>
    </>
  );
}
