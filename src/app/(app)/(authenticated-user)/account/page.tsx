"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUserContext } from "@/providers/AuthUserProvider";

export interface IProfile {
  name?: string;
  username?: string;
  avatar?: string;
}

export default function Page() {
  const { user, setUser } = useUserContext();

  //todo update profile
  // useEffect(() => {
  //   // Function to fetch profile data
  //   async function fetchProfile() {
  //     try {
  //       const response = await fetchProfileUserAction();
  //       if (response.data) {
  //         setProfile({
  //           name: response.data.data.name,
  //           username: response.data.data.name,
  //           avatar: response.data.data.avatar,
  //         });
  //       }
  //     } catch (error) {
  //       console.error("There was a problem with the fetch operation:", error);
  //     }
  //   }

  //   fetchProfile();
  // }, []);

  return (
    <div className="flex items-start justify-center min-h-screen pt-8">
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader className="pb-0">
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Welcome to your profile information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-6">
            <label
              htmlFor="photo"
              className="cursor-pointer rounded-lg border border-gray-200 dark:border-gray-800 p-4 flex items-center gap-4 text-sm"
            >
              <input id="photo" type="file" className="sr-only" />
              <Image
                width="96"
                height="96"
                className="rounded-full"
                src={user.avatar as string}
                alt="Profile pic"
                style={{ aspectRatio: "96/96", objectFit: "cover" }}
              />
              {/* <span className="font-medium">Upload new photo</span> */}
              <div className="grid gap-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium leading-none"
                >
                  Email
                </label>
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none"
                >
                  {user.email}
                </label>
              </div>
            </label>
          </div>
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium leading-none">
              Name
            </label>
            <Input
              id="name"
              placeholder="Enter your name"
              defaultValue={user.name}
            />
          </div>
        </CardContent>
        {/* <CardFooter className="flex justify-end">
        <Button>Save</Button>
      </CardFooter> */}
      </Card>
    </div>
  );
}
