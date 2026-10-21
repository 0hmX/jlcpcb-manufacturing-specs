import type { PcbBoard, PcbStackupLayer } from "circuit-json"

export interface JlcStackup {
  /** JLCPCB stackup code, e.g. "JLC04161H-3313" */
  name: string
  num_layers: number
  /** nominal finished board thickness, mm */
  thickness: number
  material: "fr4"
  /** physical layers top to bottom, thicknesses in mm */
  layers: PcbStackupLayer[]
}

// Sources:
// https://raw.githubusercontent.com/tscircuit/am3352-sbc/837245bceb6ac898fd5451507d6b2b8024095fe7/design/fabrication-stackup.json
// https://jlcpcb.com/impedance
// No soldermask/plating is specified.
export const jlc04161h3313Stackup: JlcStackup = {
  name: "JLC04161H-3313",
  num_layers: 4,
  thickness: 1.6,
  material: "fr4",
  layers: [
    {
      layer_type: "copper",
      layer: "top",
      thickness: 0.035,
      electrical_conductivity_s_per_m: 5.8e7,
    },
    {
      layer_type: "dielectric",
      dielectric_type: "prepreg",
      material_name: "3313 RC57%",
      thickness: 0.0994,
      relative_permittivity: 4.1,
    },
    {
      layer_type: "copper",
      layer: "inner1",
      thickness: 0.0152,
      electrical_conductivity_s_per_m: 5.8e7,
    },
    {
      layer_type: "dielectric",
      dielectric_type: "core",
      material_name: "NP-155F core",
      thickness: 1.265,
      relative_permittivity: 4.42,
    },
    {
      layer_type: "copper",
      layer: "inner2",
      thickness: 0.0152,
      electrical_conductivity_s_per_m: 5.8e7,
    },
    {
      layer_type: "dielectric",
      dielectric_type: "prepreg",
      material_name: "3313 RC57%",
      thickness: 0.0994,
      relative_permittivity: 4.1,
    },
    {
      layer_type: "copper",
      layer: "bottom",
      thickness: 0.035,
      electrical_conductivity_s_per_m: 5.8e7,
    },
  ],
}

export const jlcStackups: JlcStackup[] = [jlc04161h3313Stackup]

export type JlcBoardConstruction = Pick<
  PcbBoard,
  "num_layers" | "thickness" | "material"
>

// PcbBoard's parsed output requires material, but callers may omit it here.
type JlcBoardConstructionInput = Omit<JlcBoardConstruction, "material"> & {
  material?: JlcBoardConstruction["material"]
}

/** Returns the JLCPCB stackup matching the construction; material defaults to "fr4". Undefined when unsupported. */
export function getJlcStackup(
  construction: JlcBoardConstruction,
): JlcStackup | undefined
export function getJlcStackup(
  construction: JlcBoardConstructionInput,
): JlcStackup | undefined
export function getJlcStackup(
  construction: JlcBoardConstructionInput,
): JlcStackup | undefined {
  return jlcStackups.find(
    (stackup) =>
      stackup.num_layers === construction.num_layers &&
      stackup.thickness === construction.thickness &&
      stackup.material === (construction.material ?? "fr4"),
  )
}
