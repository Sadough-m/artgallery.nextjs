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
import InputForm from "../../Forms/InputForm";
import TextArea from "../../Forms/TextArea";
import TwoSelect from "../../Forms/TwoSelect";
import Radio from "../../Forms/Radio";
import Joi from "joi";
import { PostAuthUrl } from "../../../pages/api/config";
import { Create_Update_Draft_Order_Discount } from "../../../pages/api";
import { toast } from "react-toastify";
import getCollectionId from "../../../Hooks/getCollectionId";
// sa : validation ↓
const schema = {
  discountAmount: Joi.number()
    // .email({ tlds: { allow: false } })
    .messages({
      "number.empty": `amount is required`,
      // "string.email": `Enter a valid email`,
      "number.base": `amount is required`,
    }),
  discountPercentage: Joi.number().integer().greater(0).less(100)
    // .email({ tlds: { allow: false } })
    .messages({
      "number.empty": `amount is required`,
      // "string.email": `Enter a valid email`,
      "number.base": `amount is required`,
      "number.max": `amount should between 0-100`,
      "number.min": `amount should between 0-100`,
    }),

};
// gm : components ↓

export default function AddDiscount({
  setAllData,
  open,
  handleModal,
  AllData,
  allDataForSelects,
  handleSaveAsPaid
}) {
  // console.log('AllData',AllData)
  // console.log('allDataForSelects',allDataForSelects)
  // gm : states ↓
  const [defaultCurrencySign, setDefaultCurrencySign] = useState({ id: '', name: '$' });
  const [discountApplyAmount, setDiscountApplyAmount] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState({});
  const [discountAmount, setDiscountAmount] = useState(1);
  const [discountNote, setDiscountNote] = useState('');
  const [discountPayCondition, setDiscountPayCondition] = useState(1);
  const [validateFlag, setValidateFlag] = useState(false);

  // sa: useEffect
  useEffect(() => {
    // sa: find math currency
    const defaultCur = allDataForSelects?.priceUints?.find(x => x.id == AllData?.unitId)
    defaultCur && setDefaultCurrencySign({ id: defaultCur.id, name: defaultCur.sign })

    // sa: set exist data
    setDiscountApplyAmount({ id: AllData?.discount?.discountApplyAmount, name: AllData?.discount?.discountApplyAmount == 1 ? 'FIAT' : '%' })
    setDiscountAmount(AllData?.discount?.discountAmount)
    setDiscountNote(AllData?.discount?.discountNote ? AllData?.discount?.discountNote : '')
    setDiscountPayCondition(AllData?.discount?.discountPayCondition)

  }, [AllData])

  // sa: handle create/edit button click
  const handleCreateDiscount = () => {
    PostAuthUrl(Create_Update_Draft_Order_Discount(AllData?.id, getCollectionId()), {
      "discountAmount": discountAmount,
      "discountNote": discountNote,
      "discountApplyAmount": discountApplyAmount?.id,
      "discountPayCondition": discountPayCondition
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

  // as: create discount func
  const createDiscount = () => {
    console.log('discountApplyAmount', discountApplyAmount)
    console.log('selectedCurrency', selectedCurrency)
    console.log('discountAmount', discountAmount)
    const { error } = Joi.object(schema).validate({
      discountAmount
    });
    // console.log('error',error)
    if (error) {
      return setValidateFlag(true);
    } else {
      handleCreateDiscount();
    }
  }

  // as: create Discount
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
                Discount
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
            <Grid item className={style.bodyModal_form_1}>
              {/* forms */}
              <Grid item>
                <Grid item>
                  <TwoSelect
                    label="Consignment terms"
                    placeHolder="Enter number"
                    defaultValue2={defaultCurrencySign}
                    OptionList2={allDataForSelects?.priceUints?.map(x => ({ id: x.id, name: x.sign }))}
                    defaultValue1={discountApplyAmount}
                    defaultValue3={discountAmount}
                    setValueOption1={setDiscountApplyAmount}
                    setValueOption2={setSelectedCurrency}
                    setValueInput={setDiscountAmount}
                    inputSchema={schema.discountAmount}
                    inputPercentageSchema={schema.discountPercentage}
                    validateFlag={validateFlag}

                  />
                </Grid>

                <Grid item style={{ marginTop: 17 }}>
                  <Radio
                    FirstText="Add discount, if all balance is partially paid "
                    SecondText="Add discount, if all balance is fully paid "
                    setSelectedRadio={setDiscountPayCondition}
                    first={discountPayCondition == 1 ? true : false}
                  />
                </Grid>
                <Grid item style={{ marginTop: 10 }}>
                  <TextArea value={discountNote} setValue={setDiscountNote} label="Note" placeHolder="Write your note here" />
                </Grid>
              </Grid>
            </Grid>

            {/* footer */}
            <Grid item style={{ marginTop: 15 }}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                className={style.buttonModal}
                onClick={createDiscount}
              >
                {discountAmount ? 'Edit Discount' : 'Add Discount'}
              </Button>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </Grid>
  );
}
