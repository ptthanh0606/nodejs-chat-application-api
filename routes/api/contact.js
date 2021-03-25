const router = require("express").Router();
const { contact, user } = require("../../models");
const { checkAddContactPutBody } = require("../../_patterns/contact");
const { responsePattern } = require("../../_patterns/response");

router.get("/", (req, res) => {
  const uuid = req.query.uuid;

  if (uuid) {
    contact.findOne({ ownerID: uuid }, (err, data) => {
      if (err) {
        res.send(responsePattern(500, err.message));
      } else if (!data) {
        res.send(responsePattern(404, "Not found"));
      } else res.send(responsePattern(200, "", data));
    });
  } else {
    res.send(responsePattern(400, "uuid query is missing!"));
  }
});

router.post("/", (req, res) => {
  const uuid = req.query.uuid || "";

  if (!uuid) {
    res.send(responsePattern(400, "uuid field is missing or empty!"));
  } else {
    contact
      .create({
        ownerID: uuid,
        savedPeople: [],
      })
      .then((result) => {
        res.send(responsePattern(200, "Contact for user is created!", result));
      })
      .catch((err) => {
        res.send(responsePattern(500, err.message));
      });
  }
});

router.put("/addcontact", (req, res) => {
  const uuid = req.query.uuid || "";
  const [isValid, responseMsg] = checkAddContactPutBody(
    req.body,
    "Contact added!"
  );

  if (isValid) {
    if (uuid) {
      user.findOne({ uuid: req.body.uuid }).then((result) => {
        if (result) {
          contact
            .updateOne(
              { ownerID: uuid },
              {
                $push: { savedPeople: req.body },
              }
            )
            .then((result) => {
              res.send(responsePattern(200, responseMsg, result));
            })
            .catch((err) => {
              res.send(responsePattern(500, err.message));
            });
        } else res.status(400).send("User is not existed!");
      });
    } else res.send(responsePattern(400, "uuid field is missing!"));
  } else {
    res.send(responsePattern(400, responseMsg));
  }
});

module.exports = router;
