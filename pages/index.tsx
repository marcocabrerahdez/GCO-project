import React from 'react'
import { GetStaticProps } from 'next'
import fetch from 'isomorphic-unfetch'
import Layout from '@components/Layout/Layout'
import RecommendationList from '@components/RecommendationList/RecommendationList'

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('https://recommender-system.vercel.app/api/recommendation')
  const { data: recommendationList }: TAPIRecommendationResponse = await response.json()

  return {
    props: {
      recommendationList,
    },
  }
}

const Home = ({ recommendationList }: { recommendationList: Recommendation[] }) => {
  return (
    <Layout>
      <section>
        <p>¿Deberia comer un avo hoy?</p>
      </section>
      <RecommendationList recommendation={recommendationList} />
      <style jsx>{`
        section {
          text-align: center;
          margin-bottom: 2rem;
        }

        ProductList {
          display: flex;
        }
      `}</style>
    </Layout>
  )
}

export default Home
