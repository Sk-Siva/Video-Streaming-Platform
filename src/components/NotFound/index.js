import Header from '../Header'
import SideBar from '../SideBar'
import ThemeContext from '../../Context/ThemeContext'

import {
  MainContainer,
  ViewContainer,
  HomeBottomContainer,
  HomeContainer,
  FailureImg,
  SidebarContainer,
} from '../Home/styledComponents'

const NotFound = () => (
  <ThemeContext.Consumer>
    {value => {
      const {lightTheme} = value
      return (
        <>
          <Header />
          <MainContainer>
            <SidebarContainer>
              <SideBar />
            </SidebarContainer>
            <HomeContainer>
              <HomeBottomContainer bgColor={lightTheme ? '#f9f9f9' : '#0f0f0f'}>
                <ViewContainer color={lightTheme ? '#000000' : '#ffffff'}>
                  <FailureImg
                    src={
                      lightTheme
                        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
                    }
                    alt="not found"
                  />
                  <h1>Page Not Found</h1>
                  <p>
                    We are sorry, the page you requested could not be found.
                  </p>
                </ViewContainer>
              </HomeBottomContainer>
            </HomeContainer>
          </MainContainer>
        </>
      )
    }}
  </ThemeContext.Consumer>
)

export default NotFound
