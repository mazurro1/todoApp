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
    validate: { nickname: false, email: false, ipAdress: false },
    nicknameProblem: '',
    emailProblem: '',
    ipAdressProblem: '',
  }



  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleAddToArray = e => {
    const { nickname, email, ipAdress } = this.state;
    e.preventDefault();
    let newArrayUsers = arrayUsers;
    let newObject = {
      id: arrayUsers.length,
      nickname: nickname,
      email: email,
      ipAdress: ipAdress,
    }

    if (nickname && email && ipAdress) {

      // walidation

      if (nickname.length >= 3) {
        //nickname validate
        this.setState(prevState => ({
          validate: { nickname: true, email: prevState.validate.email, ipAdress: prevState.validate.ipAdress },
          nicknameProblem: 'Nickname ok'
        }))
        //email validate
        const dotValidation = email.lastIndexOf('.');
        let isEmailBusy = true;
        console.log(dotValidation);
        console.log(email.length);
        for (let i = 0; i < this.state.allUsers.length; i++) {
          if (email === this.state.allUsers[i].email) {
            isEmailBusy = false;
          }
        }
        if (email.includes('@') && dotValidation > 0 && (email.length - 3 === dotValidation || email.length - 4 === dotValidation) && isEmailBusy) {

          this.setState(prevState => ({
            validate: { nickname: prevState.validate.nickname, email: true, ipAdress: prevState.validate.ipAdress },
            emailProblem: 'Email ok',
          }))
          const ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
          if (ipAdress.match(ipformat)) {
            //ip adress validate
            this.setState(prevState => ({
              validate: { nickname: prevState.validate.nickname, email: prevState.validate.email, ipAdress: true },
              nickname: '',
              email: '',
              ipAdress: '',
              allUsers: newArrayUsers,
              ipAdressProblem: 'Ip adress ok',
            }))
            newArrayUsers.push(newObject);
          } else {
            //ipAdress problems
            this.setState(prevState => ({
              validate: { nickname: prevState.validate.nickname, email: prevState.validate.email, ipAdress: false },
              ipAdressProblem: 'Nieodpowiedni format adresu IP',
            }))
          }
        } else {
          //email problems
          let emailFail = '';
          if (isEmailBusy) {
            if (email.includes('@')) {
              if (email.includes('.')) {
                if (email.length >= 5) {
                  if (email.length > dotValidation + 1) {

                    emailFail = 'Zła końcówka';
                  } else {
                    emailFail = 'Brak końcówki';
                  }
                } else {
                  emailFail = 'Adres email jest za krótki';
                }
              } else {
                emailFail = 'Brak kropki w adresie email';
              }
            } else {
              emailFail = 'Brak @ w adresie email';
            }
          } else {
            emailFail = 'Adres email jest zajęty';
          }
          this.setState(prevState => ({
            validate: { nickname: prevState.validate.nickname, email: false, ipAdress: prevState.validate.ipAdress },
            emailProblem: emailFail,
          }))
        }
      } else {
        //nickname problems
        this.setState(prevState => ({
          validate: { nickname: false, email: prevState.validate.email, ipAdress: prevState.validate.ipAdress },
        }))
      }

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
    console.log(this.state.emailProblem)
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