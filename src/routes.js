

const routes = [
    {
        path : "/books",
        method : "POST",
        handler : handler
    },
    {
        path : "/books",
        method : "GET",
        handler : handler
    },
    {
        path : "/books/{bookId}",
        method : "GET",
        handler : handler
    },
    {
        path : "/books/{bookId}",
        method : "PUT",
        handler : handler
    },
    {
        path : "/books/{bookId}",
        method : "DELETE",
        handler : handler
    },
];

module.exports = routes