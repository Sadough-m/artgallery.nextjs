import React, { useState, useEffect, useContext } from "react";
import { useRouter } from 'next/router';

// mrx : GET FILES
import UniqueGet from './unique';
import LimitedGet from './limited';
import ReproductionGet from './reproduction';

// mrx : setCookies with this
import Cookies from "js-cookie";

export default function CreatArtwork() {
  const router = useRouter();

  // States Start -----------------------------------------------------------------------------------------------------
  const [ClassificationID, setClassificationID] = useState(0);
  //  End -------------------------------------------------------------------------------------------------------------

  //  mrx : setting the classification id Start ------------------------------------------------------------------------
  useEffect(() => {
    setClassificationID(parseInt(Cookies.get("Selected-item-artwork-type")))
    localStorage.setItem("Adding-Art-Work", JSON.stringify({ SelectedClassificationID: parseInt(Cookies.get("Selected-item-artwork-type")) }))
  }, [router]);
  //  End -------------------------------------------------------------------------------------------------------------

  // mrx : return currect item we need Start  -------------------------------------------------------------------------
  if (ClassificationID === 0) {
    return (
      <UniqueGet />
    );
  } else if (ClassificationID === 1) {
    return (
      <LimitedGet />
    )
  } else if (ClassificationID === 2) {
    return (
      <ReproductionGet />
    )
  } else {
    return (
      <></>
    )
  }
  //  End -------------------------------------------------------------------------------------------------------------
}
