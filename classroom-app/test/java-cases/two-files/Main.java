import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.print("Pet name: ");
        Pet pet = new Pet(input.nextLine());
        System.out.print("Feed how many times? ");
        int meals = input.nextInt();
        for (int meal = 0; meal < meals; meal++) {
            pet.feed();
        }
        System.out.println(pet);
        pet.feed();
    }
}
