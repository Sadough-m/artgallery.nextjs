import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import Joi from "joi";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

// mrx : material ui ↓
import { Hidden, Grid, Button } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

// mrx : styles ↓
import ColStyle from "../../styles/Collection.module.css";

// mrx : api
import {
  BASE_Image_Url,
  ADD_NEW_COLLECTION,
  GET_CREATE_COLLECTION_DATA,
  GET_USER_COLlABRATOR
} from "../../pages/api";

import { GetUrl, GetAuthUrl, PutAuthUrl, PostAuthUrl } from "../../pages/api/config";

// mrx : context ↓
import { Context } from "../../context/index";

// mrx : cookies
import Cookies from "js-cookie";

// rmx : files  ↓
import checkWhite from "../../public/images/icons/Check White.svg";
import closeIcon from "../../public/images/icons/Close12.svg";
import arrowLeft from "../../public/images/icons/Arrow left -.svg";

// mrx : components ↓
import Header from "../../components/common/header";
import useWindowSize from "../../Hooks/useWindowSize";
import Statuse from "../../components/Screens/Collection/Statuse";
import File from "../../components/Forms/FileUploaderWithDragStep4";
import CustomSelect from "../../components/Forms/CustomSelect";
import Collabrators from "../../components/Screens/Collection/Collabrators";
import Apps from "../../components/Screens/Collection/Apps";
import InputForm from "../../components/Forms/InputForm";

// mrx : Artist List ↓
export default function Add() {
  // mrx : context
  const { ArtistList } = useContext(Context);

  //rs : router
  const router = useRouter();

  const collectionID = typeof window !== "undefined" ? localStorage.getItem("collectionId") || 0 : 0;

  // mrx : states ↓
  const [createCollectionData, setCreateCollectionData] = useState([]);
  const [UserColabrators, setUserColabrators] = useState([]);
  const [mediumType, setMediumType] = useState("");
  const [collectionType, setCollectionType] = useState("");
  const [collectionName, setCollectionName] = useState("");

  const [CheckRequired, setCheckRequired] = useState(false);

  const [UploadingFileUrl, setUploadingFileUrl] = useState("");
  const [Status, setStatus] = useState(false);
  const [LoadingImages, setLoadingImages] = useState(true);

  // mrx : recocnize the page size
  const [width, height] = useWindowSize();

  // get selct inputs & get user colabrators
  const getCreateCollectionData = () => {
    setLoadingImages(true);
    GetAuthUrl(GET_CREATE_COLLECTION_DATA).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          setCreateCollectionData(res.data.data);
          setLoadingImages(false);
        } else {
          toast.error(res?.data?.message);
          setLoadingImages(false);
        }
      } else {
        toast.error("something went wrong !");
        setLoadingImages(false);
      }
    });

    GetAuthUrl(GET_USER_COLlABRATOR(collectionID)).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          setUserColabrators(res.data.data);
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  };

  // add nrw collectionn api
  const handleAddNewCollection = () => {
    if (
      collectionName === "" ||
      mediumType === "" ||
      collectionType === ""
    ) {
      setCheckRequired(true);
      toast.warning("Please fill the required values")
    } else {
      PostAuthUrl(ADD_NEW_COLLECTION, {
        "type": collectionType,
        "status": Status === true ? 1 : 0,
        "mediumType": mediumType,
        "pictureUrl": UploadingFileUrl,
        "name": collectionName
      }).then((res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            setCheckRequired(false);
            router.push("/dashboard");
            toast.success("Colection added successfully");
          } else {
            toast.error(res?.data?.message);
          }
        } else {
          toast.error(res?.data?.message);
        }
      });
    }
  }

  // when was ready
  useEffect(() => {
    getCreateCollectionData();
  }, [])

  const schema = {
    collectionName: Joi.string().required().messages({
      "string.empty": `Collection name is required`,
      "string.base": `Collection name is required`,
      "any.required": `Collection name is required`,
    }),
  };

  return (
    <Grid item>
      
      <Grid
        container
        direction="row"
        justifyContent="center"
        style={{ marginTop: "17px" }}
      >
        {/* left side pc*/}
        <Hidden smDown>
          <Grid item className={ColStyle.side_wrapper}>
            <Grid item className={ColStyle.LeftSide_item}>
              <Grid item className={ColStyle.title}>
                Add Collcetion
              </Grid>
            </Grid>
          </Grid>
        </Hidden>
        {/* left side mobile*/}
        <Hidden mdUp>
          <Grid item className={ColStyle.headerMobile}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item className="fs16fw500"><img onClick={() => router.back()} src={arrowLeft.src} className={ColStyle.arrowLeft} />Add Collcetion</Grid>
              <Grid item>
                <Button
                  onClick={() => handleAddNewCollection()}
                  color="primary" variant="contained">
                  Create
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Hidden>

        {/* start middle */}
        <Grid item className={ColStyle.middle_wrapper}>
          <Grid item>
            <Statuse setSwitch={setStatus} Switch={Status} />
          </Grid>
          <Grid item className={ColStyle.p_file}>
            <File
              label="Picture"
              placeHolder="Add a picture for the collectionn"
              UploadingFileUrl={UploadingFileUrl}
              setUploadingFileUrl={setUploadingFileUrl}
              SelectName={true}
            />
          </Grid>
          <Grid item className="mt_20">
            <CustomSelect
              Data={createCollectionData?.type}
              Value={collectionType}
              setValue={setCollectionType}
              label="Collection type"
              placeHolder="Choose one"
              validateFlag={CheckRequired}
            >
              <p className={ColStyle.offlineText}>
                You’r Offline, that mean is your artworks are hidden
              </p>
            </CustomSelect>
          </Grid>
          <Grid item className="mt_20">
            <CustomSelect
              label="Medium category"
              placeHolder="Choose one"
              Value={mediumType}
              setValue={setMediumType}
              Data={createCollectionData?.mediumType}
              validateFlag={CheckRequired}
            >
              <p className={ColStyle.offlineText}>
                You’r Offline, that mean is your artworks are hidden
              </p>
            </CustomSelect>
          </Grid>
          <Grid item className="mt_20">
            <InputForm
              type="text"
              placeHolder="I am a collection"
              label="Collection name"
              name={collectionName}
              schema={schema.collectionName}
              value={collectionName}
              setValue={setCollectionName}
              validateFlag={CheckRequired}
            />
          </Grid>
          <Grid item className="mt_20">
            <Apps />
          </Grid>
          <Grid item className="mt_20">
            <Collabrators
              LoadingImages={LoadingImages}
              getCreateCollectionData={getCreateCollectionData}
              Data={UserColabrators}
            />
          </Grid>
          <br />
          <br />
          <br />
          <br />
        </Grid>

        {/* start right side */}
        <Hidden smDown>
          <Grid item className={ColStyle.side_wrapper}>
            <Grid item className={ColStyle.two_button}>
              <Link href={`/dashboard`}>
                <Button
                  startIcon={<Image src={closeIcon} />}
                  className={ColStyle.discard}
                >
                  Discard
                </Button>
              </Link>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Image src={checkWhite} />}
                className={ColStyle.createButton}
                onClick={() => handleAddNewCollection()}
              >
                Create Collection
              </Button>
            </Grid>
          </Grid>
        </Hidden>
      </Grid>
    </Grid>
  );
}
