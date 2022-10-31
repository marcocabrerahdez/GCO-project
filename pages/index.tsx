import React from 'react'
import Layout from '@components/Layout/Layout'
import MyHeader from '@components/Header/Header'
import FileLoader from '@components/FileLoader/FileLoader'


const Home = () => {
  return (
    <Layout>
      <MyHeader/>
      <FileLoader/>
    </Layout>
  )
}

export default Home
