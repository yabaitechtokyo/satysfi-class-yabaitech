const shell = require('shelljs');
const { toMatchPdfSnapshot } = require('jest-pdf-snapshot');
expect.extend({ toMatchPdfSnapshot });

shell.cd('__test__');

afterAll(() => {
  shell.rm('*test.pdf', '*test.satysfi-aux');
})

test('Confirm that satysfi is installed', () => {
  expect(shell.exec('satysfi -v').code).toBe(0);
})

describe(`yabaitech SATySFi class file`, () => {
  it(`Generates table-of-contents pages as expected`, () => {
    const code = shell.exec(`satysfi toc/toc.test.saty -o toc.test.pdf`, {silent: true}).code;

    expect(code).toBe(0);
    expect('toc.test.pdf').toMatchPdfSnapshot();
  });

  it(`Generates the whole pages as expected`, () => {
    const code = shell.exec(`satysfi integration/integration.test.saty -o integration.test.pdf`, {silent: true}).code;

    expect(code).toBe(0);
    expect('integration.test.pdf').toMatchPdfSnapshot();
  });
})
