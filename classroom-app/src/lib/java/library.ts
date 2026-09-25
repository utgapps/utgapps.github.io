/* The part of the JDK the classroom runs, as the checker sees it.

   Written as a small text format - one line per method, in Java's own
   notation - because that is how it will be checked against the real Javadoc:
   by reading it. Each method names the runtime function that implements it
   (see runtime.ts). Unless a line says `=> name`, that function is
   Class_method, with the parameter descriptors appended when the name is
   overloaded: String_indexOf_I, String_indexOf_String, ...

       [static] [<T>] ReturnType name(Parameters) [throws X] [!] [=> runtimeName]

   `!` marks a method that can wait - for the keyboard, or Thread.sleep.

   A `~` line lists methods the real class has that the classroom cannot run
   yet. Calling one is reported as "not supported here", never as a mistake:
   the student's Java is fine, this runner just does not have it.
*/
import {
  type ClassInfo, type FieldInfo, type JavaType, type MethodInfo,
  arrayOf, classType, primitive, VOID, OBJECT_PLACEHOLDER, BOXED_TYPES, PRIMITIVE_NAMES, erasedDescriptor,
  type PrimitiveName,
} from "./types";

const SPEC = String.raw`
class java.lang.Object
  new ()
  boolean equals(Object) => Object_equals
  int hashCode() => Object_hashCode
  String toString() => Object_toString
  ~ getClass wait notify notifyAll clone finalize

interface java.lang.Comparable<T>
  int compareTo(T) => Comparable_compareTo

interface java.lang.CharSequence
  int length() => CharSequence_length
  char charAt(int) => CharSequence_charAt
  boolean isEmpty() => CharSequence_isEmpty
  ~ chars codePoints subSequence

interface java.lang.Iterable<T>
  ~ forEach iterator spliterator

interface java.lang.Runnable
  ~ run

final class java.lang.String implements Comparable<String>, CharSequence
  new () => String_new_
  new (String) => String_new_String
  new (char[]) => String_new_AC
  new (char[], int, int) => String_new_ACII
  int length()
  char charAt(int)
  boolean isEmpty()
  boolean isBlank()
  String substring(int)
  String substring(int, int)
  CharSequence subSequence(int, int) => String_substring_II
  int indexOf(int)
  int indexOf(String)
  int indexOf(int, int)
  int indexOf(String, int)
  int lastIndexOf(int)
  int lastIndexOf(String)
  int lastIndexOf(int, int)
  int lastIndexOf(String, int)
  boolean contains(CharSequence)
  boolean equals(Object)
  boolean equalsIgnoreCase(String)
  boolean contentEquals(CharSequence) => String_equals
  int compareTo(String)
  int compareToIgnoreCase(String)
  String toUpperCase()
  String toLowerCase()
  String trim()
  String strip()
  String stripLeading()
  String stripTrailing()
  boolean startsWith(String)
  boolean startsWith(String, int)
  boolean endsWith(String)
  String replace(char, char)
  String replace(CharSequence, CharSequence)
  String replaceAll(String, String)
  String replaceFirst(String, String)
  String[] split(String)
  String[] split(String, int)
  char[] toCharArray()
  String concat(String)
  String repeat(int)
  boolean matches(String)
  int hashCode()
  String toString()
  String intern()
  String formatted(Object...)
  int codePointAt(int) => String_charAt_I
  static String valueOf(int) => String_valueOf_I
  static String valueOf(long) => String_valueOf_J
  static String valueOf(double) => String_valueOf_D
  static String valueOf(float) => String_valueOf_F
  static String valueOf(char) => String_valueOf_C
  static String valueOf(boolean) => String_valueOf_Z
  static String valueOf(char[]) => String_valueOf_AC
  static String valueOf(Object) => String_valueOf_Object
  static String copyValueOf(char[]) => String_valueOf_AC
  static String format(String, Object...)
  static String join(CharSequence, CharSequence...) => String_join_array
  static String join(CharSequence, Iterable<?>) => String_join_iterable
  ~ chars codePoints lines getBytes indent translateEscapes regionMatches offsetByCodePoints describeConstable resolveConstantDesc stripIndent getChars codePointBefore codePointCount transform

final class java.lang.StringBuilder implements CharSequence, Comparable<StringBuilder>
  new () => StringBuilder_new_
  new (String) => StringBuilder_new_String
  new (int) => StringBuilder_new_I
  new (CharSequence) => StringBuilder_new_String
  StringBuilder append(String) => StringBuilder_append_Object
  StringBuilder append(char) => StringBuilder_append_C
  StringBuilder append(int) => StringBuilder_append_I
  StringBuilder append(long) => StringBuilder_append_I
  StringBuilder append(double) => StringBuilder_append_D
  StringBuilder append(float) => StringBuilder_append_F
  StringBuilder append(boolean) => StringBuilder_append_Z
  StringBuilder append(char[]) => StringBuilder_append_AC
  StringBuilder append(CharSequence) => StringBuilder_append_Object
  StringBuilder append(Object) => StringBuilder_append_Object
  StringBuilder insert(int, String) => StringBuilder_insert_Object
  StringBuilder insert(int, char) => StringBuilder_insert_C
  StringBuilder insert(int, int) => StringBuilder_insert_I
  StringBuilder insert(int, long) => StringBuilder_insert_I
  StringBuilder insert(int, double) => StringBuilder_insert_D
  StringBuilder insert(int, boolean) => StringBuilder_insert_Z
  StringBuilder insert(int, Object) => StringBuilder_insert_Object
  String toString()
  int length()
  char charAt(int)
  boolean isEmpty()
  void setCharAt(int, char)
  StringBuilder reverse()
  StringBuilder deleteCharAt(int)
  StringBuilder delete(int, int)
  StringBuilder replace(int, int, String)
  int indexOf(String)
  int indexOf(String, int)
  int lastIndexOf(String)
  String substring(int)
  String substring(int, int)
  void setLength(int)
  int capacity()
  int compareTo(StringBuilder)
  ~ chars codePoints appendCodePoint ensureCapacity trimToSize getChars subSequence

abstract class java.lang.Number
  abstract int intValue() => Number_intValue
  abstract long longValue() => Number_longValue
  abstract double doubleValue() => Number_doubleValue
  abstract float floatValue() => Number_floatValue

final class java.lang.Integer extends Number implements Comparable<Integer>
  static final int MAX_VALUE = 2147483647
  static final int MIN_VALUE = -2147483648
  static final int SIZE = 32
  static int parseInt(String)
  static int parseInt(String, int)
  static Integer valueOf(int) => Integer_valueOf_I
  static Integer valueOf(String) => Integer_valueOf_String
  static String toString(int) => Integer_toString_I
  static String toString(int, int) => Integer_toString_II
  static String toBinaryString(int)
  static String toHexString(int)
  static String toOctalString(int)
  static int compare(int, int)
  static int max(int, int)
  static int min(int, int)
  static int sum(int, int)
  static int signum(int)
  static int bitCount(int)
  static int reverse(int)
  int intValue()
  long longValue()
  double doubleValue()
  float floatValue()
  int compareTo(Integer)
  boolean equals(Object)
  int hashCode()
  String toString() => Object_toString
  ~ decode parseUnsignedInt highestOneBit lowestOneBit numberOfLeadingZeros numberOfTrailingZeros rotateLeft rotateRight toUnsignedString getInteger

final class java.lang.Long extends Number implements Comparable<Long>
  static final long MAX_VALUE = 9223372036854775807L
  static final long MIN_VALUE = -9223372036854775808L
  static long parseLong(String)
  static Long valueOf(long) => Long_valueOf_J
  static Long valueOf(String) => Long_valueOf_String
  static String toString(long) => Long_toString_J
  static int compare(long, long)
  static long max(long, long)
  static long min(long, long)
  static long sum(long, long)
  static String toBinaryString(long)
  static String toHexString(long)
  int intValue()
  long longValue()
  double doubleValue()
  float floatValue()
  int compareTo(Long)
  boolean equals(Object)
  int hashCode()
  String toString() => Object_toString

final class java.lang.Double extends Number implements Comparable<Double>
  static final double MAX_VALUE = 1.7976931348623157E308
  static final double MIN_VALUE = 4.9E-324
  static final double POSITIVE_INFINITY = Infinity
  static final double NEGATIVE_INFINITY = -Infinity
  static final double NaN = NaN
  static double parseDouble(String)
  static Double valueOf(double) => Double_valueOf_D
  static Double valueOf(String) => Double_valueOf_String
  static String toString(double) => Double_toString_D
  static int compare(double, double)
  static boolean isNaN(double) => Double_isNaN_D
  static boolean isInfinite(double) => Double_isInfinite_D
  static boolean isFinite(double)
  static double max(double, double)
  static double min(double, double)
  static double sum(double, double)
  boolean isNaN() => Double_isNaN_
  boolean isInfinite() => Double_isInfinite_
  int intValue()
  long longValue()
  double doubleValue()
  float floatValue()
  int compareTo(Double)
  boolean equals(Object)
  int hashCode()
  String toString() => Object_toString
  ~ doubleToLongBits longBitsToDouble toHexString doubleToRawLongBits

final class java.lang.Float extends Number implements Comparable<Float>
  static final float MAX_VALUE = 3.4028235E38F
  static final float MIN_VALUE = 1.4E-45F
  static float parseFloat(String)
  static Float valueOf(float) => Float_valueOf_F
  static String toString(float) => Float_toString_F
  static int compare(float, float)
  int intValue()
  long longValue()
  double doubleValue()
  float floatValue()
  int compareTo(Float)
  boolean equals(Object)
  String toString() => Object_toString

final class java.lang.Short extends Number implements Comparable<Short>
  static final short MAX_VALUE = 32767
  static final short MIN_VALUE = -32768
  static short parseShort(String)
  static Short valueOf(short) => Short_valueOf_S
  int intValue()
  long longValue()
  double doubleValue()
  float floatValue()
  short shortValue()
  int compareTo(Short)
  boolean equals(Object)
  String toString() => Object_toString

final class java.lang.Byte extends Number implements Comparable<Byte>
  static final byte MAX_VALUE = 127
  static final byte MIN_VALUE = -128
  static byte parseByte(String)
  static Byte valueOf(byte) => Byte_valueOf_B
  int intValue()
  long longValue()
  double doubleValue()
  float floatValue()
  byte byteValue()
  int compareTo(Byte)
  boolean equals(Object)
  String toString() => Object_toString

final class java.lang.Boolean implements Comparable<Boolean>
  static final Boolean TRUE
  static final Boolean FALSE
  static boolean parseBoolean(String)
  static Boolean valueOf(boolean) => Boolean_valueOf_Z
  static Boolean valueOf(String) => Boolean_valueOf_String
  static String toString(boolean) => Boolean_toString_Z
  static int compare(boolean, boolean)
  static boolean logicalAnd(boolean, boolean)
  static boolean logicalOr(boolean, boolean)
  static boolean logicalXor(boolean, boolean)
  boolean booleanValue()
  int compareTo(Boolean)
  boolean equals(Object)
  int hashCode()
  String toString() => Object_toString

final class java.lang.Character implements Comparable<Character>
  static final char MIN_VALUE = 0
  static final char MAX_VALUE = 65535
  static boolean isLetter(char)
  static boolean isDigit(char)
  static boolean isLetterOrDigit(char)
  static boolean isAlphabetic(int)
  static boolean isUpperCase(char)
  static boolean isLowerCase(char)
  static boolean isWhitespace(char)
  static boolean isSpaceChar(char)
  static char toUpperCase(char) => Character_toUpperCase
  static int toUpperCase(int) => Character_toUpperCase
  static char toLowerCase(char) => Character_toLowerCase
  static int toLowerCase(int) => Character_toLowerCase
  static int getNumericValue(char)
  static int digit(char, int)
  static char forDigit(int, int)
  static String toString(char) => Character_toString_C
  static Character valueOf(char) => Character_valueOf_C
  static int compare(char, char)
  static char reverseBytes(char)
  char charValue()
  int compareTo(Character)
  boolean equals(Object)
  int hashCode()
  String toString() => Object_toString
  ~ isJavaIdentifierStart isJavaIdentifierPart isDefined isTitleCase toChars codePointAt isSurrogate getType isISOControl

final class java.lang.Math
  static final double PI = 3.141592653589793
  static final double E = 2.718281828459045
  static int abs(int) => Math_abs_I
  static long abs(long) => Math_abs_J
  static float abs(float) => Math_abs_D
  static double abs(double) => Math_abs_D
  static int max(int, int) => Math_max_D
  static long max(long, long) => Math_max_J
  static float max(float, float) => Math_max_D
  static double max(double, double) => Math_max_D
  static int min(int, int) => Math_min_D
  static long min(long, long) => Math_min_J
  static float min(float, float) => Math_min_D
  static double min(double, double) => Math_min_D
  static double pow(double, double)
  static double sqrt(double)
  static double cbrt(double)
  static double random()
  static long round(double) => Math_round_D
  static int round(float) => Math_round_F
  static double floor(double)
  static double ceil(double)
  static double rint(double)
  static int floorDiv(int, int) => Math_floorDiv_I
  static long floorDiv(long, long) => Math_floorDiv_J
  static int floorMod(int, int) => Math_floorMod_I
  static long floorMod(long, long) => Math_floorMod_J
  static double hypot(double, double)
  static double exp(double)
  static double log(double)
  static double log10(double)
  static double sin(double)
  static double cos(double)
  static double tan(double)
  static double asin(double)
  static double acos(double)
  static double atan(double)
  static double atan2(double, double)
  static double toRadians(double)
  static double toDegrees(double)
  static double signum(double)
  static int addExact(int, int) => Math_addExact_I
  static long addExact(long, long) => Math_addExact_J
  static int subtractExact(int, int) => Math_subtractExact_I
  static int multiplyExact(int, int) => Math_multiplyExact_I
  static long multiplyExact(long, long) => Math_multiplyExact_J
  static int negateExact(int)
  static int toIntExact(long)
  static int absExact(int)
  ~ sinh cosh tanh expm1 log1p ulp nextUp nextDown scalb getExponent copySign IEEEremainder fma clamp

final class java.lang.System
  static final PrintStream out
  static final PrintStream err
  static final InputStream in
  static long currentTimeMillis()
  static long nanoTime()
  static void exit(int)
  static String lineSeparator()
  static void arraycopy(Object, int, Object, int, int)
  static int identityHashCode(Object) => Object_hashCode_identity
  ~ getProperty getenv setOut setIn setErr gc getProperties console

class java.io.PrintStream
  void print(boolean) => PrintStream_print_Z
  void print(char) => PrintStream_print_C
  void print(int) => PrintStream_print_I
  void print(long) => PrintStream_print_I
  void print(float) => PrintStream_print_F
  void print(double) => PrintStream_print_D
  void print(char[]) => PrintStream_print_AC
  void print(String) => PrintStream_print_Object
  void print(Object) => PrintStream_print_Object
  void println() => PrintStream_println_
  void println(boolean) => PrintStream_println_Z
  void println(char) => PrintStream_println_C
  void println(int) => PrintStream_println_I
  void println(long) => PrintStream_println_I
  void println(float) => PrintStream_println_F
  void println(double) => PrintStream_println_D
  void println(char[]) => PrintStream_println_AC
  void println(String) => PrintStream_println_Object
  void println(Object) => PrintStream_println_Object
  PrintStream printf(String, Object...)
  PrintStream format(String, Object...) => PrintStream_printf
  void flush()
  void write(int)
  ~ close checkError append

class java.io.InputStream
  ~ read available close skip transferTo readAllBytes

final class java.lang.Thread
  static void sleep(long) throws InterruptedException ! => Thread_sleep
  ~ currentThread start join run interrupt yield onSpinWait

final class java.util.Scanner
  new (InputStream) => Scanner_new_InputStream
  new (String) => Scanner_new_String
  String nextLine() !
  String next() !
  int nextInt() !
  long nextLong() !
  double nextDouble() !
  float nextFloat() !
  short nextShort() !
  byte nextByte() !
  boolean nextBoolean() !
  boolean hasNext() !
  boolean hasNextLine() !
  boolean hasNextInt() !
  boolean hasNextLong() !
  boolean hasNextDouble() !
  boolean hasNextBoolean() !
  void close()
  ~ useDelimiter findInLine skip tokens findAll delimiter nextBigInteger nextBigDecimal hasNextBigInteger useLocale reset match

class java.util.Random
  new () => Random_new_
  new (long) => Random_new_J
  int nextInt() => Random_nextInt_
  int nextInt(int) => Random_nextInt_I
  int nextInt(int, int) => Random_nextInt_II
  long nextLong()
  double nextDouble()
  float nextFloat()
  boolean nextBoolean()
  double nextGaussian()
  void setSeed(long)
  ~ ints doubles longs nextBytes nextExponential

interface java.util.Collection<E> extends Iterable<E>
  int size() => Collection_size
  boolean isEmpty() => Collection_isEmpty
  boolean contains(Object) => Collection_contains
  boolean add(E) => Collection_add
  boolean remove(Object) => Collection_remove_Object
  void clear() => Collection_clear
  boolean addAll(Collection<E>) => Collection_addAll
  boolean removeAll(Collection<?>) => Collection_removeAll
  boolean containsAll(Collection<?>) => Collection_containsAll
  boolean retainAll(Collection<?>) => Collection_retainAll
  ~ stream parallelStream removeIf toArray iterator forEach spliterator

interface java.util.List<E> extends Collection<E>
  E get(int) => List_get
  E set(int, E) => List_set
  void add(int, E) => List_add_IE
  E remove(int) => List_remove_I
  int indexOf(Object) => List_indexOf
  int lastIndexOf(Object) => List_lastIndexOf
  List<E> subList(int, int) => List_subList
  static <T> List<T> of(T...) => List_of
  static <T> List<T> copyOf(Collection<T>) => List_copyOf
  ~ sort replaceAll listIterator iterator stream removeIf forEach toArray reversed getFirst getLast addFirst addLast removeFirst removeLast

class java.util.ArrayList<E> implements List<E>
  new () => ArrayList_new_
  new (int) => ArrayList_new_I
  new (Collection<E>) => ArrayList_new_Collection
  void ensureCapacity(int)
  void trimToSize()

final class java.util.Arrays
  static String toString(int[]) => Arrays_toString
  static String toString(long[]) => Arrays_toString
  static String toString(double[]) => Arrays_toString
  static String toString(float[]) => Arrays_toString
  static String toString(char[]) => Arrays_toString
  static String toString(boolean[]) => Arrays_toString
  static String toString(short[]) => Arrays_toString
  static String toString(byte[]) => Arrays_toString
  static String toString(Object[]) => Arrays_toString
  static String deepToString(Object[])
  static void sort(int[]) => Arrays_sort_numbers
  static void sort(long[]) => Arrays_sort_numbers
  static void sort(double[]) => Arrays_sort_numbers
  static void sort(float[]) => Arrays_sort_numbers
  static void sort(char[]) => Arrays_sort_numbers
  static void sort(short[]) => Arrays_sort_numbers
  static void sort(byte[]) => Arrays_sort_numbers
  static void sort(Object[]) => Arrays_sort_objects
  static void sort(int[], int, int) => Arrays_sort_numbers
  static void sort(double[], int, int) => Arrays_sort_numbers
  static void sort(char[], int, int) => Arrays_sort_numbers
  static void sort(Object[], int, int) => Arrays_sort_objects
  static void fill(int[], int) => Arrays_fill
  static void fill(long[], long) => Arrays_fill
  static void fill(double[], double) => Arrays_fill
  static void fill(float[], float) => Arrays_fill
  static void fill(char[], char) => Arrays_fill
  static void fill(boolean[], boolean) => Arrays_fill
  static void fill(short[], short) => Arrays_fill
  static void fill(byte[], byte) => Arrays_fill
  static void fill(Object[], Object) => Arrays_fill
  static void fill(int[], int, int, int) => Arrays_fill_range
  static void fill(char[], int, int, char) => Arrays_fill_range
  static void fill(Object[], int, int, Object) => Arrays_fill_range
  static int[] copyOf(int[], int) => Arrays_copyOf
  static long[] copyOf(long[], int) => Arrays_copyOf
  static double[] copyOf(double[], int) => Arrays_copyOf
  static char[] copyOf(char[], int) => Arrays_copyOf
  static boolean[] copyOf(boolean[], int) => Arrays_copyOf
  static <T> T[] copyOf(T[], int) => Arrays_copyOf
  static int[] copyOfRange(int[], int, int) => Arrays_copyOfRange
  static double[] copyOfRange(double[], int, int) => Arrays_copyOfRange
  static char[] copyOfRange(char[], int, int) => Arrays_copyOfRange
  static boolean[] copyOfRange(boolean[], int, int) => Arrays_copyOfRange
  static <T> T[] copyOfRange(T[], int, int) => Arrays_copyOfRange
  static boolean equals(int[], int[]) => Arrays_equals
  static boolean equals(long[], long[]) => Arrays_equals
  static boolean equals(double[], double[]) => Arrays_equals
  static boolean equals(char[], char[]) => Arrays_equals
  static boolean equals(boolean[], boolean[]) => Arrays_equals
  static boolean equals(Object[], Object[]) => Arrays_equals
  static boolean deepEquals(Object[], Object[])
  static int binarySearch(int[], int) => Arrays_binarySearch
  static int binarySearch(long[], long) => Arrays_binarySearch
  static int binarySearch(double[], double) => Arrays_binarySearch
  static int binarySearch(char[], char) => Arrays_binarySearch
  static int binarySearch(Object[], Object) => Arrays_binarySearch
  static <T> List<T> asList(T...)
  static int hashCode(int[]) => Arrays_hashCode
  ~ stream parallelSort setAll parallelPrefix spliterator mismatch compare deepHashCode

final class java.util.Collections
  static <T> void sort(List<T>)
  static void reverse(List<?>)
  static void shuffle(List<?>) => Collections_shuffle_
  static void shuffle(List<?>, Random) => Collections_shuffle_Random
  static <T> T max(Collection<T>)
  static <T> T min(Collection<T>)
  static void swap(List<?>, int, int)
  static int frequency(Collection<?>, Object)
  static <T> List<T> nCopies(int, T)
  static <T> List<T> unmodifiableList(List<T>)
  static <T> List<T> emptyList()
  static <T> boolean addAll(Collection<T>, T...)
  static <T> void fill(List<T>, T)
  static <T> int binarySearch(List<T>, T)
  ~ reverseOrder synchronizedList singletonList emptyMap emptySet unmodifiableMap unmodifiableSet rotate disjoint

class java.lang.Throwable
  new () => $ctor
  new (String) => $ctor
  new (String, Throwable) => $ctor
  new (Throwable) => $ctor
  String getMessage() => Throwable_getMessage
  String getLocalizedMessage() => Throwable_getMessage
  Throwable getCause() => Throwable_getCause
  String toString() => Object_toString
  void printStackTrace() => Throwable_printStackTrace
  ~ getStackTrace setStackTrace fillInStackTrace addSuppressed getSuppressed initCause

class java.lang.Exception extends Throwable checked
class java.lang.RuntimeException extends Exception
class java.lang.Error extends Throwable
class java.lang.StackOverflowError extends Error
class java.lang.OutOfMemoryError extends Error
class java.lang.AssertionError extends Error
class java.lang.ArithmeticException extends RuntimeException
class java.lang.IndexOutOfBoundsException extends RuntimeException
class java.lang.ArrayIndexOutOfBoundsException extends IndexOutOfBoundsException
class java.lang.StringIndexOutOfBoundsException extends IndexOutOfBoundsException
class java.lang.NullPointerException extends RuntimeException
class java.lang.IllegalArgumentException extends RuntimeException
class java.lang.NumberFormatException extends IllegalArgumentException
class java.lang.IllegalStateException extends RuntimeException
class java.lang.ClassCastException extends RuntimeException
class java.lang.NegativeArraySizeException extends RuntimeException
class java.lang.UnsupportedOperationException extends RuntimeException
class java.lang.ArrayStoreException extends RuntimeException
class java.lang.InterruptedException extends Exception checked
class java.lang.CloneNotSupportedException extends Exception checked
class java.util.NoSuchElementException extends RuntimeException
class java.util.InputMismatchException extends NoSuchElementException
class java.util.ConcurrentModificationException extends RuntimeException
class java.util.IllegalFormatException extends IllegalArgumentException
class java.util.MissingFormatArgumentException extends IllegalFormatException
class java.util.UnknownFormatConversionException extends IllegalFormatException
class java.util.IllegalFormatConversionException extends IllegalFormatException
class java.util.DuplicateFormatFlagsException extends IllegalFormatException
class java.util.FormatFlagsConversionMismatchException extends IllegalFormatException
class java.util.IllegalFormatPrecisionException extends IllegalFormatException
class java.util.MissingFormatWidthException extends IllegalFormatException
class java.io.IOException extends Exception checked
class java.io.FileNotFoundException extends IOException checked
class java.io.UncheckedIOException extends RuntimeException
`;

