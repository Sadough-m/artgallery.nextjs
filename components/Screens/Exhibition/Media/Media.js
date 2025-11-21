import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Exhibition.module.css";

// gm : files ↓
import ImportFileSvg from "../../../../public/images/icons/ImportWhite.svg";
import ArrangeMentSvg from "../../../../public/images/icons/Arrangement.svg";
import ArrowRightSvg from "../../../../public/images/icons/Arrow right blue.svg";
import ImportSvg from "../../../../public/images/icons/importFile.svg";

// gm : components ↓
import Img from "./Img";
import Arrangement from "./Arrangement";
import ThreeDInput from "./ThreeDInput";

export default function Media({ IsEmpty }) {
  // gm : states ↓
  const [ModalMedia, setModalMedia] = useState(false)

  return (
    <Grid item className={Style.Media_2}>
      <Grid item className={Style.TitleArtworks_2}>
        Media
      </Grid>

      <Grid item className={Style.Media_wrapper}>
        {IsEmpty && (
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            className={Style.Media_3}
            direction="column"
          >
            <Grid item>
              <img src={ImportSvg.src} />
            </Grid>
            <Grid item className={Style.AddText}>
              Add file
            </Grid>
            <Grid item className={Style.DropDownText}>
              Or drop files to upload
            </Grid>
          </Grid>
        )}

        {/* Files */}
        {!IsEmpty && (
          <>
            <Button
              variant="contained"
              color="primary"
              startIcon={<img src={ImportFileSvg.src} />}
              className={Style.BtnUpload}
              
            >
              Upload File
            </Button>
            <Grid container className={Style.WrapperImages}>
              <Img Uploading={false} IsSupport={true} />
              <Img Uploading={false} IsSupport={true} />
              <Img Uploading={false} IsSupport={false} />
              <Img Uploading={true} IsSupport={false} />
              <Img Uploading={true} IsSupport={false} />
              <Img Uploading={true} IsSupport={false} />
              <Img Uploading={true} IsSupport={false} />
            </Grid>

            {/* Components */}
            <Arrangement />
            <ThreeDInput />
          </>
        )}
      </Grid>
    </Grid>
  );
}
