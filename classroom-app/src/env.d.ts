/* Vite's build-time constants.

   Only BASE_URL is used - the game editor reaches the site's Pixel Art
   Maker relative to it - so that one field is declared here rather than
   pulling in the whole of vite/client's ambient surface. */
interface ImportMeta {
  readonly env: { readonly BASE_URL: string };
}
