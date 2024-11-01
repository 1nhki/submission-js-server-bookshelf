const { nanoid } = require('nanoid');
const books = require('./books');

const addbookshandler = (request, h) =>{
  const { name, year, author, summary, publisher,
    pageCount, readPage, reading } = request.payload;
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = readPage === pageCount ? true : false;
  const newbook = {
    id, name, year, author, summary, publisher, pageCount, readPage,
    finished, reading, insertedAt, updatedAt
  };


  if (name === undefined) {
    const response = h.response({
      status : 'fail',
      message : 'Gagal menambahkan buku. Mohon isi nama buku'
    });
    response.code(400);
    return response;
  }
  else if (readPage > pageCount){
    const response = h.response({
      status : 'fail',
      message : 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    });
    response.code(400);
    return response;
  }
  else {
    books.push(newbook);
    const response = h.response({
      status : 'success',
      message : 'Buku berhasil ditambahkan',
      data : {
        bookId : id
      }
    });
    response.code(201);
    return response;
  }
};

const getallbookhandler = (request, h) =>{
  const { name, reading, finished } = request.query;
  if (name !== undefined){
    let book = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
    book = book.map((book)  => ({
      id : book.id,
      name : book.name,
      publisher : book.publisher
    }));
    const response = h.response({
      status : 'success',
      data : {
        books : book
      }
    });
    response.code(200);
    return response;
  }

  else if (reading !== undefined) {
    let book = books.filter((book) => book.reading == reading);
    book = book.map((book) => ({
      id : book.id,
      name : book.name,
      publisher : book.publisher
    }));
    const response = h.response({
      status : 'success',
      data : {
        books : book
      }
    });
    response.code(200);
    return response;
  }
  else if (finished !== undefined){
    let book = books.filter((book) => book.finished == finished);
    book = book.map((book) => ({
      id : book.id,
      name : book.name,
      publisher : book.publisher
    }));
    const response = h.response({
      status : 'success',
      data : {
        books : book
      }
    });
    response.code(200);
    return response;
  }
  const filterbooks = books.map((book) => ({
    id : book.id,
    name : book.name,
    publisher : book.publisher,
  }));
  const response = h.response({
    status : 'success',
    data : {
      books : filterbooks
    }
  });
  response.code(200);
  return response;
};
const getspecifiedbooks = (request, h) =>{
  const { bookId } = request.params;
  const book = books.find((book) => book.id === bookId);
  if (book === undefined){
    const response = h.response({
      status : 'fail',
      message : 'Buku tidak ditemukan'
    });
    response.code(404);
    return response;
  }
  else {
    const response = h.response({
      status : 'success',
      data : {
        book
      }
    });
    response.code(200);
    return response;
  }

};

const editbookhandler = (request, h) => {
  const { bookId } = request.params;
  const { name, year, author, summary, publisher,
    pageCount, readPage, reading } = request.payload;

  const index = books.findIndex((book) => book.id === bookId);

  if (name === undefined){
    const response = h.response({
      status : 'fail',
      message : 'Gagal memperbarui buku. Mohon isi nama buku'
    });
    response.code(400);
    return  response;
  }
  else if (readPage > pageCount){
    const response = h.response({
      status : 'fail',
      message : 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    });
    response.code(400);
    return response;
  }
  else if (index === -1){
    const response = h.response({
      status : 'fail',
      message : 'Gagal memperbarui buku. Id tidak ditemukan'
    });
    response.code(404);
    return response;
  }
  else {
    books[index]= {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    };
    const response = h.response({
      status : 'success',
      message : 'Buku berhasil diperbarui'
    });
    response.code(200);
    return response;
  }
};

const deletebookshandler = (request, h) =>{
  const { bookId } = request.params;
  const index = books.findIndex((book) => book.id === bookId);
  if (index === -1) {
    const response = h.response({
      status : 'fail',
      message : 'Buku gagal dihapus. Id tidak ditemukan'
    });
    response.code(404);
    return response;
  }
  else {
    books.splice(index, 1);
    const response = h.response({
      status : 'success',
      message : 'Buku berhasil dihapus'
    });
    response.code(200);
    return response;
  }

};



module.exports = {
  addbookshandler,
  getallbookhandler,
  getspecifiedbooks,
  editbookhandler,
  deletebookshandler
};