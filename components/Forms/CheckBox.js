import React from 'react'
import Grid from '@material-ui/core/Grid'
import styles from '../../styles/Home.module.css'


export default function Check_Box({ label, some_space = false, fontGray = false, fw_bold = false }) {
    return (
        <Grid container>
            <Grid item>
                <input type="checkbox" className={` ${styles.Check__Box}`} />
            </Grid>
            <Grid item  >
                <label className={`${styles.font_checkBox} ${some_space ? styles.ml_5 : ''} ${fontGray ? styles.fontGray : ''} ${fw_bold?styles.fw_500:''}`} >{label}</label>
            </Grid>
        </Grid>
    )
}
