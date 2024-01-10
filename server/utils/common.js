"use strict";

const util = {};

util.isEmpty = (val) => {
  if (
    val === "" ||
    val === null ||
    val === undefined ||
    (val !== null && typeof val === "object" && !Object.keys(val).length)
  ) {
    return true;
  } else {
    return false;
  }
};

module.exports = util;
