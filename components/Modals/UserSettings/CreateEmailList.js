import React, { useState, useEffect } from "react";

// gm : material ui ↓
import {
  Button,
  Fade,
  Grid,
  Hidden,
  IconButton,
  Modal,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";


// gm : styles ↓
import style from "../../../styles/Home.module.css";

// gm : files ↓
import closeIcon from "../../../public/images/icons/Close12.svg";
import InputForm from "../../Forms/InputForm";
import { GetAuthUrl } from "../../../pages/api/config";
import { CREATE_EMAIL_LIST, Edit_EMAIL_LIST } from "../../../pages/api";
import { toast } from "react-toastify";
import Joi from "joi";

// as:validation
const schema = {
  title: Joi.string()
    // .email({ tlds: { allow: false } })
    .messages({
      "string.empty": `Title is required`,
      // "string.email": `Enter a valid email`,
      "string.base": `Title is required`,
    }),
};
// gm : components ↓

export default function CreateEmailList({ open, handleModal, effectedEmailList = null }) {
  // gm : states ↓
  const [title, setTitle] = useState('');
  const [validateFlag, setValidateFlag] = useState(false);

  const { error } = schema.title.validate(title);

  const createEmailList = () => {
    GetAuthUrl(CREATE_EMAIL_LIST(title)).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          //setLoading(false);
          toast.success(res?.data?.message);
          handleModal()
          //setFirst(false);
        } else {
          toast.error(res?.data?.message);
          // setLoading(false);
        }
      } else {
        toast.error("something went wrong !");
        //setLoading(false);
      }
    });

  }

  // sa :edit email list func
  const editEmailList = () => {
    GetAuthUrl(Edit_EMAIL_LIST(effectedEmailList?.id, title)).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          //setLoading(false);
          toast.success(res?.data?.message);
          handleModal()
          //setFirst(false);
        } else {
          toast.error(res?.data?.message);
          // setLoading(false);
        }
      } else {
        toast.error("something went wrong !");
        //setLoading(false);
      }
    });

  }
  // sa: create bind list func
  const handleCreateEmailList = () => {
    console.log('handleCreateEmailList')
    if (error) {
      return setValidateFlag(true);
    } else {
      if (effectedEmailList) {
        console.log('edit')
        editEmailList()

      }
      else createEmailList()

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
                {effectedEmailList ? 'Edit Email List' : 'Create email list'}
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
                {
                  effectedEmailList && (
                    <Grid item className={style.bodyModal}>
                      You are editing
                      <Hidden xsDown>
                        <br />
                      </Hidden>{" "}
                      {effectedEmailList?.title}
                    </Grid>
                  )
                }
                <InputForm
                  label={effectedEmailList ? 'New Title' : 'Title'}
                  type="text"
                  schema={schema.title}
                  placeHolder="Enter location title"
                  setValue={setTitle}
                  validateFlag={validateFlag}

                />
              </Grid>
            </Grid>

            {/* footer */}
            <Grid item style={{ marginTop: '25px' }}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                className={style.buttonModal}
                onClick={handleCreateEmailList}
              >
                {effectedEmailList ? 'Edit' : 'Create'}

              </Button>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </Grid>
  );
}
