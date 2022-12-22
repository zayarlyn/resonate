import Link from 'next/link'
import { useRouter } from 'next/router'
import { QueryFunction, useQuery } from 'react-query'
import { useBearStore } from '../hooks'
import { AddContactIcon, ChatBubbleIcon, CrossIcon } from '../icons'
import ProfileIcon from '../icons/ProfileIcon'
import Connection from './Connection'

export interface Room {
	id: string
	members: Member[]
}

export interface Member {
	id: string
	joinedAt: string
}

export interface User {
	id: string
}

const fetchUser: QueryFunction<User> = () =>
	fetch('http://localhost:5000/user/id/connections').then((res) => res.json())
const fetchConnections = (userId: string) =>
	fetch(`http://localhost:5000/user/${userId}/connections`).then((res) => res.json())

export default function LeftSidebar() {
	// const { rooms } = useBearStore((state) => state.chat)
	// prettier-ignore
	const { query: { userId, roomId }, pathname} = useRouter();
	const { data: user } = useQuery<User>('user', fetchUser, { initialData: { id: '' } })
	const { data: rooms } = useQuery<Room[]>('rooms', () => fetchConnections(user?.id as string), { enabled: !!user?.id })

	return (
		<aside className='flex'>
			<section className='flex-y gap-2 bg-cyan-700 p-2 pb-4'>
				<Link
					href='/chat/me'
					className={`btn p-1 ${
						pathname.startsWith('/chat') && roomId !== 'add-network' ? 'bg-white [&>svg]:text-black' : ''
					}`}
				>
					<ChatBubbleIcon />
				</Link>
				<div className='divider-x' />
				<Link
					href='/chat/add-network'
					className={`btn p-1 ${roomId === 'add-network' ? 'bg-white [&>svg]:text-black' : ''}`}
				>
					<AddContactIcon />
				</Link>
				<Link href='/user/me' className={`btn mt-auto p-1 ${userId === 'me' ? 'bg-white [&>svg]:text-black' : ''}`}>
					<ProfileIcon />
				</Link>
			</section>
			<section className='flex-y w-56 bg-slate-200 px-1'>
				<div className='relative h-auto p-2'>
					<h2 className='text-center font-medium text-cyan-900'>Your Network</h2>
					<button className='btn absolute top-1 right-2 p-1 [&>svg]:text-cyan-700'>
						<CrossIcon />
					</button>
				</div>
				<div className='divider-x' />
				<Link
					href='/chat/me'
					className={`btn flex-c mt-2 cursor-default py-1 px-2 ${roomId === 'me' ? 'bg-slate-300' : ''}`}
				>
					<div className='h-9 w-9 overflow-hidden rounded-lg bg-slate-800'></div>
					<p className='mr-9 grow text-center text-sm'>Waiting Room</p>
				</Link>
				<div className='mt-2 h-full overflow-y-auto'>
					<div className='flex-c h-auto gap-3 py-1 px-2 text-xs text-green-600'>
						<span>3 online</span>
						<div className='divider-x grow text-inherit' />
					</div>
					<ul>
						{rooms?.map((room) => (
							<Connection key={room.id} {...room} roomId={roomId as string} />
						))}
					</ul>
					{/* <div className='flex-c mt-2 h-auto gap-3 py-1 px-2 text-xs text-cyan-800'>
            <span>all connections</span>
            <div className='divider-x grow text-inherit' />
          </div>
          <ul>
            {all.map((connection) => (
              <Connection key={connection.username} {...connection} roomId={roomId} />
            ))}
          </ul> */}
				</div>
			</section>
		</aside>
	)
}

const connections = [
	{
		src: 'https://placeimg.com/192/192/people',
		username: 'Doffy',
		msg: 'You, inferior human',
		id: '2',
	},
	{
		src: 'https://placeimg.com/192/192/people',
		username: 'Lucy',
		msg: 'Gomu Gomu no',
		id: '3',
	},
	{
		src: 'https://placeimg.com/192/192/people',
		username: 'Gold D. Roger',
		msg: 'King of Pirates',
		id: '1',
	},
]

const all = [
	{
		src: 'https://placeimg.com/192/192/people',
		username: 'Doffy',
		msg: 'You, inferior human',
		id: '59',
	},
	{
		src: 'https://placeimg.com/192/192/people',
		username: 'Lucy',
		msg: 'Gomu Gomu no',
		id: '33',
	},
	{
		src: 'https://placeimg.com/192/192/people',
		username: 'Gold D. Roger',
		msg: 'King of Pirates',
		id: '11',
	},
	{
		src: 'https://placeimg.com/192/192/people',
		username: 'Gold D. Roger',
		msg: 'King of Pirates',
		id: '14',
	},
	{
		src: 'https://placeimg.com/192/192/people',
		username: 'Gold D. Roger',
		msg: 'King of Pirates',
		id: '18',
	},
]
