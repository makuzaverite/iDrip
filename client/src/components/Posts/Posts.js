import React, { useContext, useState, useCallback, useEffect } from 'react'
import './Post.css'
import PostItem from './PostItem'
import Spinner from '../layout/Spinner'
import { PostContext } from '../../context/PostContext'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { post_types } from '../../actionsTypes/post_types'

function Posts() {
	const { postState, postDispatch } = useContext(PostContext)

	const { state } = useContext(AuthContext)

	const ChangePost = useCallback(postDispatch, [postState])
	const [isLoading, setisLoading] = useState(false)

	useEffect(() => {
		let mounted = true
		const getPost = async () => {
			try {
				setisLoading(true)
				const token = await localStorage.getItem('auth-token')
				const res = await axios.get('/api/post', {
					headers: {
						Authorization: token,
					},
				})

				if (res.data.data) {
					if (mounted) {
						ChangePost({
							type: post_types.SET_POST,
							payload: { data: res.data.data },
						})
						setisLoading(false)
					}
				}
			} catch (error) {
				console.log(error.response)
			}
		}
		getPost()
		return () => (mounted = false)
	}, [ChangePost])

	return postState.isLoading ? (
		<Spinner />
	) : (
		<section className='posts-section'>
			<div>
				{postState.posts.length > 0 ? (
					postState.posts.map((post) =>
						!isLoading ? (
							<PostItem key={`${post._id}`} post={post} creator={state.user._id} />
						) : (
							<Spinner key={`${post._id}`} />
						)
					)
				) : (
					<p
						style={{
							textAlign: 'center',
							fontFamily: 'Poppins',
							marginTop: '10rem',
							fontSize: '20px',
							fontWeight: 'bold',
						}}>
						No post found{' '}
						<span role='img' aria-labelledby='panda1'>
							'😒'
						</span>{' '}
						?
					</p>
				)}
			</div>
		</section>
	)
}

export default Posts
