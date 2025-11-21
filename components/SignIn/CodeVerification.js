import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// good man : material ui ↓
import { CircularProgress, Grid } from "@material-ui/core";

// good man : styles ↓
import signInStyle from "../../styles/signIn.module.css";

// good man : files ↓

// good man : components ↓

export default function CodeVerification({
  error = false,
  setCodeNumber,
  setError,
  childFunc
}) {
  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const inputRef4 = useRef();
  const inputRef5 = useRef();

  const [Input1, setInput1] = useState("");
  const [Input2, setInput2] = useState("");
  const [Input3, setInput3] = useState("");
  const [Input4, setInput4] = useState("");
  const [Input5, setInput5] = useState("");

  //final code number
  const calculateCode = (e) => {
    const code =
      String(Input1) + String(Input2) + String(Input3) + String(Input4) + e;
    setCodeNumber(code);
    setError(null);
  };

  let x = 0;
  var backSpace = false;

  //focus to next input
  const focusNext = (next, e, back) => {
    if(e.key === "Backspace"){
      backSpace = true;
      setTimeout(() => {
        backSpace = false;
      }, 50);
    }

    x++;
    if (e.key === "ArrowRight") {
      next.current.focus();
    } else if (e.key === "ArrowLeft") {
      back.current.focus();
    } else if (e.key === "Backspace" && x === 1) {
      setTimeout(() => {
        back.current.focus();
      }, 100);
    } else if (
      !(
        e.key === "0" ||
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9" ||
        e.key === "Backspace"
      )
    ) {
      setError("Verification code must be number (english)");
    }
  };
  

  // valid numbers
  const handleNumBers = (e) => {
    if (
      e.target.value === "1" ||
      e.target.value === "2" ||
      e.target.value === "3" ||
      e.target.value === "4" ||
      e.target.value === "5" ||
      e.target.value === "6" ||
      e.target.value === "7" ||
      e.target.value === "8" ||
      e.target.value === "9" ||
      e.target.value === "0" 
    ) {
      return true;
    } else return false;
  };

  // change values
  const handleInput1 = (e, next) => {
    if(e.target.value.length === 1 || backSpace ){
      setInput1(e.target.value);
    }
    else {
      inputRef2.current.focus();
      return;
    }
    if (handleNumBers(e)) {
      setError(null);
      next.current.focus();
    } else {
      e.target.value = "";
      if(!backSpace){
        setError("Verification code is a number");
      }
    }
    x = 0;
  };

  const handleInput2 = (e, next) => {
    x = 0;
    if(e.target.value.length === 1 || backSpace){
      setInput2(e.target.value);
    }
    else {
      inputRef3.current.focus();
      return;
    }
    if (handleNumBers(e)) {
      setError(null);
      next.current.focus();
    } else  {
      e.target.value = "";
      if(!backSpace){
        setError("Verification code is a number");
      }
    }
  };
  const handleInput3 = (e, next) => {
    x = 0;

    if(e.target.value.length === 1 || backSpace){
      setInput3(e.target.value);
    }
    else {
      inputRef4.current.focus();
      return;
    }
    if (handleNumBers(e)) {
      setError(null);
      next.current.focus();
    } else {
      e.target.value = "";
      if(!backSpace){
        setError("Verification code is a number");
      }
    }
  };
  const handleInput4 = (e, next) => {
    x = 0;

    if(e.target.value.length === 1 || backSpace){
      setInput4(e.target.value);
    }
    else {
      inputRef5.current.focus();
      return;
    }
    if (handleNumBers(e)) {
      setError(null);
      next.current.focus();
    } else {
      e.target.value = "";
      if(!backSpace){
        setError("Verification code is a number");
      }
    }
  };
  const handleInput5 = (e, next) => {
    x = 0;
    if(e.target.value.length === 1 || backSpace){
      setInput5(e.target.value);
    }
    if (handleNumBers(e)) {
      setError(null);
      next.current.blur();
      calculateCode(e.target.value);
    } else {
      e.target.value = "";
      if(!backSpace){
        setError("Verification code is a number");
      }
    }
  };
  useEffect(() => {
    inputRef1?.current.focus();
  }, []);

  useEffect(() => {
    childFunc?.current = ResetAll
  }, [])

  function ResetAll() {
    setInput1("")
    setInput2("")
    setInput3("")
    setInput4("")
    setInput5("")
    inputRef1.current.focus();
  }

  // change style input
  const styleHandler = () => {
    if (error) {
      return signInStyle.Verification_error;
    } else return signInStyle.input_verification;
  };
  return (
    <Grid item>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <input
                maxLength={1}
                className={styleHandler()}
                autoFocus
                type="number"
                value={Input1}
                onChange={(e) => handleInput1(e, inputRef2)}
                ref={inputRef1}
                onKeyDown={(e) => focusNext(inputRef2, e, inputRef1)}
                min="0"
                onClick={()=>{x=0}}
                onFocus={()=>setInput1("")}
              />
            </Grid>
            <Grid item>
              <input
                maxLength={1}
                className={styleHandler()}
                type="number"
                value={Input2}
                onChange={(e) => handleInput2(e, inputRef3)}
                ref={inputRef2}
                onKeyDown={(e) => focusNext(inputRef3, e, inputRef1)}
                min="0"
                onClick={()=>{x=0}}
                onFocus={()=>setInput2("")}
              />
            </Grid>
            <Grid item>
              <input
                maxLength={1}
                className={styleHandler()}
                type="number"
                value={Input3}
                onChange={(e) => handleInput3(e, inputRef4)}
                ref={inputRef3}
                onKeyDown={(e) => focusNext(inputRef4, e, inputRef2)}
                min="0"
                onClick={()=>{x=0}}
                onFocus={()=>setInput3("")}
              />
            </Grid>
            <Grid item>
              <input
                maxLength={1}
                className={styleHandler()}
                type="number"
                value={Input4}
                onChange={(e) => handleInput4(e, inputRef5)}
                ref={inputRef4}
                onKeyDown={(e) => focusNext(inputRef5, e, inputRef3)}
                min="0"
                onClick={()=>{x=0}}
                onFocus={()=>setInput4("")}
              />
            </Grid>
            <Grid item>
              <input
                maxLength={1}
                className={styleHandler()}
                type="number"
                value={Input5}
                onChange={(e) => handleInput5(e, inputRef5)}
                ref={inputRef5}
                onKeyDown={(e) => focusNext(inputRef5, e, inputRef4)}
                min="0"
                onClick={()=>{x=0}}
                onFocus={()=>setInput5("")}
              />
            </Grid>
          </Grid>
        </Grid>
        {error && (
          <Grid item className={signInStyle.errorText}>
            {error}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
//onKeyUp={(e) => calculateCode(e)}
