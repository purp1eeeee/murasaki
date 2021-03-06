import * as React from "react"
import styled, { css } from "styled-components"
import { RichText } from "@/shared/features/post/types"

type Props = {
  as: As
  text: RichText[]
}

export const Heading = (props: Props) => {
  const H = elementMap[props.as]
  if (!H) return null
  return (
    <H id={encodeURIComponent(props.text[0]?.plainText || "")}>
      {props.text[0]?.plainText}
    </H>
  )
}

const base = css`
  font-weight: bold;
  margin-top: 24px;
  margin-bottom: 12px;
  scroll-margin-top: 16px;
`
const H1 = styled.h1`
  ${base};
  font-size: 24px;
`

const H2 = styled.h2`
  ${base};
  font-size: 20px;
`

const H3 = styled.h3`
  ${base};
  font-size: 18px;
`
type As = "h1" | "h2" | "h3"

const elementMap = {
  h1: H1,
  h2: H2,
  h3: H3,
}
