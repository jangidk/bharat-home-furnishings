import { describe, expect, it } from "vitest";
import { shippingFor } from "@/lib/cart";
describe("shipping", () => {
  it("is free from ₹2,999", () => expect(shippingFor(2999)).toBe(0));
  it("is ₹149 below ₹2,999", () => expect(shippingFor(2998)).toBe(149));
});
