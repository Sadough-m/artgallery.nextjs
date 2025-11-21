import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';


// good man : material ui ↓
import {
    Grid,
} from '@material-ui/core';

// good man : styles ↓
import ArtWorkflowStyle from '../../../styles/artworkflow.module.css'

// good man : files ↓

// good man : components ↓
import InputForm from '../../Forms/InputForm';
import CustomSelect from '../../Forms/CustomSelect';

export default function FrameForms() {
    // good man : states ↓

    return (
        <Grid item>
            <Grid container className={ArtWorkflowStyle.fourInput} spacing={1}>
              <Grid item className={ArtWorkflowStyle.Input3}>
                <InputForm
                  type="number"
                  placeHolder="Width"
                  label="Frame size"
                />
              </Grid>
              <Grid item className={ArtWorkflowStyle.Input3}>
                <InputForm type="number" placeHolder="Height" label="" />
              </Grid>
              <Grid item className={ArtWorkflowStyle.Input3}>
                <InputForm type="number" placeHolder="Depth" label="" />
              </Grid>
              <Grid item className={ArtWorkflowStyle.Input1}>
                <CustomSelect label="Unit" placeHolder="Choose One" />
              </Grid>
            </Grid>
          </Grid>
    )
}