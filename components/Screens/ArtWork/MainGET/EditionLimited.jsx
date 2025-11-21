import React, { useState, useEffect, useContext } from "react";
import Joi from "joi";
import { ToastContainer, toast } from "react-toastify";
import { uuid } from 'uuidv4';

// mrx : material ui ↓
import { Button, Grid } from "@material-ui/core";

// mrx : context ↓
import { Context } from "../../../../context/index";

// mrx : Styles ↓
import ArtWorkFlowStyle from "../../../../styles/artworkflow.module.css";
import styles from "../../../../styles/Home.module.css";

// rmx : files  ↓
import magic from "../../../../public/images/icons/Magic.svg";
import Image from "next/image";

// mrx : components ↓
import InputForm from "../../../Forms/InputForm";
import CustomCheckBox from "../../../Forms/CustomCheckBox";
import TableEdition from "../TableEditionLimited";
import SmartPricingModal from "../../../Modals/ArtWork/SmartPricing";
import useWindowSize from "../../../../Hooks/useWindowSize";
import Mpi from "./Mpi";
import MeasurmentPrice from "./MeasurmentPrice";

// mrx : setCookies with this
import Cookies from "js-cookie";

// mrx : api links ↓
import { GET_EDITION_WORKS } from "../../../../pages/api/index";

// mrx : api ↓
import {
  PostUrl,
  PostAuthUrl,
  GetUrl,
  GetAuthUrl,
} from "../../../../pages/api/config";

