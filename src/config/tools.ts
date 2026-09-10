export type ToolEntry = {
  url: string
  name: string
  summary: string
  tags: readonly string[]
  repository?: `https://github.com/${string}`
}

export const tools: readonly ToolEntry[] = [
  {
    url: '/image-metadata/',
    name: '图片 Metadata',
    summary: '在浏览器本地读取、编辑并写入图片 XMP 元数据，不上传图片。',
    tags: ['XMP', '隐私', '图片'],
    repository: 'https://github.com/rowthan/image-metadata',
  },
  {
    url: 'https://pagenote.cn',
    name: 'PageNote',
    summary: '集网页高亮、批注与剪藏于一体的浏览器插件，帮助你保存和整理阅读内容。',
    tags: ['高亮', '批注', '剪藏'],
  },
]
