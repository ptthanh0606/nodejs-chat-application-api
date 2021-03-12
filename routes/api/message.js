const router = require("express").Router();
const { message, contact } = require("../../models");
const { checkSendMessageBody } = require("../../_patterns/message");
const { responsePattern } = require("../../_patterns/response");

router.get("/", (req, res) => {
  const conversationId = req.query.conversationId || "";
  const uuid = req.query.uuid || "";

  if (conversationId && uuid) {
    message.findOne({ conversationId }, (err, result) => {
      if (err) console.log(err);
      else {
        if (result) {
          contact
            .findOne({ ownerID: uuid }, { savedPeople: 1 }) // Get saved people in user contact
            .then(({ savedPeople }) => {
              res.send(
                responsePattern(
                  200,
                  "",
                  result.messages.map((message) => {
                    const people = savedPeople.find(
                      (people) => people.uuid === message.uuid
                    ); // Map people in contact's nickname with recipient's nickname

                    if (people) {
                      // If people in user contact
                      return {
                        content: message.content,
                        uuid: message.uuid,
                        nickname: people.nickname,
                      };
                    } else {
                      // Or not
                      return {
                        content: message.content,
                        uuid: message.uuid,
                        nickname: message.uuid,
                      };
                    }
                  })
                )
              );
            });
        } else res.send(responsePattern(200, "", []));
      }
    });
  } else
    res
      .status(400)
      .send(
        (!conversationId && "conversationId field is missing") ||
          (!uuid && "uuid field is missing")
      );
});

router.put("/sendMessage", (req, res) => {
  console.log("called");
  const [isValid, responseMsg] = checkSendMessageBody(
    req.body,
    "Message sent!"
  );
  const conversationId = req.query.conversationId || null;

  if (conversationId) {
    if (isValid) {
      message
        .findOneAndUpdate(
          { conversationId },
          {
            $push: {
              messages: req.body,
            },
          },
          {
            useFindAndModify: false,
          }
        )
        .then((result) => {
          res.status(200).send(responsePattern(200, "Message added!", result));
        })
        .catch((err) => {
          res.status(500).send(responsePattern(500, err.message));
        });
    } else res.status(400).send(responsePattern(400, responseMsg));
  } else
    res
      .status(400)
      .send(responsePattern(400, "Please provide a conversationId to query!"));
});

router.put("/limit", (req, res) => {
  const conversationId = "6040caf8c0be53f4fa6e4974";
  message.findOne({ conversationId }, { messages: 1 }).then(({ messages }) => {
    let limited = [...messages];
    limited.length = 3;
    message
      .findOneAndUpdate(
        { conversationId },
        {
          $set: {
            messages: [...limited],
          },
        }
      )
      .then((result) => res.send(result));
  });
});

module.exports = router;
