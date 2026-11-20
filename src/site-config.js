export const emptySiteConfig = {
  demo: { label: '立即体验', openInNewTab: true, entries: [] },
  trial: {
    to: '',
    subject: '智云PMS官网 - 申请试用',
    qqGroup: { name: '', number: '', image: '' }
  },
  downloads: [],
  trainingVideos: { topicsUrl: '', subFlowsUrl: '', moduleId: '' }
}

function requireText(value, field) {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`${field} 必须是非空字符串`)
  }
  return value.trim()
}

function requireUrl(value, field, baseUrl) {
  const url = new URL(requireText(value, field), baseUrl)
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error(`${field} 必须使用 http 或 https 地址`)
  }
  return url.href
}

function requireEmail(value, field) {
  const email = requireText(value, field)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error(`${field} 必须是有效邮箱`)
  }
  return email
}

function normalizeQqGroup(trial, baseUrl) {
  const group = trial?.qqGroup
  if (group == null) return { name: '', number: '', image: '' }
  if (typeof group !== 'object' || Array.isArray(group)) {
    throw new Error('trial.qqGroup 必须是对象')
  }
  const name = typeof group.name === 'string' ? group.name.trim() : ''
  const number = typeof group.number === 'string' ? group.number.trim() : ''
  const image = group.image ? requireUrl(group.image, 'trial.qqGroup.image', baseUrl) : ''
  if ((name || number || image) && !/^\d{5,12}$/.test(number)) {
    throw new Error('trial.qqGroup.number 必须是 5 到 12 位群号')
  }
  return { name, number, image }
}

function normalizeDemoEntries(demo, baseUrl) {
  if (Array.isArray(demo?.entries)) {
    if (demo.entries.length === 0) {
      throw new Error('demo.entries 不能为空')
    }
    const names = new Set()
    return demo.entries.map((entry, index) => {
      const name = requireText(entry?.name, `demo.entries[${index}].name`)
      if (names.has(name)) throw new Error(`演示入口名称重复：${name}`)
      names.add(name)
      return {
        name,
        url: requireUrl(entry.url, `demo.entries[${index}].url`, baseUrl)
      }
    })
  }

  // 兼容旧版单地址配置
  if (demo?.url) {
    return [{ name: 'PMS', url: requireUrl(demo.url, 'demo.url', baseUrl) }]
  }

  throw new Error('demo.entries 必须是数组')
}

export function validateSiteConfig(data, baseUrl) {
  if (!data || !Array.isArray(data.downloads)) {
    throw new Error('downloads 必须是数组')
  }
  if (typeof data.demo?.openInNewTab !== 'boolean') {
    throw new Error('demo.openInNewTab 必须为 true 或 false')
  }
  const names = new Set()
  const entries = normalizeDemoEntries(data.demo, baseUrl)
  return {
    demo: {
      label: requireText(data.demo.label, 'demo.label'),
      openInNewTab: data.demo.openInNewTab,
      entries
    },
    trial: {
      to: requireEmail(data.trial?.to, 'trial.to'),
      subject: requireText(data.trial?.subject || '智云PMS官网 - 申请试用', 'trial.subject'),
      qqGroup: normalizeQqGroup(data.trial, baseUrl)
    },
    downloads: data.downloads.map((product, index) => {
      const name = requireText(product?.name, `downloads[${index}].name`)
      if (names.has(name)) throw new Error(`下载名称重复：${name}`)
      names.add(name)
      return { name, url: requireUrl(product.url, `downloads[${index}].url`, baseUrl) }
    }),
    trainingVideos: {
      topicsUrl: requireUrl(data.trainingVideos?.topicsUrl, 'trainingVideos.topicsUrl', baseUrl),
      subFlowsUrl: requireUrl(data.trainingVideos?.subFlowsUrl, 'trainingVideos.subFlowsUrl', baseUrl),
      moduleId: requireText(data.trainingVideos?.moduleId, 'trainingVideos.moduleId')
    }
  }
}

export async function loadSiteConfig(configUrl) {
  const url = new URL(configUrl)
  url.searchParams.set('_t', Date.now().toString())
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)
  try {
    const response = await fetch(url.href, { cache: 'no-store', signal: controller.signal })
    if (!response.ok) throw new Error(`配置请求失败：HTTP ${response.status}`)
    return validateSiteConfig(await response.json(), configUrl)
  } finally {
    clearTimeout(timeout)
  }
}
