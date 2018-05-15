export function setProductProp(key, value) {
  return {
    type: "SETPRODUCT",
    key,
    value
  }
}

export function resetProduct() {
  return {
    type: "RESETPRODUCT"
  }
}
