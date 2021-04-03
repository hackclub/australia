// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  const fetch = require("node-fetch");
  let wildcard = req.headers.host.split(".")[0];
  console.log("hi!");
  const { host } = req.headers;
  if (
    typeof req.query.path != "undefined" ? req.query.path.includes(".") : false
  ) {
    res.redirect(
      `https://${
        wildcard == "australia" || wildcard == "localhost:3000"
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
    res.redirect(
      `https://${
        wildcard == "australia" || wildcard == "localhost:3000"
          ? ""
          : `${wildcard}.`
      }hackclub.com/${
        typeof req.query.path == "undefined" ? "" : req.query.path
      }`
    );
  } else {
    console.log(
      `https://${
        wildcard == "australia" || wildcard == "localhost:3000"
          ? ""
          : `${wildcard}.`
      }hackclub.com/${
        typeof req.query.path == "undefined" ? "" : req.query.path
      }`
    );
    let html = await fetch(
      `https://${
        wildcard == "australia" || wildcard == "localhost:3000"
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
    console.log(wildcard);
    res.send(html.replaceAll("/_next", "https://hackclub.com/_next"));
  }
};
