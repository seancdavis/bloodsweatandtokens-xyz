/// <reference path="../.astro/types.d.ts" />

declare module '*.txt?raw' {
  const content: string;
  export default content;
}
