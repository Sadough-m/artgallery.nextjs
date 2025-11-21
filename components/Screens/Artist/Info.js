import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

// good man : material ui ↓
import { Button, Grid, Hidden, IconButton } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

// mrx : api links ↓
import { EDIT_TAGS, SEARCH_TAGS } from "../../../pages/api/index";

// mrx : api ↓
import {
  PostUrl,
  PostAuthUrl,
  PutAuthUrl,
  GetUrl,
  GetAuthUrl,
} from "../../../pages/api/config";

// good man : styles ↓
import savedArtistStyle from "../../../styles/savedArtist.module.css";

// good man : files ↓
import markPic from "../../../public/images/icons/Bookmark.svg";
import markPicBlue from "../../../public/images/icons/Archive Blue.svg";
import trashPic from "../../../public/images/icons/Trash.svg";
import notificationPic from "../../../public/images/icons/Notification 2.svg";
import InquriesPic from "../../../public/images/icons/Inquries.svg";
import editPic from "../../../public/images/icons/Edit.svg";
import closeImg from "../../../public/images/icons/Close.svg";
import EmailListModal from "../../../components/Modals/ArtistCV/EditEmailList";

// good man : components ↓
import CustomCheckBox from "../../Forms/CustomCheckBox";
import SectionInfo from "./SectionInfo";
import Tags from "./Tags";
import SectionBranching from "./SectionBranching";
import EditBio from "../../Modals/EditBio";
import EditAddress from "../../Modals/EditAddress";
import EditInfo from "../../Modals/EditInfo";
import { useRouter } from "next/router";
import EditTax from "../../Modals/EditTax";
import Archive from "../../Modals/Archive";

