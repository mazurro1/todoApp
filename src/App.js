import React from 'react';
import './style/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css'

let arrayUsers = [
  {
    id: 0,
    nickname: 'Hubert',
    email: 'mazul96.hm@gmail.com',
    ipAdress: '0.0.0.0',
    comfirmDelete: false,
  },

]

export default class App extends React.Component {
  state = {
    nickname: '',
    email: '',
    ipAdress: '',
    allUsers: arrayUsers,
    validateError: { nickname: '', email: '', ipAdress: '' },
    validate: { nickname: false, email: false, ipAdress: false },
    deleteAll: false,
  }



  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleOnSubmit = e => {
    e.preventDefault();
    const { nickname, email, ipAdress } = this.state;

    //NICKNAME
    let nicknameError = '';
    let nicknameValidation = false;

    if (nickname.length >= 3) {
      nicknameError = 'Nickname ok';
      nicknameValidation = true;
      if (nickname.includes(' ')) {
        nicknameError = 'Nie mozna spacji';
        nicknameValidation = false;




      } else {

        for (let i = 0; i < this.state.allUsers.length; i++) {
          if (nickname.toLowerCase() === this.state.allUsers[i].nickname.toLowerCase()) {
            nicknameError = 'Nickname zajęty';
            nicknameValidation = false;
          }
        }
      }

    } else if (nickname.length === 0) {
      nicknameError = 'Wpisz nickname';
      nicknameValidation = false;
    } else {
      nicknameError = 'Nickname za krótki';
      nicknameValidation = false;
    }
    //END NICKNAME
    //EMAIL
    let emailError = '';
    let emailValidation = false;
    const dotValidation = email.lastIndexOf('.');

    if (email.length > 5) {
      if (email.includes('@')) {
        if (email.includes('.')) {
          if (email.length === dotValidation + 3 || email.length === dotValidation + 4) {
            emailError = 'Email ok';
            emailValidation = true;
          } else if (email.length === dotValidation + 2 || email.length > dotValidation + 4) {
            emailError = 'Zła końcówka'
            emailValidation = false;
          } else {
            emailError = 'Brak końcówki';
            emailValidation = false;
          }
        } else {
          emailError = 'Brak kropki w adresie email';
          emailValidation = false;
        }
      } else {
        emailError = 'Brak @ w adresie email';
        emailValidation = false;
      }

      for (let i = 0; i < this.state.allUsers.length; i++) {
        if (email.toLowerCase() === this.state.allUsers[i].email.toLowerCase()) {
          emailError = 'Email zajęty';
          emailValidation = false;
        }
      }
    } else if (email.length === 0) {
      emailError = 'Wpisz Email';
      emailValidation = false;
    } else {
      emailError = 'Email jest za krótki';
      emailValidation = false;
    }
    //END EMAIL
    //IP ADRESS
    let ipAdressError = '';
    let ipAdressValidation = false;
    const ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (ipAdress.length !== 0) {

      if (ipAdress.match(ipformat)) {
        ipAdressError = 'IP Adress ok';
        ipAdressValidation = true;

        for (let i = 0; i < this.state.allUsers.length; i++) {
          if (ipAdress.toLowerCase() === this.state.allUsers[i].ipAdress.toLowerCase()) {
            ipAdressError = 'IP zajęty';
            ipAdressValidation = false;
          }
        }
      } else {
        ipAdressError = 'Zły format adresu IP';
      }
    } else {
      ipAdressError = 'Wpisz adres IP';
      ipAdressValidation = false;
    }
    //END IP ADRESS

    if (nicknameValidation && emailValidation && ipAdressValidation) {
      let newObject = {
        id: arrayUsers.length,
        nickname: nickname,
        email: email,
        ipAdress: ipAdress,
      }

      let newArray = arrayUsers;
      newArray.push(newObject);
      //SORT ARRAY
      let sort = newArray.sort((a, b) => {
        return (a.nickname.toLowerCase() > b.nickname.toLowerCase()) ? 1 : -1;
      });;
      //END SORT ARRAY
      this.setState({
        allUsers: sort,
        nickname: '',
        email: '',
        ipAdress: '',
        validateError: { nickname: '', email: '', ipAdress: '' },
        validate: { nickname: nicknameValidation, email: emailValidation, ipAdress: ipAdressValidation },
      })
    } else {
      this.setState({
        validateError: { nickname: nicknameError, email: emailError, ipAdress: ipAdressError },
        validate: { nickname: nicknameValidation, email: emailValidation, ipAdress: ipAdressValidation },
      })
    }
  }

  handleSelectDeleteUser = (id) => {
    let newArrayUserToDelete = arrayUsers;
    if (newArrayUserToDelete[id].comfirmDelete) {
      newArrayUserToDelete[id].comfirmDelete = false;

    } else {
      newArrayUserToDelete[id].comfirmDelete = true;
    }
    this.setState({
      allUsers: newArrayUserToDelete,
    })
  }

  handleDeleteGoBack = (id) => {
    let newArrayUserToDelete = arrayUsers;
    if (newArrayUserToDelete[id].comfirmDelete) {
      newArrayUserToDelete[id].comfirmDelete = false;

    } else {
      newArrayUserToDelete[id].comfirmDelete = true;
    }
    this.setState({
      allUsers: newArrayUserToDelete,
    })
  }

  handleDeleteUser = (e, email) => {
    const newArrayUserFilter = arrayUsers.filter(user => user.email !== email);
    arrayUsers = newArrayUserFilter;
    this.setState({
      allUsers: newArrayUserFilter,
    })
  }


