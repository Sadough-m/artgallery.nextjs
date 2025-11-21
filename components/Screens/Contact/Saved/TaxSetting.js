import React, { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import Link from "next/link";

//rs : apis getters
import { GetAuthUrl, GetUrl, PostAuthUrl } from "../../../../pages/api/config";

//rs : api urls
import {
  EDIT_CONTACT_TAX
} from "../../../../pages/api/index";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Contacts.module.css";

// gm : files ↓
import editSvg from "../../../../public/images/icons/Edit.svg";
import LoadingSpinerSvg from "../../../../public/loading.svg";

// gm : components ↓
import CustomCheckBox from "../../../Forms/CustomCheckBox";
import Tax from "../../../Modals/Contact/Tax";

export default function TaxSetting({
  AllLoading,
  Data,
  getArtistDetails
}) {
  // gm : states ↓
  const [ModalTax, setModalTax] = useState(false);

  const handleToggleTax = (value) => {
    const collectionId = localStorage.getItem("collectionId");
    GetAuthUrl(EDIT_CONTACT_TAX(Data?.id, collectionId)).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          getArtistDetails(Data?.id);
          setModalTax(false);
          toast.success("Tax has been updated");
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  };

  return (
    <Grid item className={Style.ode}>
      {/* Tax settings */}
      <Grid item className="posRel">
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          className={Style.title_ode}
        >
          <Grid item className={Style.overView}>
            Tax settings
          </Grid>
          <Grid item>
            {
              AllLoading ? (
                <></>
              ) : (
                <Button
                  color="primary"
                  variant="text"
                  startIcon={<Image src={editSvg} />}
                  onClick={() => setModalTax(true)}
                >
                  Edit
                </Button>
              )}
          </Grid>
        </Grid>

        {/* items */}
        {
          AllLoading ? (
            <Grid
              style={{
                textAlign: "center",
                position: "relative",
                top: "12px",
                paddingBottom: "20px"
              }}
              alignItems="center" justifyContent="center"
              itemonClick={() => setModalTax(true)}>
              <img style={{ width: "60px" }} src={LoadingSpinerSvg.src} />
            </Grid>
          ) : (
            <Grid item className={Style.p_check} onClick={() => setModalTax(true)}>
              <CustomCheckBox label="Collect tax" checked={Data?.getTax} disabled={true} />
            </Grid>
          )
        }
      </Grid>
      <Tax
        Data={Data}
        open={ModalTax}
        handleModal={() => setModalTax(false)}
        handleToggleTax={handleToggleTax}
      />
    </Grid>
  );
}
