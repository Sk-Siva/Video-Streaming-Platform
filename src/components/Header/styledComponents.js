import styled from 'styled-components'
import {FaMoon} from 'react-icons/fa'
import {IoIosSunny} from 'react-icons/io'
import {device} from '../../BreakPoints/breakPoints'

export const HeaderContainer = styled.ul`
list-style-type:none;
height:73px;
background-color:${props => props.bgColor};
display:flex;
justify-content:space-between;
align-items:center;
position:fixed;
top:0;
left:0;
right:0;
margin-top:0px;
`
export const HeaderSideContainer = styled.li`
background-color:transparent;
display:flex;
justify-content:space-evenly;
align-items:center;
`
export const HeaderListContainer = styled.ul`
list-style-type:none;
display:flex;
justify-content:space-between;
align-items:center;
`

export const Button = styled.button`
background:transparent;
border:${props => props.border};
color:${props => props.color};
padding:5px;
background-color:${props => props.bgColor};
border-radius:5px;
margin-left:5px;
margin-right:5px;
@media ${device.bgmobile}{
  display:${props => props.display}
}
`
export const LightTheme = styled(FaMoon)`
  height:30px;
  width:30px;
`

export const DarkTheme = styled(IoIosSunny)`
  height:30px;
  width:30px;
  color:#ffffff;
`

export const Profile = styled.img`
height:30px;
width:30px;
`
export const LogoutContainer = styled.div`
background-color:${props => props.bgColor};
padding:20px;
color:${props => props.color};
border-radius:10px;
text-align:center;
`
export const LogoutButton = styled.button`
background:transparent;
border:${props => props.border};
color:${props => props.color};
padding:5px;
background-color:${props => props.bgColor};
border-radius:5px;
margin-left:5px;
margin-right:5px;
display:none;
@media ${device.tablet}{
  display:block;
}
`
export const LogoutButtonSm = styled.button`
background:transparent;
border:${props => props.border};
color:${props => props.color};
padding:5px;
background-color:${props => props.bgColor};
border-radius:5px;
margin-left:5px;
margin-right:5px;
display:block;
@media ${device.tablet}{
  display:none;
}
`

export const HamburgerButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: block;
  @media ${device.tablet} {
    display: none;
  }
`

export const SmallMenu = styled.div`
  background-color: ${props => props.bgColor};
  position: absolute;
  top: 50px;
  right: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 10px;
  display: flex;
  flex-direction: column
`
export const MenuItem = styled.div`
  color:${props => props.color};
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #f1f1f1;
  }
`
