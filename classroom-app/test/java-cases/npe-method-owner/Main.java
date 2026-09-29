import java.util.*;
public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> a = null; List<Integer> l = null;
        String s = null; Integer i = null; StringBuilder b = null; Random r = null; Object o = null;
        Scanner sc = null; Double d = null;
        try { a.hashCode(); } catch (NullPointerException e) { System.out.println(e.getMessage()); }
        try { a.toString(); } catch (NullPointerException e) { System.out.println(e.getMessage()); }
        try { l.toString(); } catch (NullPointerException e) { System.out.println(e.getMessage()); }
        try { l.equals(a); } catch (NullPointerException e) { System.out.println(e.getMessage()); }
        try { s.hashCode(); } catch (NullPointerException e) { System.out.println(e.getMessage()); }
        try { i.toString(); } catch (NullPointerException e) { System.out.println(e.getMessage()); }
        try { i.compareTo(5); } catch (NullPointerException e) { System.out.println(e.getMessage()); }
        try { b.toString(); } catch (NullPointerException e) { System.out.println(e.getMessage()); }
        try { b.hashCode(); } catch (NullPointerException e) { System.out.println(e.getMessage()); }
        try { r.toString(); } catch (NullPointerException e) { System.out.println(e.getMessage()); }
        try { o.toString(); } catch (NullPointerException e) { System.out.println(e.getMessage()); }
        try { sc.toString(); } catch (NullPointerException e) { System.out.println(e.getMessage()); }
        try { d.equals(1.0); } catch (NullPointerException e) { System.out.println(e.getMessage()); }
        try { for (int x : a) System.out.println(x); } catch (NullPointerException e) { System.out.println(e.getMessage()); }
        try { for (int x : l) System.out.println(x); } catch (NullPointerException e) { System.out.println(e.getMessage()); }
        try { a.add(3); } catch (NullPointerException e) { System.out.println(e.getMessage()); }
    }
}
