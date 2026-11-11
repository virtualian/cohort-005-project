import { describe, expect, it } from "vitest";
import { z } from "zod";
import { parseFormData, parseJsonBody } from "./validation";

const schema = z
  .object({
    title: z.string().min(3, "Title is too short").max(5, "Title is too long"),
    price: z.coerce.number().min(1, "Price must be at least 1"),
    address: z
      .object({ city: z.string().min(1, "City is required") })
      .optional(),
  })
  .refine((value) => value.title !== "bad", "Form-level error");

function form(entries: Record<string, string>): FormData {
  const formData = new FormData();
  for (const [key, value] of Object.entries(entries)) {
    formData.set(key, value);
  }
  return formData;
}

describe("parseFormData", () => {
  it("returns the parsed data on success", () => {
    expect(parseFormData(form({ title: "abcd", price: "2" }), schema)).toEqual({
      success: true,
      data: { title: "abcd", price: 2 },
    });
  });

  it("returns the first message for each failing field", () => {
    expect(parseFormData(form({ title: "a", price: "0" }), schema)).toEqual({
      success: false,
      errors: {
        title: "Title is too short",
        price: "Price must be at least 1",
      },
    });
  });

  it("leaves form-level errors out of the field map", () => {
    expect(parseFormData(form({ title: "bad", price: "2" }), schema)).toEqual({
      success: false,
      errors: {},
    });
  });
});

describe("parseJsonBody", () => {
  it("keys nested errors by their top-level field", async () => {
    const request = new Request("http://test", {
      method: "POST",
      body: JSON.stringify({ title: "abcd", price: 2, address: { city: "" } }),
    });
    expect(await parseJsonBody(request, schema)).toEqual({
      success: false,
      errors: { address: "City is required" },
    });
  });
});
