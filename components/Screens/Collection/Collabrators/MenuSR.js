import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// gm : material ui ↓
import {
  Grid,
  ClickAwayListener,
  IconButton,
} from '@material-ui/core';

// mrx : api
import {
  BASE_Image_Url,
  EDIT_USER_COLlABRATOR,
  DELETE_USER_COLlABRATOR
} from "../../../../pages/api";

import { GetUrl, GetAuthUrl, PostAuthUrl } from "../../../../pages/api/config";

// gm : styles ↓
import ColStyle from "../../../../styles/Collection.module.css";

// gm : files ↓
import settingIcon from "../../../../public/images/icons/Settings.svg";
import LogOutIcon from "../../../../public/images/icons/Logout.svg";
import dotIcon from "../../../../public/images/icons/3dot.svg";
import TrashIcon from "../../../../public/images/icons/Trash.svg";
import RemoveCollabrator from '../../../Modals/Collection/RemoveCollabrator';
import SettingCollabrator from '../../../Modals/Collection/SettingCollabrator';
import { toast } from 'react-toastify';

// gm : components ↓

export default function MenuSR({ getCreateCollectionData, Data }) {
  const collectionID = typeof window !== "undefined" ? localStorage.getItem("collectionId") || 0 : 0;

  // gm : states ↓
  const [MenuSetting, setMenuSetting] = useState(false);
  const [ModalRMCollabrator, setModalRMCollabrator] = useState(false);
  const [ModalSettingCollabrator, setModalSettingCollabrator] = useState(false);

  // edit States
  const [Selected, setSelected] = useState(Data?.permissions);
  const [Type, setType] = useState(Data?.roleAccessType);

  useEffect(() => {
    setType(Data?.roleAccessType)
  }, [Data])

  // mrx : close Menu ↓
  const handle_CloseMenu = () => {
    setMenuSetting(false);
  };

  const handleEditColbrator = () => {
    PostAuthUrl(EDIT_USER_COLlABRATOR(Data?.userId, collectionID, Type ? Type : Data?.roleAccessType), Selected).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          handleSettingCollabrator();
          getCreateCollectionData();
          toast.success("Collabrator setting updated");
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        toast.error(res?.data?.message);
      }
    });
  }

  const handleRemoveColbrator = () => {
    PostAuthUrl(DELETE_USER_COLlABRATOR(Data?.userId, collectionID)).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          getCreateCollectionData();
          handleCollabrator();
          setSelected([]);
          setType(0);
        } else {
          toast.error(res?.data?.message);
          handleCollabrator()
        }
      } else {
        toast.error(res?.data?.message);
      }
    });
  }

  // handle open Menu
  const handle_OpenMenu = () => {
    setMenuSetting(true);
  }

  // open and close remove collabrator modal
  const handleCollabrator = () => {
    setModalRMCollabrator(!ModalRMCollabrator);
  }

  // open and close Setting collabrator modal
  const handleSettingCollabrator = () => {
    setModalSettingCollabrator(!ModalSettingCollabrator);
  }

  return (
    <span className='posRel'>
      <IconButton size="small" style={{ marginLeft: '8px' }} onClick={() => handle_OpenMenu()}>
        <img src={dotIcon.src} />
      </IconButton>
      {MenuSetting && (
        <ClickAwayListener onClickAway={() => handle_CloseMenu()}>
          <Grid item className={ColStyle.UserMenu} >
            <Grid item className="posRel">
              <Grid item className={ColStyle.item_userMenu} onClick={() => handleSettingCollabrator()}>
                <img src={settingIcon.src} className={ColStyle.fitSvg} />
                Settings
              </Grid>
              {
                Data?.roleAccessType !== 3 && (
                  <Grid item className={ColStyle.item_userMenu} onClick={() => handleCollabrator()}>
                    <img src={TrashIcon.src} className={ColStyle.fitSvg} />
                    Remove
                  </Grid>
                )
              }
            </Grid>
          </Grid>
        </ClickAwayListener>
      )}

      <RemoveCollabrator
        open={ModalRMCollabrator}
        handleModal={() => handleCollabrator()}
        handleRemoveColbrator={handleRemoveColbrator}
      />

      <SettingCollabrator
        open={ModalSettingCollabrator}
        handleModal={() => handleSettingCollabrator()}
        Data={Data}
        setType={setType}
        Type={Type}
        Selected={Selected}
        handleEditColbrator={handleEditColbrator}
        setSelected={setSelected}
      />

    </span>
  )
}