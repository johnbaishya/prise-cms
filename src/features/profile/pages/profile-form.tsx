import { z } from 'zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Pencil, Upload } from 'lucide-react'
import { ImageThumbnail } from '@/components/ui/image-thumbnail'
import { SelectedImagesDialog } from '@/components/selected-images-dialog'
import { profileFormSchema, type ProfileFormValues } from '../profile.types'
import { useAppStore } from '@/stores/app-store'
import { useAuthStore } from '@/stores/auth-store'
import { updateCompanyBrandLogo } from '@/api/core/company.service'
import { getUserProfile, updateUserProfilePic } from '@/api/core/user.service'
import { showAppLoader, updateAuthState } from '@/stores/actions/app-actions'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IUser } from '@/Types/entities/core-entities'
import { storeObjectToLocalStorage } from '@/lib/app-utils'
import { LocalStorageKey } from '@/Types/appEnums'
import { toast } from 'sonner'



// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  bio: 'I own a computer.',
  urls: [
    { value: 'https://shadcn.com' },
    { value: 'http://twitter.com/shadcn' },
  ],
}

export function ProfileForm() {
  const [editable, setEditable] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { user } = useAuthStore(state => state.auth);
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: user!,
    mode: 'onChange',
  })


  const refreshProfile = async (user: IUser) => {
    storeObjectToLocalStorage(LocalStorageKey.USER, user)
    updateAuthState({
      user: user
    })
  }

  const queryClient = useQueryClient();



  const userProfilePicUpdateMutation = useMutation({
    mutationFn: updateUserProfilePic,
    onMutate: () => { showAppLoader(true) },
    onSettled: () => { showAppLoader(false) },
    onSuccess: (data) => {
      setSelectedImage(null);
      refreshProfile(data)
      // navigate({
      //     to: "/company",
      // })
      toast.success("profile picture updated Successfully !!!");
      // queryClient.invalidateQueries({
      //   queryKey: [QueryKey.LIST_COMPANIES]
      // });
    },

  });

  return (
    <Card className="rounded-lg border bg-card p-4 shadow-sm md:p-6">
      <div className='flex justify-center pt-4 gap-1.5'>
        <Card className='p-5'>
          <ImageThumbnail src={user?.profile_pic} size={250} />
          {/* <Button variant={"outline"}>
            upload
            <Upload />
          </Button> */}
          <div className='flex justify-center pt-4 w-full'>
            <label for="file-upload" class="custom-file-upload" className={cn(buttonVariants({ variant: "outline", size: "default" }))} >
              Upload
              <Upload />
              {/* <Button variant={"outline"} >Add More Images..</Button> */}
            </label>
            <Input
              type='file'
              accept='image/*'
              id='file-upload'
              multiple
              hidden
              onChange={(e) => {
                if (!!e.target.files[0]) {
                  setSelectedImage(e.target.files[0])
                };
              }}
            //  className={cn(buttonVariants({ variant: "default", size: "default" }))} 
            />
          </div>
        </Card>

      </div>
      <div className='flex justify-end pt-4 gap-1.5'>

        <Button
          variant={'outline'}
          onClick={() => {
            setEditable(true);
          }}
          className='right-0'
          disabled={editable}
        >
          <Pencil />
          Edit
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => showSubmittedData(data))}
          className='space-y-8'
        >
          <FormField
            control={form.control}
            name='first_name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={!editable}
                    placeholder='type your first name'
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='last_name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={!editable}
                    placeholder='type your last name'
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    disabled={true}
                    placeholder='shadcn'
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    type='tel'
                    disabled={!editable}
                    placeholder='type your phone number'
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a verified email to display' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='m@example.com'>m@example.com</SelectItem>
                  <SelectItem value='m@google.com'>m@google.com</SelectItem>
                  <SelectItem value='m@support.com'>m@support.com</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage verified email addresses in your{' '}
                <Link to='/'>email settings</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
          {/* <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Tell us a little bit about yourself'
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations to
                link to them.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && 'sr-only')}>
                    URLs
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && 'sr-only')}>
                    Add links to your website, blog, or social media profiles.
                  </FormDescription>
                  <FormControl className={cn(index !== 0 && 'mt-1.5')}>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type='button'
            variant='outline'
            size='sm'
            className='mt-2'
            onClick={() => append({ value: '' })}
          >
            Add URL
          </Button>
        </div> */}
          {editable &&
            <div className='flex justify-end pt-4 gap-1.5'>

              <Button
                variant={"outline"}
                onClick={(e) => {
                  e.preventDefault();
                  setEditable(false);
                }}
              >
                Cancel
              </Button>
              <Button type='submit'>Update profile</Button>
            </div>}
        </form>
      </Form>
      {!!selectedImage &&
        <SelectedImagesDialog
          open={!!selectedImage}
          images={[selectedImage]}
          onClose={(state) => {
            setSelectedImage(null)
          }}
          confirmText="Select Image"
          onSubmit={() => {
            userProfilePicUpdateMutation.mutate({ image: selectedImage })
          }}
        />
      }
    </Card>
  )
}
