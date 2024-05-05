import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'


          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFielPath)=>{
    try {
        if(!localFielPath)return null
        // upload the file on cloudinary

        const response = await cloudinary.uploader.upload(localFielPath, {
            resource_type: 'auto'
        })

        // file has been uploaded succecfully

        // console.log("File is uploadded on cloudinary" , response.url)
        fs.unlinkSync(localFielPath)
        return response

    } catch (error) {
    
        fs.unlinkSync(localFielPath) //remove the locally saced temporayry file as the upload got failed
        return null
    }

}

export {uploadOnCloudinary}