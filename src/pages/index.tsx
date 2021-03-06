import type { GetStaticProps, NextPage } from "next"
import { load } from "@/shared/lib/config"
import { Meta } from "@/shared/lib/meta"
import { parseByURL } from "@/shared/lib/parser/rss"
import { findPosts } from "@/shared/features/post/api"
import { Posts } from "@/shared/features/post/components/Posts"
import { Post } from "@/shared/features/post/types/post"
import { TwoColumn } from "@/shared/layouts/TwoColumn"
import { NextPageWithLayout } from "./_app"

type Props = {
  posts: Post[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const config = load()
  const qiitaFeed = await parseByURL(config.QIITA_URL)
  const zennFeed = await parseByURL(config.ZENN_URL)

  const postsFromFeed: Post[] = [...qiitaFeed.items, ...zennFeed.items].map(
    (v) => {
      return {
        id: v.title || "",
        type: "external",
        title: v.title || "",
        content: v.content || "",
        link: v.link || "",
        createdAt: v.isoDate || "",
        updatedAt: v.isoDate || "",
      }
    }
  )

  const postsFromNotion = await findPosts()

  const posts = [...postsFromFeed, ...postsFromNotion].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return {
    props: {
      posts,
    },
    revalidate: 1,
  }
}

const Page: NextPageWithLayout<Props> = (props) => {
  return (
    <>
      <Meta
        title="๐ฃ๐ฃ๐ช๐ช"
        description="ใใใใใฎใใญใฐใงใใ"
        ogType="website"
      />
      <Posts posts={props.posts} />
    </>
  )
}
Page.getLayout = (page) => {
  return <TwoColumn>{page}</TwoColumn>
}
export default Page
