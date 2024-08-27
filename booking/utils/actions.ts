'use server';

import { profileSchema } from "./schemas";

export const createProfileAction = async (prevState: any, formData: FormData) => {
  const firstName = formData.get('firstName') as string;
  return {message: 'Profile Created'}
}