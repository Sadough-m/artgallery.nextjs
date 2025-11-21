import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/UserSettings.module.css";

// gm : files ↓
import plusCircleSvg from "../../../../public/images/icons/Plus - Circle white.svg";
import Location from "./Location";
import CreateLocation from "../../../Modals/UserSettings/CreateLocation";

// gm : components ↓

export default function Locations({ LocationList, setLocationList }) {
  // gm : states ↓
  const [CreateLocationModal, setCreateLocationModal] = useState(false)

  // location list is empty or not
  const isEmpty = true;

  // open and close add new location modal
  const handleNewLocation = () => {
    setCreateLocationModal(!CreateLocationModal)
  }

  return (
    <Grid item>
      {/* title  */}
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item className="fs16fw500">
          Locations
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Image src={plusCircleSvg} />}
            className={Style.CreateLocation}
            onClick={() => handleNewLocation()}
          >
            Create Location
          </Button>
        </Grid>
      </Grid>

      {/* location List  */}
      <Grid item className={!LocationList?.length ? Style.EmptyLocation : ""}>
        {!LocationList?.length && "No Locations added yet"}
        {LocationList?.length > 0 && (
          <Grid container alignItems="center" justifyContent="space-between" className={LocationList && LocationList?.length > 6 ? Style.ScrollableLocation:"" }>
            {
              LocationList && LocationList?.map((item) => (
                <Location setLocationList={setLocationList} key={item?.id} Data={item} />
              ))
            }
          </Grid>
        )}
      </Grid>

      {/* modal add new location */}
      <CreateLocation
        open={CreateLocationModal}
        setLocationList={setLocationList}
        handleModal={() => handleNewLocation()}
      />
    </Grid>
  );
}
