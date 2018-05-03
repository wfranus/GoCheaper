export function setProductProp(key, value) {
  return {
    type: "SETPRODUCT",
    key,
    value
  }
}
