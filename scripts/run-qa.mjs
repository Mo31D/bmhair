import {build} from '../node_modules/.pnpm/esbuild@0.28.0/node_modules/esbuild/lib/main.js';
import {rm} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import path from 'node:path';

// Use the same locked compiler as the existing offline-preview tooling.
for (const entry of ['qa-source.tsx','qa-checkout.ts','qa-shades.ts']) {
  const output=path.resolve(`.qa-${entry.replace(/\.tsx?$/, '')}.mjs`);
  try {
    await build({entryPoints:[`scripts/${entry}`],outfile:output,bundle:true,platform:'node',format:'esm',packages:'external',jsx:'automatic',alias:{'next/navigation':'next/navigation.js'}});
    await import(pathToFileURL(output).href);
  } finally {await rm(output,{force:true});}
}
