"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
type Inputs = {
  userName: string;
  email: string;
  password: string;

};

export default function SignupForm() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter()
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      console.log("Submitting signup data:", data);

      const response = await axios.post("http://localhost:3000/api/auth/signup", data);

      if (response.status === 201 || response.status === 200) {
        toast.success("Signup successful!");
        console.log("Signup response:", response.data);
        setTimeout(() => {
          router.push("/")
        }, 3000);
        // Optionally redirect or reset form
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


      <div className="w-full flex justify-center items-center min-h-screen  px-4">
        <div className="w-full max-w-md flex flex-col space-y-3 p-6 rounded-md shadow-md">
          <h1 className="font-semibold text-center text-2xl">Create an Account</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-3">
            <div className="flex flex-col">
              <label htmlFor="userName">Enter Your UserName</label>
              <input
                {...register("userName", { required: "UserName is required" })}
                type="text"
                id="userName"
                placeholder="Jon Doe"
                className="w-full px-2 py-3 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.userName && <span className="text-red-500 text-sm">{errors.userName.message}</span>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                id="email"
                placeholder="john@gmail.com"
                className="w-full px-2 py-3 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                id="password"
                placeholder="********"
                className="w-full px-2 py-3 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-900 text-white py-2 rounded-md transition duration-200"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 underline">
              Login
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
