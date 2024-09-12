import FormContainer from '@/components/form/FormContainer';
import { updateProfileAction, fetchProfile } from '@/utils/actions';
import FormInput from '@/components/form/FormInput';
import { SubmitButton } from '@/components/form/Buttons';


const ProfilePage = async () => {
  const user = await fetchProfile();

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">user profile</h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={updateProfileAction}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <FormInput type="text" name="firstName" label="First Name" defaultValue={user.firstName} />
            <FormInput type="text" name="lastName" label="Last Name" defaultValue={user.lastName} />
            <FormInput type="text" name="username" label="Username" defaultValue={user.username} />
          </div>
          <SubmitButton text="Update Profile" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  )
};

export default ProfilePage;