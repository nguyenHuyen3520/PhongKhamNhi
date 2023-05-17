import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  accessToken: null,
  loading: false,
  profile: null,
  bills: [],
  notifications: [],
  patients: [],
  patientDetail: null,
  doctors: null,
  services: null,
  selectedDoctor: null,
  selectedService: null,
  selectedCalendar: null,
  selectedTime: null,
  bookings: []
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    saveToken: (state, action) => {
      state.accessToken = action.payload
    },
    changeLoading: (state, action) => {
      state.loading = action.payload;
    },
    removeToken: (state) => {
      state.accessToken = null;
      state.patients = null;
      state.notifications = null;
    },
    saveProfile: (state, action) => {
      state.profile = action.payload;
    },
    saveBills: (state, action) => {
      state.bills = action.payload;
    },
    saveBookings: (state, action) => {
      state.bookings = action.payload;
    },
    saveNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    savePatients: (state, action) => {
      state.patients = action.payload;
    },
    savePatientDetail: (state, action) => {
      state.patientDetail = action.payload;
    },
    saveDoctors: (state, action) => {
      state.doctors = action.payload;
    },
    saveServices: (state, action) => {
      state.services = action.payload;
    },
    saveSelectedDoctor: (state, action) => {
      state.selectedDoctor = action.payload;
    },
    saveSelectedService: (state, action) => {
      state.selectedService = action.payload;
    },
    saveSelectedCalendar: (state, action) => {
      state.selectedCalendar = action.payload;
    },
    saveSelectedCalendar: (state, action) => {
      state.selectedCalendar = action.payload;
    },
    saveSelectedTime: (state, action) => {
      state.selectedTime = action.payload;
    },
    resetBooking:(state)=>{
      state.selectedDoctor = null;
      state.selectedService = null;
      state.selectedCalendar = null;
      state.selectedTime = null;
    }
  },
})

// Action creators are generated for each case reducer function
export const { saveBookings, resetBooking, saveSelectedTime,saveSelectedCalendar, saveSelectedService, saveSelectedDoctor, saveDoctors,saveServices,  savePatientDetail, saveToken, changeLoading, removeToken, saveProfile,savePatients, saveNotifications, saveBills  } = appSlice.actions

export default appSlice.reducer