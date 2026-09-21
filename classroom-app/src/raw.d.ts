/* Vite's `?raw` import: the file arrives as text, not as a module.

   Used for the game engine, which has to be inlined into a sandboxed
   preview frame as a <script>. It cannot be bundled and imported normally,
   because an opaque-origin frame shares nothing with the page that made it. */
declare module "*.js?raw" {
  const source: string;
  export default source;
}
