type Url = string
type Json =
  | string
  | number
  | boolean
  | null
  | { [property: string]: Json }
  | Json[]

type RecommendationId = string

type TRecommendationAttributes = {
  description: string
}

type Recommendation = {
  id: RecommendationtId
  name: string
  job: string
  image: Url
  attributes: RecommendationAttributes
}

type TAPIRecommendationDetailResponse = Recommendation

type TAPIRecommendationResponse = {
  length: number
  data: Recommendation[]
  error?: string
}
