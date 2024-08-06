import styled from 'styled-components'

export const LoginMainContainer = styled.div`
  background-color: ${props => props.bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

export const FormContainer = styled.form`
  background-color: ${props => props.bgColor};
  box-shadow: ${props => props.shadow};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  border-radius: 10px;
  color: #7e858e;
`
export const LogoImage = styled.img`
  height: 50px;
  width: 200px;
  margin: 10px;
  @media screen and (max-width: 767px) {
    height: 40px;
    width: 120px;
  }
`
export const Label = styled.label`
  font-size: 15px;
`
export const Input = styled.input`
  height: 30px;
  width: 250px;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  border-width: 1px;
`
export const Button = styled.button`
  background-color: #3b82f6;
  color: #ffffff;
  border-width: 0px;
  border-radius: 5px;
  padding: 10px;
  margin: 5px;
`
export const ErrorMsg = styled.p`
  color: #ff0000;
  font-size: 10px;
`
