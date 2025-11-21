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
import archivePng from "../../../public/images/remove img Modal.png";
import closeIcon from "../../../public/images/icons/Close12.svg";
import infoBlue from "../../../public/images/icons/Info blue.svg";
import InputForm from "../../Forms/InputForm";

import { GetUrl, GetAuthUrl, PostAuthUrl } from "../../../pages/api/config";
import { INVITE_PEOPLE } from "../../../pages/api";

// mrx : context ↓
import { Context } from "../../../context/index";

// mrx : cookies
import Cookies from "js-cookie";

// gm : components ↓

export default function InvitePeople({ open, handleModal }) {
  // gm : states ↓
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");

  const [CheckRequired, setCheckRequired] = useState(false);
  const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  // style of modal ↓

  // add nrw collectionn api
  const handleInvitePeople = () => {
    if (
      regex.test(Email) === false ||
      Name === ""
    ) {
      setCheckRequired(true);
    } else {
      PostAuthUrl(INVITE_PEOPLE, {
        "name": Name,
        "email": Email
      }).then((res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            setCheckRequired(false);
            handleModal()
            setName("");
            setEmail("");
            toast.success(res?.data?.message);
          } else {
            toast.error(res?.data?.message);
          }
        } else {
          toast.error(res?.data?.message);
        }
      });
    }
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
          <Grid item className={style.wrapper_modal440}>
            {/* title */}
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item className={style.TitleModal}>
                Invite people
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
              {/* desk box */}
              <Grid item className={style.inviteWrapper}>
                <Grid container alignItems="center">
                  <Grid item className={style.infoInvite}>
                    <img src={infoBlue.src} />
                  </Grid>
                  <Grid item className={style.desk_invite}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </Grid>
                </Grid>
              </Grid>

              {/* forms */}
              <Grid item style={{ marginTop: "20px" }}>
                <InputForm
                  value={Name}
                  setValue={setName}
                  schema={Joi.string()
                    .empty({ tlds: { allow: false } })
                    .messages({
                      "string.empty": `Institution is required`,
                      "any.required": `Institution is required`,
                    })
                  }
                  validateFlag={CheckRequired}
                  label="Name"
                  type="text"
                  placeHolder="Enter user name"
                />
              </Grid>
              <Grid item className={style.some_m1}>
                <InputForm
                  schema={Joi.string()
                    .email({ tlds: { allow: false } })
                    .messages({
                      "string.empty": `Email is required`,
                      "string.email": `Enter a vaild email`,
                      "string.base": `Email is required`,
                    })
                  }
                  validateFlag={CheckRequired}
                  label="Email address"
                  type="email"
                  value={Email}
                  setValue={setEmail}
                  placeHolder="Enter user email address"
                />
              </Grid>
            </Grid>

            {/* footer */}
            <Grid item className={style.p_buttonModal}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={() => handleInvitePeople()}
                className={style.buttonModal}
              >
                Send Invite
              </Button>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </Grid>
  );
}
