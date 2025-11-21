import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// good man : material ui ↓
import {
  Button,
  Grid,
} from '@material-ui/core';

// mrx : setCookies with this
import Cookies from "js-cookie";

// good man : styles ↓
import ArtWorkFlowStyle from "../../../../styles/artworkflow.module.css";

// mrx : context ↓
import { Context } from "../../../../context/index";
import useWindowSize from '../../../../Hooks/useWindowSize';

// good man : files ↓

// good man : components ↓

export default function ButtonsList({
  sameMedia,
  SingleFileModal = false,
  status,
  handleSelectItem,
  selectButton,
  allSameImages
}) {
  // good man : states ↓
  const GET_ADDED_DATA = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("ArtWork-Editions") || '[]' : '[]');

  // mrx : context
  const { ShowenReproduction, setShowenReproduction } = useContext(Context);

  const [width, height] = useWindowSize()
  return (
    <div
      style={{
        marginTop: "45px"
      }}
    >

      <div className='p_test' >
        {
          status === "LimitedEdition" ? (
            <>
              <div
                className="test"
              >
                <Button
                  className={`${ArtWorkFlowStyle.button_select1} ${parseInt(Cookies.get("Limited-ID")) !== 0
                    ? ArtWorkFlowStyle.button_deSelect
                    : ""
                    }`}
                  variant={
                    parseInt(Cookies.get("Limited-ID")) === 0 || sameMedia === true
                      ? "contained"
                      : "outlined"
                  }
                  color={
                    parseInt(Cookies.get("Limited-ID")) === 0 || sameMedia === true
                      ? "secondary"
                      : "default"
                  }
                >
                  Limited edition
                </Button>
              </div>
              {
                GET_ADDED_DATA?.map((item, index) => (
                  <div onClick={() => parseInt(Cookies.get("Limited-ID")) !== 0 && handleSelectItem(item?.editionNumber)} className="test">
                    <Button
                      className={`${ArtWorkFlowStyle.button_select} ${parseInt(Cookies.get("Limited-ID")) === item?.editionNumber ?
                        ArtWorkFlowStyle.button_deSelect
                        :
                        parseInt(Cookies.get("Limited-ID")) !== item?.editionNumber
                          ?
                          ArtWorkFlowStyle.button_deSelect
                          : ""} 
                          ${allSameImages
                          ?
                          ArtWorkFlowStyle.ButtonDeActive
                          :
                          ""
                        }`}
                      variant={parseInt(Cookies.get("Limited-ID")) === item?.editionNumber ? allSameImages ? "secondary" : "contained" : "text"}
                      color={parseInt(Cookies.get("Limited-ID")) === item?.editionNumber ? "secondary" : "default"}
                      disabled={SingleFileModal === true ? parseInt(Cookies.get("Limited-ID")) === 0 ? true : false : allSameImages}
                    >
                      {item?.editionNumber}
                    </Button>
                  </div>
                ))
              }
            </>
          ) : (
            <>
              {
                !ShowenReproduction === true && (
                  <div
                    className="test"
                    onClick={() => handleSelectItem(0)}
                  >
                    <Button
                      className={`${ArtWorkFlowStyle.button_select1} ${parseInt(Cookies.get("Limited-ID")) !== 0
                        ? ArtWorkFlowStyle.button_deSelect
                        : ""
                        }`}
                      variant={
                        parseInt(Cookies.get("Limited-ID")) === 0
                          ? "contained"
                          : "outlined"
                      }
                      color={
                        parseInt(Cookies.get("Limited-ID")) === 0
                          ? "secondary"
                          : "default"
                      }
                    >
                      Original
                    </Button>
                  </div>
                )
              }

              <div
                className="test"
              >
                <Button
                  onClick={() => handleSelectItem(1)}
                  disabled={allSameImages}
                  className={`${ArtWorkFlowStyle.button_select1} ${parseInt(Cookies.get("Limited-ID")) !== 1
                    ? ArtWorkFlowStyle.button_deSelect
                    : ""
                    }`}
                  variant={
                    parseInt(Cookies.get("Limited-ID")) === 1
                      ? "contained"
                      : "outlined"
                  }
                  color={
                    parseInt(Cookies.get("Limited-ID")) === 1
                      ? "secondary"
                      : "default"
                  }
                >
                  Reproduction
                </Button>
              </div>
            </>
          )

        }


      </div>
    </div >
  )
}