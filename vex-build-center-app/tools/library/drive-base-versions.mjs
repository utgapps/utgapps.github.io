// One drive base design at every ratio it offers, each version verified, and proof that changing
// the ratio changes nothing but the gears: the same parts in the same places, so a builder swaps
// gears on the same axles. (A gear's model is centred a fraction of a millimetre off its bore,
// differently for each size, so gears may sit up to 0.5 mm apart between versions.)
import { verify } from "./verify.mjs";
import { modularDriveBase } from "./families/drive-base-modular.mjs";

export function verifiedVersions(design) {
  const versions = design.ratios.map((motorTeeth) => {
    const made = modularDriveBase({ ...design, motorTeeth });
    const problems = verify(made.saved, made.expect);
    if (problems.length) throw new Error(`${design.key} with a ${motorTeeth}T motor gear:\n  ${problems.join("\n  ")}`);
    return { motorTeeth, made };
  });
  const [first] = versions;
  for (const { motorTeeth, made } of versions.slice(1)) {
    if (made.saved.length !== first.made.saved.length) throw new Error(`${design.key}: the ${motorTeeth}T version has a different number of parts`);
    made.saved.forEach((part, index) => {
      const other = first.made.saved[index];
      const bothGears = part.id.startsWith("gear-") && other.id.startsWith("gear-");
      if ((part.id !== other.id && !bothGears) || part.p.some((value, axis) => Math.abs(value - other.p[axis]) > (bothGears ? 0.5 : 0.01)))
        throw new Error(`${design.key}: part ${index} (${part.id}) moves when the ratio changes`);
    });
  }
  return versions;
}
