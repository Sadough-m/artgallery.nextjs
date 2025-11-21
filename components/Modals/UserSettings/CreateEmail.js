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
import CustomSelect from "../../Forms/CustomSelect";
import { GetAuthUrl, PostAuthUrl } from "../../../pages/api/config";
import { Add_User_Email_List_Item, Edit_User_Email_List_Item } from "../../../pages/api";
import { CREATE_EMAIL_LIST } from "../../../pages/api";
import { toast } from "react-toastify";
import Joi from "joi";

// sa : validation ↓
const schema = {
  title: Joi.string()
    // .email({ tlds: { allow: false } })
    .messages({
      "string.empty": `Title is required`,
      // "string.email": `Enter a valid email`,
      "string.base": `Title is required`,
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      "string.empty": `email is required`,
      "string.email": `Enter a valid email`,
      "string.base": `email is required`,
    }),
  selectedEmailListId: Joi.string()
    // .email({ tlds: { allow: false } })
    .messages({
      "string.empty": `email is required`,
      // "string.email": `Enter a valid email`,
      "string.base": `email is required`,
    }),
};


export default function CreateEmail({
  open,
  handleModal,
  selectedEmailListData,
  allEmailListData,
  effectedEmailListItem = null
}) {
  // gm : states ↓
  const [selectedEmailListId, setSelectedEmailListId] = useState('');
  const [selectedEmailListName, setSelectedEmailListName] = useState('');
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [validateFlag, setValidateFlag] = useState(false);

  // as: first initiate
  useEffect(() => {

    setSelectedEmailListId(selectedEmailListData?.id)
    setSelectedEmailListName(selectedEmailListData?.title)
  }, [selectedEmailListData])

  // sa first initiate for editing
  useEffect(() => {
    setEmail(effectedEmailListItem?.email)
    setTitle(effectedEmailListItem?.title)
  }, [effectedEmailListItem])
  // sa :validate error before call api


  const handleClickCreateEmailItem = () => {
    const { error } = Joi.object(schema).validate({
      title,
      email,
      selectedEmailListId
    });
    // console.log('error',error)
    if (error) {
      return setValidateFlag(true);
    } else {
      effectedEmailListItem ? editEmailItem() : createEmailItem();
    }
  };
  // as : create email item
  const createEmailItem = () => {
    PostAuthUrl(Add_User_Email_List_Item(), {
      "title": title,
      "email": email,
      "listId": selectedEmailListId
    }).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          toast.success(res?.data?.message);
          handleModal()
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });

  }
  // as : create email item
  const editEmailItem = () => {
    PostAuthUrl(Edit_User_Email_List_Item(), {
      "id": effectedEmailListItem?.id,
      "title": title,
      "email": email,
      "listId": selectedEmailListId
    }).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          toast.success(res?.data?.message);
          handleModal()
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
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
          <Grid item className={style.wrapper_modal440}>
            {/* title */}
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item className={style.TitleModal}>
                {effectedEmailListItem ? 'Edit email' : 'Create email'}

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
                  placeHolder="Enter location title"
                  setValue={setTitle}
                  value={title}
                  validateFlag={validateFlag}
                  schema={schema.title}

                />
                <InputForm
                  label="Email"
                  type="email"
                  placeHolder="Enter location title"
                  setValue={setEmail}
                  value={email}
                  validateFlag={validateFlag}
                  schema={schema.email}
                />
                <CustomSelect
                  Data={allEmailListData?.map(x => ({
                    ...x,
                    name: x.title
                  }))}
                  setValue={setSelectedEmailListId}
                  Value={selectedEmailListId}
                  setSelectName={setSelectedEmailListName}
                  SelectName={selectedEmailListName}
                  setN label="List " placeHolder="Choose a list" />
              </Grid>
            </Grid>

            {/* footer */}
            <Grid item style={{ marginTop: '25px' }}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                className={style.buttonModal}
                onClick={handleClickCreateEmailItem}
              >
                {effectedEmailListItem ? 'Edit' : 'Create'}
              </Button>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </Grid>
  );
}
