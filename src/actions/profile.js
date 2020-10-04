import messages from "./globalMessages";

export const FETCH_USER_PROFILE = 'FETCH_USER_PROFILE';

export const getUserProfile = () => ({
  api: {
    endpoint: `/auth/me`,
    method: "POST",
    type: FETCH_USER_PROFILE,
  }
})

export const UPDATE_PROFILE = 'UPDATE_PROFILE';

export const updateProfile = (data) => ({
  api: {
    endpoint: `/myaccount/update-profile`,
    method: "POST",
    type: UPDATE_PROFILE,
    payload: {
      success: {
        data
      },
    },
    data
  }
})

export const UPLOAD_AVATAR = 'UPLOAD_AVATAR';

export const updateAvatar = (data) => ({
  api: {
    endpoint: `/myaccount/image-upload`,
    method: "POST",
    type: UPLOAD_AVATAR,
    data,
    successMessage: messages.avatarUpload,
  }
})
