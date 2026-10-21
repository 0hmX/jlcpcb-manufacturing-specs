import type { PcbBoard, PcbStackupLayer } from "circuit-json"

export interface JlcStackup {
  name: string
  num_layers: number
  thickness: number
  material: "fr4"
  layers: PcbStackupLayer[]
}

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

export interface JlcBoardConstruction {
  num_layers: number
  thickness: number
  material?: PcbBoard["material"]
}

export function getJlcStackup({
  num_layers,
  thickness,
  material = "fr4",
}: JlcBoardConstruction): JlcStackup | undefined {
  return jlcStackups.find(
    (stackup) =>
      stackup.num_layers === num_layers &&
      stackup.thickness === thickness &&
      stackup.material === material,
  )
}
