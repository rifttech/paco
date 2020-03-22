const Axios = require("axios");
const ProgressBar = require("progress");
const { createWriteStream } = require("fs");
const chalk = require("chalk");
/**
 * Downloads Files
 */
async function download(opts) {
    const { url, path } = opts;
    const writer = createWriteStream(path);

    console.log(chalk.bgBlue("Connecting to: "), url);

    const { headers, data } = await Axios({
        url,
        method: "GET",
        responseType: "stream",
    });

    const length = headers["content-length"];

    console.log(chalk.bgBlue("Starting download ..."));
    const progressBar = new ProgressBar(
        "-> downloading [:bar] :percent :etas",
        {
            width: 40,
            complete: "=",
            incomplete: " ",
            renderThrottle: 1,
            total: parseInt(length),
        }
    );

    data.on("data", (chunk) => progressBar.tick(chunk.length));

    data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
    });
}

module.exports = {
    download,
};
