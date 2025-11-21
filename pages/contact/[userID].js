import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Router, useRouter } from "next/router";
import Joi from "joi";
import { toast } from "react-toastify";
import Link from "next/link";

// gm : material ui ↓
import { Grid, Hidden, IconButton } from "@material-ui/core";
import HeaderLanding from "../../components/common/header";

// gm : styles ↓
import Style from "../../styles/Contacts.module.css";

// gm : files ↓
import arrowLeft from "../../public/images/icons/Arrow left -.svg";
import dotsSvg from "../../public/images/icons/MoreBlack.svg";

// gm : components ↓
import Ode from "../../components/Screens/Contact/Saved/Ode";
import TaxSetting from "../../components/Screens/Contact/Saved/TaxSetting";
import Tags from "../../components/Screens/Contact/Saved/Tags";
import Note from "../../components/Screens/Contact/Saved/Note";
import Orders from "../../components/Screens/Contact/Saved/Orders";
import TimeLine from "../../components/Screens/Contact/Saved/TimeLine";
import Icons from "../../components/Screens/Contact/Saved/Icons";
import useWindowSize from "../../Hooks/useWindowSize";

//rs : apis getters
import { GetAuthUrl, GetUrl, PostAuthUrl } from "../api/config";

//rs : set cookies with this
import Cookies from "js-cookie";

//rs : api urls
import {
  CONTACT_DETAILS,
  ARCHIVE_ARTIST,
  UPDATE_NOTE_REAL_Contact,
  SAVE_ARTIST,
  BASE_Image_Url
} from "../api";

export default function Saved() {
  const router = useRouter();

  // mrx : states ↓
  let [collectionId, setCollectionId] = useState("");
  let [artistId, setArtistId] = useState("");
  let [artist, setArtist] = useState({});
  const [showPrivateNote, setShowPrivateNote] = useState(false);
  const [publicValue, setpublicValue] = useState(false);
  const [privateNote, setPrivateNote] = useState();
  const [UserDetail, setUserDetail] = useState([]);
  const [PrivateNoteData, setPrivateNoteData] = useState([]);
  const [publicValueData, setPublicValueData] = useState([]);
  const [timer, setTimer] = useState(0);
  const [AllLoading, setAllLoading] = useState(true);

  const [NoteData, setNoteData] = useState([]);

  //rs : set artist list in state
  const getArtistDetails = (id) => {
    const collectionId = localStorage.getItem("collectionId");
    GetAuthUrl(CONTACT_DETAILS + `/${collectionId}/${id}`).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          const art = res.data.data;
          setUserDetail(res.data.data);
          let prvNote = art?.artistsNote?.filter(
            (note) => note?.privacyType === 1
          )[0];
          let pubNote = art?.artistsNote?.filter(
            (note) => note?.privacyType === 2
          )[0];
          setPrivateNoteData(prvNote === null ? "" : prvNote);
          setPublicValueData(pubNote === null ? "" : pubNote);
          setPrivateNote(prvNote?.text);
          setpublicValue(pubNote?.text);
          setArtist(art);
          setAllLoading(false);
        } else {
          toast.error(res?.data?.message);
          setAllLoading(false);
        }
      } else {
        setAllLoading(false);
        toast.error("something went wrong !");
      }
    });
  };

  const handleChangeprivateNote = (value) => {
    setPrivateNote(value);

    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      handleChangeprivateNoteApi(value);
    }, 500);

    setTimer(newTimer);
  };

  const handleChangepublicNote = (value) => {
    setpublicValue(value);

    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      handleChangepublicNoteApi(value);
    }, 500);

    setTimer(newTimer);
  };

  const handleChangepublicNoteApi = (value) => {
    const collectionId = localStorage.getItem("collectionId");
    PostAuthUrl(UPDATE_NOTE_REAL_Contact + `?collectionId=${collectionId}`, {
      id: PublicValueData?.id,
      text: value,
      relatedId: PublicValueData?.relatedId,
      relatedType: 4,
      privacyType: 2,
      collectionId: collectionId,
    }).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  };

  const handleChangeprivateNoteApi = (value) => {
    const collectionId = localStorage.getItem("collectionId");
    PostAuthUrl(UPDATE_NOTE_REAL_Contact + `?collectionId=${collectionId}`, {
      id: PrivateNoteData?.id,
      text: value,
      relatedId: PrivateNoteData?.relatedId,
      relatedType: 4,
      privacyType: 1,
      collectionId: collectionId,
    }).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  };

  useEffect(() => {
    collectionId = localStorage.getItem("collectionId");
    setCollectionId(collectionId);
  }, []);

  //
  useEffect(() => {
    if (router.asPath !== router.route) {
      const { userID } = router.query;
      setArtistId(userID);
      getArtistDetails(userID);
    }
  }, [router]);

  const PrivateNoteHandler = () => {
    setShowPrivateNote(true);
  };

  const TeamNoteHandler = () => {
    setShowPrivateNote(false);
  };
  // mrx : functions (end) ↓

  // mrx : archive artist
  const handleArchiveArtist = () => {
    GetAuthUrl(ARCHIVE_ARTIST(localStorage.getItem("collectionId"), artistId)).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          getArtistDetails(artistId);
          toast.success(`successfully Done`);
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  }

  // mrx : save artist
  const handleSaveArtist = () => {
    GetAuthUrl(SAVE_ARTIST(localStorage.getItem("collectionId"), artistId)).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          getArtistDetails(artistId);
          toast.success(`successfully Done`);
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  }
  const [width, height] = useWindowSize();

  return (
    <Grid item>
      <Grid style={{ marginBottom: "100px" }} container className={Style.wrapper_saved}>
        {/* left side */}
        <Grid item className={Style.LeftSide_saved}>
          <Grid item className={Style.nameContact}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <IconButton
                  size="small"
                  className={Style.arrowLeft}
                  onClick={() => router.push("/contact")}
                >
                  <Image src={arrowLeft} />
                </IconButton>
                {artist.fullName}
              </Grid>
              <Hidden mdUp>
                <Grid item>
                  <IconButton size="small">
                    <Image src={dotsSvg} />
                  </IconButton>
                </Grid>
              </Hidden>
            </Grid>
          </Grid>
          <Grid item className={Style.WrapperNOT}>
            <Note
              AllLoading={AllLoading}
              handleChangepublicNote={handleChangepublicNote}
              handleChangeprivateNote={handleChangeprivateNote}
              showPrivateNote={showPrivateNote}
              privateNote={privateNote}
              setpublicValue={setpublicValue}
              setPrivateNote={setPrivateNote}
              PrivateNoteData={PrivateNoteData}
              publicValue={publicValue}
            />
            <Orders
              AllLoading={AllLoading}
            />
            <TimeLine
              AllLoading={AllLoading}
              Data={artist}
              BASE_Image_Url={BASE_Image_Url}
            />
          </Grid>
        </Grid>

        {/* right side */}
        <Grid item className={Style.RightSide_saved}>
          <Grid item>
            <Hidden smDown>
              <Icons
                AllData={artist}
                getArtistDetails={getArtistDetails}
              />
            </Hidden>
            <Ode
              getArtistDetails={getArtistDetails}
              AllLoading={AllLoading}
              Data={artist}
            />
            <TaxSetting
              getArtistDetails={getArtistDetails}
              AllLoading={AllLoading}
              Data={artist}
            />
            <Tags
              Data={artist}
              AllLoading={AllLoading}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
