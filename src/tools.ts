export type ToolEntry = {
  slug: string
  name: string
  summary: string
  tags: readonly string[]
  repository: `https://github.com/${string}`
}

export const tools = [
  {
    slug: 'image-metadata',
    name: '图片 Metadata',
    summary: '在浏览器本地读取、编辑并写入图片 XMP 元数据，不上传图片。',
    tags: ['XMP', '隐私', '图片'],
    repository: 'https://github.com/rowthan/image-metadata',
  },
] as const satisfies readonly ToolEntry[]

export function getToolUrl(tool: ToolEntry) {
  return `/${tool.slug}/`
}
