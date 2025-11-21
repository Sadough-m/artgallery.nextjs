import React, { useState } from "react";
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
import CreateEmailList from "../../../Modals/UserSettings/CreateEmailList";

export default function EmailList({ ChangeSelect, Data, refreshEmit }) {
  // gm : states ↓

  const [CreateEmailListModal, setCreateEmailListModal] = useState(false);

  console.log("Data " + Data)

  //sa: reFetch Data from db
  const reFetchEmailList = () => {
    refreshEmit()
    setCreateEmailListModal(false)
  }

  return (
    <Grid item>
      {/* title  */}
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item className="fs16fw500">
          Email List
        </Grid>
        <Grid item className={Style.p_btnEmailList}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Image src={plusCircleSvg} />}
            className={Style.CreateLocation}
            onClick={() => setCreateEmailListModal(true)}
          >
            Create Email List
          </Button>
        </Grid>
      </Grid>

      {/* Email List  */}
      {Data[0] ? (
        <Grid container alignItems="center" justifyContent="space-between" className={Style.ScrollableLocation}>
          {Data && Data?.map((item, ind) => (
            <Grid style={{ position: "relative" }} className="w-100">
              <Email ChangeSelect={ChangeSelect} key={ind} Data={item} refreshEmailList={reFetchEmailList} />
            </Grid>
          )
          )}
        </Grid>
      ) : (
        <Grid item className={Style.EmptyLocation}>
          No email list added yet
        </Grid>
      )}

      {/* modal add new Email */}
      <CreateEmailList
        open={CreateEmailListModal}
        handleModal={reFetchEmailList}
      />
    </Grid>
  );
}
