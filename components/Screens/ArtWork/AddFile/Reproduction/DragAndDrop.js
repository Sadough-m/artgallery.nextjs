import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReactDOM from "react-dom";

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

// mrx : setCookies with this
import Cookies from "js-cookie";

// mrx : api links ↓
import { BASE_Image_Url } from "../../../../../pages/api/index";

// mrx : components ↓
import Img from "../Img";
import CustomCheckBox from "../../../../Forms/CustomCheckBox";

// mrx : Landing page ↓
export default function DragAndDrop({
    // mrx : Props Start -----------------------------------------------------------------------------------------------------------
    Uploading,
    Data,
    Error,
    setSelectButton,
    selectButton,
    handleDeleteItem,
    setUploadingFileMedia,
    handleChangeItemCaption
    // End -------------------------------------------------------------------------------------------------------------------------
}) {
    // mrx : States Start -----------------------------------------------------------------------------------------------------------
    // ------ for detect page size ----------------------------------------------
    const [width, height] = useWindowSize();
    // End ----------------------------------------------------------------------
    const LocalClassificationID = parseInt(Cookies.get("ClassificationID"));
    const [sameMedia, setSameMedia] = useState(false);
    const [ReproductionAllMediaData, setReproductionAllMediaData] = useState([]);

    // ------ localy Data for two type ----------------------------------------------
    const [items, setItems] = React.useState({
        Original: Data?.filter(item => parseInt(item?.LimitedSt) === 0),
        Reproduction: Data?.filter(item => parseInt(item?.LimitedSt) === 1),
    });
    // End --------------------------------------------------------------------------
    // End -------------------------------------------------------------------------------------------------------------------------

    // mrx : make all data to the same like original to all ------------------------------------------------------------------------
    const handleMakethemeSame = () => {
        setUploadingFileMedia(Data &&
            Data?.filter((Item) => Item?.LimitedSt === 0)
        )
        handleMergeLastMediaForReproduction(false)
    }
    // End -------------------------------------------------------------------------------------------------------------------------

    // mrx : select button Items  --------------------------------------------------------------------------------------------------
    const handleSelectItem = (value) => {
        if (sameMedia) {
            handleMakethemeSame()
            setSelectButton(0);
            Cookies.set("Limited-ID", value);
        } else {
            setSelectButton(value);
            Cookies.set("Limited-ID", value);
        };
    };
    // End -------------------------------------------------------------------------------------------------------------------------

    // mrx : after set same set the selected button to 0  --------------------------------------------------------------------------
    useEffect(() => {
        if (sameMedia) {
            handleSelectItem(0);
        } else {
            handleSelectItem(Cookies.get("Limited-ID"));
        }
    }, [sameMedia]);
    // End -------------------------------------------------------------------------------------------------------------------------

    // mrx : change Data after Changed All ( Props )  ------------------------------------------------------------------------------
    useEffect(() => {
        setItems({
            Original: items?.Original,
            Reproduction: items?.Reproduction
        });
    }, [Data])
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
        return setItems({
            ...items,
            [sourceId]: result
        });
    }
    // End -------------------------------------------------------------------------------------------------------------------------

    // get top buttons by classification -------------------------------------------------------------------------------------------
    const GenerateBtnType = () => {
        if (LocalClassificationID === 0 && Uploading === false) {
            return (
                <Grid item style={{ marginTop: "45px" }}></Grid>
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

    // set merged data in local when drag changed ----------------------------------------------------------------------------------
    useEffect(() => {
        handleMergeLastMediaForReproduction()
    }, [items])
    // End -------------------------------------------------------------------------------------------------------------------------

    // handler of up function ------------------------------------------------------------------------------------------------------
    const handleMergeLastMediaForReproduction = (adding = true) => {
        setReproductionAllMediaData([{
            "editionNumber": 0,
            "mediaSort": JSON.stringify(items?.Reproduction?.filter((item) => item?.LimitedSt === adding === false ? 0 : 0)?.map((item) => ({
                "fileUrl": item?.fullPath,
                "caption": item?.caption,
                "type": item?.type,
                "limitedSt": item?.limitedSt,
                "id": item?.id,
                "imageSize": item?.fileSize,
                "fileExtention": item?.fileExtention
            }))),
            "medias": items?.Reproduction?.filter((item) => item?.LimitedSt === adding === false ? 0 : 0)?.map((item) => ({
                "fileUrl": item?.fullPath,
                "caption": item?.caption,
                "type": item?.type,
                "id": item?.id,
                "limitedSt": item?.limitedSt,
                "imageSize": item?.fileSize,
                "fileExtention": item?.fileExtention
            }))
        },
        {
            "editionNumber": 1,
            "mediaSort": JSON.stringify(items?.Original?.filter((item) => item?.LimitedSt === adding === false ? 0 : 1)?.map((item) => ({
                "fileUrl": item?.fullPath,
                "caption": item?.caption,
                "type": item?.type,
                "limitedSt": item?.limitedSt,
                "id": item?.id,
                "imageSize": item?.fileSize,
                "fileExtention": item?.fileExtention
            }))),
            "medias": items?.Original?.filter((item) => item?.LimitedSt === adding === false ? 0 : 1)?.map((item) => ({
                "fileUrl": item?.fullPath,
                "caption": item?.caption,
                "type": item?.type,
                "id": item?.id,
                "limitedSt": item?.limitedSt,
                "imageSize": item?.fileSize,
                "fileExtention": item?.fileExtention
            }))
        }]);
        localStorage.setItem("ArtWork-Reproduction-Media-Meraged", JSON.stringify(ReproductionAllMediaData))
    }
    // End -------------------------------------------------------------------------------------------------------------------------

    // get item by right ClassificationID ------------------------------------------------------------------------------------------
    const getItems = () => {
        if (parseInt(selectButton) === 1) {
            return (
                <>
                    <GridContextProvider onChange={onChange}>
                        <div style={{ marginTop: Uploading ? "45px" : "15px" }} className="container">
                            <GridDropZone
                                className="dropzone Reproduction"
                                id="Reproduction"
                                boxesPerRow={width > 960 ? 4 : 1}
                                rowHeight={width > 960 ? 113 : 75}
                            >
                                {items?.Reproduction && items?.Reproduction?.map(item => (
                                    <GridItem key={item?.id}>
                                        {/* <p>{item?.fileExtention}</p> */}
                                        <Img
                                            handleDeleteItem={handleDeleteItem}
                                            Item={item}
                                            Data={Data}
                                            handleChangeItemCaption={handleChangeItemCaption}
                                        />
                                    </GridItem>
                                ))}
                            </GridDropZone>
                        </div>
                    </GridContextProvider>
                </>
            )
        } else if (parseInt(selectButton) === 0) {
            return (
                <>
                    <GridContextProvider onChange={onChange}>
                        <div style={{ marginTop: Uploading ? "45px" : "15px" }} className="container">
                            <GridDropZone
                                className="dropzone Original"
                                id="Original"
                                boxesPerRow={width > 960 ? 4 : 1}
                                rowHeight={width > 960 ? 113 : 75}
                            >
                                {items?.Original && items?.Original?.map(item => (
                                    <GridItem key={item?.id}>
                                        {/* <p>{item?.fileExtention}</p> */}
                                        <Img
                                            handleDeleteItem={handleDeleteItem}
                                            Item={item}
                                            Data={Data}
                                            handleChangeItemCaption={handleChangeItemCaption}
                                        />
                                    </GridItem>
                                ))}
                            </GridDropZone>
                        </div>
                    </GridContextProvider>
                </>
            )
        }
    }
    // End -------------------------------------------------------------------------------------------------------------------------

    return (
        <>
            {
                GenerateBtnType()
            }
            {getItems()}

            {
                GenerateBottomType()
            }
        </>
    )
}
