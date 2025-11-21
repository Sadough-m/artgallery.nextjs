import React, { useState, useEffect } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../styles/Dashboard.module.css";
import Notification from "../../components/Screens/Dashboard/Notification";

//sa :fetch
import { GetAuthUrl, PostAuthUrl } from '../api/config'

// sa : receive notifications func
import { GET_NOTIFICATIONS_URL, MAKE_NOTIFICATION_SEEN_URL } from '../api/index'

// sa : get userId
import getUserId from "../../Hooks/getUserId";
import { toast } from "react-toastify";

// gm : files ↓

// gm : components ↓

export default function NotificationPage() {
    //sa : states
    const [unSeenNotification, setUnSeenNotification] = useState([])
    const [seenNotification, setSeenNotification] = useState([])

    // sa: get notification func
    const getNotification = () => {
        PostAuthUrl(GET_NOTIFICATIONS_URL(), {
            "relatedId": getUserId(),
            "notificationType": 0,
            "take": 0,
            "skip": 0
        })
            .then(res => {
                if (res && res.status === 200) {
                    if (res?.data?.isSuccess) {
                        // console.log('GET_NOTIFICATIONS_URL',res.data)
                        setUnSeenNotification(res?.data?.data?.filter(x => !x.isSeen))
                        setSeenNotification(res?.data?.data?.filter(x => x.isSeen))
                    } else {
                        toast.error(res?.data?.message);
                    }
                } else {
                    toast.error("something went wrong !");
                }
            })
    }
    
    // gm : first call ↓
    useEffect(() => {
        getNotification()
    }, [])

    return (
        <Grid item className={Style.wrapper_Notifi}>
            {/* title */}
            <Grid item className={Style.Title_Notifi}>
                <span className={Style.badge_dot_Gr}></span> Notification
            </Grid>
            <Notification Tag="New" Notifications={unSeenNotification} />
            <Notification Tag="All" Notifications={seenNotification} />
        </Grid>
    );
}
