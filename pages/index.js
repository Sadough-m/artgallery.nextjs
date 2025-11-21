import React, { useState, useEffect, useContext, useRef } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

// mrx : cookie ↓
import Cookies from "js-cookie";

// mrx : styles ↓
import styles from "../styles/LandingPage.module.css";

// mrx : material ui ↓
import { Button, Grid, IconButton, TextField } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

// mrx : api links ↓
import { GET_USER_DETAIL } from "../pages/api/index";

// mrx : api ↓
import { PostUrl, GetUrl, GetAuthUrl } from "../pages/api/config";

// mrx : context ↓
import { Context } from "../context/index";

// mrx : Components ↓
import SignIn from "./auth/signin/index";
import Dashboard from "./dashboard";

// mrx : Landing page ↓

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (!Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n")) {
      router.push("/auth/signin");
    } else {
      router.push("/dashboard");
    }
  }, [])

  return (
    <>
      {!Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n") ? (
        <SignIn />
      ) : (
        <></>
      )}
    </>
  );
}
