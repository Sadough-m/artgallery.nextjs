import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import ColStyle from "../../../../styles/Collection.module.css";

// gm : files ↓
import importIcon from "../../../../public/images/icons/Plus - Circle.svg";
import addIconGray from "../../../../public/images/icons/Plus - Circle disbled.svg";
import guy1 from "../../../../public/images/guy.png";
import guy2 from "../../../../public/images/guy5.png";
import guy3 from "../../../../public/images/guy4.png";
import LoadingSpinerSvg from "../../../../public/loading.svg";

// mrx : api
import {
  BASE_Image_Url,
} from "../../../../pages/api";

import { GetUrl, GetAuthUrl, PutAuthUrl } from "../../../../pages/api/config";

// mrx : context ↓
import { Context } from "../../../../context/index";

// mrx : cookies
import Cookies from "js-cookie";

import Collabrator from "./Collabrator";
import AddCollabrator from "../../../Modals/Collection/AddCollabrator";

// gm : components ↓

export default function Collabrators({ LoadingImages, getCreateCollectionData, Data }) {
  // gm : states ↓
  const [ModalCollabrator, setModalCollabrator] = useState(false)

  // handle collabrator modal
  const handleCollabrator = () => {
    setModalCollabrator(!ModalCollabrator)
  }

  return (
    <Grid item>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item className="fs14fw500">
          Collabrators{" "}
        </Grid>
        <Grid item>
          <Button
            variant="text"
            color="primary"
            startIcon={<Image src={true ? importIcon : addIconGray} />}
            onClick={() => handleCollabrator()}
          >
            Add Collabrator
          </Button>
        </Grid>
      </Grid>
      <Grid
        style={{
          margin: "auto",
          width: "100%",
          textAlign: "center"
        }}
        item xs={12} className={`${ColStyle.w_100}`}>
        {
          LoadingImages === true && (
            <Image height="60" src={LoadingSpinerSvg} />
          )
        }
      </Grid>
      <Grid item style={{ marginTop: "10px" }}>

        {
          Data && Data?.map((item, index) => (
            <Collabrator
              key={index}
              getCreateCollectionData={getCreateCollectionData}
              Data={item}
              loading={LoadingImages}
            />
          ))
        }
      </Grid>
      <AddCollabrator
        getCreateCollectionData={getCreateCollectionData}
        open={ModalCollabrator}
        handleModal={() => handleCollabrator()}
      />
    </Grid>
  );
}
