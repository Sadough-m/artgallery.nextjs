import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from "next/router";

// good man : material ui ↓
import {
    Button,
    Grid,
    IconButton
} from '@material-ui/core';

// good man : styles ↓
import signUpStyle from '../../../../../styles/signUp.module.css'
import Style from "../../../../../styles/UserSettings.module.css";

// mrx : context ↓
import { Context } from "../../../../../context/index";

// good man : files ↓
import remove from '../../../../../public/images/icons/Remove red.svg'
import edit from '../../../../../public/images/icons/Edit.svg'
import removeDisable from "../../../../../public/images/icons/Remove disable.svg";
import editSvg from "../../../../../public/images/icons/Edit.svg";

// good man : components ↓
import EditCv from '../../../../../components/Modals/CreateCV/EditRepresentationCv';
import RemoveItem from '../../../../../components/Modals/CreateCV/RemoveCv';

// mrx : api links ↓
import {
    PUBLISHING_CV_Reperesentation
} from '../../../../../pages/api/index';

// mrx : api ↓
import { PostUrl, GetUrl, GetAuthUrl, PutAuthUrl } from '../../../../../pages/api/config';

export default function Items({ CountrySelectInputData, SelectInputData, Data, titleListIsOpen, ItemId }) {
    const router = useRouter();
    // mrx : states ↓
    const [modalCv, setModalCv] = useState(false);
    const [modalRemoveCv, setmodalRemoveCv] = useState(false);
    const [LocalData, setLocalData] = useState([]);
    const GET_ADDED_DATA = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("CreateCv-Representation") || '[]' : '[]');

    // mrx : context
    const {
        DataEdited,
        setDataEdited,
        setPublishing,
        setRepresentationEditData
    } = useContext(Context);

    // mrx : open remove modal
    const handleEditCV = () => {
        setModalCv(true)
    }

    // mrx : close remove modal
    const handleCloseEditCv = () => {
        setModalCv(false)
    }

    // mrx : open remove modal
    const handleRemoveCV = () => {
        setmodalRemoveCv(true)
    }

    // mrx : close remove modal
    const handleCloseRemoveCV = () => {
        setmodalRemoveCv(false)
        // console.log("test" + JSON.stringify(GET_ADDED_DATA))
        // setLocalData(GET_ADDED_DATA);
    }

    // mrx : set local data for eduction ↓
    useEffect(() => {
    }, [LocalData]);


    // useEffect(() => {
    //     setLocalData(GET_ADDED_DATA);
    // }, [])

    // Remove Api Call By ID
    const handleDeleteItem = () => {
        // setLocalData(GET_ADDED_DATA.filter(Item => Item?.id !== Data?.id));
        localStorage.setItem("CreateCv-Representation", JSON.stringify(GET_ADDED_DATA.filter(Item => Item?.id !== Data?.id)));
        toast.success("Your item Deleted successfully");
        setDataEdited(true);
        handleCloseRemoveCV();
        // router.push("/auth/signup/step2#Representation");
        setRepresentationEditData(GET_ADDED_DATA.filter(Item => Item?.id !== Data?.id));
    }

    const handlePublishCV = () => {
        PutAuthUrl(PUBLISHING_CV_Reperesentation + `?Id=${ID}&IsPublish=${!Data?.isPublished}`).then((res, err) => {
            if (res && res.status === 200) {
                if (res?.data?.isSuccess) {
                    toast.success(res?.data?.message);
                    localStorage.setItem("CreateCv-Representation", JSON.stringify(GET_ADDED_DATA &&
                        GET_ADDED_DATA?.map((Item) => {
                            if (Item.id == Data?.id) {
                                return { ...Item, isPublished: !Data?.isPublished };
                            }
                            return Item;
                        }))
                    )
                    setPublishing(true);
                } else {
                    toast.error(res?.data?.message);
                }
            } else {
                toast.error("something went wrong !");
            }
        });
    }

    useEffect(() => {
        localStorage.setItem("CreateCv-Representation", JSON.stringify(LocalData));
    }, [LocalData]);

    return (
        <Grid
            item
            className={titleListIsOpen ? signUpStyle.Elements_Active : signUpStyle.Elements}
            style={{
                backgroundColor: Data?.isOpen ? "#FED6CC" : ""
            }}
        >

            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item className={Style.item}>
                    <span className={Style.sharp}>#{ItemId + 1}</span>
                    <span
                        className={Data?.isPublished ? Style.badgeDotBlue : Style.badgeDotGray}
                    ></span>
                    {Data?.isPublished ? "Published" : "Not Published"}{" "}
                    <IconButton size="small" className={Style.btn_rm} onClick={() => handleRemoveCV()}>
                        <Image src={Data?.isPublished ? remove : remove} />
                    </IconButton>
                </Grid>
                <Grid item className={Style.P_TwoBtn}>
                    <Button
                        className={Style.editBtn}
                        color="primary"
                        startIcon={<Image src={editSvg} />}
                        onClick={() => handleEditCV()}
                    >
                        Edit
                    </Button>
                    <Button
                        onClick={() => handlePublishCV()}
                        className={Data?.isPublished ? Style.Unpublish : Style.publish}
                        color={Data?.isPublished ? "default" : "secondary"}
                        variant="contained"
                    >
                        {Data?.isPublished ? "UnPublish" : "Publish"}
                    </Button>
                </Grid>
            </Grid>

            <Grid container justifyContent='space-between' className={`${signUpStyle.P_El}`}>
                <Grid style={{ color: Data?.isOpen ? "black" : "" }} item className={`${signUpStyle.El}`}>Title</Grid>
                <Grid item className={`${signUpStyle.valueEl}`}>{Data?.galleryInstutation ? Data?.galleryInstutation : "---"}</Grid>
            </Grid>

            <Grid container justifyContent='space-between' className={`${signUpStyle.P_El}`}>
                <Grid style={{ color: Data?.isOpen ? "black" : "" }} item className={`${signUpStyle.El}`}>Location</Grid>
                <Grid item className={`${signUpStyle.valueEl}`}>{Data?.location?.cityName ? Data?.location?.cityName + ", " + Data?.location?.countryName : "---"}</Grid>
            </Grid>

            <EditCv CountrySelectInputData={CountrySelectInputData} LocalDatae={LocalData} setLocalDatae={setLocalData} SelectInputData={SelectInputData} Data={Data} openModal={modalCv} handleCloseModal={() => handleCloseEditCv()} />
            <RemoveItem SelectInputData={SelectInputData} handleDeleteItem={() => handleDeleteItem()} openModal={modalRemoveCv} handleCloseModal={() => handleCloseRemoveCV()} />
        </Grid>
    )
}