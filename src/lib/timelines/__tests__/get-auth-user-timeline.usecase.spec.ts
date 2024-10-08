import { FakeAuthGateway } from "@/lib/auth/infra/fake-auth.gateway";
import { createstore } from "@/lib/create-store";
import { describe, expect, it } from "vitest";
import { FakeTimelineGateway } from "../infra/fake.timeline.gateway";
import { getAuthUserTimeline } from "../usecases/get-auth-user-timeline.usecase";

describe("Feature: Retrieving authenticated user's timeline", () => {
  it("Example: Alice is authenticated an can see her timeline", async () => {
    // arrange (given)
    givenAuthenticatedUserId("Alice");
    givenExistingTimeline({
      user: "Alice",
      messages: [
        {
          text: "Hello it's Bob",
          author: "Bob",
          publishedAt: "2024-01-01T00:00:00.000Z",
        },
        {
          text: "Hello it's Alice",
          author: "Alice",
          publishedAt: "2024-01-01T00:02:00.000Z",
        },
      ],
    });
    // act (when)
    await whenRetrievingAuthUserTimeline();

    // assert (then)
    thenTheTimelineShouldBe({
      user: "Alice",
      messages: [
        {
          text: "Hello it's Bob",
          author: "Bob",
          publishedAt: "2024-01-01T00:00:00.000Z",
        },
        {
          text: "Hello it's Alice",
          author: "Alice",
          publishedAt: "2024-01-01T00:02:00.000Z",
        },
      ],
    });
  });
});
const fakeTimelineGateway = new FakeTimelineGateway();
const authGateway = new FakeAuthGateway();
const store = createstore({
  timelineGateway: fakeTimelineGateway,
  authGateway,
});
function givenAuthenticatedUserId(user: string) {
  authGateway.authUser = user;
}

function givenExistingTimeline(timeline: {
  user: string;
  messages: { text: string; author: string; publishedAt: string }[];
}) {
  fakeTimelineGateway.timelinesByUser.set("Alice", timeline);
}

async function whenRetrievingAuthUserTimeline() {
  await store.dispatch(getAuthUserTimeline());
}

function thenTheTimelineShouldBe(expectedTimeline: {
  user: string;
  messages: { text: string; author: string; publishedAt: string }[];
}) {
  const authUserTimeline = store.getState();
  expect(authUserTimeline).toEqual(expectedTimeline);
}
