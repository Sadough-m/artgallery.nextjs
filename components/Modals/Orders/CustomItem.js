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
import CustomSelect from "../../Forms/CustomSelect";
import CustomCheckBox from "../../Forms/CustomCheckBox";
import Joi from "joi";
import {PostAuthUrl} from "../../../pages/api/config";
import {Create_Order_Item} from "../../../pages/api";
import {toast} from "react-toastify";
import getCollectionId from "../../../Hooks/getCollectionId";
// sa : validation ↓
const schema = {
  name: Joi.string()
      // .email({ tlds: { allow: false } })
      .messages({
        "string.empty": `name is required`,
        "string.base": `name is required`,
      }),
  qty: Joi.number().integer()
      .messages({
        "number.empty": `quantity is required`,
        "number.base": `quantity is required`,
        "number.any": `quantity is required`,
      }),
  price: Joi.number().integer()
      .messages({
        "number.empty": `price is required`,
        "number.base": `price is required`,
        "number.any": `price is required`,
      }),
  weight: Joi.number().integer()
      .messages({
        "number.empty": `weight is required`,
        "number.base": `weight is required`,
        "number.any": `weight is required`,
      }),
  wide: Joi.number().integer()
      .messages({
        "number.empty": `wide is required`,
        "number.base": `wide is required`,
        "number.any": `wide is required`,
      }),
  height: Joi.number().integer()
      .messages({
        "number.empty": `height is required`,
        "number.base": `height is required`,
        "number.any": `height is required`,
      }),
  depth: Joi.number().integer()
      .messages({
        "number.empty": `depth is required`,
        "number.base": `depth is required`,
        "number.any": `depth is required`,
      }),
    selectedWeightUnit:  Joi.object().keys({

        id: Joi.string().required(),
        // name: Joi.string().email().required()
    }).unknown(true),
    selectedCurrencyUnit: Joi.object().keys({

        id: Joi.string().required(),
        // name: Joi.string().email().required()
    }).unknown(true)
      .messages({
        "object.id.empty": `currency Unit is required`,
        // "string.base": `currency Unit is required`,
      }),
    selectedHeightUnit: Joi.object().keys({

        id: Joi.string().required(),
        // name: Joi.string().email().required()
    }).unknown(true)
      .messages({
        "object.id.empty": `Dimension Unit is required`,
        // "string.base": `Dimension Unit is required`,
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

export default function CustomItem({ open, handleModal,allDataForSelects,AllData,setAllData }) {
// console.log('allDataForSelects',allDataForSelects)
  // gm : states ↓
  const [HasWeight, setHasWeight] = useState(false);
  const [IncludeDeminsion, setIncludeDeminsion] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [qty, setQty] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [wide, setWide] = useState('');
  const [depth, setDepth] = useState('');
  const [selectedWeightUnit, setSelectedWeightUnit] = useState({id:'',name:''});
  const [selectedHeightUnit, setSelectedHeightUnit] = useState({id:'',name:''});
  const [selectedCurrencyUnit, setSelectedCurrencyUnit] = useState({id:'',name:''});
  const [validateFlag, setValidateFlag] = useState(false);
    // const [defaultCurrencySign, setDefaultCurrencySign] = useState({id:'',name:'$'});

    // sa: initialization
    useEffect(()=>{
        // console.log('AllData',AllData)
        // sa: find math currency
        const defaultCur= allDataForSelects?.priceUints?.find(x=>x.id==AllData?.unitId)
        // console.log('defaultCur',defaultCur)
        defaultCur &&    setSelectedCurrencyUnit(defaultCur)




    },[AllData])
    //sa: handle submit button
    const handleClickCreate = () => {
        // console.log('',title,email,selectedEmailListId)
        console.log('selectedHeightUnit ',selectedHeightUnit,selectedWeightUnit)
        let validateObj={
            name,
            price,
            qty,
            selectedCurrencyUnit
        }
        if(HasWeight)  validateObj={...validateObj,weight,selectedWeightUnit}
        if(IncludeDeminsion)  validateObj={...validateObj,height,depth,wide,selectedHeightUnit}
        console.log('validateObj',validateObj)
        const { error } = Joi.object(schema).validate(validateObj);
        console.log('error',error)
        if (error) {
             // setValidateFlag(validateFlag+1);
            return setValidateFlag(true);
        } else {
             createOrderItem();
        }
    };
    // as : create Order item
    const createOrderItem=()=>{
        PostAuthUrl(Create_Order_Item(AllData?.id,getCollectionId()),{
            "name": name,
            "qty": qty,
            "price": price,
            "unitId": selectedCurrencyUnit?.id,
            "weight": weight,
            "hasWeight": HasWeight,
            "weightUnit": selectedWeightUnit?.id,
            "hasDimension": IncludeDeminsion,
            "width": wide,
            "height": height,
            "depth": depth,
            "demensionUnit": selectedHeightUnit?.id,
            "id": null
        }).then((res, err) => {
            if (res && res.status === 200) {
                if (res?.data?.isSuccess) {
                    //setLoading(false);
                    toast.success(res?.data?.message);
                    console.log('custom item add successful res',res.data.data)
                    setAllData(res.data.data)
                    handleModal()
                    //setFirst(false);
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
          <Grid item className={style.wrapper_modal440_mobileScroll}>
            {/* title */}
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item className={style.TitleModal}>
                Add item
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
            <Grid item className={style.bodyModal}>
              {/* forms */}
              <Grid item>
                <InputForm
                  label="Name"
                  type="text"
                  placeHolder="Enter item name"
                  setValue={setName}
                  value={name}
                  validateFlag={validateFlag}
                  schema={schema.name}
                />

                <InputForm
                  label="Quantity"
                  type="Ex. 2"
                  placeHolder="Enter item name"
                  setValue={setQty}
                  value={qty}
                  validateFlag={validateFlag}
                  schema={schema.qty}
                />

                <Grid container justifyContent="space-between">
                  <Grid item className={style.TwoForm30}>
                    <CustomSelect label="Unit" placeHolder="$ - USD"
                                  Data={allDataForSelects?.priceUints}
                                  setValue={(value)=>{
                                      // console.log('setValue',value)
                                      // setSelectedCurrencyUnit({id:value,name:selectedCurrencyUnit?.name})
                                  }}
                                  Value={selectedCurrencyUnit?.id}
                                  SelectName={selectedCurrencyUnit?.name}
                                  setSelectName={(value)=>{
                                      // console.log('setSelectName',value)
                                      setSelectedCurrencyUnit(value)
                                  }}
                                  validateFlag={validateFlag}


                    />
                  </Grid>
                  <Grid item className={style.TwoForm60}>
                    <InputForm label="Price" placeHolder="Enter price"
                               setValue={setPrice}
                               value={price}
                               validateFlag={validateFlag}
                               schema={schema.price}
                    />
                  </Grid>
                </Grid>
                <Grid item style={{ marginTop: 20 }}>
                  <CustomCheckBox
                    label="Has weight"
                    checked={HasWeight}
                    setChecked={setHasWeight}
                  />
                </Grid>
                {HasWeight && (
                  <Grid item style={{ marginTop: -15 }}>
                    <Grid container>
                      <Grid item className={style.Form7}>
                        <InputForm
                          top={-3}
                          placeHolder="Enter amount"
                          setValue={setWeight}
                          value={weight}
                          validateFlag={validateFlag}
                          schema={schema.weight}
                        />
                      </Grid>
                      <Grid item className={style.Form3}>
                        <CustomSelect
                          top={-3}
                          placeHolder="Unit"
                          Data={allDataForSelects?.weightUints}
                          setValue={(value)=>{
                              // setSelectedWeightUnit({id:value,...selectedWeightUnit})
                          }}
                          Value={selectedWeightUnit?.id}
                          SelectName={selectedWeightUnit?.name}
                            setSelectName={(value)=>{
                                setSelectedWeightUnit(value)

                                // setSelectedWeightUnit({name:value,...selectedWeightUnit})
                            }}
                          validateFlag={validateFlag}

                        />
                      </Grid>
                    </Grid>
                  </Grid>
                )}
                <Grid item style={{ marginTop: 8 }}>
                  <CustomCheckBox
                    label="Include dimension"
                    checked={IncludeDeminsion}
                    setChecked={setIncludeDeminsion}
                  />
                </Grid>
                {IncludeDeminsion && (
                  <Grid container style={{ marginBottom: -25 }}>
                    <Grid item className={style.FourInput}>
                      <InputForm placeHolder="Width" top={-16}
                                 setValue={setWide}
                                 value={wide}
                                 validateFlag={validateFlag}
                                 schema={schema.wide}
                      />
                    </Grid>
                    <Grid item className={style.FourInput}>
                      <InputForm placeHolder="Height" top={-16}
                                 setValue={setHeight}
                                 value={height}
                                 validateFlag={validateFlag}
                                 schema={schema.height}
                      />
                    </Grid>
                    <Grid item className={style.FourInput2}>
                      <InputForm placeHolder="Depth" top={-16}
                                 setValue={setDepth}
                                 value={depth}
                                 validateFlag={validateFlag}
                                 schema={schema.depth}
                      />
                    </Grid>
                    <Grid item className={style.FourInput_Last}>
                      <CustomSelect
                        placeHolder="Unit"
                        bgColor="white"
                        top={-16}
                        Data={allDataForSelects?.sizeUints}
                        setValue={(value)=>{
                            // setSelectedHeightUnit({id:value,...selectedHeightUnit})
                        }}
                        Value={selectedHeightUnit?.id}
                        SelectName={selectedHeightUnit?.name}
                          setSelectName={(value)=>{
                              setSelectedHeightUnit(value)
                              // setSelectedHeightUnit({name:value,...selectedHeightUnit})
                          }}
                        validateFlag={validateFlag}

                      />
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>

            {/* footer */}
            <Grid item style={{ marginTop: "25px" }}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                className={style.buttonModal}
                onClick={handleClickCreate}
              >
                Add Item
              </Button>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </Grid>
  );
}
