const fs = require("fs");
const shell = require("shelljs");
const tmp = require("tmp");

const { toMatchPdfSnapshot } = require("jest-pdf-snapshot");

expect.extend({ toMatchPdfSnapshot });

shell.cd("__test__");

function compileSatysfi(src) {
  const tmpFile = tmp.fileSync();

  const { code: exitCode } = shell.exec(`satysfi ${src} -o ${tmpFile.name}`, {
    silent: true,
  });

  const pdfBuffer = fs.readFileSync(tmpFile.name);
  tmpFile.removeCallback();

  return {
    exitCode,
    pdfBuffer
  };
}

afterAll(() => {
  shell.rm("*test.satysfi-aux");
});

test("Satysfi is installed", () => {
  expect(shell.exec("satysfi -v").code).toBe(0);
});

describe(`yabaitech SATySFi class file`, () => {
  it(`Generates table-of-contents pages as expected`, () => {
    const result = compileSatysfi("toc/toc.test.saty");

    expect(result.exitCode).toBe(0);
    expect(result.pdfBuffer).toMatchPdfSnapshot();
  });

  it(`Generates a colophon page as expected`, () => {
    const result = compileSatysfi("colophon/colophon.test.saty");

    expect(result.exitCode).toBe(0);
    expect(result.pdfBuffer).toMatchPdfSnapshot();
  });

  it(`Generates a bibligraphy section as expected`, () => {
    const result = compileSatysfi("bibliography/bibliography.test.saty");

    expect(result.exitCode).toBe(0);
    expect(result.pdfBuffer).toMatchPdfSnapshot();
  });

  it(`Integrates each components as expected`, () => {
    const result = compileSatysfi("integration/integration.test.saty");

    expect(result.exitCode).toBe(0);
    expect(result.pdfBuffer).toMatchPdfSnapshot();
  });
});
