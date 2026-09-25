import java.util.ArrayList;

public class Main {
    enum Suit { HEARTS, SPADES }

    public static void main(String[] args) {
        ArrayList<Integer> scores = new ArrayList<>();
        scores.add(3);
        scores.forEach(score -> System.out.println(score));
        System.out.println(Suit.HEARTS);
    }
}
