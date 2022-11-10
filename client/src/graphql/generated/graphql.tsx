import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CustomError = {
  __typename?: 'CustomError';
  errorName: Scalars['String'];
  message: Scalars['String'];
};

/** Digimon 2020 TCG Card Information */
export type DigimonCard = {
  __typename?: 'DigimonCard';
  artist?: Maybe<Scalars['String']>;
  attribute?: Maybe<Scalars['String']>;
  cardnumber?: Maybe<Scalars['String']>;
  cardrarity?: Maybe<Scalars['String']>;
  color: Scalars['String'];
  digit_type?: Maybe<Scalars['String']>;
  dp?: Maybe<Scalars['Int']>;
  evolution_cost?: Maybe<Scalars['Int']>;
  image_url: Scalars['String'];
  level?: Maybe<Scalars['Int']>;
  maineffect?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  play_cost?: Maybe<Scalars['Int']>;
  set_name: Scalars['String'];
  soureeffect?: Maybe<Scalars['String']>;
  stage?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: UserResponse;
  logout: Scalars['Boolean'];
  registerUser: UserResponse;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRegisterUserArgs = {
  data: RegisterUserInput;
};

export type Query = {
  __typename?: 'Query';
  getCurrentUser?: Maybe<UserResponse>;
  getDigimonCards: Array<DigimonCard>;
};

/** New registered user input */
export type RegisterUserInput = {
  email: Scalars['String'];
  hashPassword: Scalars['String'];
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['Float'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<CustomError>>;
  user?: Maybe<User>;
};

export type GetDigimonCardsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDigimonCardsQuery = { __typename?: 'Query', getDigimonCards: Array<{ __typename?: 'DigimonCard', name: string, image_url: string }> };


export const GetDigimonCardsDocument = gql`
    query getDigimonCards {
  getDigimonCards {
    name
    image_url
  }
}
    `;

/**
 * __useGetDigimonCardsQuery__
 *
 * To run a query within a React component, call `useGetDigimonCardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDigimonCardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDigimonCardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDigimonCardsQuery(baseOptions?: Apollo.QueryHookOptions<GetDigimonCardsQuery, GetDigimonCardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDigimonCardsQuery, GetDigimonCardsQueryVariables>(GetDigimonCardsDocument, options);
      }
export function useGetDigimonCardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDigimonCardsQuery, GetDigimonCardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDigimonCardsQuery, GetDigimonCardsQueryVariables>(GetDigimonCardsDocument, options);
        }
export type GetDigimonCardsQueryHookResult = ReturnType<typeof useGetDigimonCardsQuery>;
export type GetDigimonCardsLazyQueryHookResult = ReturnType<typeof useGetDigimonCardsLazyQuery>;
export type GetDigimonCardsQueryResult = Apollo.QueryResult<GetDigimonCardsQuery, GetDigimonCardsQueryVariables>;