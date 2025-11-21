import React, { useState, useEffect, useContext } from "react";
import Joi from "joi";
import { ToastContainer, toast } from "react-toastify";
import { uuid } from 'uuidv4';

// gm : material ui ↓
import {
  Button,
  Fade,
  Grid,
  Hidden,
  IconButton,
  Modal,
} from "@material-ui/core";
import { StylesContext } from "@material-ui/styles";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";

// gm : styles ↓
import style from "../../../styles/Home.module.css";

// gm : files ↓
import closeIcon from "../../../public/images/icons/Close12.svg";
import checkCricle from "../../../public/images/icons/Check - Circle gray.svg";
import artworkGray from "../../../public/images/icons/artwork gray.svg";
import ordersGray from "../../../public/images/icons/orders gray.svg";
import contactsGray from "../../../public/images/icons/contacts gray.svg";
import consignmentGray from "../../../public/images/icons/Consignments gray.svg";
import exhibilitionGray from "../../../public/images/icons/Exhibitions gray.svg";
import artistGray from "../../../public/images/icons/artist gray.svg";

// mrx : api
import {
  BASE_Image_Url,
  CREATE_USER_COLlABRATOR
} from "../../../pages/api";

import { GetUrl, GetAuthUrl, PostAuthUrl } from "../../../pages/api/config";

// gm : components ↓
import InputForm from "../../Forms/InputForm";
import CustomSelect from "../../Forms/CustomSelect";
import OptionCollabrator from "../../Screens/Collection/Collabrators/OptionCollabrator";

export default function AddCollabrator({ open, getCreateCollectionData, handleModal }) {
  const collectionID = typeof window !== "undefined" ? localStorage.getItem("collectionId") || 0 : 0;

  // gm : states ↓
  const [Selected, setSelected] = useState([]);
  const [Email, setEmail] = useState("");
  const [Type, setType] = useState(0);

  const [CheckRequired, setCheckRequired] = useState(false);

  const TypeData = [
    {
      "name": "Can view",
      "id": 1
    },
    {
      "name": "Can edit",
      "id": 2
    }
  ]

  const CheckhandleAddCollabrator = () => {
    if (
      Email === "" ||
      Type === 0
    ) {
      setCheckRequired(true);
      toast.warning("Please fill the required values");
    } else if (Selected?.length === 0) {
      toast.warning("Please atleast select one permission");
    } else {
      setCheckRequired(false);
      handleAddColbrator();
    }
  }

  const handleAddColbrator = () => {
    PostAuthUrl(CREATE_USER_COLlABRATOR(Email, collectionID, Type), Selected).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          handleModal();
          getCreateCollectionData()
          setSelected([]);
          setEmail("");
          setType(0);
          toast.success("Collabrator setting added");
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        toast.error(res?.data?.message);
      }
    });
  }

  return (
    <Grid item>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleModal}
        closeAfterTransition
        className={style.newModal}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Grid item className={style.wrapper_modal440_mobileScroll}>
            {/* title */}
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item className={style.TitleModal}>
                Add new collabrator
              </Grid>
              <Grid item>
                <IconButton
                  size="small"
                  className={style.border_btn}
                  onClick={handleModal}
                >
                  <img src={closeIcon.src} />
                </IconButton>
              </Grid>
            </Grid>

            {/* body */}
            <Grid item className={style.bodyModal}>
              {/* forms */}
              <Grid item style={{ marginTop: "-5px" }}>
                <InputForm
                  value={Email}
                  setValue={setEmail}
                  label="Email address"
                  type="email"
                  validateFlag={CheckRequired}
                  placeHolder="Enter user email address"
                  schema={Joi.string()
                    .email({ tlds: { allow: false } })
                    .messages({
                      "string.empty": `Email is required`,
                      "string.email": `Enter a vaild email`,
                      "string.base": `Email is required`,
                    })}
                />
              </Grid>
              <Grid item className={style.some_m2}>
                <CustomSelect
                  Data={TypeData}
                  validateFlag={CheckRequired}
                  value={Type}
                  setValue={setType}
                  placeHolder="Can view"
                />
              </Grid>

              {/* List Options of Collabrator */}
              <Hidden mdUp>
                <Grid item className={style.permissionsText}>
                  Permissions
                </Grid>
              </Hidden>
              {
                Type === 1 ? (
                  <Grid container className={style.p_collab1} spacing={2}>
                    <Grid item md={4} xs={6}>
                      <OptionCollabrator
                        Selected={Selected}
                        setSelected={setSelected}
                        SelectID={10}
                        img={checkCricle}
                        title="All modules"
                      />
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <OptionCollabrator
                        Selected={Selected}
                        setSelected={setSelected}
                        SelectID={11}
                        img={artworkGray}
                        title="Artwork list"
                      />
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <OptionCollabrator
                        Selected={Selected}
                        setSelected={setSelected}
                        SelectID={12}
                        img={ordersGray}
                        title="Orders"
                      />
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <OptionCollabrator
                        Selected={Selected}
                        setSelected={setSelected}
                        SelectID={13}
                        img={consignmentGray}
                        title="Consignments"
                      />
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <OptionCollabrator
                        Selected={Selected}
                        setSelected={setSelected}
                        SelectID={14}
                        img={artworkGray}
                        title="Messages"
                      />
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <OptionCollabrator
                        Selected={Selected}
                        setSelected={setSelected}
                        SelectID={15}
                        img={contactsGray}
                        title="Contacts"
                      />
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <OptionCollabrator
                        Selected={Selected}
                        setSelected={setSelected}
                        SelectID={16}
                        img={artistGray}
                        title="Artist"
                      />
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <OptionCollabrator
                        Selected={Selected}
                        setSelected={setSelected}
                        SelectID={17}
                        img={exhibilitionGray}
                        title="Exhibitions"
                      />
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container className={style.p_collab1} spacing={2}>
                    <Grid item md={4} xs={6}>
                      <OptionCollabrator
                        Selected={Selected}
                        setSelected={setSelected}
                        SelectID={20}
                        img={checkCricle}
                        title="All modules"
                      />
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <OptionCollabrator
                        Selected={Selected}
                        setSelected={setSelected}
                        SelectID={21}
                        img={artworkGray}
                        title="Artwork list"
                      />
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <OptionCollabrator
                        Selected={Selected}
                        setSelected={setSelected}
                        SelectID={22}
                        img={ordersGray}
                        title="Orders"
                      />
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <OptionCollabrator
                        Selected={Selected}
                        setSelected={setSelected}
                        SelectID={23}
                        img={consignmentGray}
                        title="Consignments"
                      />
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <OptionCollabrator
                        Selected={Selected}
                        setSelected={setSelected}
                        SelectID={24}
                        img={artworkGray}
                        title="Messages"
                      />
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <OptionCollabrator
                        Selected={Selected}
                        setSelected={setSelected}
                        SelectID={25}
                        img={contactsGray}
                        title="Contacts"
                      />
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <OptionCollabrator
                        Selected={Selected}
                        setSelected={setSelected}
                        SelectID={26}
                        img={artistGray}
                        title="Artist"
                      />
                    </Grid>
                    <Grid item md={4} xs={6}>
                      <OptionCollabrator
                        Selected={Selected}
                        setSelected={setSelected}
                        SelectID={27}
                        img={exhibilitionGray}
                        title="Exhibitions"
                      />
                    </Grid>
                  </Grid>
                )
              }
            </Grid>

            {/* footer */}
            <Grid item className={style.p_buttonModal}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                className={style.buttonModal}
                onClick={() => CheckhandleAddCollabrator()}
              >
                Add Collabrator
              </Button>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </Grid>
  );
}
