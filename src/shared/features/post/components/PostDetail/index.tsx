import * as Types from "@/shared/features/post/types"
import { format } from "@/shared/lib/date"
import { BulletedList } from "./components/BulletedList"
import { Code } from "./components/Code"
import { Heading } from "./components/Heading"
import { Paragraph } from "./components/Paragraph"
import * as S from "./styled"

type Props = {
  postDetail: Types.PostDetail
}

export const PostDetail = (props: Props) => {
  // TODO: これだと再帰できないのでどうするか考える
  // 現状ulとliが1-1でも問題ない

  // ulの要素の始まりと終わりがわからないので詰め直す
  // const blocks = props.postDetail.blocks.reduce<Types.Block[]>((p, c, i) => {
  //   if (c.type !== "bulletedListItem") return [...p, c]
  //   if (i === 0) return [...p, c]
  //   const lastItem = p[p.length - 1]
  //   if (!lastItem) return [...p, c]
  //   if (lastItem.type !== "bulletedListItem") return [...p, c]
  //   const { richText } = lastItem
  //   return [
  //     ...p.slice(0, -1),
  //     { ...lastItem, richText: [...richText, ...c.richText] },
  //   ]
  // }, [])

  return (
    <S.Wrap>
      <div>
        <S.Title>{props.postDetail.title.plainText}</S.Title>
        <S.DateLabel>{format(props.postDetail.createdAt)}</S.DateLabel>
      </div>
      {props.postDetail.blocks.map(renderBlock)}
    </S.Wrap>
  )
}

const renderBlock = (v: Types.Block) => {
  switch (v.type) {
    case "heading1":
      return <Heading as="h1" text={v.richText} />
    case "heading2":
      return <Heading as="h2" text={v.richText} />
    case "heading3":
      return <Heading as="h3" text={v.richText} />
    case "paragraph":
      return <Paragraph text={v.richText} />
    case "bulletedListItem":
      return <BulletedList blocks={[v]} />
    case "code":
      return <Code text={v.richText} language={v.language} />
    default:
      return null
  }
}
