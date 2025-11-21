import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { ToastContainer, toast } from "react-toastify";

// gm : material ui ↓
import {
  Grid,
  ClickAwayListener,
  IconButton,
} from '@material-ui/core';

// gm : styles ↓
import ColStyle from "../../../../styles/Collection.module.css";

// gm : files ↓
import EdditSvg from "../../../../public/images/icons/edit new.svg"
import dotIcon from "../../../../public/images/icons/3dot.svg";
import TrashIcon from "../../../../public/images/icons/Trash.svg";
import EditLocation from '../../../Modals/UserSettings/EditLocation';
import RemoveLocation from '../../../Modals/UserSettings/RemoveLocation';

// mrx : api
import {
  BASE_Image_Url,
  DELETE_LOCATION
} from "../../../../pages/api";

import { GetUrl, GetAuthUrl, PutAuthUrl, DeleteAuthUrl } from "../../../../pages/api/config";// gm : components ↓

export default function EditDelete({ Data, setLocationList }) {
  // gm : states ↓
  const [Menu, setMenu] = useState(false)
  const [ModalRemove, setModalRemove] = useState(false)
  const [ModalEdit, setModalEdit] = useState(false)

  // close Menu
  const handle_CloseMenu = () => {
    setMenu(false);
  };

  // handle open Menu
  const handle_OpenMenu = () => {
    setMenu(true)
  }

  // open and close remove modal
  const handleRemoveModal = () => {
    setModalRemove(!ModalRemove)
  }

  // open and close Edit modal
  const handleEditModal = () => {
    setModalEdit(!ModalEdit)
  }

  const RemoveLocation2 = () => {
    DeleteAuthUrl(DELETE_LOCATION(Data?.id)).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          handleRemoveModal();
          window.location.reload();
          toast.success("location Removed successfully");
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


  return (
    <span className='posRel'>
      <IconButton size="small" style={{ marginLeft: '8px' }} onClick={() => handle_OpenMenu()}>
        <img src={dotIcon.src} />
      </IconButton>
      {Menu && (
        <ClickAwayListener onClickAway={() => handle_CloseMenu()}>
          <Grid item className={ColStyle.UserMenu} >
            <Grid item className="posRel">
              <Grid item className={ColStyle.item_userMenu} onClick={() => handleEditModal()}>
                <img src={EdditSvg.src} className={ColStyle.fitSvg} />
                Edit
              </Grid>
              <Grid item className={ColStyle.item_userMenu} onClick={() => handleRemoveModal()}>
                <img src={TrashIcon.src} className={ColStyle.fitSvg} />
                Delete
              </Grid>
            </Grid>
          </Grid>
        </ClickAwayListener>
      )}
      <RemoveLocation RemoveLocation2={RemoveLocation2} Data={Data} open={ModalRemove} handleModal={() => handleRemoveModal()} />
      <EditLocation Data={Data} open={ModalEdit} handleModal={() => handleEditModal()} />

    </span>
  )
}