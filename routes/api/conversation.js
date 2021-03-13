const router = require("express").Router();
const http = require("http");
const { conversation, message, contact } = require("../../models");
const { checkStartConversationBody } = require("../../_patterns/conversation");
const { responsePattern } = require("../../_patterns/response");
const { compareArrayEquals } = require("../../_utils/arrayCompare");

router.get("/", (req, res) => {
  const uuid = req.query.uuid || "";

  contact.findOne({ ownerID: uuid }).then((contact) => {
    conversation.find({}, (err, result) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        const filteredResult = result.filter(({ recipients }) => {
          return recipients.some((rec) => rec === uuid);
        });

        res.send(
          responsePattern(
            200,
            filteredResult.length ? "" : "No conversations",
            filteredResult.map((con) => {
              return {
                _id: con.id,
                recipients: con.recipients.map((rec) => {
                  const people =
                    (contact &&
                      contact.savedPeople.find(
                        (people) => people.uuid === rec
                      )) ||
                    null;

                  if (people) {
                    return people.nickname;
                  } else return rec;
                }),
              };
            })
          )
        );
      }
    });
  });
});

router.post("/startConversation", (req, res) => {
  const [isValid, responseMessage] = checkStartConversationBody(req.body);
  const uuid = req.query.uuid || "";

  if (isValid) {
    conversation.find({}, (err, result) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        const filteredResult = result.filter(({ recipients }) => {
          return compareArrayEquals(recipients, [uuid, ...req.body]);
        });

        if (!filteredResult.length) {
          conversation
            .create({
              recipients: [uuid, ...req.body],
            })
            .then((result) =>
              message
                .create({
                  messages: [],
                  conversationId: result._id,
                })
                .then((msgdoc) => {
                  res.send(
                    responsePattern(200, "Conversation started!", result)
                  );
                })
            );
        } else {
          conversation.findOne(
            { recipients: [uuid, ...req.body] },
            (err, doc) => {
              res.send(responsePattern(200, "", doc));
            }
          );
        }
      }
    });
  } else res.status(400).send(responseMessage);
});

module.exports = router;
