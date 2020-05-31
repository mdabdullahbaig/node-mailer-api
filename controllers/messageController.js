const Message = require("../models/message");
const configDB = require("../config/customApiKey");
var nodemailer = require("nodemailer");
const ejs = require("ejs");

// const getAllMessage = async (req, res, next) => {
//   try {
//     messages = await Message.find({});
//   } catch (err) {
//     console.log(err);
//   }
//   res.json({
//     all_message: messages.map(message =>
//       message.toObject({
//         getters: true
//       })
//     )
//   });
// };

const createMessage = async (req, res, next) => {
  const { clientName, clientEmail, clientSubject, clientMessage } = req.body; // title: req.body.title
  const createdMessage = new Message({
    clientName,
    clientEmail,
    clientSubject,
    clientMessage
  });

  try {
    var mailserverifo = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: "565",
      ssl: true,
      auth: {
        user: configDB.username,
        pass: configDB.password
      }
    });
    ejs.renderFile(
      __dirname + "/emailTemp.ejs",
      { clientName, clientEmail, clientMessage },
      function(err, data) {
        if (err) {
          console.log(err);
        } else {
          var Mailinfo = {
            from: configDB.username,
            to: "abdullahhussainbaig1997@gmail.com",
            bcc: clientEmail,
            subject: clientSubject,
            html: data
          };

          mailserverifo.sendMail(Mailinfo, function(error, info) {
            if (error) {
              console.log(error);
              res.json({
                message: "fail"
              });
            } else {
              console.log("Email Send Success: " + info.response);
              res.json({
                message: "success"
              });
            }
          });
        }
      }
    );
    console.log("message has been sent.");
    await createdMessage.save();
    console.log("save to database");
  } catch (err) {
    console.log(err);
  }

  res.status(201).json({
    your_message: createdMessage.toObject({
      getters: true
    })
  });
};

// exports.getAllMessage = getAllMessage;
exports.createMessage = createMessage;
