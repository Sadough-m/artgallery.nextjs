import React, { useState, useEffect, useContext } from "react";
import Joi from "joi";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
import Link from "next/link";
import { useRouter } from "next/router";

// gm : material ui ↓
import { Button, Grid, Hidden, IconButton } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";

// gm : styles ↓
import Style from "../../styles/Contacts.module.css";

// mrx : context ↓
import { Context } from "../../context/index";

// mrx : api links ↓
import {
  GET_USER_INFO_FOR_ADD_CONTACT,
  GET_CONTACT_ADD_INPUT_DATA,
  ADD_CONTACT
} from "../../pages/api/index";

// mrx : api ↓
import {
  PostUrl,
  PostAuthUrl,
  GetUrl,
  GetAuthUrl,
} from "../../pages/api/config";

// gm : files ↓
import CloseIcon from "../../public/images/icons/Close icon.svg";
import arrowLeft from "../../public/images/icons/Arrow left -.svg";

// gm : components ↓
import HeaderLanding from "../../components/common/header";
import General from "../../components/Screens/Contact/Main/General";
import Address from "../../components/Screens/Contact/Main/Address";
import Tags from "../../components/Screens/Contact/Main/Tags";
import Note from "../../components/Screens/Contact/Main/Note";
import LoadingSpiner from "../../components/common/loadingSpiner";