/* Real JDK classes a student might import or name that the classroom cannot
   run. Naming one is "not supported here yet", not "cannot find symbol". */
const REAL_BUT_UNSUPPORTED = [
  "java.util.HashMap", "java.util.Map", "java.util.TreeMap", "java.util.LinkedHashMap", "java.util.Hashtable",
  "java.util.HashSet", "java.util.Set", "java.util.TreeSet", "java.util.LinkedHashSet", "java.util.SortedMap", "java.util.SortedSet",
  "java.util.LinkedList", "java.util.Queue", "java.util.Deque", "java.util.ArrayDeque", "java.util.Stack", "java.util.Vector",
  "java.util.PriorityQueue", "java.util.Iterator", "java.util.ListIterator", "java.util.Optional", "java.util.StringJoiner",
  "java.util.Objects", "java.util.Locale", "java.util.Date", "java.util.Calendar", "java.util.GregorianCalendar",
  "java.util.Comparator", "java.util.UUID", "java.util.Timer", "java.util.TimerTask", "java.util.BitSet",
  "java.util.EnumMap", "java.util.EnumSet", "java.util.Formatter", "java.util.StringTokenizer", "java.util.Properties",
  "java.util.OptionalInt", "java.util.OptionalDouble", "java.util.AbstractList", "java.util.Iterator",
  "java.io.File", "java.io.FileReader", "java.io.FileWriter", "java.io.BufferedReader", "java.io.BufferedWriter",
  "java.io.InputStreamReader", "java.io.PrintWriter", "java.io.FileInputStream", "java.io.FileOutputStream",
  "java.io.Serializable", "java.io.Console", "java.io.Reader", "java.io.Writer", "java.io.StringReader",
  "java.lang.StringBuffer", "java.lang.Enum", "java.lang.Record", "java.lang.Class", "java.lang.Runtime",
  "java.lang.Process", "java.lang.ProcessBuilder", "java.lang.ThreadLocal", "java.lang.Void", "java.lang.Cloneable",
  "java.lang.AutoCloseable", "java.lang.Readable", "java.lang.Appendable", "java.lang.StrictMath",
  "java.lang.CharacterSequence", "java.lang.Override", "java.lang.Deprecated", "java.lang.SuppressWarnings",
  "java.lang.FunctionalInterface", "java.lang.SafeVarargs",
  "java.math.BigInteger", "java.math.BigDecimal", "java.math.RoundingMode", "java.math.MathContext",
  "java.text.DecimalFormat", "java.text.NumberFormat", "java.text.SimpleDateFormat",
  "java.time.LocalDate", "java.time.LocalDateTime", "java.time.LocalTime", "java.time.Duration", "java.time.Instant",
  "java.util.concurrent.ThreadLocalRandom", "java.util.concurrent.TimeUnit",
  "java.util.function.Function", "java.util.function.Consumer", "java.util.function.Supplier",
  "java.util.function.Predicate", "java.util.function.BiFunction",
  "java.util.stream.Stream", "java.util.stream.IntStream", "java.util.stream.Collectors",
  "java.nio.file.Files", "java.nio.file.Path", "java.nio.file.Paths",
];

