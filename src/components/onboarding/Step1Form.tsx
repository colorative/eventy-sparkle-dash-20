import { Input } from "@/components/ui/input"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useFormContext } from "react-hook-form"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Camera } from "lucide-react"
import { useState } from "react"

export function Step1Form() {
  const { control } = useFormContext()
  const [coverPhoto, setCoverPhoto] = useState<string | null>(null)
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)

  const handleCoverPhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCoverPhoto(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleProfilePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfilePhoto(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="relative h-32 w-full bg-muted rounded-lg flex items-center justify-center overflow-hidden">
          {coverPhoto ? (
            <img src={coverPhoto} alt="Cover photo" className="w-full h-full object-cover" />
          ) : (
            <p className="text-muted-foreground">Cover Photo</p>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverPhotoUpload}
            className="hidden"
            id="cover-photo-upload"
          />
          <Button
            variant="outline"
            size="icon"
            className="absolute top-2 right-2 bg-background/50"
            onClick={() => document.getElementById('cover-photo-upload')?.click()}
            type="button"
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>
        <div className="absolute -bottom-5 left-4">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage src={profilePhoto || ""} alt="Profile picture" />
              <AvatarFallback>PF</AvatarFallback>
            </Avatar>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePhotoUpload}
              className="hidden"
              id="profile-photo-upload"
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute bottom-0 right-0 rounded-full bg-background/50"
              onClick={() => document.getElementById('profile-photo-upload')?.click()}
              type="button"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 pt-8">
        <FormField
          control={control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={control}
        name="company"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company / Organization</FormLabel>
            <FormControl>
              <Input placeholder="Acme Inc." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="jobTitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Title</FormLabel>
            <FormControl>
              <Input placeholder="CEO" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
