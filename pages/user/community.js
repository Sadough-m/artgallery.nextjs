import React, { useEffect, useState } from "react";
import Image from "next/image";
import Joi from "joi";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';

// gm : material ui ↓
import { Hidden, Grid, Button } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

// gm : styles ↓
import Style from "../../styles/UserSettings.module.css";

// mrx : setCookies with this
import Cookies from "js-cookie";

// mrx : api links ↓
import {
  TOGGLE_VERIFY_ACOUNT,
  SETTING_COMUNITY_USERNAME_VALIDATOR,
  EDIT_SETTING_COMUNITY_USERINFO,
  GET_USER_INFO,
  CHNAGE_USER_PROFILE,
  DELETE_USER_PROFILE,
  UPLOAD_FILE_USER,
  BASE_Image_Url
} from "../../pages/api/index";

// mrx : api ↓
import {
  PostUrl,
  PutAuthUrl,
  PostAuthUrl,
  GetUrl,
  GetAuthUrl,
} from "../../pages/api/config";

// gm : files  ↓
import infoSvg from "../../public/images/icons/Info gray.svg";
import checkSvg from "../../public/images/icons/Check - Circle.svg";
import checkBlueSvg from "../../public/images/icons/Check - Circle blue.svg";
import profileUser from "../../public/images/profile user.png";
import instagramSvg from "../../public/images/icons/instagram white.svg";
import instagramVerifiedSvg from "../../public/images/icons/instagram verified.svg";

// gm : components ↓
import Header from "../../components/common/header";
import useWindowSize from "../../Hooks/useWindowSize";
import NavSettings from "../../components/Screens/UserSettings/NavSettings";
import InputForm from "../../components/Forms/InputForm";
import Menu from "../../components/Screens/UserSettings/Menu";
import VerifyBtn from "../../components/Screens/UserSettings/verifyAcountBtn";

