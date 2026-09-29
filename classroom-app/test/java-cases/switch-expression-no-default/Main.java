public class Main {
    public static void main(String[] args) {
        int number = 3;
        String name = switch (number) {
            case 1 -> "one" + missingOne;
            case 2 -> "two";
        };
    }
}
