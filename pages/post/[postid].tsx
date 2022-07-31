import { useMutation, useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import Post from '../../components/Post'
import { GET_ALL_POST_BY_ID } from '../../graphql/queries'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { ADD_COMMENT } from '../../graphql/mutations'

type FormData = {
  comment: string
}

const Postpage = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_ALL_POST_BY_ID, 'getPostListByPostId'],
  })

  const { loading, error, data } = useQuery(GET_ALL_POST_BY_ID, {
    variables: {
      post_id: router.query.postid,
    },
  })

  const post: Post = data?.getPostListByPostId

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    //post comment
    console.log(data)
  }

  return (
    <div className="mx-auto my-7 max-w-5xl">
      <Post post={post} />
      <div className=" -mt-1 rounded-b-md border border-t-0 border-gray-300 bg-white p-5 pl-16">
        <p className="text-sm">
          Comment as <span className="text-red-500">{session?.user?.name}</span>
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-2"
        >
          <textarea
            {...register('comment')}
            disabled={!session}
            className="h-24 rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50"
            placeholder={
              session ? 'What are your thoughts?' : 'Please sign in to comment'
            }
          />

          <button
            type="submit"
            className="rounded-full bg-red-500 p-3 font-semibold text-white disabled:bg-gray-200"
          >
            Comment
          </button>
        </form>
      </div>
    </div>
  )
}

export default Postpage