interface props {
	name: string
	forte: string
	number: string
	email: string
	avatar: string
}

import { profile } from "../style"
import "../style/style.css"

const Profile = ({
	name, avatar, forte, number, email
}: props) => {
  return (
		<div className={`${profile} ${name === "谢胜瑜" ? "slide-in-left": "slide-in-left-delay"}`}>
			<div className="flex">
				<img
					src={avatar}
          alt=""
          className="object-cover object-center w-12 rounded dark:bg-gray-500"
				/>
				<div className="flex-1 pl-2 flex flex-col justify-around">
					<h2 className="text-lg flex justify-between text-gray-600 dark:text-gray-200 font-semibold">
            <span>{name}</span>
            <span className="qr-code">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
              </svg>
            </span>
          </h2>
					<span className="text-xs dark:text-gray-400">{forte}</span>
				</div>
			</div>
			<div>
				<div className="mt-2">
					<span className="flex items-center space-x-2 h-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              aria-label="Phonenumber"
              className="w-4 h-4 dark:text-gray-400"
            >
              <path
                fill="currentColor"
                d="M449.366,89.648l-.685-.428L362.088,46.559,268.625,171.176l43,57.337a88.529,88.529,0,0,1-83.115,83.114l-57.336-43L46.558,362.088l42.306,85.869.356.725.429.684a25.085,25.085,0,0,0,21.393,11.857h22.344A327.836,327.836,0,0,0,461.222,133.386V111.041A25.084,25.084,0,0,0,449.366,89.648Zm-20.144,43.738c0,163.125-132.712,295.837-295.836,295.837h-18.08L87,371.76l84.18-63.135,46.867,35.149h5.333a120.535,120.535,0,0,0,120.4-120.4v-5.333l-35.149-46.866L371.759,87l57.463,28.311Z"
              ></path>
            </svg>
            <span className="dark:text-gray-400">{number}</span>
          </span>
          <span className="flex items-center space-x-2 h-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              aria-label="Email address"
              className="w-4 h-4 dark:text-gray-400"
            >
              <path
                fill="currentColor"
                d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"
              ></path>
            </svg>
            <a href={`mailto:${email}`} className="dark:text-gray-400">
              {email}
            </a>
          </span>
				</div>
			</div>
		</div>
  );
};

export default Profile;
