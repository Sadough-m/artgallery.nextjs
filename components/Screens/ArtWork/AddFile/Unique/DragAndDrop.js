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
    // ------ for detect page size ---------------------------------------------- >>>>
    const [width, height] = useWindowSize();
    // End ---------------------------------------------------------------------- >>>>
    const LocalClassificationID = parseInt(Cookies.get("ClassificationID"));
    const [sameMedia, setSameMedia] = useState(false);

    // ------ localy Data for two type ------------------------------------------ >>>>
    const [items, setItems] = React.useState({
        left: Data,
    });
    // End ---------------------------------------------------------------------- >>>>
    // End -------------------------------------------------------------------------------------------------------------------------

    // mrx : make all data to the same like original to all ------------------------------------------------------------------------
    const handleSelectItem = (value) => {
        if (sameMedia) {
            setSelectButton(0);
            Cookies.set("Limited-ID", value);
        } else {
            setSelectButton(value);
            Cookies.set("Limited-ID", value);
        };
    };
    // End -------------------------------------------------------------------------------------------------------------------------

    // mrx : select button Items  --------------------------------------------------------------------------------------------------
    useEffect(() => {
        handleSelectItem(Cookies.get("Limited-ID"));
    }, [sameMedia]);
    // End -------------------------------------------------------------------------------------------------------------------------

    // mrx : change Data after Changed All ( Props )  ------------------------------------------------------------------------------
    useEffect(() => {
        setItems({ left: Data });
    }, [Data])
    // End -------------------------------------------------------------------------------------------------------------------------

    // mrx : change Data after Changed All ( Props )  ------------------------------------------------------------------------------
    useEffect(() => {
        setUploadingFileMedia(items?.left)
    }, [items])
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

        const result = swap(items["left"], sourceIndex, targetIndex);
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

    return (
        <>
            {
                GenerateBtnType()
            }
            <GridContextProvider onChange={onChange}>
                <div style={{ marginTop: Uploading ? "45px" : "15px" }} className="container">
                    <GridDropZone
                        className="dropzone"
                        id="left"
                        boxesPerRow={width > 960 ? 4 : 1}
                        rowHeight={width > 960 ? 113 : 75}
                    >
                        {items && items?.left?.filter(item => item?.classificationType === LocalClassificationID)?.map(item => (
                            // {/* <p>{item?.fileExtention}</p> */}
                            <GridItem key={item?.id}>
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

            {
                GenerateBottomType()
            }
        </>
    )
}
