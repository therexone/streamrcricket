import styled, { keyframes } from "styled-components";

const LoadingSpinner = () => {
  return <Container className="lds-dual-ring"></Container>;
};

const rotatingAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  &.lds-dual-ring {
    display: block;
  }
  &.lds-dual-ring:after {
    content: " ";
    display: block;
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    border: 1.5px solid #fdbc2c;
    border-color: #fdbc2c #fdbb2c29 #fdbc2c #fdbb2c29;
    animation: ${rotatingAnimation} 1.2s linear infinite;
  }
`;

export default LoadingSpinner;
