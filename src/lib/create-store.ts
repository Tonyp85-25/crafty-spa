import { ThunkDispatch, UnknownAction, configureStore } from "@reduxjs/toolkit";
import { AuthGateway } from "./auth/model/auth.gateway";
import { TimelineGateway } from "./timelines/model/timeline.gateway";
import { timelinesSlice } from "./timelines/slices/timelines.slice";

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
