const bookContainer = document.getElementById('book-container')
const bookDetails = document.getElementById('book-details')
const searchText = document.getElementById('search-text');
document.getElementById('search-btn').addEventListener('click', () => {
    bookContainer.innerHTML = `
    <div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
    `
        const url = `http://openlibrary.org/search.json?q=${searchText.value}`
        searchText.value = '';
    fetch(url)
        .then(res => res.json())
    .then(data=>showBook(data.docs))
 
})
const showBook = (books) => {
    const newArr = books.filter(book => book.cover_i !== undefined && book.author_name !== undefined && book.publisher !== undefined && book.title !== undefined && book.first_publish_year !== undefined)
    if (newArr.length === 0) {
        bookDetails.innerHTML = '';
        bookContainer.innerHTML='NO RESULT'
    }
    else {
        const newH5 = document.createElement('h5')
        newH5.innerHTML = `SEARCH RESULT ${newArr.length}`
        bookDetails.innerHTML = '';
        bookDetails.appendChild(newH5)

        bookContainer.innerHTML = '';
        newArr.forEach(book => {
            
            const newDiv = document.createElement('div')
            newDiv.classList.add('col')
            newDiv.innerHTML = `
            <div class="card h-100 shadow-lg border-0">
   
      <div class="card-body" >
       <img style="height:300px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top img-fluid" alt="...">
        <h5 class="card-title text-danger opacity-50">Book Name: ${book.title}</h5>
       <div class="d-flex justify-content-between > <p class="card-text fw-bold opacity-75">Author: ${book.author_name[0]}</p>   <p class="card-text  fw-bold opacity-75">1st Publish:${book.first_publish_year}</p></div>
    
             
      </div>
    </div>
            `
            bookContainer.appendChild(newDiv)
        })
        
    }

}