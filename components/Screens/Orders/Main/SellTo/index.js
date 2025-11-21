import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Joi from "joi";
import { toast } from "react-toastify";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";
import { ClickAwayListener } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../../styles/Orders.module.css";

// gm : files ↓
import LoadinfSvg from '../../../../../public/images/icons/Loading.svg'

// gm : components ↓
import InputForm from "../../../../Forms/InputForm";
import TypingArtistFound from "./Found";
import NotFound from "./NotFound";
import Add from "./Add";

// mrx : setCookies with this
import Cookies from "js-cookie";

// mrx : api links ↓
import { SEARCH_CONTACT_DARFT_ORDER, ADD_CUSTOMER_TO_ORDER } from "../../../../../pages/api/index";

// mrx : api ↓
import {
  PostUrl,
  PostAuthUrl,
  GetUrl,
  GetAuthUrl,
} from "../../../../../pages/api/config";

// mrx : context ↓
import { Context } from "../../../../../context/index";

export default function SellTo({
  AddedArtistList,
  setAddedArtistList,
  handleAddOrder,
  AllData
}) {
  // mrx : context
  const {
    LoadingPage,
    setLoadingPage
  } = useContext(Context);

  // gm : states ↓
  const [FocusInput, setFocusInput] = useState(false);
  const [SearchInput, setSearchInput] = useState("");
  const [timer, setTimer] = useState(null);
  const [typing, settyping] = useState(false);
  const [ResultNotFound, setResultNotFound] = useState(false);
  const [ShowHandle, setShowHandle] = useState(false);
  const [SearchResult, setSearchResult] = useState([]);

  // mrx: if input was changing ( search input ) Start -------------------------------------------
  const inputChanged = () => {
    settyping(true);
    clearTimeout(timer)
    const newTimer = setTimeout(() => {
      handleSearch();
      settyping(false);
    }, 500)
    setTimer(newTimer)
  }
  // mrx : End ------------------------------------------------------------------------------------ 

  // mrx : calling the change input function if was not empty Start ------------------------------ 
  useEffect(() => {
    if (SearchInput !== "") {
      inputChanged();
    }
  }, [SearchInput])
  // mrx : End ------------------------------------------------------------------------------------ 

  const handleApi = (
    ST = "add",
    Data = ""
  ) => {
    GetAuthUrl(ADD_CUSTOMER_TO_ORDER(AllData?.id, ST === "add" ? Data?.userId : null)).then(
      (res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            // settyping(false);
            handleAddOrder(res?.data?.data);
          } else {
            // settyping(false);
          }
        } else {
          // settyping(false);
          toast.error("something went wrong !");
        }
      }
    );
  }

  // mrx: adding artist in an array Start ---------------------------------------------------------
  const handleAddArtist = (Item) => {
    setSearchInput("");
    setShowHandle(false);
    settyping(true);
    handleApi("add", Item)
    setSearchResult([]);
  }
  // mrx : End ------------------------------------------------------------------------------------

  // mrx L close items and empty the search input Start -------------------------------------------
  useEffect(() => {
    if (FocusInput === false) {
      setSearchInput("");
      setSearchResult([])
    }
  }, [FocusInput])
  // mrx : End ------------------------------------------------------------------------------------

  // mrx : remove added artist Start --------------------------------------------------------------
  const handleRemove = () => {
    setSearchInput("");
    settyping(true);
    setSearchResult([]);
    handleApi("remove")
  }
  // mrx : End ------------------------------------------------------------------------------------

  // mrx : search in list of artist api Start -----------------------------------------------------
  const handleSearch = () => {
    setShowHandle(true);
    GetAuthUrl(SEARCH_CONTACT_DARFT_ORDER(SearchInput)).then(
      (res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            if (res.data.data?.length) {
              setSearchResult(res.data.data);
              setResultNotFound(false);
            } else {
              setSearchResult([]);
              setResultNotFound(true);
            }
          } else {
            setSearchResult([]);
            setResultNotFound(true);
          }
        } else {
          setResultNotFound(true);
          toast.error("something went wrong !");
        }
      }
    );
  }
  // mrx : End ------------------------------------------------------------------------------------

  return (
    <Grid item className={Style.Main_1}>
      <Grid item className={Style.TitleMain}>
        Sell to
      </Grid>
      <ClickAwayListener onClickAway={() => setFocusInput(false)}>
        <Grid item className="posRel" onClick={() => setFocusInput(true)}>
          <InputForm
            type="text"
            label="Sell to"
            placeHolder="Enter seller name"
            schema={Joi.optional()}
            setValue={setSearchInput}
            value={SearchInput}
          >
            {
              typing === true && (
                <Grid item className={Style.imageInsideForm}>
                  <img src={LoadinfSvg.src} className={Style.LoadingSvg} />
                </Grid>
              )
            }
          </InputForm>

          {/* mrx : no result section */}
          {FocusInput && ResultNotFound === true && SearchInput !== "" && ShowHandle === true && (
            <Grid item xs={12} className={Style.bg_userFinder}>
              <Grid className={Style.MaiItemInModal_New}>
                <NotFound />
              </Grid>
            </Grid>
          )}

          {/* mrx : search result list  */}
          {FocusInput && ResultNotFound === false && SearchResult?.length >= 1 && ShowHandle === true && (
            <Grid item xs={12} className={Style.bg_userFinder}>
              {SearchResult?.map((Item, index) => (
                <Grid key={index} className={Style.MaiItemInModal_New}>
                  <TypingArtistFound
                    Item={Item}
                    handleAddArtist={handleAddArtist}
                    AddedArtistList={AddedArtistList}
                    setAddedArtistList={setAddedArtistList}
                  />
                </Grid>
              ))}
            </Grid>
          )}

          {/* mrx : added artist List */}
          {AddedArtistList?.map((Item, index) => (
            <Add
              key={index}
              locked={false}
              handleRemove={handleRemove}
              Item={Item}
            />
          ))}
        </Grid>
      </ClickAwayListener>
    </Grid>
  );
}
