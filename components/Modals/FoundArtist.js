import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { IconButton } from "@material-ui/core";

// components
import ArtistStyle from "../../styles/artist.module.css";
import pic from "../../public/images/guy.png";
import Image from "next/image";
import arrowRight from "../../public/images/icons/Arrow right blue.svg";
import test1 from "../../public/images/test1.png";
import test2 from "../../public/images/test2.png";
import test3 from "../../public/images/test3.png";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import g1 from '../../public/images/sample.png'

import { BASE_Image_Url, GET_MAIN_DASHBOARD_DATA } from "../../pages/api";

const theme = createTheme({
  props: {
    MuiButton: {
      disableElevation: true,
    },
  },
  palette: {
    primary: {
      main: "#3772FF",
    },
    secondary: {
      main: "#FED6CC",
    },
    error: {
      main: "#A6E9DE",
    },
  },
  typography: {
    button: {
      fontFamily: "Poppins",
      textTransform: "none",
    },
  },
  spacing: 4,
});
export default function ModalFoundArtist({
  id,
  firstName,
  lastName,
  setSearching,
  email,
  userArtworkImage,
  profileImage,
  setArtistList,
  Item = [],
}) {
  const router = useRouter();
  const [MoreImageNumber, setMoreImageNumber] = useState(0);

  const handleAddingArtist = () => {
    setArtistList([{
      firstName: firstName,
      id: id,
      lastName: lastName,
      displayImage: Item?.displayImage,
    }])
    setSearching(false);
    localStorage.setItem("Adding-Artist-email", email);
    localStorage.setItem("Adding-Artist-HaveEmail", true);
    localStorage.setItem("Adding-Search-UserID", Item?.userId);
    localStorage.setItem("Adding-Artist-firstName", firstName && firstName);
    localStorage.setItem("Adding-Artist-lastName", lastName && lastName);
    // router.push("/artist/add");
  }

  useEffect(() => {
    var all = userArtworkImage?.length > 4 ? userArtworkImage?.length : 0;
    if (all === 0) {
      var num = all - 0;
    } else {
      var num = all - 4 + 1;
    }
    setMoreImageNumber(num);
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Grid
        item
        className={ArtistStyle.BG_FindUser}
        onClick={() => handleAddingArtist()}
      >
        <Grid item className={ArtistStyle.cursor_p}>
          <Grid item>
            <Grid
              container
              className={ArtistStyle.Wrapper_avatar}
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={2} className={ArtistStyle.img_pos}>
                <img
                  src={BASE_Image_Url + Item?.displayImage || pic}
                  width="45px"
                  height="45px"
                  className={ArtistStyle.ImgAvatar}
                />
              </Grid>
              <Grid item xs={9}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item className={ArtistStyle.userName_modal}>
                    {firstName + " " + lastName}
                  </Grid>
                  <Grid item className={ArtistStyle.line}></Grid>
                  <Grid item className={ArtistStyle.userFeature_modal}>
                    Speciality
                  </Grid>
                  <Grid item xs={12} className={ArtistStyle.userModal_email}>
                    {email}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container className={ArtistStyle.ImagesModal} spacing={1}>
            {
              userArtworkImage?.length >= 1 && (
                <Grid container className={ArtistStyle.ImagesModal} spacing={1}>
                  {userArtworkImage.slice(0, 3)?.map((Item, index) => (
                    <Grid item key={index}>
                      <img src={BASE_Image_Url + Item} width={'65px'} height={'65px'} className={ArtistStyle.img_Modal} />
                    </Grid>
                  ))}
                  <Grid item className={ArtistStyle.pos_relative}>
                    <Image src={g1} width={'65px'} height={'65px'} className={`${ArtistStyle.img_Modal} ${ArtistStyle.Last_img_Modal}`} />
                    <span className={ArtistStyle.num_arts}>+{MoreImageNumber}</span>
                  </Grid>
                </Grid>
              )
            }
          </Grid>
        </Grid>
        <Grid className={ArtistStyle.ArrowRight}>
          <IconButton size="small" variant="text">
            <Image src={arrowRight} />
          </IconButton>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
