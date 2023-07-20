require("dotenv").config();

PORT = process.env.PORT || 5003;
const app = require("./app")

app.listen(PORT, () => {
    console.log(`your port is listing on ${PORT}`)
})