import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {device} from '../../BreakPoints/breakPoints'

export const LinkEl = styled(Link)`
text-decoration:none;
`
export const Image = styled.img`
height:150px;
width:280px;
`
export const ProfileImage = styled.img`
height:40px;
width:40px;
margin:10px;
margin-top:20px;
`
export const ProfileContainer = styled.div`
display:flex;
justify-content:flex-start;
align-items:flex-start;
padding-left:10px;
`
export const VideoItemContainer = styled.div`
color:${props => props.color};
height:350px;
width:300px;
margin:20px;
@media ${device.smmobile}{
    margin:0px;
}
`
export const ProfileBottomContainer = styled.div`
color:${props => props.color}
`
export const ViewsContainer = styled.div`
display:flex;
justify-content:flex-start;
align-items:center;
`
export const DatePara = styled.p`
margin-left:10px;
`
