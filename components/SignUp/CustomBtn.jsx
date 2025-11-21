import React from "react";
import Button from "@material-ui/core/Button";
import Style from "../../styles/Home.module.css";
import { signIn } from "../../styles/signIn.module.css";
import { CircularProgress } from "@material-ui/core";
import Image from "next/image";

export default function SignInBTN({
  text,
  variants,
  styleBtn,
  color,
  Img,
  margin,
  onClick,
  loading,
  disabled,
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
      {loading && <CircularProgress color="white" size={24} />}
      {!loading && text}
    </Button>
  );
}
