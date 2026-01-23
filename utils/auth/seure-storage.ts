import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
export const setToken = async (token: string) => {
  try {
    await setItemAsync('auth_token', token);
  } catch (e) {
    console.error("Failed to save token", e);
  }
}

export const getToken = async () => {
  try {
    return await getItemAsync('auth_token');
  } catch (e) {
    console.error("Failed to get token", e);
    return null;
  }
}

export const deleteToken = async () => {
  try {
    await deleteItemAsync('auth_token');
  } catch (e) {
    console.error("Failed to delete token", e);
  }
}
