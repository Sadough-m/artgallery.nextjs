import React, { useEffect, useState } from "react";
import RGL, { WidthProvider,  } from "react-grid-layout";

import Image from "next/image";
import Link from "next/link";
import _ from "lodash";
import { toast } from "react-toastify";

// mrx : material ui ↓
import { Hidden, Button, Badge, Grid, IconButton } from "@material-ui/core";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

// mrx : styles ↓
import ArtWorkStyle from "../../../styles/artworkflow.module.css";

import ArtWorks from "../../Screens/ArtWork/ArtWorks";



const ReactGridLayout = WidthProvider(RGL);

export default class NoDraggingLayout extends React.PureComponent {
  localData =
    typeof window !== "undefined"
      ? localStorage.getItem("artWorkDetail") || false
      : false;

  constructor(props) {
    super(props);

    const layout = this.generateLayout();
    this.state = { layout };
  }

  static defaultProps = {
    className: "layout",
    isDraggable: false,
    isResizable: false,
    items: this?.props?.items,
    data: [],
    rowHeight: 102,
    cols: 12,
    onLayoutChange: function () { },
  };

  generateLayout() {
    const p = this.props;
    // const availableHandles = ["s", "w", "e", "n", "sw", "nw", "se", "ne"];
    return _.map(new Array(p.items), function (item, i) {
      var y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
      return {
        x: (i * 2) % 12,
        y: 2,
        w: 2,
        h: 2,
        i: i.toString(),
        // resizeHandles: _.shuffle(availableHandles).slice(0, _.random(1, availableHandles.length - 1))
      };
    });
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }

  render() {
    return (
      <>
        <ReactGridLayout
          layout={this.state.layout}
          onLayoutChange={this.onLayoutChange}
          {...this.props}
        >
          {/* {this.generateDOM(this.props.menuArtWork_Open)} */}
          {this.props.data.map((item, index) => {
            return (
              <div key={index}>
                <ArtWorks
                  item={item}
                  onClick={() => this.props.menuArtWork(item)} />
              </div>
            );
          })}
        </ReactGridLayout>
      </>
    );
  }
}

if (process.env.STATIC_EXAMPLES === true) {
  import("../../DragAndDrop/test-hook.jsx").then((fn) =>
    fn.default(NoDraggingLayout)
  );
}
