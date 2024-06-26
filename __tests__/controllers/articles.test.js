const { postArticle, getArticles, updateArticle, deleteArticle } = require("../../Controllers/ArticlesController")
const Articles = require("../../Models/Articles")

jest.mock("../../Models/Articles")

const req = {
  body: {
    title: "FAKENAME",
    content: "FAKENAME",
    date: "2024-02-02",
    image: "123456",
  },
}

const res = {
  status: jest.fn(x => x),
  send: jest.fn(x => x),
}

//Get Articles
it("should return 200 and articles when articles are found", async () => {
  Articles.find.mockResolvedValue({
    title: "Title",
    content: "Content",
    date: "Date",
    image: "Image",
  })

  await getArticles(req, res)

  expect(Articles.find).toHaveBeenCalled()
  expect(res.status).toHaveBeenCalledWith(200)
  expect(res.send).toHaveBeenCalledTimes(1)
})

it("should return 403 and articles when articles are not found", async () => {
  Articles.find.mockResolvedValue([])

  await getArticles(req, res)

  expect(Articles.find).toHaveBeenCalled()
  expect(res.status).toHaveBeenCalledWith(403)
  expect(res.send).toHaveBeenCalledTimes(1)
})

// End of Get Article

// Post Article

it("should return 409 if the title already exists", async () => {
  Articles.findOne.mockResolvedValue({ title: "Test Title" })

  await postArticle(req, res)

  expect(res.status).toHaveBeenCalledWith(409)
  expect(res.send).toHaveBeenCalledTimes(1)
})

it("should return 201 and save the article if the title does not exist", async () => {
  Articles.findOne.mockResolvedValue(null)
  Articles.prototype.save.mockResolvedValue()

  await postArticle(req, res)

  expect(res.status).toHaveBeenCalledWith(201)
  expect(res.send).toHaveBeenCalledTimes(1)
})

// End of Post Article
