import React, { useState } from 'react';

// mrx : material ui ↓
import {
    Hidden,
    Button,
    Badge,
    IconButton,
    Container,
    Avatar,
    Grid,
} from '@material-ui/core';

// mrx : styles ↓
import Style from '../../styles/Home.module.css';

// rmx : files  ↓
import close from '../../public/images/icons/Close dark.svg';
import Image from 'next/image';
import lockIcon from '../../public/images/icons/Lock.svg';

export default function TextArea({
    label,
    placeHolder,
    disabled = false,
    noDesignDisable = false,
    locked = false,
    error = false,
    onChange,
    value,
    setValue,
    schema,
    Radius=6,
    MarginBot=10
}) {
    const [errorObj, setErrorObj] = useState(null);

    const handleInputChange = ({ target: input }) => {
        if(schema){
            const { error: errorObj } = schema?.validate(input.value);
            if (errorObj) setErrorObj(errorObj);
            else setErrorObj(null);
        }

            setValue(input.value);


    };

    const handleBlur = ({ target: input }) => {
        if(schema) {
            const {error: errorObj} = schema?.validate(input.value);
            if (errorObj) setErrorObj(errorObj);
            else setErrorObj(null);
        }
    };

    //change style of input
    const handleStyleInput = () => {
        if (error && text !== '') {
            return Style.errorForm
        }
        else if (disabled) {
            return Style.disabledForm
        }
        else if (locked) {
            return Style.lockForm
        }
        else return ''
    }

    const resetText = () => {
        setText('');
    }

    //change style of Status input like error , disabled , locked ...
    const handleStatusInput = () => {
        if (errorObj) {
            return Style.errorForm;
        } else if (disabled) {
            return Style.disabledForm;
        } else if (locked) {
            return Style.lockForm;
        } else return "";
    };

    return (
        <Grid item className={`${Style.m_t10} ${Style.posRel}`}>
            <label className={`${Style.fs_14} ${Style.fw_500}`}>{label}</label>
            <textarea
                onBlur={handleBlur}
                placeholder={placeHolder}
                value={value}
                style={{borderRadius:Radius, marginBottom:MarginBot}}
                onChange={(e) => { handleInputChange(e); onChange ? onChange() : "" }}
                className={`${Style.textArea} ${noDesignDisable ? "" : handleStyleInput()}  ${noDesignDisable ? Style.textAreaWhite : handleStatusInput()} `} disabled={disabled || locked}
            ></textarea>

            {/* Text Error */}
            {errorObj && (
                <Grid item className={Style.errorText_form}>
                    {errorObj?.message}
                </Grid>
            )}

            {/* Icon Close when we have error */}
            {(error && text !== '') && (
                <Grid item className={Style.closeIcon}>
                    <IconButton size='small' onClick={resetText}>
                        <Image src={close} />
                    </IconButton>
                </Grid>
            )}

            {/* Lock Icon For Locked State */}
            {locked && (
                <Grid item className={Style.lockIcon_textArea}>
                    <Image src={lockIcon} />
                </Grid>
            )}
        </Grid>
    )
}
