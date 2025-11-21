import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';

// good man : material ui ↓
import {
    Button,
    Grid,
    IconButton
} from '@material-ui/core';

// good man : styles ↓
import signUpStyle from '../../../../../styles/signUp.module.css'

// mrx : context ↓
import { Context } from "../../../../../context/index";

// good man : files ↓
import remove from '../../../../../public/images/icons/Remove red.svg'
import edit from '../../../../../public/images/icons/Edit.svg'

// good man : components ↓
import EditCv from '../../../../../components/Modals/ArtistCV/EditEducationCv';
import RemoveItem from '../../../../../components/Modals/ArtistCV/RemoveCv';

// mrx : setCookies with this
import Cookies from 'js-cookie'

export default function Items({ setLocalData, LocalData, SelectInputData, Data, titleListIsOpen, ItemId }) {
    const router = useRouter();

    // mrx : states ↓
    const [modalCv, setModalCv] = useState(false);
    const [modalRemoveCv, setmodalRemoveCv] = useState(false);
    // const [LocalData, setLocalData] = useState([]);
    const GET_ADDED_DATA = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("Add-Artist-Eduction") || '[]' : '[]');

    // mrx : context
    const {
        DataEdited,
        setDataEdited,
        setEducationEditData
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
        localStorage.setItem("Add-Artist-Eduction", JSON.stringify(GET_ADDED_DATA.filter(Item => Item?.id !== Data?.id)));
        toast.success("Your item Deleted successfully");
        setDataEdited(true);
        handleCloseRemoveCV();
        // router.push("/auth/signup/step2#Education");
        setEducationEditData(GET_ADDED_DATA.filter(Item => Item?.id !== Data?.id));
    }

    return (
        <Grid
            item
            className={titleListIsOpen ? signUpStyle.Elements_Active : signUpStyle.Elements}
            style={{
                backgroundColor: Data?.isOpen ? "#FED6CC" : ""
            }}
        >

            <Grid container alignItems='center' justifyContent='space-between' className={`${signUpStyle.P_El1}`}>
                <Grid item className={`${signUpStyle.El_title_edit}`}>#{ItemId + 1}</Grid>
                <Grid item>
                    <Grid container alignItems='center' spacing={1}>
                        <Grid item className={signUpStyle.imgRemove}>
                            <IconButton onClick={() => handleRemoveCV()} className={signUpStyle.RemoveBtn}>
                                <Image src={remove} />
                            </IconButton>
                        </Grid>
                        <Grid item className={signUpStyle.editButton}>
                            <Button onClick={() => handleEditCV()} startIcon={<Image src={edit} />} color='primary'>Edit</Button>
                        </Grid>
                    </Grid>
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