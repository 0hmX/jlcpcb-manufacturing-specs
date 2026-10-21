import { expect, test } from "bun:test"
import { getJlcStackup } from "../index"

test("returns undefined for unsupported constructions", () => {
  expect(getJlcStackup({ num_layers: 2, thickness: 1.6 })).toBeUndefined()
  expect(getJlcStackup({ num_layers: 4, thickness: 1.2 })).toBeUndefined()
  expect(
    getJlcStackup({ num_layers: 4, thickness: 1.6, material: "flex" }),
  ).toBeUndefined()
})
