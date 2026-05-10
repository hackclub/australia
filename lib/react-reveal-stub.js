// Pass-through stub for the abandoned `react-reveal` package, which is
// incompatible with React 19. Each component simply renders its children.
import React from 'react'

const Pass = ({ children }) => <>{children}</>

export const Fade = Pass
export const Slide = Pass
export const Zoom = Pass
export const Flip = Pass
export const Rotate = Pass
export const Bounce = Pass
export const LightSpeed = Pass
export const Roll = Pass
export const Reveal = Pass

export default Pass