// gm : Artist List ↓
export default function Community({ whereFrom }) {
  // dropzone drag and drop uploader
  const { fileRejections, acceptedFiles, getRootProps, getInputProps } =
    useDropzone({
      accept:
        "image/jpeg,image/png",
      multiple: false

    });

  // mrx : states  -------------------------------------------------------------------------------------------------------------
  const [DName, setDName] = useState("");
  const [UName, setUName] = useState("");
  const [CName, setCName] = useState("");
  const [DImage, setDImage] = useState(profileUser.src);
  const [IsUserVerifyIden, setIsUserVerifyIden] = useState(true);

  const [timer, setTimer] = useState();
  const [loading, setLoading] = useState(false);

  const [CheckRequired, setCheckRequired] = useState(false);
  const [First, setFirst] = useState(true);
  const [Uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : recocnize the page size ---------------------------------------------------------------------------------------------
  const [width, height] = useWindowSize();
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : change verify st ----------------------------------------------------------------------------------------------------
  const handleVerifyIdentity = () => {
    if (Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n")) {
      GetAuthUrl(TOGGLE_VERIFY_ACOUNT).then(
        (res, err) => {
          if (res && res.status === 200) {
            if (res?.data?.isSuccess) {
              toast.success(res?.data?.message);
              setIsUserVerifyIden(true);
            } else {
              toast.error(res?.data?.message);
            }
          } else {
            toast.error("something went wrong !");
          }
        }
      );
    }
  }
  // End -----------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (!Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n")) {
      router.push("/");
    }
  }, []);

  // mrx : Get user info first time --------------------------------------------------------------------------------------------
  const GetUserInfo = () => {
    setLoading(true);
    setFirst(true);
    GetAuthUrl(GET_USER_INFO).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          setLoading(false);
          setDName(res?.data?.data?.displayName === null ? "" : res?.data?.data?.displayName);
          setUName(res?.data?.data?.userName === null ? "" : res?.data?.data?.userName);
          setCName(res?.data?.data?.creatorAlias === null ? "" : res?.data?.data?.creatorAlias);
          setDImage(res.data.data?.displayImage === null || res.data.data?.displayImage === "" ? profileUser.src : BASE_Image_Url + res.data.data?.displayImage);
          setIsUserVerifyIden(res.data.data?.isVerifyIdentity);
          setFirst(false);
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
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : checing user name is exiest -----------------------------------------------------------------------------------------
  const IsAccessToSetUserName = () => {
    if (Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n")) {
      setLoading(true);
      if (First === false) {
        GetAuthUrl(SETTING_COMUNITY_USERNAME_VALIDATOR(UName)).then(
          (res, err) => {
            if (res && res.status === 200) {
              if (res?.data?.isSuccess) {
                // toast.success("Username is free");
                setLoading(false);
                handleChangeUserInfo()
              } else {
                toast.error(res?.data?.message);
                setLoading(false);
                setUName("");
              }
            } else {
              toast.error("something went wrong !");
              setLoading(false);
            }
          }
        );
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : validate User Name --------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n")) {
      const controller = new AbortController();
      const signal = controller.signal;
      if (UName.trim()) {
        clearTimeout(timer);
        const newTimer = setTimeout(() => {
          IsAccessToSetUserName();
        }, 500);
        setTimer(newTimer);
      } else {
        // setFoundArtists()
      }
      return () => {
        controller.abort();
      };
    }
  }, [UName]);
  // End -----------------------------------------------------------------------------------------------------------------------

  // update detail -------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (DName.trim()) {
      clearTimeout(timer);
      const newTimer = setTimeout(() => {
        handleChangeUserInfo();
      }, 500);
      setTimer(newTimer);
    } else {
      // setFoundArtists()
      setLoading(false);
    }
    return () => {
      controller.abort();
    };
  }, [DName]);
  // End -----------------------------------------------------------------------------------------------------------------------

  // update detail -------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (CName.trim()) {
      clearTimeout(timer);
      const newTimer = setTimeout(() => {
        handleChangeUserInfo();
      }, 500);
      setTimer(newTimer);
    } else {
      // setFoundArtists()
      setLoading(false);
    }
    return () => {
      controller.abort();
    };
  }, [CName]);
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : checing user name is exiest -----------------------------------------------------------------------------------------
  const handleChangeUserInfo = () => {
    if (First === false) {
      PutAuthUrl(EDIT_SETTING_COMUNITY_USERINFO, {
        "displayName": DName,
        "userName": UName,
        "creatorAlias": CName
      }).then(
        (res, err) => {
          if (res && res.status === 200) {
            if (res?.data?.isSuccess) {
              setLoading(false);
            } else {
              toast.error(res?.data?.message);
              setLoading(false);
            }
          } else {
            toast.error("something went wrong !");
            setLoading(false);
          }
        }
      );
    } else {
      setLoading(false);
    }
  }
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : REMOVE PROFILE -----------------------------------------------------------------------------------------
  const RemoveUswerProfile = () => {
    setUploading(true);
    GetAuthUrl(DELETE_USER_PROFILE).then(
      (res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            setDImage(profileUser.src);
            setUploading(false);
            setLoading(false);
          } else {
            toast.error(res?.data?.message);
            setLoading(false);
          }
        } else {
          toast.error("something went wrong !");
          setLoading(false);
        }
      }
    );
  }
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : Upload File ---------------------------------------------------------------------------------------------------------
  const UploadUserProfile = () => {
    setUploading(true);
    let File = new FormData();
    File.append("file", acceptedFiles[0]);

    PostAuthUrl(UPLOAD_FILE_USER,
      File
    ).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          ChangeUserProfile(res?.data?.data?.fullPath);
          setLoading(false);
          setError(false);
        } else {
          handleErrorUploadFile();
          toast.error(res?.data?.message);
          setLoading(false);
        }
      } else {
        toast.error("something went wrong !");
        setLoading(false);
      }
    });
  }
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : Chngae user profile -------------------------------------------------------------------------------------------------
  const ChangeUserProfile = (FullPath) => {
    PutAuthUrl(CHNAGE_USER_PROFILE + `/?ProfileImageName=${FullPath}`).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          Cookies.set("USER_PROFILE", res.data.data?.displayImage === null || res.data.data?.displayImage === "" ? profileUser.src : res.data.data?.displayImage)
          setDImage(res.data.data?.displayImage === null || res.data.data?.displayImage === "" ? profileUser.src : BASE_Image_Url + res.data.data?.displayImage);
          setError(false);
          setUploading(false);
          setLoading(false);
        } else {
          toast.error(res?.data?.message);
          setLoading(false);
        }
      } else {
        toast.error("something went wrong !");
        setLoading(false);
      }
    })
  }
  // End -----------------------------------------------------------------------------------------------------------------------

  const handleErrorUploadFile = (e) => {
    setError(true);
  };
  // End -----------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (acceptedFiles?.length >= 1) {
      UploadUserProfile();
    }
  }, [acceptedFiles]);
  // End -----------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (fileRejections?.length >= 1) {
      handleErrorUploadFile();
    }
  }, [fileRejections]);
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : starter -------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    GetUserInfo()
  }, [])
  // End -----------------------------------------------------------------------------------------------------------------------

  return (
    <Grid item>

      {/* NavBar Settings */}
      <NavSettings whereFrom={whereFrom} haveSaveChange={false} />

      <Grid
        container
        direction="row"
        justifyContent="center"
        className={Style.margin1}
      >
        {/* menu left side  */}
        <Grid item className={Style.leftSide}>
          <Menu whereFrom={whereFrom} SelectedPage="Community" />
        </Grid>

        {/* right side */}
        <Grid item className={Style.rightSide}>
          <Grid item className={Style.wrapper_right}>
            <Hidden smDown>
              <Grid item className={Style.text_userSetting}>
                Community
              </Grid>
            </Hidden>

            {/* Profile User */}
            <Grid item className={Style.displayText}>
              Display image
            </Grid>
            <Grid item style={{ marginTop: "18px" }}>
              <Grid container alignItems="center">
                <Grid item>
                  <Grid
                    item
                    style={{ height: "100px", position: "relative" }}
                    {...getRootProps({ className: "dropzone" })}
                  >
                    <input {...getInputProps()} />
                    <img style={{ filter: Uploading && "opacity(0.2)" }} src={DImage} className={Style.profileUser} />
                    {
                      Uploading ? (
                        <span className={Style.UploadingProfileSpan}>
                          <img
                            style={{ width: "27px", height: "10px" }}
                            src="/loadingUploading.svg"
                          />
                        </span>
                      ) : (
                        <></>
                      )
                    }
                  </Grid>
                </Grid>
                <Grid item style={{ marginLeft: "16px" }}>
                  <Grid
                    item
                    style={{ height: "35px" }}
                    {...getRootProps({ className: "dropzone" })}
                  >
                    <input {...getInputProps()} />
                    <Button
                      color="secondary"
                      variant="contained"
                      className={Style.uplButton}

                    >
                      Upload New
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      disabled={DImage === profileUser.src}
                      className={Style.removeBtn}
                      onClick={() => RemoveUswerProfile()}
                    >
                      Remove
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/*Forms */}



            <Grid
              container
              justifyContent="space-between"
              style={{ marginTop: "3px" }}
            >

              <Grid item className={Style.from_3}>
                <InputForm
                  // disabled={loading}
                  label="Display name"
                  placeHolder="Enter username"
                  value={DName}
                  setValue={setDName}
                  setCheckRequired={setCheckRequired}
                  validateFlag={CheckRequired}
                  schema={Joi.string()
                    .empty({ tlds: { allow: false } })
                    .messages({
                      "string.empty": `Display name is required`,
                    })}
                />
              </Grid>

              <Grid item className={Style.from_3}>
                <InputForm
                  label="Username"
                  placeHolder="Enter username"
                  Loading={loading}
                  value={UName}
                  setValue={setUName}
                  setCheckRequired={setCheckRequired}
                  validateFlag={CheckRequired}
                  schema={Joi.string()
                    .empty({ tlds: { allow: false } })
                    .messages({
                      "string.empty": `User name is required`,
                    })}
                />
              </Grid>

              <Grid item className={Style.from_3}>
                <InputForm
                  // disabled={loading}
                  label="Creator alias"
                  placeHolder="Enter creator alias"
                  value={CName}
                  setValue={setCName}
                  setCheckRequired={setCheckRequired}
                  validateFlag={CheckRequired}
                  schema={Joi.string()
                    .empty({ tlds: { allow: false } })
                    .messages({
                      "string.empty": `Creator alias is required`,
                    })}
                />
              </Grid>

            </Grid>



            {/*Account Statuse  */}
            {
              IsUserVerifyIden === false ? (
                <>
                  <Grid item className={Style.AccountSt}>
                    Account Statuse
                  </Grid>
                  <Grid item className={Style.bgUserInfo}>
                    <img src={false ? checkBlueSvg.src : infoSvg.src} className={Style.infoSvg} />
                    User has not yet verified their identity.{" "}
                  </Grid>
                </>
              ) : (
                <></>
              )
            }


            {/*Account Statuse  */}
            <Grid container alignItems="center" style={{ marginTop: "17px" }}>
              <Grid item className={Style.echoVerification}>
                Your identity verification is handled by{" "}
                <a className="link">Echo</a>
              </Grid>
              <Grid item className={Style.p_verifyButton}>
                {
                  IsUserVerifyIden === false ? (
                    <VerifyBtn />
                  ) : (
                    <></>
                  )
                }

                {/* <Button
                  variant="contained"
                  startIcon={<Image src={false ? instagramSvg : instagramVerifiedSvg} />}
                  color="secondary"
                  className={Style.btn_verify}
                >
                  Verify Instagram
                </Button> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid >
  );
}
