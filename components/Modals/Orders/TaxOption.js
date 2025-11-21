import React, { useState, useEffect } from "react";

// gm : material ui ↓
import {
  Button,
  Fade,
  Grid,
  Hidden,
  IconButton,
  Modal,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";

// gm : styles ↓
import style from "../../../styles/Home.module.css";

// gm : files ↓
import closeIcon from "../../../public/images/icons/Close12.svg";
import InfoSvg from "../../../public/images/icons/Info blue.svg";

// gm : components ↓
import Radio from "../../Forms/Radio";
import TwoSelect from "../../Forms/TwoSelect";
import AddShippingAmount from "./AddShippingAmount";
import Joi from "joi";
import { PostAuthUrl } from "../../../pages/api/config";
import { Create_Update_Draft_Order_Tax } from "../../../pages/api";
import getCollectionId from "../../../Hooks/getCollectionId";
import { toast } from "react-toastify";

const schema = {
  taxAmount: Joi.number()
    // .email({ tlds: { allow: false } })
    .messages({
      "number.empty": `amount is required`,
      // "string.email": `Enter a valid email`,
      "number.base": `amount is required`,
    }),
  taxPercentage: Joi.number().integer().greater(0).less(100)
    // .email({ tlds: { allow: false } })
    .messages({
      "number.empty": `amount is required`,
      // "string.email": `Enter a valid email`,
      "number.base": `amount is required`,
      "number.max": `amount should between 0-100`,
      "number.min": `amount should between 0-100`,
    }),

};

export default function TaxOption({
  open,
  handleModal,
  AllData,
  setAllData,
  DraftOrderData
}) {
  // console.log('AllData',AllData)
  const notifications = {
    1: {
      name: 'Not suitable for partial payments.'
    },
    2: {
      name: 'Best option for partial order fulfilment .'
    }
    ,
  }
  // gm : states ↓
  const [defaultCurrencySign, setDefaultCurrencySign] = useState({ id: '', name: '$' });
  const [taxApplyAmount, setTaxApplyAmount] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState({});
  const [taxAmount, setTaxAmount] = useState();
  const [howTaxApply, setHowTaxApply] = useState('');
  const [taxPayCondition, setTaxPayCondition] = useState(1);
  const [notification, setNotification] = useState(notifications['1']);
  const [validateFlag, setValidateFlag] = useState(false);


  // sa: initialization
  useEffect(() => {
    // sa: find math currency
    const defaultCur = DraftOrderData?.priceUints?.find(x => x.id == AllData?.unitId)
    defaultCur && setDefaultCurrencySign({ id: defaultCur.id, name: defaultCur.sign })

    // sa: set exist data
    setTaxApplyAmount({ id: AllData?.tax?.taxApplyAmount, name: AllData?.tax?.taxApplyAmount == 1 ? 'FIAT' : '%' })
    setTaxAmount(AllData?.tax?.taxAmount)
    setHowTaxApply(AllData?.tax?.howTaxApply)
    setTaxPayCondition(AllData?.tax?.taxPayCondition)
    setNotification(notifications[taxApplyAmount?.id])


  }, [AllData])

  // sa: handle change taxPayCondition
  useEffect(() => {
    // console.log('handle change textApplyAmount',taxPayCondition)
    setNotification(notifications[taxPayCondition ? taxPayCondition : 1])

  }, [taxPayCondition])

  // as: create discount func
  const handleCreateTax = () => {
    // console.log('taxPayCondition',taxPayCondition)
    PostAuthUrl(Create_Update_Draft_Order_Tax(AllData?.id, getCollectionId()), {
      taxAmount: taxAmount,
      howTaxApply: howTaxApply,
      taxApplyAmount: taxApplyAmount?.id,
      taxPayCondition: taxPayCondition,
    }).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          //setLoading(false);
          toast.success(res?.data?.message);
          setAllData(res.data.data)
          // handleSaveAsPaid()
          handleModal()
        } else {
          toast.error(res?.data?.message);
          // setLoading(false);
        }
      } else {
        toast.error("something went wrong !");
        //setLoading(false);
      }
    });
  }

  // sa: handle create/edit button click
  const createDiscount = () => {
    // console.log('discountApplyAmount',discountApplyAmount)
    // console.log('selectedCurrency',selectedCurrency)
    // console.log('discountAmount',discountAmount)
    const { error } = Joi.object(schema).validate({
      taxAmount,
    });
    // console.log('error',error)
    if (error) {
      return setValidateFlag(true);
    } else {
      handleCreateTax();
    }
  }
  return (
    <Grid item>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleModal}
        closeAfterTransition
        className={style.newModal}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Grid item className={style.wrapper_modal440}>
            {/* title */}
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item className={style.TitleModal}>
                Tax option
              </Grid>
              <Grid item>
                <IconButton
                  size="small"
                  className={style.border_btn}
                  onClick={handleModal}
                >
                  <img src={closeIcon.src} />
                </IconButton>
              </Grid>
            </Grid>

            {/* body */}
            <Grid item>
              <Grid container alignItems="center" className={style.BG_Info2}>
                <Grid item className={style.P_InfoSvg}>
                  <img src={InfoSvg.src} className={style.InfoSvg} />
                </Grid>
                <Grid item className={style.Desk_shipping}>
                  {
                    notification?.name
                  }
                </Grid>
              </Grid>
              <Grid item className={style.P_RadioAbs}>
                <Radio
                  FirstText="Calculate tax automatically"
                  SecondText="Enter tax amount manually "
                  setSelectedRadio={setTaxPayCondition}
                  first={taxPayCondition == 1 ? true : false}
                />
              </Grid>
              {taxPayCondition == 2 &&
                <Grid item className={style.shit}>
                  <TwoSelect label="" placeHolder="Enter number"
                    defaultValue2={defaultCurrencySign}
                    OptionList2={DraftOrderData?.priceUints?.map(x => ({ id: x.id, name: x.sign }))}
                    defaultValue1={taxApplyAmount}
                    defaultValue3={taxAmount}
                    setValueOption1={setTaxApplyAmount}
                    setValueOption2={setSelectedCurrency}
                    setValueInput={setTaxAmount}
                    inputSchema={schema.taxAmount}
                    inputPercentageSchema={schema.taxPercentage}
                    validateFlag={validateFlag}
                  />
                </Grid>

              }
              <Grid item style={{ marginTop: 18 }}>
                <Radio
                  FirstText="Add Tax, if all balance is partially paid "
                  SecondText="Add Tax, if all balance is fully paid "
                  IsBlue={false}
                  setSelectedRadio={setHowTaxApply}
                  first={howTaxApply == 1 ? true : false}
                />
              </Grid>
            </Grid>

            {/* footer */}
            <Grid item style={{ marginTop: "25px" }}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                className={style.buttonModal}
                onClick={createDiscount}
              >
                {taxAmount ? 'Edit Tax' : 'Add Tax'}
              </Button>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </Grid>
  );
}
