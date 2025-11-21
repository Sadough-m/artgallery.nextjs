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
import signUpStyle from '../../../../styles/signUp.module.css'

// good man : files ↓
import remove from '../../../../public/images/icons/Remove red.svg'
import edit from '../../../../public/images/icons/Edit.svg'

// good man : components ↓
import EditCv from '../../../../components/Modals/CV/EditCommissionsCv';
import RemoveItem from '../../../../components/Modals/CV/RemoveCv';

// mrx : setCookies with this
import Cookies from 'js-cookie'

// mrx : api links ↓
import {
    VALIDATE_CV_BUILDER_COMMISSION
} from '../../../../pages/api/index';

// mrx : context ↓
import { Context } from "../../../../context/index";

// mrx : api ↓
import { PostUrl, GetUrl, GetAuthUrl, DeleteAuthUrl } from '../../../../pages/api/config';

export default function Items({ CountrySelectInputData, setLocalData, LocalData, SelectInputData, Data, titleListIsOpen, ItemId }) {
    const router = useRouter();

    // mrx : states ↓
    const [modalCv, setModalCv] = useState(false);
    const [modalRemoveCv, setmodalRemoveCv] = useState(false);
    // const [LocalData, setLocalData] = useState([]);
    const GET_ADDED_DATA = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("Step2-Commissions") || '[]' : '[]');

    // mrx : context
    const {
        CommiataEdited,
        setCommiataEdited,
        setCommissionsEditData
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
        localStorage.setItem("Step2-Commissions", JSON.stringify(GET_ADDED_DATA.filter(Item => Item?.id !== Data?.id)));
        toast.success("Your item Deleted successfully");
        setCommiataEdited(true);
        handleCloseRemoveCV();
        router.push("/auth/signup/step2#Commissions");
        setCommissionsEditData(GET_ADDED_DATA.filter(Item => Item?.id !== Data?.id));
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
                <Grid style={{ color: Data?.isOpen ? "black" : "" }} item className={`${signUpStyle.El}`}>Year</Grid>
                <Grid item className={`${signUpStyle.valueEl}`}>{Data?.year ? Data?.year : "---"}</Grid>
            </Grid>

            <Grid container justifyContent='space-between' className={`${signUpStyle.P_El}`}>
                <Grid style={{ color: Data?.isOpen ? "black" : "" }} item className={`${signUpStyle.El}`}>Type</Grid>
                <Grid item className={`${signUpStyle.valueEl}`}>{SelectInputData?.commissionTypes?.filter(item => item?.id === Data?.typeId).map(item => (item?.name))
                    ?
                    SelectInputData?.commissionTypes?.filter(item => item?.id === Data?.typeId).map(item => (item?.name)) : "---"}
                </Grid>
            </Grid>

            <Grid container justifyContent='space-between' className={`${signUpStyle.P_El}`}>
                <Grid style={{ color: Data?.isOpen ? "black" : "" }} item className={`${signUpStyle.El}`}>Title</Grid>
                <Grid item className={`${signUpStyle.valueEl}`}>{Data?.title ? Data?.title : "---"}</Grid>
            </Grid>

            <Grid container justifyContent='space-between' className={`${signUpStyle.P_El}`}>
                <Grid style={{ color: Data?.isOpen ? "black" : "" }} item className={`${signUpStyle.El}`}>Location</Grid>
                <Grid item className={`${signUpStyle.valueEl}`}>{Data?.location?.cityName ? Data?.location?.cityName + ", " + Data?.location?.countryName : "---"}</Grid>
            </Grid>

            <Grid container justifyContent='space-between' className={`${signUpStyle.P_El}`}>
                <Grid style={{ color: Data?.isOpen ? "black" : "" }} item className={`${signUpStyle.El}`}>Gallery or Instituation</Grid>
                <Grid item className={`${signUpStyle.valueEl}`}>{Data?.galleryInstutation ? Data?.galleryInstutation : "---"}</Grid>
            </Grid>
            <EditCv CountrySelectInputData={CountrySelectInputData} LocalDatae={LocalData} setLocalDatae={setLocalData} SelectInputData={SelectInputData} Data={Data} openModal={modalCv} handleCloseModal={() => handleCloseEditCv()} />
            <RemoveItem SelectInputData={SelectInputData} handleDeleteItem={() => handleDeleteItem()} openModal={modalRemoveCv} handleCloseModal={() => handleCloseRemoveCV()} />
        </Grid>
    )
}