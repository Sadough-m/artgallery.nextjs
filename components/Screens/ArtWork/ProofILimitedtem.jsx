import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import Joi from "joi";
import { ToastContainer, toast } from 'react-toastify';

// good man : material ui ↓
import { Button, Grid, IconButton } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

// good man : styles ↓
import styles from "../../../styles/Home.module.css";
import ArtWorkFlowStyle from "../../../styles/artworkflow.module.css";

// good man : files ↓
import editIcon from "../../../public/images/icons/Edit.svg";
import arrowDown from "../../../public/images/icons/Arrow down black.svg";
import arrowUp from "../../../public/images/icons/Arrow Up.svg";
import check from "../../../public/images/icons/Check blue.svg";
import checkGray from "../../../public/images/icons/Check gray.svg";
import removeIcon from "../../../public/images/icons/Remove red.svg";

// good man : components ↓
import CustomSelect from "../../Forms/CustomSelect";
import InputForm from "../../Forms/InputForm";
import File from "../../Forms/FileUploaderWithDrag";


// mrx : context ↓
import { Context } from "../../../context/index";

export default function ProofItem({
  seeOtherProof,
  setSeeOtherProof,
  SelectInputData,
  setProofSectionData,
  ProofSectionData
}) {

  // mrx : context Data Start ------------------------------------------------------------------------------------
  const {
    SignleItemId,
    setShowDisOrSaveLimited
  } = useContext(Context);
  // mrx : End ----------------------------------------------------------------------------------------------------

  // good man : states ↓
  const [Edit, setEdit] = useState(false);
  const [Changes, setChanges] = useState(false);
  const [Delete, setDelete] = useState(false);

  const [CheckRequired, setCheckRequired] = useState(false);

  const [ProofCategoryID, setProofCategoryID] = useState(0);
  const [SelectedData, setSelectedData] = useState([]);

  const [ProofPrivacyID, setProofPrivacyID] = useState(0);

  const [ProofTitle, setProofTitle] = useState("");
  const [ProofDescription, setProofDescription] = useState("");
  const [UploadingFileUrl, setUploadingFileUrl] = useState("");

  // editing proof by id ( shoing the form  )
  const handleShowForm = (ID, EditingSt, Data) => {
    setProofSectionData(
      ProofSectionData &&
      ProofSectionData?.map((Item) => {
        if (Item?.id === ID) {
          return { ...Item, Editing: !EditingSt };
        }
        return Item;
      })
    );

    setProofCategoryID(Data?.category);
    setProofPrivacyID(Data?.privacy);
    setProofTitle(Data?.title);
    setProofDescription(Data?.description);
    setUploadingFileUrl(Data?.imageUrl);
  };

  // handle edit form
  const handleChangeForm = (ID, Data) => {
    if (ProofDescription === "") {
      toast.warning("Please enter proof description");
    } else {
      setProofSectionData(
        ProofSectionData &&
        ProofSectionData?.map((Item) => {
          if (Item?.id === ID) {
            return {
              ...Item,
              "title": ProofTitle,
              "description": ProofDescription,
              "imageUrl": UploadingFileUrl ? UploadingFileUrl : "",
              "category": ProofCategoryID,
              "privacy": ProofPrivacyID,
              "Editing": false,
              "Save": false,
            };
          }
          return Item;
        })
      );
      toast.success("Proof Saved successfully");
    }
  };

  const hadnleChangeDescription = (e, Data) => {
    setProofDescription(e);
    if (e !== Data?.description) {
      setProofSectionData(
        ProofSectionData &&
        ProofSectionData?.map((Item) => {
          if (Item?.id === Data?.id) {
            return { ...Item, Save: true };
          }
          return Item;
        })
      );
    } else {
      setProofSectionData(
        ProofSectionData &&
        ProofSectionData?.map((Item) => {
          if (Item?.id === Data?.id) {
            return { ...Item, Save: false };
          }
          return Item;
        })
      );
    }
  }

  // delete item
  const handleDeleteProof = (ID) => {
    setShowDisOrSaveLimited(true);
    setProofSectionData(
      ProofSectionData?.filter((Item) => Item?.id !== ID)
    );
    if (ProofSectionData?.filter((item) => item?.LimitedID === SignleItemId)?.length === 1) {
      setSeeOtherProof(false);
    }
  };

  // return startIcon of edit button
  const handleStartIcon = (Data) => {
    if (!Data?.Save) {
      if (Data?.Editing) {
        return checkGray;
      } else {
        return editIcon;
      }
    } else if (Data?.Save) {
      return check;
    }
  };

  const hadnleChangeTitle = (e, Data) => {
    setProofTitle(e);
    if (e !== Data?.title) {
      setProofSectionData(
        ProofSectionData &&
        ProofSectionData?.map((Item) => {
          if (Item?.id === Data?.id) {
            return { ...Item, Save: true };
          }
          return Item;
        })
      );
    } else {
      setProofSectionData(
        ProofSectionData &&
        ProofSectionData?.map((Item) => {
          if (Item?.id === Data?.id) {
            return { ...Item, Save: false };
          }
          return Item;
        })
      );
    }
  }

  const hadnleChangeProofCategory = (e, Data) => {
    setProofCategoryID(e);
    if (e !== Data?.category) {
      setProofSectionData(
        ProofSectionData &&
        ProofSectionData?.map((Item) => {
          if (Item?.id === Data?.id) {
            return { ...Item, Save: true };
          }
          return Item;
        })
      );
    } else {
      setProofSectionData(
        ProofSectionData &&
        ProofSectionData?.map((Item) => {
          if (Item?.id === Data?.id) {
            return { ...Item, Save: false };
          }
          return Item;
        })
      );
    }
  }

  const hadnleChangeProofPrivacy = (e, Data) => {
    setProofPrivacyID(e);
    if (e !== Data?.privacy) {
      setProofSectionData(
        ProofSectionData &&
        ProofSectionData?.map((Item) => {
          if (Item?.id === Data?.id) {
            return { ...Item, Save: true };
          }
          return Item;
        })
      );
    } else {
      setProofSectionData(
        ProofSectionData &&
        ProofSectionData?.map((Item) => {
          if (Item?.id === Data?.id) {
            return { ...Item, Save: false };
          }
          return Item;
        })
      );
    }
  }

  useEffect(() => {
    setProofSectionData(
      ProofSectionData &&
      ProofSectionData?.map((Item) => {
        if (Item?.id === SelectedData?.id) {
          return { ...Item, imageUrl: UploadingFileUrl };
        }
        return Item;
      })
    );
    setProofSectionData(
      ProofSectionData &&
      ProofSectionData?.map((Item) => {
        if (Item?.id === SelectedData?.id) {
          return { ...Item, Save: true };
        }
        return Item;
      })
    );
  }, [SelectedData])

  return (
    <>
      {ProofSectionData &&
        ProofSectionData?.filter((item) => item?.LimitedID === SignleItemId)?.map((item, index) => (
          <Grid item key={index}>
            {seeOtherProof && (
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                className={ArtWorkFlowStyle.p_proofItems}
              >
                <Grid item className="fs_14 fw_500">
                  Proof # {index + 1}
                </Grid>
                <Grid item>
                  <IconButton size="small" onClick={() => handleDeleteProof(item?.id)}>
                    <Image src={removeIcon} />
                  </IconButton>
                  <Button
                    color={!item?.Editing || Changes ? "primary" : item?.Save ? "primary" : "default"}
                    variant="text"
                    startIcon={<Image src={handleStartIcon(item)} />}
                    endIcon={<Image src={item?.Editing ? arrowUp : arrowDown} />}
                    onClick={() => !item?.Save ? handleShowForm(item?.id, item?.Editing, item) : handleChangeForm(item?.id, item)}
                  >
                    {!item?.Save ? item?.Editing ? "Save" : "Edit" : "Save"}
                  </Button>
                </Grid>
              </Grid>
            )}


            {/* adding form */}
            {(item?.Editing || !seeOtherProof) && (
              <Grid item className={item?.Editing ? ArtWorkFlowStyle.p_items_proof : ""}>
                <Grid item xs={12} className={`${styles.w_100}`}>
                  <InputForm
                    label="Title"
                    placeHolder="Enter proof title"
                    setCheckRequired={setCheckRequired}
                    validateFlag={CheckRequired}
                    setValue={(e) => hadnleChangeTitle(e, item)}
                    onChange={() => setShowDisOrSaveLimited(true)}
                    value={ProofTitle}
                    schema={Joi.string()
                      .empty({ tlds: { allow: false } })
                      .messages({
                        "string.empty": `title is required`,
                        "any.required": `title is required`,
                      })}
                  />
                </Grid>

                <Grid item className={`${styles.w_100}`}>
                  <Grid container className={`${styles.TwoForm}`}>
                    <Grid item className={`${styles.TwoInput}`}>
                      <CustomSelect
                        Data={SelectInputData?.proofCategory}
                        label="Category"
                        onChange={() => setShowDisOrSaveLimited(true)}
                        placeHolder="Choose one"
                        setValue={(e) => hadnleChangeProofCategory(e, item)}
                        value={ProofCategoryID}
                        SelectName={SelectInputData?.proofCategory?.filter(item => item?.id === ProofCategoryID).map(item => (item?.name))}
                        setSelectName={setProofCategoryID}
                      />
                    </Grid>
                    <Grid item className={`${styles.TwoInput}`}>
                      <CustomSelect
                        Data={SelectInputData?.proofPrivacy}
                        label="Privacy"
                        onChange={() => setShowDisOrSaveLimited(true)}
                        placeHolder="Choose one"
                        setValue={(e) => hadnleChangeProofPrivacy(e, item)}
                        value={ProofPrivacyID}
                        SelectName={SelectInputData?.proofPrivacy?.filter(item => item?.id === ProofPrivacyID).map(item => (item?.name))}
                        setSelectName={setProofPrivacyID}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} className={`${styles.w_100}`}>
                  <InputForm
                    label="Description"
                    placeHolder="Write prood description here"
                    setCheckRequired={setCheckRequired}
                    validateFlag={CheckRequired}
                    onChange={() => setShowDisOrSaveLimited(true)}
                    setValue={(e) => hadnleChangeDescription(e, item)}
                    value={ProofDescription}
                    schema={Joi.string()
                      .empty({ tlds: { allow: false } })
                      .messages({
                        "string.empty": `Description is required`,
                        "any.required": `Description is required`,
                      })}
                  />
                </Grid>
                <Grid item xs={12} className={`${styles.w_100}`}>
                  <File
                    label="Image"
                    placeHolder="Import images here"
                    UploadingFileUrl={UploadingFileUrl}
                    setUploadingFileUrl2={() => setSelectedData(item)}
                    setUploadingFileUrl={setUploadingFileUrl}
                    SelectName={true}
                  />
                </Grid>
              </Grid>
            )}
          </Grid>
        ))}
      {
        seeOtherProof === true && (
          <Grid item className={ArtWorkFlowStyle.P_checkBox1} >
            <Button
              startIcon={<AddCircleOutlineIcon />}
              color="primary"
              onClick={() => setSeeOtherProof(false)}
            >
              Add New Proof
            </Button>
          </Grid>
        )
      }
    </>
  );
}
