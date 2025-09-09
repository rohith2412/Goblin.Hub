const { Schema, model, models } = require("mongoose");

const urlModel = new Schema({
    user: {type: String, required: true},
    leetcodeURL: {type: String, required: true},
    // githubURL: {type:String, required: true}
})



const URL = models.URL || model("URL", urlModel);
export default URL; 
 

