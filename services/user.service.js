const AWS = require('aws-sdk');

const { buildFileDir } = require('./file.service');
const { dbModels: { Avatar } } = require('../database');
const {
    config: {
        AWS_ID,
        AWS_SECRET_ACCESS_KEY,
        AWS_BUCKET_NAME,
        AWS_AVATAR_ACL
    }
} = require('../constants');

const s3 = new AWS.S3({
    accessKeyId: AWS_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
});

module.exports = {
    pushNewAvatar: async (userId, avatarFile) => {
        const { uploadUrl } = await buildFileDir(avatarFile.name, userId);

        await s3.putObject({
            Bucket: AWS_BUCKET_NAME,
            Key: uploadUrl,
            Body: avatarFile.data,
            ACL: AWS_AVATAR_ACL
        }).promise();

        await Avatar.updateMany({ user: userId }, { isMain: false });

        const { id: avatarId } = await Avatar
            .create({
                user: userId,
                imageUrl: uploadUrl,
                isMain: true
            });

        return { avatarId };
    }
};
