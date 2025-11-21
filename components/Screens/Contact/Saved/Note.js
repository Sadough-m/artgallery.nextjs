import React, { useState, useEffect } from "react";
import Link from "next/link";
import Joi from "joi";

// gm : material ui ↓
import { Button, Grid, Hidden, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/savedArtist.module.css";

// gm : files ↓
import checkCircle from "../../../../public/images/icons/Check - Circle.svg";
import CloseRedSvg from "../../../../public/images/icons/CloseCircleRed.svg";
import LoadingSpinerSvg from "../../../../public/loading.svg";
import CloseBlueSvg from "../../../../public/images/icons/CloseCircleBlue.svg";

// gm : components ↓
import TextArea from "../../../Forms/TextArea";

export default function NoteForm({
  handleChangepublicNote,
  setPrivateNote,
  privateNote,
  setpublicValue,
  AllLoading,
  publicValue,
  handleChangeprivateNote,
}) {
  // gm : states ↓
  const [NoteType, setNoteType] = useState("Private");
  const [MouseHoverNote, setMouseHoverNote] = useState("Private");

  // handle style Note Buttons
  const HandlePrivateNote = () => {
    if (privateNote === " ") {
      if (NoteType === "Private") {
        return Style.Twobutton_empty_selected;
      } else return Style.Twobutton_empty;
    }
    if (NoteType !== "Private" && privateNote !== "") {
      return Style.Twobutton_NoIcon;
    } else if (
      MouseHoverNote === "Private" &&
      NoteType === "Private" &&
      privateNote !== ""
    ) {
      return Style.Twobutton_empty_selected;
    } else if (privateNote !== "" && NoteType === "Private") {
      return Style.Twobutton;
    } else if (privateNote === "" && NoteType === "Private") {
      return Style.Twobutton_empty_selected;
    } else if (privateNote === "" && NoteType !== "Private") {
      return Style.Twobutton_empty;
    } else if (privateNote !== "" && NoteType !== "Private") {
      return Style.Twobutton_empty;
    } else return Style.Twobutton_empty;
  };

  useEffect(() => {
    if (publicValue === false || publicValue === null) {
      setpublicValue("");
    }
    if (privateNote === false || privateNote === null) {
      setPrivateNote("");
    }
  }, [privateNote]);

  // handle Icon Note
  const HandlePrivateIcon = () => {
    if (privateNote === " ") {
      if (NoteType === "Private") {
        return CloseBlueSvg.src;
      } else return "";
    } else if (NoteType !== "Private" && privateNote !== "") {
      return checkCircle.src;
    } else if (NoteType === "Private") {
      if (
        MouseHoverNote === "Private" &&
        NoteType === "Private" &&
        privateNote !== ""
      ) {
        return CloseRedSvg.src;
      } else if (privateNote !== "" && NoteType === "Private") {
        return checkCircle.src;
      } else if (privateNote === "" && NoteType === "Private") {
        return CloseBlueSvg.src;
      } else if (privateNote === "" && NoteType !== "Private") {
        return "";
      } else if (privateNote !== "" && NoteType !== "Private") {
        return "";
      } else return "";
    } else return "";
  };

  const HandleTeamNote = () => {
    if (publicValue === " ") {
      if (NoteType === "Team") {
        return Style.Twobutton_empty_selected;
      } else return Style.Twobutton_empty;
    } else if (NoteType !== "Team" && publicValue !== "") {
      return Style.Twobutton_NoIcon;
    } else if (
      MouseHoverNote === "Team" &&
      NoteType === "Team" &&
      publicValue !== ""
    ) {
      return Style.Twobutton_empty_selected;
    } else if (publicValue !== "" && NoteType !== "Team") {
      return Style.Twobutton_empty;
    } else if (publicValue === "" && NoteType !== "Team") {
      return Style.Twobutton_empty;
    } else if (publicValue === "" && NoteType === "Team") {
      return Style.Twobutton_empty_selected;
    } else if (publicValue !== "" && NoteType === "Team") {
      return Style.Twobutton;
    } else return Style.Twobutton_empty;
  };

  const HandleTeamIcon = () => {
    if (publicValue === " ") {
      if (NoteType === "Team") {
        return CloseBlueSvg.src;
      } else return "";
    } else if (NoteType !== "Team" && publicValue !== "") {
      return checkCircle.src;
    } else if (NoteType === "Team") {
      if (
        MouseHoverNote === "Team" &&
        NoteType === "Team" &&
        publicValue !== ""
      ) {
        return CloseRedSvg.src;
      } else if (publicValue !== "" && NoteType !== "Team") {
        return "";
      } else if (publicValue === "" && NoteType !== "Team") {
        return "";
      } else if (publicValue === "" && NoteType === "Team") {
        return CloseBlueSvg.src;
      } else if (publicValue !== "" && NoteType === "Team") {
        return checkCircle.src;
      } else return "";
    } else return "";
  };

  return (
    <Grid style={{ marginTop: "40px" }} item className={Style.Note}>
      <Grid item className={Style.textNote}>
        Note
      </Grid>
      <div className={Style.bgBtn_3}>
        <div className={Style.C_BgBtn}>
          <div className={Style.btnTeam}>
            <Button
              className={HandlePrivateNote()}
              onClick={() => setNoteType("Private")}
              onMouseOver={() => setMouseHoverNote("Private")}
              onMouseLeave={() => setMouseHoverNote("")}
            >
              Private <Hidden smDown>note</Hidden>
            </Button>
            {NoteType === "Private" && (
              <IconButton
                onClick={() =>
                  NoteType === "Private" ? setPrivateNote(" ") : {}
                }
                className={Style.IconButton}
                size="small"
                onMouseOver={() => setMouseHoverNote("Private")}
                onMouseLeave={() => setMouseHoverNote("")}
              >
                <img src={HandlePrivateIcon()} />
              </IconButton>
            )}
          </div>

          <div className={Style.btnTeam}>
            <Button
              className={HandleTeamNote()}
              onClick={() => setNoteType("Team")}
              onMouseOver={() => setMouseHoverNote("Team")}
              onMouseLeave={() => setMouseHoverNote("")}
            >
              Team <Hidden smDown>note</Hidden>
            </Button>
            {NoteType === "Team" && (
              <IconButton
                onClick={() => (NoteType === "Team" ? setpublicValue(" ") : "")}
                className={Style.IconButton}
                size="small"
                onMouseOver={() => setMouseHoverNote("Team")}
                onMouseLeave={() => setMouseHoverNote("")}
              >
                <img src={HandleTeamIcon()} />
              </IconButton>
            )}
          </div>
        </div>
      </div>
      <Grid item>
        {NoteType === "Private" ? (
          <TextArea
            label={"Private Note"}
            placeHolder="Type Here..."
            value={
              privateNote === false || privateNote === null ? "" : privateNote
            }
            setValue={(value) => handleChangeprivateNote(value)}
            schema={Joi.optional()}
          />
        ) : (
          <TextArea
            label={"Team Note"}
            placeHolder="Type Here..."
            value={
              publicValue === false || publicValue === null ? "" : publicValue
            }
            setValue={(value) => handleChangepublicNote(value)}
            schema={Joi.optional()}
          />
        )}
      </Grid>
    </Grid>
  );
}
