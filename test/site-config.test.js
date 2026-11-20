import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { loadSiteConfig, validateSiteConfig } from '../src/site-config.js'

const config = JSON.parse(await readFile(new URL('../public/site-config.json', import.meta.url), 'utf8'))
const baseUrl = 'https://example.com/website/site-config.json'

test('current configuration preserves downloads and demo', () => {
  const result = validateSiteConfig(config, baseUrl)
  assert.equal(result.downloads.length, 10)
  assert.equal(result.demo.entries.length, 3)
  assert.equal(result.demo.entries[0].name, 'PMS')
  assert.equal(result.demo.entries[1].name, 'POS')
  assert.equal(result.demo.entries[2].name, '会员')
  assert.match(result.demo.entries[0].url, /ihcpms/)
  assert.match(result.demo.entries[1].url, /ihcpos/)
  assert.match(result.demo.entries[2].url, /icsp/)
  assert.equal(result.demo.openInNewTab, true)
  assert.equal(result.trial.to, '18910208087@163.com')
  assert.match(result.trial.subject, /申请试用/)
  assert.equal(result.trial.qqGroup.name, '智云PMS产品交流群')
  assert.equal(result.trial.qqGroup.number, '642781153')
  assert.equal(result.trial.qqGroup.image, 'https://example.com/website/qq-group.jpg')
})

test('relative downloads resolve beside the deployed JSON', () => {
  const updated = structuredClone(config)
  updated.downloads = [{ name: '新版', url: './downloads/client.exe?v=2' }]
  updated.demo.openInNewTab = false
  const result = validateSiteConfig(updated, baseUrl)
  assert.equal(result.downloads[0].url, 'https://example.com/website/downloads/client.exe?v=2')
  assert.equal(result.demo.openInNewTab, false)
  assert.deepEqual(validateSiteConfig({ ...config, downloads: [] }, baseUrl).downloads, [])
})

test('legacy single demo.url still works', () => {
  const legacy = structuredClone(config)
  delete legacy.demo.entries
  legacy.demo.url = 'https://ihotelcloud.cn/ihcpms/#/login'
  const result = validateSiteConfig(legacy, baseUrl)
  assert.equal(result.demo.entries.length, 1)
  assert.equal(result.demo.entries[0].name, 'PMS')
})

test('invalid configuration is rejected', () => {
  assert.throws(() => validateSiteConfig({}, baseUrl), /downloads/)
  assert.throws(() => validateSiteConfig({
    ...config,
    demo: { ...config.demo, entries: [{ name: 'PMS', url: 'javascript:alert(1)' }] }
  }, baseUrl), /http/)
  assert.throws(() => validateSiteConfig({ ...config, downloads: [config.downloads[0], config.downloads[0]] }, baseUrl), /重复/)
  assert.throws(() => validateSiteConfig({ ...config, demo: { ...config.demo, openInNewTab: 'false' } }, baseUrl), /true 或 false/)
  assert.throws(() => validateSiteConfig({ ...config, trial: { to: 'not-an-email', subject: 'x' } }, baseUrl), /邮箱/)
  assert.throws(() => validateSiteConfig({
    ...config,
    trial: { ...config.trial, qqGroup: { name: '群', number: 'abc', image: './qq-group.jpg' } }
  }, baseUrl), /群号/)
})

test('older trial config without a QQ group still loads', () => {
  const legacy = structuredClone(config)
  delete legacy.trial.qqGroup
  const result = validateSiteConfig(legacy, baseUrl)
  assert.deepEqual(result.trial.qqGroup, { name: '', number: '', image: '' })
})

test('each load fetches deployed changes without browser cache', async (t) => {
  let current = config
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(options.cache, 'no-store')
    assert.ok(new URL(url).searchParams.has('_t'))
    assert.ok(options.signal instanceof AbortSignal)
    return { ok: true, json: async () => current }
  })
  assert.equal((await loadSiteConfig(baseUrl)).demo.label, '立即体验')
  current = { ...config, demo: { ...config.demo, label: '新版演示' } }
  assert.equal((await loadSiteConfig(baseUrl)).demo.label, '新版演示')
})

test('HTTP and malformed JSON failures propagate to the page fallback', async (t) => {
  const fetch = t.mock.method(globalThis, 'fetch', async () => ({ ok: false, status: 404 }))
  await assert.rejects(loadSiteConfig(baseUrl), /HTTP 404/)
  fetch.mock.mockImplementation(async () => ({ ok: true, json: async () => { throw new SyntaxError('Invalid JSON') } }))
  await assert.rejects(loadSiteConfig(baseUrl), /Invalid JSON/)
})
