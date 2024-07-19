import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import SideBar from '../SideBar'
import GameItem from '../GameItem'
import {
  MainContainer,
  HomeContainer,
  ViewContainer,
  FailureImg,
  RetryBtn,
  ListContainer,
  HomeBottomContainer,
  SidebarContainer,
} from '../Home/styledComponents'

import {TrendingHead, GamingLogo} from '../Trending/styledComponents'

import ThemeContext from '../../Context/ThemeContext'

const statusConstants = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Gaming extends Component {
  state = {gamingVideosList: [], status: statusConstants.loading}

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const fetchedList = data.videos.map(each => ({
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        viewsCount: each.view_count,
      }))
      this.setState({
        gamingVideosList: fetchedList,
        status: statusConstants.success,
      })
    } else {
      this.setState({status: statusConstants.failure})
    }
  }

  getLoadingView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {lightTheme} = value
        return (
          <ViewContainer
            className="loader-container"
            data-testid="loader"
            color={lightTheme ? '#000000' : '#ffffff'}
          >
            <Loader
              type="ThreeDots"
              color={lightTheme ? '#000000' : '#ffffff'}
              height="50"
              width="50"
            />
          </ViewContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

  onRetry = () => {
    this.getGamingVideos()
  }

  getFailureView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {lightTheme} = value
        return (
          <ViewContainer color={lightTheme ? '#000000' : '#ffffff'}>
            <FailureImg
              src={
                lightTheme
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
              }
              alt="failure view"
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>We are having some trouble to complete your request.</p>
            <p>Please try again</p>
            <RetryBtn type="button" onClick={this.onRetry}>
              Retry
            </RetryBtn>
          </ViewContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

  getSuccessView = () => {
    const {gamingVideosList} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {lightTheme} = value
          return (
            <>
              <TrendingHead
                bgColor={lightTheme ? '#e2e8f0' : '#181818'}
                color={lightTheme ? '#000000' : '#ffffff'}
                data-testid="banner"
              >
                <GamingLogo bgcolor={lightTheme ? '#cbd5e1' : '#0f0f0f'} />
                <h1>Gaming</h1>
              </TrendingHead>
              <HomeBottomContainer>
                <ListContainer>
                  {gamingVideosList.map(each => (
                    <GameItem key={each.id} videoDetails={each} />
                  ))}
                </ListContainer>
              </HomeBottomContainer>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
  getGamingViews = () => {
    const {status} = this.state
    switch (status) {
      case statusConstants.loading:
        return this.getLoadingView()
      case statusConstants.success:
        return this.getSuccessView()
      case statusConstants.failure:
        return this.getFailureView()
      default:
        return null
    }
  }
  render() {
    return (
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
                <HomeContainer
                  data-testid="gaming"
                  bgColor={lightTheme ? '#f9f9f9' : '#0f0f0f'}
                >
                  {this.getGamingViews()}
                </HomeContainer>
              </MainContainer>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Gaming
