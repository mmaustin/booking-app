'use server';

import { profileSchema } from "./schemas";
import db from './db';
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const getAuthUser = async () => {
  const user =  await currentUser();
  if(!user) {
    throw new Error('You must login to access this route.');
  };

  if(!user.privateMetadata.hasProfile) redirect('/profile/create');
  return user;
};

export const createProfileAction = async (prevState: any, formData: FormData) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error('No user exists.')

    const rawData = Object.fromEntries(formData);
    const validatedFields = profileSchema.parse(rawData);

    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? '',
        ...validatedFields
      }
    });

    await clerkClient().users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });
  } catch (error) {
    return { message: error instanceof Error ? error.message : "There was an error, chief." };
  };
  redirect('/');
};

export const fetchProfileImage = async () => {
  const user = await currentUser();
  if(!user) return null;

  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      profileImage: true,
    }
  });

  return profile?.profileImage;
};

export const fetchProfile = async () => {
  const user = await getAuthUser();

  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
  });
  if (!profile) return redirect('/profile/create');
  return profile;
};

export const updateProfileAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  return { message: 'update profile action' };
};