export default function Info({ handleArchiveArtist, handleSaveArtist, Data }) {
  const router = useRouter();

  const [openArchiveMd, setopenArchiveMd] = useState(false);
  const [editBioModal, setEditBioModal] = useState(false);
  const [overviewModal, setOverviewModal] = useState(false);
  const [addressModal, setAddressModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [taxModal, setTaxModal] = useState(false);
  const [checkedTax, setCheckedTax] = useState(false);
  const [CollectTax, setCollectTax] = useState(false);
  const [TagList, setTagList] = useState([]);
  const [NewTag, setNewTag] = useState([]);
  const [SearchTag, setSearchTag] = useState("");
  const [shippingAddress, setshippingAddress] = useState([]);
  const [BookMark, setBookMark] = useState(false);
  const [EmailListModalSt, setEmailListModalSt] = useState(false);
  const [AddingTags, setAddingTags] = useState(false);
  const [EmailAddresses, setEmailAddresses] = useState("");
  const [FullName, setFullName] = useState("");
  const [timer, setTimer] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  // useEffect(() => {
  //   if (searchTerm === "") {
  //     // GetArtistFiltred();
  //   } else {
  //     clearTimeout(timer);
  //     const newTimer = setTimeout(() => {
  //       SearchTags();
  //     }, 500);
  //   }
  //   setTimer(newTimer);
  // }, [searchTerm]);

  // const SearchTags = () => {
  //   GetAuthUrl(SEARCH_TAGS(localStorage.getItem("collectionId"), NewTag)).then((res, err) => {
  //     if (res && res.status === 200) {
  //       if (res?.data?.isSuccess) {
  //         // setTagList((prev) => [...prev, res?.data?.data?.map((item) => ({}))]);
  //       } else {
  //         toast.error(res?.data?.message);
  //       }
  //     } else {
  //       toast.error("something went wrong !");
  //     }
  //   });
  // }

  const [bio, setbio] = useState("");

  useEffect(() => {
    setbio(Data?.bio);
    setCollectTax(Data?.getTax);
    setTagList(Data?.tags);
    setEmailAddresses(Data?.email);
    setFullName(Data?.fullName);
    setBookMark(Data?.isSaved);
    setshippingAddress(
      Data?.shippingAddress !== "" ? Data?.shippingAddress : "{}"
    );
  }, [Data]);

  const handleAddNewTag = (e) => {
    setAddingTags(true);
    if (e.key === "Enter" && NewTag?.trim() !== "") {
      setTagList((prev) => [...prev, NewTag]);
    }
  };

  useEffect(() => {
    if (AddingTags === true) {
      PostAuthUrl(EDIT_TAGS, {
        artistId: Data?.id,
        collectionId: localStorage.getItem("collectionId"),
        tags: TagList,
      }).then((res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            setNewTag("");
            toast.success(`Tag Added successfully`);
            setAddingTags(false);
          } else {
            toast.error(res?.data?.message);
          }
        } else {
          toast.error("something went wrong !");
        }
      });
    }
  }, [TagList]);

  // open and close modal archive
  const handleArchiveMd = () => {
    if (FullName) {
      setopenArchiveMd(true);
      localStorage.setItem("artist-archiving-name", FullName && FullName);
    } else {
      toast.info("Please wait for a moment");
    }
  };

  const handleArchiveMdRightNow = () => {
    handleArchiveArtist();
    setopenArchiveMd(!openArchiveMd);
  };

  return (
    <Grid item className={savedArtistStyle.P_rightSide}>
      <Grid container direction="column" spacing={3}>
        <Hidden smDown>
          <Grid item className={savedArtistStyle.icon_tops}>
            <Grid container>
              <Grid container justifyContent="flex-end" spacing={0}>
                <Grid item onClick={() => setBookMark(!BookMark)}>
                  <IconButton
                    onClick={handleSaveArtist}
                    className={!BookMark ? savedArtistStyle.Icons : ""}
                  >
                    <img
                      src={!BookMark ? markPic.src : markPicBlue.src}
                      width="20px"
                    />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton className={savedArtistStyle.Icons}>
                    <Image src={InquriesPic} />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton className={savedArtistStyle.Icons}>
                    <Image src={notificationPic} />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton onClick={() => handleArchiveMd()} className={savedArtistStyle.Icons}>
                    <Image src={trashPic} />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Hidden>
        <Grid item className={savedArtistStyle.p_0}>
          <Grid
            container
            direction="column"
            className={savedArtistStyle.box_wrapper}
          >
            <Grid item>
              <Grid
                item
                className={`${savedArtistStyle.title} ${savedArtistStyle.bgTitle}`}
              >
                Artwork Branching
              </Grid>
              <Grid item className="posRel">
                <SectionBranching
                  title="Inventory Own"
                  value={Data?.artworkInventoryOwn}
                />
                <SectionBranching title="Sold" value={Data?.artworkSold} />
                <SectionBranching
                  title="Available"
                  value={Data?.artworkAvailable}
                />
                <span className={savedArtistStyle.LineFake}></span>
              </Grid>
            </Grid>
            <Grid item>
              <Grid
                container
                className={`${savedArtistStyle.titleFont} ${savedArtistStyle.bgTitle}`}
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item className={`${savedArtistStyle.title} `}>
                  Bio
                </Grid>
                <Grid item className={savedArtistStyle.P_btnEdit}>
                  <Button
                    color="primary"
                    variant="text"
                    startIcon={<Image src={editPic} />}
                    onClick={() => setEditBioModal(true)}
                  >
                    <span
                      className={`${savedArtistStyle.textNone} ${savedArtistStyle.buttonEdit}`}
                    >
                      Edit
                    </span>
                  </Button>
                </Grid>
              </Grid>
              <Grid item className={savedArtistStyle.P_items}>
                <Grid item className={savedArtistStyle.bioText}>
                  {bio === "" || !bio ? "no bio yet" : bio}
                </Grid>
                <span className={savedArtistStyle.LineFake}></span>

              </Grid>
            </Grid>

            <Grid item className={savedArtistStyle.fixBug}>
              <Grid item>
                <Grid
                  container
                  className={`${savedArtistStyle.titleFont} ${savedArtistStyle.bgTitle}`}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item className={savedArtistStyle.title}>
                    CV
                  </Grid>
                  <Grid item className={savedArtistStyle.P_btnEdit}>
                    {/* <Button color='primary' variant='text' startIcon={<Image src={editPic} />} onClick={() => handleModalCV()}>
                                                            <span className={`${savedArtistStyle.textNone} ${savedArtistStyle.buttonEdit}`}>Edit</span>
                                                        </Button> */}
                    <Button
                      color="primary"
                      variant="text"
                      startIcon={<Image src={editPic} />}
                      onClick={() => {
                        router.push(`/artist/getcv/${Data?.id}`);
                        localStorage.setItem("Adding-Artist-HaveEmail", true);
                        localStorage.setItem(
                          "Adding-Artist-email",
                          EmailAddresses
                        );
                      }}
                    >
                      <span
                        className={`${savedArtistStyle.textNone} ${savedArtistStyle.buttonEdit}`}
                      >
                        Edit
                      </span>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                {Data?.filledUserCvSection &&
                  Data?.filledUserCvSection?.map((item) => (
                    <SectionInfo title={item} ActiveBadge={false} />
                  ))}
              </Grid>
            </Grid>

            {Data?.havePrivateCv === true && (
              <Grid item className={savedArtistStyle.fixBug}>
                <Grid item>
                  <Grid
                    container
                    className={`${savedArtistStyle.titleFont} ${savedArtistStyle.bgTitle}`}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item className={savedArtistStyle.title}>
                      Private cv
                    </Grid>
                    <Grid item className={savedArtistStyle.P_btnEdit}>
                      {/* <Button color='primary' variant='text' startIcon={<Image src={editPic} />} onClick={() => handleModalCV()}>
                                                            <span className={`${savedArtistStyle.textNone} ${savedArtistStyle.buttonEdit}`}>Edit</span>
                                                        </Button> */}
                      <Button
                        color="primary"
                        variant="text"
                        startIcon={<Image src={editPic} />}
                        onClick={() => {
                          router.push(`/artist/GetPrivateCv/${Data?.id}`);
                          localStorage.setItem("Adding-Artist-HaveEmail", true);
                          localStorage.setItem(
                            "Adding-Artist-email",
                            EmailAddresses
                          );
                        }}
                      >
                        <span
                          className={`${savedArtistStyle.textNone} ${savedArtistStyle.buttonEdit}`}
                        >
                          Edit
                        </span>
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  {Data?.filledUserCvSection &&
                    Data?.filledUserCvSection?.map((item) => (
                      <SectionInfo title={item} ActiveBadge={false} />
                    ))}
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item className={savedArtistStyle.p_0}>
          <Grid
            container
            direction="column"
            className={savedArtistStyle.box_wrapper}
            justifyContent="center"
          >
            <Grid item>
              <Grid item>
                <Grid
                  container
                  className={`${savedArtistStyle.titleFont} ${savedArtistStyle.bgTitle}`}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item className={savedArtistStyle.title}>
                    Overview
                  </Grid>
                  <Grid item className={savedArtistStyle.P_btnEdit}>
                    <Button
                      color="primary"
                      variant="text"
                      startIcon={<Image src={editPic} />}
                      onClick={() => setOverviewModal(true)}
                    >
                      <span
                        className={`${savedArtistStyle.textNone} ${savedArtistStyle.buttonEdit}`}
                      >
                        Edit
                      </span>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className="posRel">
                <SectionInfo title={Data?.overview?.firstName ? Data?.overview?.firstName + " " + Data?.overview?.lastName : "Name not added"} ActiveBadge={Data?.overview?.firstName ? true : false} />
                <SectionInfo title={Data?.email ? Data?.email : "Email not added"} ActiveBadge={Data?.email ? true : false} />
                <SectionInfo title={Data?.phoneNumber ? Data?.phoneNumber : "Phone number not added"} ActiveBadge={Data?.phoneNumber ? true : false} />
                <span className={savedArtistStyle.LineFake}></span>
              </Grid>
            </Grid>
            <Grid item>
              <Grid item>
                <Grid
                  container
                  className={`${savedArtistStyle.titleFont} ${savedArtistStyle.bgTitle}`}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item className={savedArtistStyle.title}>
                    Default address
                  </Grid>
                  {/* <Grid item className={savedArtistStyle.P_addA}>
                    <Button
                      color="primary"
                      variant="text"
                      startIcon={<Image src={editPic} />}
                      // onClick={() => setAddressModal(true)}
                    >
                      <span
                        className={`${savedArtistStyle.textNone} ${savedArtistStyle.buttonEdit}`}
                      >
                        Edit َAddress
                      </span>
                    </Button>
                  </Grid> */}
                </Grid>
              </Grid>

              <Grid item className="posRel">
                <SectionInfo title={Data?.address?.trim() !== "" ? Data?.address : "Default address not added"} ActiveBadge={Data?.address?.trim() ? true : false} />
                <span className={savedArtistStyle.LineFake}></span>

              </Grid>
            </Grid>

            <Grid item>
              <Grid item>
                <Grid
                  container
                  className={`${savedArtistStyle.titleFont} ${savedArtistStyle.bgTitle}`}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item className={savedArtistStyle.title}>
                    Email lists
                  </Grid>
                  <Grid item className={savedArtistStyle.P_btnEdit}>
                    <Button
                      color="primary"
                      variant="text"
                      startIcon={<Image src={editPic} />}
                      onClick={() => setEmailListModalSt(true)}
                    >
                      <span
                        className={`${savedArtistStyle.textNone} ${savedArtistStyle.buttonEdit}`}
                      >
                        Edit
                      </span>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              {
                Data?.emailList?.length !== 0 ?
                  Data?.emailList?.map((item) => (
                    <SectionInfo title={item} ActiveBadge={true} />
                  ))
                  : <SectionInfo title={"None"} ActiveBadge={false} />
              }
            </Grid>
          </Grid>
        </Grid>

        <Grid item className={savedArtistStyle.p_0}>
          <Grid
            container
            direction="column"
            className={savedArtistStyle.box_wrapper}
            justifyContent="center"
          >
            <Grid item>
              <Grid item>
                <Grid
                  container
                  className={`${savedArtistStyle.titleFont} ${savedArtistStyle.bgTitle}`}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item className={savedArtistStyle.title}>
                    Tax settings
                  </Grid>
                  <Grid item className={savedArtistStyle.P_btnEdit}>
                    <Button
                      color="primary"
                      variant="text"
                      startIcon={<Image src={editPic} />}
                      onClick={() => setTaxModal(true)}
                    >
                      <span
                        className={`${savedArtistStyle.textNone} ${savedArtistStyle.buttonEdit}`}
                      >
                        Edit
                      </span>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={savedArtistStyle.P_items_no_border}>
              <span onClick={() => setTaxModal(true)}>
                <CustomCheckBox
                  label="Collect tax"
                  checked={CollectTax}
                  setChecked={() => console.log("")}
                />
              </span>
            </Grid>
          </Grid>
        </Grid>

        <Grid item className={savedArtistStyle.p_0}>
          <Grid
            container
            direction="column"
            className={savedArtistStyle.box_wrapper}
            justifyContent="center"
          >
            <Grid item>
              <Grid item>
                <Grid
                  container
                  className={`${savedArtistStyle.titleFont} ${savedArtistStyle.bgTitle}`}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item className={savedArtistStyle.title}>
                    Tags
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <input
                type="search"
                placeholder="New tag ..."
                value={NewTag}
                onChange={(e) => {
                  setNewTag(e.target.value); setSearchTerm(e.target.value)
                }}
                onKeyDown={(e) => handleAddNewTag(e)}
                className={savedArtistStyle.inputSearch}
              />
            </Grid>
            <Grid item className={savedArtistStyle.P_items_no_border}>
              <Grid container alignItems="center">
                {TagList &&
                  TagList?.map((item) => (
                    <Tags
                      Data={Data}
                      setTagList={setTagList}
                      TagList={TagList}
                      title={item}
                    />
                  ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <EditBio
        Data={Data}
        value={bio}
        setValue={setbio}
        openModal={editBioModal}
        handleModal={() => setEditBioModal(false)}
      />
      <EditAddress
        openModal={addressModal}
        handleModal={() => setAddressModal(false)}
      />

      <EditInfo
        AllData={Data}
        shippingAddress={Data?.overview}
        openModal={overviewModal}
        handleModal={() => setOverviewModal(false)}
      />

      <EditTax
        value={CollectTax}
        setValue={setCollectTax}
        Data={Data}
        openModal={taxModal}
        handleModal={() => setTaxModal(false)}
      />

      <EmailListModal
        open={EmailListModalSt}
        AllData={Data}
        handleModal={() => setEmailListModalSt(false)}
        Data={Data?.emailList}
      />

      <Archive
        openModal={openArchiveMd}
        handleArchiveMdRightNow={handleArchiveMdRightNow}
        handleArchiveMd={handleArchiveMd}
        setopenArchiveMd={setopenArchiveMd}
      />
    </Grid>
  );
}
