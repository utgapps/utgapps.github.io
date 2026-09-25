import java.util.*;

public class Main {
    interface Shape { double area(); }
    static abstract class Base implements Shape, Comparable<Base> {
        protected String name;
        Base(String name) { this.name = name; }
        public int compareTo(Base other) { return Double.compare(area(), other.area()); }
        @Override public String toString() { return name + String.format("(%.2f)", area()); }
    }
    static class Circle extends Base {
        double r;
        Circle(double r) { super("Circle"); this.r = r; }
        public double area() { return Math.PI * r * r; }
    }
    static class Square extends Base {
        double s;
        Square(double s) { super("Square"); this.s = s; }
        public double area() { return s * s; }
    }
    static class BadInput extends Exception {
        BadInput(String message, Throwable cause) { super(message, cause); }
    }
    static int counter;
    static final int LIMIT = 3;
    static { counter = 10; }

    static int fib(int n) { return n < 2 ? n : fib(n - 1) + fib(n - 2); }
    static int depth(int n) { return depth(n + 1) + 1; }

    static void parse(String s) throws BadInput {
        try { Integer.parseInt(s); }
        catch (NumberFormatException e) { throw new BadInput("bad: " + s, e); }
    }

    public static void main(String[] args) {
        int big = Integer.MAX_VALUE;
        big++;
        System.out.println(big + " " + (7 / 2) + " " + (-7 / 2) + " " + (-7 % 3) + " " + (7.0 / 2));
        long l = 1L << 40;
        System.out.println(l + " " + (l * l) + " " + Long.MAX_VALUE);
        char c = 'a';
        c += 2;
        System.out.println(c + " " + (c + 1) + " " + (char) (c + 1));
        System.out.println(0.1 + 0.2);
        System.out.println(1.0 / 0 + " " + (0.0 / 0) + " " + 100.0 + " " + 1e7 + " " + 1.0E-5 + " " + 123456789.0);
        System.out.println((float) 0.1 + " " + 3.14f * 2);
        System.out.printf("%5d|%-5d|%05d|%,d|%x|%.3f|%10.2f|%s|%b|%c|%e%n", 42, 42, 42, 1234567, 255, Math.E, -3.14159, "hi", true, 'z', 12345.678);
        System.out.println(String.format("%.2f %.0f %.1f", 2.675, 0.5, 0.05));
        String s1 = "hello";
        String s2 = "hel" + "lo";
        String s3 = new String("hello");
        Scanner scan = new Scanner("hello 42");
        String s4 = scan.next();
        System.out.println((s1 == s2) + " " + (s1 == s3) + " " + s1.equals(s3) + " " + (s1 == s4) + " " + (s4.equals(s1)));
        Integer i1 = 127, i2 = 127, i3 = 128, i4 = 128;
        System.out.println((i1 == i2) + " " + (i3 == i4) + " " + i3.equals(i4));
        System.out.println("a,b,,c,,".split(",").length + " " + Arrays.toString("a1b2c3".split("\\d")) + " " + Arrays.toString(" x  y ".trim().split("\\s+")));
        System.out.println("Hello".charAt(1) + "Hello".substring(1, 3) + "Hello".indexOf('l') + "Hello".toUpperCase() + "hello".replace('l', 'L'));
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 5; i++) sb.append(i).append(',');
        sb.setLength(sb.length() - 1);
        System.out.println(sb.reverse() + " " + sb.length());
        int[] nums = {5, 3, 9, 1};
        Arrays.sort(nums);
        System.out.println(Arrays.toString(nums) + " " + nums.length + " " + Arrays.binarySearch(nums, 9));
        int[][] grid = new int[2][3];
        grid[1][2] = 7;
        System.out.println(Arrays.deepToString(grid));
        List<Base> shapes = new ArrayList<>();
        shapes.add(new Square(3));
        shapes.add(new Circle(1));
        shapes.add(new Square(1.5));
        Collections.sort(shapes);
        System.out.println(shapes);
        System.out.println(Collections.max(shapes) + " " + shapes.size() + " " + shapes.get(0).name);
        ArrayList<Integer> list = new ArrayList<>(List.of(4, 8, 15, 16, 23, 42));
        list.remove(Integer.valueOf(15));
        list.remove(0);
        int sum = 0;
        for (int n : list) sum += n;
        System.out.println(list + " sum=" + sum + " " + list.contains(42) + " " + list.indexOf(23));
        System.out.println(fib(20) + " " + counter + " " + LIMIT);
        String day = "TUE";
        int len = switch (day) {
            case "MON", "TUE" -> 3;
            default -> { yield 0; }
        };
        outer:
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (j == 2) continue outer;
                if (i == 2) break outer;
                System.out.print(i + "" + j + " ");
            }
        }
        System.out.println(len);
        try { parse("12x"); }
        catch (BadInput e) { System.out.println(e.getMessage() + " / " + e.getCause()); }
        try { int[] a = new int[2]; a[2] = 1; }
        catch (ArrayIndexOutOfBoundsException e) { System.out.println(e); }
        try { String n = null; n.length(); }
        catch (NullPointerException e) { System.out.println(e.getMessage()); }
        try { depth(0); }
        catch (StackOverflowError e) { System.out.println("SO " + e); }
        try { Object o = "x"; Integer bad = (Integer) o; }
        catch (ClassCastException e) { System.out.println(e.getMessage()); }
        try { System.out.println(10 / (counter - 10)); }
        catch (ArithmeticException e) { System.out.println(e); }
        finally { System.out.println("finally"); }
        System.out.println(Math.max(3, 7) + " " + Math.abs(-2.5) + " " + Math.round(2.5) + " " + Math.round(-2.5) + " " + Math.sqrt(2) + " " + Math.pow(2, 10) + " " + (int) 3.99 + " " + (int) -3.99);
        Object o = shapes.get(0);
        if (o instanceof Square sq) System.out.println("square " + sq.s);
        System.out.println(new Object() == null);
        String text = null;
        System.out.println("null concat: " + text);
        throw new IllegalStateException("done", new RuntimeException("inner"));
    }
}
