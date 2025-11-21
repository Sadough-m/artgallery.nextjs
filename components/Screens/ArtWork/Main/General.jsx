import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Joi from "joi";

// mrx : material ui ↓
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

// mrx : Styles ↓
import ArtWorkFlowStyle from "../../../../styles/artworkflow.module.css";
import styles from "../../../../styles/Home.module.css";

// rmx : files  ↓
import loadingPic from "../../../../public/images/icons/Loading.svg";
import remove from "../../../../public/images/icons/Remove.svg";
import LoadingSpinerSvg from "../../../../public/loading.svg";

// mrx : context ↓
import { Context } from "../../../../context/index";

// mrx : components ↓
import InputForm from "../../../Forms/InputForm";
import TypingArtistFound from "../StatusCreateArtist/Found";
import NotFound from "../StatusCreateArtist/NotFound";
import TextArea from "../../../Forms/TextArea";
import Added from "../StatusCreateArtist/Added";
import { toast } from "react-toastify";

// mrx : setCookies with this
import Cookies from "js-cookie";

// mrx : api links ↓
import { SEARCH_ADD_ARTWORK } from "../../../../pages/api/index";

// mrx : api ↓
import {
  PostUrl,
  PostAuthUrl,
  GetUrl,
  GetAuthUrl,
} from "../../../../pages/api/config";
import { ClickAwayListener } from "@material-ui/core";

