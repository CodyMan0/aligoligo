import { API_PATHS } from '@/constants/routerPath';
import STORAGE_KEYS from '@/constants/storageKeys';
import { authInstance, baseInstance } from '@/libs/api';
import { AuthResponse } from '@/types/auth';

const authAPI = {
  /** 카카오 인가 코드 전송 후 로그인 토큰 받아오기 */
  postKakaoCode: async (code: string) => {
    const { data } = await baseInstance.post<AuthResponse>(API_PATHS.AUTH_LOGIN_KAKAO, null, {
      params: {
        code,
      },
    });
    return data;
  },

  /** 토큰 재발급 */
  getReissue: async () => {
    const { data } = await authInstance.post(API_PATHS.AUTH_REISSUE, null, {
      headers: {
        RefreshToken: localStorage.getItem(STORAGE_KEYS.refreshToken),
      },
    });

    return data;
  },

  /** 회원 탈퇴 */
  deleteMember: async () => {
    const { data } = await authInstance.delete(API_PATHS.MEMBER_SIGN_OUT);
    return data;
  },
};

export default authAPI;
