const { Router } = require("express");
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// const {checkAuth} = require("./middleware/authentication");

const router = Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blogify",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});


const upload = multer({ storage: storage });

router.get("/add-new", (req, res) => {
    // wahi check auth wala payload wala user hai smjhe yaha bhi use hua
    return res.render("addBlog", {
        user: req.user,
    });
});

///fetching the indiviual blog
router.get("/:id", async (req, res) => {
    // populate kewal id nahi pura obj utha layega user ka
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    const comments = await Comment.find({ blogId: req.params.id }).populate(
        "createdBy",
    );

    const err = req.cookies.commentError;
    // empty to nahi hai wali cookie abb clear kar do
    res.clearCookie("commentError")  ;
    // blog page dikhega
    return res.render("blog", {
        user: req.user,
        blog,
        err,
        comments,
    });
});

router.post("/", upload.single("coverImage"), async (req, res) => {
    const { title, body } = req.body;

    const blog = await Blog.create({
        title,
        body,
        createdBy: req.user._id,
        coverImageURL: req.file.path,

    });

    return res.redirect(`/blog/${blog._id}`);
});

//////////////////////// comment routers

router.post("/comment/:blogId", async (req, res) => {
    const { content } = req.body;

    if(!content || content.trim() === "") {

        res.cookie("commnetError", "Comment cannot be empty");

        return res.redirect(`/blog/${req.params.blogId}`);

    }

    const comment = await Comment.create({
        content,
        blogId: req.params.blogId,
        /// ye id hai user ki jo comment karega uss time login hoga check auth wale middlware se aya yaad aya
        createdBy: req.user._id,
    });
    return res.redirect(`/blog/${req.params.blogId}`);
});

module.exports = router;
