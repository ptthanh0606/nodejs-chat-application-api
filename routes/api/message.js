const router = require("express").Router();
const { message, contact } = require("../../models");
const { responsePattern } = require("../../_patterns/response");

router.get("/", (req, res) => {
  const conversationId = req.query.conversationid || "";
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

module.exports = router;
