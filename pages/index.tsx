
import Head from 'next/head'
import React, { useEffect } from 'react'
import Container from '../components/container'
import { G } from '../components/g/G'


const Index: React.FC<{}> = () => {
    return <>
        <Head>
            <title>ギターコード検索</title>
        </Head>
        <Container>
            <div lang="ja" className="w-full pt-10">
                <div>
                    <G />
                </div>
            </div>
        </Container>
    </>
}

export default Index




