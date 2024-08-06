import {formatDistanceToNow, parse} from 'date-fns'
import ThemeContext from '../../Context/ThemeContext'

import {
  LinkEl,
  VideoItemContainer,
  Image,
  ProfileImage,
  ProfileContainer,
  ProfileBottomContainer,
  ViewsContainer,
  DatePara,
} from './styledComponents'

const VideoItem = props => {
  const {videoDetails} = props
  const {
    id,
    title,
    thumbnailUrl,
    channelName,
    profileImageUrl,
    viewsCount,
    publishedAt,
  } = videoDetails
  const parsedDate = parse(publishedAt, 'MMM dd, yyyy', new Date())
  const formattedTime = formatDistanceToNow(parsedDate)
  return (
    <ThemeContext.Consumer>
      {value => {
        const {lightTheme} = value
        return (
          <LinkEl to={`/videos/${id}`}>
            <li>
              <VideoItemContainer color={lightTheme ? '#000000' : '#ffffff'}>
                <Image src={thumbnailUrl} alt="video thumbnail" />
                <ProfileContainer>
                  <ProfileImage src={profileImageUrl} alt="channel logo" />
                  <div>
                    <p>{title}</p>
                    <ProfileBottomContainer color="#475569">
                      <p>{channelName}</p>
                      <ViewsContainer>
                        <p>{viewsCount}</p>
                        <DatePara>{formattedTime}</DatePara>
                      </ViewsContainer>
                    </ProfileBottomContainer>
                  </div>
                </ProfileContainer>
              </VideoItemContainer>
            </li>
          </LinkEl>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default VideoItem
