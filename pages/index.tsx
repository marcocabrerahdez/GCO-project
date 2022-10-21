import React from 'react'
import { GetStaticProps } from 'next'
import fetch from 'isomorphic-unfetch'
import Layout from '@components/Layout/Layout'
import RecommendationList from '@components/RecommendationList/RecommendationList'
import '@components/MatrixtoTable/MatrixtoTable'
import '@components/MatrixBuilder/MatrixBuilder'
import { Grid, Container, Header } from 'semantic-ui-react'
import SelectMetric from '@components/Select/SelectMetric'
import SelectType from '@components/Select/SelectType'
import SelectNeighbors from '@components/Select/SelectNeighbors'
import TablePagination from '@components/Table/TablePagination'
import MatrixBuilder from '@components/MatrixBuilder/MatrixBuilder'
import MatrixtoTable from '@components/MatrixtoTable/MatrixtoTable'

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('https://gco-project.vercel.app/api/recommendation')
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
        <p>Hazme una recomendación</p>
      </section>
      <MatrixtoTable matrix={[[1,2], [1,2]]} metric={2}/>
      <Grid>
        <Grid.Row>
          {/* <Grid.Column width={5}>
            <TablePagination />
          </Grid.Column> */}
          {/* <Grid.Column width={5}>
            <SelectMetric />
            <SelectType />
            <SelectNeighbors />
          </Grid.Column> */}
          {/* <Grid.Column width={5}>
          <TablePagination />
          </Grid.Column> */}
        </Grid.Row>
      </Grid>
      <style jsx>{`
        section {
          text-align: center;
          margin-bottom: 2rem;
        }
        Grid.Column {
          padding: 2rem;
        }
        ProductList {
          display: flex;
        }
      `}</style>
    </Layout>
  )
}

export default Home
