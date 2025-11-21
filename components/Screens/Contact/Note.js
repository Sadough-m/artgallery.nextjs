import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Joi from "joi";

// gm : material ui ↓
import { Button, Grid, Hidden, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../styles/savedArtist.module.css";

// gm : files ↓
import checkCircle from "../../../public/images/icons/Check - Circle.svg";
import CloseRedSvg from "../../../public/images/icons/CloseCircleRed.svg";
import CloseBlueSvg from "../../../public/images/icons/CloseCircleBlue.svg";

// gm : components ↓
import TextArea from "../../Forms/TextArea";

export default function Note({
  NoteData,
  SelectInputData,
  setNoteData
}) {
  // gm : states ↓
  const [NoteType, setNoteType] = useState("General");
  const [DescriptionValue, setDescriptionValue] = useState("");
  const [MouseHoverNote, setMouseHoverNote] = useState("General");

  const handleSetValueForNote = (value) => {
    setNoteData(
      NoteData &&
      NoteData?.map((Item) => {
        if (Item.name === NoteType) {
          return { ...Item, description: value };
        }
        return Item;
      })
    )
  }

  const handleRemoveValueForNote = () => {
    setNoteData(
      NoteData &&
      NoteData?.map((Item) => {
        if (Item.name === NoteType) {
          return { ...Item, description: "" };
        }
        return Item;
      })
    )
  }

  const HandleNote = (Name) => {
    if (
      MouseHoverNote === Name &&
      NoteType === Name &&
      NoteData?.filter((item) => item?.name === NoteType)?.map((item) => item?.description)[0] !== ""
    ) {
      return Style.Twobutton_empty_selected;
    } else if (NoteData?.filter((item) => item?.name === NoteType)?.map((item) => item?.description)[0] !== "" && NoteType !== Name) {
      return Style.Twobutton_empty;
    } else if (NoteData?.filter((item) => item?.name === NoteType)?.map((item) => item?.description)[0] === "" && NoteType !== Name) {
      return Style.Twobutton_empty;
    } else if (NoteData?.filter((item) => item?.name === NoteType)?.map((item) => item?.description)[0] === "" && NoteType === Name) {
      return Style.Twobutton_empty_selected;
    } else if (NoteData?.filter((item) => item?.name === NoteType)?.map((item) => item?.description)[0] !== "" && NoteType === Name) {
      return Style.Twobutton;
    } else return Style.Twobutton_empty;
  };

  // handle Icon Note

  const HandleNoteIcon = (Name) => {
    if (
      MouseHoverNote === Name &&
      NoteType === Name &&
      NoteData?.filter((item) => item?.name === NoteType)?.map((item) => item?.description)[0] !== ""
    ) {
      return CloseRedSvg.src;
    } else if (NoteData?.filter((item) => item?.name === NoteType)?.map((item) => item?.description)[0] !== "" && NoteType !== Name) {
      return "";
    } else if (NoteData?.filter((item) => item?.name === NoteType)?.map((item) => item?.description)[0] === "" && NoteType !== Name) {
      return "";
    } else if (NoteData?.filter((item) => item?.name === NoteType)?.map((item) => item?.description)[0] === "" && NoteType === Name) {
      return CloseBlueSvg.src;
    } else if (NoteData?.filter((item) => item?.name === NoteType)?.map((item) => item?.description)[0] !== "" && NoteType === Name) {
      return checkCircle.src;
    } else return "";
  };

  useEffect(() => {
    handleSetValueForNote(DescriptionValue)
  }, [DescriptionValue])

  return (
    <Grid item className={Style.Note}>

      <div className={Style.bgBtn_3}>
        <div className={Style.C_BgBtn}>
          {
            NoteData?.map((item) => (
              <div className={Style.btnTeam}>
                <Button
                  className={HandleNote(item?.name)}
                  onClick={() => setNoteType(item?.name)}
                  onMouseOver={() => setMouseHoverNote(item?.name)}
                  onMouseLeave={() => setMouseHoverNote("")}
                >
                  {item?.name} <Hidden smDown>note</Hidden>
                </Button>
                <IconButton
                  className={Style.IconButton}
                  onClick={() => handleRemoveValueForNote()}
                  size="small"
                  onMouseOver={() => setMouseHoverNote(item?.name)}
                  onMouseLeave={() => setMouseHoverNote("")}
                >
                  {NoteType === item?.name ? <img src={HandleNoteIcon(item?.name)} /> : ""}
                </IconButton>
              </div>

            ))
          }

        </div>
      </div>

      <Grid item>
        <TextArea
          label={`${NoteType} note`}
          placeHolder={`Write ${NoteType} note here`}
          value={NoteData?.filter((item) => item?.name === NoteType)?.map((item) => item?.description)[0]}
          setValue={setDescriptionValue}
          schema={Joi.optional()}
        />
      </Grid>

    </Grid>
  );
}
