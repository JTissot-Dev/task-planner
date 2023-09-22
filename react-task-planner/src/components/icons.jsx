export const ShowPasswordIcon = ({ onMouseEnter, onMouseLeave }) => {
	return (
			<>
				<svg 
					className="w-6 h-6 absolute bottom-2 end-2 text-gray-600 dark:text-white" 
					aria-hidden="true" 
					xmlns="http://www.w3.org/2000/svg" 
					fill="none" 
					viewBox="0 0 20 14"
					onMouseEnter={ onMouseEnter }
					onMouseLeave={ onMouseLeave }>
					<g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
						<path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
						<path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z"/>
					</g>
				</svg>
			</>
	)
}