const {
    addbookshandler, 
    getallbookhandler,
    getspecifiedbooks, 
    editbookhandler,
    deletebookshandler } = require("./handler")

const routes = [
    {
        path : "/books",
        method : "POST",
        handler : addbookshandler,
    },
    {
        path : "/books",
        method : "GET",
        handler : getallbookhandler
    },
    {
        path : "/books/{bookId}",
        method : "GET",
        handler : getspecifiedbooks
    },
    {
        path : "/books/{bookId}",
        method : "PUT",
        handler : editbookhandler
    },
    {
        path : "/books/{bookId}",
        method : "DELETE",
        handler : deletebookshandler
    },
];

module.exports = routes