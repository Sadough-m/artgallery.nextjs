import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from 'next/router';

// good man : material ui ↓
import { Button, Grid, Hidden, IconButton } from "@material-ui/core";

// good man : styles ↓
import ArtWorkStyle from "../../../styles/artworkflow.module.css";

// good man : files ↓
import artWorkDetail from "../../../public/images/artwork detail.png";
import close from "../../../public/images/icons/Close12.svg";
import availibility from "../../../public/images/icons/Available.svg";
import arrowLeft from "../../../public/images/icons/Arrow left -.svg";
import editIcon from "../../../public/images/icons/Edit black.svg";

//rs : api helpers
import { GetAuthUrl } from "../../../pages/api/config";

//rs : url constants
import { BASE_URL, BASE_Image_Url, GET_ARTWORK_EDITION_DETAILS } from "../../../pages/api";

// good man : components ↓

export default function ArtWorkMenu({ menuArtWork, data }) {
  const router = useRouter();
  // mrx : states ↓
  const [details, setDetails] = useState();

  //rs : call get artwork edtion info api
  const getArtworkEditionInfo = (EditionId, CollectionId) => {
    GetAuthUrl(
      GET_ARTWORK_EDITION_DETAILS + "/" + EditionId + "/" + CollectionId
    ).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          setDetails(res.data.data);
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  };

  useEffect(() => {
    const collectionId = localStorage.getItem("collectionId");
    getArtworkEditionInfo(data?.id, collectionId);
  }, [data]);

  return (
    <Grid item className={ArtWorkStyle.P_artworkDetail}>
      <Grid item className={ArtWorkStyle.scrollBar_sticky}>
        <Grid
          container
          direction="column"
          spacing={2}
          className={ArtWorkStyle.wrapper_detail_art}
        >
          <Hidden mdUp>
            <Grid item className={ArtWorkStyle.p_closeEditMobile}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <IconButton onClick={menuArtWork}>
                    <Image src={arrowLeft} />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    onClick={() => router.push(`/artwork/${data?.id}`)}
                  >
                    <Image src={editIcon} />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Hidden>
          <Grid item className={ArtWorkStyle.center_img}
            style={{
              width: "100%",
              textAlign: "center"
            }}
          >
            <Grid item className={ArtWorkStyle.posRel}>
              <img src={BASE_Image_Url + data?.thumbnailUrl} className={ArtWorkStyle.ImgThumbnail} />
              <Hidden smDown>
                <Grid
                  container
                  justifyContent="space-between"
                  className={ArtWorkStyle.closeAndEdit}
                >
                  <Grid item>
                    <Button
                      className={ArtWorkStyle.buttonWhite}
                      onClick={menuArtWork}
                    >
                      <img src={close.src} />
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      startIcon={<img src={editIcon.src} />}
                      className={ArtWorkStyle.editBtn}
                      onClick={() => router.push(`/artwork/${data?.id}`)}
                    >
                      Edit
                    </Button>
                  </Grid>
                </Grid>
              </Hidden>
            </Grid>
          </Grid>
          <Grid item className={ArtWorkStyle.P_artworkTextDetail}>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Grid container>
                  <Grid item className={ArtWorkStyle.Text_painting}>
                    {data?.mediumName}
                  </Grid>
                  {
                    data?.subMediumName ? (
                      <>
                        <Grid item className={ArtWorkStyle.Text_artworkType}>
                          {data?.subMediumName}
                        </Grid>
                      </>
                    ) : (
                      <></>
                    )
                  }

                </Grid>
              </Grid>
              <Grid item className={ArtWorkStyle.Text_price}>
                {data?.price === -1 || data?.price === 0 ? "" : "$" + data?.price}
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item className={ArtWorkStyle.desk_model}>
                    {data?.title}
                  </Grid>
                  <Hidden mdUp>
                    <Grid item>
                      <Grid container spacing={1}>
                        <Grid item className={ArtWorkStyle.imgAvailability}>
                          <Image src={availibility} />
                        </Grid>
                        <Grid item className={ArtWorkStyle.text_availible}>
                          {data?.statuse}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Hidden>
                </Grid>
              </Grid>

              <Grid item className={ArtWorkStyle.nameArtist}>
                {" " + data?.artistsNames + ", "}
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container direction="column" spacing={1}>
              <Hidden smDown>
                <Grid item>
                  <Grid container spacing={1}>
                    <Grid item className={ArtWorkStyle.imgAvailability}>
                      <img src={BASE_Image_Url + details?.availabilityTypeImage} />
                    </Grid>
                    <Grid item className={ArtWorkStyle.text_availible}>
                      {details?.availabilityType}
                    </Grid>
                  </Grid>
                </Grid>
              </Hidden>

              <Grid item>
                <Grid item >
                  <Grid item style={{ marginBottom: '8px' }}>
                    <Grid container justifyContent="space-between">
                      <Grid item className={ArtWorkStyle.P_all_detail2}>
                        <Grid container direction="column">
                          <Grid item className={ArtWorkStyle.text_all_details}>
                            {
                              details?.creationYear
                                ?.split("T")[0]
                                ?.split(":")[0]
                            }
                          </Grid>
                          <Grid item className={ArtWorkStyle.detail_down}>
                            Year made
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item className={ArtWorkStyle.P_all_detail2}>
                        <Grid container direction="column">
                          <Grid item className={ArtWorkStyle.text_all_details}>
                            {details?.styleName}
                          </Grid>
                          <Grid item className={ArtWorkStyle.detail_down}>
                            Style
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item style={{ marginBottom: '8px' }}>
                    <Grid container justifyContent="space-between">
                      {
                        details?.artworkMesurment?.size_Width ? (
                          <Grid item className={ArtWorkStyle.P_all_detail3} style={{ marginRight: '12px' }}>
                            <Grid container direction="column">
                              <Grid item className={ArtWorkStyle.text_all_details}>
                                {details?.artworkMesurment?.size_Width}{" "}
                                {details?.artworkMesurment?.size_Unit_name}
                              </Grid>
                              <Grid item className={ArtWorkStyle.detail_down}>
                                Width
                              </Grid>
                            </Grid>
                          </Grid>
                        ) : (
                          <></>
                        )
                      }

                      {
                        details?.artworkMesurment?.size_Height ? (
                          <Grid item className={ArtWorkStyle.P_all_detail3} >
                            <Grid container direction="column">
                              <Grid item className={ArtWorkStyle.text_all_details}>
                                {details?.artworkMesurment?.size_Height}{" "}
                                {details?.artworkMesurment?.size_Unit_name}
                              </Grid>
                              <Grid item className={ArtWorkStyle.detail_down}>
                                Height
                              </Grid>
                            </Grid>
                          </Grid>
                        ) : (
                          <></>
                        )
                      }


                      {
                        details?.artworkMesurment?.size_Depth ? (
                          <Grid item className={`${ArtWorkStyle.P_all_detail3} ${ArtWorkStyle.SpaceLeft12}`} >
                            <Grid container direction="column">
                              <Grid item className={ArtWorkStyle.text_all_details}>
                                {details?.artworkMesurment?.size_Depth}{" "}
                                {details?.artworkMesurment?.size_Unit_name}
                              </Grid>
                              <Grid item className={ArtWorkStyle.detail_down}>
                                Depth
                              </Grid>
                            </Grid>
                          </Grid>
                        ) : (
                          <></>
                        )
                      }

                    </Grid>
                  </Grid>
                  {
                    details?.artworkMesurment?.weigh ? (
                      <Grid item className={ArtWorkStyle.p_weigh} >
                        <Grid container justifyContent="space-between">
                          <Grid item className={ArtWorkStyle.P_all_detail1}>
                            <Grid container direction="column">
                              <Grid item className={ArtWorkStyle.text_all_details}>
                                {details?.artworkMesurment?.weigh}{" "}
                                {details?.artworkMesurment?.weigh_Unit_name}
                              </Grid>
                              <Grid item className={ArtWorkStyle.detail_down}>
                                Weigh
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    ) : (
                      <></>
                    )
                  }


                  {/* <Grid item style={{marginBottom:'8px'}}>
                    <Grid container justifyContent="space-between">
                      <Grid item className={ArtWorkStyle.P_all_detail1}>
                        <Grid container direction="column" spacing={2}>
                          <Grid item className={ArtWorkStyle.text_subject}>
                            Subject matter
                          </Grid>
                          <Grid item>
                            <Grid container spacing={1}>
                              <Grid item className={ArtWorkStyle.subjects}>
                                One subject
                              </Grid>
                              <Grid item className={ArtWorkStyle.subjects}>
                                Two subject
                              </Grid>
                              <Grid item className={ArtWorkStyle.subjects}>
                                Three subject
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid> */}

                  {/* <Grid item style={{ marginBottom: "25px" }}>
                    <Grid container justifyContent="space-between">
                      <Grid item className={ArtWorkStyle.P_all_detail1}>
                        <Grid container direction="column" spacing={2}>
                          <Grid item className={ArtWorkStyle.text_subject}>
                            Visual qualities
                          </Grid>
                          <Grid item>
                            <Grid container spacing={1}>
                              <Grid item className={ArtWorkStyle.subjects}>
                                One visual
                              </Grid>
                              <Grid item className={ArtWorkStyle.subjects}>
                                Two visual
                              </Grid>
                              <Grid item className={ArtWorkStyle.subjects}>
                                Three visual
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid> */}

                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
