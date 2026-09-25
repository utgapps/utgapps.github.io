public class Pet {
    private final String name;
    private int hunger = 3;

    public Pet(String name) {
        this.name = name;
    }

    public void feed() {
        if (hunger == 0) {
            throw new IllegalStateException(name + " is full");
        }
        hunger--;
    }

    @Override
    public String toString() {
        return name + " (hunger " + hunger + ")";
    }
}
