const shell = require('shelljs');
const { toMatchPdfSnapshot } = require('jest-pdf-snapshot');
expect.extend({ toMatchPdfSnapshot });

shell.cd('__test__');

afterAll(() => {
  shell.rm('test.pdf', 'test.satysfi-aux');
})

test('Confirm that satysfi is installed', () => {
  expect(shell.exec('satysfi -v').code).toBe(0);
})

test(`Compile class file`, () => {
  const code = shell.exec(`satysfi test.saty -o test.pdf`, {silent: true}).code;

  expect(code).toBe(0);
  expect('test.pdf').toMatchPdfSnapshot();
});
