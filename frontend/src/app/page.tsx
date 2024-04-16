import ImageUpload from "@/components/custom/image-upload";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex justify-center items-center min-h-screen flex-col space-y-4">
      <h1 className="text-5xl font-semibold">gnos-image-labelizer</h1>
      <p className="text-muted-foreground">Nader - Ghazi - Oussama - Sirine</p>
      <div className="flex gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-full shadow flex items-center gap-2">
              <PlusIcon className="size-6" />
              Add new image
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-center">
                Upload your files
              </DialogTitle>
              <DialogDescription className="text-center">
                The only file upload you will ever need
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <ImageUpload />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}

