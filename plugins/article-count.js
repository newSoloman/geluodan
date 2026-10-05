// @ts-check
const fs = require('fs');
const path = require('path');

/**
 * 递归统计目录下所有 .mdx 文章数量（排除 index.mdx）
 */
function countArticlesRecursive(dir) {
  let count = 0;
  if (!fs.existsSync(dir)) return count;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      count += countArticlesRecursive(fullPath);
    } else if (
      entry.isFile() &&
      entry.name.endsWith('.mdx') &&
      entry.name !== 'index.mdx'
    ) {
      count += 1;
    }
  }
  return count;
}

/**
 * 统计 docs/ 下各平台的文章数量（排除 index.mdx，递归扫描子目录）
 */
module.exports = function articleCountPlugin(_context, _options) {
  return {
    name: 'article-count',

    async contentLoaded({ actions }) {
      const docsDir = path.join(_context.siteDir, 'docs');
      const platforms = ['tryhackme', 'hackmyvm', 'mazesec', 'ulab'];

      let total = 0;
      const perPlatform = {};

      for (const platform of platforms) {
        const dir = path.join(docsDir, platform);
        const count = countArticlesRecursive(dir);
        perPlatform[platform] = count;
        total += count;
      }

      actions.setGlobalData({ total, perPlatform });
    },
  };
};
