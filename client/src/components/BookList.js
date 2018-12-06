import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getBooksQuery } from '../queries/queries'
import BookDetails from './BookDetails';

class BookList extends Component {

    state = {
        selected: null
    }

  displayBooks = () => {
      const data = this.props.data
      if (data.loading){
          return <div>loading data...</div>
      } else {
          return data.books.map(book => {
              return (
                  <li key={book.id} onClick={() => {this.setState({selected: book.id})}}>{book.name} - {book.genre}</li>
              )
          })
      }
  }
  render() {
      console.log(this.props)
    return (
      <div>
        <ul>
            {this.displayBooks()}
        </ul>
        <BookDetails bookId={this.state.selected}/>
      </div>
    )
  }
}

export default graphql(getBooksQuery)(BookList)
