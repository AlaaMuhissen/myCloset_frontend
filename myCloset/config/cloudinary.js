import axios from 'axios';
import {CLOUD_NAME, API_KEY_CLOUDINARY, API_SECRET} from '@env';

export const uploadImage = async (fileUri ) => {
    console.log(fileUri)
    
  const formData = new FormData();
  formData.append('file', {
    uri: fileUri,
    type: 'image/jpeg', // or the type of image you're uploading
    name: `outfit.jpg`, // the name of the file
  });
  console.log(formData)
  formData.append('upload_preset', 'd1pqzadi'); // replace with your upload preset

  try {
    const response = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};