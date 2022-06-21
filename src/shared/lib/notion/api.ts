import * as Notion from "@notionhq/client"
import { PageObj } from "./types"

const client = new Notion.Client({
  auth: "secret_Yw1lNzRWtre9xfKGgQxE9uk3b5Gg9i8QnQT2kHoFTH9",
})

const id = "3447ba89113a4e9484ca06e98ea47aed"

export const findDBWherePublished = async (): Promise<PageObj[]> => {
  const res = await client.databases.query({
    database_id: "3dc71c3166304af6bcde94eb88258b0a",
    filter: {
      or: [
        {
          type: "checkbox",
          property: "Published",
          checkbox: {
            equals: true,
          },
        },
      ],
    },
    sorts: [
      {
        property: "CreatedAt",
        direction: "ascending",
      },
    ],
  })
  // notion-sdk-jsの型定義が壊れている
  return res.results as PageObj[]
}