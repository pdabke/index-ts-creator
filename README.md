# index-ts-creator
index-ts-creator is a simple utility to create an index.ts files that imports and re-exports all 
Typescript modules in a directory. For example if you have the following directory structure in
your typescript project:
```
<project-root>
  |
  - src
      Class1.ts
      Class2.ts
```
Running `index-ts-creator src` from project root directory will generate `index.ts` file in the
`src` directory with the following content:
```
export * from "./Class1";
export * from "./Class2";
```
## Usage
Install globally or locally
```
npm i [-g] @nabh/index-ts-creator
```
Create index.ts file in current directory
```
index-ts-creator
```

Create index.ts file in directory `src`
```
index-ts-creator src
```