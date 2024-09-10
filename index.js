const express = require("express");
const app = express();
const { v4: uuidv4 } = require('uuid');
const port = 3001;
const path = require("path");
var methodOverride = require('method-override')
app.use(express.json()); // For parsing JSON requests
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded data

app.set("view engine", "ejs"); // Set EJS as the view engine
app.set("views", path.join(__dirname, "views")); // Set the 'views' directory
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the 'public' directory
posts = [
  {
      id: uuidv4(),
      username: "avinashyadav",
      content: "Today has been absolutely delightful! 🌞 From the moment I woke up, everything seemed to align perfectly. The weather was splendid, and I took the opportunity to go for a refreshing walk in the park. It was a great way to clear my mind and set a positive tone for the day. Sometimes, it’s the simple things that bring the most joy. I also spent some time catching up with friends, and we had a wonderful chat about our upcoming plans. How do you usually spend your ideal day? Any special routines or activities that make your day better?"
  },
  {
      id: uuidv4(),
      username: "amankumar",
      content: "Hard work is indeed crucial for achieving success, but it's equally important to stay motivated and focused. I've found that setting clear goals and regularly reviewing them helps in maintaining that drive. Recently, I started a new project at work that is both challenging and exciting. The learning curve is steep, but I'm committed to pushing through. Do you have any personal strategies for staying motivated when facing difficult tasks?"
  },
  {
      id: uuidv4(),
      username: "rohitshukla",
      content: "I’m thrilled to share that I got selected for my first internship! 🎉 It’s been a long journey of applying, preparing, and interviewing, and finally, my hard work has paid off. I’m looking forward to gaining practical experience and learning from professionals in my field. For those who have already been through internships, what advice would you give to make the most of this opportunity?"
  }
  {
      id: uuidv4(),
      username: "sneharoy",
      content: "Reading books has always been my go-to for relaxation and self-improvement. 📚 Recently, I’ve been diving into some classic literature and modern self-help books. I find that each book offers a new perspective and helps me unwind after a busy day. Do you have any favorite books or genres that you turn to for relaxation or personal growth?"
  }
];


  app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts})
})
// Route to render the form
app.get("/posts/new", (req, res) => {
    res.render("new.ejs"); // Make sure you create a new.ejs file
  });
  
  // Route to handle form submissions
  app.post("/posts", (req, res) => {
    const { username, content } = req.body;
    let id=uuidv4();
    console.log(id);
    posts.push({ id,username, content });
    res.redirect("/posts");
  });

  // Route to show a specific post
app.get("/posts/:id", (req, res) => {
    const { id } = req.params;
    const post = posts.find((p)=> id===p.id);
    console.log(id);
    if (post) {
      res.render("show.ejs", { post });
    } else {
      res.status(404).send("Post not found");
    }
  });

  app.patch("/posts/:id", (req, res) => {
    let { id } = req.params; // Extract 'id' from request parameters
    let newContent = req.body.content; // Extract 'content' from the request body

    console.log(newContent); // Log the new content for debugging
    let post = posts.find((p)=> id===p.id);
    post.content=newContent;
    // Respond with a message to confirm the request is working
    res.redirect("/posts");
});
app.get("/posts/:id/edit", (req, res) => {
  const { id } = req.params;  // Extract 'id' from request parameters
  letpost = posts.find((p)=> id===p.id);  // Find the post by 'id'
  
  if (post) {
    res.render("edit.ejs",{post});  // Render the 'edit.ejs' template and pass the post object
  } else {
    res.status(404).send("Post not found");  // Handle case where post is not found
  }
});
app.delete("/posts/:id",(req,res)=>{
  let{id}=req.params;
  posts=posts.filter((p)=>id!==p.id);
  res.redirect("/posts");
})
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

