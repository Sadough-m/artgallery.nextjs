import React from 'react'
import Grid from '@material-ui/core/Grid'
import styles from '../../styles/Home.module.css'

export default function Select({ label, bgColor, disabled = false, children }) {
    return (
        <div className={styles.Single__form} >
            <label className={styles.label__input}>{label}</label>
            <Grid item className={styles.P_Select}>
                <select required className={`${styles.Select_Box}`} style={{ backgroundColor: bgColor, appearance: disabled ? 'none' : 'auto' }} disabled={disabled}>
                    <option value="" selected disabled hidden>Choose One</option>
                    <option value="saab">Saab</option>
                    <option value="opel">Opel</option>
                    <option value="audi">Audi</option>
                </select>
                {children && children}
            </Grid>
        </div>

    )
}
