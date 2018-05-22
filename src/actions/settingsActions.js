export function setOption(key, value) {
  return {
    type: "SET_OPTION",
    key,
    value
  }
}

export function setAllegroSortOption(key, value) {
  return {
    type: "SET_ALLEGRO_SORT_OPTION",
    key,
    value
  }
}

export function setAllegroFilterOption(key, value) {
  return {
    type: "SET_ALLEGRO_FILTER_OPTION",
    key,
    value
  }
}

export function resetToDefaults() {
  return {
    type: "RESET_TO_DEFAULTS"
  }
}
