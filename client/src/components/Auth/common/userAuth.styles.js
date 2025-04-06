import styled, { keyframes } from "styled-components";
import { APP_COLORS } from "../../../enums/Colors";
import { Autocomplete } from "@mui/material";

// Main Container
export const Container = styled.div`
  font-family: Georgia, "Times New Roman", Times, serif;
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% - 80px);
  height: calc(100vh - 150px);

  padding: 20px;
  overflow: auto;
  transition: all 0.3s ease;
  position: relative;
  margin: 40px;

  @media (max-width: 1024px) {
    margin: 30px;
    padding: 15px;
    font-size: 14px;
  }

  @media (max-width: 768px) {
    width: calc(100% - 10px);
    height: calc(100vh -100px);
    flex-direction: column;
    margin: 20px 10px;
    padding: 10px;
  }

  @media (max-width: 480px) {
    width: calc(100% - 10px);
    height: calc(100vh -100px);
  }
`;

// SignUp Container
export const SignUpContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  padding: 30px;
  opacity: 0;
  z-index: 1;
  transition: transform 0.6s ease, opacity 0.3s ease;

  ${({ signinIn }) =>
    signinIn !== true &&
    `
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
  `}

  @media (max-width: 768px) {
    position: static; /* Stacks naturally on mobile */
    width: 100%;
    transform: none;
    opacity: 1;
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

// SignIn Container
export const SignInContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  padding: 30px;
  z-index: 2;
  transition: transform 0.6s ease-in-out;

  ${({ signinIn }) =>
    signinIn !== true &&
    `
    transform: translateX(100%);
  `}

  @media (max-width: 768px) {
    position: static; /* Stacks naturally on mobile */
    width: 100%;
    transform: none;
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

// Form
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center; /* Better centering for form elements */
  justify-content: center;
  padding: 40px;
  width: 100%;
  max-width: 500px; /* Prevents form from becoming too wide */
  height: auto; /* Allows natural growth */
  text-align: center;

  @media (max-width: 1024px) {
    padding: 30px;
    max-width: 450px;
  }

  @media (max-width: 768px) {
    padding: 20px;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    padding: 15px;
  }
`;
// Title styling
export const Title = styled.h1`
  font-weight: bold;
  margin: 0 0 20px;
  font-size: 28px;
  color: ${APP_COLORS.primary[500]};

  // Medium screens
  @media (max-width: 768px) {
    font-size: 24px;
  }

  // Small screens
  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

// Select dropdown styling
export const Select = styled.select`
  padding: 12px;
  font-size: 16px;
  color: ${APP_COLORS.grey[800]};
  border: 1px solid ${APP_COLORS.grey[200]};
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;

  &:focus {
    border-color: ${APP_COLORS.accent[500]};
    outline: none;
  }
  // Medium screens
  @media (max-width: 768px) {
    font-size: 14px;
  }

  // Small screens
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

// Input field styling
export const Input = styled.input`
  background-color: ${APP_COLORS.grey[50]};
  border: 1px solid ${APP_COLORS.grey[200]};
  border-radius: 20px;
  padding: 12px 15px;
  margin: 10px 0;
  width: 100%;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${APP_COLORS.accent[500]};
    box-shadow: 0 0 0 2px rgba(224, 145, 69, 0.5);
  }

  // Medium screens
  @media (max-width: 768px) {
    font-size: 14px;
  }

  // Small screens
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

// Toggle Wrapper styling
export const ToggleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  gap: 20px;

  // Medium screens
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }

  // Small screens
  @media (max-width: 480px) {
    gap: 10px;
  }
`;

// Paragraph styling
export const P = styled.p`
  margin: 0;
  font-size: 16px;
  color: ${APP_COLORS.grey[800]};

  // Medium screens
  @media (max-width: 768px) {
    font-size: 14px;
  }

  // Small screens
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

// Button styling
export const Button = styled.button`
  border-radius: 25px;
  border: none;
  background-color: ${APP_COLORS.common.black};
  color: ${APP_COLORS.common.white};
  font-size: 16px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 80ms ease-in,
    box-shadow 0.3s ease;

  &:hover {
    background-color: ${APP_COLORS.primary[400]};
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
    box-shadow: ${APP_COLORS.common.black[200]};
  }
  margin-top: 20px;

  @media (max-width: 768px) {
    padding: 10px 30px;
    font-size: 14px;
  }
  @media (max-width: 480px) {
    padding: 8px 20px;
    font-size: 12px;
  }
`;

