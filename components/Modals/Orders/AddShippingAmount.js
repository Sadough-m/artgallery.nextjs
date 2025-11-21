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
import CustomCheckBox from "../../Forms/CustomCheckBox";
import InputForm from "../../Forms/InputForm";
import Joi from "joi";
import { PostAuthUrl } from "../../../pages/api/config";
import { Create_Update_Draft_Order_Shipment } from "../../../pages/api";
import getCollectionId from "../../../Hooks/getCollectionId";
import { toast } from "react-toastify";
// sa : validation ↓
const schema = {
  shipmentAmount: Joi.number()
    // .email({ tlds: { allow: false } })
    .messages({
      "number.empty": `amount is required`,
      // "string.email": `Enter a valid email`,
      "number.base": `amount is required`,
    })

};
export default function AddShippingAmount({
  open,
  handleModal,
  setAllData,
  AllData
}) {
  // gm : states ↓
  const [Check1, setCheck1] = useState(AllData?.shipping?.shipmentStatus == 1 && true);
  const [Check2, setCheck2] = useState(AllData?.shipping?.shipmentStatus == 2 && true);
  const [shipmentAmount, setShipmentAmount] = useState(AllData?.shipping?.shippingAmount);
  const [validateFlag, setValidateFlag] = useState(false);

  // sa: handle create/edit button click
  const handleCreateShipment = () => {
    PostAuthUrl(Create_Update_Draft_Order_Shipment(AllData?.id, getCollectionId()), {
      "shipmentStatus": Check1 && 1 || Check2 && 2,
      "shippingAmount": shipmentAmount
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
  const createShipment = () => {

    const { error } = Joi.object(schema).validate({
      shipmentAmount
    });
    // console.log('error',error)
    if (error) {
      return setValidateFlag(true);
    } else {
      handleCreateShipment();
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
                Shipping info
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
              <Grid container alignItems="center" className={style.BG_Info}>
                <Grid item className={style.P_InfoSvg}>
                  <img src={InfoSvg.src} className={style.InfoSvg} />
                </Grid>
                <Grid item className={style.Desk_shipping}>
                  as soon as this consignment is official the values for
                  Consignment cost will be overrided in artwork
                </Grid>
              </Grid>

              {/* Check Boxes */}
              <Grid item className={style.CheckBox_Modal_2}>
                <CustomCheckBox label="No shipping " checked={Check1} setChecked={setCheck1} />
              </Grid>
              <Grid item className={style.CheckBox_Modal_1}>
                <CustomCheckBox label="Custom amount" checked={Check2} setChecked={setCheck2} />
              </Grid>
              <InputForm value={shipmentAmount} setValue={setShipmentAmount} schema={schema.shipmentAmount} label="Amount" placeHolder="Enter amount" />
            </Grid>

            {/* footer */}
            <Grid item style={{ marginTop: "25px" }}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                className={style.buttonModal}
                onClick={createShipment}
              >
                {shipmentAmount ? 'Edit Shipping' : 'Add Shipping'}

              </Button>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </Grid>
  );
}
