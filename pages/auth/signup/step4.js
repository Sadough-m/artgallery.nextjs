import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Joi from "joi";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
//rs : save state in localstorage
import { useLocalStorage } from "../../../Hooks/useLocalStorage";

// mrx : setCookies with this
import Cookies from 'js-cookie'

// rmx : files  ↓
import ArrowLeft from "../../../public/images/icons/Arrow left -.svg";

// mrx : styles ↓
import styles from "../../../styles/Home.module.css";
import signUpStyle from "../../../styles/signUp.module.css";

// mrx : material ui ↓
import { Hidden, Button, Grid, Container, IconButton } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

// mrx : components ↓
import InputForm from "../../../components/Forms/InputForm";
import MobileMenu from "../../../components/common/mobilemenu";
import File from "../../../components/Forms/FileUploaderWithDragStep4";
import CustomSelect from "../../../components/Forms/CustomSelect";
import Steps from "../../../components/Screens/Landing/Steps";
import NextButton from "../../../components/Screens/Landing/NextButton";
//rs : collection urls
import {
  CREAT_COLLECTION,
  GET_CREATE_COLLECTION_DATA,
} from "../../api";

//rs : post method helper
import { GetAuthUrl, PostAuthUrl, PostUrl } from "../../api/config";

// mrx : Icons ↓


const schema = {
  collectionName: Joi.string().required().messages({
    "string.empty": `Collection name is required`,
    "string.base": `Collection name is required`,
    "any.required": `Collection name is required`,
  }),

  collectionMedium: Joi.string().required().messages({
    "string.empty": `Collection name is required`,
    "string.base": `Collection name is required`,
    "any.required": `Collection name is required`,
  }),
};

const COLLECTION_TYPES = [
  { id: 1, name: "Artist" },
  { id: 2, name: "Gallery" },
];

const MEDUM_CATEGORY = [
  { id: 1, name: "Digital" },
  { id: 2, name: "Physical" },
  { id: 3, name: "PhysicalDigital" },
];

// mrx : SignUp step 4 page ↓
export default function SignUpStep4() {
  const router = useRouter();
  // mrx : states ↓
  const [collectionName, setCollectionName] = useState("");
  const [mediumType, setMediumType] = useState("");
  const [collectionType, setCollectionType] = useState("");
  const [mediumTypeName, setMediumTypeName] = useState("");
  const [collectionTypeName, setCollectionTypeName] = useState("");
  const [validateFlag, setvalidateFlag] = useState();
  const [offline, setOffline] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [UploadFile, setUploudFile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("file", "");
  const [createCollectionData, setCreateCollectionData] = useState();

  const [UploadingFileUrl, setUploadingFileUrl] = useState("");
  let condition = !collectionName || collectionName === "";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.push("/");
    getCreateCollectionData();
  }, []);

  const getCreateCollectionData = () => {
    GetAuthUrl(GET_CREATE_COLLECTION_DATA).then((res, err) => {
      if (res && res.status === 200) {
        setCreateCollectionData(res.data.data);
        if (res?.data?.isSuccess) {
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  };

  //rs : finish signing up and save collection & upload photo
  const handleNextButton = () => {
    if (condition) return setvalidateFlag(true);
    setLoading(true);
    if (
      collectionType === "" ||
      mediumType === "" ||
      collectionName === "" ||
      UploadingFileUrl === ""
    ) {
      toast.warning("Please fill the required values");
      setLoading(false);
    } else {
      PostAuthUrl(CREAT_COLLECTION, {
        type: collectionType,
        mediumType: mediumType,
        name: collectionName,
        pictureUrl: UploadingFileUrl
      }).then((res, err) => {
        if (res && res.status === 200) {
          setLoading(false);
          if (res?.data?.isSuccess) {
            // router.push("/dashboard");
            router.push("/artist/list");
            setLoading(false);
          } else {
            toast.error(res?.data?.message);
            setLoading(false);
          }
        }
      });
    }
  };

  useEffect(() => {
    if (!Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n")) {
      router.push("/");
    }
  }, [])

  if (Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n")) {
    return (
      <>
        {/* <Hidden smDown>
        <HeaderLanding />
      </Hidden> */}
        <Hidden mdUp>
          <Grid item className={signUpStyle.line42}></Grid>
        </Hidden>

        <Container className={`${signUpStyle.m__top}  ${styles.mb_100}`}>
          <Hidden mdUp>
            <MobileMenu />
          </Hidden>

          <Grid container justifyContent="center">
            <Grid item md={3} sm={12} xs={12}>
              <Hidden mdUp>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Hidden smDown>
                    <Grid item>
                      <Link href="/auth/signup/step3">
                        <IconButton
                          size="small"
                          className={`${signUpStyle.ArrowLeft}`}
                        >
                          <Image src={ArrowLeft} alt="" />
                        </IconButton>
                      </Link>
                    </Grid>
                  </Hidden>
                  <Grid
                    item
                    xs={8}
                    sm={4}
                    className={`${signUpStyle.SignUp__font} ${styles.m_b25_xs} ${styles.m_t30_xs1}`}
                  >
                    Collection setup
                  </Grid>
                  <Hidden mdUp>
                    <Grid
                      item
                      xs={3}
                      sm={7}
                      className={`${signUpStyle.line21}`}
                    ></Grid>
                  </Hidden>
                </Grid>
              </Hidden>
            </Grid>

            <Grid item md={5} sm={12}>
              <Steps
                step={4}
                text="Step 4 of 4 - Collection "
                link="/auth/signup/step3"
              />

              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item sm={12} xs={12}>
                  <InputForm
                    type="text"
                    placeHolder="I am a collection"
                    label="Collection name"
                    name={collectionName}
                    schema={schema.collectionName}
                    value={collectionName}
                    setValue={setCollectionName}
                    validateFlag={validateFlag}
                  />
                </Grid>

                <Grid item sm={12} xs={12}>
                  <File
                    label="Picture"
                    placeHolder="Add a picture for the collectionn"
                    UploadingFileUrl={UploadingFileUrl}
                    setUploadingFileUrl={setUploadingFileUrl}
                    SelectName={true}
                  />
                </Grid>

                <Grid item sm={12} xs={12}>
                  <CustomSelect
                    label="Collection type"
                    placeHolder="Choose One"
                    Value={collectionType}
                    setValue={setCollectionType}
                    bgColor={offline ? "#F7F8FA" : "#fff"}
                    Data={createCollectionData?.type}
                    validateFlag={validateFlag}
                  />
                </Grid>

                {offline && (
                  <Grid item className={signUpStyle.text_offline}>
                    You’r Offline, that mean is your artworks are hidden
                  </Grid>
                )}

                <Grid item sm={12} xs={12}>
                  <CustomSelect
                    label="Medium category"
                    placeHolder="Choose One"
                    bgColor={offline ? "#F7F8FA" : "#fff"}
                    Data={createCollectionData?.mediumType}
                    Value={mediumType}
                    setValue={setMediumType}
                    validateFlag={validateFlag}
                  />
                </Grid>

                {offline && (
                  <Grid item className={signUpStyle.text_offline}>
                    You’r Offline, that mean is your artworks are hidden
                  </Grid>
                )}
              </Grid>
            </Grid>
            <NextButton
              text="Done"
              onClick={handleNextButton}
              loading={loading}
            />
          </Grid>
        </Container>
      </>);
  } else {
    return <></>
  }
}
