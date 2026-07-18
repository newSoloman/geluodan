// @ts-check
const fs = require('fs');
const path = require('path');

/**
 * 统计 docs/ 下各平台的文章数量（排除 index.mdx）
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
        if (fs.existsSync(dir)) {
          const articles = fs.readdirSync(dir).filter(
            (f) => f.endsWith('.mdx') && f !== 'index.mdx',
          );
          perPlatform[platform] = articles.length;
          total += articles.length;
        } else {
          perPlatform[platform] = 0;
        }
      }

      actions.setGlobalData({ total, perPlatform });
    },
  };
};
