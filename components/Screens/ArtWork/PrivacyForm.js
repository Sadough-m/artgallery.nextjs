import React, { useState, useEffect, useContext } from 'react';

// Matrial 
import Grid from '@material-ui/core/Grid';

// mrx : Styles ↓
import artworkStyle from '../../../styles/artworkflow.module.css';

// rmx : files  ↓

// mrx : context ↓
import { Context } from "../../../context/index";

// mrx : components ↓
import CustomSelect from '../../Forms/CustomSelect';

export default function PrivacyForm({ SelectInputData }) {
    // mrx : context Data Start ------------------------------------------------------------------------------------
    const {
        OwnershipID,
        setOwnershipID,
        PriceID,
        setPriceID,
        setTrandferDateID,
        TrandferDateID,
        TransferTypeID,
        setTransferTypeID,
    } = useContext(Context);
    // mrx : End ----------------------------------------------------------------------------------------------------

    // mrx : states ↓

    useEffect(() => {
        setOwnershipID(0);
        setPriceID(0);
        setTrandferDateID(0);
        setTransferTypeID(0);
    }, [SelectInputData])

    useEffect(() => {
        localStorage.setItem("Add-ArtWork-OwnershipID", OwnershipID)
    }, [OwnershipID])

    useEffect(() => {
        localStorage.setItem("Add-ArtWork-PriceID", PriceID)
    }, [PriceID])

    useEffect(() => {
        localStorage.setItem("Add-ArtWork-TrandferDateID", TrandferDateID)
    }, [TrandferDateID])

    useEffect(() => {
        localStorage.setItem("Add-ArtWork-TransferTypeID", TransferTypeID)
    }, [TransferTypeID])

    return (
        <Grid item>
            <Grid container direction='column' >
                <Grid item className={artworkStyle.privaryText}>Privacy</Grid>
                <Grid item>
                    <CustomSelect
                        SelectName={SelectInputData?.privacies?.filter((item) => item?.id === OwnershipID)?.map((item) => item?.name)}
                        setSelectName={setOwnershipID}
                        Value={OwnershipID}
                        setValue={setOwnershipID}
                        Data={SelectInputData?.privacies}
                        label='Ownership'
                        bgColor='#F7F8FA'
                        defaultValue='View all'
                    />
                </Grid>
                <Grid item>
                    <CustomSelect
                        SelectName={SelectInputData?.privacies?.filter((item) => item?.id === PriceID)?.map((item) => item?.name)}
                        setSelectName={setPriceID}
                        Value={PriceID}
                        setValue={setPriceID}
                        Data={SelectInputData?.privacies}
                        label='Price'
                        bgColor='#F7F8FA'
                        defaultValue='HIddenall'
                    />
                </Grid>
                <Grid item>
                    <CustomSelect
                        SelectName={SelectInputData?.privacies?.filter((item) => item?.id === TrandferDateID)?.map((item) => item?.name)}
                        setSelectName={setTrandferDateID}
                        Value={TrandferDateID}
                        setValue={setTrandferDateID}
                        Data={SelectInputData?.privacies}
                        label='Trandfer date'
                        bgColor='#F7F8FA'
                        defaultValue='For owners'
                    />
                </Grid>
                <Grid item>
                    <CustomSelect
                        SelectName={SelectInputData?.privacies?.filter((item) => item?.id === TransferTypeID)?.map((item) => item?.name)}
                        setSelectName={setTransferTypeID}
                        Value={TransferTypeID}
                        setValue={setTransferTypeID}
                        Data={SelectInputData?.privacies}
                        label='Transfer type'
                        bgColor='#F7F8FA'
                        defaultValue='Transfer type'
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}
