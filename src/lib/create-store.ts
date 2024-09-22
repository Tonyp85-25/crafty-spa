import { configureStore, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { timelinesSlice } from "./timelines/slices/timelines.slice";
import { TimelineGateway } from "./timelines/model/timeline.gateway";
import { AuthGateway } from "./auth/model/auth.gateway";

export type Dependencies = {
  timelineGateway: TimelineGateway;
  authGateway: AuthGateway;
};

const rootReducer = timelinesSlice.reducer;
export const createstore = (dependencies: Dependencies) =>
  configureStore({
    reducer: timelinesSlice.reducer,
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware({
        thunk: {
          extraArgument: dependencies,
        },
      });
    },
  });

export type AppStore = ReturnType<typeof createstore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, Dependencies, UnknownAction>;
