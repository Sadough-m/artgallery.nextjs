import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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
import Backdrop from "@material-ui/core/Backdrop";

// gm : styles ↓
import style from "../../../styles/Home.module.css";

// gm : files ↓
import closeIcon from "../../../public/images/icons/Close12.svg";

// gm : components ↓
import CustomCheckBox from "../../Forms/CustomCheckBox";

//rs : apis getters
import { GetAuthUrl, GetUrl, PostAuthUrl } from "../../../pages/api/config";

//rs : api urls
import {
  EDIT_EMAIL_LIST_CONTACT,
} from "../../../pages/api/index";

export default function EditEmailList({
  AllData,
  open,
  Data,
  handleModal,
  getArtistDetails
}) {
  // gm : states ↓
  const [EmailList, setEmailList] = useState([]);
  const [SelectedEmailList, setSelectedEmailList] = useState([]);

  useEffect(() => {
    setEmailList(Data);
    setSelectedEmailList(EmailList?.filter((item) => item?.checked === true)?.map((item) => item?.email))
  }, [Data, EmailList])

  const handleCheck = (Name) => {
    if (SelectedEmailList?.filter((item) => item === Name)?.length >= 1) {
      setSelectedEmailList(SelectedEmailList?.filter((item) => item !== Name));
    } else {
      setSelectedEmailList((prev) => [...prev, Name]);
    }
  }

  const handleSaveEmailList = () => {
    const collectionId = localStorage.getItem("collectionId");
    PostAuthUrl(EDIT_EMAIL_LIST_CONTACT(collectionId), {
      "contactId": AllData?.id,
      "emails": SelectedEmailList
    }).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          toast.success("Email list updated");
          handleModal();
          getArtistDetails(AllData?.id);
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
                Edit email list
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
            <Grid item className={style.bodyModal_form}>
              {/* list */}
              <Grid item className="posRel">
                {EmailList?.map((Item) => (
                  <Grid item className={style.emailList}>
                    <CustomCheckBox
                      label={Item?.email}
                      checked={SelectedEmailList?.filter((item) => item === Item?.email)?.length >= 1}
                      setChecked={() => handleCheck(Item?.email)}
                    />
                  </Grid>
                ))}

                <span className={style.vanishLine}></span>
              </Grid>
            </Grid>

            {/* footer */}
            <Grid item style={{ marginTop: "25px" }}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                className={style.buttonModal}
                onClick={() => handleSaveEmailList()}
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
