// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  const fetch = require("node-fetch");
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
    console.log(
      html
        .replace(
          "<head>",
          "<head> <style>body{transform: rotate(180deg)}</style>"
        )
        .replace('content="Hack Club"', 'content="Australia Hack Club"')
    );
    res.send(
      html
        .replace(
          `<script type="application/ld+json">{"@context":"http://schema.org","@type":"Organization","name":"Hack Club","url":"https://hackclub.com/","logo":"https://hackclub.com/social.png","sameAs":["https://twitter.com/hackclub","https://github.com/hackclub","https://www.instagram.com/starthackclub","https://www.facebook.com/Hack-Club-741805665870458","https://www.youtube.com/channel/UCQzO0jpcRkP-9eWKMpJyB0w"],"contactPoint":[{"@type":"ContactPoint","email":"team@hackclub.com","contactType":"customer support","url":"https://hackclub.com/"}]}</script>`,
          ""
        )
        .replace(
          "<head>",
          "<head> <style>body{transform: rotate(180deg)}</style>"
        )
        .replace('"Don’t run your coding club alone – Hack Club"', 'content="Australia Hack Club"')
    );
  }
};
