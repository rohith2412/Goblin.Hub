const { Schema, model, models } = require("mongoose");

const leetcodeurlModel = new Schema({
    user: {type: String, required: true},
    leetcodeURL: {type: String, required: true}
})


const LeetcodeURL = models.LeetcodeURL || model("LeetcodeURL", leetcodeurlModel);
export default LeetcodeURL; 