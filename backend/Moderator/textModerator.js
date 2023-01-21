const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", 'Key 714c254775c94e72b5902e65020cb71e');

const text = "I will hug harsh";

class TextModerator{
    static async getResult(text){
        return new Promise((resolve, reject) => {
            stub.PostModelOutputs(
                {
                    // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
                    model_id: "moderation-english-text-classification",
                    model_version_id: "997336df717d4295a1f58fb28cb3cce2",
                    inputs: [
                        {
                            data: {
                                text:{
                                    raw: text
                                }
                            }
                        }
                    ]
                },
                metadata,
                (err, response) => {
                    if (err) {
                        console.log("Error: " + err);
                        reject("Error: " + err);
                    }
                    // console.log(response);
                    if (response.status.code !== 10000) {
                        reject("Received failed status: " + response.status.description + "\n" + response.status.details);
                    }
                    let res = {};
                    for (const c of response.outputs[0].data.concepts) {
                        res[c.name] = c.value;
                    }
                    resolve(res);
                }
            );
        });
    }

    static async textModerator(text){
        try {
            const r = await this.getResult(text);
            if( typeof r !== 'object'){
                throw new Error(r);
            }
            let sum = 0;
            // take average of first 3 keys
            for (let i = 0; i < 3; i++) {
                sum += r[Object.keys(r)[i]];
            }
            sum = sum / 3;
            // console.log(r);
            if(sum > 0.5){
                return true;
            }
            return false;
        }
        catch(error){
            return new Error(error);
        };
    }
}


TextModerator.textModerator(text)
    .then((res)=>console.log(res))
    .catch((error)=>console.log(error));

module.exports = TextModerator;
