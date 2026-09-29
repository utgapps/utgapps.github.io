public class Main {
    public static void main(String[] args) {
        int number = 1; boolean flag = true; String text = "a"; double real = 1.0; char letter = 'c';
        Integer boxed = 1; Boolean boxedFlag = true; Object thing = null; StringBuilder builder = null;
        System.out.println(number == flag);
        System.out.println(number == text);
        System.out.println(flag == text);
        System.out.println(real != flag);
        System.out.println(letter == flag);
        System.out.println(boxed == flag);
        System.out.println(boxedFlag == number);
        System.out.println(text == builder);
        System.out.println(boxed == text);
        System.out.println(thing == number);
        System.out.println(boxed == real);
        System.out.println(flag == null);
        System.out.println(number == null);
    }
}
