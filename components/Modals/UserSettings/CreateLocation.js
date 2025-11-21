import React, { useState, useEffect } from "react";
import Joi from "joi";
import { useLocalStorage } from "../../../Hooks/useLocalStorage";
import { toast } from "react-toastify";

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

// mrx : api
import {
  BASE_Image_Url,
  CREATE_LOCTION
} from "../../../pages/api";

import { GetUrl, GetAuthUrl, PutAuthUrl, PostAuthUrl } from "../../../pages/api/config";

// gm : styles ↓
import style from "../../../styles/Home.module.css";

// gm : files ↓
import closeIcon from "../../../public/images/icons/Close12.svg";
import InputForm from "../../Forms/InputForm";

// gm : components ↓

export default function CreateLocation({ setLocationList, open, handleModal }) {
  // gm : states ↓
  const [Name, setName] = useState("")

  const [CheckRequired, setCheckRequired] = useState(false);

  const CreateLocation = () => {
    if (Name === "") {
      setCheckRequired(true);
    } else {
      PostAuthUrl(CREATE_LOCTION, {
        "name": Name
      }).then((res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            handleModal();
            setLocationList(res.data.data?.locatin);
            toast.success("location cretered successfully");
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
                Create location
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
              <Grid item >
                <InputForm
                  label="Title"
                  type="text"
                  validateFlag={CheckRequired}
                  setCheckRequired={setCheckRequired}
                  setValue={setName}
                  value={Name}
                  placeHolder="Enter location title"
                  schema={Joi.string()
                    .empty({ tlds: { allow: false } })
                    .messages({
                      "string.empty": `Institution is required`,
                      "any.required": `Institution is required`,
                    })}
                />
              </Grid>

            </Grid>

            {/* footer */}
            <Grid item style={{ marginTop: '25px' }}>
              <Button
                onClick={() => CreateLocation()}
                fullWidth
                color="primary"
                variant="contained"
                className={style.buttonModal}
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </Grid>
  );
}