// Annotations are accepted and (except @Override) ignored.
export const KNOWN_ANNOTATIONS = new Set(["Override", "Deprecated", "SuppressWarnings", "FunctionalInterface", "SafeVarargs"]);

// ---- the registry ----------------------------------------------------------
export type Library = {
  classes: Map<string, ClassInfo>;           // by qualified name
  packages: Set<string>;                     // "java", "java.util", ...
  unsupportedMethods: Map<ClassInfo, Set<string>>;
  lookup(qualifiedName: string): ClassInfo | undefined;
  object: ClassInfo;
  string: ClassInfo;
};

let cached: Library | null = null;

export function library(): Library {
  if (cached) return cached;
  const classes = new Map<string, ClassInfo>();
  const bySimpleName = new Map<string, ClassInfo>();
  const unsupportedMethods = new Map<ClassInfo, Set<string>>();
  const packages = new Set<string>();
  const addPackages = (qualifiedName: string) => {
    const parts = qualifiedName.split(".");
    for (let length = 1; length < parts.length; length++) packages.add(parts.slice(0, length).join("."));
  };

  type Pending = { info: ClassInfo; header: string; lines: string[] };
  const pending: Pending[] = [];
  let current: Pending | null = null;

  for (const rawLine of SPEC.split("\n")) {
    if (!rawLine.trim()) continue;
    if (!rawLine.startsWith(" ")) {
      const match = rawLine.match(/^((?:final |abstract )*)(class|interface) ([\w.]+)(?:<([\w, ]+)>)?(.*)$/);
      if (!match) throw new Error("library: bad class line " + rawLine);
      const [, modifiers, kind, qualifiedName, typeParameters, rest] = match;
      const simpleName = qualifiedName.split(".").pop()!;
      const info: ClassInfo = {
        name: simpleName, qualifiedName, packageName: qualifiedName.slice(0, qualifiedName.lastIndexOf(".")),
        kind: kind as "class" | "interface", isAbstract: modifiers.includes("abstract") || kind === "interface",
        isFinal: modifiers.includes("final"),
        typeParameters: typeParameters ? typeParameters.split(",").map((name) => name.trim()) : [],
        superclass: null, interfaces: [], fields: new Map(), methods: [], constructors: [],
        isUser: false, isStaticNested: false, jsName: `$rt.C.${simpleName}`,
        isChecked: /\bchecked\b/.test(rest),
      };
      classes.set(qualifiedName, info);
      bySimpleName.set(simpleName, info);
      addPackages(qualifiedName);
      current = { info, header: rest.replace(/\bchecked\b/, ""), lines: [] };
      pending.push(current);
    } else {
      current!.lines.push(rawLine.trim());
    }
  }

  for (const qualifiedName of REAL_BUT_UNSUPPORTED) {
    if (classes.has(qualifiedName)) continue;
    const simpleName = qualifiedName.split(".").pop()!;
    const info: ClassInfo = {
      name: simpleName, qualifiedName, packageName: qualifiedName.slice(0, qualifiedName.lastIndexOf(".")),
      kind: "class", isAbstract: false, isFinal: false, typeParameters: [], superclass: null, interfaces: [],
      fields: new Map(), methods: [], constructors: [], isUser: false, isStaticNested: false, jsName: "",
      unsupported: `the ${simpleName} class`,
    };
    classes.set(qualifiedName, info);
    addPackages(qualifiedName);
  }

  const object = classes.get("java.lang.Object")!;
  OBJECT_PLACEHOLDER.type = classType(object);

  function parseType(text: string, typeParameters: string[]): JavaType {
    text = text.trim();
    if (text.endsWith("...")) return arrayOf(parseType(text.slice(0, -3), typeParameters));
    if (text.endsWith("[]")) return arrayOf(parseType(text.slice(0, -2), typeParameters));
    if (PRIMITIVE_NAMES.has(text)) return primitive(text as PrimitiveName);
    if (text === "void") return VOID;
    if (typeParameters.includes(text)) return { tag: "typeVariable", name: text };
    const generic = text.match(/^(\w+)<(.*)>$/);
    const baseName = generic ? generic[1] : text;
    const info = bySimpleName.get(baseName);
    if (!info) throw new Error("library: unknown type " + text);
    if (!generic || generic[2].trim() === "?") return classType(info);
    return classType(info, splitTopLevel(generic[2]).map((part) => parseType(part, typeParameters)));
  }

  for (const { info, header, lines } of pending) {
    const extendsMatch = header.match(/extends ([\w<>, ]+?)(?= implements|$)/);
    const implementsMatch = header.match(/implements (.+)$/);
    if (extendsMatch) {
      const supers = splitTopLevel(extendsMatch[1]).map((part) => parseType(part, info.typeParameters));
      if (info.kind === "interface") info.interfaces.push(...supers);
      else info.superclass = supers[0];
    }
    if (implementsMatch) info.interfaces.push(...splitTopLevel(implementsMatch[1]).map((part) => parseType(part, info.typeParameters)));
    if (info.kind === "class" && !info.superclass && info !== object) info.superclass = classType(object);

    // Count overloads so runtime names only carry descriptors when they must.
    const nameCounts = new Map<string, number>();
    for (const line of lines) {
      const name = line.match(/(\w+)\(/)?.[1];
      if (name && !line.startsWith("~") && !line.startsWith("new")) nameCounts.set(name, (nameCounts.get(name) ?? 0) + 1);
    }

    for (const line of lines) {
      if (line.startsWith("~")) {
        unsupportedMethods.set(info, new Set(line.slice(1).trim().split(/\s+/)));
        continue;
      }
      const [signature, runtimeName] = line.split("=>").map((part) => part.trim());
      const fieldMatch = signature.match(/^static final ([\w<>\[\]]+) (\w+)(?: = (.*))?$/);
      if (fieldMatch) {
        const [, typeText, name, valueText] = fieldMatch;
        const type = parseType(typeText, []);
        const field: FieldInfo = {
          name, type, isStatic: true, isFinal: true, isPrivate: false, owner: info,
          jsName: `$rt.F.${info.name}_${name}`,
        };
        if (valueText !== undefined) field.constant = constantFromText(valueText, type);
        info.fields.set(name, field);
        continue;
      }
      const blocking = /!\s*$/.test(signature);
      const cleaned = signature.replace(/!\s*$/, "").trim();
      const methodMatch = cleaned.match(/^((?:static |abstract )*)(?:<(\w+)> )?(?:([\w<>\[\]?, ]+?) )?(\w+|new) ?\(([^)]*)\)(?: throws ([\w, ]+))?$/);
      if (!methodMatch) throw new Error("library: bad method line " + line);
      const [, modifiers, methodTypeParameter, returnText, name, parameterText, throwsText] = methodMatch;
      const methodTypeParameters = methodTypeParameter ? [methodTypeParameter] : [];
      const inScope = [...info.typeParameters, ...methodTypeParameters];
      const parameterTexts = parameterText.trim() ? splitTopLevel(parameterText) : [];
      const parameters = parameterTexts.map((text) => parseType(text, inScope));
      const isConstructor = name === "new";
      const descriptor = parameters.map(shortDescriptor).join("");
      const method: MethodInfo = {
        name: isConstructor ? "<init>" : name, owner: info, parameters,
        parameterNames: parameters.map((_parameter, index) => "arg" + index),
        varargs: parameterTexts.some((text) => text.trim().endsWith("...")),
        returnType: isConstructor ? classType(info) : parseType(returnText, inScope),
        isStatic: modifiers.includes("static"), isAbstract: modifiers.includes("abstract"), isPrivate: false,
        isConstructor, typeParameters: methodTypeParameters,
        throws: throwsText ? throwsText.split(",").map((text) => parseType(text, [])) : [],
        jsName: "", blocking,
        runtime: runtimeName ?? (isConstructor
          ? `${info.name}_new_${descriptor}`
          : (nameCounts.get(name) ?? 0) > 1 ? `${info.name}_${name}_${descriptor}` : `${info.name}_${name}`),
      };
      if (isConstructor) info.constructors.push(method);
      else info.methods.push(method);
    }
  }

  // The Throwable family can be extended by student classes, so their
  // constructors follow the same protocol as student classes do.
  for (const info of classes.values()) {
    if (!info.unsupported && isThrowableClass(info, classes)) {
      info.isThrowable = true;
      if (info.qualifiedName !== "java.lang.Throwable") {
        const throwable = classes.get("java.lang.Throwable")!;
        info.constructors = throwable.constructors.map((constructor) => ({ ...constructor, owner: info, returnType: classType(info) }));
        if (info.isChecked === false && info.superclass?.tag === "class" && info.superclass.classInfo.isChecked
            && !["java.lang.RuntimeException", "java.lang.Error"].includes(info.qualifiedName)) {
          info.isChecked = !isSubclassByName(info, "java.lang.RuntimeException", classes) && !isSubclassByName(info, "java.lang.Error", classes);
        }
      }
      for (const constructor of info.constructors) {
        constructor.runtime = undefined;
        constructor.jsName = "$c_" + constructor.parameters.map(erasedDescriptor).join("$");
      }
    }
  }
  for (const info of classes.values()) {
    if (info.isThrowable) info.isChecked = !isSubclassByName(info, "java.lang.RuntimeException", classes)
      && !isSubclassByName(info, "java.lang.Error", classes);
  }

  for (const [qualifiedName, primitiveName] of Object.entries({
    "java.lang.Integer": "int", "java.lang.Long": "long", "java.lang.Double": "double", "java.lang.Float": "float",
    "java.lang.Boolean": "boolean", "java.lang.Character": "char", "java.lang.Byte": "byte", "java.lang.Short": "short",
  })) {
    void primitiveName;
    BOXED_TYPES.set(qualifiedName, classType(classes.get(qualifiedName)!));
  }
  // Boolean.TRUE / FALSE reference the Boolean type, known only now.
  const booleanClass = classes.get("java.lang.Boolean")!;
  for (const name of ["TRUE", "FALSE"]) booleanClass.fields.get(name)!.type = classType(booleanClass);

  cached = {
    classes, packages, unsupportedMethods, object,
    string: classes.get("java.lang.String")!,
    lookup: (qualifiedName) => classes.get(qualifiedName),
  };
  return cached;
}

