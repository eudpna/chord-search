
import Head from 'next/head'
import React, { useEffect } from 'react'
import { G } from '../components/g/G'


const Index: React.FC<{}> = () => {
    return <>
        <Head>
            <title>ギターコード検索</title>
        </Head>
        <div lang="ja" className="w-full pt-10">
            <div>
                <G />
            </div>
        </div>
    </>
}

export default Index




