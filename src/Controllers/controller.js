import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import ENV from "../../confiq.js";

/** POST : http://localhost:8000/hello-car/api/v1/register
 * @param:{
 *"username":'Rabius'
 * "email":'muhammad@gmail.com'
 * "phone_number":"01771313713"
 * "password":"12364789"
 * "car_model":'Suzuki'
 *
 * }
 */
export const register = async (req, res) => {
  try {
    const { username, password, email, phoneNumber, cardModel } = req.body;

    // check exist user -
    const existUsername = new Promise(async(resolve, reject) => {
      await userModel.findOne({ username }, function (error, user) {
        if (error) reject(new Error(error));
        if (user) reject({ error: "Please use unique username" });

        resolve();
      });
    });

    // check exist email --
    const existEmail = new Promise( (resolve, reject) => {
     userModel.findOne({ email }, function (error, email) {
       if (error) reject(new Error(error));
       if (email) reject({ error: "Please use unique email" });

       resolve();
     });
    });

    Promise.all([existUsername, existEmail])
      .then(() => {
        if (password) {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              const user = new userModel({
                username,
                password: hashedPassword,
                email,
                phoneNumber,
                cardModel: cardModel || "",
              });

              // Final Result
              user
                .save()
                .then((result) =>
                  res
                    .status(201)
                    .send({ message: "User Registration Successfully" })
                )
                .catch((error) => res.status(500).send({ error }));
            })

            .catch((error) => {
              return res.status(500).send({
                error: "Enable Hash Password",
              });
            });
        }
      })

      .catch((error) => {
        return res.status(500).send({
          error: "Enable  Password",
        });
      });
  } catch (err) {
    return res.status(500).send(err);
  }
};

/** POST : http://localhost:8000/hello-car/api/v1/login
 * @param:{
 * email:
 * password:
  }
 */
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    await userModel.findOne({ email })
    .then((user) => {
      
      console.log(user);
        bcrypt.compare(password, user.password)
          .then((passwordCheck) => {
            if (!passwordCheck) {
              res.status(400).send({ error: "Don't have password!" });

              // create jwt
              const token = Jwt.sign(
                {
                  userId: user._id,
                  username: user.email,
                },
                ENV.JWT_SECRET,
                { expiresIn: "24h" }
              );

              return res.status(200).send({
                message: "Login Successfully",
                email: user.email,
                token,
              });
            }
          })
          .catch((error) => {
            return res.status(400).send({ error: "Password does not match !" });
          });
      })
      .catch((error) => {
        return res.status(404).send({ error: "User not found !" });
      });
  } catch (err) {
    res.status(500).send({ err });
  }
};

/** GET : http://localhost:8000/hello-car/api/v1/user/indiviual-user
 * @param:{
 * username:
 * email:
 * phone_number:
 * password:
 * address:
 * car_model:
 *
 * }
 */
export const indiviualUser = async (req, res) => {
  res.json("getuser data Route");
};

/** PUT : http://localhost:8000/hello-car/api/v1/update-user
 * @param:{
 * username:
 * email:
 * phone_number:
 * password:
 * address:
 * car_model:
 *
 * }
 */
export const updateUser = async (req, res) => {
  res.json("Update data Route");
};
/** GET : http://localhost:8000/hello-car/api/v1/notification/generate-otp
 * @param:{
 * username:
 * email:
 * phone_number:
 * password:
 * address:
 * car_model:
 *
 * }
 */
export const generateOTP = async (req, res) => {
  res.json("OTP generate Route");
};
/** GET : http://localhost:8000/hello-car/api/v1/verify-opt
 * @param:{
 * username:
 * email:
 * phone_number:
 * password:
 * address:
 * car_model:
 *
 * }
 */
export const VerifyOTP = async (req, res) => {
  res.json("Verify Route");
};

// When OTP Is Valid
/** GET : http://localhost:8000/hello-car/api/v1/createResetSession
 * @param:{
 * username:
 * email:
 * phone_number:
 * password:
 * address:
 * car_model:
 *
 * }
 */
export const createResetSession = async (req, res) => {
  res.json("createResetSession Route");
};

/** PUT : http://localhost:8000/hello-car/api/v1/update-passowrd
 * @param:{
 * username:
 * email:
 * phone_number:
 * password:
 * address:
 * car_model:
 *
 * }
 */
export const resetPassword = async (req, res) => {
  res.json("resetPassword Route");
};
