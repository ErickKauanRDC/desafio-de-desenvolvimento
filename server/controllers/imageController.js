const db = require('../firebase/firebase-connect')
const { v4: uuidv4 } = require('uuid');
const upLoadImage = async (image,filename) =>{
    const storageRef = await db.storage().bucket('gs://desafio-de-desenvolvimen-528d9.appspot.com')
    const storage = await storageRef.upload((image),{
        public: true,
        destination: `images/${filename}`,
        metadata:{
            firebaseStorageDownloadTokens: uuidv4(),
        }
        
    })
    return storage[0].metadata.mediaLink
}


module.exports = {upLoadImage}