import React from 'react'
import { GetStaticProps } from 'next'
import fetch from 'isomorphic-unfetch'
import Layout from '@components/Layout/Layout'
import MyHeader from '@components/Header/Header'
import FileLoader from '@components/FileLoader/FileLoader'

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('https://gco-project.vercel.app/api/recommendation')
  const { data: recommendationList }: TAPIRecommendationResponse = await response.json()

  return {
    props: {
      recommendationList,
    },
  }
}


const Home = () => {
  return (
    <Layout>
      <MyHeader/>
      <FileLoader/>
    </Layout>
  )
}

export default Home
