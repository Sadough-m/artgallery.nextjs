import { toast } from "react-toastify";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

//rs : apis getters
import { GetAuthUrl, DeleteAuthUrl, GetUrl, PostAuthUrl } from "../../../../pages/api/config";

//rs : api urls
import {
  DELETE_ADDRESS_CONTACT,
} from "../../../../pages/api/index";

// gm : material ui ↓
import { Grid, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Contacts.module.css";

// gm : files ↓
import removeSvg from "../../../../public/images/icons/Remove disable.svg";
import editSvg from "../../../../public/images/icons/Edit.svg";
import RemoveAddress from "../../../Modals/Contact/RemoveAddress";
import EditAddress from "../../../Modals/Contact/EditAddressOverview";

// gm : components ↓

export default function OverViewItem({
  title,
  haveIcon,
  item,
  AllData,
  setAddressSectonLoading,
  getArtistDetails
}) {
  // gm : states ↓
  const [ModalRemoveAddress, setModalRemoveAddress] = useState(false);
  const [ModalAddNewAddress, setModalAddNewAddress] = useState(false);
  const [Address, setAddress] = useState([]);

  const handleDeleteAddress = (AddressID) => {
    setAddressSectonLoading(true);
    const collectionId = localStorage.getItem("collectionId");
    DeleteAuthUrl(DELETE_ADDRESS_CONTACT(AllData?.id, AddressID, collectionId)).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess === true) {
          getArtistDetails(AllData?.id);
          setAddressSectonLoading(false);
          setModalRemoveAddress(false);
          toast.success("Address removed successfully");
        } else {
          toast.error("Request was not successful");
          setAddressSectonLoading(false);
        }
      } else {
        toast.error("something went wrong !");
        setAddressSectonLoading(false);
      }
    });
  };

  return (
    <Grid item className={Style.overViewItem}>
      <Grid container alignItems="center">
        <Grid item style={{ width: "17px" }}>
          <span className={Style.badgeGray}></span>
        </Grid>
        <Grid item style={{ flex: "1" }}>
          {title}
        </Grid>
        {haveIcon && (
          <Grid item className={Style.p_twoIcon}>
            <IconButton
              size="small"
              className={Style.removeIcon}
              onClick={() => setModalRemoveAddress(true)}
            >
              <Image src={removeSvg} />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => setModalAddNewAddress(true)}
            >
              <Image src={editSvg} />
            </IconButton>
          </Grid>
        )}
      </Grid>

      {/* modals */}
      <RemoveAddress
        item={item}
        handleDeleteAddress={handleDeleteAddress}
        open={ModalRemoveAddress}
        handleModal={() => setModalRemoveAddress(false)}
      />
      <EditAddress
        AllData={AllData}
        setAddress={setAddress}
        item={item}
        open={ModalAddNewAddress}
        getArtistDetails={getArtistDetails}
        handleModal={() => setModalAddNewAddress(false)}
      />
    </Grid>
  );
}
