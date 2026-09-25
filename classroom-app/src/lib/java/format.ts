/* How Java writes numbers as text. The checker needs it to fold constants
   ("Score: " + 2.0 is the constant "Score: 2.0") and the runtime needs it for
   every println, so it lives in one place.

   Java prints the SHORTEST digits that read back as the same number - the
   same digits JavaScript picks - but lays them out its own way: 100.0 not
   100, 1.0E7 not 10000000, 1.0E-4 not 0.0001.
*/

function layout(negative: boolean, digits: string, exponent: number): string {
  // digits "12345", exponent 2 means 1.2345 x 10^2 = 123.45
  const sign = negative ? "-" : "";
  if (exponent >= -3 && exponent < 7) {
    if (exponent >= 0) {
      const whole = digits.slice(0, exponent + 1).padEnd(exponent + 1, "0");
      const fraction = digits.slice(exponent + 1) || "0";
      return `${sign}${whole}.${fraction}`;
    }
    return `${sign}0.${"0".repeat(-exponent - 1)}${digits}`;
  }
  const fraction = digits.slice(1) || "0";
  return `${sign}${digits[0]}.${fraction}E${exponent}`;
}

function split(exponential: string): { digits: string; exponent: number } {
  const [mantissa, exponentText] = exponential.split("e");
  return { digits: mantissa.replace(".", "").replace("-", ""), exponent: Number(exponentText) };
}

/** Double.toString */
export function javaDoubleToString(value: number): string {
  if (Number.isNaN(value)) return "NaN";
  if (value === Infinity) return "Infinity";
  if (value === -Infinity) return "-Infinity";
  if (value === 0) return Object.is(value, -0) ? "-0.0" : "0.0";
  const { digits, exponent } = split(Math.abs(value).toExponential());
  return layout(value < 0, digits, exponent);
}

/** The shortest digits that still read back as this float, as toExponential would give them. */
export function shortestFloatExponential(value: number): string {
  const magnitude = Math.abs(value);
  for (let precision = 1; precision <= 9; precision++) {
    const text = magnitude.toExponential(precision - 1);
    if (Math.fround(Number(text)) === magnitude) return text;
  }
  return magnitude.toExponential(8);
}

/** Float.toString */
export function javaFloatToString(value: number): string {
  if (Number.isNaN(value)) return "NaN";
  if (value === Infinity) return "Infinity";
  if (value === -Infinity) return "-Infinity";
  if (value === 0) return Object.is(value, -0) ? "-0.0" : "0.0";
  const { digits, exponent } = split(shortestFloatExponential(value));
  return layout(value < 0, digits, exponent);
}

export function javaCharToString(code: number): string {
  return String.fromCharCode(code);
}