export default function Add() {
  const router = useRouter();

  // mrx : context
  const { LoadingPage, setLoadingPage } = useContext(Context);

  // mrx : get collection ID frm local -----------------------------------------------------------------------------------------
  const CollectionID = typeof window !== "undefined" ? localStorage.getItem("collectionId") || "" : "";
  // End -----------------------------------------------------------------------------------------------------------------------

  // states ↓
  // States of the general Start ----------------------------------------------------------------------
  const [Email, setEmail] = useState("");
  const [Title, setTitle] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [Code, setCode] = useState("");
  const [phoneNumber2, setPhoneNumber2] = useState("");
  const [Code2, setCode2] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [KnownAs, setKnownAs] = useState(0);
  const [haveTwoNumber, sethaveTwoNumber] = useState(false);
  const [AddToEmailList, setAddToEmailList] = useState(false);
  const [HaveEmailFromSearch, setHaveEmailFromSearch] = useState(false);
  const [UserIDFromSearch, setUserIDFromSearch] = useState("");
  const [ListPhoneNumber, setListPhoneNumber] = useState([]);

  // End -------------------------------------------------------------------------------------------

  // States of the Address Start -------------------------------------------------------------------
  const [AddressValue, setAddressValue] = useState([]);
  // End -------------------------------------------------------------------------------------------

  // States of the Tags Start ----------------------------------------------------------------------
  const [TagList, setTagList] = useState([]);
  // End -------------------------------------------------------------------------------------------

  // States of the Note Start ----------------------------------------------------------------------
  const [NoteData, setNoteData] = useState([]);
  // End -------------------------------------------------------------------------------------------

  const [CheckRequired, setCheckRequired] = useState(false);

  const [SelectInputData, setSelectInputData] = useState([]);

  const Modal_Email = typeof window !== "undefined" ? localStorage.getItem("Adding-Artist-email") : "";
  const Modal_FName = typeof window !== "undefined" ? localStorage.getItem("Adding-Artist-firstName") : "";
  const Modal_LName = typeof window !== "undefined" ? localStorage.getItem("Adding-Artist-lastName") : "";
  const GET_EMAIL_ST = typeof window !== "undefined" ? localStorage.getItem("Adding-Artist-HaveEmail") : false;
  const GET_USER_ID_LOCAL = typeof window !== "undefined" ? localStorage.getItem("Adding-Search-UserID") : false;

  // mrx : remove search email and ... Start ------------------------------
  const handleRemoveSearchAddingItems = () => {
    localStorage.removeItem("Adding-Artist-email");
    localStorage.removeItem("Adding-Artist-HaveEmail");
    localStorage.removeItem("Adding-Artist-firstName");
    localStorage.removeItem("Adding-Artist-lastName");
  }
  // mrx : End ------------------------------------------------------------

  // set get inputs ------------------------------------------------------------------------------------------
  useEffect(() => {
    setEmail(Modal_Email ? Modal_Email : "");
    setFirstName(Modal_FName ? Modal_FName : "");
    setLastName(Modal_LName ? Modal_LName : "");
    setHaveEmailFromSearch(GET_EMAIL_ST);
    setUserIDFromSearch(GET_USER_ID_LOCAL);
    handleRemoveSearchAddingItems();
    GetInputData()
  }, [])
  // mrx : End -----------------------------------------------------------------------------------------------

  // get Phone numbers if was not null -----------------------------------------------------------------------
  useEffect(() => {
    if (ListPhoneNumber) {
      setPhoneNumber(ListPhoneNumber ? ListPhoneNumber[0]?.phoneNumber : "");
      setCode(ListPhoneNumber ? ListPhoneNumber[0]?.countryUniqCode : "");
      setPhoneNumber2(ListPhoneNumber ? ListPhoneNumber[1]?.phoneNumber : "");
      setCode2(ListPhoneNumber ? ListPhoneNumber[1]?.countryUniqCode : "");
      if (Code2) {
        sethaveTwoNumber(true);
      }
    }
  }, [ListPhoneNumber]);
  // mrx : End -----------------------------------------------------------------------------------------------

  // get user info Start -------------------------------------------------------------------------------------
  useEffect(() => {
    HandleGetUserInfoGeneral()
  }, [UserIDFromSearch])
  // mrx : End -----------------------------------------------------------------------------------------------

  // mrx : get user info if email was entered ----------------------------------------------------------------
  const HandleGetUserInfoGeneral = () => {
    if (UserIDFromSearch) {
      GetAuthUrl(GET_USER_INFO_FOR_ADD_CONTACT(UserIDFromSearch)).then((res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            localStorage.removeItem("Adding-Search-UserID");
            setKnownAs(res?.data?.data?.knownAs && res?.data?.data?.knownAs);
            setLastName(res?.data?.data?.lastName && res?.data?.data?.lastName);
            setFirstName(res?.data?.data?.firstName && res?.data?.data?.firstName);
            setTitle(res?.data?.data?.title && res?.data?.data?.title);
            setEmail(res?.data?.data?.email && res?.data?.data?.email);
            if (res?.data?.data?.phoneNumbers !== null) {
              setListPhoneNumber(res?.data?.data?.phoneNumbers)
            }
          } else {
            toast.warning(res?.data?.message);
          }
        } else {
          toast.error("something went wrong !");
        }
      });
    }
  };
  // mrx : End -----------------------------------------------------------------------------------------------

  // mrx : get inputs data evry time -------------------------------------------------------------------------
  const GetInputData = () => {
    GetAuthUrl(GET_CONTACT_ADD_INPUT_DATA(CollectionID)).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          setSelectInputData(res?.data?.data);
        } else {
          toast.warning(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  };

  useEffect(() => {
    setNoteData(SelectInputData?.noteType);
  }, [SelectInputData])
  // mrx : End -----------------------------------------------------------------------------------------------

  const ValidateDataForAddContact = () => {
    setLoadingPage(true);
    setCheckRequired(true);
    if (!Email) {
      toast.error("Please enter email address");
      setLoadingPage(false);
    } else if (!Title) {
      toast.error("Please enter title");
      setLoadingPage(false);
    } else if (!firstName) {
      toast.error("Please enter first name");
      setLoadingPage(false);
    } else if (!lastName) {
      toast.error("Please enter last name");
      setLoadingPage(false);
    } else if (AddressValue[0]?.name === "") {
      toast.error("Please enter first name from address section");
      setLoadingPage(false);
      router.push("/contact/add/#AddressSection");
    } else if (AddressValue[0]?.familly === "") {
      toast.error("Please enter last name from address section");
      router.push("/contact/add/#AddressSection");
      setLoadingPage(false);
    } else if (AddressValue[0]?.city === "") {
      toast.error("Please enter city from address section");
      router.push("/contact/add/#AddressSection");
      setLoadingPage(false);
    } else if (AddressValue[0]?.postalCode === "") {
      toast.error("Please enter postalCode from address section");
      router.push("/contact/add/#AddressSection");
      setLoadingPage(false);
    } else if (AddressValue[0]?.address === "") {
      toast.error("Please enter address");
      router.push("/contact/add/#AddressSection");
      setLoadingPage(false);
    } else {
      AddContact()
    }
  }

  // mrx : handle Add Contact -------------------------------------------------------------------------
  const AddContact = () => {
    setLoadingPage(true);
    PostAuthUrl(ADD_CONTACT(CollectionID), {
      "collectionId": CollectionID,
      "email": Email,
      "firstName": firstName,
      "lastName": lastName,
      "title": Title,
      "knownAs": KnownAs,
      "phoneNumbers": [
        phoneNumber?.length
          ? {
            "countryUniqCode": Code,
            "phoneNumber": phoneNumber
          }
          : {},
        phoneNumber2?.length
          ? {
            "countryUniqCode": Code,
            "phoneNumber": phoneNumber
          }
          : {},
      ],
      "addToEmailList": AddToEmailList,
      "shippingAddress": AddressValue[0],
      "tags": TagList,
      "notes": NoteData?.map((item) => ({
        "text": item?.description,
        "relatedId": UserIDFromSearch,
        "relatedType": SelectInputData?.noteRelatedType,
        "privacyType": item?.id,
        "collectionId": CollectionID
      }))
    }).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          setLoadingPage(false);
          toast.success("Contact added successfully");
          router.push("/contact");
        } else {
          toast.warning(res?.data?.message);
          setLoadingPage(false);
        }
      } else {
        toast.error("something went wrong !");
        setLoadingPage(false);
      }
    });
  };
  // mrx : End -----------------------------------------------------------------------------------------------

  return (
    <Grid item>
      {/* <Hidden smDown>
        <HeaderLanding />
      </Hidden> */}

      {/* mobile navbar */}
      <Hidden mdUp>
        <Grid
          container
          justifyContent="space-between"
          alignItems='center'
          className={Style.mobileNav}
        >
          <Grid onClick={() => router.push("/contact")} item className={Style.textAdd}>
            <IconButton size="small" className={Style.iconBtn}>
              <Image src={arrowLeft} />
            </IconButton>
            Add contact
          </Grid>
          <Grid item>
            <Button
              onClick={() => ValidateDataForAddContact()}
              variant="contained" color="primary" className={Style.addBtn}>
              Add Contact
            </Button>
          </Grid>
        </Grid>
      </Hidden>

      {/* start add contact */}
      <Grid
        container
        justifyContent="space-between"
        className={Style.wrapper_add}
      >
        {/* left side */}
        <Hidden smDown>
          <Grid item className={Style.leftSide_Add}>
            Add contact
          </Grid>
        </Hidden>

        {/* Main */}
        <Grid item className={Style.Middle_Add}>
          <General
            SelectInputData={SelectInputData}
            HaveEmailFromSearch={HaveEmailFromSearch}
            AddToEmailList={AddToEmailList}
            setAddToEmailList={setAddToEmailList}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            phoneNumber2={phoneNumber2}
            setPhoneNumber2={setPhoneNumber2}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            KnownAs={KnownAs}
            setKnownAs={setKnownAs}
            haveTwoNumber={haveTwoNumber}
            sethaveTwoNumber={sethaveTwoNumber}
            Code2={Code2}
            setCode2={setCode2}
            Code={Code}
            setCode={setCode}
            Title={Title}
            setTitle={setTitle}
            email={Email}
            setEmail={setEmail}
            setCheckRequired={setCheckRequired}
            CheckRequired={CheckRequired}
          />
          <spna id="AddressSection"></spna>
          <Address
            setCheckRequired={setCheckRequired}
            CheckRequired={CheckRequired}
            setValue={setAddressValue}
          />
          <Tags
            setTagList={setTagList}
            TagList={TagList}
          />
          <Note
            SelectInputData={SelectInputData}
            NoteData={NoteData}
            setNoteData={setNoteData}
          />
        </Grid>

        {/* right side */}
        <Hidden smDown>
          <Grid item className={Style.rightSide_Add}>
            <Grid item className={Style.p_buttons}>
              <Button
                onClick={() => { router.push("/contact"); toast.success("Contact discarded"); }}
                startIcon={<Image src={CloseIcon} />}
                className={Style.discardBtn}
              >
                Discard
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<CheckIcon />}
                className={Style.addContact}
                onClick={() => ValidateDataForAddContact()}
              >
                Add Contact
              </Button>
            </Grid>
          </Grid>
        </Hidden>
      </Grid>

      {/* end add contact */}
      <LoadingSpiner display={LoadingPage} />
    </Grid>
  );
}
