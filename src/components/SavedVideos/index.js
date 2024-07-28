import Header from '../Header'
import SideBar from '../SideBar'
import TrendingItem from '../TrendingItem'

import ThemeContext from '../../Context/ThemeContext'

import {
  MainContainer,
  HomeContainer,
  ViewContainer,
  FailureImg,
  ListContainer,
  HomeBottomContainer,
  SidebarContainer,
} from '../Home/styledComponents'

import {TrendingHead, SavedLogo} from '../Trending/styledComponents'

const SavedVideos = () => (
  <ThemeContext.Consumer>
    {value => {
      const {savedVideosList, lightTheme} = value
      return (
        <>
          <Header />
          <MainContainer>
            <SidebarContainer>
              <SideBar />
            </SidebarContainer>
            <HomeContainer
              data-testid="savedVideos"
              bgColor={lightTheme ? '#f9f9f9' : '#0f0f0f'}
            >
              <HomeBottomContainer>
                {savedVideosList.length === 0 ? (
                  <ViewContainer color={lightTheme ? '#000000' : '#ffffff'}>
                    <FailureImg
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                      alt="no saved videos"
                    />
                    <h1>No saved videos found</h1>
                    <p>You can save your videos while watching them</p>
                  </ViewContainer>
                ) : (
                  <>
                    <TrendingHead
                      bgColor={lightTheme ? '#e2e8f0' : '#181818'}
                      color={lightTheme ? '#000000' : '#ffffff'}
                      data-testid="banner"
                    >
                      <SavedLogo bgcolor={lightTheme ? '#cbd5e1' : '#0f0f0f'} />
                      <h1>Saved Videos</h1>
                    </TrendingHead>

                    <ListContainer flexDirection="column">
                      {savedVideosList.map(each => (
                        <TrendingItem
                          key={each.id}
                          videoDetails={each}
                          from="trending"
                        />
                      ))}
                    </ListContainer>
                  </>
                )}
              </HomeBottomContainer>
            </HomeContainer>
          </MainContainer>
        </>
      )
    }}
  </ThemeContext.Consumer>
)

export default SavedVideos
