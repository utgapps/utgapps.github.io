public class Main {
    public static void main(String[] args) {
        int number = 3;
        String word = "a";
        switch (number) {
            case "one": word = 'c'; break;
            case 2.5: break;
            case 'x': break;
        }
        switch (word) {
            case 1: number = "t"; break;
            case 'c': break;
        }
    }
}
