import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { CreateUserInput, createUserSchema } from "../services/validation";
import Button from "../components/shared/Button";
import { useAppDispatch } from "../hooks/redux";
import { registerUser } from "../store/actions/UserActionCreators";

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [registerError, setRegisterError] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateUserInput>({
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: zodResolver(createUserSchema),
  });

  async function onSubmit(body: CreateUserInput) {
    dispatch(registerUser({ body, navigate }));
  }

  return (
    <>
      <p>{registerError}</p>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register a new account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    required
                    placeholder="username"
                    {...register("username")}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  />
                  <p className="mt-2 text-sm text-red-600" id="username-error">
                    {errors.username?.message}
                  </p>
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="examlple@mail.com"
                    {...register("email")}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  />
                  <p className="mt-2 text-sm text-red-600" id="email-error">
                    {errors.email?.message}
                  </p>
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="********"
                    {...register("password")}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  />
                  <p className="mt-2 text-sm text-red-600" id="password-error">
                    {errors.password?.message}
                  </p>
                </div>
              </div>

              <div>
                <label
                  htmlFor="repeatPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    id="passwordConfirmation"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="********"
                    {...register("passwordConfirmation")}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  />
                  <p
                    className="mt-2 text-sm text-red-600"
                    id="confirm-password-error"
                  >
                    {errors.passwordConfirmation?.message}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    to="/login"
                    className="font-medium text-yellow-600 hover:text-yellow-500"
                  >
                    Already have an account?
                  </Link>
                </div>
              </div>

              <Button type="submit">Register</Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
