import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import {
  Button,
  Grid,
  Hidden,
  IconButton,
  Modal,
  Slide,
} from "@material-ui/core";

// gm : styles ↓
import Style from "../../../styles/Home.module.css";

// gm : files ↓
import Filters from "../../../public/images/icons/Filters.svg";
import CloseSvg from "../../../public/images/icons/Close - Circle.svg";
import ArrowSvg from "../../../public/images/icons/Arrow left -2.svg";
import CustomSelect from "../../Forms/CustomSelect";

// gm : components ↓

export default function FilterMobile() {
  const [OpenFilterList, setOpenFilterList] = useState(false);

  return (
    <>
      <Grid item>
        <Grid item>
          <Grid item>
            <Button
              startIcon={<img src={Filters.src} />}
              onClick={() => setOpenFilterList(true)}
            >
              Filters
            </Button>

            <IconButton size="small">
              <img src={CloseSvg.src} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Modal
        open={OpenFilterList}
        onClose={() => setOpenFilterList(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Slide direction="right" in={OpenFilterList} mountOnEnter unmountOnExit>
          <Grid item className={Style.BoxMenu}>
            {/* Header */}
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              className={Style.HeaderFilter}
            >
              <Grid item className={Style.FilterText}>
                <IconButton onClick={() => setOpenFilterList(false)}>
                  <img src={ArrowSvg.src} />
                </IconButton>
                Filters
              </Grid>

              <Grid item>
                <Button color="primary">Clear All</Button>
              </Grid>
            </Grid>

            {/* Body */}
            <Grid item className={Style.P_Filters}>
              <CustomSelect label="Category" />
              <CustomSelect label="Tagged with" />
              <CustomSelect label="Last activity" />
              <CustomSelect label="Sort by" />
            </Grid>

            {/* Footer */}
            <Grid item className={Style.P_UpdateFilters}>
              <Button
                variant="contained"
                color="primary"
                className={Style.UpdateFilters}
              >
                Update Filters
              </Button>
            </Grid>
          </Grid>
        </Slide>
      </Modal>
    </>
  );
}
