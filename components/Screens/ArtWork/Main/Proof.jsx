import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Joi from "joi";
import { ToastContainer, toast } from 'react-toastify';
import { uuid } from 'uuidv4';

// mrx : material ui ↓
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import styles from "../../../../styles/Home.module.css";

// mrx : Styles ↓
import ArtWorkFlowStyle from "../../../../styles/artworkflow.module.css";

// mrx : context ↓
import { Context } from "../../../../context/index";

// rmx : files  ↓
import arrowRight from "../../../../public/images/icons/Arrow right blue.svg";

// mrx : components ↓
import ProofItem from "../ProofItem";
import useWindowSize from "../../../../Hooks/useWindowSize";
import CustomSelect from "../../../Forms/CustomSelect";
import InputForm from "../../../Forms/InputForm";
import File from "../../../Forms/FileUploaderWithDrag";

export default function Proof({
  ProofDataFromSave,
  setProofDataFromSave,
  ProofFromSave,
  setProofFromSave,
  SelectInputData,
  setProofData
}) {
  // mrx : context
  const {
    ProofSectionData,
    setProofSectionData,
    setArrayList,

    // --- input states End ----
  } = useContext(Context);

  // get proof local data 
  const GET_PROOF_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("ArtWork-Proof") || "[]"
      : "[]"
  );

  const [width, heigh] = useWindowSize();
  // mrx : states →
  const [seeOtherProof, setSeeOtherProof] = useState(false);

  // change status of showing items in proof
  const handleSeeOtherProof = () => {
    setSeeOtherProof(!seeOtherProof);
  };

  const [CheckRequired, setCheckRequired] = useState(false);

  const [ProofCategoryID, setProofCategoryID] = useState(0);
  const [ProofPrivacyID, setProofPrivacyID] = useState(0);

  const [ProofTitle, setProofTitle] = useState("");
  const [ProofDescription, setProofDescription] = useState("");
  const [UploadingFileUrl, setUploadingFileUrl] = useState("");

  const handleClearForm = () => {
    setProofTitle("");
    setProofDescription("");
    setUploadingFileUrl("")
  };

  useEffect(() => {
    if (ProofFromSave === true) {
      handleAddNewProof()
    }
  }, [ProofFromSave])

  useEffect(() => {
    setProofDataFromSave({
      "ProofCategoryID": ProofCategoryID,
      "ProofPrivacyID": ProofPrivacyID,
      "ProofTitle": ProofTitle,
      "ProofDescription": ProofDescription,
      "UploadingFileUrl": UploadingFileUrl
    })
  }, [ProofCategoryID, ProofPrivacyID, ProofTitle, ProofDescription, UploadingFileUrl])

  const handleAddNewProof = () => {
    if (
      ProofDescription === ""
    ) {
      toast.warning("Please fill the required values");
      setCheckRequired(true);
      setProofFromSave(false);
    } else {
      setCheckRequired(false);
      handleClearForm();
      toast.success("Proof Added successfully");
      setProofSectionData(prev => [...prev, {
        "title": ProofTitle,
        "description": ProofDescription,
        "imageUrl": UploadingFileUrl ? UploadingFileUrl : "",
        "category": ProofCategoryID,
        "privacy": ProofPrivacyID,
        "Editing": false,
        "Save": false,
        "id": uuid(),
        "from": ProofFromSave
      }])
      // setProofFromSave(false);
    }
  }

  useEffect(() => {
    localStorage.setItem("ArtWork-Proof", JSON.stringify(ProofSectionData));
    setProofData(ProofSectionData);
  }, [ProofSectionData])

  useEffect(() => {
    setProofSectionData(GET_PROOF_DATA)
  }, [])

  return (
    <Grid item>
      <Grid
        container
        alignItems="center"
        direction="column"
        className={`${ArtWorkFlowStyle.box}`}
      >
        <span className={ArtWorkFlowStyle.obj_for_id} id="Proof"></span>
        <Grid item className={ArtWorkFlowStyle.titleAndBtn}>
          <Grid
            container
            justifyContent={width < 960 ? "center" : "space-between"}
            alignItems="center"
            direction={width < 960 ? "column" : "row"}
          >
            <Grid item className={`${ArtWorkFlowStyle.title}`}>
              Proof
            </Grid>
            {ProofSectionData?.length >= 1 && (
              <Grid item className={ArtWorkFlowStyle.P_buttonWithTitle}>
                <Button
                  color="primary"
                  variant="text"
                  endIcon={<Image src={arrowRight} />}
                  onClick={handleSeeOtherProof}
                >
                  See Other Proofs
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>

        {
          seeOtherProof === true ? (
            <>
              <Grid container direction="column" spacing={2}>
                <ProofItem
                  setArrayList={setArrayList}
                  seeOtherProof={seeOtherProof}
                  SelectInputData={SelectInputData}
                  setSeeOtherProof={setSeeOtherProof}
                  ProofSectionData={ProofSectionData}
                  setProofSectionData={setProofSectionData}
                />
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} className={`${styles.w_100}`}>
                <InputForm
                  label="Title"
                  placeHolder="Enter proof title"
                  setCheckRequired={setCheckRequired}
                  validateFlag={CheckRequired}
                  setValue={setProofTitle}
                  value={ProofTitle}
                  schema={Joi.optional()}
                />
              </Grid>

              <Grid item className={`${styles.w_100}`}>
                <Grid container className={`${styles.TwoForm}`}>
                  <Grid item className={`${styles.TwoInput}`}>
                    <CustomSelect
                      Data={SelectInputData?.proofCategory}
                      label="Category"
                      placeHolder="Choose one"
                      setValue={setProofCategoryID}
                      value={ProofCategoryID}
                      SelectName="Exhibition Or Fair"
                      setSelectName={setProofCategoryID}
                    />
                  </Grid>
                  <Grid item className={`${styles.TwoInput}`}>
                    <CustomSelect
                      Data={SelectInputData?.proofPrivacy}
                      label="Privacy"
                      placeHolder="Choose one"
                      setValue={setProofPrivacyID}
                      value={ProofPrivacyID}
                      SelectName="Hidden All"
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
                  setValue={setProofDescription}
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
                  setUploadingFileUrl={setUploadingFileUrl}
                  setUploadingFileUrl2={setUploadingFileUrl}
                />
              </Grid>
            </>
          )
        }

        {
          seeOtherProof === false && (
            <Grid item className={ArtWorkFlowStyle.P_checkBox1} >
              <Button
                startIcon={<AddCircleOutlineIcon />}
                color="primary"
                onClick={() => handleAddNewProof()}
              >
                Add New Proof
              </Button>
            </Grid>
          )
        }
      </Grid>
    </Grid>
  );
}
