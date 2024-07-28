import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import {FaBars} from 'react-icons/fa'
import {IoIosLogOut} from 'react-icons/io'

import {
  HeaderContainer,
  HeaderSideContainer,
  Button,
  Profile,
  LightTheme,
  DarkTheme,
  LogoutContainer,
  LogoutButton,
  LogoutButtonSm,
  HamburgerButton,
  SmallMenu,
  MenuItem,
  BtnContainer,
} from './styledComponents'

import {
  LinkEl,
  Home,
  Trending,
  Gaming,
  SavedVideos,
} from '../SideBar/styledComponents'

import {LogoImage} from '../Login/styledComponents'

import ThemeContext from '../../Context/ThemeContext'

const tabsList = [
  {
    id: 1,
    text: 'Home',
    route: '',
    logo: props => <Home {...props} />,
  },
  {
    id: 2,
    text: 'Trending',
    route: 'trending',
    logo: props => <Trending {...props} />,
  },
  {
    id: 3,
    text: 'Gaming',
    route: 'gaming',
    logo: props => <Gaming {...props} />,
  },
  {
    id: 4,
    text: 'Saved Videos',
    route: 'saved-videos',
    logo: props => <SavedVideos {...props} />,
  },
]

class Header extends Component {
  state = {showSidebar: false}

  toggleSidebar = () => {
    this.setState(prevState => ({showSidebar: !prevState.showSidebar}))
  }

  render() {
    const {showSidebar} = this.state
    return (
      <div>
        <ThemeContext.Consumer>
          {value => {
            const {lightTheme, changeTheme} = value
            const onclickLight = () => {
              changeTheme()
            }
            const onLogout = () => {
              const {history} = this.props
              Cookies.remove('jwt_token')
              history.replace('/login')
            }
            return (
              <HeaderContainer bgColor={lightTheme ? '#ffffff' : '#231f20'}>
                <li>
                  <Link to="/">
                    <LogoImage
                      src={
                        lightTheme
                          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                      }
                      alt="website logo"
                    />
                  </Link>
                </li>
                <HeaderSideContainer>
                  <Button
                    type="button"
                    onClick={onclickLight}
                    all
                    border="none"
                    bgColor="transparent"
                    data-testid="theme"
                  >
                    {lightTheme ? <LightTheme /> : <DarkTheme />}
                  </Button>
                  <Button
                    type="button"
                    border="none"
                    bgColor="transparent"
                    display="block"
                  >
                    <Profile
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                      alt="profile"
                    />
                  </Button>
                  <HamburgerButton onClick={this.toggleSidebar}>
                    <FaBars
                      size={30}
                      color={lightTheme ? '#000000' : '#ffffff'}
                    />
                  </HamburgerButton>

                  {showSidebar && (
                    <SmallMenu bgColor={lightTheme ? '#ffffff' : '#231f20'}>
                      {tabsList.map(each => (
                        <LinkEl to={`/${each.route}`} key={each.id}>
                          <MenuItem
                            onClick={this.toggleSidebar}
                            color={lightTheme ? '#000000' : '#ffffff'}
                          >
                            {each.logo({
                              color: lightTheme ? '#000000' : '#ffffff',
                            })}
                            {each.text}
                          </MenuItem>
                        </LinkEl>
                      ))}
                    </SmallMenu>
                  )}

                  <Popup
                    modal
                    overlayStyle={{background: 'rgba(0, 0, 0, 0.5)'}}
                    trigger={
                      <div>
                        <LogoutButton
                          type="button"
                          className="trigger-button"
                          border={`1px solid ${
                            lightTheme ? '#4f46e5' : '#ffffff'
                          }`}
                          color={lightTheme ? '#4f46e5' : '#ffffff'}
                        >
                          Logout
                        </LogoutButton>
                        <LogoutButtonSm
                          type="button"
                          className="trigger-button"
                          border="none"
                          color={lightTheme ? '#4f46e5' : '#ffffff'}
                        >
                          <IoIosLogOut
                            size={30}
                            color={lightTheme ? '#000000' : '#ffffff'}
                          />
                        </LogoutButtonSm>
                      </div>
                    }
                  >
                    {close => (
                      <LogoutContainer
                        bgColor={lightTheme ? '#ffffff' : '#383838'}
                        color={lightTheme ? '#000000' : '#ffffff'}
                      >
                        <div>
                          <p>Are you sure, you want to logout?</p>
                        </div>
                        <BtnContainer>
                          <Button
                            type="button"
                            className="trigger-button"
                            onClick={() => close()}
                            border="1px solid #cbd5e1"
                            color="#cbd5e1"
                            bgColor="transparent"
                            all
                          >
                            Cancel
                          </Button>
                          <Button
                            type="button"
                            onClick={onLogout}
                            color="#ffffff"
                            bgColor="#3b82f6"
                            border="none"
                            all
                          >
                            Confirm
                          </Button>
                        </BtnContainer>
                      </LogoutContainer>
                    )}
                  </Popup>
                </HeaderSideContainer>
              </HeaderContainer>
            )
          }}
        </ThemeContext.Consumer>
      </div>
    )
  }
}

export default withRouter(Header)
