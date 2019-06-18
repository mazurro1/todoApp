import React from 'react';
import './style/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css'

let arrayUsers = [
  {
    id: 0,
    nickname: 'Hubert',
    email: 'mazul96.hm@gmail.com',
    ipAdress: '255.255.255.255',
  },
  {
    id: 1,
    nickname: 'Rekrutacja',
    email: 'rekrutacja@gmail.com',
    ipAdress: '0.0.0.0',
  },
]

export default class App extends React.Component {
  state = {
    nickname: '',
    email: '',
    ipAdress: '',
    allUsers: arrayUsers,
    validate: { nickname: false, email: false, ipAdress: false },
    nicknameProblem: '',
    emailProblem: '',
    ipAdressProblem: '',

  }



  handleChange = e => {
    const { nickname, email, ipAdress } = this.state;
    this.setState({
      [e.target.name]: e.target.value,
    })

    //NICKNAME
    if (e.target.name === 'nickname') {
      let isNicknameBusy = true;
      for (let i = 0; i < this.state.allUsers.length; i++) {
        if (nickname.toLowerCase() === this.state.allUsers[i].nickname.toLowerCase()) {
          isNicknameBusy = false;
        }
        console.log(isNicknameBusy)
      }

      console.log(isNicknameBusy);
      if (nickname.length >= 3 && isNicknameBusy) {
        this.setState(prevState => ({
          validate: { nickname: true, email: prevState.validate.nickname, ipAdress: prevState.validate.ipAdress },
          nicknameProblem: '',
        }))

      } else {//nickname problem
        let nicknameFail = '';
        if (isNicknameBusy) {
        } else {
          nicknameFail = 'Nickname jest zajęty';
        }

        this.setState(prevState => ({
          nicknameProblem: nicknameFail,
          validate: { nickname: false, email: prevState.validate.nickname, ipAdress: prevState.validate.ipAdress },
        }))
      }

      if (this.state.validate.ipAdress && this.state.validate.email && this.state.validate.nickname) {

        let newArrayUsers = arrayUsers;
        let newObject = {
          id: newArrayUsers.length,
          nickname: nickname,
          email: email,
          ipAdress: ipAdress,
        }
        newArrayUsers.push(newObject);
        this.setState(prevState => ({
          nickname: '',
          email: '',
          ipAdress: '',
          allUsers: newArrayUsers,
          nicknameProblem: '',
          emailProblem: '',
          ipAdressProblem: '',
        }))

      }
    }
    //END NICKNAME
  }

  handleAddToArray = e => {
    const { nickname, email, ipAdress } = this.state;
    e.preventDefault();

    // walidation
    if (nickname && email && ipAdress) {

      //email validate
      const dotValidation = email.lastIndexOf('.');
      let isEmailBusy = true;
      for (let i = 0; i < this.state.allUsers.length; i++) {
        if (email.toLowerCase() === this.state.allUsers[i].email.toLowerCase()) {
          isEmailBusy = false;
        }
      }
      if (email.includes('@') && dotValidation > 0 && (email.length - 3 === dotValidation || email.length - 4 === dotValidation) && isEmailBusy) {

        this.setState(prevState => ({
          validate: { nickname: prevState.validate.nickname, email: true, ipAdress: prevState.validate.ipAdress },
          emailProblem: '',
        }))

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
      //ip adress validate
      const ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
      let isIpAdressBusy = true;
      for (let i = 0; i < this.state.allUsers.length; i++) {
        if (ipAdress.toLowerCase() === this.state.allUsers[i].ipAdress.toLowerCase()) {
          isIpAdressBusy = false;
        }
      }
      if (ipAdress.match(ipformat) && isIpAdressBusy) {

        this.setState(prevState => ({
          validate: { nickname: prevState.validate.nickname, email: prevState.validate.email, ipAdress: true },
          ipAdressProblem: '',
        }))

      } else {
        //ipAdress problems
        let ipAdressFail = '';

        if (isIpAdressBusy) {
          ipAdressFail = 'Nieodpowiedni format'
        } else {
          ipAdressFail = 'IP adres jest zajęty';
        }

        this.setState(prevState => ({
          validate: { nickname: prevState.validate.nickname, email: prevState.validate.email, ipAdress: false },
          ipAdressProblem: ipAdressFail,
        }))
      }


      //nickname validate




      //WHERE INPUTS ARE NULL
    } else {
      let emailNull = '';
      let nicknameNull = '';
      let ipAdressNull = '';
      if (email.length === 0) {
        emailNull = "Uzupełnij email"
      }
      if (nickname.length === 0) {
        nicknameNull = "Uzupełnij nickname"
      }
      if (ipAdress.length === 0) {
        ipAdressNull = "Uzupełnij IP adress"
      }
      this.setState({
        emailProblem: emailNull,
        nicknameProblem: nicknameNull,
        ipAdressProblem: ipAdressNull,
      })
    }
    //END WHERE INPUTS ARE NULL




  }

  handleDeleteUser = (e, email) => {
    const newArrayUserFilter = arrayUsers.filter(user => user.email !== email);
    arrayUsers = newArrayUserFilter;
    this.setState({
      allUsers: newArrayUserFilter,
    })
  }

  render() {
    // console.log(this.state.validate.ipAdress);
    // console.log(this.state.validate.email);
    // console.log(this.state.validate.nickname);
    return (
      <div className="container">
        <FormIp
          nickname={this.state.nickname}
          email={this.state.email}
          ipAdress={this.state.ipAdress}
          handleChange={this.handleChange}
          handleAddToArray={this.handleAddToArray}
          nicknameProblem={this.state.nicknameProblem}
          emailProblem={this.state.emailProblem}
          ipAdressProblem={this.state.ipAdressProblem}

        />
        {CreateTable(this.state.allUsers, this.handleDeleteUser)}
      </div>
    );
  }
}


const FormIp = props => {
  const { nickname, email, ipAdress, handleChange, handleAddToArray, nicknameProblem, emailProblem, ipAdressProblem } = props;

  return (
    <>
      <form onSubmit={handleAddToArray}>
        <label htmlFor="nickname" className="row">
          <div className="col-12">
            Nickname:
          </div>
          <div className="col-12">
            <input id="nickname" type="text" name={'nickname'} value={nickname} onChange={handleChange} />
            {nicknameProblem}
          </div>
        </label>
        <label htmlFor="email" className="row">
          <div className="col-12">
            Email:
          </div>
          <div className="col-12">
            <input id="email" name={'email'} value={email} onChange={handleChange} className="green" />
            {emailProblem}
          </div>
        </label>
        <label htmlFor="ipAdress" className="row">
          <div className="col-12">
            IP adress:
          </div>
          <div className="col-12">
            <input id="ipAdress" type="text" name={'ipAdress'} value={ipAdress} onChange={handleChange} />
            {ipAdressProblem}
          </div>
        </label>
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