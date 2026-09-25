// Every value comes from a variable, so the compiler cannot fold it: this is
// the runtime's arithmetic, not the checker's constant folding.
public class Main {
    public static void main(String[] args) {
        int a = -7, b = 2;
        System.out.println(a / b + " " + a % b + " " + Math.floorDiv(a, b) + " " + Math.floorMod(a, b));
        int big = Integer.MAX_VALUE, million = 100000, smallest = Integer.MIN_VALUE, minusOne = -1;
        System.out.println((big + 1) + " " + (big * 2) + " " + (million * million) + " " + (smallest / minusOne) + " " + (smallest % minusOne) + " " + Math.abs(smallest));
        long longA = -7L, longB = 2L, longBig = Long.MAX_VALUE;
        System.out.println(longA / longB + " " + longA % longB + " " + (longBig + 1));
        int negative = -16, shift = 33;
        System.out.println((negative >> 2) + " " + (negative >>> 28) + " " + (1 << shift));
        double huge = 1e10, zero = 0, tooBig = 1e19;
        System.out.println((int) huge + " " + (int) (zero / zero) + " " + (long) tooBig + " " + (int) -huge);
        char letter = 'x';
        letter++;
        System.out.println(letter + " " + (letter + 1) + " " + (char) (letter + 1) + " " + ("" + letter + 1));
        short most = 32767;
        most++;
        byte small = 10;
        small *= 30;
        int total = 5;
        total += 3.7;
        System.out.println(most + " " + small + " " + total);
        int thousand = 1000, hundred = 100;
        Integer first = thousand, second = thousand, third = hundred, fourth = hundred;
        System.out.println((first == second) + " " + first.equals(second) + " " + (third == fourth));
        double tenth = 0.1;
        System.out.println(tenth * 3 + " " + Math.round(-2.5 * tenth * 10) + " " + (a / (double) b));
        int count = 0;
        System.out.println(count++ + count++ + " " + count + " " + (++count * 2));
        System.out.println(big / (count - count));
    }
}
