import styled from 'styled-components'

export const Head = styled.p`
  font-size: 15px;
`
export const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 575px) {
    display: block;
  }
`
export const Views = styled.div`
  display: flex;
  flex-direction: ${props => props.direction};
  justify-content: flex-start;
  align-items: center;
  color: #64748b;
`
export const Span = styled.span`
  margin: 10px;
`
export const Profile = styled.img`
  height: 50px;
  width: 50px;
`

export const Title = styled.p`
  color: ${props => props.color};
  font-size: ${props => props.size};
  margin-left: ${props => props.ml};
`
export const TitleSubscribe = styled.p`
  color: #7e858e;
  font-size: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
`
export const Button = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${props => (props.active ? '#2563eb' : '#64748b')};
  background: transparent;
  border: none;
  margin-right: 10px;
`
