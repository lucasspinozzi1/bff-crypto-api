// eslint-disable-next-line no-shadow
export enum DoctorSearchType {
  general = 1,
  speciality = 2,
  location = 3,
  name = 4,
}

// eslint-disable-next-line no-shadow
export enum DoctorSearchMode {
  virtual = 1,
  presential = 2,
}

// eslint-disable-next-line no-shadow
export enum DoctorSearchAppt {
  next = 1,
  weekend = 2,
  weekMorning = 3,
  weekLate = 4,
  exactDate = 5,
}

// eslint-disable-next-line no-shadow
export enum DoctorSearchOrder {
  distance = 1,
  priceHighLow = 2,
  priceLowHigh = 3,
  available = 4,
  alphabetically = 5,
}
