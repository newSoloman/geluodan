import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { usePluginData } from '@docusaurus/useGlobalData';
import styles from './index.module.css';

const platformMeta = [
  { key: 'tryhackme', name: 'TryHackMe', to: '/docs/tryhackme', desc: 'TryHackMe 靶机' },
  { key: 'hackmyvm',  name: 'HackMyVM',  to: '/docs/hackmyvm',  desc: 'HackMyVM 靶机' },
  { key: 'mazesec',   name: 'MazeSec',   to: '/docs/mazesec',   desc: 'MazeSec 靶机' },
  { key: 'ulab',      name: 'Ulab',      to: '/docs/ulab',      desc: 'Ulab 靶机' },
];

export default function Home() {
  const data = usePluginData('article-count');
  const { total = 0, perPlatform = {} } = data ?? {};

  return (
    <Layout
      title="geluodan"
      description="geluodan - 记录网络安全靶机 Writeup">
      <main className={styles.page}>
        <section className={styles.hero}>
          <h1 className={styles.title}>你好，我是 geluodan</h1>
          <p className={styles.subtitle}>记录网络安全靶机 Writeup</p>
        </section>

        <div className={styles.grid}>
          {platformMeta.map((meta) => (
            <Link
              key={meta.key}
              to={meta.to}
              className={styles.card}
            >
              <span className={styles.cardName}>{meta.name}</span>
              <span className={styles.cardDesc}>{meta.desc}</span>
              <span className={styles.cardCount}>
                <strong>{perPlatform[meta.key] ?? 0}</strong> 篇
              </span>
            </Link>
          ))}
        </div>

        <p className={styles.total}>文章总数 {total}</p>
      </main>
    </Layout>
  );
}
