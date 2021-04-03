// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  const fetch = require("node-fetch");
  let wildcard = req.headers.host.split(".")[0];

  const { host } = req.headers;
  if(req.query.path.inculdes('.')){
    res.redirect(`https://${wildcard == "australia" ? "" : `${wildcard}.`}hackclub.com/${req.query.path}`)
  }
  else{
    let html = await fetch(
      `https://${wildcard == "australia" ? "" : `${wildcard}.`}hackclub.com/${req.query.path}`
    )
      .then((r) => r.text())
      .catch(() =>
        res.status(500).send("Encountered error serving profile page")
      );
    console.log(wildcard);
    res.send(html);
  }
  
};
