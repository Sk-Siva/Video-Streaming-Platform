import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import {
  LoginMainContainer,
  FormContainer,
  LogoImage,
  Label,
  Input,
  Button,
  ErrorMsg,
} from './styledComponents'

import ThemeContext from '../../Context/ThemeContext'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showError: false,
    errorMsg: '',
    checked: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeCheckbox = () => {
    this.setState(prevState => ({checked: !prevState.checked}))
  }

  getSubmitSuccess = token => {
    const {history} = this.props
    Cookies.set('jwt_token', token, {expires: 30})

    history.replace('/')
  }

  getSubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    if (response.ok) {
      this.getSubmitSuccess(data.jwt_token)
    } else {
      this.getSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showError, errorMsg, checked} = this.state
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <ThemeContext.Consumer>
        {value => {
          const {lightTheme} = value
          return (
            <LoginMainContainer bgColor={lightTheme ? '#ffffff' : '#181818'}>
              <FormContainer
                bgColor={lightTheme ? '#ffffff' : '#000000'}
                shadow={lightTheme ? '0px 0px 10px 2px #cccccc' : 'none'}
                onSubmit={this.onSubmitForm}
              >
                <LogoImage
                  src={
                    lightTheme
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                  }
                  alt="website logo"
                />
                <div>
                  <Label htmlFor="username">USERNAME</Label> <br />
                  <Input
                    type="text"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={this.onChangeUsername}
                  />
                </div>
                <div>
                  <Label htmlFor="password">PASSWORD</Label> <br />
                  <Input
                    type={checked ? 'text' : 'password'}
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.onChangePassword}
                  />
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="checkbox"
                    onChange={this.onChangeCheckbox}
                  />
                  <Label htmlFor="checkbox">Show Password</Label>
                </div>
                <Button type="submit">Login</Button>
                {showError && <ErrorMsg>*{errorMsg}</ErrorMsg>}
              </FormContainer>
            </LoginMainContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Login
