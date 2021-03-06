import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Spinner from '../../../layout/Spinner'
import './Profiles.css'
// import { Link } from 'react-router-dom'
// import Avatar from '../avatar.png'

export default function Profiles({ match }) {
	const [profile, setProfile] = useState()

	useEffect(() => {
		const logProfile = async () => {
			try {
				const resp = await Axios.get(`/api/profile/${match.params.id}`)
				setProfile(resp.data.data)
			} catch (error) {
				console.log(error.response.data)
			}
		}
		logProfile()
	}, [match.params.id])

	return !profile ? (
		<Spinner />
	) : (
		<>
			{/* <div className='profiler__card'>
				<div className='profile_avatar'>
					<img src={Avatar} alt='profile' />
				</div>

				<div className='intro_to_user'>
					<div className='follow'>
						<h3>username</h3>
						<button>Follow</button>
					</div>

					<div className='posts_summary'>
						<p>
							<strong>14050</strong> Posts
						</p>
						<p>
							<strong>14050</strong> Followers
						</p>
						<p>
							<strong>14050</strong> Following
						</p>
					</div>
				</div>
			</div> */}

			<div className='profilePostGallery'></div>

			{/* {profile.username ? (
				<p>
					Username: <span style={{ fontWeight: 'bold' }}>{profile.username}</span>
				</p>
			) : null}
			{profile.bio ? (
				<p>
					Bio: <span style={{ fontWeight: 'bold' }}>{profile.bio}</span>{' '}
				</p>
			) : null}
			{profile.gender ? (
				<p>
					Gender: <span style={{ fontWeight: 'bold' }}>{profile.gender}</span>{' '}
				</p>
			) : null}
			{profile.website ? (
				<p>
					Website:{' '}
					<Link style={{ fontWeight: 'bold' }} to={profile.website}>
						{profile.website}
					</Link>{' '}
				</p>
			) : null}
			{profile.location ? (
				<p>
					Location: <span style={{ fontWeight: 'bold' }}>{profile.location}</span>{' '}
				</p>
			) : null} */}
		</>
	)
}
