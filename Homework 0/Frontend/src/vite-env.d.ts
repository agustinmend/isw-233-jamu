/// <reference types="vite/client" />

declare module '*.hbs' {
  const template: Function;
  export default template;
}

declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}