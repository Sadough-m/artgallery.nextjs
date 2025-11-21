import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid, ClickAwayListener, IconButton } from "@material-ui/core";

// gm : styles ↓
import ColStyle from "../../../../styles/Collection.module.css";

// gm : files ↓
import EdditSvg from "../../../../public/images/icons/edit new.svg";
import dotIcon from "../../../../public/images/icons/3dot.svg";
import TrashIcon from "../../../../public/images/icons/Trash.svg";

// gm : files ↓
import RemoveEmailList from "../../../Modals/UserSettings/RemoveEmailList";
import CreateEmailList from "../../../Modals/UserSettings/CreateEmailList";

export default function EditDelete({Data,refreshEmailList}) {
  // gm : states ↓
  const [Menu, setMenu] = useState(false);
  const [ModalRemove, setModalRemove] = useState(false);
  const [ModalEdit, setModalEdit] = useState(false);

  // close Menu
  const handle_CloseMenu = () => {
    setMenu(false);
  };

  // handle open Menu
  const handle_OpenMenu = () => {
    setMenu(true);
  };

  // open and close remove modal
  const handleRemoveModal = () => {
    setModalRemove(!ModalRemove);
  };

  // open and close Edit modal
  const handleEditModal = () => {
    setModalEdit(!ModalEdit);
  };

  return (
    <span className="posRel">
      <IconButton
        size="small"
        style={{ marginLeft: "8px" }}
        onClick={() => handle_OpenMenu()}
      >
        <img src={dotIcon.src} />
      </IconButton>
      {Menu && (
        <ClickAwayListener onClickAway={() => handle_CloseMenu()}>
          <Grid item className={ColStyle.UserMenu}>
            <Grid item className="posRel">
              <Grid
                item
                className={ColStyle.item_userMenu}
                onClick={() => handleEditModal()}
              >
                <img src={EdditSvg.src} className={ColStyle.fitSvg} />
                Edit
              </Grid>
              <Grid
                item
                className={ColStyle.item_userMenu}
                onClick={() => handleRemoveModal()}
              >
                <img src={TrashIcon.src} className={ColStyle.fitSvg} />
                Delete
              </Grid>
            </Grid>
          </Grid>
        </ClickAwayListener>
      )}
      <RemoveEmailList
        open={ModalRemove}
        handleModal={() => {
            refreshEmailList()
            handleRemoveModal()
        }
        }
        effectedEmailList={Data}
      />
      <CreateEmailList open={ModalEdit} handleModal={() => {
          handleEditModal()
          refreshEmailList()
      }
      } effectedEmailList={Data}/>
    </span>
  );
}
