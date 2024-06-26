const { signup, login } = require("../../Controllers/AuthController")
const UserModel = require("../../Models/Users")
const { hashPassword } = require("../../Middleware/hashPassword")
const { comparePassword } = require("../../Middleware/comparePassword")
const jwt = require("jsonwebtoken")

jest.mock("../../Models/Users")

jest.mock("../../Middleware/hashPassword", () => ({
  hashPassword: jest.fn(() => "hash password"),
}))

jest.mock("../../Middleware/comparePassword", () => ({
  comparePassword: jest.fn(() => "compare password"),
}))

const req = {
  body: {
    firstName: "FAKENAME",
    lastName: "FAKENAME",
    email: "email@gmail.com",
    password: "123456",
  },
}

const loginReq = {
  headers: {
    authorization: "fake-token",
  },
  body: {
    email: "email@gmail.com",
    password: "123456",
  },
}

const res = {
  status: jest.fn(x => x),
  send: jest.fn(x => x),
}

//Signup Tests
it("should send status code 409 when user exists", async () => {
  UserModel.findOne.mockImplementationOnce(() => ({
    id: 1,
    firstName: "ABCDEFG",
    lastName: "abcdef",
    email: "email@gmail.com",
    password: "123456",
  }))
  await signup(req, res)
  expect(res.status).toHaveBeenCalledWith(409)
  expect(res.send).toHaveBeenCalledTimes(2)
})

it("should send status code 201 when user created", async () => {
  UserModel.findOne.mockResolvedValueOnce(undefined)
  UserModel.create.mockResolvedValueOnce({
    id: 1,
    firstName: "ABCDEFG",
    lastName: "abcdef",
    email: "email",
    password: "123456",
  })
  await signup(req, res)
  expect(hashPassword).toHaveBeenCalledWith("123456")
  expect(res.status).toHaveBeenCalledWith(201)
  expect(res.send).toHaveBeenCalledTimes(1)
})

//End Signup Tests

//Login Tests
it("should send status code 403 when user does NOT exists", async () => {
  UserModel.findOne.mockImplementationOnce(undefined)
  await login(loginReq, res)
  expect(res.status).toHaveBeenCalledWith(403)
  expect(res.send).toHaveBeenCalledTimes(2)
})

it("should send status code 200 when user loggedin", async () => {
  UserModel.findOne.mockResolvedValueOnce({
    email: "email",
    password: "123456",
  })

  comparePassword.mockResolvedValue(true)
  jwt.sign = jest.fn().mockReturnValue("mockedJwtToken")

  await login(loginReq, res)
  expect(res.status).toHaveBeenCalledWith(200)
  expect(res.send).toHaveBeenCalledTimes(1)
})

it("should return 403 if password does not match", async () => {
  UserModel.findOne.mockResolvedValue({ email: "test@example.com", password: "hashedpassword" })
  comparePassword.mockResolvedValue(false)

  await login(loginReq, res)

  expect(res.status).toHaveBeenCalledWith(403)
  expect(res.send).toHaveBeenCalledTimes(2)
})

//End Login Tests
