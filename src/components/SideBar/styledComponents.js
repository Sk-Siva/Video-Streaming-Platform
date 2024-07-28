import styled from 'styled-components'
import {Link} from 'react-router-dom'

import {IoMdHome} from 'react-icons/io'
import {FaFireAlt} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'

export const SidebarContainer = styled.div`
  background-color: ${props => props.bgColor};
  color: ${props => props.color};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  height: 93%;
  position: fixed;
  top: 73px;
  left: 0;
  width: 250px;
`
export const LinkEl = styled(Link)`
  text-decoration: none;
`

export const SideButton = styled.p`
  background-color: ${props => (props.currTab ? '#94a3b8' : 'transparent')};
  border: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  color: ${props => props.color};
  border-radius: 10px;
  width: 150px;
`
export const Home = styled(IoMdHome)`
  color: ${props => props.color};
  margin-right: 10px;
`
export const Trending = styled(FaFireAlt)`
  color: #94a3b8;
  margin-right: 10px;
`
export const Gaming = styled(SiYoutubegaming)`
  color: #94a3b8;
  margin-right: 10px;
`
export const SavedVideos = styled(BiListPlus)`
  color: #94a3b8;
  margin-right: 10px;
`

export const Image = styled.img`
  height: 40px;
  width: 40px;
  margin: 5px;
`
export const NavContainer = styled.ul`
  list-style-type: none;
  padding: 0px;
`
