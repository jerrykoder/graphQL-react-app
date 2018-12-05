import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

const getBooksQuery = gql`{
    books {
        name
        genre
        id
    }
}`

class BookList extends Component {
  displayBooks = () => {
      const data = this.props.data
      if (data.loading){
          return <div>loading data...</div>
      } else {
          return data.books.map(book => {
              return (
                  <li key={book.id}>{book.name} - {book.genre}</li>
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
      </div>
    )
  }
}

export default graphql(getBooksQuery)(BookList)
