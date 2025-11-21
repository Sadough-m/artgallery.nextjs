import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// good man : material ui ↓
import { Grid, Hidden } from "@material-ui/core";
import EditionItem from "./EditionItem";

// good man : styles ↓
import ArtFlowStyle from "../../../../styles/artworkflow.module.css";
import useWindowSize from "../../../../Hooks/useWindowSize";

// good man : files ↓

// good man : components ↓

export default function MobileEdition({ SelectedID, Data, setTypeIDForShowen, TypeIDForShowen }) {
  // mrx : states ↓
  const [edtion, setEdtion] = useState("")

  // set which edition selected
  const handleEdition = (value) => {
    setEdtion(value);
  };

  const [width, height] = useWindowSize();
  
  useEffect(() => {
    setEdtion(SelectedID);
  }, [Data])

  return (
    <Hidden mdUp>
      <Grid item className={ArtFlowStyle.P_LimittedEdition_mobile}>
        <Grid item className={ArtFlowStyle.text_edition}>
          Editions
        </Grid>
        <Grid item className={ArtFlowStyle.p_edition}>
          <ul className={ArtFlowStyle.p_listEditionMobile} style={{ width: width - 30 }}>
            {
              Data?.map((item, index) => (
                <li className={ArtFlowStyle.listEditionMobile}>
                  <EditionItem
                    key={index}
                    Data={item}
                    setTypeIDForShowen={setTypeIDForShowen}
                    TypeIDForShowen={TypeIDForShowen}
                    name={item?.subType}
                    id_Ed={item?.id}
                    Type={item?.type}
                    handleEdition={handleEdition}
                    edtion={edtion}
                  />
                </li>
              ))
            }
          </ul>
        </Grid>
      </Grid>
    </Hidden>
  );
}
