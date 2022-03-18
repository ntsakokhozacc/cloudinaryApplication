const express = require("express")
const { cloudinary } = require('./cloudinary/cloudinary');
const cors = require('cors');
const fs = require('fs');

const app = express()
app.use(cors())

app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get('/api/images/:url', async (req, res) => {
    const url = req.params.url
    const { resources } = await cloudinary.search
        .expression('folder:images')
        .expression(`filename:${url}`)
        .sort_by('public_id', 'desc')
        .max_results(30)
        .execute();

    const publicIds = resources.map((file) => file.url);
    res.json(publicIds);

});

app.get('/api/images',async (req, res) => {
    const { resources } = await cloudinary.search
    .expression('folder:images')
    .sort_by('public_id', 'desc')
    .max_results(30)
    .execute();
    
     
 res.json(resources);
})

const multer  = require('multer')
const upload = multer({ dest: 'images/' })
app.post('/api/upload',upload.single("images"), async (req, res) => {
     const images = req.file
     console.log(images);
    try {
        const fileStr = req.file.path;
        console.log(fileStr)
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            folder: 'images',
            resource_type: 'image'
        });
        const filepath = req.file.path;
        fs.unlinkSync(filepath);

        console.log(uploadResponse);
        
        res.json(uploadResponse.url);
        
    } catch (err) {
        console.error(err);res.json({ msg: 'uploaded' });
        res.status(500).json({ err: 'Something went wrong' });
    }
});

app.listen(process.env.PORT,()=>{
    console.log("server running on port 4000")
}
)