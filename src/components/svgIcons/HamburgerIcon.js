import * as React from "react"
import Svg, { Path } from "react-native-svg"

function HamBurgerIcon(props) {
  return (
    <Svg
      width={64}
      height={48}
      viewBox="0 0 64 48"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path fill="white" d="M0 5h64M0 43h64M0 23h64" stroke="#fff" strokeWidth={10} />
    </Svg>
  )
}

export function HamBurgerIconWhite(props) {
  return (
    <Svg  {...props} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M37.4998 10.4814V5.48389H22.4998V10.4814H7.49976V15.4814H52.4998V10.4814H37.4998Z" fill="#216ADD" />
      <Path d="M12.4998 17.9808V47.9808C12.4998 50.7358 14.7423 52.9808 17.4998 52.9808H42.4998C45.2573 52.9808 47.4998 50.7358 47.4998 47.9808V17.9808H12.4998ZM27.4998 42.9833H22.4998V27.9833H27.4998V42.9833ZM37.4998 42.9833H32.4998V27.9833H37.4998V42.9833Z" fill="#216ADD" />
    </Svg>
  )
}
export default HamBurgerIcon
