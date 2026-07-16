import { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const lines = [
  { prompt: 'guest@geluodan:~$', cmd: 'whoami', output: 'geluodan' },
  { prompt: 'guest@geluodan:~$', cmd: 'cat /etc/motd', output: '记录学习与思考' },
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
    }, 400);
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

export default function Home() {
  return (
    <Layout
      title="geluodan"
      description="geluodan - 记录学习与思考">
      <main className={styles.page}>
        <Terminal />
      </main>
    </Layout>
  );
}
