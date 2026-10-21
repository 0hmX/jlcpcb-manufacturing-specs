import { expect, test } from "bun:test"
import { getJlcStackup, jlc04161h3313Stackup } from "../index"

test("matches the supported construction", () => {
  const stackup = getJlcStackup({ num_layers: 4, thickness: 1.6 })
  expect(stackup).toBe(jlc04161h3313Stackup)
  expect(
    getJlcStackup({ num_layers: 4, thickness: 1.6, material: "fr4" }),
  ).toBe(jlc04161h3313Stackup)
})

test("returns undefined for unsupported constructions", () => {
  expect(getJlcStackup({ num_layers: 2, thickness: 1.6 })).toBeUndefined()
  expect(getJlcStackup({ num_layers: 4, thickness: 1.2 })).toBeUndefined()
  expect(
    getJlcStackup({ num_layers: 4, thickness: 1.6, material: "flex" }),
  ).toBeUndefined()
})
