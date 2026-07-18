import { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { usePluginData } from '@docusaurus/useGlobalData';
import styles from './index.module.css';

const lines = [
  { prompt: 'guest@geluodan:~$', cmd: 'whoami', output: 'geluodan' },
  { prompt: 'guest@geluodan:~$', cmd: 'ls -l /targets', output: 'tryhackme  hackmyvm  mazesec  ulab' },
];

const platforms = [
  { name: 'Tryhackme', to: '/docs/tryhackme', desc: 'TryHackMe 靶机 Writeup' },
  { name: 'HackMyVM', to: '/docs/hackmyvm', desc: 'HackMyVM 靶机 Writeup' },
  { name: 'MazeSec', to: '/docs/mazesec', desc: 'MazeSec 靶机 Writeup' },
  { name: 'Ulab', to: '/docs/ulab', desc: 'Ulab 靶机 Writeup' },
];

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

function Stats() {
  const data = usePluginData('article-count');
  const { total = 0, perPlatform = {} } = data ?? {};

  if (total === 0) return null;

  const labels = {
    tryhackme: 'TryHackMe',
    hackmyvm: 'HackMyVM',
    mazesec: 'MazeSec',
    ulab: 'Ulab',
  };

  return (
    <div className={styles.stats}>
      <div className={styles.statTotal}>
        <span className={styles.statIcon}>📝</span>
        <span className={styles.statNumber}>{total}</span>
        <span className={styles.statLabel}>篇文章</span>
      </div>
      <div className={styles.statDivider} />
      <div className={styles.statBreakdown}>
        {Object.entries(labels).map(([key, name]) => (
          <span key={key} className={styles.statItem}>
            <span className={styles.statPlatform}>{name}</span>
            <span className={styles.statCount}>{perPlatform[key] ?? 0}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Layout
      title="geluodan"
      description="geluodan - 记录学习与思考">
      <main className={styles.page}>
        <p className={styles.motto}>千淘万漉虽辛苦，吹尽狂沙始到金</p>
        <Terminal />
        <Stats />
        <div className={styles.grid}>
          {platforms.map(p => (
            <Link key={p.name} to={p.to} className={styles.card}>
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  );
}
