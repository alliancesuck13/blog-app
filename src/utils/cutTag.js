/* eslint-disable indent */
export default function cutTag(tag = "") {
  return tag
    ? `${tag
        .split("")
        .filter((char, index) => {
          return index <= 42 ? char : "";
        })
        .join("")}`
    : "";
}
