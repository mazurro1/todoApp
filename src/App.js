import React from 'react';
import './style/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css'

let arrayUsers = [
  {
    id: 0,
    nickname: 'Hubert',
    email: 'mazul96.hm@gmail.com',
    ipAdress: '123.456.789',
  },
  {
    id: 1,
    nickname: 'Milena',
    email: 'milena@gmail.com',
    ipAdress: '123.456.789',
  },
]

export default class App extends React.Component {
  state = {
    nickname: 'nick',
    email: 'em',
    ipAdress: 'ip',
    allUsers: arrayUsers,
    validate: { nickname: true, email: true, ipAdress: true },
  }



  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleAddToArray = e => {
    e.preventDefault();
    let newArrayUsers = arrayUsers;
    let newObject = {
      id: arrayUsers.length,
      nickname: this.state.nickname,
      email: this.state.email,
      ipAdress: this.state.ipAdress,
    }

    if (this.state.nickname && this.state.email && this.state.ipAdress) {

      // walidacja

      newArrayUsers.push(newObject);
      this.setState(prevState => ({
        allUsers: newArrayUsers,
        nickname: '',
        email: '',
        ipAdress: '',
        validate: { nickname: prevState.nickname, email: !prevState.email, ipAdress: prevState.ipAdress }
      }))

    }
  }

  handleDeleteUser = (e, email) => {
    const newArrayUserFilter = arrayUsers.filter(user => user.email !== email);
    arrayUsers = newArrayUserFilter;
    this.setState({
      allUsers: newArrayUserFilter,
    })
  }

  render() {

    return (
      <div className="container">
        <FormIp
          nickname={this.state.nickname}
          email={this.state.email}
          ipAdress={this.state.ipAdress}
          handleChange={this.handleChange}
          handleAddToArray={this.handleAddToArray}
        />
        {CreateTable(this.state.allUsers, this.handleDeleteUser)}
      </div>
    );
  }
}


const FormIp = props => {
  const { nickname, email, ipAdress, handleChange, handleAddToArray } = props;
  return (
    <>
      <form onSubmit={handleAddToArray}>
        <input type="text" name={'nickname'} value={nickname} onChange={handleChange} /><br />
        <input name={'email'} value={email} onChange={handleChange} /><br />
        <input type="text" name={'ipAdress'} value={ipAdress} onChange={handleChange} /><br />
        <button>Add user</button>
      </form>
    </>
  )
}

const CreateTable = (allUsers, handleDeleteUser) => {
  const users = allUsers.map(user =>
    <CreateUser
      key={user.id}
      nickname={user.nickname}
      email={user.email}
      ipAdress={user.ipAdress}
      handleDeleteUser={handleDeleteUser}
    />
  )
  return users;
}

const CreateUser = props => {
  const { nickname, email, ipAdress, handleDeleteUser } = props;

  return (
    <div className='row'>
      <div className='col-4'>
        {nickname}
      </div>
      <div className='col-4'>
        {email}
      </div>
      <div className='col-3'>
        {ipAdress}
      </div>
      <div className='col-1'>
        <button onClick={(e) => handleDeleteUser(e, email)}>x</button>
      </div>
    </div>
  )
}