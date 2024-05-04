import express from "express"
import cors from "cors"
import multer from "multer"
import {v4 as uuidV4} from "uuid"
import path from "path"
import fs from "fs"
import { exec } from "child_process" // wathch out cuz ,it is not good to run this kind of command in servers...
import { stderr, stdout } from "process"

const app = express()

app.use(cors({
    origin:["http://localhost:3000","http://localhost:5173", "*"],
    Credential:true
}))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/videos",express.static("videos"))
// multer middleware

const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, "./videos")
    },
    filename:function(req, file, cb){
        cb(null, file.fieldname + "-" + uuidV4() + path.extname(file.originalname) )
    }
})

// multer configuration

const upload = multer({storage:storage})

app.get("/",(req, res)=>{
    res.json({msg : "hellow video"})
})

app.post("/uploads",upload.single("file"),(req, res)=>{
    const lessonId = uuidV4()
    const videoPath = req.file.path
    const outputPath = `./videos/meme/${lessonId}`
    const hlsPath =`${outputPath}/index.m3u8`
    console.log("hlsPath",hlsPath)

    if(!fs.existsSync(outputPath)){
        fs.mkdirSync(outputPath,{recursive:true})
    }

    //ffmpeg

    const ffmpegCommand = `ffmpeg -i ${videoPath} -codec:v libx264 -codec:a aac -hls_playlist_type vod -hls_segment_filename "${outputPath}/segment%03d.ts" -start_number 0 ${hlsPath}`
    // no queuqe bcz of poc , not to be used in production
    exec(ffmpegCommand, (error, stdout, stderr)=>{
        if (error) {
            console.log(`exec error: ${error}`)
        }
        
        console.log(`stdout ${stdout}`)
        console.log(`stderr ${stderr}`)
        const videoUrl = `http://localhost:3030/videos/meme/${lessonId}/index.m3u8`
        res.json({
            msg:"videoConverted in HLS format",
            videoUrl: videoUrl,
            lessonId:lessonId
        })
    })

})

app.listen(3030,()=>{
    console.log("App is running on pore 3000......")
})