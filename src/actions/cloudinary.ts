import axios from "axios";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { createClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid'


const supabase = createClient('https://cezgydfbprzqgxkfcepq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlemd5ZGZicHJ6cWd4a2ZjZXBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDU0NTA4NTQsImV4cCI6MTk2MTAyNjg1NH0.UDAQvbY_GqEdLLrZG6MFnhDWXonAbcYnrHGHDD6-hYU')

export const ImageUpload = async (formData: FormData) => {
    const file = formData.get('file') as File
    const f = createUploadthing();
    formData.append('upload_preset', `https://res.cloudinary.com/demo/image/upload/getting-started`)
    const uid = uuidv4()

    const { data, error } = await supabase.storage.from('blog_images').upload(`blogs/${uid}`, file)
    if (error) {
      // Handle error
      console.log('error', error)
      return ''
    } else {
        console.log('success', data)
        return data.fullPath
      // Handle success
    }

    // if(!file){
    //     throw new Error('Image not found to upload')
    // }
   
    // const cloudinaryUplaodUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`


    // try {
    //     const response = await axios.post(cloudinaryUplaodUrl, formData, {
    //         headers:{
    //             'Content-Type':'multipart/form-data'
    //         }
    //     })
        
    //     return response.data.url
    // } catch (error) {
    //     console.log('Error uploading to cloudinary', error)
    //     throw error
    // }
    
}


async function uploadFile(file: any ) {
    console.log('here')

    const { data, error } = await supabase.storage.from('blog_images').upload('blogs/hello.jpg', file)
    if (error) {
      // Handle error
      console.log('error', error)
    } else {
        console.log('success', data)
        
      // Handle success
    }
  }

// const uploadStuff = async (file) => {
//     if (!file) return
//     try {
//       const uid = uuidv4()
//       const storageRef = ref(storage, `/spark_files/${Name}_${uid}`)
//       const uploadTask = uploadBytesResumable(storageRef, file)
//       uploadTask.on(
//         'state_changed',
//         (snapshot) => {
//           const prog =
//             Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100

//           setProgress(prog)
//         },
//         (err) => console.log(err),
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((url) => {
//             createAttach(orgId, url, by, file.name, id, attachType)
//             console.log('file url i s', url)
//             //  save this doc as a new file in spark_leads_doc
//           })
//         }
//       )
//     } catch (error) {
//       console.log('upload error is ', error)
//     }
//   }