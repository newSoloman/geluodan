import { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { usePluginData } from '@docusaurus/useGlobalData';
import styles from './index.module.css';

const lines = [
  { prompt: 'guest@geluodan:~$', cmd: 'whoami', output: 'geluodan' },
  { prompt: 'guest@geluodan:~$', cmd: 'ls -l /targets', output: 'tryhackme  hackmyvm  mazesec  ulab' },
];

const platformMeta = {
  tryhackme: { name: 'TryHackMe', to: '/docs/tryhackme', desc: 'TryHackMe 靶机', featured: true },
  hackmyvm:  { name: 'HackMyVM',  to: '/docs/hackmyvm',  desc: 'HackMyVM 靶机' },
  mazesec:   { name: 'MazeSec',   to: '/docs/mazesec',   desc: 'MazeSec 靶机' },
  ulab:      { name: 'Ulab',      to: '/docs/ulab',      desc: 'Ulab 靶机' },
};

function Terminal() {
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    let idx = 0;
    const timer = setInterval(() => {
      if (idx < lines.length) {
        setVisible(prev => [...prev, idx]);
        idx++;
      } else {
        clearInterval(timer);
      }
    }, 500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.terminal}>
      {lines.map((line, i) => (
        visible.includes(i) && (
          <div key={i} className={styles.block}>
            <div className={styles.line}>
              <span className={styles.prompt}>{line.prompt} </span>
              <span className={styles.cmd}>{line.cmd}</span>
            </div>
            <div className={styles.output}>{line.output}</div>
          </div>
        )
      ))}
      <div className={styles.line}>
        <span className={styles.prompt}>guest@geluodan:~$ </span>
        <span className={styles.cursor}>&#9608;</span>
      </div>
    </div>
  );
}

function StatCell({ total, perPlatform }) {
  const entries = Object.entries(platformMeta);

  return (
    <div className={`${styles.bentoCard} ${styles.statCell}`}>
      <div className={styles.statInner}>
        <div className={styles.statHeader}>
          <span className={styles.statIcon}>📝</span>
          <span className={styles.statTotal}>{total}</span>
          <span className={styles.statUnit}>篇文章</span>
        </div>
        <div className={styles.statBar}>
          {entries.map(([key, meta]) => {
            const count = perPlatform[key] ?? 0;
            const pct = total > 0 ? (count / total) * 100 : 0;
            return (
              <div
                key={key}
                className={styles.statBarSegment}
                style={{ flex: pct || 0.01 }}
                title={`${meta.name}: ${count} 篇`}
              />
            );
          })}
        </div>
        <div className={styles.statLegend}>
          {entries.map(([key, meta]) => (
            <span key={key} className={styles.statLegendItem}>
              <span className={styles.statDot} data-platform={key} />
              {meta.name} <strong>{perPlatform[key] ?? 0}</strong>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlatformCard({ platformKey, count, featured }) {
  const meta = platformMeta[platformKey];
  if (!meta) return null;

  return (
    <Link
      to={meta.to}
      className={`${styles.bentoCard} ${styles.platformCard} ${featured ? styles.featured : ''}`}
      data-platform={platformKey}
    >
      <div className={styles.cardGlow} />
      <div className={styles.cardContent}>
        <div className={styles.cardTop}>
          <h3 className={styles.cardTitle}>{meta.name}</h3>
          <span className={styles.cardCount}>
            <span className={styles.countNum}>{count}</span>
            <span className={styles.countLabel}>篇</span>
          </span>
        </div>
        <p className={styles.cardDesc}>{meta.desc}</p>
        <span className={styles.cardArrow}>→</span>
      </div>
      <div className={styles.cardAccent} />
    </Link>
  );
}

export default function Home() {
  const data = usePluginData('article-count');
  const { total = 0, perPlatform = {} } = data ?? {};

  return (
    <Layout
      title="geluodan"
      description="geluodan - 记录学习与思考">
      <main className={styles.page}>
        {/* 噪点纹理 */}
        <div className={styles.noise} />

        <p className={styles.motto}>千淘万漉虽辛苦，吹尽狂沙始到金</p>
        <Terminal />

        {/* Bento 网格 */}
        <div className={styles.bento}>
          <StatCell total={total} perPlatform={perPlatform} />
          {Object.entries(platformMeta).map(([key, meta]) => (
            <PlatformCard
              key={key}
              platformKey={key}
              count={perPlatform[key] ?? 0}
              featured={meta.featured}
            />
          ))}
        </div>
      </main>
    </Layout>
  );
}
