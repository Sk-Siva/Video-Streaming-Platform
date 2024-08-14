import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {IoMdClose, IoIosSearch} from 'react-icons/io'

import {
  MainContainer,
  HomeContainer,
  PremiumContainer,
  CloseContainer,
  ImgLogo,
  Button,
  PremiumPara,
  HomeBottomContainer,
  Input,
  InputContainer,
  Btn,
  ViewContainer,
  FailureImg,
  RetryBtn,
  ListContainer,
  SidebarContainer,
} from './styledComponents'

import ThemeContext from '../../Context/ThemeContext'

import Header from '../Header'
import SideBar from '../SideBar'
import VideoItem from '../VideoItem'

const statusConstants = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    videosList: [],
    status: statusConstants.loading,
    userInput: '',
    getPremium: true,
  }

  componentDidMount() {
    this.getHomeVideos()
  }

  getHomeVideos = async () => {
    const {userInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${userInput}`
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
      this.setState({videosList: fetchedList, status: statusConstants.success})
    } else {
      this.setState({status: statusConstants.failure})
    }
  }

  onChangeInput = event => {
    this.setState({userInput: event.target.value})
  }

  onClickBtn = () => {
    this.getHomeVideos()
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
    this.getHomeVideos()
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
    const {videosList} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {lightTheme} = value
          return (
            <div>
              {videosList.length === 0 ? (
                <ViewContainer color={lightTheme ? '#000000' : '#ffffff'}>
                  <FailureImg
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                    alt="no videos"
                  />
                  <h1>No Search results found</h1>
                  <p>Try different key words or remove search filter</p>
                  <RetryBtn type="button" onClick={this.onRetry}>
                    Retry
                  </RetryBtn>
                </ViewContainer>
              ) : (
                <ListContainer flexDirection="row">
                  {videosList.map(each => (
                    <VideoItem key={each.id} videoDetails={each} from="home" />
                  ))}
                </ListContainer>
              )}
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  getHomeViews = () => {
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

  onClose = () => {
    this.setState({getPremium: false})
  }

  getHomeRouteVideos = () => {
    const {getPremium} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {lightTheme} = value
          return (
            <HomeContainer
              data-testid="home"
              bgColor={lightTheme ? '#f9f9f9' : '#181818'}
            >
              <PremiumContainer
                data-testid="banner"
                display={getPremium ? 'block' : 'none'}
              >
                <CloseContainer>
                  <ImgLogo
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="nxt watch logo"
                  />
                  <Button
                    type="button"
                    onClick={this.onClose}
                    border="none"
                    data-testid="close"
                  >
                    <IoMdClose />
                  </Button>
                </CloseContainer>
                <PremiumPara>
                  Buy Nxt Watch Premium prepaid plans with UPI
                </PremiumPara>
                <Button type="button" border="1px solid #000000">
                  GET IT NOW
                </Button>
              </PremiumContainer>
              <HomeBottomContainer>
                <InputContainer>
                  <Input
                    type="search"
                    placeholder="search"
                    onChange={this.onChangeInput}
                  />
                  <Btn
                    type="button"
                    onClick={this.onClickBtn}
                    data-testid="searchButton"
                  >
                    <IoIosSearch />
                  </Btn>
                </InputContainer>
                {this.getHomeViews()}
              </HomeBottomContainer>
            </HomeContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  render() {
    return (
      <>
        <Header />
        <MainContainer>
          <SidebarContainer>
            <SideBar />
          </SidebarContainer>
          {this.getHomeRouteVideos()}
        </MainContainer>
      </>
    )
  }
}

export default Home
