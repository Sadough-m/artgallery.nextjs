import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Orders.module.css";

// gm : files ↓
import PdfSvg from "../../../../public/images/icons/PDF.svg";
import CheckBoxTable from "../../../Forms/CheckBoxTable";

// gm : Data ↓
const Data = [
  {
    id: 1,
    Payment: "Payment #001",
    Time: "28/10/2021",
    Cost: "$18.00",
  },
  {
    id: 2,
    Payment: "Payment #002",
    Time: "28/10/2021",
    Cost: "$18.00",
  },
];

// gm : components ↓

export default function Table() {
  // gm : states ↓
  const [List, setArtists] = useState([]);
  const [allSelect, setAllSelect] = useState(false);

  // change status of checkBox
  useEffect(() => {
    setArtists(Data);
  }, [Data]);
  const handleChange = (artistId) => {
    if (artistId === "allSelect") {
      let tempArtist = List.map((MyItem) => {
        return { ...MyItem, isChecked: !allSelect };
      });
      setAllSelect(!allSelect);
      setArtists(tempArtist);
    } else {
      let tempArtist = List.map((MyItem) =>
        MyItem.id === artistId
          ? { ...MyItem, isChecked: !MyItem.isChecked }
          : MyItem
      );
      setArtists(tempArtist);
    }
  };

  return (
    <Grid item className={Style.TableOrders}>
      {/* Header */}
      <Grid item className={Style.PTable}>
        <Grid container className={Style.TitleTable}>
          <Grid item className={Style.TableTitle_12}>
            <Grid item className={Style.P_check1}>
              <CheckBoxTable
                artistId="allSelect"
                handleChange={handleChange}
                artists={List}
              />
            </Grid>
            Payment
          </Grid>
          <Grid item className={Style.TableTitle_2}>
            Date
          </Grid>
          <Grid item className={Style.TableTitle_3}>
            Cost
          </Grid>
          <Grid item className={Style.TableTitle_4}></Grid>
        </Grid>

        {/* Start Body */}
        {List?.map((Item) => (
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            className={Style.RowTable}
          >
            <Grid item className={Style.TableBody_1}>
              <Grid item className={Style.P_check}>
                <CheckBoxTable
                  artistId={Item.id}
                  handleChange={handleChange}
                  artists={List}
                  checked={Item.isChecked}
                />
              </Grid>
              Payment #001
            </Grid>
            <Grid item className={Style.TableBody_2}>
              28/10/2021
            </Grid>
            <Grid item className={Style.TableBody_3}>
              $18.00
            </Grid>
            <Grid item className={Style.TableBody_4}>
              <IconButton>
                <Image src={PdfSvg} />
              </IconButton>
            </Grid>
          </Grid>
        ))}

      </Grid>
      {/* End Body */}
    </Grid>
  );
}
