import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';


// good man : material ui ↓
import {
    Grid,
} from '@material-ui/core';

// good man : styles ↓
import ArtWorkStyle from "../../../styles/artworkflow.module.css";

// good man : files ↓

// good man : components ↓
import CustomSelect from '../../Forms/CustomSelect';
import InputForm from '../../Forms/InputForm';

export default function AddWeigh() {
    // good man : states ↓

    return (
        <Grid item className={`${ArtWorkStyle.w_100}`}>
            <Grid container className={ArtWorkStyle.fourInput} spacing={3}>
              <Grid item className={ArtWorkStyle.Input6}>
                <InputForm
                  type="number"
                  placeHolder="Enter weigh"
                  label="Weigh"
                />
              </Grid>
              <Grid item className={ArtWorkStyle.Input13}>
                <CustomSelect
                  label="Unit"
                  placeHolder="Choose One"
                  bgColor="#F7F8FA"
                />
              </Grid>
            </Grid>
          </Grid>
    )
}