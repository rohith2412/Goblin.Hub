const { Schema, model, models } = require("mongoose");

const githuburlModel = new Schema({
    user: {type: String, required: true},
    githubURL: {type: String, required: true}
})



const GithubURL = models.GithubURL || model("GithubURL", githuburlModel);
export default GithubURL; 
 

