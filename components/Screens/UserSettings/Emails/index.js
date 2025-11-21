import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/UserSettings.module.css";

// gm : files ↓
import plusCircleSvg from "../../../../public/images/icons/Plus - Circle white.svg";

// gm : components ↓
import Email from "./Email";
import CreateEmail from "../../../Modals/UserSettings/CreateEmail";

export default function Emails({ Data, allEmailListData, refreshEmit }) {
  // gm : states ↓

  const [CreateEmailModal, setCreateEmailModal] = useState(false);
  const [EmailData, setEmailData] = useState([]);

  useEffect(() => {
    setEmailData(Data[0]);
  }, [Data])

  return (
    <Grid item>
      {/* title  */}
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item className="fs16fw500">
          Emails
        </Grid>
        <Grid item className={Style.p_btnEmailList}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Image src={plusCircleSvg} />}
            className={Style.CreateLocation}
            onClick={() => setCreateEmailModal(true)}
          >
            Create Email
          </Button>
        </Grid>
      </Grid>

      {/* Email List  */}


      {EmailData ? (
        <Grid container alignItems="center" justifyContent="space-between" className={Style.ScrollableLocation}>
          {EmailData && EmailData?.emails?.map((item, ind) => (
            <Email key={ind} emailListData={EmailData} emailListItem={item} allEmailListData={allEmailListData} refreshEmit={refreshEmit} />
          ))}
        </Grid>
      ) : (
        <Grid item className={Style.EmptyLocation}>
          No emails added yet
        </Grid>
      )}

      {/* modal add new Email */}
      <CreateEmail
        open={CreateEmailModal}
        handleModal={() => {
          refreshEmit()
          setCreateEmailModal(false)
        }}
        selectedEmailListData={Data[0]}
        allEmailListData={allEmailListData}
      />
    </Grid>
  );
}
