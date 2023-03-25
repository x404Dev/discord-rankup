import { runGenerator } from 'ts-docgen';

runGenerator({
  existingOutput: '.tmp/typedoc-out.json',
  custom: 'docs/custom.yml',
  output: 'docs/docs.json',
  verbose: true,
});
