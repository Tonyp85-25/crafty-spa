import { configureStore } from "@reduxjs/toolkit";
import { timelinesSlice } from "./timelines/slices/timelines.slice";

export const store = configureStore({
  reducer: timelinesSlice.reducer,
  // middleware(getDefaultMiddleware) {
  //   return getDefaultMiddleware({
  //    thunk: {
  //      extraArgument: {
  //        timelineGateway: {
  //    }
  // }
});