  handleDeleteAll = () => {
    arrayUsers = [];
    this.setState(prevState => ({
      allUsers: arrayUsers,
      deleteAll: !prevState.deleteAll,
    }))
  }


  handleSelectDeleteAll = () => {
    this.setState(prevState => ({
      deleteAll: !prevState.deleteAll,
    }))
  }


  handleNoDeleteAll = () => {
    this.setState(prevState => ({
      deleteAll: !prevState.deleteAll,
    }))
  }


  render() {

    const { ipAdress, email, nickname, validateError, allUsers, deleteAll } = this.state;
    return (
      <div className="container">
        <div className="formIn">
          <FormIp
            nickname={nickname}
            email={email}
            ipAdress={ipAdress}
            handleChange={this.handleChange}
            handleOnSubmit={this.handleOnSubmit}
            validateError={validateError}

          />
        </div>
        <table className="table table-striped table-dark mt-4">
          <thead>
            <tr>
              <th scope="col">Nickname</th>
              <th scope="col">Email</th>
              <th scope="col">IP Adress</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {CreateTable(allUsers, this.handleDeleteUser, this.handleSelectDeleteUser, this.handleDeleteGoBack)}
          </tbody>
        </table>
        {/* BUTTON TO DELETE ALL */}
        {arrayUsers.length !== 0 ?
          <DeleteAll
            handleDeleteAll={this.handleDeleteAll}
            handleSelectDeleteAll={this.handleSelectDeleteAll}
            deleteAll={deleteAll}
            handleNoDeleteAll={this.handleNoDeleteAll}
          />
          : null
        }
      </div>
    );
  }
}



const FormIp = props => {
  const { nickname, email, ipAdress, handleChange, handleOnSubmit, validateError } = props;

  const classBorder = (name) => {
    if (validateError[name] === '') {
      return '';
    } else if (validateError[name].toLowerCase() === `${name.toLowerCase()} ok`) {
      return 'green';
    } else {
      return 'red';
    }
  }

  const classIP = () => {
    if (validateError.ipAdress === '') {
      return '';
    } else if (validateError.ipAdress.toLowerCase() === 'ip adress ok') {
      return 'green';
    } else {
      return 'red';
    }
  }

  const disabledButton = () => {
    if (nickname && email && ipAdress) {
      return false;
    } else {
      return true;
    }

  }
  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="nickname" className="row">
          <div className="col-12">
            Nickname:
          </div>
          <div className="col-12">
            <input id="nickname" type="text" name={'nickname'} value={nickname} onChange={handleChange} className={classBorder('nickname')} />
            {validateError.nickname}
          </div>
        </label>
        <label htmlFor="email" className="row">
          <div className="col-12">
            Email:
          </div>
          <div className="col-12">
            <input id="email" name={'email'} value={email} onChange={handleChange} className={classBorder('email')} />
            {validateError.email}
          </div>
        </label>
        <label htmlFor="ipAdress" className="row">
          <div className="col-12">
            IP adress:
          </div>
          <div className="col-12">
            <input id="ipAdress" type="text" name={'ipAdress'} value={ipAdress} onChange={handleChange} className={classIP()} />
            {validateError.ipAdress}
          </div>
        </label>
        <button type="submit" disabled={disabledButton()} className="btn btn-dark">Add user</button>
      </form>

    </>
  )
}

const CreateTable = (allUsers, handleDeleteUser, handleSelectDeleteUser, handleDeleteGoBack) => {
  const users = allUsers.map((user, index) =>
    <CreateUser
      key={user.id}
      id={index}
      nickname={user.nickname}
      email={user.email}
      ipAdress={user.ipAdress}
      handleDeleteUser={handleDeleteUser}
      handleSelectDeleteUser={handleSelectDeleteUser}
      comfirmDelete={user.comfirmDelete}
      handleDeleteGoBack={handleDeleteGoBack}
    />
  )
  return users;
}

const CreateUser = props => {
  const { nickname, email, ipAdress, handleDeleteUser, handleSelectDeleteUser, comfirmDelete, id, handleDeleteGoBack } = props;

  return (
    <>
      <tr>
        <td>{nickname}</td>
        <td>{email}</td>
        <td>{ipAdress}</td>
        <td>
          {comfirmDelete ?
            <ButtonsToDelete
              handleDeleteUser={handleDeleteUser}
              email={email}
              id={id}
              handleDeleteGoBack={handleDeleteGoBack}
            />
            : <button onClick={() => handleSelectDeleteUser(id)} className="btn btn-secondary bigBtn">x</button>}
        </td>
      </tr>

    </>
  )
}


const ButtonsToDelete = ({ email, handleDeleteUser, handleDeleteGoBack, id }) => {
  return (
    <>
      <button onClick={(e) => handleDeleteUser(e, email)} className="btn btn-danger">Yes</button>
      <button onClick={() => handleDeleteGoBack(id)} className="btn btn-danger">No</button>
    </>
  )
}

const DeleteAll = ({ handleDeleteAll, handleSelectDeleteAll, deleteAll, handleNoDeleteAll }) => {
  return (
    <>
      {!deleteAll ?
        <button onClick={() => handleSelectDeleteAll()} className="btn btn-dark">Delete all</button>
        : <ComfirmeDeleteAll
          handleDeleteAll={handleDeleteAll}
          handleNoDeleteAll={handleNoDeleteAll}
        />}
    </>
  )
}

const ComfirmeDeleteAll = ({ handleDeleteAll, handleNoDeleteAll }) => {
  return (
    <>
      <button onClick={() => handleDeleteAll()} className="btn btn-danger">Yes</button>
      <button onClick={() => handleNoDeleteAll()} className="btn btn-danger">No</button>
    </>
  )
}