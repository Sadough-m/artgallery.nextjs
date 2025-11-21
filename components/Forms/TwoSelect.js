import React, {useEffect, useState} from 'react'
import Image from 'next/image'

// good man : material ↓
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grid from '@material-ui/core/Grid'

// good man : files ↓
import lockIcon from '../../public/images/icons/Lock.svg';
import arrowDown from '../../public/images/icons/Arrow down.svg'
import arrowUp from '../../public/images/icons/Arrow Up.svg'
import imgTest from '../../public/images/icons/Consignments2.svg'
import availableIcon from '../../public/images/icons/Available.svg'

// good man : styles ↓
import styles from '../../styles/Home.module.css'

// good man : components ↓

export default function TwoSelect({
    type = 'text',
    label = 'Type & Currency',
    placeHolder = 'Type Here ...',
    bgColor = 'white',
    disabled = false,
    defaultValue1 = { id: 1, name: 'FIAT' },
    defaultValue2 = '$',
    defaultValue3 = '',
    options2Disabled = true,
    // error = false,
    locked = false,
    error_Text = 'Error sample value.',
    setValueOption1=()=>{},
    setValueOption2=()=>{},
    setValueInput=()=>{},
    inputSchema,
    inputPercentageSchema,
    validateFlag,
    OptionList1 = [{ id: 1, name: 'FIAT' }, { id: 2, name: '%' }], OptionList2 , children })
{
    // console.log('OptionList2',OptionList2)
    // console.log('defaultValue2',defaultValue2)
    // console.log('defaultValue1',defaultValue1)
    const [openOption1, setOpenOption1] = useState(false)
    const [openOption2, setOpenOption2] = useState(false)
    const [valueSelectLeft, setValueLeft] = useState(defaultValue1)
    const [valueSelectRight, setValueRight] = useState(defaultValue2)
    const [valueForm, setValueForm] = useState(defaultValue3)
    const [ActiveColor, setActiveColor] = useState(false)
    const [error, setError] = useState(null);

    // sa : useEffect
    useEffect(()=>{
        setValueOption1(defaultValue1)
        setValueOption2(defaultValue2)
        setValueInput(defaultValue3)
    },[])

    // console.log('valueSelectLeft',valueSelectLeft)
    // console.log('valueSelectRight',valueSelectRight)
    // console.log('valueForm',valueForm)

    // check if parent component signaled for validation
    useEffect(() => {
        if (validateFlag) {
            vaildateValue(valueForm);
        }
    }, [validateFlag]);

    // input validation function
    const vaildateValue = (value) => {

            const { error } = inputSchema?.validate(value?.trim());
            console.log('error',error)
            if (error) setError(error?.message);
            else setError(null);


    };
    // input percentage validation function
    const validatePercentageValue = (value) => {
            console.log('inputPercentageSchema',inputPercentageSchema)
            const { error } = inputPercentageSchema?.validate(value?.trim());
            console.log('errorTowSelect',error)
            if (error) setError(error?.message);
            else setError(null);


    };

    //open and close both select boxes
    const handleOption = () => {
        if (!disabled && !locked) {
            setOpenOption1(!openOption1)
            setOpenOption2(!openOption2)
        }

    }
    //closing select box number 1
    const CloseOption1 = () => {
        setOpenOption1(false)
    }

    //closing select box number 2
    const CloseOption2 = () => {
        setOpenOption2(false)
    }

    //set value of select box number 1
    const handleChangeselectValye1 = (value) => {
        setValueLeft(value)
        handleOption();
        setValueOption1(value)
        // value? setValueOption1(value):setValueOption1(defaultValue2)
    }

    //set value of select box number 2
    const handleChangeselectValye2 = (value) => {

        setValueRight(value)
        handleOption();
        setValueOption2(value)
        // value? setValueOption2(value):setValueOption2(defaultValue2)

    }

    //this shit line fucked me ... actually we change color of line when select area clicked! if you have a better idea to handle this pls let me know to me SepehrGoodMan2000@gmail.com
    const handleActiveColorLine = () => {
        setActiveColor(false)
    }

    //set value of input form on right side
    const handleValueForm = (e) => {
        valueSelectLeft?.id==1 ?
        vaildateValue(e.target.value): validatePercentageValue(e.target.value)
        setValueForm(e.target.value);
        setValueInput(e.target.value)
    }


    //change style of Status input like error , disabled , locked ...
    const handleStatusInput = () => {
        if (error) {
            return styles.errorForm
        }
        else if (disabled) {
            return styles.disabledForm
        }
        else if (locked) {
            return styles.lockForm
        }
        else return ''
    }

    // good man : color of line
    const lineStyleHandler = () => {
        if (error) {
            return styles.lineRed
        }
        else if (disabled) {
            return styles.lineWhite
        }
        else if(locked){
            return styles.lineGray
        }
        else if (openOption1 || openOption2 || ActiveColor) {
            return styles.lineTwoInput_Active
        }
        else return ''
    }

    return (
        <Grid item className={styles.TwoSelect} style={{height:label===""?0:""}}>
            <span className={`${styles.lineTwoInput} ${lineStyleHandler()}`} style={{top:label===""?29:''}}></span>
            <ClickAwayListener onClickAway={CloseOption1}>
                <Grid item className={`${styles.Single__form_TwoSelect} ${styles.Form_No_label} ${styles.TowSelect1}`} style={{top:label===""?4:''}}>
                    <Grid item className={`${styles.P_Select} ${!disabled ? styles.cursor_P : ''}`} >

                        <Grid item onClick={() => handleOption()}>
                            <input type='text' className={`${styles.formInput1} ${styles.formLeft} ${(!disabled && !locked) ? styles.cursor_P : ''}  `} placeholder={placeHolder} disabled={true} value={valueSelectLeft?.name}
                                onClick={() => handleOption()} />
                            {(!disabled && !locked) && (
                                <Grid item className={styles.imageInsideForm1}>
                                    <Image src={openOption1 ? arrowUp : arrowDown} />
                                </Grid>
                            )}
                        </Grid>

                        {(!disabled && openOption1 && !locked) && (
                            <Grid item className={styles.P_Option_Select}>
                                <Grid container direction='column'>
                                    {OptionList1?.map((option) => <Grid item key={option.id} className={styles.Option_Select} onClick={() => handleChangeselectValye1(option)}>
                                        <Grid container alignItems='center' spacing={1}>
                                            <Grid item>{option.name}</Grid>
                                        </Grid>
                                    </Grid>
                                    )}
                                </Grid>
                            </Grid>
                        )}

                    </Grid>
                </Grid >
            </ClickAwayListener>
            { valueSelectLeft?.id==1 &&
                <ClickAwayListener onClickAway={CloseOption2}>
                    <Grid item
                          className={`${styles.Single__form_TwoSelect} ${styles.Form_No_label} ${styles.TowSelect2}`}
                          style={{top: label === "" ? 3 : ""}}>
                        {/* <label className={styles.label__input}>{label}</label> */}
                        <Grid item className={`${styles.P_Select} ${!disabled ? styles.cursor_P : ''}`}>
                            <Grid item onClick={() => handleOption()}>
                                <input type='text'
                                       className={`${styles.formInput1}  ${styles.formMid} ${(!disabled && !locked) ? styles.cursor_P : ''}  `}
                                       placeholder={placeHolder} disabled={true} value={valueSelectRight?.name}
                                       onClick={() => handleOption()}/>

                                {(!disabled && !locked) && (
                                    <Grid item className={styles.imageInsideForm1}>
                                        <Image src={openOption2 ? arrowUp : arrowDown}/>
                                    </Grid>
                                )}
                            </Grid>
                            {(!options2Disabled) && (
                                <Grid item className={styles.P_Option_Select}>
                                    <Grid container direction='column'>
                                        {OptionList2?.map((option) =>
                                            <Grid item key={option.id} className={styles.Option_Select}
                                                  onClick={() => handleChangeselectValye2(option)}>
                                                <Grid container alignItems='center' spacing={1}>
                                                    <Grid item>{option.name}</Grid>
                                                </Grid>
                                            </Grid>
                                        )}
                                    </Grid>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </ClickAwayListener>
            }
            { valueSelectLeft?.id==1 ?
                <ClickAwayListener onClickAway={handleActiveColorLine}>
                    <Grid item className={`${styles.Single__form1} ${label === '' ? styles.Input_No_label : ''} `}>
                        <label className={styles.label__input}>{label}</label>

                        {/* <label className={styles.label__input}>{label}</label> */}
                        <Grid className={styles.InputAndEye}>

                            {(children && (disabled || valueForm !== '')) && children}

                            <input type={type}
                                   className={`${styles.formInput11} ${handleStatusInput()} ${(openOption1 || openOption2) ? styles.outlinePrimary : ''} ${styles.formRight} `}
                                   id="exampleInputEmail1"
                                   aria-describedby="emailHelp" placeholder={placeHolder} disabled={disabled || locked}
                                   value={valueForm} onChange={(e) => handleValueForm(e)}
                                   style={{backgroundColor: bgColor}}
                                   onClick={() => setActiveColor(true)}
                                   onBlur={({target: input}) => vaildateValue(input.value)}

                            />

                            {/* Lock Icon For Locked State */}
                            {locked && (
                                <Grid item className={styles.lockIcon}>
                                    <Image src={lockIcon}/>
                                </Grid>
                            )}
                        </Grid>

                        {/* Text Error */}
                        {error && (
                            <Grid item className={styles.errorText_form}>
                                {error}
                            </Grid>
                        )}
                    </Grid>
                </ClickAwayListener> :
                <ClickAwayListener onClickAway={handleActiveColorLine}>
                <Grid item className={`${styles.Single__form1} ${label === '' ? styles.Input_No_label : ''} `} >
                <label className={styles.label__input}>{label}</label>

            {/* <label className={styles.label__input}>{label}</label> */}
                <Grid className={styles.InputAndEye}>

            {(children && (disabled || valueForm !== '')) && children}

                <input type={type} className={`${styles.formInput11} ${handleStatusInput()} ${(openOption1 || openOption2) ? styles.outlinePrimary : ''} ${styles.formRight} `} id="exampleInputEmail1"
                aria-describedby="emailHelp" placeholder={placeHolder} disabled={disabled || locked} value={valueForm} onChange={(e) => handleValueForm(e)} style={{backgroundColor: bgColor}}
                onClick={() => setActiveColor(true)}
                onBlur={({target: input}) => validatePercentageValue(input.value)}

                />

            {/* Lock Icon For Locked State */}
            {locked && (
                <Grid item className={styles.lockIcon}>
                <Image src={lockIcon} />
                </Grid>
                )}
                </Grid>

            {/* Text Error */}
            {error && (
                <Grid item className={styles.errorText_form}>
            {error}
                </Grid>
                )}
                </Grid>
                </ClickAwayListener>
            }
        </Grid>

    )
}
