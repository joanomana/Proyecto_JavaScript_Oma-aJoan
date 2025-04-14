'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Login (){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault(); 

        if (!email || !password) {
            Swal.fire("Error", "Enter your credentials", "error");
            return;
        }

        const res = await fetch("/api/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        localStorage.setItem("token", data.token);

        if (data.error) {
            Swal.fire("Error", data.error, "error");
        } else {
            Swal.fire({
                title: "¡Login successful!",
                text: "Redirecting to home...",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
            });

            setTimeout(() => {
                router.push("/home");
            }, 2000);
        }
    };
    return(
        <div className="bg-gradient-to-br from-red-400 via-yellow-600 to bg-orange-600 h-screen  py-8 px-3 ">
            <Link href="/" className="p-2 bg-gray-600 rounded-lg hover:shadow-lg hover:cursor-pointer transition text-white">Back</Link>
            <div className="flex flex-col justify-center items-center h-full">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                    <div className="flex justify-center items-center gap-2">
                        <img src="https://images.ctfassets.net/swt2dsco9mfe/1qU2YMq2MSczf9KGme5gu7/a580e2f158f2c08faad3a9d4463af0bc/dnd-hub-logo.png?fm=avif" alt="Line" />
                        <h1 className="text-3xl font-bold 2xl:text-4xl">Wiki</h1>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-2 mt-5 xl:text-1xl">
                        <h1 className="font-semibold">SIGN IN</h1>
                        <p className="text-[#6C6C6C] font-regular">Enter your credentials to access your account</p>
                    </div>
                    <form className="text-[#6C6C6C] mt-5 gap-3 flex flex-col" 
                    onSubmit={handleLogin}
                    >
                        <div className="flex flex-col gap-1">
                            <h1 className="font-medium">Email</h1>
                            <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="border-gray-300 border p-2 w-full rounded-lg"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1 className="font-medium">Password</h1>
                            <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="border-gray-300 border p-2 w-full rounded-lg"
                            />
                        </div>
                        <button
                            type="submit"
                            className="flex justify-center bg-[#FEAF00] text-white p-2 rounded-lg font-medium hover:cursor-pointer"
                        >
                        SIGN IN
                        </button>
                    </form>
                    <div className="flex gap-1 items-center justify-center font-medium text-gray-400">
                        <p>Forgot your password?</p>
                        <a href="#" className="text-orange-400 underline">Reset Password</a>
                    </div>
                    <div className='flex justify-center items-center gap-2 font-medium text-gray-400'>
                        <h1>Don't have an account?</h1>
                        <Link className='text-orange-400 underline' href='/register'>Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}