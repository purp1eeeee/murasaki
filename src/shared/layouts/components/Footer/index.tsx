import styled from "styled-components"
import { GoMarkGithub } from "react-icons/go"
import { AppLink } from "@/shared/components/AppLink"

export const Footer = () => {
  return (
    <Wrap>
      <Detail>
        <Small>Copyright 2022 Haruki Murasaki</Small>
        <AppLink isExternal href="https://github.com/purp1eeeee/murasaki">
          <GoMarkGithub size="24px" />
        </AppLink>
      </Detail>
    </Wrap>
  )
}

const Wrap = styled.footer`
  padding-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Detail = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const Small = styled.small`
  font-size: 12px;
`
