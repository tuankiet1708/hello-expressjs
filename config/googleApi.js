const {
    GOOGLESEARCH_CX,
    GOOGLESEARCH_KEY
} = process.env;

module.exports = {
    googleSearch: {
        url: "https://www.googleapis.com/customsearch/v1",
        cx: GOOGLESEARCH_CX,
        key: GOOGLESEARCH_KEY
    }
}