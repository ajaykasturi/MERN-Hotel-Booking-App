import { useForm } from "react-hook-form";
import Label from "../components/Label";
import Input from "../components/Input";
import ErrorLabel from "../components/ErrorLabel";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contextts/AppContext";
export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
const Register = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      // console.log("registration successful!");
      showToast({ message: "Registration Success!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      // console.log(error.message);
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const password: string = watch("password");
  const onSubmit = (data: RegisterFormData) => {
    mutation.mutate(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <Label title={"FirstName"}>
          <Input
            type={"text"}
            title={"firstName"}
            register={register}
            options={{
              required: { value: true, message: "FirstName is required" },
              minLength: {
                value: 3,
                message: "FristName must be 3 chars long",
              },
            }}
          />
          {errors.firstName && <ErrorLabel err={errors.firstName?.message} />}
        </Label>
        <Label title={"LastName"}>
          <Input
            type={"text"}
            title={"lastName"}
            register={register}
            options={{
              required: { value: true, message: "LastName is required" },
              minLength: {
                value: 3,
                message: "FristName must be 3 chars long",
              },
            }}
          />
          {errors.lastName && <ErrorLabel err={errors.lastName?.message} />}
        </Label>
      </div>
      <Label title={"Email"}>
        <Input
          type={"email"}
          title={"email"}
          register={register}
          options={{ required: { value: true, message: "Email is required" } }}
        />
        {errors.email && <ErrorLabel err={errors.email?.message} />}
      </Label>
      <Label title={"Password"}>
        <Input
          type={"password"}
          title={"password"}
          register={register}
          options={{
            required: { value: true, message: "Password is required" },
            minLength: {
              value: 6,
              message: "Password must be 6 chars long",
            },
          }}
        />
        {errors.password && <ErrorLabel err={errors.password?.message} />}
      </Label>
      <Label title={"Confirm Password"}>
        <Input
          type={"password"}
          title={"confirmPassword"}
          register={register}
          options={{
            required: {
              value: true,
              message: "Confirm password is required",
            },
            minLength: {
              value: 6,
              message: "Password must be 6 chars long",
            },
            validate: {
              isMatch: (cpassword: string) => {
                if (cpassword !== password) {
                  return "Your passwords do not match";
                }
              },
            },
          }}
        />
        {errors.confirmPassword && (
          <ErrorLabel err={errors.confirmPassword?.message} />
        )}
      </Label>

      <span className="flex items-center justify-between">
        <span className="text-sm">
          Already registered?{" "}
          <Link className="text-blue-500 underline" to="/sign-in">
            Sign in here
          </Link>
        </span>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
