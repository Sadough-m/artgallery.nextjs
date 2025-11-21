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
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Contacts.module.css";

// gm : files ↓
import editSvg from "../../../../public/images/icons/Edit.svg";
import plusCircleSvg from "../../../../public/images/icons/Plus - Circle.svg";
import LoadingSpinerSvg from "../../../../public/loading.svg";

// gm : components ↓
import OverViewItem from "./OverViewItem";
import EditInfoAddress from "../../../Modals/Contact/EditInfoAddress";
import AddNewAddress from "../../../Modals/Contact/AddNewAddress";
import EditEmailList from "../../../Modals/Contact/EditEmailList";

export default function Ode({
  Data,
  AllLoading,
  getArtistDetails
}) {
  // gm : states ↓
  const [EditInfoModal, setEditInfoModal] = useState(false);
  const [ModalAddNewAddress, setModalAddNewAddress] = useState(false);
  const [ModalEmailList, setModalEmailList] = useState(false);

  const [AddressSectonLoading, setAddressSectonLoading] = useState(false);

  return (
    <Grid item className={Style.ode}>
      {/* overview */}
      <Grid item className="posRel">
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          className={Style.title_ode}
        >
          <Grid item className={Style.overView}>
            Overview
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
                  onClick={() => setEditInfoModal(true)}
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
              }}
              item className={Style.ode_items}>
              <img style={{ width: "60px" }} src={LoadingSpinerSvg.src} />
            </Grid>
          ) : (
            <Grid item className={Style.ode_items}>
              <OverViewItem title={Data?.overView?.overview?.firstName ? Data?.overView?.overview?.firstName + " " + Data?.overView?.overview?.lastName : "Name not added"} ActiveBadge={Data?.overView?.overview?.firstName ? true : false} />
              <OverViewItem title={Data?.overView?.email ? Data?.overView?.email : "Email not added"} ActiveBadge={Data?.overView?.email ? true : false} />
              <OverViewItem title={Data?.overView?.phoneNumber ? Data?.overView?.phoneNumber : "Phone number not added"} ActiveBadge={Data?.overView?.phoneNumber ? true : false} />
            </Grid>
          )
        }

        <span className={Style.line}></span>
      </Grid>

      {/* Default address */}
      <Grid item className="posRel">
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          className={Style.title_address}
        >
          <Grid item className={Style.overView}>
            Default address
          </Grid>

          {
            AllLoading ? (
              <></>
            ) : (
              <Grid item>
                <Button
                  color="primary"
                  variant="text"
                  startIcon={<Image src={plusCircleSvg} />}
                  onClick={() => setModalAddNewAddress(true)}
                >
                  Add More
                </Button>
              </Grid>
            )}
        </Grid>

        {/* items */}
        {
          AllLoading ? (
            <Grid
              style={{
                textAlign: "center",
                position: "relative",
                top: "4px",
              }}
              item className={Style.ode_items}>
              <img style={{ width: "60px" }} src={LoadingSpinerSvg.src} />
            </Grid>
          ) : (
            <>
              <Grid item className={Style.ode_items}>
                {
                  Data?.address[0]?.address ? (
                    <>
                      <OverViewItem
                        title={(Data?.address[0]?.address ? Data?.address[0]?.address : "")}
                        haveIcon={false}
                      />
                      <Grid item>
                        {
                          AddressSectonLoading ? (
                            <Grid
                              style={{
                                textAlign: "center",
                                position: "relative",
                                top: "4px",
                              }}
                              item className={Style.ode_items}>
                              <img style={{ width: "60px" }} src={LoadingSpinerSvg.src} />
                            </Grid>
                          ) : Data?.address?.slice(1)?.map((item) => (
                            <OverViewItem
                              setAddressSectonLoading={setAddressSectonLoading}
                              item={item}
                              AllData={Data}
                              getArtistDetails={getArtistDetails}
                              title={(item?.address ? item?.address : "")}
                              haveIcon={true}
                            />
                          ))
                        }
                      </Grid>
                    </>
                  ) : (
                    <OverViewItem
                      title="No address"
                      haveIcon={false}
                    />
                  )
                }
              </Grid>
              <span className={Style.line}></span>
            </>
          )
        }
      </Grid>

      {/* Email lists */}
      <Grid item className="posRel">
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          className={Style.title_ode_email}
        >
          <Grid item className={Style.overView}>
            Email lists
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
                  onClick={() => setModalEmailList(true)}
                >
                  Edit
                </Button>
              )
            }
          </Grid>
        </Grid>
        {/* items */}
        {
          AllLoading ? (
            <Grid
              style={{
                textAlign: "center",
                position: "relative",
                top: "4px",
              }}
              item className={Style.ode_items}>
              <img style={{ width: "60px" }} src={LoadingSpinerSvg.src} />
            </Grid>

          ) : (
            <>
              {
                Data?.emailList?.filter((item) => item?.checked)?.length ? (
                  <Grid item className={Style.ode_items}>
                    {
                      Data?.emailList?.filter((item) => item?.checked)?.map((item) => (
                        <OverViewItem title={item?.email} />
                      ))
                    }
                  </Grid>
                ) : (
                  <Grid item className={Style.ode_items}>
                    <OverViewItem title="None" />
                  </Grid>
                )
              }
            </>
          )
        }
        <span className={Style.line}></span>
      </Grid>

      {/* modals */}
      <EditInfoAddress
        getArtistDetails={getArtistDetails}
        open={EditInfoModal}
        handleModal={() => setEditInfoModal(false)}
        AllData={Data}
        shippingAddress={Data?.overview}
      />
      <AddNewAddress
        open={ModalAddNewAddress}
        handleModal={() => setModalAddNewAddress(false)}
        AllData={Data}
        getArtistDetails={getArtistDetails}
      />
      <EditEmailList
        getArtistDetails={getArtistDetails}
        open={ModalEmailList}
        handleModal={() => setModalEmailList(false)}
        AllData={Data}
        Data={Data?.emailList}
      />
    </Grid >
  );
}
