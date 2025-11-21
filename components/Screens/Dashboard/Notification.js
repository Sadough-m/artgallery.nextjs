import React, { useState, useEffect } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../styles/Dashboard.module.css";
import NotificationItem from "./NotificationItem";

// gm : files ↓

// gm : components ↓

export default function Notification({
    Tag,
    Notifications
}) {
    // gm : states ↓

    //as: first load

    return (
        <>
            {
                Notifications?.length && Tag !== "NEW" ? (
                    <Grid item className={Style.Notification}>
                        <Grid item className={Tag === "New" ? Style.TitleNT_New : Style.TitleNT_All}>
                            {Tag === "New" ? "New" : "All"}
                        </Grid>
                        <span className={Tag === "New" ? Style.LineNotifi_New : Style.LineNotifi_All}></span>
                        <Grid item className={Style.ScroolNtf}>
                            {
                                Notifications && Notifications?.map((x, ind) =>
                                    <NotificationItem key={ind} title={x?.description} date={x?.date} />
                                )
                            }
                        </Grid>

                    </Grid>
                ) : (
                    <></>
                )
            }

        </>
    );
}
