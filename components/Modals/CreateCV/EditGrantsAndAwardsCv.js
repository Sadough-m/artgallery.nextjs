import React, { useState, useEffect, useContext } from 'react';
import Joi from "joi";
import { ToastContainer, toast } from 'react-toastify';

// MATERIAL UI
import Modal from '@material-ui/core/Modal'
import Fade from '@material-ui/core/Fade'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

// mrx : context ↓
import { Context } from "../../../context/index";

// components
import ArtistStyle from '../../../styles/artist.module.css'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import InputForm from '../../Forms/InputForm'
import CustomSelect from "../../Forms/CustomSelect";
import Date from '../../Forms/Date';

// mrx : styled
import styles from '../../../styles/Home.module.css'

// mrx : setCookies with this
import Cookies from 'js-cookie'

// mrx : api links ↓
import {
    VALIDATE_CV_BUILDER_GRANS_AND_AWARDS
} from '../../../pages/api/index';

// mrx : api ↓
import { PostUrl, PostAuthUrl, PutAuthUrl, GetUrl, GetAuthUrl, DeleteAuthUrl } from '../../../pages/api/config';

const theme = createTheme({
    palette: {
        primary: {
            main: '#3772FF'
        },
        secondary: {
            main: '#242328'
        },
        error: {
            main: '#A6E9DE'
        }
    },

})

