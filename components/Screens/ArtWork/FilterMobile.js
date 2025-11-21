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

export default function FilterMobile({
  setFilter,
  Data,
  Statuse,
  setStatuse,
  SortBy,
  setSortBy
}) {
  const [OpenFilterList, setOpenFilterList] = useState(false);


  const ClearAllValue = () => {
    setSortBy(null);
    setStatuse(null);
    setOpenFilterList(false);
    setFilter({
      statuse: { name: Data?.statuse?.filter((item) => item?.id === Statuse)?.map((item) => item?.name), id: Statuse },
      tags: { name: null, id: null },
      sortBy: { name: Data?.sortBy?.filter((item) => item?.id === SortBy)?.map((item) => item?.name), id: SortBy },
    })
  }

  const HandleFilter = () => {
    setOpenFilterList(false);
    setFilter({
      statuse: { name: Data?.statuse?.filter((item) => item?.id === Statuse)?.map((item) => item?.name), id: Statuse },
      tags: { name: null, id: null },
      sortBy: { name: Data?.sortBy?.filter((item) => item?.id === SortBy)?.map((item) => item?.name), id: SortBy },
    })
  }

  const handleFilterMobileRemove = () => {
    setSortBy(null);
    setStatuse(null);
    setOpenFilterList(false);
    setFilter({
      statuse: { name: Data?.statuse?.filter((item) => item?.id === Statuse)?.map((item) => item?.name), id: Statuse },
      tags: { name: null, id: null },
      sortBy: { name: Data?.sortBy?.filter((item) => item?.id === SortBy)?.map((item) => item?.name), id: SortBy },
    })
  }


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
            {
              Statuse !== null || SortBy !== null ? (
                <IconButton
                  onClick={() => handleFilterMobileRemove()}
                  size="small">
                  <img src={CloseSvg.src} />
                </IconButton>
              ) : (
                <></>
              )
            }
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
              {
                Statuse !== "" || SortBy !== "" ? (
                  <Grid item>
                    <Button
                      onClick={() => ClearAllValue()}
                      color="primary">Clear All</Button>
                  </Grid>
                ) : (
                  <></>
                )
              }

            </Grid>

            {/* Body */}
            <Grid item className={Style.P_Filters}>
              <CustomSelect
                Data={Data?.statuse}
                label="Statuse"
                value={Statuse}
                setValue={setStatuse}
                setSelectName={setStatuse}
                SelectName={Data?.statuse?.filter((item) => item?.id === Statuse)?.map((item) => item?.name)}
              />
              <CustomSelect
                Data={Data?.sortBy}
                value={SortBy}
                setValue={setSortBy}
                setSelectName={setSortBy}
                SelectName={Data?.sortBy?.filter((item) => item?.id === SortBy)?.map((item) => item?.name)}
                label="Sort by"
              />
            </Grid>

            {/* Footer */}
            <Grid item className={Style.P_UpdateFilters}>
              <Button
                onClick={() => HandleFilter()}
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
