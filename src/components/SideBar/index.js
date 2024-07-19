import {Component} from 'react'

import ThemeContext from '../../Context/ThemeContext'

import {
  SidebarContainer,
  SideButton,
  LinkEl,
  Home,
  Trending,
  Gaming,
  SavedVideos,
  Image,
  NavContainer,
} from './styledComponents'

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

class SideBar extends Component {
  state = {currentTab: tabsList[0].id}

  onChangeTab = id => {
    this.setState({currentTab: id}, () => {})
  }

  render() {
    const {currentTab} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {lightTheme} = value
          return (
            <SidebarContainer
              bgColor={lightTheme ? '#ffffff' : '#231f20'}
              color={lightTheme ? '#000000' : '#ffffff'}
            >
              <NavContainer>
                {tabsList.map(each => (
                  <LinkEl to={`/${each.route}`} key={each.id}>
                    <div>
                      <SideButton
                        currTab={currentTab === each.id}
                        color={lightTheme ? '#000000' : '#ffffff'}
                        type="button"
                        onClick={() => this.onChangeTab(each.id)}
                      >
                        {each.logo({
                          color: lightTheme ? '#000000' : '#ffffff',
                        })}
                        {each.text}
                      </SideButton>
                    </div>
                  </LinkEl>
                ))}
              </NavContainer>
              <div>
                <p>CONTACT US</p>
                <div>
                  <Image
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    alt="facebook logo"
                  />
                  <Image
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                    alt="twitter logo"
                  />
                  <Image
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt="linked in logo"
                  />
                </div>
                <p>Enjoy! Now to see your channels and recommendations!</p>
              </div>
            </SidebarContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default SideBar
