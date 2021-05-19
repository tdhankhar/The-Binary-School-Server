const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");

// check if www is required in all the calls or not or what is the exact role of it
const oauthHelper = (accessToken, url) => {
  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.googleSignIn = (req, res) => {
  // request auth api to fetch user info
  const url = "https://www.googleapis.com/oauth2/v3/userinfo";
  oauthHelper(req.body.access_token, url)
    .then((userInfo) => {
      // match userInfo.sub with req.body.user_id
      if (userInfo.sub !== req.body.user_id) {
        return res.status(401).json({
          msg: "User ID not valid",
        });
      }
      // handle user database
      // create new JWT and return JWT for authorization
      const jwt_token = jwt.sign(
        { user_id: userInfo.id },
        process.env.SECRET_KEY
      );
      return res.status(200).json({
        jwt_token,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
exports.facebookSignIn = (req, res) => {
  // request auth api to fetch user info
  const url = "https://graph.facebook.com/v10.0/me?fields=id";
  oauthHelper(req.body.access_token, url)
    .then((userInfo) => {
      // match userInfo.id with req.body.user_id
      if (userInfo.id !== req.body.user_id) {
        return res.status(401).json({
          msg: "User ID not valid",
        });
      }
      // handle user database
      // create new JWT and return JWT for authorization
      const jwt_token = jwt.sign(
        { user_id: userInfo.id },
        process.env.SECRET_KEY
      );
      return res.status(200).json({
        jwt_token,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
