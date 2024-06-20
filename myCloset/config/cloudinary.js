import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from '@env';

export const uploadImage = async (fileUri) => {
  const formData = new FormData();
  formData.append('file', {
    uri: fileUri,
    type: 'image/jpeg', // or the type of image you're uploading
    name: `${uuidv4()}.jpg`, // generate a unique name for the file
  });
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET); // replace with your upload preset

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
