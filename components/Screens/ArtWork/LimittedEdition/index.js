import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// mrx : setCookies with this
import Cookies from "js-cookie";

// good man : material ui ↓
import {
    Grid,
} from '@material-ui/core';
import EditionItem from './EditionItem';

// good man : styles ↓
import ArtFlowStyle from '../../../../styles/artworkflow.module.css'

// good man : files ↓

// good man : components ↓

export default function LimittedEditions({ SelectedID, Data, setTypeIDForShowen, TypeIDForShowen }) {
    // mrx : states ↓
    const [edtion, setEdtion] = useState("")

    // set which edition selected
    const handleEdition = (value) => {
        setEdtion(value);
    }

    useEffect(() => {
        setEdtion(SelectedID);
    }, [Data])

    return (
        <Grid item className={ArtFlowStyle.P_LimittedEdition}>
            <Grid container direction='row' spacing={2}>
                <Grid item className={ArtFlowStyle.text_edition}>Editions</Grid>
                <Grid item>
                    <Grid container direction='row' spacing={1} >
                        {
                            Data?.map((item, index) => (
                                <EditionItem
                                    key={index}
                                    Data={item}
                                    setTypeIDForShowen={setTypeIDForShowen}
                                    TypeIDForShowen={TypeIDForShowen}
                                    name={item?.subType}
                                    id_Ed={item?.id}
                                    Type={item?.type}
                                    handleEdition={handleEdition}
                                    edtion={edtion}
                                />
                            ))
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}