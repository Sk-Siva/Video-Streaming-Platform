import {formatDistanceToNow, parse} from 'date-fns'
import ThemeContext from '../../Context/ThemeContext'

import {
  LinkEl,
  Image,
  ProfileContainer,
  ProfileBottomContainer,
  ViewsContainer,
} from '../VideoItem/styledComponents'

import {Span} from '../VideoItemDetails/styledComponents'

import {TrendingItemContainer} from './styledComponents'

const TrendingItem = props => {
  const {videoDetails, from} = props
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
              <TrendingItemContainer color={lightTheme ? '#000000' : '#ffffff'}>
                <Image src={thumbnailUrl} alt="video thumbnail" />
                <ProfileContainer>
                  <div>
                    <p>{title}</p>
                    <ProfileBottomContainer
                      color={lightTheme ? '#000000' : '#475569'}
                    >
                      <p>{channelName}</p>
                      <ViewsContainer>
                        <p>{viewsCount}</p>
                        <Span>•</Span>
                        <p>{formattedTime}</p>
                      </ViewsContainer>
                    </ProfileBottomContainer>
                  </div>
                </ProfileContainer>
              </TrendingItemContainer>
            </li>
          </LinkEl>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default TrendingItem
