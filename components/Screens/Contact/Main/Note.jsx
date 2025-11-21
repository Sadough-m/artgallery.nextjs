import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Contacts.module.css";

// gm : files ↓
import checkSvg from "../../../../public/images/icons/CheckCircleBlack.svg";

// gm : components ↓
import InputForm from "../../../Forms/InputForm";
import TextArea from "../../../Forms/TextArea";
import NoteC from "../Note";

export default function Note({
  NoteData,
  setNoteData,
  SelectInputData
}) {
  // gm : states ↓
  return (
    <Grid item className={Style.wrapper_main}>
      <Grid item className={Style.title_main}>
        Note
      </Grid>
      <NoteC
        NoteData={NoteData}
        setNoteData={setNoteData}
        SelectInputData={SelectInputData}
      />
    </Grid>
  );
}
