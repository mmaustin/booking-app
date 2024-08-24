import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const createProfileAction = async (formData: FormData) => {
  'use server'
  const firstName = formData.get('firstName') as string;
  console.log(firstName);

}

const CreateProfilePage = async () => {

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">new user</h1>
      <div className="border p-8 rounded-md max-w-lg">
        <form action={createProfileAction}>
          <div className="mb-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" name="firstName" type="text"></Input>
          </div>
          <Button type="submit" size="lg">Create Profile</Button>
        </form>
      </div>
    </section>
  )
}
export default CreateProfilePage