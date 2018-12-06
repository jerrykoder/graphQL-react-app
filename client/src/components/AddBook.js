import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'

class AddBook extends Component {

    state = {
        name: '',
        genre: '',
        authorId: ''
    }

    displayAuthors = () => {
        const data = this.props.getAuthorsQuery
        if (data.loading){
            return <option disabled>Loading Authors...</option>
        } else {
            return data.authors.map(author => {
                return (
                    <option key={author.id} value={author.id}>{author.name}</option>
                )
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries:[{query: getBooksQuery}]
        })
    }

  render() {
    console.log(this.props)
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">Book Name</label>
            <input type="text" id="name" onChange={this.handleChange}/>
            
            <label htmlFor="genre">Book Genre</label>
            <input type="text" id="genre" onChange={this.handleChange} />

            <label htmlFor="authorId">Book Author</label>
            <select id="authorId" onChange={this.handleChange}>
                <option>Select Author</option>
                {this.displayAuthors()}
            </select>

            <button type="submit">Add Book</button>
        </form>
      </div>
    )
  }
}

export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    graphql(addBookMutation, { name: "addBookMutation"})
)(AddBook)
