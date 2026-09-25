// A condition made only of constants: Day 10's review prints three of them,
// and the flow checker once bounced a constant && between two of its methods
// until the stack overflowed.
public class ConstantConditions {
    public static void main(String[] args) {
        System.out.println((5 > 3) && (8 < 10));
        System.out.println((5 > 3) || (8 < 5));
        System.out.println(!(5 == 3));
        int value;
        if ((1 < 2) || false) {
            value = 1;
        }
        System.out.println(value);
        while ((2 > 1) && true) {
            System.out.println("once");
            break;
        }
    }
}
