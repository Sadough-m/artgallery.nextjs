import React from "react";
import Button from "@material-ui/core/Button";
import Image from "next/image";
import { CircularProgress } from "@material-ui/core";

import Style from "../../styles/Home.module.css";
import { signIn } from "../../styles/signIn.module.css";

export default function SignInBTN({
  text,
  variants = "default",
  styleBtn,
  color,
  Img,
  margin,
  onClick,
  loading,
  disabled
}) {
  return (
    <Button
      color={color}
      variant={variants}
      className={`${styleBtn}  ${Style.text__trs__none} ${
        margin ? signIn.some__Margin : null
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {Img ? <Image src={Img} className={signIn.google__icon} /> : <></>}{" "}
      {Img ? <span>&nbsp; &nbsp;</span> : <></>}
      {loading && <CircularProgress color="white" size={20} />}
      {!loading && text}
    </Button>
  );
}
