import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../styles/Home.module.css";

// gm : files ↓
import editSvg from "../../public/images/icons/Edit gray.svg";
import EditAddress from "../Modals/UserSettings/EditAddress";

// gm : components ↓

export default function ShippingAddress({
  setshippingAddressSave,
  saveShipping,
  setShippingAddress,
  shippingAddress,
  label,
  placeHolder
}) {
  // gm : states ↓
  const [EditAddressModal, setEditAddressModal] = useState(false);
  const [ValueForm, setValueForm] = useState("");

  // good man : address of User
  const [address, setAddress] = useState("");

  const error = false;
  const disabled = false;
  // gm : return Style of Input
  const StyleInput = () => {
    if (true) {
      return Style.inputShipping;
    } else if (error) {
      return Style.inputShipping_error;
    } else if (disabled) {
      return Style.inputShipping_disabled;
    }
  };

  // edit address modal
  const hadleEditAddress = () => {
    setEditAddressModal(!EditAddressModal);
  };

  useEffect(() => {
    setAddress(
      `${shippingAddress?.name === null &&
        shippingAddress?.familly === null &&
        shippingAddress?.address === null
        ? "Enter Address" : ""}${shippingAddress?.name !== null && shippingAddress?.name !== undefined
          ? shippingAddress?.name
          : ''
      } ${shippingAddress?.familly !== null && shippingAddress?.familly !== undefined
        ?
        shippingAddress?.familly
        : ''
      } ${shippingAddress?.name &&
        shippingAddress?.familly !== null && shippingAddress?.familly !== undefined
        ? " | " : ""
      }${shippingAddress?.country !== null && shippingAddress?.country !== undefined
        ? shippingAddress?.country : ""
      }${shippingAddress?.address &&
        shippingAddress?.address !== null && shippingAddress?.address !== undefined
        ? " | " + shippingAddress?.address : ""
      }${shippingAddress?.address &&
        shippingAddress?.postalCode !== null && shippingAddress?.postalCode !== undefined
        ? " | " + shippingAddress?.postalCode : ""
      }
      `
    );
  }, [shippingAddress])

  return (
    <>
      <Grid item >
        <Grid item className={Style.label_Shipping}>
          {label}
        </Grid>

        <Grid item className="posRel">
          <input
            type="text"
            className={StyleInput()}
            placeHolder={address}
            value={address}
            disabled={true}
          />
          <Button startIcon={<Image src={editSvg} />} className={Style.editBtn}>
            Edit
          </Button>
          <span className={Style.fixBugFireFox3} onClick={() => hadleEditAddress()}></span>
        </Grid>
        {error && (
          <Grid item className={Style.errorText}>
            You should to choose an option.
          </Grid>
        )}
      </Grid>
      <EditAddress
        shippingAddress={shippingAddress}
        openModal={EditAddressModal}
        saveShipping={saveShipping}
        setshippingAddressSave={setshippingAddressSave}
        setValue={setShippingAddress}
        handleModal={() => hadleEditAddress()}
      />
    </>
  );
}