export default function EditEducationCv({ LocalDatae, openModal, handleCloseModal, Data, SelectInputData }) {
        // mrx : context
        const {
            DataEdited,
            setDataEdited,
    
            GrantsAndAwardsEditData,
            setGrantsAndAwardsEditData,
        } = useContext(Context);
        
        // mrx : GrantsAndAwards states ↓
    const [GrantsAndAwardsYear, setGrantsAndAwardsYear] = useState(Data?.year);
    const [GrantsAndAwardsTitle, setGrantsAndAwardsTitle] = useState(Data?.title);
    const [GrantsAndAwardsInstituation, setGrantsAndAwardsInstituation] = useState(Data?.instutation);

    const [CheckRequired, setCheckRequired] = useState(false);
    const [HaveData, setHaveData] = useState(false);
    const [LocalData, setLocalData] = useState([]);

    // step-2 GrantsAndAwards data
    const GET_ADDED_DATA = JSON.parse(
        typeof window !== "undefined"
            ? localStorage.getItem("CreateCv-Grants-And-Awards") || "[]"
            : "[]"
    );

    useEffect(() => {
        setLocalData(GET_ADDED_DATA);
    }, []);

    useEffect(() => {
        if (LocalData?.length) {
            setHaveData(true);
        } else {
            setHaveData(false);
            localStorage.setItem("CreateCv-Grants-And-Awards", "[]");
        }
    }, [LocalData]);

    // mrx : update state for set in localstorage  ↓
    const handleSetLocalGrantsandAwards = (st, data) => {
        setLocalData(data);
        if (st === true) {
            toast.success("Your item Edited successfully");
            handleCloseModal();
            setGrantsAndAwardsEditData(data);
        }
    };

    // mrx : set local data for eduction ↓
    useEffect(() => {
        localStorage.setItem("CreateCv-Grants-And-Awards", JSON.stringify(LocalData));
    }, [LocalData]);

    // mrx : remove feild data / save it in local
    const handleSaveChange = (type) => {
        if (
            GrantsAndAwardsYear === "" ||
            GrantsAndAwardsTitle === "" ||
            GrantsAndAwardsInstituation === ""
        ) {
            if (type === "click") {
                toast.warning("Please fill the required values");
                setCheckRequired(true);
            } else {
                return "";
            }
        } else {
            setCheckRequired(false);
            ValidateCvBuilderGrantsAndAwardsLocal();
        }
    };

    const ValidateCvBuilderGrantsAndAwardsLocal = () => {
        PostAuthUrl(VALIDATE_CV_BUILDER_GRANS_AND_AWARDS, {
            single: {
                isOpen: false,
                year: GrantsAndAwardsYear,
                title: GrantsAndAwardsTitle,
                instutation: GrantsAndAwardsInstituation,
                isPublished: false,
                id: Data?.id
            },
            models: LocalDatae,
        }).then((res, err) => {
            if (res && res.status === 200) {
                if (res?.data?.isSuccess) {
                    handleSetLocalGrantsandAwards(true, res?.data?.data);
                    setDataEdited(true);
                    // mrx : clear the items for new data
                } else {
                    handleSetLocalGrantsandAwards(false, res?.data?.data);
                    toast.error(res?.data?.message);
                }
            } else {
                toast.error("something went wrong !");
            }
        });
    };

    return (
        <ThemeProvider theme={theme} >
            <Container>
                <Grid item >
                    <Modal
                        className={ArtistStyle.Modal}
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={openModal}
                        onClose={handleCloseModal}
                        closeAfterTransition
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={openModal}>
                            <Grid item className={ArtistStyle.P_Bg_ModalCV}>
                                <Container>
                                    <Grid item className={`${ArtistStyle.Bg_Modal1} ${ArtistStyle.mtb_10}`}>
                                        <Grid item className={ArtistStyle.wrapperModal}>

                                            <Grid container justifyContent='space-between' alignItems='center'>
                                                <Grid item className={ArtistStyle.P_title1}>
                                                    <Grid container alignItems='center' spacing={2} className={ArtistStyle.cv_txt}>
                                                        <Grid item className={ArtistStyle.Text_titleModal}>Edit CV</Grid>
                                                        <Grid item className={ArtistStyle.cv_profe}>Grants and Awards</Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item>
                                                    <IconButton className={ArtistStyle.IconClose} onClick={() => handleCloseModal()}>
                                                        <CloseIcon color='secondary' fontSize='small' />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>

                                            <Grid container className={`${styles.TwoForm}`}>
                                                <Grid item className={`${styles.TwoInput}`}>
                                                    <Date
                                                        label='Year'
                                                        placeHolder='Choose year'
                                                        setValue={setGrantsAndAwardsYear}
                                                        Value={GrantsAndAwardsYear}
                                                        validateFlag={CheckRequired}
                                                    />
                                                </Grid>
                                                <Grid item className={`${styles.TwoInput}`}>
                                                    <InputForm
                                                        placeHolder='Enter award title'
                                                        label='Title'
                                                        setCheckRequired={setCheckRequired}
                                                        validateFlag={CheckRequired}
                                                        schema={Joi.string()
                                                            .empty({ tlds: { allow: false } })
                                                            .messages({
                                                                "string.empty": `award title is required`,
                                                            })}
                                                        type="text"
                                                        setValue={setGrantsAndAwardsTitle}
                                                        value={GrantsAndAwardsTitle}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} className={`${styles.w_100}`} >
                                                <InputForm
                                                    setCheckRequired={setCheckRequired}
                                                    validateFlag={CheckRequired}
                                                    schema={Joi.string()
                                                        .empty({ tlds: { allow: false } })
                                                        .messages({
                                                            "string.empty": `Instituation is required`,
                                                        })}
                                                    type="text"
                                                    setValue={setGrantsAndAwardsInstituation}
                                                    value={GrantsAndAwardsInstituation}
                                                    placeHolder='Enter Instituation'
                                                    label='Instituation'
                                                />
                                            </Grid>


                                            <Grid item>
                                                <Button
                                                    onClick={() => handleSaveChange()}
                                                    variant='contained'
                                                    color='primary'
                                                    className={ArtistStyle.Button_Add_Artist}>
                                                    <span className={ArtistStyle.text_None}>Save Changes</span>
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Container>
                            </Grid>
                        </Fade>
                    </Modal>
                </Grid >
            </Container >

        </ThemeProvider >
    )

}
