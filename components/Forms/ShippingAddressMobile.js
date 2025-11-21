import React, { useState, useEffect } from "react";
import Image from "next/image";
import Joi from "joi";

// mrx : material ui ↓
import Grid from "@material-ui/core/Grid";
import { Button, Hidden, IconButton } from "@material-ui/core";

// mrx : styles ↓
import styles from "../../styles/Home.module.css";

// mrx : files ↓
import EditAddress from "../Modals/EditAddress";
import TextArea from './TextArea'

// mrx : components ↓

export default function ShippingAddress({
  placeHolder = "Select Address",
  label = "",
  setValue,
  shippingAddress
}) {

  // good man : address of User
  const [address, setAddress] = useState("");

  //  good man : open modal
  const [modal, setModal] = useState(false);
  const [Title, setTitle] = useState("...");

  useEffect(() => {
    setAddress(
      `${shippingAddress[0]?.name === null &&
        shippingAddress[0]?.familly === null &&
        shippingAddress[0]?.address === null
        ? "Enter Address" : ""}${shippingAddress[0]?.name !== null && shippingAddress[0]?.name !== undefined
          ? shippingAddress[0]?.name
          : ''
      } ${shippingAddress[0]?.familly !== null && shippingAddress[0]?.familly !== undefined
        ?
        shippingAddress[0]?.familly
        : ''
      } \n${shippingAddress[0]?.Country !== null && shippingAddress[0]?.Country !== undefined
        ? shippingAddress[0]?.Country : ""
      }${shippingAddress[0]?.address &&
        shippingAddress[0]?.address !== null && shippingAddress[0]?.address !== undefined
        ? " , " + shippingAddress[0]?.address : ""
      }${shippingAddress[0]?.address &&
        shippingAddress[0]?.postalCode !== null && shippingAddress[0]?.postalCode !== undefined
        ? " , " + shippingAddress[0]?.postalCode : ""
      }
      `
    );
  }, [shippingAddress])

  //  good man : style of our input
  const handleStyleInput = () => {
    return styles.formInput3;
  };

  const handleShowTitle = () => {
    if (
      shippingAddress[0]?.address == null &&
      shippingAddress[0]?.name == null &&
      shippingAddress[0]?.familly == null &&
      shippingAddress[0]?.postalCode == null &&
      shippingAddress[0]?.country == null &&
      shippingAddress[0]?.galleryStudioAppartmentEtc == null &&
      shippingAddress[0]?.city == null &&
      shippingAddress[0]?.ListPhoneNumber == null
    ) {
      setTitle("Add")
    } else {
      setTitle("Edit")
    }
  }

  useEffect(() => {
    handleShowTitle()
  }, [])

  useEffect(() => {
    handleShowTitle()
  }, [shippingAddress])

  return (
    <Grid item>
      <Grid direction="row" item className={styles.label__input__Shipping}>
        {label}

        {
          Title === "Edit" ? (
            <p
              className={`${styles.shippingAddres_btn} ${styles.shippingAddres_btn_Edit}`}
              onClick={() => setModal(true)}
            >Edit</p>
          ) : (
            <></>
          )
        }


      </Grid>
      <Grid item className={styles.posRel}>
        {
          Title === "Edit" ? (
            <Grid
              onClick={() => setModal(true)}
              item
            >
              <TextArea
                schema={Joi.optional()}
                label=''
                placeHolder={address}
                value={address}
                // setValue={setValue}
                noDesignDisable={true}
                disabled={true}
              />
            </Grid>
          ) : (
            <></>
          )
        }

        {
          Title === "Add" ? (
            <Grid item className={styles.P_shippingAddres_btn}>
              <Button
                variant="contained"
                color="primary"
                className={styles.shippingAddres_btn}
                onClick={() => setModal(true)}
              >
                {Title} Shipping Address
              </Button>
            </Grid>
          ) : (
            <></>
          )
        }

      </Grid>

      <EditAddress
        Title={Title}
        setValue={setValue}
        shippingAddress={shippingAddress[0]}
        openModal={modal}
        handleModal={() => setModal(false)}
      />
    </Grid>
  );
}
