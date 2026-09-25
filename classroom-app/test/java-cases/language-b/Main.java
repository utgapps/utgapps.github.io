import java.util.Scanner;
import java.util.ArrayList;
import java.util.Random;

public class Main {
    static int created = 0;
    private int id;
    private String label;
    { created++; }

    Main() { this("none"); }
    Main(String label) { this.label = label; this.id = created; }

    @Override
    public boolean equals(Object other) {
        if (!(other instanceof Main)) return false;
        return ((Main) other).label.equals(label);
    }
    @Override
    public int hashCode() { return label.hashCode(); }
    @Override
    public String toString() { return "Main#" + id + "(" + label + ")"; }

    static int sum(int... values) {
        int total = 0;
        for (int value : values) total += value;
        return total;
    }
    static String kind(int x) { return "int"; }
    static String kind(long x) { return "long"; }
    static String kind(double x) { return "double"; }
    static String kind(Object x) { return "Object"; }

    class Inner {
        int twice() { return 2; }
    }

    static void level3(int[] data) { data[5] = 1; }
    static void level2(int[] data) { level3(data); }

    public static void main(String[] args) throws InterruptedException {
        Main first = new Main();
        Main second = new Main("x");
        Main third = new Main("x");
        System.out.println(first + " " + second + " " + third + " " + second.equals(third) + " " + (second == third) + " " + created);
        System.out.println(sum() + " " + sum(1, 2, 3) + " " + kind(1) + " " + kind(1L) + " " + kind(1.5f) + " " + kind("s") + " " + kind('c'));
        byte b = 120;
        b += 10;
        short s = (short) 70000;
        System.out.println(b + " " + s + " " + (true ? 1 : 'a') + " " + (false ? 1 : 'a') + " " + (5 % 3.5) + " " + (-0.0) + " " + (0.0 == -0.0));
        char[] word = {'j', 'a', 'v', 'a'};
        System.out.println(word);
        System.out.println(String.valueOf(word) + Integer.toBinaryString(10) + Character.isDigit('7') + Character.toUpperCase('q') + (int) Character.toUpperCase('q'));
        String[] names = new String[2];
        int[][] jagged = new int[3][];
        jagged[0] = new int[]{1};
        System.out.println(names[0] + " " + jagged[1] + " " + jagged[0].length);
        String built = "";
        for (int i = 0; i < 3; i++) built += i;
        System.out.println(built);
        int grade = 85;
        switch (grade / 10) {
            case 10:
            case 9:
                System.out.println("A");
                break;
            case 8:
                System.out.println("Main");
            case 7:
                System.out.println("fell through to C");
                break;
            default:
                System.out.println("other");
        }
        int k = 0;
        do { k += 3; } while (k < 10);
        System.out.println(k);
        ArrayList<String> items = new ArrayList<>();
        items.add("a"); items.add("b"); items.add(1, "c");
        try {
            for (String item : items) if (item.equals("c")) items.remove(item);
        } catch (Exception e) {
            System.out.println(e);
        }
        try { items.get(10); } catch (IndexOutOfBoundsException e) { System.out.println(e.getMessage()); }
        try { "abc".substring(2, 1); } catch (StringIndexOutOfBoundsException e) { System.out.println(e.getMessage()); }
        try { Integer.parseInt(""); } catch (NumberFormatException e) { System.out.println(e.getMessage()); }
        Random random = new Random(42);
        System.out.println(random.nextInt(100) + " " + random.nextInt(100) + " " + random.nextDouble() + " " + random.nextBoolean() + " " + random.nextLong());
        Scanner in = new Scanner(System.in);
        System.out.print("Numbers until 0: ");
        int total = 0;
        while (true) {
            if (!in.hasNextInt()) {
                System.out.println("skipping " + in.next());
                continue;
            }
            int n = in.nextInt();
            if (n == 0) break;
            total += n;
        }
        in.nextLine();
        System.out.print("Name: ");
        String name = in.nextLine();
        System.out.println("total " + total + " for " + name.trim() + "!");
        long start = System.currentTimeMillis();
        Thread.sleep(50);
        System.out.println("slept " + (System.currentTimeMillis() - start >= 0));
        System.err.println("to stderr");
        try {
            level2(new int[2]);
        } finally {
            System.out.println("finally before the crash");
        }
    }
}