// Ghost Button styling
export const GhostButton = styled(Button)`
  background-color: ${APP_COLORS.primary[400]};
  color: ${APP_COLORS.common.black[500]};

  &:hover {
    background-color: ${APP_COLORS.common.black};
    color: ${APP_COLORS.common.white};
  }
`;

// Anchor link styling
export const Anchor = styled.a`
  color: ${APP_COLORS.grey[800]};
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
  transition: color 0.3s ease;

  &:hover {
    color: ${APP_COLORS.accent[500]};
  }

  // Medium screens
  @media (max-width: 768px) {
    font-size: 12px;
  }

  // Small screens
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  padding: 10px;
  border-radius: 20px;

  ${({ signinIn }) => signinIn !== true && `transform: translateX(-100%);`}
`;

export const Overlay = styled.div`
  color: ${APP_COLORS.common.white};
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;

  ${({ signinIn }) => signinIn !== true && `transform: translateX(50%);`}
`;

export const OverlayPanel = styled.div`
  background: url(${(props) => props.bgImage}) center center / cover no-repeat;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  border-radius: 20px;
`;

export const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${({ signinIn }) => signinIn !== true && `transform: translateX(0);`}
`;

export const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);
  ${({ signinIn }) => signinIn !== true && `transform: translateX(20%);`}
`;

export const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;

// Styles for file input
export const FileInput = styled(Input).attrs({ type: "file" })`
  padding: 10px;
  border: none;
  background-color: ${APP_COLORS.common.white};
  margin: 10px 0;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${APP_COLORS.grey[100]};
  }
`;

// Keyframe animation for sliding in from the left
const slideInLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Keyframe animation for sliding in from the right
const slideInRight = keyframes`
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Keyframe animation for fading out to the left
const fadeOutLeft = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-100%);
  }
`;

// Keyframe animation for fading out to the right
const fadeOutRight = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(100%);
  }
`;

export const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 16px;
  border-radius: 20px;
  transition: box-shadow 0.3s ease-in-out;

  &.slide-in-left {
    animation: ${slideInLeft} 10s forwards ease-in-out;
  }

  &.slide-in-right {
    animation: ${slideInRight} 1s forwards ease-in-out;
  }

  &.fade-out-left {
    animation: ${fadeOutLeft} 10s forwards ease-in-out;
  }

  &.fade-out-right {
    animation: ${fadeOutRight} 1s forwards ease-in-out;
  }

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

export const CheckpointSlider = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  background: ${APP_COLORS.grey[300]};
  border-radius: 5px;
  outline: none;
  transition: background 0.3s ease;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${APP_COLORS.accent[500]};
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease;

    &:hover {
      background: ${APP_COLORS.accent[600]};
      transform: scale(1.1);
    }
  }

  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${APP_COLORS.accent[500]};
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease;

    &:hover {
      background: ${APP_COLORS.accent[600]};
      transform: scale(1.1);
    }
  }

  &::-ms-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${APP_COLORS.accent[500]};
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease;

    &:hover {
      background: ${APP_COLORS.accent[600]};
      transform: scale(1.1);
    }
  }

  @media (max-width: 768px) {
    height: 6px;
  }
`;

export const CheckpointLabel = styled.label`
  font-size: 13px;
  color: ${APP_COLORS.grey[600]};
  margin-top: 8px;
  letter-spacing: 0.5px;
  font-weight: 500;
  text-transform: capitalize;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: ${APP_COLORS.secondary[700]};
  }
`;
export const LinkContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

  a {
    color: ${APP_COLORS.primary[500]};
    text-decoration: none;
    font-size: 14px;
  }

  a:hover {
    text-decoration: underline;
  }
`;

export const StyledAutocomplete = styled(Autocomplete)`
  /* Root input container styles */
  & .MuiAutocomplete-inputRoot {
    background-color: ${APP_COLORS.grey[50]};
    border-radius: 30px;
    width: 100%;
    font-size: 14px;
    margin-left: 10px;
    margin-bottom: 10px;
  }

  & .MuiAutocomplete-input {
    padding: 8px 12px;
  }

  & .MuiAutocomplete-popupIndicatorOpen {
    transform: rotate(180deg);
  }

  & .MuiAutocomplete-clearIndicator {
    color: ${APP_COLORS.error[500]};
  }

  & .MuiAutocomplete-listbox {
    background-color: ${APP_COLORS.common.white};
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 8px 0;
    margin-top: 4px;
  }

  & .MuiAutocomplete-option {
    padding: 10px 20px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: ${APP_COLORS.primary[100]};
    }

    &.Mui-focused {
      background-color: ${APP_COLORS.primary[200]};
    }
  }
`;
