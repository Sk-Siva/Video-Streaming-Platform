import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import SideBar from '../SideBar'
import TrendingItem from '../TrendingItem'

import ThemeContext from '../../Context/ThemeContext'

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

import {TrendingHead, TrendingLogo} from './styledComponents'

const statusConstants = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Trending extends Component {
  state = {trendingVideosList: [], status: statusConstants.loading}

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
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
        channelName: each.channel.name,
        profileImageUrl: each.channel.profile_image_url,
        viewsCount: each.view_count,
        publishedAt: each.published_at,
      }))
      this.setState({
        trendingVideosList: fetchedList,
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
    this.getTrendingVideos()
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
    const {trendingVideosList} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {lightTheme} = value
          return (
            <div>
              <TrendingHead
                bgColor={lightTheme ? '#e2e8f0' : '#181818'}
                color={lightTheme ? '#000000' : '#ffffff'}
                data-testid="banner"
              >
                <TrendingLogo bgcolor={lightTheme ? '#cbd5e1' : '#0f0f0f'} />
                <h1>Trending</h1>
              </TrendingHead>
              <HomeBottomContainer>
                <ListContainer flexDirection="column">
                  {trendingVideosList.map(each => (
                    <TrendingItem key={each.id} videoDetails={each} />
                  ))}
                </ListContainer>
              </HomeBottomContainer>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  getTrendingViews = () => {
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
                  data-testid="trending"
                  bgColor={lightTheme ? '#f9f9f9' : '#0f0f0f'}
                >
                  {this.getTrendingViews()}
                </HomeContainer>
              </MainContainer>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Trending
