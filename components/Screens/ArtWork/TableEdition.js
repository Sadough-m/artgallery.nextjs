import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";

// good man : material ui ↓
import { Button, Grid, Hidden, IconButton } from "@material-ui/core";

// mrx : api links ↓
import {
  DELETE_EDITIONS_IN_ARTWORK
} from "../../../pages/api/index";

// mrx : api ↓
import {
  PostUrl,
  PostAuthUrl,
  GetUrl,
  GetAuthUrl,
} from "../../../pages/api/config";

// good man : styles ↓
import ArtWorkStyle from "../../../styles/artworkflow.module.css";

// mrx : setCookies with this
import Cookies from "js-cookie";

// mrx : context ↓
import { Context } from "../../../context/index";

// good man : files ↓
import imageArt from "../../../public/images/list art.png";
import EditIcon from "../../../public/images/icons/Edit.svg";
import deleteIcon from "../../../public/images/icons/Trash black.svg";
import IconCheck from "../../../public/images/icons/Check - Circle.svg";

// good man : components ↓
import CheckBoxTable from "../../Forms/CheckBoxTable";

export default function TableEdition({
  handleTable,
  TableData,
  ShowOriginalAndReproduction,
  setShowOriginalAndReproduction,
}) {
  // mrx : states ↓
  const [table, setTable] = useState([]);
  const [allSelect, setAllSelect] = useState(false);
  const [selectedItem, setSelectedItem] = useState(false);
  const [CheckedItems, setCheckedItems] = useState([]);

  // navigate beetween pages
  const router = useRouter();

  // mrx : context Data Start ------------------------------------------------------------------------------------
  const { setSignleItemId, setLoadingPage, SignleItemId, setShowDisOrSaveLimited } = useContext(Context);
  // mrx : End ---------------------------------------------------------------------------------------------------

  useEffect(() => {
    setTable(TableData?.editions);
  }, [TableData?.editions]);

  useEffect(() => {
    handleSelectedItem();
  }, [table]);

  // change status of checkBox
  const handleChange = (artworkId) => {
    if (artworkId === "allSelect") {
      let tempTable = table?.map((item) => {
        return { ...item, isChecked: !allSelect };
      });
      setAllSelect(!allSelect);
      setTable(tempTable);
      setCheckedItems(tempTable?.filter((item) => item?.isChecked === true)?.map((item) => item?.id))
    } else {
      let tempTable = table?.map((item) =>
        item?.editionId === artworkId
          ? { ...item, isChecked: !item?.isChecked }
          : item
      );
      setCheckedItems(tempTable?.filter((item) => item?.isChecked === true)?.map((item) => item?.id))
      setTable(tempTable);
    }
  };

  //detect at least one item selected
  const handleSelectedItem = () => {
    setSelectedItem(false);
    table?.map((item) => {
      if (item?.isChecked) {
        setSelectedItem(true);
      }
    });
  };

  // get selecte inputs called from useEffcect Start -------------------------------------------------------------------
  const DELETE_EDITIONS = () => {
    setLoadingPage(true);
    PostAuthUrl(DELETE_EDITIONS_IN_ARTWORK(localStorage.getItem("collectionId")), {
      checkedItems: CheckedItems
    }).then(
      (res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            setLoadingPage(false);
            location.reload();
          } else {
            toast.error(res?.data?.message);
            setLoadingPage(false);
          }
        } else {
          toast.error("something went wrong !");
          setLoadingPage(false);
        }
      }
    );
  };
  //  End --------------------------------------------------------------------------------------------------------------

  return (
    <Grid item style={{ marginTop: "15px" }}>
      <Grid container direction="column">
        {selectedItem && (
          <Grid item>
            <Grid
              container
              justifyContent="space-between"
              className={ArtWorkStyle.P_buttonTable}
            >
              <Grid item>
                <Button
                  onClick={() => DELETE_EDITIONS()}
                  startIcon={<Image src={deleteIcon} />}
                  className={ArtWorkStyle.buttonDeleteTable}
                >
                  Delete Editions
                </Button>
              </Grid>
              <Grid item>
                {/* <Button
                  startIcon={<Image src={IconCheck} />}
                  variant="contained"
                  color="secondary"
                  className={ArtWorkStyle.BtnSave}
                >
                  Save
                </Button> */}
              </Grid>
            </Grid>
          </Grid>
        )}

        <Grid item className={ArtWorkStyle.P_tableArtwork_2}>
          <div className={ArtWorkStyle.P_tableArtists_MobileScroll}>
            <table className={ArtWorkStyle.tableArtists_MobileScroll}>
              <tr className={ArtWorkStyle.header_table1}>
                <th className={ArtWorkStyle.header_checkbox1}>
                  {/* check box all select */}
                  <CheckBoxTable
                    artistId="allSelect"
                    handleChange={handleChange}
                    artists={table}
                  />
                </th>

                <th className={ArtWorkStyle.headerType}>Type</th>
                <th className={ArtWorkStyle.headerItem}>W</th>
                <th className={ArtWorkStyle.headerItem}>H</th>

                <th className={ArtWorkStyle.headerItem}> {parseInt(TableData?.medium) === 0 ? "U" : "D"} </th>

                <th className={ArtWorkStyle.headerItem}>Price</th>
                <th className={ArtWorkStyle.headerEdit}>
                  <IconButton
                    onClick={() => { setShowOriginalAndReproduction(true); setShowDisOrSaveLimited(true) }}
                  >
                    <Image src={EditIcon} />
                  </IconButton>
                </th>
              </tr>

              {table?.map((item) => (
                <>
                  <tr className={ArtWorkStyle.tableData1} key={item?.editionId}>
                    <td className={ArtWorkStyle.artist_checkBox2}>
                      <CheckBoxTable
                        artistId={item?.editionId}
                        checked={item?.isChecked}
                        handleChange={handleChange}
                        artists={table}
                      />
                    </td>

                    <td className={ArtWorkStyle.TypeTable}>{item?.type}</td>

                    <td className={ArtWorkStyle.itemTabe}>
                      {item?.size_Width}
                    </td>
                    <td className={ArtWorkStyle.itemTabe}>
                      {item?.size_Height}
                    </td>
                    <td className={ArtWorkStyle.itemTabe}>
                      {parseInt(TableData?.medium) === 0 ? item?.sizeUnitName : item?.size_Depth}
                    </td>

                    <td className={ArtWorkStyle.itemTabe}></td>

                    <td className={ArtWorkStyle.itemTabe}>
                      <IconButton
                        onClick={() => {
                          setSignleItemId(item?.editionId);
                          Cookies.set("Selected-item-single", item?.type);
                          router.push(`/artwork/single`);
                        }}
                      >
                        <Image src={EditIcon} />
                      </IconButton>{" "}
                    </td>
                  </tr>
                </>
              ))}
            </table>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}
