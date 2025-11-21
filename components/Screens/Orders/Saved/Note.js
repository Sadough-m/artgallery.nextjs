import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Orders.module.css";

// gm : files ↓
import checkSvg from "../../../../public/images/icons/Check - Circle.svg";
import TextArea from "../../../Forms/TextArea";

// gm : components ↓

export default function Note() {
  // gm : states ↓
  const [privateNote, setPrivateNote] = useState(false);

  return (
    <Grid item className={Style.Note}>
      <Grid item className={Style.TitleNote}>Note</Grid>
      <Grid container className={Style.bgBtn1}>
        <Grid item>
          <Button
            variant={privateNote ? "contained" : "text"}
            color={privateNote ? "secondary" : "default"}
            className={Style.Twobutton1}
            onClick={() => setPrivateNote(true)}
            startIcon={privateNote ? <Image src={checkSvg} /> : <></>}
          >
            Private note
          </Button>
        </Grid>
        <Grid item className={Style.btnTeam}>
          <Button
            variant={!privateNote ? "contained" : "text"}
            color={!privateNote ? "secondary" : "default"}
            className={Style.Twobutton}
            onClick={() => setPrivateNote(false)}
            startIcon={!privateNote ? <Image src={checkSvg} /> : <></>}
          >
            Team note
          </Button>
        </Grid>
      </Grid>
      <Grid item>
          <TextArea label="Private note" placeHolder="Write private note here"/>
      </Grid>
    </Grid>
  );
}
