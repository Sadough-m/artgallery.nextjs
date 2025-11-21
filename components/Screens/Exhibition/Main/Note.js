import React, { useState } from "react";
import Link from "next/link";
import Joi from "joi";

// gm : material ui ↓
import { Button, Grid, Hidden } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Exhibition.module.css";

// gm : files ↓
import checkCircle from "../../../../public/images/icons/Check - Circle.svg";
import CloseRedSvg from "../../../../public/images/icons/CloseCircleRed.svg";
import CloseBlueSvg from "../../../../public/images/icons/CloseCircleBlue.svg";

// gm : components ↓
import TextArea from "../../../Forms/TextArea";

export default function Note() {
  // gm : states ↓
  const [NoteType, setNoteType] = useState("Private");
  const [privateText, setPrivateText] = useState("");
  const [MouseHoverNote, setMouseHoverNote] = useState(false);

  // handle style Note Buttons
  const HandlePrivateNote = () => {
    if (MouseHoverNote && NoteType === "Private" && privateText !== "") {
      return Style.Twobutton_empty_selected;
    } else if (privateText !== "" && NoteType === "Private") {
      return Style.Twobutton;
    } else if (privateText === "" && NoteType === "Private") {
      return Style.Twobutton_empty_selected;
    } else if (privateText === "" && NoteType !== "Private") {
      return Style.Twobutton_empty;
    } else if (privateText !== "" && NoteType !== "Private") {
      return Style.Twobutton_empty;
    } else return Style.Twobutton_empty;
  };
  const HandleTeamNote = () => {
    if (MouseHoverNote && NoteType === "Team" && privateText !== "") {
      return Style.Twobutton_empty_selected;
    } else if (privateText !== "" && NoteType !== "Team") {
      return Style.Twobutton_empty;
    } else if (privateText === "" && NoteType !== "Team") {
      return Style.Twobutton_empty;
    } else if (privateText === "" && NoteType === "Team") {
      return Style.Twobutton_empty_selected;
    } else if (privateText !== "" && NoteType === "Team") {
      return Style.Twobutton;
    } else return Style.Twobutton_empty;
  };
  const HandleSharedNote = () => {
    if (MouseHoverNote && NoteType === "Shared" && privateText !== "") {
      return Style.Twobutton_empty_selected;
    } else if (privateText !== "" && NoteType !== "Shared") {
      return Style.Twobutton_empty;
    } else if (privateText === "" && NoteType !== "Shared") {
      return Style.Twobutton_empty;
    } else if (privateText === "" && NoteType === "Shared") {
      return Style.Twobutton_empty_selected;
    } else if (privateText !== "" && NoteType === "Shared") {
      return Style.Twobutton;
    } else return Style.Twobutton_empty;
  };

  // handle Icon Note
  const HandlePrivateIcon = () => {
    if (MouseHoverNote && NoteType === "Private" && privateText !== "") {
      return CloseRedSvg.src;
    } else if (privateText !== "" && NoteType === "Private") {
      return checkCircle.src;
    } else if (privateText === "" && NoteType === "Private") {
      return CloseBlueSvg.src;
    } else if (privateText === "" && NoteType !== "Private") {
      return "";
    } else if (privateText !== "" && NoteType !== "Private") {
      return "";
    } else return "";
  };
  const HandleTeamIcon = () => {
    if (MouseHoverNote && NoteType === "Team" && privateText !== "") {
      return CloseRedSvg.src;
    } else if (privateText !== "" && NoteType !== "Team") {
      return "";
    } else if (privateText === "" && NoteType !== "Team") {
      return "";
    } else if (privateText === "" && NoteType === "Team") {
      return CloseBlueSvg.src;
    } else if (privateText !== "" && NoteType === "Team") {
      return checkCircle.src;
    } else return "";
  };
  const HandleSharedIcon = () => {
    if (MouseHoverNote && NoteType === "Shared" && privateText !== "") {
      return CloseRedSvg.src;
    } else if (privateText !== "" && NoteType !== "Shared") {
      return "";
    } else if (privateText === "" && NoteType !== "Shared") {
      return "";
    } else if (privateText === "" && NoteType === "Shared") {
      return CloseBlueSvg.src;
    } else if (privateText !== "" && NoteType === "Shared") {
      return checkCircle.src;
    } else return "";
  };

  return (
    <Grid item className={Style.Main_1}>
      <Grid item className={Style.TitleMain}>
        Note
      </Grid>
      <div className={Style.bgBtn}>
        <div className={Style.C_BgBtn}>
        <div className={Style.btnTeam}>
          <Button
            className={HandleTeamNote()}
            onClick={() => setNoteType("Team")}
            onMouseOver={() => setMouseHoverNote(true)}
            onMouseLeave={() => setMouseHoverNote(false)}
            startIcon={
              NoteType === "Team" ? <img src={HandleTeamIcon()} /> : <></>
            }
          >
            Team <Hidden smDown>note</Hidden>
          </Button>
        </div>
        <div className={Style.btnTeam}>
          <Button
            className={HandlePrivateNote()}
            onClick={() => setNoteType("Private")}
            onMouseOver={() => setMouseHoverNote(true)}
            onMouseLeave={() => setMouseHoverNote(false)}
            startIcon={
              NoteType === "Private" ? <img src={HandlePrivateIcon()} /> : <></>
            }
          >
            Private <Hidden smDown>note</Hidden>
          </Button>
        </div>

        <div className={Style.btnTeam}>
          <Button
            className={HandleSharedNote()}
            onClick={() => setNoteType("Shared")}
            onMouseOver={() => setMouseHoverNote(true)}
            onMouseLeave={() => setMouseHoverNote(false)}
            startIcon={
              NoteType === "Shared" ? <img src={HandleSharedIcon()} /> : <></>
            }
          >
            Shared <Hidden smDown>note</Hidden>
          </Button>
        </div>
        </div>
      </div>
      <Grid item>
        <TextArea
          label="Private note"
          placeHolder="Write private note here"
          value={privateText}
          setValue={setPrivateText}
          schema={Joi.optional()}
        />
      </Grid>
    </Grid>
  );
}
