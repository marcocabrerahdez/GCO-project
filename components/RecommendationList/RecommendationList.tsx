import React from 'react'
import { Card } from 'semantic-ui-react'
import Link from 'next/link'
import Image from 'next/image'

type RecommendationListProps = {
  recommendation: Recommendation[]
}

const mapRecommendationToCards = (recommendation: Recommendation[]) =>
  recommendation.map(({ name, id, job, image }) => (
    <Link key={id} href={`/product/${id}`} passHref>
      <Card
        as="a"
        header={name}
        image={{ children: <Image src={image} width={333} height={333} /> }}
        meta={{
          children: <Card.Meta style={{ color: 'dimgray' }}>{job}</Card.Meta>,
        }}
      />
    </Link>
  ))

const RecommendationList = ({ recommendation }: RecommendationListProps) => (
  <Card.Group itemsPerRow={4} stackable>
    {mapRecommendationToCards(recommendation)}
  </Card.Group>
)

export default RecommendationList
