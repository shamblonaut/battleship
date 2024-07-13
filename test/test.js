import { describe, expect, test } from "@jest/globals";

function f(x) {
  return Math.pow(x, 4);
}

describe("Unit", () => {
  test("Test description", () => {
    expect(f(4)).toBe(256);
  });
});
