var express = require('express');
var router = express.Router();
var fs = require("fs")
/* GET home page. */
router.get('/', function(req, res,) {
    const filesdup = []
 fs.readdir("./uploads",{withFileTypes:true},function(err,files){
    
    files.forEach(function (dirent){
    filesdup.push({name: dirent.name, isfolder: dirent.isDirectory()})
    })
    res.render('index1',{files:filesdup});
  
   //  console.log(filesdup)
 })
  
 });
 router.get('/fileCreated', function(req,res) {
   fs.writeFile(`./uploads/${req.query.fileName}`,"",function(err){
   if(err){console.log("nahibna")}
   else{
      res.redirect("/")
   }
   })
 });
 router.get('/folderCreated', function(req,res) {
   fs.mkdir(`./uploads/${req.query.folderName}`,function(err){
   if(err){conswole.log("nahibna")}
   else{
      console.log(req.query.folderName);
      res.redirect("/") 
   }
   })
 });
 router.get("/filename/:name",function(req,res)
{
   const filesdup = []
   fs.readdir("./uploads",{withFileTypes:true},function(err,files){
      
      files.forEach(function (file){
      filesdup.push({name: file.name, isfolder: file.isDirectory()})
      })

      fs.readFile(`./uploads/${req.params.name}`,"utf8",function(err,data)
      {
        if(err) throw err;
        else
        {
          res.render("dup",{files:filesdup,fileName:req.params.name,data});
        }
      })
    })
});
router.get('/deletefile/:filename',function(req,res){
  fs.unlink(`./uploads/${req.params.filename}`,function(err){
    if(err){
      console.log("throw err")
    }else{
      res.redirect('/')
      console.log("file delete successfully")
    }
  })
  fs.rmdir(`./uploads/${req.params.filename}`,function(err){
  if(err){
    console.log("throw err")
  }else{
    res.redirect('/')
  }
  })
})


module.exports = router;
