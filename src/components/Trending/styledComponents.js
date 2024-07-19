import styled from 'styled-components'
import {FaFireAlt} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'

export const TrendingHead = styled.div`
display:flex;
justifycontent:flex-start;
align-items:center;
background-color:${props => props.bgColor};
padding-left:50px;
color:${props => props.color};
`
export const TrendingLogo = styled(FaFireAlt)`
height:50px;
width:50px;
border-radius:50%;
background-color:${props => props.bgcolor};
padding:10px;
margin-right:10px;
color:#ff0000;
`
export const GamingLogo = styled(SiYoutubegaming)`
height:50px;
width:50px;
border-radius:50%;
background-color:${props => props.bgcolor};
padding:10px;
margin-right:10px;
color:#ff0000;
`
export const SavedLogo = styled(BiListPlus)`
height:50px;
width:50px;
border-radius:50%;
background-color:${props => props.bgcolor};
padding:10px;
margin-right:10px;
color:#ff0000;
`
