import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Joi from "joi";
import { toast } from "react-toastify";

// mrx : material ui ↓
import {
  Hidden,
  Button,
  Badge,
  IconButton,
  Container,
  Avatar,
  Grid,
} from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

// rmx : files  ↓
import picPerson from "../../public/images/guy.png";
import checkCircle from "../../public/images/icons/Check - Circle.svg";
import ArrowLeft from "../../public/images/icons/Arrow left -.svg";
import CloseRedSvg from "../../public/images/icons/CloseCircleRed.svg";
import CloseBlueSvg from "../../public/images/icons/CloseCircleBlue.svg";
import More from "../../public/images/icons/More.svg";

// mrx : styles ↓
import savedArtistStyle from "../../styles/savedArtist.module.css";

// mrx : components ↓
import Header from "../../components/common/header";
import TextArea from "../../components/Forms/TextArea";
import ContactCreatedList from "../../components/Screens/Artist/ContactCreatedList";
import Info from "../../components/Screens/Artist/Info";
import withAuth from "../../components/common/withAuth";
import useWindowSize from "../../Hooks/useWindowSize";

//rs: api getter
import { GetUrl } from "../api/config";

//rs: api url
import { TOGGLE_SAVE_ARTIST } from "../api";

//rs : set cookies with this
import Cookies from "js-cookie";
import Artworks from "../../components/Screens/Artist/Artworks/Artworks";
import Note from "../../components/Screens/Artist/Note";

function SavedArtist() {
  // mrx : states ↓
  let [collectionId, setCollectionId] = useState("");
  let [artistId, setArtistId] = useState("");
  const [openModalBio, setOpenModalBio] = useState(false);
  const [openModalInfo, setOpenModalInfo] = useState(false);
  const [openModalAddress, setOpenModalAddress] = useState(false);
  const [openModalCV, setOpenModalCV] = useState(false);

  //rs : get and set collectionId from cookie
  useEffect(() => {
    collectionId = localStorage.getItem("collectionId");
    artistId = localStorage.getItem("artistId");
    setCollectionId(collectionId);
    setArtistId(artistId);
    Cookies.remove("add-artist-from-artwork");
  }, []);

  //rs : toggle archive artist in collection
  const handleArchiveArtistInCollection = () => {
    GetUrl(TOGGLE_ARCHIVE_ARTIST + `/${collectionId}/${artistId}`).then(
      (res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            toast.success("Collection Archived!");
          } else {
            toast.error(res?.data?.message);
          }
        } else {
          toast.error("something went wrong !");
        }
      }
    );
  };

  //rs : toggle save artist in collection
  const handleSaveArtistInCollection = () => {
    GetUrl(TOGGLE_SAVE_ARTIST + `/${collectionId}/${artistId}`).then(
      (res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            toast.success("Collection Archived!");
          } else {
            toast.error(res?.data?.message);
          }
        } else {
          toast.error("something went wrong !");
        }
      }
    );
  };

  // mrx : functions (end) ↓
  const [width, height] = useWindowSize();

  return (
    <Grid item className={savedArtistStyle.SavedArtist}>
      

      <Container>
        <Grid
          container
          className={savedArtistStyle.mainContainer}
          justifyContent={width > 960 ? "space-around" : "flex-start"}
        >
          <Grid item md={8} className="w_100">
            <Grid container direction="column" spacing={4}>
              <Grid item className={savedArtistStyle.P_Text_easter}>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Grid container alignItems="center">
                      <Grid item className={savedArtistStyle.P_arrowLeft}>
                        <IconButton size="small">
                          <Image src={ArrowLeft} />
                        </IconButton>
                      </Grid>
                      <Grid item className={savedArtistStyle.Text_easter}>
                        Esther Howard
                      </Grid>
                    </Grid>
                  </Grid>
                  <Hidden mdUp>
                    <Grid item className={savedArtistStyle.icon_more}>
                      <IconButton>
                        <Image src={More} />
                      </IconButton>
                    </Grid>
                  </Hidden>
                </Grid>
              </Grid>
              
              <Note/>
              <Artworks/>

              <Grid item>
                <Grid container direction="column">
                  <Grid item className={savedArtistStyle.textNote}>
                    Orders
                  </Grid>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    className={savedArtistStyle.Box}
                  >
                    <Grid item className={savedArtistStyle.text_notAdded}>
                      No orders added yet
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="column">
                  <Grid item className={savedArtistStyle.textNote}>
                    Transactions
                  </Grid>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    className={savedArtistStyle.Box}
                  >
                    <Grid item className={savedArtistStyle.text_notAdded}>
                      No transactions added yet
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>



              <Grid item>
                <Grid container direction="column" spacing={2}>
                  <Grid item className={savedArtistStyle.textTimeLine}>
                    Timeline
                  </Grid>
                  <Grid item className={savedArtistStyle.P_personImg}>
                    <Avatar style={{ height: "60px", width: "60px" }}>
                      <Image src={picPerson} />
                    </Avatar>
                  </Grid>
                  <Grid item className={savedArtistStyle.P_contactCreated}>
                    <Grid container direction="column" spacing={2}>
                      <ContactCreatedList />
                      <ContactCreatedList />
                      <ContactCreatedList />
                      <ContactCreatedList />
                      <ContactCreatedList />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Info
            onArchiveArtistInCollection={handleArchiveArtistInCollection}
            onSaveArtistInCollection={handleSaveArtistInCollection}
          />
        </Grid>
      </Container>
    </Grid>
  );
}

export default withAuth(SavedArtist);
