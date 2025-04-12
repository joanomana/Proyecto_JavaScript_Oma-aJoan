import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between bg-gray-300 p-4 border-t-2 border-red-600 gap-4 md:gap-0 text-center md:text-left">
            <div className="flex justify-center md:justify-start w-full md:w-auto">
                <img
                    src="https://h7ktnb-us-east-1-dndbeyond-live-media.s3.amazonaws.com/footer-images/logo-178.png"
                    alt="logo"
                    className="h-10"
                />
            </div>

            <div className="flex gap-4 bg-red-500 shadow-lg rounded-full p-2 text-white text-xl justify-center md:w-auto">
                <a
                    href="https://github.com/joanomana"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaGithub />
                </a>
                <a
                    href="https://www.linkedin.com/in/joan-sebastian-oma%C3%B1a-suarez-52b7a3256/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaLinkedin />
                </a>
            </div>

            <p className="text-sm w-full md:w-auto text-center">© 2025 Joan Sebastian Omaña Suárez</p>
        </div>
    );
}
