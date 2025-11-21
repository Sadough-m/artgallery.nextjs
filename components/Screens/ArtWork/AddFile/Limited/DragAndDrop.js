import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReactDOM from "react-dom";
import Image from "next/image";

import {
    GridContextProvider,
    GridDropZone,
    GridItem,
    swap,
    move
} from "react-grid-dnd";
import useWindowSize from "../../../../../Hooks/useWindowSize";
import { Grid, Button, IconButton, Hidden } from "@material-ui/core";
import ButtonsList from "../ButtonsList";
import ArtWorkFlowStyle from "../../../../../styles/artworkflow.module.css";
import styles from "../../../../../styles/Home.module.css";

// mrx : setCookies with this
import Cookies from "js-cookie";

// mrx : api links ↓
import { BASE_Image_Url } from "../../../../../pages/api/index";

// mrx : components ↓
import Img from "../Img";
import CustomCheckBox from "../../../../Forms/CustomCheckBox";

// mrx : files
import importImg from "../../../../../public/images/icons/Import icon.svg";
import addFile from "../../../../../public/images/icons/importFile.svg";
import errorIcon from "../../../../../public/images/icons/error import.svg";

// mrx : Landing page ↓
export default function DragAndDrop({
    // mrx : Props Start -----------------------------------------------------------------------------------------------------------
    Uploading,
    Data,
    Error,
    setSelectButton,
    selectButton,
    NewUpload,
    setAllEditions,
    setUploadingFileMedia,
    handleDeleteItem,
    Medias,
    setMedias,
    handleChangeItemCaption
    // End -------------------------------------------------------------------------------------------------------------------------
}) {
    // mrx : States Start -----------------------------------------------------------------------------------------------------------
    // ------ for detect page size ---------------------------------------------- >>>>
    const [width, height] = useWindowSize();
    // End ---------------------------------------------------------------------- >>>>
    const LocalClassificationID = parseInt(Cookies.get("ClassificationID"));
    const [sameMedia, setSameMedia] = useState(false);

    // ------ localy Data for two type ------------------------------------------ >>>>
    const [items, setItems] = React.useState({});
    const [SData, setSData] = React.useState({});
    const [BottomCheckSize, setBottomCheckSize] = React.useState("-40px");
    // End ---------------------------------------------------------------------- >>>>
    // End -------------------------------------------------------------------------------------------------------------------------

    // GET EDITIONS FROM LOCAL STORAGE -------------------------------------------------------------------------------------------
    // const GET_EDITIONS = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("ArtWork-Editions-Media") || '[]' : '[]');
    // End -----------------------------------------------------------------------------------------------------------------------


    useEffect(() => {
        if (selectButton === 0) {
            return setMedias(
                Medias &&
                Medias?.map((Item) => {
                    return {
                        ...Item,
                        mediaSort: JSON.stringify(items[parseInt(Cookies.get("Limited-ID"))]),
                        medias: items[parseInt(Cookies.get("Limited-ID"))]
                    };
                })
            );
        } else {
            return setMedias(
                Medias &&
                Medias?.map((Item) => {
                    if (Item?.editionNumber === parseInt(Cookies.get("Limited-ID"))) {
                        return {
                            ...Item,
                            mediaSort: JSON.stringify(items[parseInt(Cookies.get("Limited-ID"))]),
                            medias: items[parseInt(Cookies.get("Limited-ID"))]
                        };
                    }
                    return Item;
                })
            );
        }
    }, [SData])

    useEffect(() => {
        const result = Medias?.map((item) => (
            {
                [item?.editionNumber]: item?.medias
            }
        ));

        setItems(Array.isArray(result) ? result.reduce((a, b) => Object.assign(a, b), {}) : result);
    }, [NewUpload])

    useEffect(() => {
        setAllEditions(sameMedia);
    }, [sameMedia])

    // End -------------------------------------------------------------------------------------------------------------------------

    // mrx : make all data to the same like original to all ------------------------------------------------------------------------
    const handleSelectItem = (value) => {
        if (sameMedia) {
            setSelectButton(0);
            Cookies.set("Limited-ID", 0);
        } else {
            setSelectButton(value);
            Cookies.set("Limited-ID", value);
        };
    };
    // End -------------------------------------------------------------------------------------------------------------------------

    // mrx : select button Items  --------------------------------------------------------------------------------------------------
    useEffect(() => {
        if (sameMedia === true) {
            setUploadingFileMedia([]);
            handleSelectItem(Medias && Medias?.map((Item) => Item?.editionNumber)[0]);
            setMedias(
                Medias &&
                Medias?.map((Item) => {
                    return {
                        ...Item,
                        mediaSort: JSON.stringify([]),
                        medias: []
                    };
                })
            );

            setMedias((prev) => [...prev, {
                editionNumber: 0,
                mediaSort: "[]",
                medias: [],
            }]);
            const result = Medias?.map((item) => (
                {
                    [item?.editionNumber]: []
                }
            ));

            setItems(Array.isArray(result) ? result.reduce((a, b) => Object.assign(a, b), {}) : result);
        } else {
            if (items[selectButton]?.length) {
                setUploadingFileMedia([]);
                const result = Medias?.map((item) => (
                    {
                        [item?.editionNumber]: []
                    }
                ));

                setItems(Array.isArray(result) ? result.reduce((a, b) => Object.assign(a, b), {}) : result);
            }
            localStorage.setItem("ArtWork-Editions-Media", JSON.stringify(
                Medias &&
                Medias?.map((Item) => {
                    return {
                        ...Item,
                        mediaSort: JSON.stringify([]),
                        medias: []
                    };
                })
            ));
            handleSelectItem(Medias && Medias?.map((Item) => Item?.editionNumber)[0]);
        }
    }, [sameMedia]);
    // End -------------------------------------------------------------------------------------------------------------------------

    useEffect(() => {
        if (width > 960) {
            if (items && items[selectButton]?.length >= 1) {
                setBottomCheckSize("-15px");
            } else {
                setBottomCheckSize("-40px");
            }
        } else {
            if (items && items[selectButton]?.length >= 1) {
                setBottomCheckSize("-5px");
            } else {
                setBottomCheckSize("-5px");
            }
        }
    }, [sameMedia, selectButton, Data])

    // mrx : select button Items  --------------------------------------------------------------------------------------------------
    useEffect(() => {
        if (selectButton === 0) {
            setSameMedia(true);
        }
    }, [selectButton]);
    // End -------------------------------------------------------------------------------------------------------------------------

    // mrx : on drag and drop ( Start )  -------------------------------------------------------------------------------------------
    function onChange(sourceId, sourceIndex, targetIndex, targetId) {
        if (targetId) {
            const result = move(
                items[sourceId],
                items[targetId],
                sourceIndex,
                targetIndex
            );
            return setItems({
                ...items,
                [sourceId]: result[0],
                [targetId]: result[1]
            });
        }

        const result = swap(items[sourceId], sourceIndex, targetIndex);
        setItems({
            ...items,
            [sourceId]: result
        });
        return setSData(items);
    }
    // End -------------------------------------------------------------------------------------------------------------------------

    // get top buttons by classification -------------------------------------------------------------------------------------------
    const GenerateBtnType = () => {
        if (LocalClassificationID === 0 && Uploading === false) {
            return (
                <Grid item style={{ marginTop: "45px" }}></Grid>
            )
        } else if (LocalClassificationID === 1 && Uploading === false) {
            return (
                <ButtonsList
                    status="LimitedEdition"
                    handleSelectItem={handleSelectItem}
                    selectButton={selectButton}
                    allSameImages={sameMedia}
                    sameMedia={sameMedia}
                />
            )
        } else if (LocalClassificationID === 2 && Uploading === false) {
            return (
                <ButtonsList
                    status="Reproduction"
                    handleSelectItem={handleSelectItem}
                    selectButton={selectButton}
                    allSameImages={sameMedia}
                    sameMedia={sameMedia}
                />
            )
        } else {
            return (
                <Grid item style={{ marginTop: "45px" }}></Grid>
            )
        }
    }
    // End -------------------------------------------------------------------------------------------------------------------------

    // get top buttons by classification -------------------------------------------------------------------------------------------
    const GenerateBottomType = () => {
        if (LocalClassificationID === 0 && Uploading === false) {
            return (
                <></>
            )
        } else if (LocalClassificationID === 1 && Uploading === false) {
            return (
                <>
                    {/* <div
                        style={{ position: "relative" }}
                    > */}
                    <Grid
                        style={{
                            position: "absolute",
                            bottom: BottomCheckSize,
                            marginTop: Error ? "-31px" : "15px",
                            zIndex: "11"
                        }}
                        item
                        className={ArtWorkFlowStyle.checkBox_media}
                    >
                        <Grid container alignItems="center" spacing={1}>
                            <Grid item className={ArtWorkFlowStyle.mt_10}>
                                <CustomCheckBox
                                    label="Medias are same for all editions"
                                    setChecked={setSameMedia}
                                    checked={sameMedia}
                                >
                                    {!sameMedia && width > 960 && (
                                        <span item className={ArtWorkFlowStyle.text_indivually}>
                                            &nbsp;<span style={{ fontSize: "10px" }}>(add indivually for each edition)</span>
                                        </span>
                                    )}
                                </CustomCheckBox>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        style={{
                            marginTop: Error ? "-31px" : "15px",
                            marginBottom: "30px",
                            height: width < 960 && "95px",
                            top: items && items[selectButton]?.length >= 1 ? "0px" : "65px",
                            display: items && items[selectButton]?.length >= 1 ||
                                sameMedia === true && Medias && Medias?.map((Item) => Item?.medias)[0]?.length >= 1
                                ? "none" : "block",
                        }}
                        item className={ArtWorkFlowStyle.boxDotted}>
                        <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                            className={width > 960 ? ArtWorkFlowStyle.P_top15 : ArtWorkFlowStyle.P_top30}
                        >
                            <Grid item>
                                <Grid
                                    container
                                    direction={width > 960 ? "column" : "row"}
                                    alignItems="center"
                                    spacing={1}
                                >
                                    {/* <Grid item>
                                        <Image src={addFile} />
                                    </Grid> */}
                                    <Grid item className={ArtWorkFlowStyle.addFile}>
                                        No Media
                                    </Grid>
                                    <Hidden smDown>
                                        <Grid item className={ArtWorkFlowStyle.Desc_addFile}>
                                            Click on upload Button
                                        </Grid>
                                    </Hidden>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* </div> */}
                </>
            )
        } else if (LocalClassificationID === 2 && Uploading === false) {
            return (
                <Grid
                    style={{ marginTop: Error ? "-31px" : "15px" }}
                    item
                    className={ArtWorkFlowStyle.checkBox_media}
                >
                    <Grid container alignItems="center" spacing={1}>
                        <Grid item className={ArtWorkFlowStyle.mt_10}>
                            <CustomCheckBox
                                label="Medias are same for all editions"
                                setChecked={setSameMedia}
                                checked={sameMedia}
                            >
                                {!sameMedia && width > 960 && (
                                    <span item className={ArtWorkFlowStyle.text_indivually}>
                                        &nbsp;<span style={{ fontSize: "10px" }}>(add indivually for each edition)</span>
                                    </span>
                                )}
                            </CustomCheckBox>
                        </Grid>
                    </Grid>
                </Grid>
            )
        } else {
            return (
                <></>
            )
        }
    }
    // End -------------------------------------------------------------------------------------------------------------------------


    return (
        <>
            {
                GenerateBtnType()
            }
            <>
                <GridContextProvider onChange={onChange}>
                    {
                        Medias?.map((Item) => (
                            <div
                                style={{
                                    marginTop: Uploading ? "0px" : "15px",
                                    filter: Item?.editionNumber === parseInt(Cookies.get("Limited-ID")) ? "opacity(1)" : "opacity(0)",
                                    zIndex: Item?.editionNumber === parseInt(Cookies.get("Limited-ID")) ? "1" : "0",
                                    position: Item?.editionNumber === parseInt(Cookies.get("Limited-ID")) ? "absolute" : "fixed",
                                }}
                                className="container"
                            >
                                <GridDropZone
                                    className={width > 960 ? "dropzone" : "dropzoneLimitedMobile"}
                                    id={Item?.editionNumber}
                                    boxesPerRow={width > 960 ? 4 : 1}
                                    rowHeight={width > 960 ? 113 : 75}
                                >
                                    {
                                        items && items[Item?.editionNumber]?.length >= 1 ? (
                                            items && items[Item?.editionNumber]?.map((item) => (
                                                <GridItem key={item?.id} id={item?.id}>
                                                    {/* <p>{item?.fileExtention}</p> */}
                                                    <Img
                                                        handleDeleteItem={handleDeleteItem}
                                                        Item={item}
                                                        Data={Data}
                                                        handleChangeItemCaption={handleChangeItemCaption}
                                                    />
                                                </GridItem>
                                            ))
                                        ) : (
                                            <>

                                            </>
                                        )
                                    }
                                </GridDropZone>
                            </div>
                        ))
                    }
                </GridContextProvider>
            </>

            {
                GenerateBottomType()
            }
        </>
    )
}
