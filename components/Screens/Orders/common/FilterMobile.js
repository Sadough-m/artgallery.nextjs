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
import Style from "../../../../styles/Home.module.css";

// gm : files ↓
import Filters from "../../../../public/images/icons/Filters.svg";
import CloseSvg from "../../../../public/images/icons/Close - Circle.svg";
import ArrowSvg from "../../../../public/images/icons/Arrow left -2.svg";
import CustomSelect from "../../../Forms/CustomSelect";

// gm : components ↓

export default function FilterMobile({
  setFilter,
  Data,
  onFilter,

  setStatus,
  Status,
  setDestination,
  Destination,
  SortBy,
  setSortBy,
  setTypeFilter,
  setSortFilter,
  setSortDestination,
  setSorStatuse,
  TypeWithData,
  setTypeWithData,
}) {
  const [OpenFilterList, setOpenFilterList] = useState(false);

  const ClearAllValue = () => {
    setSortBy("");
    setOpenFilterList(false);
    setTypeWithData("");
    setTypeFilter(null);
    setSortFilter(null);
    setDestination(null);
    setStatus(null);
    setFilter({
      type: { name: "", id: 0 },
      sortBy: { name: "", id: 0 },
    });
  }

  const HandleFilter = () => {
    setTypeFilter(Data?.type?.filter((item) => item?.id === TypeWithData)?.map((item) => item?.id)[0]);
    setSortFilter(Data?.sortBy?.filter((item) => item?.id === SortBy)?.map((item) => item?.id)[0]);
    setSortDestination(Data?.destination?.filter((item) => item?.id === Destination)?.map((item) => item?.id)[0]);
    setSorStatuse(Data?.status?.filter((item) => item?.id === Status)?.map((item) => item?.id)[0]);
    setOpenFilterList(false);
    setFilter({
      type: { name: Data?.type?.filter((item) => item?.id === TypeWithData)?.map((item) => item?.name)[0], id: TypeWithData },
      sortBy: { name: Data?.sortBy?.filter((item) => item?.id === SortBy)?.map((item) => item?.name)[0], id: SortBy },
    })
  }

  const handleFilterMobileRemove = () => {
    setSortBy("");
    setTypeWithData("");
    setOpenFilterList(false);
    setFilter({
      type: { name: "", id: 0 },
      sortBy: { name: "", id: 0 },
    });
    setTypeFilter(null);
    setSortFilter(null);
    setSortDestination(null);
    setStatus(null);
    setDestination(null);
    setSorStatuse(null);
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
              TypeWithData !== "" || SortBy !== "" ? (
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
                TypeWithData !== "" || Destination !== "" || Status !== "" || SortBy !== "" ? (
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
                Data={Data?.destination}
                value={Destination}
                setValue={setDestination}
                setSelectName={setDestination}
                SelectName={Data?.destination?.filter((item) => item?.id === Destination)?.map((item) => item?.name)}
                label="Destination"
              />

              <CustomSelect
                Data={Data?.status}
                value={Status}
                setValue={setStatus}
                setSelectName={setStatus}
                SelectName={Data?.status?.filter((item) => item?.id === Status)?.map((item) => item?.name)}
                label="Statuse"
              />
              <CustomSelect
                Data={Data?.type}
                value={TypeWithData}
                setValue={setTypeWithData}
                setSelectName={setTypeWithData}
                SelectName={Data?.type?.filter((item) => item?.id === TypeWithData)?.map((item) => item?.name)}
                label="Type"
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
