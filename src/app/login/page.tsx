"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

type Inputs = {
    email: string;
    password: string;
};

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const router = useRouter();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            console.log("Submitting Login data:", data);

            const response = await axios.post("http://localhost:3000/api/auth/login", data);

            if (response.status === 201 || response.status === 200) {
                toast.success("Login successful!");
                console.log("Login response:", response.data);
                localStorage.setItem("token", response.data);

                setTimeout(() => {
                    router.push("/");
                }, 3000);
            } else {
                toast.error("Something went wrong. Please try again.");
                console.warn("Unexpected response:", response);
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || "An error occurred during login.";
                toast.error(message);
            } else {
                toast.error("An unexpected error occurred.");
            }
        }
    };

    return (
        <>
            <div className="w-full flex justify-center items-center min-h-screen">
                <div className="w-full max-w-md flex flex-col space-y-3">
                    <h1 className="font-semibold text-center text-2xl">
                        Login to Your Account
                    </h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2">
                        <div className="flex flex-col">
                            <label htmlFor="email">Enter Email</label>
                            <input
                                {...register("email", { required: "Email is required" })}
                                type="email"
                                id="email"
                                placeholder="john@gmail.com"
                                className="w-full px-2 py-3 rounded-md border-none bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="password">Enter Password</label>
                            <input
                                {...register("password", { required: "Password is required" })}
                                type="password"
                                id="password"
                                placeholder="********"
                                className="w-full px-2 py-3 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                        </div>

                        <button type="submit" className="w-full bg-blue-700 hover:bg-blue-900 text-white py-2 rounded">
                            Login
                        </button>
                    </form>

                    <p className="text-center text-sm">
                        If you don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-blue-600 underline">
                            Signup
                        </Link>
                    </p>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}
