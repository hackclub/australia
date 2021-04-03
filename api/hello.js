// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  const fetch = require("node-fetch");
  const ogs = require("open-graph-scraper");
  var upsidedown = require("upsidedown");
  let wildcard = req.headers.host.split(".")[0];
  console.log(wildcard);
  const { host } = req.headers;
  if (
    typeof req.query.path != "undefined" ? req.query.path.includes(".") : false
  ) {
    res.redirect(
      `https://${
        wildcard == "australia" ||
        wildcard == "localhost:3000" ||
        wildcard.includes("localhost")
          ? ""
          : `${wildcard}.`
      }hackclub.com/${
        typeof req.query.path == "undefined" ? "" : req.query.path
      }`
    );
  } else if (
    typeof req.query.path != "undefined"
      ? req.query.path.includes("_next")
      : false
  ) {
    console.log(req.query.path);
    res.redirect(
      `https://${
        wildcard == "australia" ||
        wildcard == "localhost:3000" ||
        wildcard.includes("localhost")
          ? ""
          : `${wildcard}.`
      }hackclub.com/${
        typeof req.query.path == "undefined" ? "" : req.query.path
      }`
    );
  } else {
    console.log(
      `https://${
        wildcard == "australia" ||
        wildcard == "localhost:3000" ||
        wildcard.includes("localhost")
          ? ""
          : `${wildcard}.`
      }hackclub.com/${
        typeof req.query.path == "undefined" ? "" : req.query.path
      }`
    );
    let html = await fetch(
      `https://${
        wildcard == "australia" ||
        wildcard == "localhost:3000" ||
        wildcard.includes("localhost")
          ? ""
          : `${wildcard}.`
      }hackclub.com/${
        typeof req.query.path == "undefined" ? "" : req.query.path
      }`
    )
      .then((r) => r.text())
      .catch(() =>
        res.status(500).send("Encountered error serving profile page")
      );
    const options = {
      url: `https://${
        wildcard == "australia" ||
        wildcard == "localhost:3000" ||
        wildcard.includes("localhost")
          ? ""
          : `${wildcard}.`
      }hackclub.com/${
        typeof req.query.path == "undefined" ? "" : req.query.path
      }`,
    };
    ogs(options, (error, results, response) => {
      console.log("error:", error); // This is returns true or false. True if there was a error. The error it self is inside the results object.
      console.log("results:", results); // This contains all of the Open Graph results
      console.log(
        "Don’t run your coding club alone – Hack Club".replace(
          new RegExp(results.ogTitle, "g"),
          upsidedown(results.ogTitle)
        )
      );
      console.log(
        `https://flipped-images.hackclub.dev/og.png?theme=light&images=${results.ogImage.url}`
      );
      res.send(
        html
          .replace(
            "<head>",
            "<head> <style>body{transform: rotate(180deg)}</style>"
          )
          .replace(
            new RegExp(results.twitterDescription, "g"),
            upsidedown(
              results.twitterDescription ? results.twitterDescription : ""
            )
          )
          .replace(
            new RegExp(results.ogTitle, "g"),
            upsidedown(results.ogTitle ? results.ogTitle : "")
          )
          .replace(
            new RegExp(results.ogSiteName, "g"),
            upsidedown(results.ogSiteName ? results.ogSiteName : "")
          )
          .replace(
            new RegExp(results.twitterSite, "g"),
            upsidedown(results.twitterSite)
          )
          .replace(
            new RegExp(results.twitterImage.url, "g"),
            `https://flipped-images.hackclub.dev/og.png?theme=light&images=${results.ogImage.url
              .replace("https://", "https%3A%2F%2F")
              .replace(new RegExp("/", "g"), "%2F")}`
          )
          .replace(
            new RegExp(results.twitterImage.url, "g"),
            `https://flipped-images.hackclub.dev/og.png?theme=light&images=${results.ogImage.url
              .replace("https://", "https%3A%2F%2F")
              .replace(new RegExp("/", "g"), "%2F")}`
          )
          .replace(
            'https://assets.hackclub.com/favicons/favicon-32x32.png',
            'https://australia.hackclub.dev/favicon.ico'
          )
          .replace(
            'https://assets.hackclub.com/favicons/favicon-16x16.png',
            'https://australia.hackclub.dev/favicon.ico'
          )
      );
    });
  }
};
