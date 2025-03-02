import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  registerSchema,
  RegisterValues,
  authRegister,
} from "@/services/auth/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export default function CustomerSignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const photo = watch("photo");

  const navigate = useNavigate();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: FormData) => authRegister(data),
  });

  // Tambahkan state untuk error
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [errorDetail, setErrorDetail] = React.useState<any>(null);
  const [showDetail, setShowDetail] = React.useState(false);

  // Tambah state untuk debug info
  const [debugInfo, setDebugInfo] = React.useState<any>(null);

  const onSubmit = async (val: RegisterValues) => {
    try {
      if (!val.photo || !(val.photo instanceof File)) {
        setErrorMsg("Please select a photo");
        return;
      }

      const formData = new FormData();
      formData.append("name", val.name);
      formData.append("email", val.email);
      formData.append("password", val.password);
      formData.append("photo", val.photo); // Remove the third argument

      // Debug info
      const debugData = {
        formValues: {
          ...val,
          photo: {
            name: val.photo.name,
            size: val.photo.size,
            type: val.photo.type
          }
        },
        formDataEntries: Array.from(formData.entries())
      };
      setDebugInfo(debugData);

      await mutateAsync(formData);
      navigate("/sign-in");

    } catch (error: any) {
      const message = error.message || "Terjadi kesalahan, silahkan coba lagi.";
      setErrorMsg(message);
      if (error.response) {
        setErrorDetail(error.response.data);
      } else {
        setErrorDetail(error);
      }
    }
  };

  return (
    <div
      id="Content-Container"
      className="relative flex flex-col w-full max-w-[640px] min-h-screen mx-auto bg-[linear-gradient(179.86deg,_#000000_40.82%,_#0E0E24_99.88%)] overflow-x-hidden text-white"
    >
      <div id="Background" className="absolute top-0 w-full h-[480px]">
        <div className="absolute w-full h-full top-0 bg-[linear-gradient(359.16deg,_#000000_6.6%,_rgba(14,14,36,0)_99.33%)]" />
        <img
          src="/assets/images/backgrounds/signup.png"
          className="w-full h-full object-cover"
          alt="background"
        />
      </div>
      <img
        src="/assets/images/logos/logo.svg"
        className="relative flex max-w-[188px] mx-auto mt-[60px]"
        alt="logo"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-col gap-[30px] px-5 py-[60px] my-auto"
      >
        <h1 className="font-bold text-[26px] leading-[39px]">Sign Up</h1>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-5">
            <label className="relative flex w-[100px] h-[100px] shrink-0 rounded-full overflow-hidden bg-[#FFFFFF33] backdrop-blur-sm">
              <button
                type="button"
                id="Text-Label"
                onClick={() => inputRef.current?.click()}
                className={cn(
                  "w-full h-full flex items-center justify-center text-center font-semibold",
                  photo !== undefined ? "hidden" : "block"
                )}
              >
                Add <br />
                Photo
              </button>
              {photo !== undefined && (
                <img
                  id="Avatar-Preview"
                  src={URL.createObjectURL(photo)}
                  className="w-full h-full object-cover"
                  alt="avatar"
                />
              )}
              <input
                type="file"
                accept="image/*"
                className="absolute bottom-0 -left-3/4 -z-30 opacity-0"
                ref={inputRef}
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setValue("photo", e.target.files[0], { 
                      shouldValidate: true,
                      shouldDirty: true 
                    });
                  }
                }}
              />
            </label>
            <button
              type="button"
              onClick={() => setValue("photo", undefined)}
              className="rounded-full py-2 px-3 bg-[#FFFFFF33] backdrop-blur-sm font-bold text-sm"
            >
              Delete
            </button>
            <p className="text-xs text-red">
              {errors.photo?.message?.toString()}
            </p>
          </div>
          <label className="flex flex-col gap-2">
            <p>Complete Name</p>
            <input
              type="text"
              className="appearance-none outline-none rounded-full py-3 px-[18px] bg-[#FFFFFF33] backdrop-blur-sm font-semibold placeholder:font-normal placeholder:text-white focus:ring-1 focus:ring-white transition-all duration-300"
              placeholder="What’s your name"
              {...register("name")}
            />
            <p className="text-xs text-red">
              {errors.name?.message?.toString()}
            </p>
          </label>
          <label className="flex flex-col gap-2">
            <p>Email Address</p>
            <input
              type="email"
              className="appearance-none outline-none rounded-full py-3 px-[18px] bg-[#FFFFFF33] backdrop-blur-sm font-semibold placeholder:font-normal placeholder:text-white focus:ring-1 focus:ring-white transition-all duration-300"
              placeholder="What’s your email"
              {...register("email")}
            />
            <p className="text-xs text-red">
              {errors.email?.message?.toString()}
            </p>
          </label>
          <label className="flex flex-col gap-2">
            <p>Password</p>
            <input
              type="password"
              className="appearance-none outline-none rounded-full py-3 px-[18px] bg-[#FFFFFF33] backdrop-blur-sm font-semibold placeholder:font-normal placeholder:text-white focus:ring-1 focus:ring-white transition-all duration-300"
              placeholder="Type your strong password"
              {...register("password")}
            />
            <p className="text-xs text-red">
              {errors.password?.message?.toString()}
            </p>
          </label>
        </div>
        <div className="flex flex-col gap-3">
          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-full py-3 px-[18px] bg-white text-center font-bold text-premiere-black"
          >
            Create New Account
          </button>
          <Link
            to="/sign-in"
            className="w-full rounded-full py-3 px-[18px] bg-white/10 text-center font-bold"
          >
            Sign In
          </Link>
        </div>
      </form>
      {errorMsg && (
        <div className="mt-4 p-3 bg-red-600 text-white text-center rounded">
          <p>{errorMsg}</p>
          <button
            className="underline mt-2"
            onClick={() => setShowDetail((prev) => !prev)}
          >
            {showDetail ? "Sembunyikan Detail" : "Lihat Detail"}
          </button>
          {showDetail && errorDetail && (
            <pre className="text-left mt-2 bg-red-800 p-2 rounded text-xs overflow-auto max-h-40">
              {JSON.stringify(errorDetail, null, 2)}
            </pre>
          )}
        </div>
      )}
      {debugInfo && (
        <div className="mt-4 p-3 bg-blue-600 text-white text-center rounded">
          <p className="font-bold">Debug Information:</p>
          <pre className="text-left mt-2 bg-blue-800 p-2 rounded text-xs overflow-auto max-h-40">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
