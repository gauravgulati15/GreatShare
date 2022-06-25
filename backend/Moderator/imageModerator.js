const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", 'Key cc203529bdb544cbb6f6ebbb676b43b6');

const url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0RJtNq0Iwr1v_IylEYzJzgSnA-K-7yWXw9w&usqp=CAU ";

class ImageModerator{
    static async getResult(url){
        return new Promise((resolve, reject) => {
            stub.PostModelOutputs(
                {
                    // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
                    model_id: "moderation-recognition",
                    model_version_id: "aa8be956dbaa4b7a858826a84253cab9",
                    inputs: [
                        {
                            data: {
                                image:{
                                    url: url
                                    // base64 : "",
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

    static async imageModerator(url){
        try{
            const r = await this.getResult(url);
            if( typeof r !== 'object'){
                throw new Error(r);
            }
            let explicitContent = false;
            for(const key in r){
                if(r[key] > 0.5 && key !== "safe"){
                    explicitContent = true;
                }
            }

            return explicitContent;
        }
        catch(error) {
            return new Error(error);
        };
    }
}

// ImageModerator.imageModerator(url)
//     .then((res)=>console.log(res))
//     .catch((error)=>console.log(error));

module.exports = ImageModerator;