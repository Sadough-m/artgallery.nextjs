import React, { useState, useEffect } from "react";
import Joi from "joi";
import { toast } from "react-toastify";

// mrx : material ui
import { Grid, Modal, Fade } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { Hidden, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import { CircularProgress } from "@material-ui/core";

// mrx : api links ↓
import {
    ADD_NEW_ADDRESS
} from "../../../pages/api/index";

// mrx : api ↓
import {
    PostUrl,
    PostAuthUrl,
    PutAuthUrl,
    GetUrl,
    GetAuthUrl,
} from "../../../pages/api/config";

// mrx : components
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import styles from "../../../styles/Home.module.css";
import useWindowSize from "../../../Hooks/useWindowSize";
import EditAddress from "./EditAddress";

// gm : files ↓
import closeIcon from "../../../public/images/icons/Close12.svg";


export default function AddNewAddress({
    open,
    handleModal,
    AllData,
    getArtistDetails,
    setAddress,
    item
}) {

    const [width, height] = useWindowSize();
    return (
        <Grid item>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleModal}
                closeAfterTransition
                className={styles.newModal}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Grid item className={styles.wrapper_modal592_mbileScroll}>
                        {/* title */}
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Grid item className={styles.TitleModal}>
                                Edit address
                            </Grid>
                            <Grid item>
                                <IconButton
                                    size="small"
                                    className={styles.border_btn}
                                    onClick={() => { handleModal() }}
                                >
                                    <img src={closeIcon.src} />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <EditAddress
                            AllData={AllData}
                            getArtistDetails={getArtistDetails}
                            setValue={setAddress}
                            shippingAddress={item}
                            handleModal={handleModal}
                            handleModal={() => handleModal()}
                        />
                    </Grid>
                </Fade>
            </Modal>
        </Grid >
    );
}
