# jlcpcb-manufacturing-specs

Typed JLCPCB manufacturing tolerances and physical stackups for `tscircuit` and `circuit-json`.

This package exports reusable tolerance maps keyed by `PcbBoard` constraint
fields so board rules can be applied consistently in code.

The properties of JLCPCB are referenced from:
https://jlcpcb.com/capabilities/pcb-capabilities

## Install

Install directly from GitHub with Bun:

```bash
bun add github:tscircuit/jlcpcb-manufacturing-specs
```

## Exports

- `jlcMinTolerances`: minimum manufacturing tolerances
- `jlcPreferredTolerances`: more conservative preferred tolerances
- `JlcToleranceMap`: partial map of `PcbBoard` tolerance keys to numeric values
- `jlc04161h3313Stackup`: JLC04161H-3313 physical stackup (4 layers, nominal 1.6 mm, FR-4)
- `jlcStackups`: array of supported stackups
- `getJlcStackup`: look up a stackup by board construction; material defaults to `"fr4"`, unsupported constructions return `undefined`
- `JlcStackup`: stackup metadata and physical layers
- `JlcBoardConstruction`: `PcbBoard` construction fields (`num_layers`, `thickness`, `material`)

## Usage

```ts
import {
  jlcMinTolerances,
  jlcPreferredTolerances,
  type JlcToleranceMap,
} from "@tscircuit/jlcpcb-manufacturing-specs"

const boardRules: JlcToleranceMap = {
  ...jlcPreferredTolerances,
  min_trace_width: jlcMinTolerances.min_trace_width,
}
```

Use `jlcMinTolerances` when you need the manufacturing floor, and
`jlcPreferredTolerances` when you want safer defaults for new board designs.

```ts
import { getJlcStackup } from "@tscircuit/jlcpcb-manufacturing-specs"

const stackup = getJlcStackup({ num_layers: 4, thickness: 1.6 })
const layers = stackup?.layers // PcbStackupLayer[] ordered top to bottom, in mm
```

Only JLC04161H-3313 is currently supported. No soldermask/plating is specified.