function isThrowableClass(info: ClassInfo, classes: Map<string, ClassInfo>): boolean {
  return isSubclassByName(info, "java.lang.Throwable", classes);
}

function isSubclassByName(info: ClassInfo, qualifiedName: string, classes: Map<string, ClassInfo>): boolean {
  let walker: ClassInfo | undefined = info;
  while (walker) {
    if (walker.qualifiedName === qualifiedName) return true;
    walker = walker.superclass?.tag === "class" ? walker.superclass.classInfo : undefined;
  }
  void classes;
  return false;
}

function shortDescriptor(type: JavaType): string {
  switch (type.tag) {
    case "primitive": return ({ int: "I", long: "J", double: "D", float: "F", boolean: "Z", char: "C", byte: "B", short: "S" })[type.name];
    case "array": return "A" + shortDescriptor(type.element);
    case "class": return type.classInfo.name;
    case "typeVariable": return "E";
    default: return "X";
  }
}

function splitTopLevel(text: string): string[] {
  const parts: string[] = [];
  let depth = 0, start = 0;
  for (let index = 0; index < text.length; index++) {
    if (text[index] === "<") depth++;
    else if (text[index] === ">") depth--;
    else if (text[index] === "," && depth === 0) { parts.push(text.slice(start, index).trim()); start = index + 1; }
  }
  parts.push(text.slice(start).trim());
  return parts.filter(Boolean);
}

function constantFromText(text: string, type: JavaType): string | number | boolean | bigint {
  if (type.tag === "primitive" && type.name === "long") return BigInt(text.replace(/L$/, ""));
  if (type.tag === "primitive" && type.name === "float") return Math.fround(Number(text.replace(/F$/, "")));
  return Number(text);
}

/** The classes every file sees without an import. */
export const AUTO_IMPORTED_PACKAGE = "java.lang";
