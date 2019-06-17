import React from 'react';
import './style/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css'

export default class App extends React.Component {
  state = {
    nickname: 'nick',
    email: 'em',
    ipAdress: 'ip',
    allUsers: [
      {
        id: 0,
        nickname: 'Hubert',
        email: 'mazul96.hm@gmail.com',
        ipAdress: '123.456.789'
      },
      {
        id: 1,
        nickname: 'Milena',
        email: 'mazul96.hm@gmail.com',
        ipAdress: '123.456.789'
      },
    ]
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
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
        />
        {CreateTable(this.state.allUsers)}
      </div>
    );
  }
}


const FormIp = props => {
  const { nickname, email, ipAdress, handleChange } = props;
  return (
    <>
      <form action="">
        <input type="text" name={'nickname'} value={nickname} onChange={handleChange} /><br />
        <input type="text" name={'email'} value={email} onChange={handleChange} /><br />
        <input type="text" name={'ipAdress'} value={ipAdress} onChange={handleChange} /><br />
        <button>Add user</button>
      </form>
    </>
  )
}

const CreateTable = allUsers => {
  const users = allUsers.map(user =>
    <CreateUser
      key={user.id}
      nickname={user.nickname}
      email={user.email}
      ipAdress={user.ipAdress}
    />
  )
  return users;
}

const CreateUser = props => {
  const { nickname, email, ipAdress } = props;

  return (
    <div className='row'>
      <div className='col-4'>
        {nickname}
      </div>
      <div className='col-4'>
        {email}
      </div>
      <div className='col-4'>
        {ipAdress}
      </div>
    </div>
  )
}