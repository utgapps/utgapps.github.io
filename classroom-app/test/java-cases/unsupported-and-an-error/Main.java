public class Main {
    enum Suit { HEARTS, SPADES }
    record Point(int x, int y) { }
    static class Box<T> {
        private T item;
        Box(T item) { this.item = item; }
        T get() { return item; }
    }

    public static void main(String[] args) {
        Suit suit = Suit.HEARTS;
        System.out.println(suit + " " + suit.ordinal() + " " + Suit.values().length + " " + Suit.valueOf("SPADES"));
        Point point = new Point(1, 2);
        System.out.println(point.x() + point.y());
        Box<String> box = new Box<>("hat");
        System.out.println(box.get().length());
        int wrong = "oops";
    }
}
