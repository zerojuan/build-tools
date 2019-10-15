const {Storage} = require("@google-cloud/storage");
const storage = new Storage();

module.exports = async (bucketName) => {
    const [files] = await storage.bucket(bucketName).getFiles();


    const downloadPromises = files.map(file => {
        console.log(file.name);
        return storage
        .bucket(bucketName)
        .file(file.name)
        .download({
            destination: `downloads`
        });
    });

    const result = await Promise.all(downloadPromises);
    console.log('Done:', result)
    
}