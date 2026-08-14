import { scanUrl } from "../lib/scanner";

const url = process.argv[2];
if (!url) {
  console.error("Usage: npm run scan -- https://example.com/help");
  process.exit(1);
}

scanUrl(url)
  .then((report) => {
    console.log(JSON.stringify(report, null, 2));
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
