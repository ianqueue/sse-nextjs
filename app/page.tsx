'use client';

import { fetchEventSource } from '@microsoft/fetch-event-source';
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })
let utf8decoder = new TextDecoder()
export default function Home() {
  const [data, setData] = useState<{value: string}[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchEventSource(`/api/lyrics`, {
        method: 'GET',

        async onopen(res) {
          console.log('=====onopen=====');
          console.log(res);
        },
        async onmessage(event) {
          console.log('=====onmessage=====');
          console.log((event.data));
          console.log(JSON.parse(event.data));
          
          let line = JSON.parse(event.data);
 
          setData((curLines) => [...curLines, ...[{ value: line.value }]]);
        },
        onclose() {
          console.log('=====onclose=====');
        },
        onerror(err) {
          console.log('=====onerror=====');
          console.log('There was an error from server', err);
        },
      });
    };

    fetchData();
  }, []);

  return (
    <main className={styles.main}>

      <div>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />

        <br /><br /><br /><br />

        {data.map((line, index)=> line.value !== "\n\n" ? <p className={"typewriter"} key={index}>{line.value}</p> : <p className={"newline"} key={index}></p>)}
      </div>

    </main>
  )
}
