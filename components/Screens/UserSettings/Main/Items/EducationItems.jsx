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
import EditCv from '../../../../../components/Modals/CreateCV/EditEducationCv';
import RemoveItem from '../../../../../components/Modals/CreateCV/RemoveCv';

// mrx : setCookies with this
import Cookies from 'js-cookie'

// mrx : api links ↓
import {
    PUBLISHING_CV_EDUCATION
} from '../../../../../pages/api/index';

// mrx : api ↓
import { PostUrl, GetUrl, GetAuthUrl, PutAuthUrl } from '../../../../../pages/api/config';

export default function Items({ setLocalData, LocalData, SelectInputData, Data, titleListIsOpen, ItemId }) {
    // mrx : states ↓
    const router = useRouter();

    const [modalCv, setModalCv] = useState(false);
    const [modalRemoveCv, setmodalRemoveCv] = useState(false);
    const [ID, setID] = useState("");
    // const [LocalData, setLocalData] = useState([]);
    const GET_ADDED_DATA = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("CreateCv-Eduction") || '[]' : '[]');

    // mrx : context
    const {
        DataEdited,
        setDataEdited,
        setPublishing,
        setEducationEditData,
    } = useContext(Context);

    useEffect(() => {
        setID(Data?.id);
    }, [Data])

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
        localStorage.setItem("CreateCv-Eduction", JSON.stringify(GET_ADDED_DATA.filter(Item => Item?.id !== ID)));
        toast.success("Your item Deleted successfully");
        setDataEdited(true);
        handleCloseRemoveCV();
        // router.push("/auth/signup/step2#Education");
        setEducationEditData(GET_ADDED_DATA.filter(Item => Item?.id !== Data?.id));
    }

    const handlePublishCV = () => {
        PutAuthUrl(PUBLISHING_CV_EDUCATION + `?Id=${ID}&IsPublish=${!Data?.isPublished}`).then((res, err) => {
            if (res && res.status === 200) {
                if (res?.data?.isSuccess) {
                    toast.success(res?.data?.message);
                    localStorage.setItem("CreateCv-Eduction", JSON.stringify(GET_ADDED_DATA &&
                        GET_ADDED_DATA?.map((Item) => {
                            if (Item.id == Data?.id) {
                                return { ...Item, isPublished: !Data?.isPublished };
                            }
                            return Item;
                        }))
                    )
                    setPublishing(true);
                    // router.push("/user/createcv");
                    // router.reload();
                } else {
                    toast.error(res?.data?.message);
                }
            } else {
                toast.error("something went wrong !");
            }
        });
    }

    useEffect(() => {
        localStorage.setItem("CreateCv-Eduction", JSON.stringify(LocalData))
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
                        className={Data?.isPublished ? Style.Unpublish : Style.publish}
                        color={Data?.isPublished ? "default" : "secondary"}
                        variant="contained"
                        onClick={() => handlePublishCV()}
                    >
                        {Data?.isPublished ? "UnPublish" : "Publish"}
                    </Button>
                </Grid>
            </Grid>

            <Grid container justifyContent='space-between' className={`${signUpStyle.P_El}`}>
                <Grid style={{ color: Data?.isOpen ? "black" : "" }} item className={`${signUpStyle.El}`}>Completion year</Grid>
                <Grid item className={`${signUpStyle.valueEl}`}>{Data?.completionYear ? Data?.completionYear : "---"}</Grid>
            </Grid>
            <Grid container justifyContent='space-between' className={`${signUpStyle.P_El}`}>
                <Grid style={{ color: Data?.isOpen ? "black" : "" }} item className={`${signUpStyle.El}`}>Degree type</Grid>
                <Grid item className={`${signUpStyle.valueEl}`}>{SelectInputData?.degreeTypes?.filter(item => item?.id === Data?.degreeTypeId).map(item => (item?.name))
                    ?
                    SelectInputData?.degreeTypes?.filter(item => item?.id === Data?.degreeTypeId).map(item => (item?.name)) : "---"}
                </Grid>
            </Grid>
            <Grid container justifyContent='space-between' className={`${signUpStyle.P_El}`}>
                <Grid style={{ color: Data?.isOpen ? "black" : "" }} item className={`${signUpStyle.El}`}>Major</Grid>
                <Grid item className={`${signUpStyle.valueEl}`}>{SelectInputData?.majorTypes?.filter(item => item?.id === Data?.majorTypeId).map(item => (item?.name))
                    ?
                    SelectInputData?.majorTypes?.filter(item => item?.id === Data?.majorTypeId).map(item => (item?.name)) : "---"}
                </Grid>
            </Grid>
            <Grid container justifyContent='space-between' className={`${signUpStyle.P_El}`}>
                <Grid style={{ color: Data?.isOpen ? "black" : "" }} item className={`${signUpStyle.El}`}>Institution</Grid>
                <Grid item className={`${signUpStyle.valueEl}`}>{Data?.instutation ? Data?.instutation : "---"}</Grid>
            </Grid>
            <Grid container justifyContent='space-between' className={`${signUpStyle.P_El}`}>
                <Grid style={{ color: Data?.isOpen ? "black" : "" }} item className={`${signUpStyle.El}`}>Department</Grid>
                <Grid item className={`${signUpStyle.valueEl}`}>{SelectInputData?.deptTypes?.filter(item => item?.id === Data?.departementId).map(item => (item?.name))
                    ?
                    SelectInputData?.deptTypes?.filter(item => item?.id === Data?.departementId).map(item => (item?.name)) : "---"}
                </Grid>
            </Grid>
            <Grid container justifyContent='space-between' className={`${signUpStyle.P_El}`}>
                <Grid style={{ color: Data?.isOpen ? "black" : "" }} item className={`${signUpStyle.El}`}>Cum laude and other honors</Grid>
                <Grid item className={`${signUpStyle.valueEl}`}>{Data?.cumLaudeAndOtherHonors ? Data?.cumLaudeAndOtherHonors : "---"}</Grid>
            </Grid>
            <Grid container justifyContent='space-between'>
                <Grid style={{ color: Data?.isOpen ? "black" : "" }} item className={`${signUpStyle.El}`}>Dissertation/Thesis title and advisor</Grid>
                <Grid item className={`${signUpStyle.valueEl}`}>{Data?.dissertationThesisTitleAndAdvisor ? Data?.dissertationThesisTitleAndAdvisor : '---'}</Grid>
            </Grid>
            <EditCv LocalDatae={LocalData} setLocalDatae={setLocalData} SelectInputData={SelectInputData} Data={Data} openModal={modalCv} handleCloseModal={() => handleCloseEditCv()} />
            <RemoveItem SelectInputData={SelectInputData} handleDeleteItem={() => handleDeleteItem()} openModal={modalRemoveCv} handleCloseModal={() => handleCloseRemoveCV()} />
        </Grid>
    )
}