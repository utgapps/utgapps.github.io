import java.io.InputStream;
import java.io.PrintStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayDeque;
import java.util.Deque;

// Runs Main with scripted keyboard input, one line at a time, and writes each
// line into the output at the moment the program asks for it, as [[line]].
// The result reads exactly like a person at the console typed it.
public class Harness {
    public static void main(String[] args) throws Exception {
        Deque<String> typed = new ArrayDeque<>(Files.readAllLines(Path.of(args[0])));
        PrintStream console = System.out;
        System.setIn(new InputStream() {
            private byte[] pending = new byte[0];
            private int position = 0;

            private boolean refill() {
                if (position < pending.length) {
                    return true;
                }
                if (typed.isEmpty()) {
                    return false;
                }
                String line = typed.removeFirst();
                console.print("[[" + line + "]]\n");
                pending = (line + "\n").getBytes(StandardCharsets.UTF_8);
                position = 0;
                return true;
            }

            @Override
            public int read() {
                return refill() ? pending[position++] : -1;
            }

            @Override
            public int read(byte[] buffer, int offset, int length) {
                if (length == 0) {
                    return 0;
                }
                if (!refill()) {
                    return -1;
                }
                int count = Math.min(length, pending.length - position);
                System.arraycopy(pending, position, buffer, offset, count);
                position += count;
                return count;
            }
        });
        Class.forName("Main").getMethod("main", String[].class).invoke(null, (Object) new String[0]);
    }
}