export default function Edition({
  AllData,
  setEditionSizeData,
  Editions,
  GetData = [],
  EditAll = false,
  setEditAll,
  is_inside = false,
  SelectInputData,
  EditionList,
  setEditionList,
  HanldeEDeleteLocalEditions,
  setAllSamePrise,
  AllSamePrise
}) {
  const GET_ADDED_DATA = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("ArtWork-Editions") || '[]' : '[]');
  const GET_ADDED_DATA_VALUES = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("ArtWork-Editions-Values") || '[]' : '[]');

  // GET EDITIONS FROM LOCAL STORAGE -------------------------------------------------------------------------------------------
  const GET_EDITIONS = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("ArtWork-Editions-Media") || '[]' : '[]');
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : context
  const {
    setAllEditionsChanges,
    setAllEditions,
    AllEditions,
    AllMesurmentsData,
    setAllMesurmentsData,
    setShowDisOrSaveLimited,
    setUpdateMediaLimited,
    setNewEditions,
    SelectedTypeID
  } = useContext(Context);

  // mrx : state ->
  const [modal, setModal] = useState(false);
  const [table, setTable] = useState(false);

  const [CheckRequired, setCheckRequired] = useState(false);

  const [Availableworks, setAvailableworks] = useState(GET_ADDED_DATA_VALUES?.Availableworks);
  const [Editionsize, setEditionsize] = useState(GET_ADDED_DATA_VALUES?.Editionsize);
  const [LocalData, setLocalData] = useState(GET_ADDED_DATA);
  const [LocalValues, setLocalValues] = useState(GET_ADDED_DATA_VALUES);
  const [Medias, setMedias] = useState([]);

  useEffect(() => {
    setAvailableworks(Editions?.editionWorks)
    setEditionsize(Editions?.editionSize)
  }, [Editions])

  useEffect(() => {
    localStorage.setItem("ArtWork-Editions", JSON.stringify(LocalData));
    setAllMesurmentsData(LocalData);
    // localStorage.setItem("ArtWork-Editions-Media", JSON.stringify(
    //   LocalData?.map((item) => (
    //     {
    //       "editionNumber": parseInt(item?.editionNumber),
    //       "mediaSort": [],
    //       "medias": []
    //     }
    //   ))
    // ));

    if (!LocalData?.length) {
      setLocalValues({
        "Availableworks": "",
        "Editionsize": ""
      })
    }
    setAllEditionsChanges(LocalData);
  }, [LocalData]);

  useEffect(() => {
    localStorage.setItem("ArtWork-SameMeida-CheckBox", AllEditions);
  }, [AllEditions])

  useEffect(() => {
    localStorage.setItem("ArtWork-Editions-Values", JSON.stringify(LocalValues));
  }, [LocalValues]);

  // detect size
  const [width, heigh] = useWindowSize();

  // open and close modal smart pricing
  const handleModal = () => {
    setModal(!modal);
  };

  // create Table
  const handleTable = () => {
    setTable(!table);
  };

  useEffect(() => {
    setLocalValues({
      "Availableworks": Availableworks,
      "Editionsize": Editionsize
    })
  }, [Availableworks])

  useEffect(() => {
    setLocalValues({
      "Availableworks": Availableworks,
      "Editionsize": Editionsize
    })
    setEditionSizeData(Editionsize)
  }, [Editionsize])

  const handleGetAvailableworks = () => {
    if (
      Availableworks === "" ||
      Editionsize === ""
    ) {
      setCheckRequired(true);
      toast.warning("please fill the required values");
    } else {
      GetAuthUrl(GET_EDITION_WORKS(Availableworks, Editionsize)).then((res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            setNewEditions(res?.data?.data?.map((item) => (
              {
                "size_Width": 0,
                "size_Height": 0,
                "size_Depth": 0,
                "size_Unit":
                  SelectedTypeID === 0 ?
                    SelectInputData?.digitalSizeUints?.map((item) => item?.id)[0]
                    :
                    SelectInputData?.physicalSizeUints?.map((item) => item?.id)[0]
                ,
                "haveFrame": false,
                "haveWeight": false,
                "frame_Size_Width": 0,
                "frame_Size_Height": 0,
                "frame_Size_Depth": 0,
                "frame_Size_Unit": uuid(),
                "weigh": 0,
                "weigh_Unit": uuid(),
                "type": 0,
                "editionNumber": item,
                "id": uuid()
              }
            )))
            setUpdateMediaLimited(true);
            setLocalData(res?.data?.data?.map((item) => (
              {
                "size_Width": 0,
                "size_Height": 0,
                "size_Depth": 0,
                "size_Unit":
                  SelectedTypeID === 0 ?
                    SelectInputData?.digitalSizeUints?.map((item) => item?.id)[0]
                    :
                    SelectInputData?.physicalSizeUints?.map((item) => item?.id)[0]
                ,
                "haveFrame": false,
                "haveWeight": false,
                "frame_Size_Width": 0,
                "frame_Size_Height": 0,
                "frame_Size_Depth": 0,
                "frame_Size_Unit": uuid(),
                "weigh": 0,
                "weigh_Unit": uuid(),
                "type": 0,
                "editionNumber": item,
                "id": uuid()
              }
            )))
            setMedias(res?.data?.data?.map((item, index) => ({
              "editionNumber": parseInt(item),
              "mediaSort": "[]",
              "medias": []
            })))
            setMedias(prev => [...prev, {
              "editionNumber": parseInt(0),
              "mediaSort": "[]",
              "medias": []
            }])
          } else {
            toast.error(res?.data?.message);
          }
        } else {
          toast.error("something went wrong !");
        }
      });
    }
  }

  return (
    <Grid item className="w_100">
      <Grid
        container
        alignItems="center"
        direction="column"
        className={
          is_inside ? ArtWorkFlowStyle.titleEditions1 : ArtWorkFlowStyle.box
        }
      >
        <span className={ArtWorkFlowStyle.obj_for_id} id="Editions"></span>

        <Grid item className={ArtWorkFlowStyle.titleAndButton}>
          <Grid container justifyContent="space-between">
            <Grid item className={`${ArtWorkFlowStyle.title}`}>
              Editions
            </Grid>
            {table && (
              <Grid item className={ArtWorkFlowStyle.P_smPricing}>
                <Button
                  color="primary"
                  startIcon={<Image src={magic} />}
                  className={styles.fs_14}
                  onClick={handleModal}
                >
                  Smart Pricing
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>

        <Grid container className={`${styles.TwoForm}`}>
          <Grid item className={`${styles.TwoInput}`}>
            <InputForm
              type="number"
              placeHolder="Ex. 30"
              label="Edition size"
              setCheckRequired={setCheckRequired}
              validateFlag={CheckRequired}
              schema={Joi.string()
                .empty({ tlds: { allow: false } })
                .messages({
                  "string.empty": `Edition size is required`,
                })}
              setValue={setEditionsize}
              value={Editionsize}
              disabled={EditAll}
            />
          </Grid>
          <Grid item className={`${styles.TwoInput}`}>
            <InputForm
              type="text"
              placeHolder="Ex. 1, 3, 12, 15"
              label="Available works"
              setCheckRequired={setCheckRequired}
              validateFlag={CheckRequired}
              schema={Joi.string()
                .empty({ tlds: { allow: false } })
                .messages({
                  "string.empty": `Available works is required`,
                })}
              setValue={setAvailableworks}
              disabled={EditAll}
              value={Availableworks}
            />
          </Grid>
        </Grid>
        {!table && EditAll === false && (
          <Grid item className={`${styles.w_100} ${styles.m_t10}`}>
            <Grid container alignItems="center" justifyContent="space-between">
              {
                LocalData?.length !== 1 && (
                  <Grid item className={ArtWorkFlowStyle.CheckBox_edition}>
                    <Grid container alignItems="center">
                      <Grid item>
                        <CustomCheckBox
                          label="All editions with same"
                          checked={AllSamePriseAllEditions}
                          setChecked={setAllSamePrise}
                        />
                      </Grid>
                      <Grid item className={ArtWorkFlowStyle.txt_size}>
                        Size & Pricing?
                      </Grid>
                    </Grid>
                  </Grid>
                )
              }
            </Grid>
          </Grid>
        )}

        {!table && EditAll === false && (
          <Grid item className={ArtWorkFlowStyle.btnCreate}>
            <Button
              variant="contained"
              color="primary"
              className={styles.br_8}
              onClick={() => { handleGetAvailableworks(); setShowDisOrSaveLimited(true) }}
            >
              Create
            </Button>
          </Grid>
        )}

        {table || EditAll === true && (
          <Grid item className="w_100">
            <TableEdition
              EditionList={EditionList}
              setEditionList={setEditionList}
              TableData={GetData}
              AllData={AllData}
              setEditAll={setEditAll}
              EditAll={EditAll}
              HanldeEDeleteLocalEditions={HanldeEDeleteLocalEditions}
            />
          </Grid>
        )}

        {/* if there was one item show this item */}
        {
          LocalData?.length === 1 && EditAll === false && (
            LocalData && LocalData?.map((item, index) =>
              <Mpi
                key={index}
                LocalData={LocalData}
                setLocalData={setLocalData}
                Data={item}
                SelectInputData={SelectInputData}
              />
            )
          )
        }

        {
          LocalData?.length > 1 && EditAll === false && (
            LocalData && LocalData?.map((item, index) =>
              <MeasurmentPrice
                key={index}
                disabled={AllEditions ? index !== 0 : false}
                num={item?.editionNumber}
                LocalData={LocalData}
                setLocalData={setLocalData}
                Data={item}
                SelectInputData={SelectInputData}
              />
            )
          )
        }
      </Grid>
      <SmartPricingModal openModal={modal} handleModal={handleModal} />
    </Grid>
  );
}
