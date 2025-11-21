import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Joi from "joi";
import { toast } from "react-toastify";

// gm : material ui ↓
import {
    Button,
    Fade,
    Grid,
    Hidden,
    IconButton,
    Modal,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";

// gm : styles ↓
import style from "../../../../styles/Home.module.css";

// gm : files ↓
import closeIcon from "../../../../public/images/icons/Close12.svg";
import ArrowRightSvg from "../../../../public/images/icons/ArrowRight.svg";
import Medium from "./Medium";
import Lists from "./Lists";
import TagsModal from "./TagsModal";
import AllArtworks from "./AllArtworks";

export default function AddArtwork({
    handleModal,
    ModalData,
    handleGetModalData
}) {
    // gm : states ↓

    return (
        <>
            {/* title */}
            < Grid container justifyContent="space-between" alignItems="center" >
                <Grid item className={style.TitleModal}>
                    Add artwork
                </Grid>
                <Grid item>
                    <IconButton
                        size="small"
                        className={style.border_btn}
                        onClick={handleModal}
                    >
                        <img src={closeIcon.src} />
                    </IconButton>
                </Grid>
            </Grid >

            {/* body */}
            <Grid  item className={`${style.bodyModal} ${style.P_tableArtists_MobileScroll}`} >
                {
                    ModalData?.listMenu && ModalData?.listMenu?.map((item) => (
                        <Grid
                            container
                            justifyContent="space-between"
                            className={style.P_List_Artworks}
                            onClick={() => handleGetModalData(item?.id, null, null, [], item?.isFirstMenu)}
                        >
                            <Grid item>{item?.title}</Grid>
                            <Grid item>
                                <img src={ArrowRightSvg.src} />
                            </Grid>
                        </Grid>
                    ))
                }

            </Grid >
        </>
    );
}
