import { createAsyncThunk } from "@reduxjs/toolkit";
import { fakeTimelineGateway } from "../infra/fake.timeline.gateway";

export const getAuthUserTimeline = createAsyncThunk(
  "timelines/getAuthUserTimeline",
  async () => {
    const { timeline } = await fakeTimelineGateway.getUserTimeline({
      userId: "Alice",
    });
    return timeline;
  }
);
