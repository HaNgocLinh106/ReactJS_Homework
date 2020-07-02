import React from 'react';
import './App.css';
import axios from 'axios';
import Check from './Check'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      hoten: '',
      email: '',
      pass: '',
      avatar: [],
      phone: '',
      age: 1,
      gender: 'female',
      favorites: [
        { id: 1, value: 'soccer', isChecked: false, name: 'Đá bóng' },
        { id: 2, value: 'badminton', isChecked: false, name: 'Cầu lông' },
        { id: 3, value: 'sailing', isChecked: false, name: 'Đua thuyền' }
      ],
      note: 'Buổi học đầu tiên về HTML'
    }
  }
  handleChange = (event) => {
    if(event.target.type === 'file') {
      this.setState({
        avatar: event.target.files[0]
      })
    }
    else{
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  }

  handleFavorite = event => {
    let favorites = this.state.favorites
    favorites.forEach(favorite => {
      if (favorite.value === event.target.value)
        favorite.isChecked =  event.target.checked
    })
    this.setState({
      favorites: favorites
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const formdata = new FormData()
    for (const key in this.state) {
      if (this.state.hasOwnProperty(key)) {
        if(key === 'favorites') {
          const favorites = []
          this.state.favorites.forEach(element => {
            if(element.isChecked === true) {
              favorites.push(element.id)
            }
          })
          formdata.append('favorites',favorites)
        }
        else {
          formdata.append(key,this.state[key])
        }
      }
    }
    axios.post(`http://167.99.77.218/api/reactjs`,formdata)
      .then(res => {
        console.log(res)
      })
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="head">Đăng ký thành viên</div>
          <table>
            <thead>
              <tr>
                <th className="name">Nội dung</th>
                <th>Giá trị</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="name">Họ tên:</td>
                <td className="">
                  <input
                    type="text"
                    value={this.state.hoten}
                    onChange={this.handleChange}
                    name="hoten">
                  </input>
                </td>
              </tr>
              <tr>
                <td className="name">Email: </td>
                <td className="">
                  <input
                    type="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    name="email">
                  </input>
                </td>
              </tr>
              <tr>
                <td className="name">Mật khẩu: </td>
                <td className="">
                  <input
                    type="password"
                    value={this.state.pass}
                    onChange={this.handleChange}
                    name="pass">
                  </input>
                </td>
              </tr>
              <tr>
                <td className="name">Avatar: </td>
                <td className="">
                  <input
                    type="file"
                    onChange={this.handleChange} multiple
                    name="avatar">
                  </input>
                </td>
              </tr>
              <tr>
                <td className="name">Số điện thoại: </td>
                <td className="">
                  <input
                    type="number"
                    value={this.state.phone}
                    onChange={this.handleChange}
                    name="phone">
                  </input>
                </td>
              </tr>
              <tr>
                <td className="name">Tuổi:</td>
                <td>
                  <select
                    name="age"
                    value={this.state.age}
                    onChange={this.handleChange}>
                    <option value="1">1 tuổi</option>
                    <option value="2">2 tuổi</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className="name">Giới tính:</td>
                <td>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={this.state.gender === "male"}
                    onChange={this.handleChange}>
                  </input>Nam<br />
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={this.state.gender === "female"}
                    onChange={this.handleChange}>
                  </input>Nữ
                </td>
              </tr>
              <tr>
                <td className="name">Sở thích:</td>
                <td>
                  {
                    this.state.favorites.map((favorite) => {
                      return (
                        <Check
                          handleFavorite={this.handleFavorite}
                          {...favorite} />
                      )
                    })
                  }
                </td>
              </tr>
              <tr>
                <td>Ghi chú:</td>
                <td>
                  <textarea
                  type="text"
                    value={this.state.note}
                    onChange={this.handleChange}
                    name="note">
                  </textarea>
                </td>
              </tr>
            </tbody>
          </table>
          <input type="submit" value="Đăng ký"></input>
        </form>
      </div>
    );
  }
}

export default App;
