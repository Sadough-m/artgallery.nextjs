import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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

// mrx : api
import {
  BASE_Image_Url,
} from "../../../pages/api";

// gm : files ↓
import closeIcon from "../../../public/images/icons/Close12.svg";
import checkCricle from "../../../public/images/icons/Check - Circle gray.svg";
import artworkGray from "../../../public/images/icons/artwork gray.svg";
import ordersGray from "../../../public/images/icons/orders gray.svg";
import contactsGray from "../../../public/images/icons/contacts gray.svg";
import consignmentGray from "../../../public/images/icons/Consignments gray.svg";
import exhibilitionGray from "../../../public/images/icons/Exhibitions gray.svg";
import artistGray from "../../../public/images/icons/artist gray.svg";
import guy1 from "../../../public/images/guy.png";

// gm : components ↓
import CustomSelect from "../../Forms/CustomSelect";
import OptionCollabrator from "../../Screens/Collection/Collabrators/OptionCollabrator";

export default function SettingCollabrator({
  Data,
  Type,
  setType,
  Selected,
  setSelected,
  open,
  handleModal,
  handleEditColbrator
}) {
  // gm : states ↓

  useEffect(() => {
    setSelected(Data?.permissions);
    setType(parseInt(Data?.roleAccessType));
  }, [Data])

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
                Collabrator settings
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
              {/* user and forms */}
              <Grid container alignItems="center" justifyContent="space-between" style={{ marginTop: '-2px' }}>
                <Grid item className={style.userAndForm}>
                  <Grid container alignItems="center">
                    <Grid item>
                      <img style={{ borderRadius: 50 }} src={Data?.image !== null ? BASE_Image_Url + Data?.image : "/UCstrAFCaLVt8g6JxqTSUzVH.svg"} className={style.img_settingCol} />
                    </Grid>
                    <Grid item className="fs14">{Data?.fullName !== null ? Data?.fullName : "Elon Musk"}</Grid>
                  </Grid>
                </Grid>
                <Grid item className={style.some_m3}>
                  <CustomSelect
                    Data={TypeData}
                    value={Type}
                    SelectName={TypeData?.filter((item) => item?.id === Type).map((item) => item?.name)}
                    setSelectName={setType}
                    setValue={setType}
                    placeHolder="Can view"
                  />
                </Grid>
              </Grid>

              {/* List Options of Collabrator */}
              <Grid item className={style.permissionsText1}>
                Permissions
              </Grid>
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
                onClick={() => handleEditColbrator()}
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </Grid>
  );
}
