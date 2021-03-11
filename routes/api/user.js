const { user } = require("../../models");
const { responsePattern } = require("../../_patterns/response");
const {
  checkUserPostPattern,
  checkUserPutPattern,
  checkUserLoginBody,
} = require("../../_patterns/user");

const router = require("express").Router();

router.post("/login", (req, res) => {
  const [isValid, responseMessage] = checkUserLoginBody(
    req.body,
    "User is existed!"
  );

  if (isValid) {
    user.findOne(
      req.body,
      {
        uuid: 1,
        email: 1,
        displayName: 1,
      },
      (err, result) => {
        if (err || !result) {
          res.status(404).send("User not found!");
        } else {
          res.send(responsePattern(200, responseMessage, result));
        }
      }
    );
  } else res.status(400).send(responseMessage);
});

router.get("/", (req, res) => {
  if (req.query) {
    let param = {};

    for (const key in req.body) {
      param = {
        ...param,
        [key]: req.body[key],
      };
    }

    user.findOne(param, (err, data) => {
      if (err || !data) {
        res.send(responsePattern(404, "User not found", null));
      } else res.send(responsePattern(res.statusCode, res.statusMessage, data));
    });
  } else {
    user.find({}, (err, data) => {
      if (err || !data) {
        res.send(responsePattern(404, "No user in database", null));
      } else res.send(responsePattern(res.statusCode, res.statusMessage, data));
    });
  }
});

router.post("/", (req, res) => {
  const [isValid, responseMessage] = checkUserPostPattern(
    req.body,
    "User added!"
  );

  if (isValid) {
    user
      .create(req.body)
      .then((result) => {
        res.send(responsePattern(res.statusCode, responseMessage, result));
      })
      .catch((err) => {
        res.send(responsePattern(500, err.message, {}));
      });
  } else {
    res.send(responsePattern(400, responseMessage, null));
  }
});

router.put("/", (req, res) => {
  const [isValid, responseMessage] = checkUserPutPattern(
    req.body,
    "User updated!"
  );

  if (isValid) {
    user
      .findOneAndUpdate({ uuid: req.query.uuid }, { $set: req.body })
      .then((result) => {
        res.send(responsePattern(res.statusCode, res.statusMessage, result));
      })
      .catch((err) => {
        res.send(responsePattern(500, err.statusMessage, {}));
      });
  } else res.send(responsePattern(400, responseMessage, {}));
});

router.delete("/", (req, res) => {
  let uuid = req.query.uuid;

  user
    .findOneAndDelete({ uuid })
    .then((result) => {
      res.send(responsePattern(res.statusCode, res.statusMessage, result));
    })
    .catch((err) => {
      res.send(responsePattern(500, err.message, {}));
    });
});

module.exports = router;
