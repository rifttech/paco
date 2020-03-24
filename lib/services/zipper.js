const extract = require("unzip-stream").Extract;
const createReadStream = require("fs").createReadStream;

/**
 * Unzip file
 */
async function unzip(opts) {
    const { src, dest } = opts;
    console.dir(src, dest);
    const reader = createReadStream(src);
    reader.pipe(extract({ path: dest }));

    return new Promise((resolve, reject) => {
        reader.on("error", (error) => reject(error));
        reader.on("close", resolve);
    });
}

module.exports = {
    unzip,
};
