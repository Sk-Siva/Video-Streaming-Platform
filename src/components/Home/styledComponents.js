import styled from 'styled-components'
import {device} from '../../BreakPoints/breakPoints'

export const MainContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  font-family: Roboto;
`
export const HomeContainer = styled.div`
  background-color: ${props => props.bgColor};
  margin-left: 0px;
  margin-top: 73px;
  margin-right: 0px;
  width: 100%;
  @media ${device.tablet} {
    margin-left: 250px;
  }
`

export const PremiumContainer = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  padding: 20px;
  padding-bottom: 30px;
  display: ${props => props.display};
`
export const CloseContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const ImgLogo = styled.img`
  height: 30px;
  width: 100px;
`
export const Button = styled.button`
  border: ${props => props.border};
  border-radius: 2px;
  background: transparent;
`
export const PremiumHead = styled.p`
  font-size: 20px;
`
export const HomeBottomContainer = styled.div`
  horizontal-align: center;
  color: ${props => props.color};
  padding: 10px;
  min-height: 100vh;
  width: 100%;
`
export const Input = styled.input`
  width: 300px;
  padding: 2px;
`
export const InputContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`
export const Btn = styled.button`
  padding-left: 5px;
  padding-right: 5px;
`
export const ViewContainer = styled.div`
  color: ${props => props.color};
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`

export const FailureImg = styled.img`
  height: 300px;
  width: 300px;
`
export const RetryBtn = styled.button`
  color: #ffffff;
  background-color: #3b82f6;
  border-width: 0px;
  border-radius: 10px;
  padding: 10px;
`
export const ListContainer = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: ${props => props.flexDirection};
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
`
export const SidebarContainer = styled.div`
  display: none;
  @media ${device.tablet} {
    display: block;
  }
`
