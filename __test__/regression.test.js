const shell = require("shelljs");

const { toMatchPdfSnapshot } = require("jest-pdf-snapshot");

expect.extend({ toMatchPdfSnapshot });

shell.cd("__test__");

function compileSatysfi(src, dst) {
  const { code } = shell.exec(`satysfi ${src} -o ${dst}`, {
    silent: true,
  });

  return code;
}

afterAll(() => {
  shell.rm("*test.pdf", "*test.satysfi-aux");
});

test("Satysfi is installed", () => {
  expect(shell.exec("satysfi -v").code).toBe(0);
});

describe(`yabaitech SATySFi class file`, () => {
  it(`Generates table-of-contents pages as expected`, () => {
    const code = compileSatysfi("toc/toc.test.saty", "toc.test.pdf");

    expect(code).toBe(0);
    expect("toc.test.pdf").toMatchPdfSnapshot();
  });

  it(`Integrates each components as expected`, () => {
    const code = compileSatysfi(
      "integration/integration.test.saty",
      "integration.test.pdf"
    );

    expect(code).toBe(0);
    expect("integration.test.pdf").toMatchPdfSnapshot();
  });
});