export default function General({
  ShowError,
  setShowError,
  SelectInputData
}) {
  // mrx : context
  const {
    GeneralFiilled,
    setGeneralFiilled,
    // --- input states Start ----
    AddedArtistList,
    setAddedArtistList,
    GeneralTitle,
    setGeneralTitle,
    GeneralCreationyear,
    setHaveDefultArtist,
    setGeneralCreationyear,
    GeneralDescription,
    setGeneralDescription
    // --- input states End ----
  } = useContext(Context);

  // mrx : states ↓
  // mrx : shoing new description 
  const [AddDescription, setAddDescription] = useState(true);
  const [CheckRequired, setCheckRequired] = useState(false);
  const [FocusInput, setFocusInput] = useState(false);

  // seacrh state ↓
  const [SearchInput, setSearchInput] = useState("");
  const [timer, setTimer] = useState(null);
  const [typing, settyping] = useState("");
  const [SearchResult, setSearchResult] = useState([]);
  const [ResultNotFound, setResultNotFound] = useState(false);
  const [ShowHandle, setShowHandle] = useState(false);

  // handle GET data in local storage ( start )
  useEffect(() => {
    setAddedArtistList(JSON.parse(typeof window !== "undefined" ? localStorage.getItem("Add-Artwork-ArtistList") || "[]" : "[]"))
    setGeneralTitle(typeof window !== "undefined" ? localStorage.getItem("Add-Artwork-GeneralTitle") || "" : "")
    setGeneralDescription(typeof window !== "undefined" ? localStorage.getItem("Add-Artwork-GeneralDescription") || "" : "")
    setGeneralCreationyear(typeof window !== "undefined" ? localStorage.getItem("Add-Artwork-GeneralCreationyear") || "" : "")
  }, [])
  // handle GET data in local storage ( end )

  useEffect(() => {
    if (ShowError === true) {
      setCheckRequired(true);
    } else {
      setCheckRequired(false);
    }
  }, [ShowError])

  // handle add data in local storage ( start )
  useEffect(() => {
    localStorage.setItem("Add-Artwork-ArtistList", JSON.stringify(AddedArtistList));
  }, [AddedArtistList])

  useEffect(() => {
    localStorage.setItem("Add-Artwork-GeneralTitle", GeneralTitle);
  }, [GeneralTitle])

  useEffect(() => {
    localStorage.setItem("Add-Artwork-GeneralDescription", GeneralDescription);
  }, [GeneralDescription])

  useEffect(() => {
    if (GeneralCreationyear?.length > 4) {
      toast.warning("Creation year must be only 4 character")
    }
    localStorage.setItem("Add-Artwork-GeneralCreationyear", GeneralCreationyear);
  }, [GeneralCreationyear])
  // handle add data in local storage ( end )

  // mrx : changing description value to empty
  useEffect(() => {
    if (AddDescription === true) {
      setGeneralDescription("");
    }
  }, [AddDescription])

  const inputChanged = () => {
    settyping(true);
    clearTimeout(timer)

    const newTimer = setTimeout(() => {
      handleSearch();
      settyping(false);
    }, 500)

    setTimer(newTimer)
  }

  useEffect(() => {
    if (SearchInput !== "") {
      inputChanged();
    }
  }, [SearchInput])

  const handleSearch = () => {
    setShowHandle(true);
    PostAuthUrl(SEARCH_ADD_ARTWORK(SearchInput, localStorage.getItem("collectionId")), {
      "addedData": AddedArtistList?.map((item) => item?.id)
    }).then(
      (res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            setSearchResult(res.data.data);
            setResultNotFound(false);
          } else {
            setResultNotFound(true);
            setSearchResult([]);
          }
        } else {
          toast.error("something went wrong !");
        }
      }
    );
  }

  // mrx: functions
  const handleAddArtist = (Item) => {
    if (AddedArtistList?.filter(item => item?.id === Item?.id).length >= 1) {
      toast.warning("This Artist is in your list");
    } else {
      setSearchInput("");
      setShowHandle(false);
      setAddedArtistList(prev => [...prev, {
        "id": Item?.id,
        "name": Item?.firstName + " " + Item?.lastName,
        "image": Item?.profileImage,
      }]);
      setSearchResult([]);
    }
  }

  const handleRemove = (ID) => {
    setShowHandle(false);
    setAddedArtistList(AddedArtistList?.filter(item => item?.id !== ID));
    setSearchResult([]);
  }

  useEffect(() => {
    if (SelectInputData?.addDefaultArtist === true) {
      if (!AddedArtistList?.filter((item) => item?.id === SelectInputData?.artistId)?.length >= 1) {
        setAddedArtistList(prev => [...prev, {
          "id": SelectInputData?.artistId,
          "name": SelectInputData?.artistName,
          "image": SelectInputData?.artistPicUrl,
        }]);
      }
    }
  }, [SelectInputData])

  useEffect(() => {
    if (FocusInput === false) {
      setSearchInput("");
      setSearchResult([])
    }
  }, [FocusInput])

  return (
    <Grid item>
      <Grid
        container
        alignItems="center"
        direction="column"
        className={`${ArtWorkFlowStyle.box}`}
      >
        <span className={ArtWorkFlowStyle.obj_for_id} id="General"></span>

        <Grid item className={`${ArtWorkFlowStyle.title}`}>
          General
        </Grid>
        <ClickAwayListener onClickAway={() => setFocusInput(false)}>
          <Grid item xs={12} className={ArtWorkFlowStyle.P_InputGeneral} onClick={() => setFocusInput(true)}>
            <InputForm
              type="text"
              placeHolder="Select or type artist name"
              label="Artist"
              schema={Joi.optional()}
              setValue={setSearchInput}
              value={SearchInput}
            >
              {
                typing === true && (
                  <Grid item className={styles.imageInsideForm}>
                    <Image
                      src={loadingPic}
                      width={"20px"}
                      height={"20px"}
                      className={styles.rotateAnim}
                    />
                  </Grid>
                )
              }
            </InputForm>

            {/* mrx : no result section */}
            {FocusInput && ResultNotFound === true && SearchInput !== "" && ShowHandle === true && (
              <Grid item xs={12} className={ArtWorkFlowStyle.bg_userFinder}>
                <Grid className={ArtWorkFlowStyle.MaiItemInModal_New}>
                  <NotFound />
                </Grid>
              </Grid>
            )}

            {/* mrx : search result list  */}
            {FocusInput && ResultNotFound === false && SearchResult?.length >= 1 && ShowHandle === true && (
              <Grid item xs={12} className={ArtWorkFlowStyle.bg_userFinder}>
                {SearchResult?.map((Item, index) => (
                  <Grid key={index} className={ArtWorkFlowStyle.MaiItemInModal_New}>
                    <TypingArtistFound
                      Item={Item}
                      handleAddArtist={handleAddArtist}
                      AddedArtistList={AddedArtistList}
                      setAddedArtistList={setAddedArtistList}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </ClickAwayListener>

        {
          !SelectInputData?.addDefaultArtist && SelectInputData?.addDefaultArtist !== false ? (
            <Image height="60" src={LoadingSpinerSvg} />
          ) : (
            <></>
          )
        }

        {/* mrx : added artist List */}
        {AddedArtistList?.map((Item, index) => (
          <Added
            key={index}
            locked={false}
            handleRemove={handleRemove}
            SelectInputData={SelectInputData}
            Item={Item}
          />
        ))}

        <Grid item className={`${styles.w_100}`}>
          <Grid container className={`${styles.TwoForm}`}>

            <Grid item className={`${styles.TwoInput}`}>
              <InputForm
                setCheckRequired={setCheckRequired}
                validateFlag={CheckRequired}
                setValue={setGeneralTitle}
                value={GeneralTitle}
                type="text"
                label="Title"
                schema={Joi.string()
                  .empty({ tlds: { allow: false } })
                  .messages({
                    "string.empty": `artwork title is required`,
                    "any.required": `artwork title is required`,
                  })}
                placeHolder="Enter artwork title"
              />
            </Grid>

            <Grid item className={`${styles.TwoInput}`}>
              <InputForm
                setCheckRequired={setCheckRequired}
                validateFlag={CheckRequired}
                setValue={setGeneralCreationyear}
                value={GeneralCreationyear}
                type="number"
                placeHolder="Enter your Creation year"
                label="Creation year"
                schema={Joi.string()
                  .empty({ tlds: { allow: false } })
                  .messages({
                    "string.empty": `Creation year is required`,
                    "any.required": `Creation year is required`,
                  })}
              />
            </Grid>

          </Grid>
        </Grid>
        <Grid item className={styles.w_100}>
          <Button
            onClick={() => setAddDescription(!AddDescription)}
            startIcon={
              AddDescription ? <AddCircleOutlineIcon /> : <Image src={remove} />
            }
            variant="text"
            color="primary"
          >
            {AddDescription ? "Add Description" : "Remove Description"}
          </Button>
        </Grid>
        {!AddDescription && (
          <Grid item className={styles.w_100}>
            <TextArea
              label="Description"
              placeHolder="Write artwork description here"
              schema={Joi.optional()}
              setValue={setGeneralDescription}
              value={GeneralDescription}
            />
          </Grid>
        )}
      </Grid>
    </Grid >
  );
}
