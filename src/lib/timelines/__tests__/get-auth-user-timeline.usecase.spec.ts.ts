import { describe, expect, it } from "vitest";

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
          publishedAt: new Date("2024-01-01T00:00:00.000Z"),
        },
        {
          text: "Hello it's Alice",
          author: "Alice",
          publishedAt: new Date("2024-01-01T00:02:00.000Z"),
        },
      ],
    });
    // act (when)
    await whenRetrievingAuthUserTimeline();

    // assert (then)
    thenTheTimelineShouldBe({
      messages: [
        {
          text: "Hello it's Bob",
          author: "Bob",
          publishedAt: new Date("2024-01-01T00:00:00.000Z"),
        },
        {
          text: "Hello it's Alice",
          author: "Alice",
          publishedAt: new Date("2024-01-01T00:02:00.000Z"),
        },
      ],
    });
  });
});
