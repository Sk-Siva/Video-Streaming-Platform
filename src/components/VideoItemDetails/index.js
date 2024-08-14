import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import {formatDistanceToNow, parse} from 'date-fns'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {BiListPlus} from 'react-icons/bi'

import Header from '../Header'
import SideBar from '../SideBar'
import ThemeContext from '../../Context/ThemeContext'
import {
  MainContainer,
  HomeContainer,
  ViewContainer,
  FailureImg,
  RetryBtn,
  HomeBottomContainer,
  SidebarContainer,
} from '../Home/styledComponents'

import {
  Head,
  BottomContainer,
  Views,
  Span,
  Profile,
  Title,
  TitleSubscribe,
  Button,
} from './styledComponents'

const statusConstants = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideoItemDetails extends Component {
  state = {
    videoData: {},
    status: statusConstants.loading,
    liked: false,
    disliked: false,
    saved: false,
  }

  componentDidMount() {
    this.getvideoDetails()

    const liked = localStorage.getItem('liked') === 'true'
    const disliked = localStorage.getItem('disliked') === 'true'
    const saved = localStorage.getItem('saved') === 'true'

    this.setState({liked, disliked, saved})
  }

  getvideoDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const videoDetails = data.video_details
      const formattedData = {
        id: videoDetails.id,
        title: videoDetails.title,
        videoUrl: videoDetails.video_url,
        thumbnailUrl: videoDetails.thumbnail_url,
        channelName: videoDetails.channel.name,
        profileImageUrl: videoDetails.channel.profile_image_url,
        subscriberCount: videoDetails.channel.subscriber_count,
        viewsCount: videoDetails.view_count,
        publishedAt: videoDetails.published_at,
        description: videoDetails.description,
      }
      this.setState({videoData: formattedData, status: statusConstants.success})
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
    this.getvideoDetails()
  }

  getFailureView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {lightTheme} = value
        return (
          <ViewContainer color={lightTheme ? '#000000' : '#ffffff'}>
            <FailureImg
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
              alt="failure view"
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>We are having some trouble to complete your request. Please try again.</p>
            <RetryBtn type="button" onClick={this.onRetry}>
              Retry
            </RetryBtn>
          </ViewContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

  onLike = () => {
    this.setState(prevState => {
      const newLikedState = !prevState.liked
      localStorage.setItem('liked', newLikedState)
      return {
        liked: newLikedState,
        disliked: false,
      }
    })
  }

  onDisLike = () => {
    this.setState(prevState => {
      const newDislikedState = !prevState.disliked
      localStorage.setItem('disliked', newDislikedState)
      return {
        disliked: newDislikedState,
        liked: false,
      }
    })
  }

  onSave = addSavedVideos => {
    this.setState(prevState => {
      const newSavedState = !prevState.saved
      localStorage.setItem('saved', newSavedState)
      return {
        saved: newSavedState,
      }
    })
    const {videoData} = this.state
    addSavedVideos(videoData)
  }

  getSuccessView = addSavedVideos => {
    const {videoData, liked, disliked, saved} = this.state
    const {
      title,
      videoUrl,
      channelName,
      profileImageUrl,
      subscriberCount,
      viewsCount,
      publishedAt,
      description,
    } = videoData
    const parsedDate = parse(publishedAt, 'MMM dd, yyyy', new Date())
    const formattedTime = formatDistanceToNow(parsedDate)
    return (
      <ThemeContext.Consumer>
        {value => {
          const {lightTheme} = value
          return (
            <>
              <HomeBottomContainer color={lightTheme ? '#000000' : '#ffffff'}>
                <ReactPlayer url={videoUrl} width="100%" />
                <Head>{title}</Head>
                <BottomContainer>
                  <Views>
                    <p>{`${viewsCount} Views`}</p>
                    <Span>•</Span>
                    <p>{formattedTime}</p>
                  </Views>
                  <Views>
                    <Button type="button" active={liked} onClick={this.onLike}>
                      <AiOutlineLike />
                      Like
                    </Button>
                    <Button
                      type="button"
                      active={disliked}
                      onClick={this.onDisLike}
                    >
                      <AiOutlineDislike />
                      DisLike
                    </Button>
                    <Button
                      active={saved}
                      type="button"
                      onClick={() => this.onSave(addSavedVideos)}
                    >
                      <BiListPlus />
                      {saved ? 'Saved' : 'Save'}
                    </Button>
                  </Views>
                </BottomContainer>
                <hr />
                <Views direction="row">
                  <Profile src={profileImageUrl} alt="channel logo" />
                  <Views direction="column">
                    <Title
                      color={lightTheme ? '#000000' : '#ffffff'}
                      size="15px"
                    >
                      {channelName}
                    </Title>
                    <TitleSubscribe>{`${subscriberCount} Subscribers`}</TitleSubscribe>
                  </Views>
                </Views>
                <Title
                  color={lightTheme ? '#000000' : '#ffffff'}
                  size="15px"
                  ml="60px"
                >
                  {description}
                </Title>
              </HomeBottomContainer>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  getVideoViews = addSavedVideos => {
    const {status} = this.state
    switch (status) {
      case statusConstants.loading:
        return this.getLoadingView()
      case statusConstants.success:
        return this.getSuccessView(addSavedVideos)
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
          const {addSavedVideos, lightTheme} = value
          return (
            <>
              <Header />
              <MainContainer>
                <SidebarContainer>
                  <SideBar />
                </SidebarContainer>
                <HomeContainer
                  data-testid="videoItemDetails"
                  bgColor={lightTheme ? '#f9f9f9' : '#0f0f0f'}
                >
                  {this.getVideoViews(addSavedVideos)}
                </HomeContainer>
              </MainContainer>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default VideoItemDetails
