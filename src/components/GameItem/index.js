import ThemeContext from '../../Context/ThemeContext'

import {LinkEl} from '../VideoItem/styledComponents'
import {GameImg, GameItemContainer, Views} from './styledComponents'

const GameItem = props => {
  const {videoDetails} = props
  const {id, title, thumbnailUrl, viewsCount} = videoDetails
  return (
    <ThemeContext.Consumer>
      {value => {
        const {lightTheme} = value
        return (
          <LinkEl to={`/videos/${id}`}>
            <li>
              <GameItemContainer color={lightTheme ? '#000000' : '#ffffff'}>
                <GameImg src={thumbnailUrl} alt="video thumbnail" />
                <p>{title}</p>
                <Views
                  color={lightTheme ? '#000000' : '#475569'}
                >{`${viewsCount} Watching Worldwide`}</Views>
              </GameItemContainer>
            </li>
          </LinkEl>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default GameItem
