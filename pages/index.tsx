import React from 'react'
import { GetStaticProps } from 'next'
import fetch from 'isomorphic-unfetch'
import Layout from '@components/Layout/Layout'
import MyHeader from '@components/Header/Header'
import SelectGroup from '@components/Select/SelectGroup'
import FileLoaderContainer from '@components/FileLoader/FileLoaderContainer'

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
      <FileLoaderContainer/>
      <SelectGroup/>
    </Layout>
  )
}

export default Home
