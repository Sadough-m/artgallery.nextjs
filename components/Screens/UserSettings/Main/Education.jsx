import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { uuid } from 'uuidv4';
import { Link } from "react-scroll";
import Joi from "joi";
import { ToastContainer, toast } from "react-toastify";

// good man : material ui ↓
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

// good man : styles ↓
import signUpStyle from "../../../../styles/signUp.module.css";
import styles from "../../../../styles/Home.module.css";

// good man : files ↓
import ArrowLeft from "../../../../public/images/icons/Arrow down.svg";

// good man : Component ↓
import InputForm from "../../../Forms/InputForm";
import CustomSelect from "../../../Forms/CustomSelect";
import Section from "./Items/EducationSection";
import Date from "../../../Forms/Date";

// mrx : setCookies with this
import Cookies from "js-cookie";

// mrx : api links ↓
import { VALIDATE_CV_BUILDER_EDUCATIONLOCAL } from "../../../../pages/api/index";

// mrx : api ↓
import {
  PostUrl,
  PostAuthUrl,
  GetUrl,
  GetAuthUrl,
} from "../../../../pages/api/config";

// mrx : context ↓
import { Context } from "../../../../context/index";

export default function Education({
  SelectInputData,
  Wrong,
  setWrong,
  EndCallEducation,
  setEndCallEducation
}) {
  // mrx : Education states ↓
  const [educationYear, seteducationYear] = useState("");
  const [educationDegreeType, seteducationDegreeType] = useState("");
  const [educationMajor, seteducationMajor] = useState("");
  const [educationInstitution, seteducationInstitution] = useState("");
  const [educationDepartment, seteducationDepartment] = useState("");
  const [educationHonors, seteducationHonors] = useState("");
  const [educationDissertation, seteducationDissertation] = useState("");
  const [CheckRequired, setCheckRequired] = useState(false);
  const [HaveData, setHaveData] = useState(false);
  const [LocalData, setLocalData] = useState([]);

  // mrx : context
  const {
    ISAllformsOK,
    setISAllformsOK,
    DataEdited,
    setDataEdited,
    Publishing,
    setPublishing,

    EducationEditData,
  } = useContext(Context);

  // validate from step 2
  useEffect(() => {
    validateEducation()
  }, [Wrong])

  useEffect(() => {
    if (DataEdited === true) {
      setLocalData(EducationEditData);
      setDataEdited(false);
    }
  }, [DataEdited]);

  // validate from step 2
  const validateEducation = () => {
    // checking if any input is fill
    if (
      educationYear?.length > 1 ||
      educationDegreeType?.length > 1 ||
      educationMajor?.length > 1 ||
      educationDepartment?.length > 1 ||
      educationHonors?.length > 1 ||
      educationDissertation?.length > 1 ||
      educationInstitution?.length > 1
    ) {

      // show the hint
      setCheckRequired(true);
      // mrx : if required value was not fill
      if (
        educationYear === "" ||
        educationDegreeType === "" ||
        educationMajor === "" ||
        educationInstitution === ""
      ) {
        // set Global state false
        setISAllformsOK(false);
      } else {
        // set Global state true
        setISAllformsOK(true);
        // hiddent the hint
        setCheckRequired(false);
        if (EndCallEducation === "true") {
          ValidateCvBuilderEducationLocal();
        } else {
          return
        }
      }
    } else {
      if (EndCallEducation === "true") {
        setEndCallEducation("next");
      } else {
        return
      }
    }
  }

  // step-2 education data
  const GET_ADDED_DATA = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("CreateCv-Eduction") || "[]"
      : "[]"
  );

  useEffect(() => {
    setLocalData(GET_ADDED_DATA);
  }, []);

  useEffect(() => {
    if (LocalData?.length) {
      setHaveData(true);
    } else {
      setHaveData(false);
      localStorage.setItem("CreateCv-Eduction", "[]");
    }
  }, [LocalData]);

  // mrx : update state for set in localstorage  ↓
  const handleSetLocalEduction = (data) => {
    setLocalData(data);
  };

  // mrx : set local data for eduction ↓
  useEffect(() => {
    localStorage.setItem("CreateCv-Eduction", JSON.stringify(LocalData));
  }, [LocalData]);

  useEffect(() => {
    if (Publishing === true) {
      setLocalData(GET_ADDED_DATA);
      setPublishing(false);
    }
  }, [Publishing]);

  // mrx : remove feild data / save it in local
  const handleAddAnother = (type) => {
    if (
      educationYear === "" ||
      educationDegreeType === "" ||
      educationMajor === "" ||
      educationInstitution === ""
    ) {
      if (type === "click") {
        toast.warning("Please fill the required values");
        setCheckRequired(true);
      } else {
        return "";
      }
    } else {
      setCheckRequired(false);
      ValidateCvBuilderEducationLocal();
    }
  };

  const ValidateCvBuilderEducationLocal = () => {
    PostAuthUrl(VALIDATE_CV_BUILDER_EDUCATIONLOCAL, {
      single: {
        isOpen: false,
        completionYear: educationYear,
        degreeTypeId: educationDegreeType,
        majorTypeId: educationMajor,
        departementId: educationDepartment ? educationDepartment : null,
        instutation: educationInstitution,
        cumLaudeAndOtherHonors: educationHonors,
        dissertationThesisTitleAndAdvisor: educationDissertation,
        completionYear: educationYear,
        completionYear: educationYear,
        isPublished: false,
      },
      models: LocalData,
    }).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          handleSetLocalEduction(res?.data?.data);
          // mrx : clear the items for new data
          seteducationYear("");
          seteducationDegreeType("");
          seteducationMajor("");
          seteducationInstitution("");
          seteducationDepartment("");
          seteducationHonors("");
          seteducationDissertation("");
          setEndCallEducation("next");
          // setSelectInputData(res?.data?.data);
        } else {
          handleSetLocalEduction(res?.data?.data === null ? [] : res?.data?.data);
          toast.error(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  };

  // useEffect(() => {
  //   if (EndCallEducation === "true" && CheckRequired === false) {
  //     ValidateCvBuilderEducationLocal();
  //   } else {
  //     return
  //   }
  // }, [EndCallEducation])


  return (
    <>
      <Grid
        container
        alignItems="center"
        direction="column"
        className={`${signUpStyle.box}`}
      >
        <span className={signUpStyle.obj_for_id} id="Education"></span>
        <Grid item className={`${signUpStyle.title}`}>
          Education
        </Grid>

        <Section
          setLocalData={() => setLocalData()}
          LocalData={LocalData}
          SelectInputData={SelectInputData}
          haveData={HaveData}
          title="Saved info"
        />

        <Grid item className={`${styles.w_100}`}>
          <Grid container className={`${styles.TwoForm}`}>
            <Grid item className={`${styles.TwoInput}`}>
              <Date
                placeHolder="Choose date"
                label="Completetion year"
                setValue={seteducationYear}
                Value={educationYear}
                validateFlag={CheckRequired}
              />
            </Grid>
            <Grid item className={`${styles.TwoInput}`}>
              <CustomSelect
                Data={SelectInputData?.degreeTypes}
                setValue={seteducationDegreeType}
                Value={educationDegreeType}
                label="Degree type"
                placeHolder="Choose an option"
                validateFlag={CheckRequired}
              />
            </Grid>
          </Grid>

          <Grid container className={`${styles.TwoForm}`}>
            <Grid item className={`${styles.TwoInput}`}>
              <CustomSelect
                label="Major"
                placeHolder="Choose one"
                setValue={seteducationMajor}
                Value={educationMajor}
                Data={SelectInputData?.majorTypes}
                validateFlag={CheckRequired}
              />
            </Grid>
            <Grid item className={`${styles.TwoInput}`}>
              <InputForm
                setCheckRequired={setCheckRequired}
                validateFlag={CheckRequired}
                schema={Joi.string()
                  .empty({ tlds: { allow: false } })
                  .messages({
                    "string.empty": `Institution is required`,
                    "any.required": `Institution is required`,
                  })}
                type="text"
                setValue={seteducationInstitution}
                value={educationInstitution}
                placeHolder="Search"
                label="Institution"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} className={`${styles.w_100}`}>
          <CustomSelect
            label="Department"
            placeHolder="Choose an option"
            Data={SelectInputData?.deptTypes}
            setValue={seteducationDepartment}
            Value={educationDepartment}
          />
        </Grid>

        <Grid item xs={12} className={`${styles.w_100}`}>
          <InputForm
            type="text"
            setValue={seteducationHonors}
            value={educationHonors}
            setCheckRequired={setCheckRequired}
            CheckRequired={CheckRequired}
            placeHolder="Write a title"
            label="Cum laude and other honors"
            schema={Joi.optional()}
          />
        </Grid>

        <Grid item xs={12} className={`${styles.w_100}`}>
          <InputForm
            type="text"
            setCheckRequired={setCheckRequired}
            CheckRequired={CheckRequired}
            setValue={seteducationDissertation}
            value={educationDissertation}
            placeHolder="Write a title"
            label="Dissertation/Thesis title and advisor"
            schema={Joi.optional()}
          />
        </Grid>

        <Grid item className={`${styles.w_100}`}>
          <Link to="Education" smooth={true} spy={true} duration={1000}>
            <Button
              startIcon={<AddCircleOutlineIcon />}
              variant="text"
              color="primary"
              onClick={() => handleAddAnother("click")}
            >
              <span className={`${styles.text__trs__none}`}>Add Another</span>
            </Button>
          </Link>
        </Grid>
      </Grid>
    </>
  );
}
